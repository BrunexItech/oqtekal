'use server'

import { env } from '@/lib/env'
import { sendMail } from '@/lib/mailer'
import { getPayloadClient } from '@/lib/payload'
import { rateLimit } from '@/lib/rate-limit'
import { clientIp } from '@/lib/request'
import { verifyTurnstile } from '@/lib/turnstile'

import { autoReplyEmail, notifyEmail } from './emails'
import { fieldErrors, leadSchema, subscribeSchema, type FormState } from './schema'

const GENERIC_ERROR =
  'Something went wrong on our side. Please try again, or email hello@oqtekal.com.'

export async function submitLead(_prev: FormState, formData: FormData): Promise<FormState> {
  // Honeypot: real people never fill this hidden field.
  if (formData.get('website'))
    return { status: 'success', message: 'Thank you — we will be in touch shortly.' }

  const ip = await clientIp()
  if (!rateLimit(`lead:${ip}`, 5, 10 * 60 * 1000)) {
    return {
      status: 'error',
      message: 'Too many messages in a short time. Please wait a few minutes and try again.',
    }
  }

  const parsed = leadSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return {
      status: 'error',
      message: 'Please check the highlighted fields.',
      errors: fieldErrors(parsed.error),
    }
  }

  const token = formData.get('cf-turnstile-response')
  if (!(await verifyTurnstile(typeof token === 'string' ? token : undefined, ip))) {
    return {
      status: 'error',
      message: 'We could not verify you are human. Please refresh the page and try again.',
    }
  }

  const lead = parsed.data
  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'leads',
      overrideAccess: true,
      data: { ...lead, status: 'new' },
    })
  } catch (error) {
    console.error('[contact] failed to store lead:', error)
    return { status: 'error', message: GENERIC_ERROR }
  }

  // Emails are best-effort: the lead is already safely stored in the admin inbox.
  const notify = notifyEmail(lead)
  await Promise.all([
    env.LEADS_NOTIFY_TO
      ? sendMail({ to: env.LEADS_NOTIFY_TO, replyTo: lead.email, ...notify })
      : Promise.resolve(false),
    sendMail({ to: lead.email, ...autoReplyEmail(lead) }),
  ])

  return {
    status: 'success',
    message: `Thank you, ${lead.name.split(' ')[0]}. An engineer will reply within one business day.`,
  }
}

export async function subscribe(_prev: FormState, formData: FormData): Promise<FormState> {
  if (formData.get('website')) return { status: 'success', message: 'You are subscribed.' }

  const ip = await clientIp()
  if (!rateLimit(`sub:${ip}`, 5, 10 * 60 * 1000)) {
    return { status: 'error', message: 'Too many attempts. Please try again later.' }
  }

  const parsed = subscribeSchema.safeParse({ email: formData.get('email') })
  if (!parsed.success)
    return { status: 'error', message: parsed.error.issues[0]?.message ?? 'Invalid email' }

  try {
    const payload = await getPayloadClient()
    const existing = await payload.count({
      collection: 'subscribers',
      where: { email: { equals: parsed.data.email } },
    })
    if (!existing.totalDocs) {
      await payload.create({
        collection: 'subscribers',
        overrideAccess: true,
        data: { email: parsed.data.email, sourcePage: String(formData.get('sourcePage') ?? '') },
      })
    }
  } catch (error) {
    console.error('[newsletter] failed to subscribe:', error)
    return { status: 'error', message: GENERIC_ERROR }
  }
  return { status: 'success', message: 'You are subscribed. Thank you!' }
}

import 'server-only'

import nodemailer, { type Transporter } from 'nodemailer'

import { env } from './env'

let transporter: Transporter | null | undefined

const getTransporter = (): Transporter | null => {
  if (transporter !== undefined) return transporter
  transporter =
    env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS
      ? nodemailer.createTransport({
          host: env.SMTP_HOST,
          port: env.SMTP_PORT,
          secure: env.SMTP_PORT === 465,
          auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
        })
      : null
  return transporter
}

export const mailEnabled = (): boolean => getTransporter() !== null

/** Sends an email if SMTP is configured. Never throws: a mail failure must not lose a lead. */
export const sendMail = async (options: {
  to: string
  subject: string
  text: string
  html: string
  replyTo?: string
}) => {
  const t = getTransporter()
  if (!t) return false
  try {
    await t.sendMail({ from: env.SMTP_FROM, ...options })
    return true
  } catch (error) {
    console.error('[mailer] send failed:', error)
    return false
  }
}

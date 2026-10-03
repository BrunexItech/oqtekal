'use client'

import { usePathname } from 'next/navigation'
import { useActionState, useEffect, useRef } from 'react'

import { ArrowRight, Button, Check, ChoiceGroup, Input, Select, Textarea } from '@/design-system'
import { cn } from '@/lib/cn'

import { submitLead } from './actions'
import { initialFormState, type LeadType } from './schema'
import { Turnstile } from './Turnstile'

const TYPE_OPTIONS: { label: string; value: LeadType }[] = [
  { label: 'A new project', value: 'project' },
  { label: 'A product demo', value: 'demo' },
  { label: 'Hosting', value: 'hosting' },
  { label: 'Working at Oqtekal', value: 'career' },
  { label: 'Something else', value: 'general' },
]

const BUDGETS = [
  { label: 'Under KES 250k', value: '< 250k' },
  { label: 'KES 250k – 1M', value: '250k – 1M' },
  { label: 'KES 1M – 5M', value: '1M – 5M' },
  { label: 'KES 5M +', value: '5M+' },
  { label: 'Not sure yet', value: 'unsure' },
]

type Props = {
  defaultType?: LeadType
  /** Pre-filled product, plan or role, e.g. "Tolkyn" or "Business hosting". */
  interest?: string
  /** Hide the "what is this about" selector when the context already says it. */
  lockType?: boolean
  compact?: boolean
  submitLabel?: string
  className?: string
}

export const ContactForm = ({
  defaultType = 'project',
  interest,
  lockType = false,
  compact = false,
  submitLabel = 'Send message',
  className,
}: Props) => {
  const [state, action, pending] = useActionState(submitLead, initialFormState)
  const pathname = usePathname()
  const statusRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (state.status !== 'idle') statusRef.current?.focus()
  }, [state])

  if (state.status === 'success') {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className={cn(
          'flex flex-col items-start gap-4 rounded-[var(--radius-card)] border border-line bg-surface p-8 outline-none',
          className,
        )}
      >
        <span className="grid size-12 place-items-center rounded-full bg-success/10 text-success">
          <Check className="size-6" />
        </span>
        <p className="font-display text-2xl font-semibold tracking-tight">Message received.</p>
        <p className="text-muted">{state.message}</p>
      </div>
    )
  }

  const err = state.errors ?? {}

  return (
    <form action={action} noValidate className={cn('flex flex-col gap-6', className)}>
      <input type="hidden" name="sourcePage" value={pathname} />
      {interest ? <input type="hidden" name="interest" value={interest} /> : null}
      {lockType ? <input type="hidden" name="type" value={defaultType} /> : null}
      {/* Honeypot */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {!lockType ? (
        <Select
          label="What is this about?"
          name="type"
          defaultValue={defaultType}
          options={TYPE_OPTIONS}
          error={err.type}
        />
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <Input label="Your name" name="name" autoComplete="name" error={err.name} />
        <Input
          label="Work email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          error={err.email}
        />
        <Input
          label="Phone / WhatsApp"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          optional
          placeholder="+254 7…"
          error={err.phone}
        />
        <Input
          label="Company"
          name="company"
          autoComplete="organization"
          optional
          error={err.company}
        />
      </div>

      {!compact && !lockType ? (
        <ChoiceGroup label="Estimated budget (optional)" name="budget" options={BUDGETS} />
      ) : null}

      <Textarea
        label={
          defaultType === 'career'
            ? 'Tell us about yourself (and links to your work)'
            : 'How can we help?'
        }
        name="message"
        placeholder={
          defaultType === 'demo'
            ? 'A little about your organisation and what you would like to see.'
            : 'What are you trying to achieve? Any deadlines or systems we should know about?'
        }
        error={err.message}
      />

      <Turnstile />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-subtle">
          We reply within one business day. Your details stay private.
        </p>
        <Button type="submit" size="lg" disabled={pending} icon={<ArrowRight className="size-4" />}>
          {pending ? 'Sending…' : submitLabel}
        </Button>
      </div>

      {state.status === 'error' ? (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="rounded-xl border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger outline-none"
        >
          {state.message}
        </div>
      ) : null}
    </form>
  )
}

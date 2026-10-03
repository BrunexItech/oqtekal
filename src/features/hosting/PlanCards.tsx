'use client'

import Link from 'next/link'
import { useState } from 'react'

import { buttonClass, Check } from '@/design-system'
import { cn } from '@/lib/cn'
import { formatKes } from '@/lib/site'
import type { HostingPlan } from '@/payload-types'

type Billing = 'monthly' | 'yearly'

const yearly = (p: HostingPlan) => p.priceYearly ?? p.priceMonthly * 10

export const BillingToggle = ({
  value,
  onChange,
}: {
  value: Billing
  onChange: (b: Billing) => void
}) => (
  <div
    role="radiogroup"
    aria-label="Billing period"
    className="inline-flex rounded-full border border-line-strong bg-surface p-1"
  >
    {(['monthly', 'yearly'] as const).map((b) => (
      <button
        key={b}
        type="button"
        role="radio"
        aria-checked={value === b}
        onClick={() => onChange(b)}
        className={cn(
          'h-9 rounded-full px-4 text-sm font-medium transition-colors',
          value === b ? 'bg-fg text-bg' : 'text-muted hover:text-fg',
        )}
      >
        {b === 'monthly' ? 'Monthly' : 'Yearly'}
        {b === 'yearly' ? (
          <span className={cn('ml-1.5 text-xs', value === b ? 'text-bg/70' : 'text-success')}>
            2 months free
          </span>
        ) : null}
      </button>
    ))}
  </div>
)

export const PlanCards = ({
  plans,
  showToggle = true,
}: {
  plans: HostingPlan[]
  showToggle?: boolean
}) => {
  const [billing, setBilling] = useState<Billing>('yearly')
  return (
    <div>
      {showToggle ? (
        <div className="mb-10 flex justify-center">
          <BillingToggle value={billing} onChange={setBilling} />
        </div>
      ) : null}
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((p) => {
          const price = billing === 'monthly' ? p.priceMonthly : yearly(p)
          const href = `/contact?type=hosting&interest=${encodeURIComponent(`${p.name} (${billing})`)}`
          return (
            <li
              key={p.id}
              className={cn(
                'relative flex flex-col rounded-[var(--radius-panel)] border p-7 sm:p-8',
                p.featured
                  ? 'border-transparent bg-ink text-paper shadow-[var(--shadow-float)]'
                  : 'border-line bg-surface',
              )}
            >
              {p.featured ? (
                <span className="absolute top-6 right-6 rounded-full bg-brand-600 px-3 py-1 text-xs font-medium text-white">
                  Most popular
                </span>
              ) : null}
              <h3 className="font-display text-2xl font-semibold tracking-tight">{p.name}</h3>
              <p className={cn('mt-1.5 text-sm', p.featured ? 'text-paper/65' : 'text-muted')}>
                {p.tagline}
              </p>
              <p className="mt-7 flex items-baseline gap-1.5">
                <span className="font-display text-4xl font-semibold tracking-tight">
                  {formatKes(price)}
                </span>
                <span className={cn('text-sm', p.featured ? 'text-paper/60' : 'text-muted')}>
                  / {billing === 'monthly' ? 'month' : 'year'}
                </span>
              </p>
              {p.specs?.length ? (
                <dl
                  className={cn(
                    'mt-7 divide-y border-y text-sm',
                    p.featured ? 'divide-white/10 border-white/10' : 'divide-line border-line',
                  )}
                >
                  {p.specs.map((s) => (
                    <div key={s.id ?? s.label} className="flex justify-between py-2.5">
                      <dt className={p.featured ? 'text-paper/65' : 'text-muted'}>{s.label}</dt>
                      <dd className="font-medium">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
              {p.features?.length ? (
                <ul className="mt-6 space-y-2.5 text-sm">
                  {p.features.map((f) => (
                    <li key={f.id ?? f.label} className="flex items-start gap-2.5">
                      <Check
                        className={cn(
                          'mt-0.5 size-4 shrink-0',
                          p.featured ? 'text-brand-400' : 'text-accent',
                        )}
                      />
                      {f.label}
                    </li>
                  ))}
                </ul>
              ) : null}
              <div className="min-h-8 flex-1" aria-hidden />
              <Link
                href={href}
                className={buttonClass({
                  variant: p.featured ? 'primary' : 'secondary',
                  size: 'md',
                  className: 'mt-auto w-full',
                })}
              >
                Order {p.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

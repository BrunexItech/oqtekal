'use client'

import { useState } from 'react'

import { cn } from '@/lib/cn'
import type { HostingPlan } from '@/payload-types'

import { PlanCards } from './PlanCards'

const CATEGORIES: { value: HostingPlan['category']; label: string }[] = [
  { value: 'web', label: 'Web hosting' },
  { value: 'vps', label: 'Cloud VPS' },
  { value: 'email', label: 'Business email' },
]

/** Full hosting catalogue with category tabs. */
export const HostingPlans = ({ plans }: { plans: HostingPlan[] }) => {
  const available = CATEGORIES.filter((c) => plans.some((p) => p.category === c.value))
  const [category, setCategory] = useState<HostingPlan['category']>(available[0]?.value ?? 'web')
  return (
    <div>
      <div
        role="tablist"
        aria-label="Plan type"
        className="mb-8 no-scrollbar flex justify-center gap-2 overflow-x-auto"
      >
        {available.map((c) => (
          <button
            key={c.value}
            role="tab"
            aria-selected={category === c.value}
            onClick={() => setCategory(c.value)}
            className={cn(
              'h-11 shrink-0 rounded-full border px-5 text-sm font-medium transition-colors',
              category === c.value
                ? 'border-accent bg-accent-soft text-accent'
                : 'border-line-strong text-muted hover:text-fg',
            )}
          >
            {c.label}
          </button>
        ))}
      </div>
      <PlanCards key={category} plans={plans.filter((p) => p.category === category)} />
    </div>
  )
}

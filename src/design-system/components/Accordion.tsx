import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

import { Plus } from '../icons'

type Item = { id?: string | null; question: string; answer: ReactNode }

/** Native <details>: accessible and works without JavaScript. */
export const Accordion = ({ items, className }: { items: Item[]; className?: string }) => (
  <div className={cn('divide-y divide-line border-y border-line', className)}>
    {items.map((item, i) => (
      <details key={item.id ?? i} className="group py-1 [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left text-lg font-medium tracking-tight transition-colors hover:text-accent">
          <span>{item.question}</span>
          <span
            aria-hidden
            className="mt-1 grid size-7 shrink-0 place-items-center rounded-full border border-line-strong transition-transform duration-300 ease-out-expo group-open:rotate-45 group-open:border-accent group-open:text-accent"
          >
            <Plus className="size-4" />
          </span>
        </summary>
        <div className="max-w-3xl pr-12 pb-6 leading-relaxed text-muted">{item.answer}</div>
      </details>
    ))}
  </div>
)

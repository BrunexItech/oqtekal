import Link from 'next/link'

import { ArrowRight } from '@/design-system'
import type { PillarWithServices } from '@/features/services'

/** The service areas as plain cards, plus one card for people who are not sure where to start. */
export const ServicesOverview = ({ pillars }: { pillars: PillarWithServices[] }) => (
  <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    {pillars.map((p) => (
      <li key={p.id}>
        <Link
          href={`/services/${p.slug}`}
          className="group flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-surface p-6 transition-colors hover:border-line-strong"
        >
          <h3 className="font-display text-lg font-semibold tracking-tight group-hover:text-accent">
            {p.title}
          </h3>
          <p className="mt-2 text-[0.95rem] text-muted">{p.summary}</p>
          <span className="mt-auto pt-5 text-sm font-medium text-fg/80">
            {p.serviceList.length} services
          </span>
        </Link>
      </li>
    ))}
    <li>
      <Link
        href="/contact"
        className="group flex h-full flex-col rounded-[var(--radius-card)] bg-ink p-6 text-paper"
      >
        <h3 className="font-display text-lg font-semibold tracking-tight">
          Not sure where to start?
        </h3>
        <p className="mt-2 text-[0.95rem] text-paper/70">
          Tell us the problem. An engineer will recommend the simplest thing that works.
        </p>
        <span className="mt-auto flex items-center gap-1.5 pt-5 text-sm font-medium">
          Talk to us
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </Link>
    </li>
  </ul>
)

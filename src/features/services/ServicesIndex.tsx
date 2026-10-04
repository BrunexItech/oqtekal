import Link from 'next/link'

import { ArrowUpRight } from '@/design-system'
import { cn } from '@/lib/cn'

import type { PillarWithServices } from './queries'

/** Numbered editorial list of service groups — typography instead of icon grids. */
export const ServicesIndex = ({
  pillars,
  inverse = false,
}: {
  pillars: PillarWithServices[]
  inverse?: boolean
}) => (
  <ol className={cn('border-t', inverse ? 'border-white/10' : 'border-line')}>
    {pillars.map((p, i) => (
      <li key={p.id} className={cn('group border-b', inverse ? 'border-white/10' : 'border-line')}>
        <div className="grid gap-5 py-9 md:grid-cols-[5rem_minmax(0,1fr)_minmax(0,1.15fr)] md:gap-8 md:py-11 lg:grid-cols-[6rem_minmax(0,1fr)_minmax(0,1.2fr)]">
          <span className="pt-2 text-label text-accent">{String(i + 1).padStart(2, '0')}</span>
          <div>
            <h3>
              <Link
                href={`/services/${p.slug}`}
                className="font-display text-[clamp(1.45rem,1.2rem+1vw,2.1rem)] leading-[1.05] font-semibold tracking-tight transition-colors hover:text-accent"
              >
                {p.title}
                <ArrowUpRight className="ml-2 inline size-6 -translate-y-1 align-middle opacity-40 transition-all duration-300 group-hover:opacity-100" />
              </Link>
            </h3>
            <p className={cn('mt-4 max-w-md', inverse ? 'text-paper/65' : 'text-muted')}>
              {p.summary}
            </p>
          </div>
          <ul className="flex flex-wrap content-start gap-2 md:pt-2">
            {p.serviceList.map((s) => (
              <li key={s.id}>
                <Link
                  href={s.path ?? `/services/${p.slug}`}
                  className={cn(
                    'inline-flex rounded-full border px-3.5 py-1.5 text-sm transition-colors',
                    inverse
                      ? 'border-white/15 text-paper/80 hover:border-white/50 hover:text-white'
                      : 'border-line-strong text-muted hover:border-fg hover:text-fg',
                  )}
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </li>
    ))}
  </ol>
)

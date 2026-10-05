'use client'

import Link from 'next/link'
import { useState, type ReactNode } from 'react'

import { ArrowUpRight } from '@/design-system'
import { cn } from '@/lib/cn'

export type IndexItem = {
  slug: string
  name: string
  tagline: string
  category: string
  /** Availability tag, rendered on the server. */
  tag: ReactNode
  /** Picture shown beside the list while this row is pointed at or focused. */
  media: ReactNode
}

/**
 * The products as an editorial index: one numbered line each. On wide screens a single frame
 * beside the list shows the product being pointed at; on phones it is a clean list.
 */
export const ProductIndex = ({ items }: { items: IndexItem[] }) => {
  const [active, setActive] = useState(0)
  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_minmax(0,30rem)]">
      <ol className="border-b border-line">
        {items.map((item, i) => (
          <li key={item.slug} className="border-t border-line">
            <Link
              href={`/products/${item.slug}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="group grid grid-cols-[2.25rem_minmax(0,1fr)_auto] items-baseline gap-x-3 py-6 transition-colors duration-300 sm:grid-cols-[3.5rem_minmax(0,1fr)_auto] sm:gap-x-5 md:py-7"
            >
              <span
                className={cn(
                  'text-label transition-colors duration-300',
                  i === active ? 'text-accent' : 'text-subtle',
                )}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="min-w-0">
                <span className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <h2 className="font-display text-[1.5rem] leading-tight font-semibold tracking-tight transition-transform duration-500 ease-out-expo group-hover:translate-x-1.5 sm:text-[1.75rem]">
                    {item.name}
                  </h2>
                  {item.tag}
                </span>
                <span className="mt-2 block text-muted">{item.tagline}</span>
                <span className="mt-2 block text-label text-subtle">{item.category}</span>
              </span>
              <ArrowUpRight className="size-5 self-center text-subtle transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
            </Link>
          </li>
        ))}
      </ol>

      <div aria-hidden data-decorative className="hidden lg:block">
        <div className="sticky top-28">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-panel)] bg-surface-2 shadow-[var(--shadow-float)]">
            {items.map((item, i) => (
              <div
                key={item.slug}
                className={cn(
                  'absolute inset-0 transition-[opacity,transform] duration-700 ease-out-expo',
                  i === active ? 'scale-100 opacity-100' : 'scale-[1.04] opacity-0',
                )}
              >
                {item.media}
              </div>
            ))}
          </div>
          <p className="mt-4 flex items-baseline justify-between gap-4 text-sm text-muted">
            <span className="font-medium text-fg">{items[active]?.name}</span>
            <span className="text-label text-subtle">
              {String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

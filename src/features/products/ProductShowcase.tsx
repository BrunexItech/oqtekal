'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Link from 'next/link'
import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'

import { ArrowRight, ArrowUpRight, Check } from '@/design-system'
import { cn } from '@/lib/cn'

export type ShowcaseItem = {
  slug: string
  name: string
  tagline: string
  category: string
  summary: string
  features: string[]
  media: ReactNode
}

/** Home-page product explorer: accessible vertical tabs on desktop, scrollable pills on mobile. */
export const ProductShowcase = ({ items }: { items: ShowcaseItem[] }) => {
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()
  const id = useId()
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const current = items[active]
  if (!current) return null

  const onKey = (e: KeyboardEvent) => {
    const keys = ['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft', 'Home', 'End']
    if (!keys.includes(e.key)) return
    e.preventDefault()
    let next = active
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (active + 1) % items.length
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft')
      next = (active - 1 + items.length) % items.length
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = items.length - 1
    setActive(next)
    tabs.current[next]?.focus()
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[minmax(0,23rem)_minmax(0,1fr)]">
      <div
        role="tablist"
        aria-label="Products"
        aria-orientation="vertical"
        onKeyDown={onKey}
        className="-mx-4 no-scrollbar flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0"
      >
        {items.map((item, i) => {
          const selected = i === active
          return (
            <button
              key={item.slug}
              ref={(el) => {
                tabs.current[i] = el
              }}
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${id}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={cn(
                'group relative shrink-0 rounded-full border px-4 py-2 text-left transition-colors duration-300 lg:rounded-2xl lg:border-0 lg:px-5 lg:py-4',
                selected
                  ? 'border-fg bg-fg text-bg lg:bg-surface lg:text-fg lg:shadow-[var(--shadow-card)]'
                  : 'border-line-strong text-muted hover:text-fg lg:hover:bg-surface/60',
              )}
            >
              <span className="hidden text-label text-subtle lg:block">{item.category}</span>
              <span className="block font-medium whitespace-nowrap lg:mt-1 lg:font-display lg:text-lg lg:font-semibold lg:tracking-tight">
                {item.name}
              </span>
              <span
                className={cn(
                  'hidden overflow-hidden text-sm leading-snug text-muted transition-[max-height,opacity,margin] duration-500 ease-out-expo lg:block',
                  selected ? 'mt-1.5 max-h-20 opacity-100' : 'max-h-0 opacity-0',
                )}
              >
                {item.tagline}
              </span>
              {selected ? (
                <span
                  aria-hidden
                  className="absolute inset-y-4 left-0 hidden w-[3px] rounded-full bg-accent lg:block"
                />
              ) : null}
            </button>
          )
        })}
      </div>

      <div
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${active}`}
        className="min-w-0"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.slug}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {current.media}
            <div className="mt-8 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <p className="max-w-xl text-lead text-muted">{current.summary}</p>
                <ul className="mt-5 grid gap-x-6 gap-y-2 sm:grid-cols-3">
                  {current.features.slice(0, 3).map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href={`/products/${current.slug}`}
                className="group/l inline-flex items-center gap-2 self-start rounded-full border border-line-strong px-5 py-3 font-medium whitespace-nowrap transition-colors hover:border-fg md:self-end"
              >
                Explore {current.name}
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/l:translate-x-0.5 group-hover/l:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
        <Link href="/products" className="sr-only focus:not-sr-only">
          All products <ArrowRight className="inline size-4" />
        </Link>
      </div>
    </div>
  )
}

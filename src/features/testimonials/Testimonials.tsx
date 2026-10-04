'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'

import { ArrowRight } from '@/design-system'
import { SampleBadge } from '@/features/placeholder'
import { cn } from '@/lib/cn'
import type { Testimonial } from '@/payload-types'

/** One large quote at a time, with previous / next controls. */
export const Testimonials = ({ items }: { items: Testimonial[] }) => {
  const [i, setI] = useState(0)
  const reduce = useReducedMotion()
  const t = items[i]
  if (!t) return null
  const go = (d: number) => setI((cur) => (cur + d + items.length) % items.length)

  return (
    <figure className="relative">
      <span
        aria-hidden
        className="block font-display text-[6rem] leading-[0.6] text-accent md:text-[9rem]"
      >
        “
      </span>
      <div className="min-h-[14rem] sm:min-h-[12rem] md:min-h-[13rem]" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={t.id}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <blockquote className="max-w-4xl font-display text-[clamp(1.25rem,1.05rem+0.9vw,1.85rem)] leading-[1.25] font-medium tracking-tight">
              {t.quote}
            </blockquote>
            <figcaption className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="font-semibold">{t.name}</span>
              <span className="text-muted">{[t.role, t.company].filter(Boolean).join(', ')}</span>
              <SampleBadge show={t.isPlaceholder} className="text-muted" />
            </figcaption>
          </motion.div>
        </AnimatePresence>
      </div>

      {items.length > 1 ? (
        <div className="mt-10 flex items-center gap-4">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="grid size-12 place-items-center rounded-full border border-line-strong transition-colors hover:border-fg"
          >
            <ArrowRight className="size-5 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="grid size-12 place-items-center rounded-full border border-line-strong transition-colors hover:border-fg"
          >
            <ArrowRight className="size-5" />
          </button>
          <div className="ml-2 flex gap-1.5" aria-hidden>
            {items.map((item, n) => (
              <span
                key={item.id}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-500',
                  n === i ? 'w-8 bg-accent' : 'w-1.5 bg-line-strong',
                )}
              />
            ))}
          </div>
          <span className="sr-only">
            Testimonial {i + 1} of {items.length}
          </span>
        </div>
      ) : null}
    </figure>
  )
}

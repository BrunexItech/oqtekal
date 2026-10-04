'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

import { useHeroRotation } from './HeroRotation'

export type HeroSlide = {
  key: string
  /** Short product name for the tab, e.g. "School". */
  label: string
  /** The product window (rendered on the server, passed in). */
  visual: ReactNode
  /** Two floating facts shown beside the window. */
  chips: [{ value: string; label: string }, { value: string; label: string }]
}

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * The hero's product stage: a tilted window that morphs between real products in step with the
 * headline's last word, with floating facts and clickable progress tabs.
 */
export const HeroShowcase = ({
  slides,
  className,
}: {
  slides: HeroSlide[]
  className?: string
}) => {
  const { index, interval, playing, goTo, setHover } = useHeroRotation()
  const reduce = useReducedMotion()
  const slide = slides[index % slides.length]
  if (!slide) return null

  return (
    <div
      className={cn('relative', className)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative [perspective:1800px]">
        {/* Glow and depth: two "ghost" windows behind the live one */}
        <div
          aria-hidden
          className="absolute inset-[6%] rounded-[2rem] bg-[radial-gradient(circle,rgb(6_77_251/0.28),transparent_68%)] blur-3xl"
        />
        <div
          className="relative transition-transform duration-700 ease-out-expo lg:origin-left lg:[transform:rotateY(-9deg)_rotateX(4deg)_scale(0.9)] lg:hover:[transform:rotateY(-4deg)_rotateX(2deg)_scale(0.92)]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div
            aria-hidden
            className="absolute inset-0 hidden rounded-[0.9rem] border border-line bg-surface/60 lg:block"
            style={{ transform: 'translate3d(4%, -6%, -120px)' }}
          />
          <div
            aria-hidden
            className="absolute inset-0 hidden rounded-[0.9rem] border border-line bg-surface/80 lg:block"
            style={{ transform: 'translate3d(2%, -3%, -60px)' }}
          />

          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={slide.key}
              initial={reduce ? false : { opacity: 0, y: 26, scale: 0.97, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={
                reduce ? { opacity: 0 } : { opacity: 0, y: -18, scale: 0.985, filter: 'blur(6px)' }
              }
              transition={{ duration: 0.8, ease: EASE }}
              className="relative rounded-[0.95rem] shadow-[0_40px_90px_-40px_rgb(11_15_25/0.55)] ring-1 ring-line-strong/60"
            >
              {slide.visual}
            </motion.div>
          </AnimatePresence>

          {/* Floating facts */}
          <AnimatePresence mode="popLayout" initial={false}>
            {slide.chips.map((chip, i) => (
              <motion.div
                key={`${slide.key}-${i}`}
                aria-hidden
                initial={reduce ? false : { opacity: 0, scale: 0.85, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.25 + i * 0.12 }}
                className={cn(
                  'absolute hidden rounded-2xl border border-line bg-surface/95 px-4 py-3 shadow-[var(--shadow-float)] backdrop-blur sm:block',
                  i === 0 ? '-bottom-6 -left-3 lg:-left-8' : '-top-5 -right-2 lg:right-2',
                )}
                style={{ transform: 'translateZ(70px)' }}
              >
                <p className="font-display text-xl leading-none font-semibold tracking-tight">
                  {chip.value}
                </p>
                <p className="mt-1 text-xs text-muted">{chip.label}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Progress tabs */}
      <div
        role="group"
        aria-label="Products shown"
        className="relative mt-10 no-scrollbar flex gap-2 overflow-x-auto pb-1 lg:mt-12"
      >
        {slides.map((s, i) => {
          const active = i === index % slides.length
          return (
            <button
              key={s.key}
              type="button"
              onClick={() => goTo(i)}
              aria-pressed={active}
              className={cn(
                'relative shrink-0 overflow-hidden rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                active ? 'border-accent/40 text-fg' : 'border-line text-muted hover:text-fg',
              )}
            >
              {active ? (
                <span
                  key={`${s.key}-${index}`}
                  aria-hidden
                  className="absolute inset-0 origin-left bg-accent-soft"
                  style={
                    playing
                      ? { animation: `tab-fill ${interval}ms linear forwards` }
                      : { transform: 'scaleX(1)' }
                  }
                />
              ) : null}
              <span className="relative">{s.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { ImageLoading } from '@/design-system'
import { cn } from '@/lib/cn'
import type { HomePage } from '@/payload-types'

const PHOTOS = [
  { src: '/images/papers-hands.jpg', alt: 'Mapping a business process on a wall of paper' },
  { src: '/images/wireframe.jpg', alt: 'Hand-drawn website wireframes on grid paper' },
  { src: '/images/code-macbook.jpg', alt: 'Code open on a laptop' },
  { src: '/images/server-green.jpg', alt: 'Servers in a data centre' },
  { src: '/images/monitoring.jpg', alt: 'Live monitoring dashboard' },
]

type Step = NonNullable<HomePage['process']>[number]

/**
 * "How we work" as a story: the photo stays pinned while each step scrolls past and takes over.
 * On phones each step shows its own photo inline.
 */
export const StoryScroll = ({ steps }: { steps: Step[] }) => {
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLLIElement | null)[]>([])
  const reduce = useReducedMotion()

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index))
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    refs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [steps.length])

  const photo = PHOTOS[active % PHOTOS.length]!

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
      {/* Pinned photo (desktop) */}
      <div className="hidden lg:block">
        <div className="sticky top-28 mx-auto aspect-[4/5] max-h-[calc(100svh-9rem)] overflow-hidden rounded-[var(--radius-panel)] bg-ink shadow-[var(--shadow-float)]">
          <ImageLoading tone="dark" />
          <AnimatePresence initial={false}>
            <motion.div
              key={photo.src}
              className="absolute inset-0"
              initial={reduce ? false : { opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image src={photo.src} alt={photo.alt} fill sizes="45vw" className="object-cover" />
            </motion.div>
          </AnimatePresence>
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(0deg,rgb(7_10_18/0.85),transparent_55%)]"
          />
          <div className="absolute inset-x-0 bottom-0 p-8 text-paper">
            <p className="font-mono text-xs tracking-[0.2em] text-brand-400 uppercase">
              Step {active + 1} of {steps.length}
            </p>
            <p className="mt-2 font-display text-3xl font-semibold tracking-tight">
              {steps[active]?.title}
            </p>
            <div className="mt-5 flex gap-1.5">
              {steps.map((s, i) => (
                <span
                  key={s.id ?? i}
                  className={cn(
                    'h-1 rounded-full transition-all duration-500',
                    i === active ? 'w-10 bg-brand-400' : 'w-4 bg-white/30',
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Steps */}
      <ol className="flex flex-col">
        {steps.map((s, i) => {
          const p = PHOTOS[i % PHOTOS.length]!
          return (
            <li
              key={s.id ?? i}
              ref={(el) => {
                refs.current[i] = el
              }}
              data-index={i}
              className={cn(
                'relative border-t border-line py-10 lg:flex lg:min-h-[62svh] lg:flex-col lg:justify-center lg:py-16 lg:pl-8',
                'lg:before:absolute lg:before:top-16 lg:before:bottom-16 lg:before:left-0 lg:before:w-[3px] lg:before:rounded-full lg:before:transition-colors lg:before:duration-500',
                i === active ? 'lg:before:bg-accent' : 'lg:before:bg-line',
              )}
            >
              <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-[var(--radius-card)] lg:hidden">
                <ImageLoading />
                <Image src={p.src} alt={p.alt} fill sizes="100vw" className="object-cover" />
              </div>
              <p className="flex items-center gap-3 font-mono text-xs tracking-[0.18em] text-accent uppercase">
                <span>{String(i + 1).padStart(2, '0')}</span>
                {s.duration ? <span className="text-subtle">· {s.duration}</span> : null}
              </p>
              <h3 className="mt-4 text-h1">{s.title}</h3>
              <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted">{s.text}</p>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

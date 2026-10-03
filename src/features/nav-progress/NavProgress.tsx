'use client'

import { usePathname, useSearchParams } from 'next/navigation'

import { SYMBOL_PATH, SYMBOL_TRANSFORM } from '@/features/brand'
import { useEffect, useRef, useState } from 'react'

/**
 * Brand progress bar for page-to-page navigation. Starts the instant an internal link is clicked
 * (so a click never feels ignored) and completes when the new page has rendered. If a page takes
 * longer than ~0.6s, a small branded spinner also appears, so a slow network never looks frozen.
 */
export const NavProgress = () => {
  const pathname = usePathname()
  const search = useSearchParams()
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle')
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  // Start on internal link clicks that change the page.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return
      const a = (e.target as Element | null)?.closest?.('a')
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return
      const url = new URL(a.href, location.href)
      if (url.origin !== location.origin) return
      if (url.pathname === location.pathname && url.search === location.search) return
      clearTimeout(timer.current)
      setState('loading')
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  // Finish when the route has changed.
  const key = `${pathname}?${search.toString()}`
  const [lastKey, setLastKey] = useState(key)
  if (key !== lastKey) {
    setLastKey(key)
    if (state === 'loading') setState('done')
  }
  useEffect(() => {
    if (state !== 'done') return
    timer.current = setTimeout(() => setState('idle'), 450)
    return () => clearTimeout(timer.current)
  }, [state])

  return (
    <>
      <div
        aria-hidden
        className={`pointer-events-none fixed top-4 left-1/2 z-[90] -translate-x-1/2 transition-[opacity,transform] duration-300 ${
          state === 'loading'
            ? 'translate-y-0 opacity-100 delay-[600ms]'
            : '-translate-y-2 opacity-0 delay-0'
        }`}
      >
        <span className="flex items-center gap-2.5 rounded-full border border-line bg-surface/95 py-1.5 pr-4 pl-1.5 text-sm text-muted shadow-[var(--shadow-float)] backdrop-blur">
          <span className="relative grid size-7 place-items-center">
            <svg
              viewBox="0 0 28 28"
              className="absolute inset-0 size-full animate-spin [animation-duration:0.9s]"
            >
              <circle cx="14" cy="14" r="12" fill="none" stroke="var(--line)" strokeWidth="2" />
              <circle
                cx="14"
                cy="14"
                r="12"
                fill="none"
                stroke="var(--brand-600)"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeDasharray="20 56"
              />
            </svg>
            <svg viewBox="0 0 100 100" className="size-3.5">
              <path
                transform={SYMBOL_TRANSFORM}
                d={SYMBOL_PATH}
                fill="var(--brand-600)"
                fillRule="evenodd"
              />
            </svg>
          </span>
          Loading
        </span>
      </div>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-[90] h-[3px]"
        style={{ opacity: state === 'idle' ? 0 : 1, transition: 'opacity 300ms ease' }}
      >
        <div
          className="h-full origin-left bg-gradient-to-r from-brand-400 via-brand-600 to-brand-400 shadow-[0_0_10px_rgb(47_168_255/0.7)]"
          style={{
            transform: `scaleX(${state === 'idle' ? 0 : state === 'loading' ? 0.85 : 1})`,
            transition:
              state === 'loading'
                ? 'transform 8s cubic-bezier(0.1, 0.9, 0.2, 1)'
                : state === 'done'
                  ? 'transform 250ms ease-out'
                  : 'none',
          }}
        />
      </div>
    </>
  )
}

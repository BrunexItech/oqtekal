'use client'

import { useEffect } from 'react'

const MIN_MS = 1300 // let the mark finish drawing
const MAX_MS = 4500 // never hold a visitor longer than this

/**
 * Opens the intro curtain only when the page is genuinely ready (fonts + full load),
 * so visitors never see a half-loaded page — bounded by a minimum and a maximum time.
 */
export const IntroCleanup = () => {
  useEffect(() => {
    const root = document.documentElement
    if (!root.dataset.intro) return

    const started = performance.now()
    const loaded = new Promise<void>((resolve) => {
      if (document.readyState === 'complete') resolve()
      else window.addEventListener('load', () => resolve(), { once: true })
    })
    const ready = Promise.all([loaded, document.fonts?.ready ?? Promise.resolve()])
    const timeout = new Promise<void>((resolve) => setTimeout(resolve, MAX_MS))

    let removeTimer: ReturnType<typeof setTimeout> | undefined
    let cancelled = false
    void Promise.race([ready, timeout]).then(() => {
      if (cancelled) return
      const wait = Math.max(0, MIN_MS - (performance.now() - started))
      setTimeout(() => {
        root.dataset.intro = 'out'
        removeTimer = setTimeout(() => delete root.dataset.intro, 1100)
      }, wait)
    })
    return () => {
      cancelled = true
      clearTimeout(removeTimer)
    }
  }, [])
  return null
}

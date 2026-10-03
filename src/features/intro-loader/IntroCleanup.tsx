'use client'

import { useEffect } from 'react'

/** Removes the intro flag after the animation so the overlay leaves the DOM flow entirely. */
export const IntroCleanup = () => {
  useEffect(() => {
    const root = document.documentElement
    if (!root.dataset.intro) return
    const t = setTimeout(() => delete root.dataset.intro, 2200)
    return () => clearTimeout(t)
  }, [])
  return null
}

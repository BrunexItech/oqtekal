'use client'

import { useReducedMotion } from 'motion/react'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type Rotation = {
  index: number
  count: number
  /** Milliseconds each slide stays on screen. */
  interval: number
  /** False when the visitor prefers reduced motion or is hovering the showcase. */
  playing: boolean
  goTo: (i: number) => void
  setHover: (hovering: boolean) => void
}

const Ctx = createContext<Rotation | null>(null)

/** One clock for the hero: the headline's last word and the product showcase change together. */
export const HeroRotationProvider = ({
  count,
  interval = 4200,
  children,
}: {
  count: number
  interval?: number
  children: ReactNode
}) => {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [hover, setHover] = useState(false)
  const playing = !reduce && !hover && count > 1

  useEffect(() => {
    if (!playing) return
    const t = setTimeout(() => setIndex((v) => (v + 1) % count), interval)
    return () => clearTimeout(t)
  }, [playing, count, interval, index])

  const goTo = useCallback((i: number) => setIndex(((i % count) + count) % count), [count])
  const value = useMemo(
    () => ({ index, count, interval, playing, goTo, setHover }),
    [index, count, interval, playing, goTo],
  )
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useHeroRotation = (): Rotation => {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useHeroRotation must be used inside <HeroRotationProvider>')
  return ctx
}

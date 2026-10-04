'use client'

import { AnimatePresence, motion } from 'motion/react'

import { useHeroRotation } from './HeroRotation'

/**
 * The last word of the headline, driven by the shared hero clock. All words are stacked in one
 * grid cell so the line keeps the width of the longest word (no layout shift); screen readers
 * get the full list.
 */
export const RotatingWord = ({ words }: { words: string[] }) => {
  const { index } = useHeroRotation()
  const word = words[index % words.length] ?? words[0]

  return (
    <span className="relative inline-grid align-bottom">
      <span className="sr-only">{words.join(', ')}</span>
      {words.map((w) => (
        <span key={w} aria-hidden className="invisible col-start-1 row-start-1 whitespace-nowrap">
          {w}
        </span>
      ))}
      <span
        aria-hidden
        className="relative col-start-1 row-start-1 block overflow-hidden pb-[0.08em]"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={word}
            className="block whitespace-nowrap text-accent"
            initial={{ y: '100%', opacity: 0, filter: 'blur(6px)' }}
            animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: '-100%', opacity: 0, filter: 'blur(6px)' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  )
}

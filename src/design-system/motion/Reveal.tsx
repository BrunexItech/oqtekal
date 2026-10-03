'use client'

import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1] as const

type Props = HTMLMotionProps<'div'> & { delay?: number; y?: number }

/** Fades and lifts content in once when it scrolls into view. */
export const Reveal = ({ delay = 0, y = 18, children, ...rest }: Props) => {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/** Staggers direct children that are <RevealItem>s. */
export const RevealGroup = ({
  children,
  stagger = 0.08,
  ...rest
}: HTMLMotionProps<'div'> & { stagger?: number }) => {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      variants={{ show: { transition: { staggerChildren: stagger } } }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export const RevealItem = ({ children, ...rest }: HTMLMotionProps<'div'>) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 18 },
      show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
    }}
    {...rest}
  >
    {children}
  </motion.div>
)

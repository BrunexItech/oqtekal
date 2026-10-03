import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

import { Eyebrow } from './Eyebrow'
import { Heading } from './Heading'
import { Text } from './Text'

type Props = {
  eyebrow?: string | null
  index?: string
  heading: ReactNode
  text?: string | null
  action?: ReactNode
  align?: 'start' | 'center'
  as?: 'h1' | 'h2'
  level?: 'display' | 'h1' | 'h2'
  className?: string
}

/** Eyebrow + heading + intro, with an optional action aligned to the right on wide screens. */
export const SectionHeader = ({
  eyebrow,
  index,
  heading,
  text,
  action,
  align = 'start',
  as = 'h2',
  level = 'h1',
  className,
}: Props) => (
  <div
    className={cn(
      'flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12',
      align === 'center' && 'items-center text-center md:flex-col md:items-center',
      className,
    )}
  >
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto')}>
      {eyebrow ? (
        <Eyebrow index={index} className={cn('mb-5', align === 'center' && 'justify-center')}>
          {eyebrow}
        </Eyebrow>
      ) : null}
      <Heading as={as} level={level}>
        {heading}
      </Heading>
      {text ? (
        <Text size="lead" className="mt-5 max-w-2xl">
          {text}
        </Text>
      ) : null}
    </div>
    {action ? <div className="shrink-0">{action}</div> : null}
  </div>
)

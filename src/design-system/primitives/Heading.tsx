import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '@/lib/cn'

type Level = 'display-xl' | 'display' | 'h1' | 'h2' | 'h3'
type Tag = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'

const styles: Record<Level, string> = {
  'display-xl': 'text-display-xl',
  display: 'text-display',
  h1: 'text-h1',
  h2: 'text-h2',
  h3: 'text-h3',
}

type Props = ComponentPropsWithoutRef<'h2'> & { as?: Tag; level?: Level }

/** Visual size (`level`) is independent from the semantic tag (`as`). */
export const Heading = ({ as: Tag = 'h2', level = 'h2', className, ...rest }: Props) => (
  <Tag className={cn(styles[level], className)} {...rest} />
)

import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '@/lib/cn'

type Props = ComponentPropsWithoutRef<'p'> & {
  size?: 'lead' | 'base' | 'small'
  tone?: 'default' | 'muted'
}

export const Text = ({ size = 'base', tone = 'muted', className, ...rest }: Props) => (
  <p
    className={cn(
      size === 'lead' && 'text-lead',
      size === 'base' && 'text-base leading-relaxed',
      size === 'small' && 'text-sm leading-relaxed',
      tone === 'muted' ? 'text-muted' : 'text-fg',
      className,
    )}
    {...rest}
  />
)

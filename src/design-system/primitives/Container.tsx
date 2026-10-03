import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '@/lib/cn'

/** Horizontal page gutter + max width. */
export const Container = ({ className, ...rest }: ComponentPropsWithoutRef<'div'>) => (
  <div className={cn('container-x', className)} {...rest} />
)

import Link from 'next/link'
import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '@/lib/cn'

import { ArrowRight } from '../icons'

/** Text link with an arrow that nudges on hover. */
export const ArrowLink = ({
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<typeof Link>) => (
  <Link
    className={cn(
      'group/arrow inline-flex items-center gap-1.5 font-medium text-fg underline decoration-line-strong decoration-1 underline-offset-[6px] transition-colors hover:text-accent hover:decoration-current',
      className,
    )}
    {...rest}
  >
    {children}
    <ArrowRight className="size-4 transition-transform duration-300 ease-out-expo group-hover/arrow:translate-x-1" />
  </Link>
)

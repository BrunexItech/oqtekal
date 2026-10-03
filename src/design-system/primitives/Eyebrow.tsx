import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '@/lib/cn'

/** Small mono label above headings, optionally numbered: "01 — Services". */
export const Eyebrow = ({
  index,
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<'p'> & { index?: string }) => (
  <p className={cn('flex items-center gap-3 text-label text-muted', className)} {...rest}>
    {index ? (
      <span className="text-accent">{index}</span>
    ) : (
      <span aria-hidden className="h-px w-6 bg-current opacity-50" />
    )}
    <span>{children}</span>
  </p>
)

import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '@/lib/cn'

type Tone = 'neutral' | 'accent' | 'success'

const tones: Record<Tone, string> = {
  neutral: 'border-line bg-surface text-muted',
  accent: 'border-transparent bg-accent-soft text-accent',
  success: 'border-transparent bg-success/10 text-success',
}

export const Tag = ({
  tone = 'neutral',
  className,
  ...rest
}: ComponentPropsWithoutRef<'span'> & { tone?: Tone }) => (
  <span
    className={cn(
      'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium',
      tones[tone],
      className,
    )}
    {...rest}
  />
)

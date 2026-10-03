import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '@/lib/cn'

type Tone = 'default' | 'surface' | 'inverse'

const tones: Record<Tone, string> = {
  default: '',
  surface: 'bg-surface-2/60',
  // Inverse sections are always dark, regardless of theme.
  inverse:
    'bg-ink text-paper [--fg:#f2f1ed] [--muted:#a3a8b3] [--line:#1f2533] [--line-strong:#2d3546] [--surface:#111725] [--surface-2:#161d2d] [--accent:#4d86ff]',
}

type Props = ComponentPropsWithoutRef<'section'> & {
  tone?: Tone
  spacing?: 'default' | 'tight' | 'none'
}

export const Section = ({ tone = 'default', spacing = 'default', className, ...rest }: Props) => (
  <section
    className={cn(
      'relative',
      tones[tone],
      spacing === 'default' && 'section-y',
      spacing === 'tight' && 'py-14 md:py-20',
      className,
    )}
    {...rest}
  />
)

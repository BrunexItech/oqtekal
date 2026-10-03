import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

/** Endless horizontal scroll. Content is duplicated once; pauses on hover; static for reduced motion. */
export const Marquee = ({
  children,
  duration = 40,
  className,
}: {
  children: ReactNode
  duration?: number
  className?: string
}) => (
  <div
    className={cn(
      'group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]',
      className,
    )}
  >
    <div
      className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused] motion-reduce:animate-none"
      style={{ ['--marquee-duration' as string]: `${duration}s` }}
    >
      <div className="flex shrink-0 items-center">{children}</div>
      <div aria-hidden className="flex shrink-0 items-center">
        {children}
      </div>
    </div>
  </div>
)

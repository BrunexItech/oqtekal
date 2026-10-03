import { cn } from '@/lib/cn'

import { SYMBOL_PATH, SYMBOL_TRANSFORM } from './symbol'

/** The ribbon mark as inline SVG, in the current colour or the brand gradient. */
export const Symbol = ({
  className,
  gradient = false,
  title,
}: {
  className?: string
  gradient?: boolean
  title?: string
}) => {
  const id = 'oq-symbol-grad'
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn('size-10', className)}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {gradient ? (
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2FA8FF" />
            <stop offset="0.55" stopColor="#064DFB" />
            <stop offset="1" stopColor="#14246E" />
          </linearGradient>
        </defs>
      ) : null}
      <path
        transform={SYMBOL_TRANSFORM}
        d={SYMBOL_PATH}
        fill={gradient ? `url(#${id})` : 'currentColor'}
        fillRule="evenodd"
      />
    </svg>
  )
}

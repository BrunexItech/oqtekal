import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/lib/cn'

/**
 * The approved wordmark. Light and dark artwork are both rendered and swapped with CSS,
 * so the correct one shows instantly without waiting for JavaScript.
 */
export const Logo = ({
  className,
  priority,
  variant = 'auto',
  tagline = false,
}: {
  className?: string
  priority?: boolean
  /** auto = follow theme; light = for light backgrounds; dark = for dark backgrounds */
  variant?: 'auto' | 'light' | 'dark'
  tagline?: boolean
}) => {
  const base = tagline ? 'oqtekal-logo-tagline' : 'oqtekal-logo'
  const [w, h] = tagline ? [2119, 621] : [2115, 581]
  const img = (suffix: string, extra: string) => (
    <Image
      src={`/brand/${base}${suffix}.png`}
      alt="Oqtekal"
      width={w}
      height={h}
      priority={priority}
      sizes="(min-width: 768px) 200px, 150px"
      className={cn('h-full w-auto', extra)}
    />
  )
  if (variant === 'light') return <span className={cn('block', className)}>{img('', '')}</span>
  if (variant === 'dark') return <span className={cn('block', className)}>{img('-dark-bg', '')}</span>
  return (
    <span className={cn('block', className)}>
      {img('', 'dark:hidden')}
      {img('-dark-bg', 'hidden dark:block')}
    </span>
  )
}

export const LogoLink = ({ className }: { className?: string }) => (
  <Link href="/" aria-label="Oqtekal home" className={cn('block', className)}>
    <Logo priority className="h-9 md:h-10" />
  </Link>
)

import Link from 'next/link'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'inverse'
type Size = 'sm' | 'md' | 'lg'

const base =
  'group/btn relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-tight transition-[background-color,color,box-shadow,transform] duration-200 ease-out-expo active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50'

const variants: Record<Variant, string> = {
  primary: 'bg-brand-600 text-white shadow-[0_8px_24px_-10px_rgb(6_77_251/0.7)] hover:bg-brand-700',
  secondary: 'border border-line-strong bg-surface text-fg hover:border-fg/40',
  ghost: 'text-fg hover:bg-surface-2',
  inverse: 'bg-paper text-ink hover:bg-white',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-[0.95rem]',
  lg: 'h-13 px-7 text-base',
}

type Common = {
  variant?: Variant
  size?: Size
  icon?: ReactNode
  className?: string
  children: ReactNode
}

export const buttonClass = ({
  variant = 'primary',
  size = 'md',
  className,
}: Omit<Common, 'children'>) => cn(base, variants[variant], sizes[size], className)

const Inner = ({ children, icon }: Pick<Common, 'children' | 'icon'>) => (
  <>
    <span>{children}</span>
    {icon ? (
      <span
        aria-hidden
        className="transition-transform duration-300 ease-out-expo group-hover/btn:translate-x-0.5"
      >
        {icon}
      </span>
    ) : null}
  </>
)

export const Button = ({
  variant,
  size,
  icon,
  className,
  children,
  ...rest
}: Common & Omit<ComponentPropsWithoutRef<'button'>, 'children'>) => (
  <button className={buttonClass({ variant, size, className })} {...rest}>
    <Inner icon={icon}>{children}</Inner>
  </button>
)

export const ButtonLink = ({
  variant,
  size,
  icon,
  className,
  children,
  href,
  ...rest
}: Common & Omit<ComponentPropsWithoutRef<typeof Link>, 'children'>) => {
  const external = typeof href === 'string' && /^(https?:|mailto:|tel:)/.test(href)
  return (
    <Link
      href={href}
      className={buttonClass({ variant, size, className })}
      {...(external
        ? {
            target: href.toString().startsWith('http') ? '_blank' : undefined,
            rel: 'noopener noreferrer',
          }
        : {})}
      {...rest}
    >
      <Inner icon={icon}>{children}</Inner>
    </Link>
  )
}

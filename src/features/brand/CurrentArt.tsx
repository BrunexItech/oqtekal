import { cn } from '@/lib/cn'

/**
 * The still version of the hero artwork (public/brand/current-field.svg, made by
 * `npm run brand:art`): current lines lit in brand blue where they cross the Oqtekal mark.
 * For dark (ink) surfaces. Decorative — position and fade it with `className`.
 */
export const CurrentArt = ({ className }: { className?: string }) => (
  // A plain <img>: the file is a static SVG, so the image optimiser has nothing to add.
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src="/brand/current-field.svg"
    alt=""
    aria-hidden
    decoding="async"
    className={cn('pointer-events-none absolute inset-0 size-full object-cover', className)}
  />
)

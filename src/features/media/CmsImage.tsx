import Image, { type ImageProps } from 'next/image'

import type { Media } from '@/payload-types'

/** Renders an admin-uploaded image, honouring the focal point editors set. */
export const CmsImage = ({
  media,
  className,
  sizes = '100vw',
  priority,
  fill = true,
  alt,
}: {
  media: Media
  className?: string
  sizes?: string
  priority?: boolean
  fill?: boolean
  alt?: string
} & Pick<ImageProps, 'priority'>) => {
  if (!media.url) return null
  const position = `${media.focalX ?? 50}% ${media.focalY ?? 50}%`
  return fill ? (
    <Image
      src={media.url}
      alt={alt ?? media.alt}
      fill
      sizes={sizes}
      priority={priority}
      className={className}
      style={{ objectFit: 'cover', objectPosition: position }}
    />
  ) : (
    <Image
      src={media.url}
      alt={alt ?? media.alt}
      width={media.width ?? 1200}
      height={media.height ?? 800}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  )
}

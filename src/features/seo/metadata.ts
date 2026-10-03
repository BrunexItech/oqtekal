import type { Metadata } from 'next'

import { asMedia } from '@/lib/media'
import { absoluteUrl } from '@/lib/site'
import type { Media } from '@/payload-types'

type Seo =
  | { title?: string | null; description?: string | null; image?: number | Media | null }
  | null
  | undefined

/** Page metadata with admin overrides, canonical URL and a branded share image. */
export const buildMetadata = ({
  title,
  description,
  path,
  seo,
  eyebrow,
  type = 'website',
}: {
  title: string
  description: string
  path: string
  seo?: Seo
  eyebrow?: string
  type?: 'website' | 'article'
}): Metadata => {
  const finalTitle = seo?.title || title
  const finalDescription = seo?.description || description
  const custom = asMedia(seo?.image)
  const ogImage = custom?.url
    ? absoluteUrl(custom.url)
    : `/og?${new URLSearchParams({ title: finalTitle, ...(eyebrow ? { eyebrow } : {}) }).toString()}`

  return {
    title: finalTitle,
    description: finalDescription,
    alternates: { canonical: path },
    openGraph: {
      type,
      title: finalTitle,
      description: finalDescription,
      url: path,
      images: [{ url: ogImage, width: 1200, height: 630, alt: finalTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description: finalDescription,
      images: [ogImage],
    },
  }
}

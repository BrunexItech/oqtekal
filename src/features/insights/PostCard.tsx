import Image from 'next/image'
import Link from 'next/link'

import { CmsImage } from '@/features/media'
import { asMedia } from '@/lib/media'
import type { Post } from '@/payload-types'
import { keepTogether } from '@/lib/site'

export const CATEGORY_LABEL: Record<Post['category'], string> = {
  engineering: 'Engineering',
  product: 'Product',
  payments: 'Payments',
  cloud: 'Hosting & cloud',
  company: 'Company',
}

/** Photo used when an article has no cover of its own. */
const FALLBACK_PHOTO: Record<Post['category'], { src: string; alt: string }> = {
  engineering: { src: '/images/code-macbook.jpg', alt: 'Source code on a laptop' },
  product: { src: '/images/wireframe.jpg', alt: 'Wireframe sketches on paper' },
  payments: { src: '/images/phone-cash.jpg', alt: 'A phone payment beside banknotes' },
  cloud: { src: '/images/server-rack.jpg', alt: 'Servers in a data centre rack' },
  company: { src: '/images/whiteboard.jpg', alt: 'A product flow sketched on a whiteboard' },
}

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('en-KE', { day: 'numeric', month: 'short', year: 'numeric' }).format(
    new Date(iso),
  )

/** Uploaded cover, or a branded generated one. */
export const PostCover = ({
  post,
  sizes,
  priority,
}: {
  post: Post
  sizes?: string
  priority?: boolean
}) => {
  const cover = asMedia(post.cover)
  if (cover) return <CmsImage media={cover} sizes={sizes} priority={priority} />
  const photo = FALLBACK_PHOTO[post.category]
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      fill
      sizes={sizes}
      priority={priority}
      className="object-cover"
    />
  )
}

export const PostCard = ({ post }: { post: Post }) => (
  <Link href={`/insights/${post.slug}`} className="group flex h-full flex-col">
    <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-card)]">
      <div className="absolute inset-0 transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]">
        <PostCover post={post} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" />
      </div>
    </div>
    <p className="mt-5 text-sm text-muted">
      {CATEGORY_LABEL[post.category]} ·{' '}
      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
    </p>
    <h3 className="mt-2 font-display text-xl leading-snug font-semibold tracking-tight transition-colors group-hover:text-accent">
      {keepTogether(post.title)}
    </h3>
    <p className="mt-2 line-clamp-2 text-muted">{post.excerpt}</p>
  </Link>
)

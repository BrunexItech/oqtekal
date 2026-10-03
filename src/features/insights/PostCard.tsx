import Link from 'next/link'

import { Symbol } from '@/features/brand'
import { CmsImage } from '@/features/media'
import { cn } from '@/lib/cn'
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

const GRADIENTS: Record<Post['category'], string> = {
  engineering: 'from-[#0b0f19] via-[#14246e] to-[#064dfb]',
  product: 'from-[#064dfb] via-[#2b6bff] to-[#2fa8ff]',
  payments: 'from-[#0c3b2a] via-[#12805c] to-[#3fbf8f]',
  cloud: 'from-[#14246e] via-[#064dfb] to-[#2fa8ff]',
  company: 'from-[#0b0f19] via-[#1f2533] to-[#4f5561]',
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
  return (
    <div className={cn('absolute inset-0 bg-gradient-to-br', GRADIENTS[post.category])}>
      <div
        aria-hidden
        className="absolute inset-0 grid-lines [--grid-line:rgb(255_255_255/0.07)]"
      />
      <Symbol className="absolute -right-[8%] -bottom-[18%] size-[70%] text-white/12" />
      <span className="absolute top-6 left-6 text-label text-white/80">
        {CATEGORY_LABEL[post.category]}
      </span>
    </div>
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

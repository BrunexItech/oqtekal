import Link from 'next/link'

import { ArrowUpRight, Tag } from '@/design-system'
import { keepTogether } from '@/lib/site'
import type { Product } from '@/payload-types'

import { ProductMedia } from './ProductMedia'

const AVAILABILITY: Record<
  Product['availability'],
  { label: string; tone: 'success' | 'accent' | 'neutral' }
> = {
  live: { label: 'Live', tone: 'success' },
  beta: { label: 'Beta', tone: 'accent' },
  soon: { label: 'Coming soon', tone: 'neutral' },
}

export const AvailabilityTag = ({ value }: { value: Product['availability'] }) => {
  const a = AVAILABILITY[value]
  return <Tag tone={a.tone}>{a.label}</Tag>
}

export const ProductCard = ({ product, priority }: { product: Product; priority?: boolean }) => (
  <Link
    href={`/products/${product.slug}`}
    className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-panel)] border border-line bg-surface transition-[border-color,box-shadow,transform] duration-500 ease-out-expo hover:-translate-y-1 hover:border-line-strong hover:shadow-[var(--shadow-float)]"
  >
    <div className="relative overflow-hidden border-b border-line bg-surface-2/60 p-5 sm:p-7">
      <div className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.02]">
        <ProductMedia product={product} priority={priority} />
      </div>
    </div>
    <div className="flex flex-1 flex-col gap-3 p-6 sm:p-8">
      <div className="flex items-center justify-between gap-3">
        <span className="text-label text-subtle">{product.category}</span>
        <AvailabilityTag value={product.availability} />
      </div>
      <h3 className="flex items-center gap-2 font-display text-2xl font-semibold tracking-tight">
        {keepTogether(product.name)}
        <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </h3>
      <p className="font-medium">{product.tagline}</p>
      <p className="text-muted">{product.summary}</p>
    </div>
  </Link>
)

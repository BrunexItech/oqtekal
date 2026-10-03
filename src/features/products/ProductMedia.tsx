import { CmsImage } from '@/features/media'
import { asMedia } from '@/lib/media'
import type { Product } from '@/payload-types'

import { ProductVisual } from './visuals'

/** The first real screenshot if one was uploaded, otherwise the built-in illustration. */
export const ProductMedia = ({
  product,
  priority,
}: {
  product: Pick<Product, 'visual' | 'screenshots' | 'name'>
  priority?: boolean
}) => {
  const shot = asMedia(product.screenshots?.[0]?.image)
  if (shot) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden rounded-[0.9rem] border border-line bg-surface shadow-[var(--shadow-float)]">
        <CmsImage media={shot} sizes="(min-width: 1024px) 60vw, 100vw" priority={priority} />
      </div>
    )
  }
  return <ProductVisual visual={product.visual} />
}

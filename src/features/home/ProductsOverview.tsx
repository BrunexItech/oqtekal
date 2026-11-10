import Link from 'next/link'

import { CmsImage } from '@/features/media'
import { AvailabilityTag } from '@/features/products'
import { asMedia } from '@/lib/media'
import type { Product } from '@/payload-types'

/** A few products as simple photo cards. */
export const ProductsOverview = ({ products }: { products: Product[] }) => (
  <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
    {products.map((p) => {
      const photo = asMedia(p.contextImage)
      return (
        <li key={p.id}>
          <Link href={`/products/${p.slug}`} className="group block">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-surface-2">
              {photo ? (
                <CmsImage
                  media={photo}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
                />
              ) : null}
            </div>
            <div className="mt-5 flex items-center justify-between gap-3">
              <span className="text-sm text-muted">{p.category}</span>
              <AvailabilityTag value={p.availability} />
            </div>
            <h3 className="mt-2 font-display text-xl font-semibold tracking-tight group-hover:text-accent">
              {p.name}
            </h3>
            <p className="mt-1.5 text-muted">{p.tagline}</p>
          </Link>
        </li>
      )
    })}
  </ul>
)

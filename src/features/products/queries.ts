import 'server-only'

import { cache } from 'react'

import { cachedQuery } from '@/lib/cache'
import { getPayloadClient, isDraft, publishedOnly } from '@/lib/payload'
import type { Product } from '@/payload-types'

const fetchProducts = async (featured: boolean, draft: boolean): Promise<Product[]> => {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'products',
    sort: 'order',
    limit: 50,
    depth: 1,
    draft,
    where: { ...publishedOnly(draft), ...(featured ? { featured: { equals: true } } : {}) },
  })
  return res.docs
}

const fetchProduct = async (slug: string, draft: boolean): Promise<Product | null> => {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'products',
    limit: 1,
    depth: 2,
    draft,
    where: { slug: { equals: slug }, ...publishedOnly(draft) },
  })
  return res.docs[0] ?? null
}

const cachedProducts = cachedQuery('products', (featured: boolean) =>
  fetchProducts(featured, false),
)
const cachedProduct = cachedQuery('product', (slug: string) => fetchProduct(slug, false))

export const getProducts = cache(async (opts: { featured?: boolean } = {}) =>
  (await isDraft()) ? fetchProducts(!!opts.featured, true) : cachedProducts(!!opts.featured),
)

export const getProduct = cache(async (slug: string) =>
  (await isDraft()) ? fetchProduct(slug, true) : cachedProduct(slug),
)

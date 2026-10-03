import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'

import config from '@payload-config'
import { absoluteUrl } from '@/lib/site'

export const dynamic = 'force-dynamic'

const STATIC = [
  '/',
  '/services',
  '/products',
  '/hosting',
  '/work',
  '/about',
  '/insights',
  '/careers',
  '/contact',
]

/** Every public page, generated from published content. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config })
  const published = { _status: { equals: 'published' } } as const
  const [pillars, services, products, studies, posts, pages] = await Promise.all([
    payload.find({
      collection: 'pillars',
      limit: 100,
      depth: 0,
      select: { slug: true, updatedAt: true },
    }),
    payload.find({
      collection: 'services',
      limit: 500,
      depth: 0,
      where: published,
      select: { path: true, updatedAt: true },
    }),
    payload.find({
      collection: 'products',
      limit: 100,
      depth: 0,
      where: published,
      select: { slug: true, updatedAt: true },
    }),
    payload.find({
      collection: 'case-studies',
      limit: 200,
      depth: 0,
      where: published,
      select: { slug: true, updatedAt: true },
    }),
    payload.find({
      collection: 'posts',
      limit: 1000,
      depth: 0,
      where: published,
      select: { slug: true, updatedAt: true },
    }),
    payload.find({
      collection: 'pages',
      limit: 100,
      depth: 0,
      select: { slug: true, updatedAt: true },
    }),
  ])

  const entry = (
    path: string,
    updatedAt?: string,
    priority = 0.6,
  ): MetadataRoute.Sitemap[number] => ({
    url: absoluteUrl(path),
    lastModified: updatedAt ? new Date(updatedAt) : new Date(),
    priority,
  })

  return [
    ...STATIC.map((p) => entry(p, undefined, p === '/' ? 1 : 0.8)),
    ...pillars.docs.map((d) => entry(`/services/${d.slug}`, d.updatedAt, 0.7)),
    ...services.docs.filter((d) => d.path).map((d) => entry(d.path!, d.updatedAt, 0.7)),
    ...products.docs.map((d) => entry(`/products/${d.slug}`, d.updatedAt, 0.8)),
    ...studies.docs.map((d) => entry(`/work/${d.slug}`, d.updatedAt)),
    ...posts.docs.map((d) => entry(`/insights/${d.slug}`, d.updatedAt)),
    ...pages.docs.map((d) => entry(`/legal/${d.slug}`, d.updatedAt, 0.3)),
  ]
}

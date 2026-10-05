import 'server-only'

import { cache } from 'react'

import { cachedQuery } from '@/lib/cache'
import { getPayloadClient } from '@/lib/payload'

import type { NavData } from './types'

const fetchNav = async (): Promise<NavData> => {
  const payload = await getPayloadClient()
  const [pillars, services, products, work] = await Promise.all([
    payload.find({
      collection: 'pillars',
      sort: 'order',
      limit: 50,
      depth: 0,
      select: { title: true, slug: true, summary: true },
    }),
    payload.find({
      collection: 'services',
      sort: 'order',
      limit: 300,
      depth: 0,
      where: { _status: { equals: 'published' } },
      select: { title: true, path: true, pillar: true },
    }),
    payload.find({
      collection: 'products',
      sort: 'order',
      limit: 50,
      depth: 0,
      where: { _status: { equals: 'published' } },
      select: { name: true, slug: true, tagline: true, category: true },
    }),
    payload.count({
      collection: 'case-studies',
      where: { _status: { equals: 'published' }, isPlaceholder: { not_equals: true } },
    }),
  ])

  return {
    pillars: pillars.docs.map((p) => ({
      title: p.title,
      summary: p.summary,
      href: `/services/${p.slug}`,
      services: services.docs
        .filter((s) => (typeof s.pillar === 'object' ? s.pillar.id : s.pillar) === p.id)
        .map((s) => ({ title: s.title, href: s.path ?? `/services/${p.slug}` })),
    })),
    products: products.docs.map((p) => ({
      name: p.name,
      tagline: p.tagline,
      category: p.category,
      href: `/products/${p.slug}`,
    })),
    hasWork: work.totalDocs > 0,
  }
}

const cachedNav = cachedQuery('nav', fetchNav)

/** Menu content is derived from the published services and products. */
export const getNavData = cache(() => cachedNav())

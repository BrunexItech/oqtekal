import 'server-only'

import { cache } from 'react'

import { cachedQuery } from '@/lib/cache'
import { getPayloadClient, isDraft, publishedOnly } from '@/lib/payload'
import type { Pillar, Service } from '@/payload-types'

export type PillarWithServices = Pillar & { serviceList: Service[] }

const fetchPillars = async (draft: boolean): Promise<PillarWithServices[]> => {
  const payload = await getPayloadClient()
  const [pillars, services] = await Promise.all([
    payload.find({ collection: 'pillars', sort: 'order', limit: 50, depth: 0 }),
    payload.find({
      collection: 'services',
      sort: 'order',
      limit: 300,
      depth: 0,
      draft,
      where: publishedOnly(draft),
    }),
  ])
  return pillars.docs.map((p) => ({
    ...p,
    serviceList: services.docs.filter(
      (s) => (typeof s.pillar === 'object' ? s.pillar.id : s.pillar) === p.id,
    ),
  }))
}

const fetchService = async (path: string, draft: boolean): Promise<Service | null> => {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'services',
    limit: 1,
    depth: 2,
    draft,
    where: { path: { equals: path }, ...publishedOnly(draft) },
  })
  return res.docs[0] ?? null
}

const cachedPillars = cachedQuery('pillars', () => fetchPillars(false))
const cachedService = cachedQuery('service', (path: string) => fetchService(path, false))

export const getPillarsWithServices = cache(async () =>
  (await isDraft()) ? fetchPillars(true) : cachedPillars(),
)

export const getPillar = cache(async (slug: string): Promise<PillarWithServices | null> => {
  const all = await getPillarsWithServices()
  return all.find((p) => p.slug === slug) ?? null
})

export const getService = cache(async (pillarSlug: string, slug: string) => {
  const path = `/services/${pillarSlug}/${slug}`
  return (await isDraft()) ? fetchService(path, true) : cachedService(path)
})

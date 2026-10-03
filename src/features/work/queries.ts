import 'server-only'

import { cache } from 'react'

import { cachedQuery } from '@/lib/cache'
import { getPayloadClient, isDraft, publishedOnly } from '@/lib/payload'
import type { CaseStudy } from '@/payload-types'

const fetchStudies = async (
  featured: boolean,
  limit: number,
  draft: boolean,
): Promise<CaseStudy[]> => {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'case-studies',
    sort: 'order',
    limit,
    depth: 1,
    draft,
    where: { ...publishedOnly(draft), ...(featured ? { featured: { equals: true } } : {}) },
  })
  return res.docs
}

const fetchStudy = async (slug: string, draft: boolean): Promise<CaseStudy | null> => {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'case-studies',
    limit: 1,
    depth: 2,
    draft,
    where: { slug: { equals: slug }, ...publishedOnly(draft) },
  })
  return res.docs[0] ?? null
}

const cachedStudies = cachedQuery('case-studies', (featured: boolean, limit: number) =>
  fetchStudies(featured, limit, false),
)
const cachedStudy = cachedQuery('case-study', (slug: string) => fetchStudy(slug, false))

export const getCaseStudies = cache(async (opts: { featured?: boolean; limit?: number } = {}) => {
  const featured = !!opts.featured
  const limit = opts.limit ?? 50
  return (await isDraft()) ? fetchStudies(featured, limit, true) : cachedStudies(featured, limit)
})

export const getCaseStudy = cache(async (slug: string) =>
  (await isDraft()) ? fetchStudy(slug, true) : cachedStudy(slug),
)

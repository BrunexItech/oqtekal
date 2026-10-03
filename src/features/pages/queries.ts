import 'server-only'

import { cache } from 'react'

import { cachedQuery } from '@/lib/cache'
import { getPayloadClient } from '@/lib/payload'
import type { Page } from '@/payload-types'

const cached = cachedQuery('text-page', async (slug: string): Promise<Page | null> => {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'pages',
    limit: 1,
    depth: 1,
    where: { slug: { equals: slug } },
  })
  return res.docs[0] ?? null
})

export const getTextPage = cache((slug: string) => cached(slug))

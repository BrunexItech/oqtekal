import 'server-only'

import { cache } from 'react'

import { cachedQuery } from '@/lib/cache'
import { getPayloadClient } from '@/lib/payload'
import type { Job } from '@/payload-types'

const cached = cachedQuery('jobs', async (): Promise<Job[]> => {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'jobs',
    sort: 'order',
    limit: 50,
    depth: 0,
    where: { isOpen: { equals: true } },
  })
  return res.docs
})

export const getOpenJobs = cache(() => cached())

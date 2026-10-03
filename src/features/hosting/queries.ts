import 'server-only'

import { cache } from 'react'

import { cachedQuery } from '@/lib/cache'
import { getPayloadClient } from '@/lib/payload'
import type { HostingPlan } from '@/payload-types'

const cached = cachedQuery('hosting-plans', async (): Promise<HostingPlan[]> => {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'hosting-plans',
    sort: 'order',
    limit: 50,
    depth: 0,
  })
  return res.docs
})

export const getHostingPlans = cache(() => cached())

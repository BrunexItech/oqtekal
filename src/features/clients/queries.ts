import 'server-only'

import { cache } from 'react'

import { cachedQuery } from '@/lib/cache'
import { getPayloadClient } from '@/lib/payload'
import type { Client } from '@/payload-types'

const cached = cachedQuery('clients', async (): Promise<Client[]> => {
  const payload = await getPayloadClient()
  const res = await payload.find({ collection: 'clients', sort: 'order', limit: 50, depth: 1 })
  return res.docs
})

export const getClients = cache(() => cached())

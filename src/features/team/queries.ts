import 'server-only'

import { cache } from 'react'

import { cachedQuery } from '@/lib/cache'
import { getPayloadClient } from '@/lib/payload'
import type { TeamMember } from '@/payload-types'

const cached = cachedQuery('team', async (): Promise<TeamMember[]> => {
  const payload = await getPayloadClient()
  const res = await payload.find({ collection: 'team-members', sort: 'order', limit: 20, depth: 1 })
  return res.docs
})

export const getTeam = cache(() => cached())

import 'server-only'

import { cache } from 'react'

import { cachedQuery } from '@/lib/cache'
import { getPayloadClient, isDraft } from '@/lib/payload'
import type { HomePage } from '@/payload-types'

const fetchHome = async (draft: boolean): Promise<HomePage> =>
  (await getPayloadClient()).findGlobal({ slug: 'home-page', depth: 1, draft })

const cachedHome = cachedQuery('home-page', () => fetchHome(false))

export const getHomePage = cache(async () => ((await isDraft()) ? fetchHome(true) : cachedHome()))

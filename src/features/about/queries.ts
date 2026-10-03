import 'server-only'

import { cache } from 'react'

import { cachedQuery } from '@/lib/cache'
import { getPayloadClient, isDraft } from '@/lib/payload'
import type { AboutPage } from '@/payload-types'

const fetchAbout = async (draft: boolean): Promise<AboutPage> =>
  (await getPayloadClient()).findGlobal({ slug: 'about-page', depth: 1, draft })

const cachedAbout = cachedQuery('about-page', () => fetchAbout(false))

export const getAboutPage = cache(async () =>
  (await isDraft()) ? fetchAbout(true) : cachedAbout(),
)

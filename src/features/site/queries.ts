import 'server-only'

import { cache } from 'react'

import { cachedQuery } from '@/lib/cache'
import { getPayloadClient } from '@/lib/payload'
import type { SiteSetting } from '@/payload-types'

export type Settings = SiteSetting & {
  phone: string
  whatsapp: string
  email: string
  address: string
}

const DEFAULTS = {
  email: 'hello@oqtekal.com',
  phone: '+254 721 928 966',
  whatsapp: '254715274418',
  address: 'Hill Flats Suites\nState House Rd, Room 5\nP.O. Box 25081-00603\nNairobi',
}

/** Company details with safe fallbacks, so an unfinished admin never breaks a page. */
const cachedSettings = cachedQuery('site-settings', async () =>
  (await getPayloadClient()).findGlobal({ slug: 'site-settings', depth: 0 }),
)

export const getSiteSettings = cache(async (): Promise<Settings> => {
  const s = await cachedSettings()
  return {
    ...s,
    email: s.email || DEFAULTS.email,
    phone: s.phone || DEFAULTS.phone,
    whatsapp: s.whatsapp || DEFAULTS.whatsapp,
    address: s.address || DEFAULTS.address,
  }
})

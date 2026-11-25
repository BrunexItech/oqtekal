import 'server-only'

import { cache } from 'react'

import { cachedQuery } from '@/lib/cache'
import { getPayloadClient } from '@/lib/payload'
import type { SiteSetting } from '@/payload-types'

export type Settings = SiteSetting & {
  phone: string
  whatsapp: string
  email: string
  privacyEmail: string
  legalName: string
  companyNumber: string
  address: string
}

// The registered facts below (CR12, Business Registration Service Kenya).
const DEFAULTS = {
  email: 'info@oqtekal.com',
  privacyEmail: 'privacy@oqtekal.com',
  legalName: 'OQTEKAL EAST AFRICA LIMITED',
  companyNumber: 'PVT-Y2UP85P',
  phone: '+254 715 274 418',
  whatsapp: '254715274418',
  address: 'P.O. Box 22645-00400, Tom Mboya St, Nairobi CBD, Kenya',
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
    privacyEmail: s.privacyEmail || DEFAULTS.privacyEmail,
    legalName: s.legalName || DEFAULTS.legalName,
    companyNumber: s.companyNumber || DEFAULTS.companyNumber,
    phone: s.phone || DEFAULTS.phone,
    whatsapp: s.whatsapp || DEFAULTS.whatsapp,
    address: s.address || DEFAULTS.address,
  }
})

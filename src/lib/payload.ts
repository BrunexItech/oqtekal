import 'server-only'

import config from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload, type Where } from 'payload'
import { cache } from 'react'

/** One Payload instance per request (React `cache` de-duplicates within a render). */
export const getPayloadClient = cache(() => getPayload({ config }))

/** True when an editor is previewing drafts from the admin. */
export const isDraft = cache(async (): Promise<boolean> => (await draftMode()).isEnabled)

/** Public visitors only ever see published documents. */
export const publishedOnly = (draft: boolean): Where =>
  draft ? {} : { _status: { equals: 'published' } }

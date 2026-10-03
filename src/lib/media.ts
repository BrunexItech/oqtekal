import type { Media } from '@/payload-types'

/** A populated upload field, or null when it is empty / only an id. */
export const asMedia = (value: number | Media | null | undefined): Media | null =>
  value && typeof value === 'object' && value.url ? value : null

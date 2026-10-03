import 'server-only'

import { cache } from 'react'

import { cachedQuery } from '@/lib/cache'
import { getPayloadClient } from '@/lib/payload'
import type { Testimonial } from '@/payload-types'

const cached = cachedQuery('testimonials', async (): Promise<Testimonial[]> => {
  const payload = await getPayloadClient()
  const res = await payload.find({ collection: 'testimonials', sort: 'order', limit: 20, depth: 1 })
  return res.docs
})

export const getTestimonials = cache(() => cached())

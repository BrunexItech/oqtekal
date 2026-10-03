import 'server-only'

import { cache } from 'react'

import { cachedQuery } from '@/lib/cache'
import { getPayloadClient, isDraft, publishedOnly } from '@/lib/payload'
import type { Post } from '@/payload-types'

const fetchPosts = async (limit: number, draft: boolean): Promise<Post[]> => {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'posts',
    sort: '-publishedAt',
    limit,
    depth: 1,
    draft,
    where: publishedOnly(draft),
  })
  return res.docs
}

const fetchPost = async (slug: string, draft: boolean): Promise<Post | null> => {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'posts',
    limit: 1,
    depth: 2,
    draft,
    where: { slug: { equals: slug }, ...publishedOnly(draft) },
  })
  return res.docs[0] ?? null
}

const cachedPosts = cachedQuery('posts', (limit: number) => fetchPosts(limit, false))
const cachedPost = cachedQuery('post', (slug: string) => fetchPost(slug, false))

export const getPosts = cache(async (opts: { limit?: number } = {}) => {
  const limit = opts.limit ?? 100
  return (await isDraft()) ? fetchPosts(limit, true) : cachedPosts(limit)
})

export const getPost = cache(async (slug: string) =>
  (await isDraft()) ? fetchPost(slug, true) : cachedPost(slug),
)

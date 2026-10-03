import 'server-only'

import { unstable_cache } from 'next/cache'

/** Every piece of admin content shares one tag: publishing anything refreshes the site instantly. */
export const CMS_TAG = 'cms'

/**
 * Caches a published-content query across requests (fast pages), keyed by its arguments.
 * Draft previews must call the uncached function directly.
 */
export const cachedQuery = <A extends unknown[], R>(key: string, fn: (...args: A) => Promise<R>) =>
  unstable_cache(fn, ['oq', key], { tags: [CMS_TAG], revalidate: 3600 })

import type { CollectionConfig, GlobalConfig } from 'payload'

const CMS_TAG = 'cms'

/** Marks cached site content stale. Outside a Next.js request (e.g. the seed script) this is a no-op. */
const purge = async (): Promise<void> => {
  try {
    const { revalidateTag } = await import('next/cache')
    revalidateTag(CMS_TAG, { expire: 0 })
  } catch {
    /* not running inside Next.js */
  }
}

/** Collections whose changes appear on the public site refresh the page cache when saved or deleted. */
export const revalidateCollection = (config: CollectionConfig): CollectionConfig => ({
  ...config,
  hooks: {
    ...config.hooks,
    afterChange: [...(config.hooks?.afterChange ?? []), async ({ doc }) => (await purge(), doc)],
    afterDelete: [...(config.hooks?.afterDelete ?? []), async ({ doc }) => (await purge(), doc)],
  },
})

export const revalidateGlobal = (config: GlobalConfig): GlobalConfig => ({
  ...config,
  hooks: {
    ...config.hooks,
    afterChange: [...(config.hooks?.afterChange ?? []), async ({ doc }) => (await purge(), doc)],
  },
})

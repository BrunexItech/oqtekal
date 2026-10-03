'use client'

import { RefreshRouteOnSave } from '@payloadcms/live-preview-react'
import { usePathname, useRouter } from 'next/navigation'

/** Shown while an editor previews drafts; refreshes the page whenever they save in the admin. */
export const PreviewBar = () => {
  const router = useRouter()
  const pathname = usePathname()
  return (
    <>
      <RefreshRouteOnSave
        refresh={() => router.refresh()}
        serverURL={process.env.NEXT_PUBLIC_SITE_URL ?? ''}
      />
      <div className="sticky top-0 z-[60] flex items-center justify-center gap-4 bg-brand-600 px-4 py-2 text-sm text-white">
        <span>Preview mode — you are seeing unpublished drafts.</span>
        <a
          href={`/next/exit-preview?path=${encodeURIComponent(pathname)}`}
          className="font-medium underline"
        >
          Exit preview
        </a>
      </div>
    </>
  )
}

import Link from 'next/link'

import type { SiteSetting } from '@/payload-types'

export const AnnouncementBar = ({ settings }: { settings: SiteSetting }) => {
  if (!settings.announcementEnabled || !settings.announcementText) return null
  const content = (
    <>
      <span
        className="mr-2 inline-block size-1.5 rounded-full bg-brand-400 align-middle"
        aria-hidden
      />
      {settings.announcementText}
      {settings.announcementLink ? <span aria-hidden> →</span> : null}
    </>
  )
  return (
    <div className="bg-ink px-4 py-2.5 text-center text-sm text-paper">
      {settings.announcementLink ? (
        <Link href={settings.announcementLink} className="hover:underline">
          {content}
        </Link>
      ) : (
        content
      )}
    </div>
  )
}

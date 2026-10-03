import { BrandIcon, type BrandName } from '@/design-system'
import { cn } from '@/lib/cn'
import type { SiteSetting } from '@/payload-types'

const LABELS: Record<string, string> = {
  linkedin: 'LinkedIn',
  x: 'X',
  facebook: 'Facebook',
  instagram: 'Instagram',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  github: 'GitHub',
  whatsapp: 'WhatsApp',
}

/** Official social icons, from Company details → Social media in the admin. */
export const SocialLinks = ({
  socials,
  className,
}: {
  socials: SiteSetting['socials']
  className?: string
}) => {
  if (!socials?.length) return null
  return (
    <ul className={cn('flex flex-wrap gap-2', className)}>
      {socials.map((s) => (
        <li key={s.id ?? s.platform}>
          <a
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Oqtekal on ${LABELS[s.platform] ?? s.platform}`}
            className="grid size-10 place-items-center rounded-full border border-current/15 transition-colors hover:border-current/40 hover:bg-current/5"
          >
            <BrandIcon name={s.platform as BrandName} className="size-[1.05rem]" />
          </a>
        </li>
      ))}
    </ul>
  )
}

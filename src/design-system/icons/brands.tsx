import {
  siCloudflare,
  siDjango,
  siDocker,
  siFacebook,
  siFastapi,
  siFlutter,
  siGithub,
  siInstagram,
  siKotlin,
  siLaravel,
  siNextdotjs,
  siNginx,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siRedis,
  siSwift,
  siTiktok,
  siTypescript,
  siWhatsapp,
  siX,
  siYoutube,
} from 'simple-icons'

import { cn } from '@/lib/cn'

type Glyph = { title: string; path: string; hex: string }

// LinkedIn is no longer distributed by Simple Icons; this is the standard "in" glyph.
const siLinkedin: Glyph = {
  title: 'LinkedIn',
  hex: '0A66C2',
  path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
}

const glyphs = {
  linkedin: siLinkedin,
  x: siX,
  facebook: siFacebook,
  instagram: siInstagram,
  youtube: siYoutube,
  tiktok: siTiktok,
  github: siGithub,
  whatsapp: siWhatsapp,
  nextjs: siNextdotjs,
  react: siReact,
  typescript: siTypescript,
  nodejs: siNodedotjs,
  python: siPython,
  django: siDjango,
  fastapi: siFastapi,
  laravel: siLaravel,
  postgresql: siPostgresql,
  redis: siRedis,
  docker: siDocker,
  nginx: siNginx,
  cloudflare: siCloudflare,
  flutter: siFlutter,
  kotlin: siKotlin,
  swift: siSwift,
} satisfies Record<string, Glyph>

export type BrandName = keyof typeof glyphs

/** Official brand mark rendered in the current text colour (or its brand colour). */
/** Relative luminance of a hex colour (0 = black, 1 = white). */
const luminance = (hex: string): number => {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  }) as [number, number, number]
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/**
 * Official brand mark. `colored` uses the brand's own colour: black marks (Next.js, X…) follow the
 * text colour so they work on any background, and dark brand colours are lifted in dark mode.
 */
export const BrandIcon = ({
  name,
  className,
  colored = false,
  title,
}: {
  name: BrandName
  className?: string
  colored?: boolean
  title?: string
}) => {
  const g = glyphs[name]
  const lum = luminance(g.hex)
  const brand = colored && lum > 0.01
  return (
    <svg
      viewBox="0 0 24 24"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className={cn(
        'size-5',
        brand ? 'fill-[var(--brand)]' : 'fill-current',
        brand && lum < 0.12 && 'dark:fill-[color-mix(in_oklab,var(--brand),white_55%)]',
        className,
      )}
      style={brand ? ({ '--brand': `#${g.hex}` } as React.CSSProperties) : undefined}
    >
      <path d={g.path} />
    </svg>
  )
}

export const brandTitle = (name: BrandName): string => glyphs[name].title

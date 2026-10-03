import 'server-only'

import { headers } from 'next/headers'

/** Best-effort client IP (Cloudflare → nginx → direct). */
export const clientIp = async (): Promise<string> => {
  const h = await headers()
  return (
    h.get('cf-connecting-ip') ??
    h.get('x-real-ip') ??
    h.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown'
  )
}

import 'server-only'

import { env } from './env'

/** Verifies a Cloudflare Turnstile token. Passes automatically when Turnstile is not configured. */
export const verifyTurnstile = async (token: string | undefined, ip?: string): Promise<boolean> => {
  if (!env.TURNSTILE_SECRET_KEY) return true
  if (!token) return false
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: new URLSearchParams({
        secret: env.TURNSTILE_SECRET_KEY,
        response: token,
        ...(ip ? { remoteip: ip } : {}),
      }),
      signal: AbortSignal.timeout(5000),
    })
    const data = (await res.json()) as { success?: boolean }
    return Boolean(data.success)
  } catch {
    return false
  }
}

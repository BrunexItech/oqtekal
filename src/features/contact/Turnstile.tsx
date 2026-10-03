'use client'

import Script from 'next/script'

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

/** Cloudflare Turnstile (invisible-first spam check). Renders nothing when not configured. */
export const Turnstile = () => {
  if (!SITE_KEY) return null
  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
      <div
        className="cf-turnstile"
        data-sitekey={SITE_KEY}
        data-appearance="interaction-only"
        data-theme="auto"
      />
    </>
  )
}

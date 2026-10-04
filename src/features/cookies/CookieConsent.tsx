'use client'

import Link from 'next/link'
import Script from 'next/script'
import { useEffect, useState } from 'react'

import { Button } from '@/design-system'

import { CONSENT_COOKIE, OPEN_EVENT, type Consent } from './consent'

const ONE_YEAR = 60 * 60 * 24 * 365

const save = (value: Consent) => {
  const secure = location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${CONSENT_COOKIE}=${value}; Max-Age=${ONE_YEAR}; Path=/; SameSite=Lax${secure}`
}

type Props = {
  /** The visitor's saved choice, read on the server so the banner never flashes for returning visitors. */
  initial: Consent | null
  analytics?: { src: string; websiteId: string } | null
}

/**
 * Cookie notice with a real choice. Essential cookies keep the site working; optional analytics
 * only loads after "Accept all". The choice is remembered for a year and can be changed any time
 * from "Cookie settings" in the footer.
 */
export const CookieConsent = ({ initial, analytics }: Props) => {
  const [consent, setConsent] = useState<Consent | null>(initial)
  const [open, setOpen] = useState(initial === null)

  useEffect(() => {
    const reopen = () => setOpen(true)
    window.addEventListener(OPEN_EVENT, reopen)
    return () => window.removeEventListener(OPEN_EVENT, reopen)
  }, [])

  const choose = (value: Consent) => {
    save(value)
    setConsent(value)
    setOpen(false)
  }

  return (
    <>
      {consent === 'all' && analytics ? (
        <Script
          src={analytics.src}
          data-website-id={analytics.websiteId}
          strategy="afterInteractive"
        />
      ) : null}

      {open ? (
        <section
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-title"
          aria-describedby="cookie-text"
          className="fixed inset-x-3 bottom-20 z-[60] animate-[menu-in_0.5s_cubic-bezier(0.22,1,0.36,1)] rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-float)] sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-md sm:p-6"
        >
          <h2 id="cookie-title" className="font-display text-lg font-semibold tracking-tight">
            Cookies on oqtekal.com
          </h2>
          <p id="cookie-text" className="mt-2 text-sm leading-relaxed text-muted">
            We use essential cookies to make this site work. With your permission we also use
            privacy-friendly analytics to improve it. Read our{' '}
            <Link
              href="/legal/cookies"
              className="font-medium text-accent underline underline-offset-2"
            >
              cookie policy
            </Link>
            .
          </p>
          <div className="mt-4 flex flex-col gap-2 xs:flex-row">
            <Button size="sm" onClick={() => choose('all')}>
              Accept all
            </Button>
            <Button size="sm" variant="secondary" onClick={() => choose('essential')}>
              Essential only
            </Button>
          </div>
        </section>
      ) : null}
    </>
  )
}

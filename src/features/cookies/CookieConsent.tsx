'use client'

import Link from 'next/link'
import Script from 'next/script'
import { useEffect, useRef, useState } from 'react'

import { Button, Container } from '@/design-system'

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

  // While the bar is showing, tell the page how tall it is so floating buttons can sit above it.
  const barRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const root = document.documentElement
    const bar = barRef.current
    if (!open || !bar) {
      root.style.removeProperty('--cookie-bar')
      return
    }
    const sync = () => root.style.setProperty('--cookie-bar', `${bar.offsetHeight}px`)
    sync()
    const observer = new ResizeObserver(sync)
    observer.observe(bar)
    return () => {
      observer.disconnect()
      root.style.removeProperty('--cookie-bar')
    }
  }, [open])

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
          ref={barRef}
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-title"
          aria-describedby="cookie-text"
          className="fixed inset-x-0 bottom-0 z-[60] animate-[bar-in_0.5s_cubic-bezier(0.22,1,0.36,1)] border-t border-line bg-surface/97 shadow-[0_-12px_40px_-20px_rgb(11_15_25/0.35)] backdrop-blur"
        >
          <Container className="flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between md:gap-10 md:py-5">
            <div className="max-w-3xl">
              <h2 id="cookie-title" className="font-display text-base font-semibold tracking-tight">
                Cookies on oqtekal.com
              </h2>
              <p id="cookie-text" className="mt-1 text-sm leading-relaxed text-muted">
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
            </div>
            <div className="flex shrink-0 gap-2">
              <Button
                size="sm"
                variant="secondary"
                className="flex-1 md:flex-none"
                onClick={() => choose('essential')}
              >
                Essential only
              </Button>
              <Button size="sm" className="flex-1 md:flex-none" onClick={() => choose('all')}>
                Accept all
              </Button>
            </div>
          </Container>
        </section>
      ) : null}
    </>
  )
}

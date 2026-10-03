import '@/styles/globals.css'

import type { Metadata, Viewport } from 'next'
import { Archivo, Inter, JetBrains_Mono } from 'next/font/google'
import Script from 'next/script'
import { Suspense, type ReactNode } from 'react'

import { Footer } from '@/features/footer'
import { IntroLoader } from '@/features/intro-loader'
import { Header, getNavData } from '@/features/navigation'
import { NavProgress } from '@/features/nav-progress'
import { PreviewBar } from '@/features/preview'
import { organizationJsonLd, JsonLd } from '@/features/seo'
import { AnnouncementBar, getSiteSettings } from '@/features/site'
import { ThemeScript } from '@/features/theme'
import { WhatsAppButton } from '@/features/whatsapp'
import { isDraft } from '@/lib/payload'
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from '@/lib/site'

// Content comes from the admin and must be live the moment it is published.
export const dynamic = 'force-dynamic'

const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
})
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} — ${SITE_TAGLINE}`, template: `%s · ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_KE',
    images: [{ url: '/og', width: 1200, height: 630, alt: `${SITE_NAME} — ${SITE_TAGLINE}` }],
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: '/' },
  formatDetection: { telephone: false },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f6f2' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0f19' },
  ],
}

const UMAMI_SRC = process.env.NEXT_PUBLIC_UMAMI_SRC
const UMAMI_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const [nav, settings, draft] = await Promise.all([getNavData(), getSiteSettings(), isDraft()])

  return (
    <html
      lang="en-KE"
      data-theme="light"
      suppressHydrationWarning
      className={`${archivo.variable} ${inter.variable} ${mono.variable}`}
    >
      <head>
        <ThemeScript />
      </head>
      <body>
        <IntroLoader />
        <Suspense fallback={null}>
          <NavProgress />
        </Suspense>
        {draft ? <PreviewBar /> : null}
        <AnnouncementBar settings={settings} />
        <Header nav={nav} />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer nav={nav} settings={settings} />
        <WhatsAppButton number={settings.whatsapp} />
        <JsonLd data={organizationJsonLd(settings)} />
        {UMAMI_SRC && UMAMI_ID ? (
          <Script src={UMAMI_SRC} data-website-id={UMAMI_ID} strategy="afterInteractive" />
        ) : null}
      </body>
    </html>
  )
}

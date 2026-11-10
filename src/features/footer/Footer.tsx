import Link from 'next/link'

import { Container } from '@/design-system'
import { CurrentArt, Logo } from '@/features/brand'
import { CookieSettingsLink } from '@/features/cookies'
import type { NavData } from '@/features/navigation'
import { SocialLinks } from '@/features/social'
import { formatWhatsapp, sameNumber, whatsappLink } from '@/lib/site'
import type { SiteSetting } from '@/payload-types'

import { NewsletterForm } from './NewsletterForm'

const company = [
  { title: 'About', href: '/about' },
  { title: 'Work', href: '/work' },
  { title: 'Insights', href: '/insights' },
  { title: 'Careers', href: '/careers' },
  { title: 'Hosting', href: '/hosting' },
  { title: 'Contact', href: '/contact' },
]

const Column = ({ title, links }: { title: string; links: { title: string; href: string }[] }) => (
  <div>
    <h2 className="text-label text-paper/50">{title}</h2>
    <ul className="mt-5 space-y-3">
      {links.map((l) => (
        <li key={l.href}>
          <Link
            href={l.href}
            className="text-[0.95rem] text-paper/80 transition-colors hover:text-white"
          >
            {l.title}
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

export const Footer = ({ nav, settings }: { nav: NavData; settings: SiteSetting }) => {
  const year = new Date().getFullYear()
  const oneNumber = sameNumber(settings.phone, settings.whatsapp)
  return (
    <footer className="relative isolate overflow-hidden bg-ink text-paper">
      <CurrentArt className="-z-10 [mask-image:linear-gradient(90deg,transparent_10%,black_75%)] object-right-bottom opacity-30" />

      <Container className="pt-20 pb-28 sm:pb-10 md:pt-28">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_2fr] lg:gap-20">
          <div className="max-w-sm">
            <Logo variant="dark" tagline className="h-14 sm:h-16" />
            <p className="mt-7 text-paper/70">
              A Nairobi software engineering company building the systems organisations run on —
              designed carefully, built properly, supported for the long term.
            </p>
            <SocialLinks socials={settings.socials} className="mt-7 text-paper" />
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-4">
            <Column
              title="Services"
              links={nav.pillars.map((p) => ({ title: p.title, href: p.href }))}
            />
            <Column
              title="Products"
              links={nav.products.map((p) => ({ title: p.name, href: p.href }))}
            />
            <Column
              title="Company"
              links={company.filter((l) => l.href !== '/work' || nav.hasWork)}
            />
            <div className="col-span-2 sm:col-span-3 lg:col-span-1">
              <h2 className="text-label text-paper/50">Contact</h2>
              <ul className="mt-5 space-y-3 text-[0.95rem] text-paper/80">
                <li>
                  <a href={`mailto:${settings.email}`} className="hover:text-white">
                    {settings.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${settings.phone.replace(/\s/g, '')}`}
                    className="whitespace-nowrap hover:text-white"
                  >
                    {settings.phone}
                  </a>
                  {oneNumber ? (
                    <>
                      <span aria-hidden className="mx-2 text-paper/30">
                        ·
                      </span>
                      <a
                        href={whatsappLink(settings.whatsapp)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white"
                      >
                        WhatsApp
                      </a>
                    </>
                  ) : null}
                </li>
                {oneNumber ? null : (
                  <li>
                    <a
                      href={whatsappLink(settings.whatsapp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white"
                    >
                      <span className="sr-only">WhatsApp </span>
                      {formatWhatsapp(settings.whatsapp)}
                    </a>
                  </li>
                )}
                <li className="whitespace-pre-line text-paper/60">{settings.address}</li>
                {settings.hours ? <li className="text-paper/60">{settings.hours}</li> : null}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-8 border-t border-white/10 pt-10 md:grid-cols-[1fr_auto] md:items-end [&>*]:min-w-0">
          <div>
            <h2 className="font-display text-xl font-semibold tracking-tight">
              Field notes from our engineers
            </h2>
            <p className="mt-2 text-sm text-paper/60">
              One useful email a month. No spam, unsubscribe anytime.
            </p>
          </div>
          <NewsletterForm />
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-paper/50 md:flex-row md:items-center md:justify-between">
          <p>© {year} Oqtekal. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/legal/privacy" className="hover:text-white">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/legal/terms" className="hover:text-white">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/legal/cookies" className="hover:text-white">
                Cookies
              </Link>
            </li>
            <li>
              <CookieSettingsLink className="hover:text-white" />
            </li>
            <li>Engineered in Nairobi</li>
          </ul>
        </div>
      </Container>
    </footer>
  )
}

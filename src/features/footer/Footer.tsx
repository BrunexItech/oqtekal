import Link from 'next/link'

import { Container } from '@/design-system'
import { Logo, Symbol } from '@/features/brand'
import type { NavData } from '@/features/navigation'
import { SocialLinks } from '@/features/social'
import { formatWhatsapp, whatsappLink } from '@/lib/site'
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
  return (
    <footer className="relative isolate overflow-hidden bg-ink text-paper">
      <Symbol className="pointer-events-none absolute -right-[8%] -bottom-[18%] -z-10 size-[min(80vw,52rem)] text-white/[0.025]" />

      <Container className="pt-20 pb-10 md:pt-28">
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
            <Column title="Company" links={company} />
            <div className="col-span-2 sm:col-span-3 lg:col-span-1">
              <h2 className="text-label text-paper/50">Contact</h2>
              <ul className="mt-5 space-y-3 text-[0.95rem] text-paper/80">
                <li>
                  <a href={`mailto:${settings.email}`} className="hover:text-white">
                    {settings.email}
                  </a>
                </li>
                <li>
                  <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="hover:text-white">
                    {settings.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={whatsappLink(settings.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    WhatsApp {formatWhatsapp(settings.whatsapp)}
                  </a>
                </li>
                <li className="whitespace-pre-line text-paper/60">{settings.address}</li>
                {settings.hours ? <li className="text-paper/60">{settings.hours}</li> : null}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-8 border-t border-white/10 pt-10 md:grid-cols-[1fr_auto] md:items-end">
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
              <Link href="/sitemap.xml" className="hover:text-white">
                Sitemap
              </Link>
            </li>
            <li>Engineered in Nairobi</li>
          </ul>
        </div>
      </Container>
    </footer>
  )
}

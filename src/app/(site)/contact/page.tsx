import type { Metadata } from 'next'

import {
  BrandIcon,
  Clock,
  Container,
  Mail,
  MapPin,
  PageHeader,
  Phone,
  Section,
} from '@/design-system'
import { ContactForm, type LeadType } from '@/features/contact'
import { breadcrumbJsonLd, buildMetadata, JsonLd } from '@/features/seo'
import { getSiteSettings } from '@/features/site'
import { SocialLinks } from '@/features/social'
import { whatsappLink } from '@/lib/site'

export const metadata: Metadata = buildMetadata({
  title: 'Contact',
  description:
    'Start a project, request a product demo or order hosting. An Oqtekal engineer replies within one business day.',
  path: '/contact',
  eyebrow: 'Contact',
})

const TYPES: LeadType[] = ['project', 'demo', 'hosting', 'career', 'general']

type Props = { searchParams: Promise<{ type?: string; interest?: string }> }

export default async function ContactPage({ searchParams }: Props) {
  const [{ type, interest }, settings] = await Promise.all([searchParams, getSiteSettings()])
  const defaultType = TYPES.includes(type as LeadType) ? (type as LeadType) : 'project'
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
  ]

  const channels = [
    {
      icon: <Mail className="size-5" />,
      label: 'Email',
      value: settings.email,
      href: `mailto:${settings.email}`,
    },
    {
      icon: <Phone className="size-5" />,
      label: 'Phone',
      value: settings.phone,
      href: `tel:${settings.phone.replace(/\s/g, '')}`,
    },
    {
      icon: <BrandIcon name="whatsapp" className="size-5" />,
      label: 'WhatsApp',
      value: 'Chat with an engineer',
      href: whatsappLink(settings.whatsapp, 'Hello Oqtekal, I would like to talk about a project.'),
    },
  ]

  return (
    <>
      <PageHeader
        crumbs={crumbs}
        eyebrow="Contact"
        title="Let’s talk it through."
        lead="Tell us what you are trying to achieve. You will hear back from an engineer — not a salesperson — within one business day."
      />
      <Section>
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <aside className="space-y-10">
            <ul className="space-y-3">
              {channels.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group flex items-center gap-4 rounded-[var(--radius-card)] border border-line bg-surface p-5 transition-colors hover:border-line-strong"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                      {c.icon}
                    </span>
                    <span>
                      <span className="block text-sm text-muted">{c.label}</span>
                      <span className="block font-medium group-hover:text-accent">{c.value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <dl className="space-y-5">
              <div className="grid grid-cols-[1.25rem_1fr] gap-x-4">
                <dt className="contents">
                  <MapPin className="mt-0.5 size-5 text-muted" />
                  <span className="text-sm text-muted">Office</span>
                </dt>
                <dd className="col-start-2 font-medium whitespace-pre-line">
                  {settings.address}
                  {settings.mapUrl ? (
                    <a
                      href={settings.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm font-normal text-accent hover:underline"
                    >
                      Open in Google Maps →
                    </a>
                  ) : null}
                </dd>
              </div>
              {settings.hours ? (
                <div className="grid grid-cols-[1.25rem_1fr] gap-x-4">
                  <dt className="contents">
                    <Clock className="mt-0.5 size-5 text-muted" />
                    <span className="text-sm text-muted">Hours</span>
                  </dt>
                  <dd className="col-start-2 font-medium">{settings.hours}</dd>
                </div>
              ) : null}
            </dl>
            <SocialLinks socials={settings.socials} />
          </aside>

          <div className="rounded-[var(--radius-panel)] border border-line bg-surface p-6 sm:p-10">
            <ContactForm defaultType={defaultType} interest={interest?.slice(0, 160)} />
          </div>
        </Container>
      </Section>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  )
}

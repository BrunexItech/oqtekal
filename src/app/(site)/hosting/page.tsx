import type { Metadata } from 'next'

import { Accordion, Container, PageHeader, Reveal, Section, SectionHeader } from '@/design-system'
import { CtaSection } from '@/features/cta'
import { DomainSearch, getHostingPlans, HostingPlans } from '@/features/hosting'
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, JsonLd } from '@/features/seo'
import { getSiteSettings } from '@/features/site'

export const metadata: Metadata = buildMetadata({
  title: 'Web hosting, VPS & business email',
  description:
    'Fast NVMe web hosting, managed cloud VPS and business email with daily backups, free SSL, free migration and local support. Pay in KES via M-Pesa.',
  path: '/hosting',
  eyebrow: 'Hosting',
})

const INCLUDED = [
  { title: 'Free SSL', text: 'Automatic HTTPS on every site and subdomain.' },
  { title: 'Daily backups', text: 'Off-server backups with one-click restore.' },
  { title: 'Free migration', text: 'We move your existing site with zero downtime.' },
  { title: 'Cloudflare-ready', text: 'Global CDN and DDoS protection in front of your site.' },
  { title: 'Monitoring', text: 'Uptime checks and alerts to our engineers.' },
  { title: 'Real support', text: 'WhatsApp, phone and email — answered by engineers.' },
]

const FAQS = [
  {
    question: 'Can I pay with M-Pesa?',
    answer:
      'Yes. All plans can be paid monthly or yearly by M-Pesa, card or bank transfer, in Kenyan shillings.',
  },
  {
    question: 'Will you move my existing website?',
    answer:
      'Yes, free on every plan. We handle files, databases, email and DNS so nothing goes offline.',
  },
  {
    question: 'What is the difference between web hosting and a VPS?',
    answer:
      'Web hosting shares a tuned server with other sites — ideal for websites and WordPress. A VPS gives your application dedicated resources and is fully managed by us.',
  },
  {
    question: 'Can I upgrade later?',
    answer: 'Anytime. Upgrades are instant and we credit the unused part of your current plan.',
  },
]

export default async function HostingPage() {
  const [plans, settings] = await Promise.all([getHostingPlans(), getSiteSettings()])
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Hosting', path: '/hosting' },
  ]
  return (
    <>
      <PageHeader
        crumbs={crumbs}
        eyebrow="Hosting · Domains · Email"
        title="Fast, secure hosting with people who pick up the phone."
        lead="NVMe servers, daily backups, free SSL and free migration — billed in shillings and payable by M-Pesa, with support from the engineers who run the servers."
      />

      <Section>
        <Container>
          <HostingPlans plans={plans} />
          <p className="mt-8 text-center text-sm text-muted">
            Prices in Kenyan shillings. Need something bigger? We build custom infrastructure.
          </p>
        </Container>
      </Section>

      <Section tone="inverse">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <p className="text-label text-brand-400">Domains</p>
            <h2 className="mt-4 text-h1">Find your name.</h2>
            <p className="mt-4 max-w-md text-paper/70">
              Register .co.ke, .ke, .com and more — with DNS, renewal reminders and email set up
              properly.
            </p>
          </div>
          <DomainSearch />
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader eyebrow="Included" heading="Every plan comes with" />
          <ul className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-panel)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {INCLUDED.map((x, i) => (
              <li key={x.title} className="bg-surface p-8">
                <Reveal delay={(i % 3) * 0.06}>
                  <span className="text-label text-accent">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-4 text-h3">{x.title}</h3>
                  <p className="mt-2 text-muted">{x.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="surface">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeader eyebrow="FAQ" heading="Hosting questions" level="h2" />
          <Accordion items={FAQS} />
        </Container>
      </Section>

      <div className="py-10 md:py-16">
        <CtaSection
          settings={settings}
          eyebrow="Talk to us"
          heading="Not sure which plan fits?"
          text="Tell us about your site or application and we will recommend the right setup — honestly."
          defaultType="hosting"
        />
      </div>
      <JsonLd data={[breadcrumbJsonLd(crumbs), faqJsonLd(FAQS)]} />
    </>
  )
}

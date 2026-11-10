import type { Metadata } from 'next'

import {
  ArrowRight,
  ButtonLink,
  Container,
  PageHeader,
  Reveal,
  Section,
  SectionHeader,
} from '@/design-system'
import { CurrentArt } from '@/features/brand'
import { CtaSection } from '@/features/cta'
import { breadcrumbJsonLd, buildMetadata, JsonLd } from '@/features/seo'
import { getPillarsWithServices, ServicesIndex } from '@/features/services'
import { getSiteSettings } from '@/features/site'

export const metadata: Metadata = buildMetadata({
  title: 'Services',
  description:
    'Custom software, mobile apps, business systems, M-Pesa and payment integrations, data and automation, hosting, security and support — one accountable team.',
  path: '/services',
  eyebrow: 'Services',
})

const ENGAGEMENTS = [
  {
    title: 'Fixed-scope projects',
    text: 'A clearly defined first release with a fixed price, then smaller fixed-price phases. Best for new systems and clear goals.',
  },
  {
    title: 'Dedicated team',
    text: 'Our engineers working as an extension of your team, month to month. Best for ongoing product development.',
  },
  {
    title: 'Support & retainer',
    text: 'Monitoring, maintenance and a bank of hours for improvements, with guaranteed response times.',
  },
]

export default async function ServicesPage() {
  const [pillars, settings] = await Promise.all([getPillarsWithServices(), getSiteSettings()])
  const count = pillars.reduce((n, p) => n + p.serviceList.length, 0)

  return (
    <>
      <PageHeader
        variant="art"
        art={<CurrentArt className="object-[78%_center] lg:object-right" />}
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ]}
        eyebrow={`${pillars.length} disciplines · ${count} services`}
        title="Everything software, under one roof."
        lead="From the first workshop to the server it runs on, one accountable team designs, builds, integrates, hosts and supports your systems."
        actions={
          <>
            <ButtonLink href="/contact" size="lg" icon={<ArrowRight className="size-4" />}>
              Discuss your project
            </ButtonLink>
            <ButtonLink href="/products" size="lg" variant="secondary">
              See our products
            </ButtonLink>
          </>
        }
      />

      <Section>
        <Container>
          <ServicesIndex pillars={pillars} />
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <SectionHeader
            eyebrow="Ways to work with us"
            heading="Engagements that fit how you buy."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {ENGAGEMENTS.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.08} className="h-full">
                <div className="flex h-full flex-col rounded-[var(--radius-panel)] border border-line bg-surface p-8">
                  <span className="text-label text-accent">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-6 text-h3">{e.title}</h3>
                  <p className="mt-3 text-muted">{e.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <div className="py-10 md:py-16">
        <CtaSection settings={settings} />
      </div>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ])}
      />
    </>
  )
}

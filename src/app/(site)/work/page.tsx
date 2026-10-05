import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Container, PageHeader, Reveal, Section } from '@/design-system'
import { CurrentArt } from '@/features/brand'
import { CtaSection } from '@/features/cta'
import { breadcrumbJsonLd, buildMetadata, JsonLd } from '@/features/seo'
import { getSiteSettings } from '@/features/site'
import { CaseStudyCard, getCaseStudies } from '@/features/work'

export const metadata: Metadata = buildMetadata({
  title: 'Work',
  description:
    'Case studies: the systems Oqtekal has built and what changed for the organisations that use them.',
  path: '/work',
  eyebrow: 'Work',
})

export default async function WorkPage() {
  const [studies, settings] = await Promise.all([getCaseStudies(), getSiteSettings()])
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Work', path: '/work' },
  ]
  // No page until there is real work to show (samples are hidden from the public site).
  if (!studies.length) notFound()
  const [first, ...rest] = studies
  return (
    <>
      <PageHeader
        variant="art"
        art={<CurrentArt className="object-[78%_center] lg:object-right" />}
        crumbs={crumbs}
        eyebrow="Case studies"
        title="Measured by results, not deliverables."
        lead="A selection of systems we have designed, built and run — and what changed for the people who use them every day."
      />
      <Section>
        <Container className="grid gap-16 md:gap-20">
          {first ? (
            <Reveal>
              <CaseStudyCard study={first} large />
            </Reveal>
          ) : (
            <p className="text-muted">Case studies are on their way.</p>
          )}
          {rest.length ? (
            <div className="grid gap-16 md:grid-cols-2 md:gap-10">
              {rest.map((s, i) => (
                <Reveal key={s.id} delay={(i % 2) * 0.08}>
                  <CaseStudyCard study={s} />
                </Reveal>
              ))}
            </div>
          ) : null}
        </Container>
      </Section>
      <div className="py-10 md:py-16">
        <CtaSection settings={settings} heading="Your organisation could be the next case study." />
      </div>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  )
}

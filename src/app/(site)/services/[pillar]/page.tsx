import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import {
  ArrowRight,
  ArrowUpRight,
  ButtonLink,
  Container,
  PageHeader,
  Reveal,
  Section,
  SectionHeader,
} from '@/design-system'
import { CtaSection } from '@/features/cta'
import { breadcrumbJsonLd, buildMetadata, JsonLd } from '@/features/seo'
import { getPillar, getPillarsWithServices, pillarImage } from '@/features/services'
import { getSiteSettings } from '@/features/site'
import { lowerFirst } from '@/lib/site'

type Props = { params: Promise<{ pillar: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pillar = await getPillar((await params).pillar)
  if (!pillar) return {}
  return buildMetadata({
    title: pillar.title,
    description: pillar.summary,
    path: `/services/${pillar.slug}`,
    seo: pillar.seo,
    eyebrow: 'Services',
  })
}

export default async function PillarPage({ params }: Props) {
  const slug = (await params).pillar
  const [pillar, all, settings] = await Promise.all([
    getPillar(slug),
    getPillarsWithServices(),
    getSiteSettings(),
  ])
  if (!pillar) notFound()

  const index = all.findIndex((p) => p.id === pillar.id)
  const others = all.filter((p) => p.id !== pillar.id)
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: pillar.title, path: `/services/${pillar.slug}` },
  ]

  return (
    <>
      <PageHeader
        variant="split"
        image={pillarImage(pillar.slug)}
        crumbs={crumbs}
        eyebrow={`${String(index + 1).padStart(2, '0')} · ${pillar.serviceList.length} services`}
        title={pillar.title}
        lead={pillar.intro ?? pillar.summary}
        actions={
          <ButtonLink href="/contact" size="lg" icon={<ArrowRight className="size-4" />}>
            Talk to an engineer
          </ButtonLink>
        }
      />

      <Section>
        <Container>
          <ul className="grid gap-5 md:grid-cols-2">
            {pillar.serviceList.map((s, i) => (
              <li key={s.id}>
                <Reveal delay={(i % 2) * 0.08} className="h-full">
                  <Link
                    href={s.path ?? '#'}
                    className="group flex h-full flex-col rounded-[var(--radius-panel)] border border-line bg-surface p-8 transition-[border-color,box-shadow,transform] duration-500 ease-out-expo hover:-translate-y-1 hover:border-line-strong hover:shadow-[var(--shadow-float)] md:p-10"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-label text-accent">
                        {String(index + 1).padStart(2, '0')}.{String(i + 1).padStart(2, '0')}
                      </span>
                      <ArrowUpRight className="size-5 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                    </div>
                    <h2 className="mt-8 text-h2">{s.title}</h2>
                    <p className="mt-3 text-muted">{s.summary}</p>
                    {s.technologies?.length ? (
                      <p className="mt-auto pt-8 text-sm text-subtle">
                        {s.technologies
                          .slice(0, 4)
                          .map((t) => t.name)
                          .join(' · ')}
                      </p>
                    ) : null}
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="surface" spacing="tight">
        <Container>
          <SectionHeader eyebrow="Explore more" heading="Other disciplines" level="h2" />
          <ul className="mt-10 flex flex-wrap gap-2">
            {others.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/services/${p.slug}`}
                  className="inline-flex h-11 items-center rounded-full border border-line-strong bg-surface px-5 font-medium transition-colors hover:border-fg"
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <div className="py-10 md:py-16">
        <CtaSection
          settings={settings}
          interest={pillar.title}
          heading={`Let’s talk about ${lowerFirst(pillar.title)}.`}
        />
      </div>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  )
}

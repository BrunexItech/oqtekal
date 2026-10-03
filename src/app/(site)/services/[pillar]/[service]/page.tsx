import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import {
  Accordion,
  ArrowRight,
  ArrowUpRight,
  ButtonLink,
  Check,
  Container,
  PageHeader,
  Reveal,
  Section,
  SectionHeader,
} from '@/design-system'
import { CtaSection } from '@/features/cta'
import { ProductCard } from '@/features/products'
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, JsonLd, serviceJsonLd } from '@/features/seo'
import { getPillar, getService } from '@/features/services'
import { getSiteSettings } from '@/features/site'
import { lowerFirst } from '@/lib/site'
import type { Product } from '@/payload-types'

type Props = { params: Promise<{ pillar: string; service: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pillar, service } = await params
  const s = await getService(pillar, service)
  if (!s) return {}
  return buildMetadata({
    title: s.title,
    description: s.summary,
    path: s.path ?? `/services/${pillar}/${service}`,
    seo: s.seo,
    eyebrow: 'Service',
  })
}

export default async function ServicePage({ params }: Props) {
  const { pillar: pillarSlug, service: serviceSlug } = await params
  const [service, pillar, settings] = await Promise.all([
    getService(pillarSlug, serviceSlug),
    getPillar(pillarSlug),
    getSiteSettings(),
  ])
  if (!service || !pillar) notFound()

  const path = service.path ?? `/services/${pillarSlug}/${serviceSlug}`
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: pillar.title, path: `/services/${pillar.slug}` },
    { name: service.title, path },
  ]
  const related = (service.relatedProducts ?? []).filter((p): p is Product => typeof p === 'object')
  const siblings = pillar.serviceList.filter((s) => s.id !== service.id)
  const faqs = service.faqs ?? []

  return (
    <>
      <PageHeader
        crumbs={crumbs}
        eyebrow={pillar.title}
        title={service.headline || service.title}
        lead={service.intro}
        actions={
          <>
            <ButtonLink href="/contact" size="lg" icon={<ArrowRight className="size-4" />}>
              Discuss this service
            </ButtonLink>
            <ButtonLink href="/work" size="lg" variant="secondary">
              See our work
            </ButtonLink>
          </>
        }
        aside={
          service.outcomes?.length ? (
            <div className="rounded-[var(--radius-panel)] border border-line bg-surface p-7 md:p-8">
              <p className="text-label text-muted">What changes for you</p>
              <ul className="mt-5 space-y-3.5">
                {service.outcomes.map((o) => (
                  <li key={o.id ?? o.text} className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                      <Check className="size-3.5" />
                    </span>
                    <span>{o.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : undefined
        }
      />

      {/* Deliverables */}
      <Section>
        <Container>
          <SectionHeader eyebrow="What you get" heading="Clear deliverables, no surprises." />
          <ol className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-panel)] border border-line bg-line md:grid-cols-2">
            {(service.deliverables ?? []).map((d, i) => (
              <li key={d.id ?? d.title} className="bg-surface p-8 md:p-10">
                <Reveal delay={(i % 2) * 0.06}>
                  <span className="text-label text-accent">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-5 text-h3">{d.title}</h3>
                  <p className="mt-3 text-muted">{d.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Technologies */}
      {service.technologies?.length ? (
        <Section tone="inverse" spacing="tight">
          <Container className="grid gap-8 md:grid-cols-[1fr_2fr] md:items-center">
            <div>
              <p className="text-label text-paper/60">Technology</p>
              <h2 className="mt-3 text-h2">Proven, mainstream tools.</h2>
              <p className="mt-3 text-paper/65">
                So any good engineer — including your own — can maintain it.
              </p>
            </div>
            <ul className="flex flex-wrap gap-2">
              {service.technologies.map((t) => (
                <li
                  key={t.id ?? t.name}
                  className="rounded-full border border-white/15 px-4 py-2 text-paper/85"
                >
                  {t.name}
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      {/* Related products */}
      {related.length ? (
        <Section>
          <Container>
            <SectionHeader eyebrow="Related products" heading="Start from something proven." />
            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {/* FAQ */}
      {faqs.length ? (
        <Section tone={related.length ? 'surface' : 'default'}>
          <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
            <SectionHeader eyebrow="FAQ" heading="Questions clients ask." level="h2" />
            <Accordion items={faqs} />
          </Container>
        </Section>
      ) : null}

      {/* More in this discipline */}
      {siblings.length ? (
        <Section spacing="tight">
          <Container>
            <p className="text-label text-muted">More in {pillar.title}</p>
            <ul className="mt-6 grid gap-x-10 border-t border-line sm:grid-cols-2">
              {siblings.map((s) => (
                <li key={s.id} className="border-b border-line">
                  <Link
                    href={s.path ?? '#'}
                    className="group flex items-center justify-between gap-4 py-5"
                  >
                    <span className="font-display text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">
                      {s.title}
                    </span>
                    <ArrowUpRight className="size-5 shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <div className="py-10 md:py-16">
        <CtaSection
          settings={settings}
          interest={service.title}
          heading={`Let’s talk about ${lowerFirst(service.title)}.`}
        />
      </div>

      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          serviceJsonLd({ name: service.title, description: service.summary, path }),
          ...(faqs.length ? [faqJsonLd(faqs)] : []),
        ]}
      />
    </>
  )
}

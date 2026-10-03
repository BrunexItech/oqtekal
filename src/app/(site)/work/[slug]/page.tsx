import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ArrowUpRight, Breadcrumbs, Container, Section } from '@/design-system'
import { CtaSection } from '@/features/cta'
import { SampleBadge } from '@/features/placeholder'
import { breadcrumbJsonLd, buildMetadata, JsonLd } from '@/features/seo'
import { getSiteSettings } from '@/features/site'
import { CaseCover, CaseStudyCard, getCaseStudies, getCaseStudy } from '@/features/work'
import type { Product, Service, Testimonial } from '@/payload-types'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = await getCaseStudy((await params).slug)
  if (!s) return {}
  return buildMetadata({
    title: s.title,
    description: s.summary,
    path: `/work/${s.slug}`,
    seo: s.seo,
    eyebrow: 'Case study',
  })
}

export default async function CaseStudyPage({ params }: Props) {
  const slug = (await params).slug
  const [study, all, settings] = await Promise.all([
    getCaseStudy(slug),
    getCaseStudies(),
    getSiteSettings(),
  ])
  if (!study) notFound()

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Work', path: '/work' },
    { name: study.title, path: `/work/${study.slug}` },
  ]
  const product = typeof study.product === 'object' ? (study.product as Product | null) : null
  const services = (study.services ?? []).filter((s): s is Service => typeof s === 'object')
  const quote =
    typeof study.testimonial === 'object' ? (study.testimonial as Testimonial | null) : null
  const next = all.filter((s) => s.id !== study.id).slice(0, 2)

  const facts = [
    { label: 'Client', value: study.client },
    { label: 'Industry', value: study.industry },
    ...(study.year ? [{ label: 'Year', value: String(study.year) }] : []),
  ]

  return (
    <article>
      <header className="relative isolate overflow-hidden">
        <Container className="pt-8 md:pt-10">
          <Breadcrumbs items={crumbs} className="mb-10 md:mb-14" />
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
            <span>{study.client}</span>
            <span aria-hidden>·</span>
            <span>{study.industry}</span>
            <SampleBadge show={study.isPlaceholder} />
          </div>
          <h1 className="mt-5 max-w-5xl text-display">{study.title}</h1>
          <p className="mt-6 max-w-2xl text-lead text-muted">{study.summary}</p>
        </Container>
        <Container className="mt-12 md:mt-16">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] md:aspect-[16/8] md:rounded-[2.5rem]">
            <CaseCover study={study} priority sizes="100vw" />
          </div>
        </Container>
      </header>

      {study.results?.length ? (
        <Section spacing="tight">
          <Container>
            <dl className="grid gap-8 border-b border-line pb-12 sm:grid-cols-3">
              {study.results.map((r) => (
                <div key={r.id ?? r.label} className="flex flex-col-reverse gap-1">
                  <dt className="text-muted">{r.label}</dt>
                  <dd className="font-display text-5xl font-semibold tracking-tight text-accent md:text-6xl">
                    {r.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Container>
        </Section>
      ) : null}

      <Section spacing="tight">
        <Container className="grid gap-12 lg:grid-cols-[18rem_1fr] lg:gap-20">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <dl className="space-y-5 text-sm">
              {facts.map((f) => (
                <div key={f.label}>
                  <dt className="text-label text-subtle">{f.label}</dt>
                  <dd className="mt-1.5 font-medium">{f.value}</dd>
                </div>
              ))}
              {product ? (
                <div>
                  <dt className="text-label text-subtle">Product</dt>
                  <dd className="mt-1.5">
                    <Link
                      href={`/products/${product.slug}`}
                      className="font-medium text-accent hover:underline"
                    >
                      {product.name}
                    </Link>
                  </dd>
                </div>
              ) : null}
              {services.length ? (
                <div>
                  <dt className="text-label text-subtle">Services</dt>
                  <dd className="mt-1.5 flex flex-col gap-1">
                    {services.map((s) => (
                      <Link
                        key={s.id}
                        href={s.path ?? '/services'}
                        className="font-medium hover:text-accent"
                      >
                        {s.title}
                      </Link>
                    ))}
                  </dd>
                </div>
              ) : null}
              {study.stack?.length ? (
                <div>
                  <dt className="text-label text-subtle">Stack</dt>
                  <dd className="mt-1.5 text-muted">
                    {study.stack.map((s) => s.name).join(' · ')}
                  </dd>
                </div>
              ) : null}
            </dl>
          </aside>

          <div className="max-w-3xl space-y-14">
            <section>
              <h2 className="text-h2">The challenge</h2>
              <p className="mt-5 text-lg leading-relaxed text-muted">{study.challenge}</p>
            </section>
            <section>
              <h2 className="text-h2">What we built</h2>
              <p className="mt-5 text-lg leading-relaxed text-muted">{study.solution}</p>
            </section>
            {study.approach?.length ? (
              <section>
                <h2 className="text-h2">How we did it</h2>
                <ol className="mt-6 divide-y divide-line border-y border-line">
                  {study.approach.map((a, i) => (
                    <li key={a.id ?? a.title} className="grid gap-2 py-6 sm:grid-cols-[3rem_1fr]">
                      <span className="pt-1 text-label text-accent">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3 className="font-display text-lg font-semibold tracking-tight">
                          {a.title}
                        </h3>
                        <p className="mt-1.5 text-muted">{a.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            ) : null}
            {study.outcome ? (
              <section>
                <h2 className="text-h2">The outcome</h2>
                <p className="mt-5 text-lg leading-relaxed text-muted">{study.outcome}</p>
              </section>
            ) : null}
            {quote ? (
              <figure className="rounded-[var(--radius-panel)] bg-ink p-8 text-paper md:p-12">
                <blockquote className="font-display text-[clamp(1.25rem,1rem+1vw,1.75rem)] leading-snug font-medium tracking-tight">
                  “{quote.quote}”
                </blockquote>
                <figcaption className="mt-6 flex flex-wrap items-center gap-2 text-paper/70">
                  <span className="font-semibold text-paper">{quote.name}</span>
                  {[quote.role, quote.company].filter(Boolean).join(', ')}
                  <SampleBadge show={quote.isPlaceholder} />
                </figcaption>
              </figure>
            ) : null}
          </div>
        </Container>
      </Section>

      {next.length ? (
        <Section tone="surface">
          <Container>
            <div className="flex items-end justify-between gap-6">
              <h2 className="text-h1">More work</h2>
              <Link
                href="/work"
                className="inline-flex items-center gap-1.5 font-medium hover:text-accent"
              >
                All case studies <ArrowUpRight className="size-4" />
              </Link>
            </div>
            <div className="mt-12 grid gap-14 md:grid-cols-2 md:gap-10">
              {next.map((s) => (
                <CaseStudyCard key={s.id} study={s} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <div className="py-10 md:py-16">
        <CtaSection settings={settings} heading="Facing a similar challenge?" />
      </div>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </article>
  )
}

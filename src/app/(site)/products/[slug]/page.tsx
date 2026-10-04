import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import {
  Accordion,
  ArrowRight,
  ArrowUpRight,
  Breadcrumbs,
  ButtonLink,
  Container,
  Reveal,
  Section,
  SectionHeader,
} from '@/design-system'
import { CtaSection } from '@/features/cta'
import { CmsImage } from '@/features/media'
import { AvailabilityTag, getProduct, getProducts, ProductMedia } from '@/features/products'
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, JsonLd, productJsonLd } from '@/features/seo'
import { getSiteSettings } from '@/features/site'
import { asMedia } from '@/lib/media'
import { keepTogether } from '@/lib/site'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await getProduct((await params).slug)
  if (!p) return {}
  return buildMetadata({
    title: `${p.name} — ${p.tagline}`,
    description: p.summary,
    path: `/products/${p.slug}`,
    seo: p.seo,
    eyebrow: p.category,
  })
}

export default async function ProductPage({ params }: Props) {
  const slug = (await params).slug
  const [product, all, settings] = await Promise.all([
    getProduct(slug),
    getProducts(),
    getSiteSettings(),
  ])
  if (!product) notFound()

  const path = `/products/${product.slug}`
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: product.name, path },
  ]
  const partner = asMedia(product.partnerLogo)
  const logo = asMedia(product.logo)
  const context = asMedia(product.contextImage)
  const shots = (product.screenshots ?? [])
    .map((s) => ({ media: asMedia(s.image), caption: s.caption }))
    .filter((s) => s.media)
  const others = all.filter((p) => p.id !== product.id)
  const faqs = product.faqs ?? []

  return (
    <>
      {/* Hero */}
      <header className="relative isolate overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 grid-lines [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black,transparent_70%)]"
        />
        <Container className="pt-8 md:pt-10">
          <Breadcrumbs items={crumbs} className="mb-10 md:mb-14" />
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <div className="mb-6 flex flex-wrap items-center gap-3">
                {logo ? (
                  <span className="relative h-10 w-28">
                    <CmsImage media={logo} sizes="112px" />
                  </span>
                ) : null}
                <span className="text-label text-muted">{product.category}</span>
                <AvailabilityTag value={product.availability} />
              </div>
              <h1 className="text-display">{keepTogether(product.name)}</h1>
              <p className="mt-5 font-display text-[clamp(1.15rem,1.05rem+0.5vw,1.45rem)] leading-snug font-medium tracking-tight">
                {product.tagline}
              </p>
            </div>
            <div className="lg:pb-2">
              <p className="text-lead text-muted">{product.summary}</p>
              <div className="mt-7 flex flex-col gap-3 xs:flex-row">
                <ButtonLink href="#demo" size="lg" icon={<ArrowRight className="size-4" />}>
                  Request a demo
                </ButtonLink>
                {product.externalUrl ? (
                  <ButtonLink
                    href={product.externalUrl}
                    size="lg"
                    variant="secondary"
                    icon={<ArrowUpRight className="size-4" />}
                  >
                    Visit website
                  </ButtonLink>
                ) : null}
              </div>
              {partner?.url ? (
                <div className="mt-8 inline-flex items-center gap-4 rounded-2xl border border-line bg-white py-3 pr-5 pl-4">
                  <span className="text-sm text-[#4f5561]">Integrates with</span>
                  <Image
                    src={partner.url}
                    alt={partner.alt}
                    width={partner.width ?? 1024}
                    height={partner.height ?? 374}
                    className="h-9 w-auto"
                    sizes="140px"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </Container>
        <Container className="mt-14 md:mt-20">
          <div className="relative rounded-[2rem] bg-[linear-gradient(140deg,var(--brand-600),var(--brand-900))] p-3 sm:p-6 md:rounded-[2.5rem] md:p-12 lg:p-16">
            <div
              aria-hidden
              className="absolute inset-0 rounded-[inherit] grid-lines opacity-50 [--grid-line:rgb(255_255_255/0.07)]"
            />
            <div className="relative mx-auto max-w-5xl">
              <ProductMedia product={product} priority />
            </div>
          </div>
        </Container>
      </header>

      {/* Highlights */}
      {product.highlights?.length ? (
        <Section spacing="tight">
          <Container>
            <dl className="grid gap-8 border-y border-line py-10 sm:grid-cols-3">
              {product.highlights.map((h) => (
                <div key={h.id ?? h.label} className="flex flex-col-reverse gap-1">
                  <dt className="text-muted">{h.label}</dt>
                  <dd className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
                    {h.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Container>
        </Section>
      ) : null}

      {/* Problem */}
      <Section spacing="tight">
        <Container className="grid gap-8 lg:grid-cols-[1fr_2fr]">
          <p className="text-label text-accent">The problem</p>
          <p className="font-display text-[clamp(1.2rem,1.05rem+0.7vw,1.65rem)] leading-[1.3] font-medium tracking-tight">
            {product.problem}
          </p>
        </Container>
      </Section>

      {/* Real-world context */}
      {context?.url ? (
        <section className="relative isolate overflow-hidden bg-ink text-paper">
          <CmsImage
            media={context}
            sizes="100vw"
            className="-z-20"
            loading={{ tone: 'dark', className: '-z-20' }}
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(7_10_18/0.15)_0%,rgb(7_10_18/0.25)_50%,rgb(7_10_18/0.88)_100%)]"
          />
          <Container className="flex min-h-[min(56svh,30rem)] flex-col justify-end py-14 md:py-20">
            <p className="text-label text-brand-400">{product.category}</p>
            <p className="mt-4 max-w-3xl font-display text-[clamp(1.4rem,1.15rem+1.1vw,2.2rem)] leading-[1.1] font-semibold tracking-tight">
              {product.contextCaption ?? product.tagline}
            </p>
          </Container>
        </section>
      ) : null}

      {/* Features */}
      <Section>
        <Container>
          <SectionHeader eyebrow="Features" heading={`What ${product.name} does for you.`} />
          <ul className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-panel)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {(product.features ?? []).map((f, i) => (
              <li key={f.id ?? f.title} className="bg-surface p-8">
                <Reveal delay={(i % 3) * 0.06}>
                  <span className="text-label text-accent">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-5 text-h3">{f.title}</h3>
                  <p className="mt-3 text-muted">{f.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Audiences & integrations */}
      <Section tone="surface">
        <Container className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {product.audiences?.length ? (
            <div>
              <SectionHeader eyebrow="Who it is for" heading="Built for" level="h2" />
              <ul className="mt-8 divide-y divide-line border-y border-line">
                {product.audiences.map((a) => (
                  <li
                    key={a.id ?? a.title}
                    className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  >
                    <span className="font-display text-lg font-semibold tracking-tight">
                      {a.title}
                    </span>
                    {a.text ? <span className="text-muted">{a.text}</span> : null}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {product.integrations?.length ? (
            <div>
              <SectionHeader eyebrow="Integrations" heading="Connects with" level="h2" />
              <ul className="mt-8 flex flex-wrap gap-2">
                {product.integrations.map((x) => (
                  <li
                    key={x.id ?? x.name}
                    className="rounded-full border border-line-strong bg-surface px-4 py-2"
                  >
                    {x.name}
                  </li>
                ))}
              </ul>
              {product.pricingNote ? (
                <p className="mt-10 rounded-[var(--radius-card)] border border-line bg-surface p-6">
                  <span className="text-label text-muted">Pricing</span>
                  <span className="mt-2 block font-display text-xl font-semibold tracking-tight">
                    {product.pricingNote}
                  </span>
                </p>
              ) : null}
            </div>
          ) : null}
        </Container>
      </Section>

      {/* Screenshot gallery (when real screenshots exist) */}
      {shots.length > 1 ? (
        <Section>
          <Container>
            <SectionHeader eyebrow="Screens" heading="A closer look." />
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {shots.slice(1).map((s, i) => (
                <figure key={i}>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-card)] border border-line">
                    <CmsImage media={s.media!} sizes="(min-width: 768px) 45vw, 100vw" />
                  </div>
                  {s.caption ? (
                    <figcaption className="mt-3 text-sm text-muted">{s.caption}</figcaption>
                  ) : null}
                </figure>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {/* FAQ */}
      {faqs.length ? (
        <Section>
          <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
            <SectionHeader eyebrow="FAQ" heading={`About ${product.name}`} level="h2" />
            <Accordion items={faqs} />
          </Container>
        </Section>
      ) : null}

      <div id="demo" className="scroll-mt-24 py-10 md:py-16">
        <CtaSection
          settings={settings}
          eyebrow="Request a demo"
          heading={`See ${product.name} in action.`}
          text="Tell us about your organisation. We will prepare a focused walkthrough around how you work."
          defaultType="demo"
          interest={product.name}
          submitLabel="Request demo"
        />
      </div>

      {/* Other products */}
      {others.length ? (
        <Section spacing="tight" className="border-t border-line">
          <Container>
            <p className="text-label text-muted">Other products</p>
            <ul className="mt-6 grid gap-x-10 border-t border-line sm:grid-cols-2 lg:grid-cols-3">
              {others.map((p) => (
                <li key={p.id} className="border-b border-line">
                  <Link
                    href={`/products/${p.slug}`}
                    className="group flex items-center justify-between gap-4 py-5"
                  >
                    <span>
                      <span className="block font-display text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">
                        {p.name}
                      </span>
                      <span className="block text-sm text-muted">{p.tagline}</span>
                    </span>
                    <ArrowUpRight className="size-5 shrink-0 text-muted" />
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          productJsonLd({
            name: product.name,
            description: product.summary,
            path,
            category: product.category,
          }),
          ...(faqs.length ? [faqJsonLd(faqs)] : []),
        ]}
      />
    </>
  )
}

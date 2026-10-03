import type { Metadata } from 'next'

import { ArrowRight, ButtonLink, Container, PageHeader, Reveal, Section } from '@/design-system'
import { CtaSection } from '@/features/cta'
import { getProducts, ProductCard } from '@/features/products'
import { breadcrumbJsonLd, buildMetadata, JsonLd } from '@/features/seo'
import { getSiteSettings } from '@/features/site'

export const metadata: Metadata = buildMetadata({
  title: 'Products',
  description:
    'Tolkyn, School Management, Property Management, ERP, Sports Management and M-Pesa Integration — proven systems, customised to your organisation and hosted by Oqtekal.',
  path: '/products',
  eyebrow: 'Products',
})

const INCLUDED = [
  { title: 'M-Pesa built in', text: 'Collections, confirmations and reconciliation from day one.' },
  { title: 'Customised to you', text: 'Your workflows, roles, branding and reports.' },
  { title: 'Hosted & maintained', text: 'Fast, secure hosting with backups and monitoring.' },
  { title: 'Local support', text: 'Engineers who know the system, reachable on WhatsApp.' },
]

export default async function ProductsPage() {
  const [products, settings] = await Promise.all([getProducts(), getSiteSettings()])
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
  ]
  return (
    <>
      <PageHeader
        variant="cinematic"
        image={{
          src: '/images/code-colorful.jpg',
          alt: 'Source code on a laptop screen',
          position: 'center',
        }}
        crumbs={crumbs}
        eyebrow={`${products.length} products`}
        title="Proven systems, ready to adapt."
        lead="Software already running real organisations. Start from a working product, then shape it around your rules — far faster and safer than building from zero."
        actions={
          <ButtonLink href="#demo" size="lg" icon={<ArrowRight className="size-4" />}>
            Request a demo
          </ButtonLink>
        }
      />

      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            {products.map((p, i) => (
              <Reveal key={p.id} delay={(i % 2) * 0.08} className="h-full">
                <ProductCard product={p} priority={i < 2} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="inverse" spacing="tight">
        <Container>
          <p className="text-label text-paper/60">Every product includes</p>
          <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {INCLUDED.map((x, i) => (
              <li key={x.title}>
                <span className="text-label text-brand-400">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="mt-4 text-h3">{x.title}</h2>
                <p className="mt-2 text-paper/65">{x.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <div id="demo" className="scroll-mt-24 py-10 md:py-16">
        <CtaSection
          settings={settings}
          eyebrow="Request a demo"
          heading="See any product with your own data in mind."
          text="Tell us about your organisation and which product interests you. We will set up a focused, 30-minute walkthrough."
          defaultType="demo"
          submitLabel="Request demo"
        />
      </div>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  )
}

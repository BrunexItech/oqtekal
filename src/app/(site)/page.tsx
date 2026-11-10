import type { Metadata } from 'next'

import { ArrowLink, Container, Reveal, Section, SectionHeader } from '@/design-system'
import { CtaSection } from '@/features/cta'
import {
  Capabilities,
  getHomePage,
  Hero,
  NairobiBand,
  StoryScroll,
  TechStrip,
  WhyOqtekal,
} from '@/features/home'
import { getPosts, PostCard } from '@/features/insights'
import { getProducts, ProductMedia, ProductShowcase } from '@/features/products'
import { buildMetadata } from '@/features/seo'
import { getPillarsWithServices } from '@/features/services'
import { getSiteSettings } from '@/features/site'
import { getTestimonials, Testimonials } from '@/features/testimonials'
import { CaseStudyCard, getCaseStudies } from '@/features/work'
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from '@/lib/site'

export const metadata: Metadata = {
  ...buildMetadata({
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    path: '/',
  }),
  title: { absolute: `${SITE_NAME} — ${SITE_TAGLINE}` },
}

export default async function HomePage() {
  const [home, settings, products, pillars, work, testimonials, posts] = await Promise.all([
    getHomePage(),
    getSiteSettings(),
    getProducts({ featured: true }),
    getPillarsWithServices(),
    getCaseStudies({ featured: true, limit: 3 }),
    getTestimonials(),
    getPosts({ limit: 3 }),
  ])

  const [leadStudy, ...otherStudies] = work

  return (
    <>
      <Hero hero={home.hero} stats={settings.stats} showStats={!settings.statsArePlaceholder} />
      <TechStrip />

      {/* Capabilities */}
      <Section id="services">
        <Container>
          <SectionHeader
            eyebrow={home.servicesIntro?.eyebrow}
            heading={home.servicesIntro?.heading ?? 'Services'}
            text={home.servicesIntro?.text}
            action={<ArrowLink href="/services">All services</ArrowLink>}
          />
          <Reveal className="mt-14 md:mt-16">
            <Capabilities pillars={pillars} />
          </Reveal>
        </Container>
      </Section>

      <NairobiBand />

      {/* Products */}
      <Section id="products">
        <Container>
          <SectionHeader
            eyebrow={home.productsIntro?.eyebrow}
            heading={home.productsIntro?.heading ?? 'Products'}
            text={home.productsIntro?.text}
            action={<ArrowLink href="/products">All products</ArrowLink>}
          />
          <Reveal className="mt-14 md:mt-20">
            <ProductShowcase
              items={products.map((p, i) => ({
                slug: p.slug,
                name: p.name,
                tagline: p.tagline,
                category: p.category,
                summary: p.summary,
                features: (p.features ?? []).map((f) => f.title),
                media: <ProductMedia product={p} priority={i === 0} />,
              }))}
            />
          </Reveal>
        </Container>
      </Section>

      {home.reasons?.length ? <WhyOqtekal intro={home.whyIntro} reasons={home.reasons} /> : null}

      {/* Selected work */}
      {leadStudy ? (
        <Section id="work">
          <Container>
            <SectionHeader
              eyebrow={home.workIntro?.eyebrow}
              heading={home.workIntro?.heading ?? 'Selected work'}
              text={home.workIntro?.text}
              action={<ArrowLink href="/work">All case studies</ArrowLink>}
            />
            <div className="mt-14 grid gap-14 md:mt-20 md:gap-16">
              <Reveal>
                <CaseStudyCard study={leadStudy} large />
              </Reveal>
              {otherStudies.length ? (
                <div className="grid gap-14 md:grid-cols-2 md:gap-10">
                  {otherStudies.map((s, i) => (
                    <Reveal key={s.id} delay={i * 0.1}>
                      <CaseStudyCard study={s} />
                    </Reveal>
                  ))}
                </div>
              ) : null}
            </div>
          </Container>
        </Section>
      ) : null}

      {/* Process */}
      {home.process?.length ? (
        <Section id="process" tone="surface">
          <Container>
            <SectionHeader
              eyebrow={home.processIntro?.eyebrow}
              heading={home.processIntro?.heading ?? 'How we work'}
              text={home.processIntro?.text}
            />
            <div className="mt-14 md:mt-20">
              <StoryScroll steps={home.process} />
            </div>
          </Container>
        </Section>
      ) : null}

      {/* Testimonials */}
      {testimonials.length ? (
        <Section spacing="tight" className="border-y border-line">
          <Container className="py-6 md:py-10">
            <Testimonials items={testimonials} />
          </Container>
        </Section>
      ) : null}

      {/* Insights */}
      {posts.length ? (
        <Section id="insights" tone="surface">
          <Container>
            <SectionHeader
              eyebrow="Insights"
              heading="Notes from the engineering floor."
              action={<ArrowLink href="/insights">All articles</ArrowLink>}
            />
            <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.08}>
                  <PostCard post={p} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <div className="py-10 md:py-16">
        <CtaSection
          settings={settings}
          eyebrow={home.ctaIntro?.eyebrow}
          heading={home.ctaIntro?.heading}
          text={home.ctaIntro?.text}
        />
      </div>
    </>
  )
}

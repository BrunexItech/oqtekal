import type { Metadata } from 'next'

import { ArrowLink, Container, Reveal, Section, SectionHeader } from '@/design-system'
import { CtaSection } from '@/features/cta'
import {
  getHomePage,
  Hero,
  Process,
  ProductsOverview,
  ServicesOverview,
  WhyOqtekal,
} from '@/features/home'
import { getPosts, PostCard } from '@/features/insights'
import { getProducts } from '@/features/products'
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

/** Products shown on the home page; the rest are one click away. */
const HOME_PRODUCTS = 6

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

  const serviceCount = pillars.reduce((n, p) => n + p.serviceList.length, 0)
  const [leadStudy, ...otherStudies] = work

  return (
    <>
      <Hero
        hero={home.hero}
        stats={settings.stats}
        showStats={!settings.statsArePlaceholder}
        facts={[
          `${products.length} ready-made products`,
          `${serviceCount} services`,
          'Hosted and supported in Kenya',
        ]}
      />

      <Section id="services">
        <Container>
          <SectionHeader
            eyebrow={home.servicesIntro?.eyebrow}
            heading={home.servicesIntro?.heading ?? 'Services'}
            text={home.servicesIntro?.text}
            action={<ArrowLink href="/services">All services</ArrowLink>}
          />
          <Reveal className="mt-12 md:mt-14">
            <ServicesOverview pillars={pillars} />
          </Reveal>
        </Container>
      </Section>

      <Section id="products" tone="surface">
        <Container>
          <SectionHeader
            eyebrow={home.productsIntro?.eyebrow}
            heading={home.productsIntro?.heading ?? 'Products'}
            text={home.productsIntro?.text}
            action={<ArrowLink href="/products">All {products.length} products</ArrowLink>}
          />
          <Reveal className="mt-12 md:mt-14">
            <ProductsOverview products={products.slice(0, HOME_PRODUCTS)} />
          </Reveal>
        </Container>
      </Section>

      {home.process?.length ? (
        <Section id="process">
          <Container>
            <SectionHeader
              eyebrow={home.processIntro?.eyebrow}
              heading={home.processIntro?.heading ?? 'How we work'}
              text={home.processIntro?.text}
            />
            <Reveal className="mt-12 md:mt-14">
              <Process steps={home.process} />
            </Reveal>
          </Container>
        </Section>
      ) : null}

      {home.reasons?.length ? (
        <Section tone="surface">
          <Container>
            <WhyOqtekal intro={home.whyIntro} reasons={home.reasons} />
          </Container>
        </Section>
      ) : null}

      {leadStudy ? (
        <Section id="work">
          <Container>
            <SectionHeader
              eyebrow={home.workIntro?.eyebrow}
              heading={home.workIntro?.heading ?? 'Selected work'}
              text={home.workIntro?.text}
              action={<ArrowLink href="/work">All case studies</ArrowLink>}
            />
            <div className="mt-12 grid gap-14 md:mt-14 md:gap-16">
              <CaseStudyCard study={leadStudy} large />
              {otherStudies.length ? (
                <div className="grid gap-14 md:grid-cols-2 md:gap-10">
                  {otherStudies.map((s) => (
                    <CaseStudyCard key={s.id} study={s} />
                  ))}
                </div>
              ) : null}
            </div>
          </Container>
        </Section>
      ) : null}

      {testimonials.length ? (
        <Section spacing="tight" className="border-y border-line">
          <Container className="py-6 md:py-10">
            <Testimonials items={testimonials} />
          </Container>
        </Section>
      ) : null}

      {posts.length ? (
        <Section id="insights">
          <Container>
            <SectionHeader
              eyebrow="Insights"
              heading="Notes from the engineering floor."
              action={<ArrowLink href="/insights">All articles</ArrowLink>}
            />
            <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <div className="pb-10 md:pb-16">
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

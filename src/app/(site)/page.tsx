import type { Metadata } from 'next'

import {
  ArrowLink,
  ArrowRight,
  ButtonLink,
  Container,
  Reveal,
  Section,
  SectionHeader,
} from '@/design-system'
import { CtaSection } from '@/features/cta'
import { getHomePage, Hero, Process, TechStrip } from '@/features/home'
import { getHostingPlans, PlanCards } from '@/features/hosting'
import { getPosts, PostCard } from '@/features/insights'
import { getProducts, ProductMedia, ProductShowcase } from '@/features/products'
import { buildMetadata } from '@/features/seo'
import { getPillarsWithServices, ServicesIndex } from '@/features/services'
import { getSiteSettings } from '@/features/site'
import { getTeam, TeamGrid } from '@/features/team'
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
  const [home, settings, products, pillars, work, team, testimonials, plans, posts] =
    await Promise.all([
      getHomePage(),
      getSiteSettings(),
      getProducts({ featured: true }),
      getPillarsWithServices(),
      getCaseStudies({ featured: true, limit: 3 }),
      getTeam(),
      getTestimonials(),
      getHostingPlans(),
      getPosts({ limit: 3 }),
    ])

  const [leadStudy, ...otherStudies] = work
  const webPlans = plans.filter((p) => p.category === 'web').slice(0, 3)

  return (
    <>
      <Hero hero={home.hero} stats={settings.stats} />
      <TechStrip />

      {/* Products */}
      <Section id="products">
        <Container>
          <SectionHeader
            eyebrow={home.productsIntro?.eyebrow}
            index="01"
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

      {/* Services */}
      <Section id="services" tone="inverse">
        <Container>
          <SectionHeader
            eyebrow={home.servicesIntro?.eyebrow}
            index="02"
            heading={home.servicesIntro?.heading ?? 'Services'}
            text={home.servicesIntro?.text}
            action={
              <ButtonLink
                href="/services"
                variant="inverse"
                icon={<ArrowRight className="size-4" />}
              >
                Explore services
              </ButtonLink>
            }
          />
          <div className="mt-14 md:mt-20">
            <ServicesIndex pillars={pillars} inverse />
          </div>
        </Container>
      </Section>

      {/* Selected work */}
      {leadStudy ? (
        <Section id="work">
          <Container>
            <SectionHeader
              eyebrow={home.workIntro?.eyebrow}
              index="03"
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
              index="04"
              heading={home.processIntro?.heading ?? 'How we work'}
              text={home.processIntro?.text}
            />
            <div className="mt-14 md:mt-20">
              <Process steps={home.process} />
            </div>
          </Container>
        </Section>
      ) : null}

      {/* Team */}
      {team.length ? (
        <Section id="team">
          <Container>
            <SectionHeader
              eyebrow={home.teamIntro?.eyebrow}
              index="05"
              heading={home.teamIntro?.heading ?? 'The team'}
              text={home.teamIntro?.text}
              action={<ArrowLink href="/about">About Oqtekal</ArrowLink>}
            />
            <div className="mt-14 md:mt-20">
              <TeamGrid members={team} />
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

      {/* Hosting */}
      {webPlans.length ? (
        <Section id="hosting">
          <Container>
            <SectionHeader
              eyebrow={home.hostingIntro?.eyebrow}
              index="06"
              heading={home.hostingIntro?.heading ?? 'Hosting'}
              text={home.hostingIntro?.text}
              action={<ArrowLink href="/hosting">All plans & VPS</ArrowLink>}
            />
            <div className="mt-14 md:mt-16">
              <PlanCards plans={webPlans} />
            </div>
          </Container>
        </Section>
      ) : null}

      {/* Insights */}
      {posts.length ? (
        <Section id="insights" tone="surface">
          <Container>
            <SectionHeader
              eyebrow="Insights"
              index="07"
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

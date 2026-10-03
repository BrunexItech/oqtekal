import type { Metadata } from 'next'

import {
  ArrowRight,
  ButtonLink,
  Check,
  Container,
  PageHeader,
  Reveal,
  Section,
  SectionHeader,
} from '@/design-system'
import { getAboutPage } from '@/features/about'
import { Symbol } from '@/features/brand'
import { CtaSection } from '@/features/cta'
import { breadcrumbJsonLd, buildMetadata, JsonLd } from '@/features/seo'
import { getSiteSettings } from '@/features/site'
import { getTeam, TeamGrid } from '@/features/team'

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAboutPage()
  return buildMetadata({
    title: 'About Oqtekal',
    description: about.intro,
    path: '/about',
    eyebrow: 'About',
  })
}

export default async function AboutPage() {
  const [about, team, settings] = await Promise.all([getAboutPage(), getTeam(), getSiteSettings()])
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ]

  return (
    <>
      <PageHeader
        crumbs={crumbs}
        eyebrow="About Oqtekal"
        title={about.heading}
        lead={about.intro}
        aside={
          <div className="relative mx-auto hidden aspect-square w-full max-w-sm lg:block">
            <Symbol
              gradient
              className="size-full animate-[float_8s_ease-in-out_infinite] motion-reduce:animate-none"
            />
          </div>
        }
      />

      {settings.stats?.length ? (
        <Container>
          <dl className="grid grid-cols-2 gap-y-8 border-b border-line py-12 md:grid-cols-4">
            {settings.stats.map((s, i) => (
              <div key={s.id ?? i} className="flex flex-col-reverse gap-1">
                <dt className="text-sm text-muted">{s.label}</dt>
                <dd className="font-display text-4xl font-semibold tracking-tight">{s.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      ) : null}

      {about.story?.length ? (
        <Section>
          <Container className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-label text-accent">Our story</p>
              <h2 className="mt-4 text-h1">Why Oqtekal exists.</h2>
            </div>
            <div className="space-y-7">
              {about.story.map((p, i) => (
                <Reveal key={p.id ?? i}>
                  <p
                    className={
                      i === 0
                        ? 'font-display text-[clamp(1.3rem,1.1rem+0.9vw,1.85rem)] leading-snug font-medium tracking-tight'
                        : 'text-lg leading-relaxed text-muted'
                    }
                  >
                    {p.text}
                  </p>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {about.values?.length ? (
        <Section tone="surface">
          <Container>
            <SectionHeader eyebrow="Values" heading="How we work, in four lines." />
            <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {about.values.map((v, i) => (
                <li key={v.id ?? v.title} className="h-full">
                  <Reveal delay={i * 0.06} className="h-full">
                    <div className="flex h-full flex-col rounded-[var(--radius-panel)] border border-line bg-surface p-7">
                      <span className="text-label text-accent">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className="mt-8 text-h3">{v.title}</h3>
                      <p className="mt-3 text-muted">{v.text}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <Section id="team" className="scroll-mt-20">
        <Container>
          <SectionHeader
            eyebrow="The team"
            heading="The people you will work with."
            text="A small, senior team. You talk directly to the engineers who design, build and support your system."
            action={
              <ButtonLink
                href="/careers"
                variant="secondary"
                icon={<ArrowRight className="size-4" />}
              >
                Join us
              </ButtonLink>
            }
          />
          <div className="mt-14 md:mt-20">
            <TeamGrid members={team} />
          </div>
        </Container>
      </Section>

      {about.commitments?.length ? (
        <Section tone="inverse">
          <Container className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
            <div>
              <p className="text-label text-brand-400">Our commitments</p>
              <h2 className="mt-4 text-h1">What every client can count on.</h2>
            </div>
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {about.commitments.map((c) => (
                <li key={c.id ?? c.text} className="flex items-start gap-4 py-5 text-lg">
                  <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-brand-600 text-white">
                    <Check className="size-3.5" />
                  </span>
                  {c.text}
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <div className="py-10 md:py-16">
        <CtaSection settings={settings} heading="Let’s build something that lasts." />
      </div>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  )
}

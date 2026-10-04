import { ArrowRight, ButtonLink, Container } from '@/design-system'
import type { HomePage, SiteSetting } from '@/payload-types'

import { ProductVisual } from '@/features/products'
import type { Product } from '@/payload-types'

import { HeroRotationProvider } from './HeroRotation'
import { HeroShowcase, type HeroSlide } from './HeroShowcase'
import { RotatingWord } from './RotatingWord'

type Showcase = { label: string; visual: Product['visual']; chips: HeroSlide['chips'] }

/**
 * Which product the hero shows for each headline word. Matched by keyword, so editors can change
 * the words in the admin and still get a fitting product; anything unmatched shows Tolkyn.
 */
const SHOWCASES: { match: RegExp; show: Showcase }[] = [
  {
    match: /school|student|education/i,
    show: {
      label: 'Schools',
      visual: 'school',
      chips: [
        { value: 'Report cards', label: 'ready in minutes' },
        { value: 'Fee balances', label: 'always up to date' },
      ],
    },
  },
  {
    match: /propert|rent|landlord|estate/i,
    show: {
      label: 'Property',
      visual: 'property',
      chips: [
        { value: 'Rent reminders', label: 'sent automatically' },
        { value: 'Owner statements', label: 'in one click' },
      ],
    },
  },
  {
    match: /sacco|chama|member/i,
    show: {
      label: 'SACCOs',
      visual: 'sacco',
      chips: [
        { value: 'Member statements', label: 'on the phone, 24/7' },
        { value: 'Loans & guarantors', label: 'tracked end to end' },
      ],
    },
  },
  {
    match: /retail|shop|store|pos/i,
    show: {
      label: 'Retail',
      visual: 'pos',
      chips: [
        { value: 'Checkout', label: 'in seconds, even offline' },
        { value: 'Every customer', label: 'remembered' },
      ],
    },
  },
  {
    match: /health|clinic|hospital/i,
    show: {
      label: 'Healthcare',
      visual: 'health',
      chips: [
        { value: 'Shorter queues', label: 'for every patient' },
        { value: 'Every charge', label: 'captured' },
      ],
    },
  },
  {
    match: /business|enterprise|compan|erp/i,
    show: {
      label: 'Business',
      visual: 'erp',
      chips: [
        { value: 'Month-end', label: 'closed in days' },
        { value: 'Stock & payroll', label: 'in one system' },
      ],
    },
  },
]

const FALLBACK: Showcase = {
  label: 'Communications',
  visual: 'comms',
  chips: [
    { value: 'One shared inbox', label: 'for every channel' },
    { value: 'No conversation', label: 'ever lost' },
  ],
}

const showcaseFor = (word: string): Showcase =>
  SHOWCASES.find((s) => s.match.test(word))?.show ?? FALLBACK

type Props = {
  hero: HomePage['hero']
  stats: SiteSetting['stats']
  /** Company numbers are only shown once they are real (unticked "samples" in the admin). */
  showStats: boolean
}

export const Hero = ({ hero, stats, showStats }: Props) => {
  const words = (hero.rotatingWords ?? []).map((w) => w.word).filter(Boolean)
  const slides: HeroSlide[] = (words.length ? words : ['businesses.']).map((word, i) => {
    const show = showcaseFor(word)
    return {
      key: `${i}-${show.visual}`,
      label: show.label,
      chips: show.chips,
      visual: <ProductVisual visual={show.visual} />,
    }
  })
  return (
    <HeroRotationProvider count={slides.length}>
      <section className="relative isolate overflow-hidden">
        {/* Atmosphere: dotted engineering grid + slow brand aurora */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(var(--line-strong)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_75%_65%_at_70%_40%,black,transparent_75%)] [background-size:22px_22px] opacity-60"
        />
        <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] size-[46rem] animate-[aurora_18s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle,rgb(6_77_251/0.18),transparent_60%)] blur-3xl motion-reduce:animate-none" />
          <div className="absolute top-[30%] right-[25%] size-[30rem] animate-[aurora_22s_ease-in-out_infinite_reverse] rounded-full bg-[radial-gradient(circle,rgb(47_168_255/0.14),transparent_60%)] blur-3xl motion-reduce:animate-none" />
        </div>

        <Container className="grid items-center gap-12 pt-10 pb-16 md:pt-14 lg:grid-cols-[1fr_1.12fr] lg:gap-14 lg:pt-16 lg:pb-24">
          <div className="min-w-0 animate-[hero-in_1s_cubic-bezier(0.22,1,0.36,1)_both]">
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 py-1.5 pr-3.5 pl-2 text-[0.8rem] text-muted backdrop-blur">
              <span className="grid size-5 place-items-center rounded-full bg-success/15">
                <span className="size-2 animate-[pulse-dot_2s_infinite] rounded-full bg-success" />
              </span>
              {hero.eyebrow ?? 'Software engineering company · Nairobi'}
            </p>

            <h1 className="mt-7 max-w-[15ch] text-display-xl">
              {hero.heading} {words.length ? <RotatingWord words={words} /> : null}
            </h1>

            <p className="mt-7 max-w-[34rem] text-lead text-muted">{hero.text}</p>

            <div className="mt-9 flex flex-col gap-3 xs:flex-row">
              <ButtonLink href="/contact" size="lg" icon={<ArrowRight className="size-4" />}>
                {hero.primaryLabel ?? 'Start a project'}
              </ButtonLink>
              <ButtonLink href="/products" size="lg" variant="secondary">
                {hero.secondaryLabel ?? 'Explore products'}
              </ButtonLink>
            </div>
          </div>

          <HeroShowcase
            slides={slides}
            className="mx-auto w-full max-w-[42rem] min-w-0 lg:max-w-none"
          />
        </Container>

        {showStats && stats?.length ? (
          <Container>
            <dl className="grid grid-cols-2 border-t border-line md:grid-cols-4">
              {stats.map((s, i) => (
                <div
                  key={s.id ?? i}
                  className="flex flex-col gap-1 border-line py-7 pr-4 md:border-l md:pl-6 md:first:border-l-0 md:first:pl-0 max-md:[&:nth-child(even)]:pl-5 max-md:[&:nth-child(n+3)]:border-t max-md:[&:nth-child(odd)]:border-r"
                >
                  <dt className="order-2 text-sm text-muted">{s.label}</dt>
                  <dd className="order-1 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Container>
        ) : null}
      </section>
    </HeroRotationProvider>
  )
}

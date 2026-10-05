import { ArrowRight, BrandIcon, ButtonLink, Container } from '@/design-system'
import type { HomePage, SiteSetting } from '@/payload-types'

import { HeroCurrent } from './HeroCurrent'
import { RotatingWord } from './RotatingWord'

type Props = {
  hero: HomePage['hero']
  stats: SiteSetting['stats']
  /** Company numbers are only shown once they are real (unticked "samples" in the admin). */
  showStats: boolean
}

export const Hero = ({ hero, stats, showStats }: Props) => {
  const words = (hero.rotatingWords ?? []).map((w) => w.word).filter(Boolean)
  return (
    <section className="relative isolate overflow-hidden">
      {/* Atmosphere: a slow brand aurora behind the artwork */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] size-[46rem] animate-[aurora_18s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle,rgb(6_77_251/0.18),transparent_60%)] blur-3xl motion-reduce:animate-none" />
        <div className="absolute top-[30%] right-[25%] size-[30rem] animate-[aurora_22s_ease-in-out_infinite_reverse] rounded-full bg-[radial-gradient(circle,rgb(47_168_255/0.14),transparent_60%)] blur-3xl motion-reduce:animate-none" />
      </div>

      <Container className="grid items-center gap-12 pt-10 pb-16 md:pt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pt-16 lg:pb-24">
        <div className="animate-[hero-in_1s_cubic-bezier(0.22,1,0.36,1)_both]">
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

          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted">
            <span>Integrates with</span>
            <span className="flex items-center gap-1.5 font-medium text-fg/80">
              <BrandIcon name="whatsapp" colored className="size-[1.1rem]" /> WhatsApp
            </span>
            <span className="flex items-center gap-1.5 font-medium text-fg/80">
              <BrandIcon name="cloudflare" colored className="size-[1.1rem]" /> Cloudflare
            </span>
            <span className="font-medium text-fg/80">KRA eTIMS</span>
          </div>
        </div>

        <HeroCurrent className="mx-auto aspect-[5/4] w-full max-w-[40rem] lg:aspect-auto lg:h-full lg:min-h-[34rem] lg:max-w-none" />
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
  )
}

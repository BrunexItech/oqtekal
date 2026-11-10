import Image from 'next/image'

import { ArrowRight, ButtonLink, Container, ImageLoading } from '@/design-system'
import type { HomePage, SiteSetting } from '@/payload-types'

type Props = {
  hero: HomePage['hero']
  stats: SiteSetting['stats']
  /** Company numbers are only shown once they are real (unticked "samples" in the admin). */
  showStats: boolean
  /** Plain facts shown under the buttons, e.g. "10 products". */
  facts: string[]
}

/** Home hero: what we do, for whom, and how to start — beside one real photograph. */
export const Hero = ({ hero, stats, showStats, facts }: Props) => (
  <section className="border-b border-line">
    <Container className="grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-24">
      <div>
        <p className="text-label text-accent">
          {hero.eyebrow ?? 'Software engineering company · Nairobi'}
        </p>
        <h1 className="mt-5 max-w-[16ch] text-display-xl">{hero.heading}</h1>
        <p className="mt-6 max-w-[34rem] text-lead text-muted">{hero.text}</p>

        <div className="mt-9 flex flex-col gap-3 xs:flex-row">
          <ButtonLink href="/contact" size="lg" icon={<ArrowRight className="size-4" />}>
            {hero.primaryLabel ?? 'Start a project'}
          </ButtonLink>
          <ButtonLink href="/products" size="lg" variant="secondary">
            {hero.secondaryLabel ?? 'Explore products'}
          </ButtonLink>
        </div>

        {facts.length ? (
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            {facts.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span aria-hidden className="size-1.5 rounded-full bg-accent" />
                {f}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-panel)] bg-surface-2">
        <ImageLoading />
        <Image
          src="/images/code-macbook.jpg"
          alt="Source code open on a laptop"
          fill
          priority
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover"
        />
      </div>
    </Container>

    {showStats && stats?.length ? (
      <Container>
        <dl className="grid grid-cols-2 border-t border-line md:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.id ?? i} className="flex flex-col gap-1 py-7 pr-4">
              <dt className="order-2 text-sm text-muted">{s.label}</dt>
              <dd className="order-1 font-display text-3xl font-semibold tracking-tight">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    ) : null}
  </section>
)

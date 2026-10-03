import { ArrowRight, ButtonLink, Container, Tag } from '@/design-system'
import type { HomePage, SiteSetting } from '@/payload-types'

import { HeroVisual } from './HeroVisual'

/** Splits off the final punctuation so it can be accented: "…business." → ["…business", "."] */
const splitEnd = (text: string): [string, string] => {
  const m = text.match(/^(.*?)([.!?])$/s)
  return m ? [m[1] ?? text, m[2] ?? ''] : [text, '']
}

export const Hero = ({ hero, stats }: { hero: HomePage['hero']; stats: SiteSetting['stats'] }) => {
  const [heading, end] = splitEnd(hero.heading)
  return (
    <section className="relative isolate overflow-hidden">
      {/* Background: faint engineering grid, fading out */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 grid-lines [mask-image:radial-gradient(ellipse_70%_60%_at_70%_35%,black,transparent_75%)]"
      />
      <div
        aria-hidden
        className="absolute top-[-10%] -right-[20%] -z-10 size-[60rem] rounded-full bg-[radial-gradient(circle,rgb(6_77_251/0.10),transparent_62%)] dark:bg-[radial-gradient(circle,rgb(77_134_255/0.14),transparent_62%)]"
      />

      <Container className="grid items-center gap-10 pt-10 pb-16 md:pt-16 lg:grid-cols-12 lg:gap-6 lg:pt-20 lg:pb-24">
        <div className="lg:col-span-7">
          <Tag className="gap-2 py-1.5 pr-3 pl-2 text-[0.8rem]">
            <span
              className="size-2 animate-[pulse-dot_2s_infinite] rounded-full bg-success"
              aria-hidden
            />
            {hero.eyebrow ?? 'Software engineering company · Nairobi'}
          </Tag>
          <h1 className="mt-7 max-w-[13ch] text-display-xl">
            {heading}
            <span className="text-accent">{end}</span>
          </h1>
          <p className="mt-7 max-w-[38rem] text-lead text-muted">{hero.text}</p>
          <div className="mt-9 flex flex-col gap-3 xs:flex-row">
            <ButtonLink href="/contact" size="lg" icon={<ArrowRight className="size-4" />}>
              {hero.primaryLabel ?? 'Start a project'}
            </ButtonLink>
            <ButtonLink href="/products" size="lg" variant="secondary">
              {hero.secondaryLabel ?? 'Explore products'}
            </ButtonLink>
          </div>
        </div>

        <div className="mx-auto -my-6 w-full max-w-[17rem] sm:my-0 sm:max-w-sm lg:col-span-5 lg:max-w-none">
          <HeroVisual />
        </div>
      </Container>

      {stats?.length ? (
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

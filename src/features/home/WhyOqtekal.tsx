import { Container, Reveal } from '@/design-system'
import { Symbol } from '@/features/brand'
import type { HomePage } from '@/payload-types'

type Props = {
  intro: HomePage['whyIntro']
  reasons: NonNullable<HomePage['reasons']>
}

/** The short, provable case for choosing Oqtekal. */
export const WhyOqtekal = ({ intro, reasons }: Props) => (
  <section className="relative isolate overflow-hidden bg-ink py-20 text-paper md:py-28">
    <Symbol className="absolute -right-[10%] -bottom-[30%] -z-10 size-[min(70vw,46rem)] text-brand-600/15" />
    <div
      aria-hidden
      className="absolute inset-0 -z-10 bg-[radial-gradient(rgb(255_255_255/0.06)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)] [background-size:22px_22px]"
    />
    <Container className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
      <div>
        {intro?.eyebrow ? <p className="text-label text-brand-400">{intro.eyebrow}</p> : null}
        <h2 className="mt-5 text-h1">{intro?.heading ?? 'Why Oqtekal'}</h2>
        {intro?.text ? <p className="mt-5 max-w-md text-lg text-paper/70">{intro.text}</p> : null}
      </div>
      <ul className="grid gap-px overflow-hidden rounded-[var(--radius-panel)] border border-white/10 bg-white/10 sm:grid-cols-2">
        {reasons.map((r, i) => (
          <li key={r.id ?? r.title} className="bg-ink p-7 md:p-8">
            <Reveal delay={i * 0.06}>
              <span
                aria-hidden
                className="block h-px w-10 bg-gradient-to-r from-brand-400 to-transparent"
              />
              <h3 className="mt-6 font-display text-xl font-semibold tracking-tight">{r.title}</h3>
              <p className="mt-2.5 text-paper/65">{r.text}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </Container>
  </section>
)

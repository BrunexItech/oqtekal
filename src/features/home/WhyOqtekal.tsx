import type { HomePage } from '@/payload-types'

type Props = {
  intro: HomePage['whyIntro']
  reasons: NonNullable<HomePage['reasons']>
}

/** The short, provable case for choosing Oqtekal. */
export const WhyOqtekal = ({ intro, reasons }: Props) => (
  <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
    <div>
      {intro?.eyebrow ? <p className="text-label text-accent">{intro.eyebrow}</p> : null}
      <h2 className="mt-4 text-h1">{intro?.heading ?? 'Why Oqtekal'}</h2>
      {intro?.text ? <p className="mt-5 max-w-md text-lg text-muted">{intro.text}</p> : null}
    </div>
    <ul className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
      {reasons.map((r) => (
        <li key={r.id ?? r.title} className="border-t border-line pt-6">
          <h3 className="font-display text-lg font-semibold tracking-tight">{r.title}</h3>
          <p className="mt-2 text-muted">{r.text}</p>
        </li>
      ))}
    </ul>
  </div>
)

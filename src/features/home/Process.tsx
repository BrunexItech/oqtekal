import { Reveal } from '@/design-system'
import type { HomePage } from '@/payload-types'

/** Delivery steps along a horizontal timeline (vertical on phones). */
export const Process = ({ steps }: { steps: NonNullable<HomePage['process']> }) => (
  <ol className="relative grid gap-0 md:grid-cols-5 md:gap-6">
    <span
      aria-hidden
      className="absolute top-2 bottom-2 left-[1.15rem] w-px bg-line-strong md:inset-x-0 md:top-[1.15rem] md:bottom-auto md:h-px md:w-auto"
    />
    {steps.map((s, i) => (
      <li key={s.id ?? i} className="relative pb-10 pl-14 md:pt-14 md:pb-0 md:pl-0">
        <span className="absolute top-0 left-0 grid size-[2.3rem] place-items-center rounded-full border border-line-strong bg-bg font-mono text-xs text-accent">
          {String(i + 1).padStart(2, '0')}
        </span>
        <Reveal delay={i * 0.08}>
          <h3 className="font-display text-xl font-semibold tracking-tight">{s.title}</h3>
          {s.duration ? <p className="mt-2 text-label text-subtle">{s.duration}</p> : null}
          <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{s.text}</p>
        </Reveal>
      </li>
    ))}
  </ol>
)

import type { HomePage } from '@/payload-types'

/** How a project runs, as numbered steps. */
export const Process = ({ steps }: { steps: NonNullable<HomePage['process']> }) => (
  <ol className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
    {steps.map((s, i) => (
      <li key={s.id ?? s.title} className="flex flex-col bg-surface p-6">
        <span className="text-sm font-medium text-accent">{String(i + 1).padStart(2, '0')}</span>
        <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">{s.title}</h3>
        <p className="mt-2 text-[0.95rem] text-muted">{s.text}</p>
        {s.duration ? <p className="mt-auto pt-5 text-sm text-subtle">{s.duration}</p> : null}
      </li>
    ))}
  </ol>
)

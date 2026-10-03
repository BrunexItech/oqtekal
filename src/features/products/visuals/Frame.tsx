import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

/**
 * App-window frame for product illustrations. Everything inside is sized in `em`,
 * and the root font-size follows the container width (cqw), so the whole mock-up
 * scales like an image at any screen size while staying crisp vector UI.
 */
export const Frame = ({
  title,
  nav,
  active = 0,
  accent = '#064DFB',
  children,
  className,
}: {
  title: string
  nav: string[]
  active?: number
  accent?: string
  children: ReactNode
  className?: string
}) => (
  <div className={cn('@container w-full', className)}>
    <div
      className="flex aspect-[16/10] w-full flex-col overflow-hidden rounded-[0.9em] border border-line bg-surface text-fg shadow-[var(--shadow-float)] select-none"
      style={{ fontSize: '1.55cqw' }}
      aria-hidden
      data-decorative
    >
      <div className="flex h-[2.4em] shrink-0 items-center gap-[0.45em] border-b border-line bg-surface-2/70 px-[0.9em]">
        <span className="size-[0.62em] rounded-full bg-[#ff5f57]" />
        <span className="size-[0.62em] rounded-full bg-[#febc2e]" />
        <span className="size-[0.62em] rounded-full bg-[#28c840]" />
        <span className="ml-[1em] flex h-[1.5em] flex-1 items-center rounded-[0.5em] bg-surface px-[0.8em] text-[0.68em] text-subtle">
          {title}
        </span>
      </div>
      <div className="flex min-h-0 flex-1">
        <aside className="flex w-[11em] shrink-0 flex-col gap-[0.3em] border-r border-line p-[0.8em]">
          <div className="mb-[0.6em] flex items-center gap-[0.5em] px-[0.4em]">
            <span className="size-[1.3em] rounded-[0.35em]" style={{ background: accent }} />
            <span className="h-[0.5em] w-[4.5em] rounded-full bg-fg/80" />
          </div>
          {nav.map((label, i) => (
            <div
              key={label}
              className={cn(
                'flex items-center gap-[0.55em] rounded-[0.45em] px-[0.6em] py-[0.42em] text-[0.72em]',
                i === active ? 'bg-accent-soft font-medium text-accent' : 'text-muted',
              )}
            >
              <span
                className={cn(
                  'size-[0.85em] rounded-[0.25em]',
                  i === active ? 'bg-accent' : 'bg-line-strong',
                )}
              />
              {label}
            </div>
          ))}
        </aside>
        <div className="min-w-0 flex-1 overflow-hidden bg-bg/40 p-[1.1em]">{children}</div>
      </div>
    </div>
  </div>
)

export const Kpi = ({
  label,
  value,
  delta,
  tone = 'up',
}: {
  label: string
  value: string
  delta?: string
  tone?: 'up' | 'down'
}) => (
  <div className="rounded-[0.7em] border border-line bg-surface p-[0.8em]">
    <p className="text-[0.62em] text-subtle">{label}</p>
    <p className="mt-[0.25em] font-display text-[1.25em] font-semibold tracking-tight">{value}</p>
    {delta ? (
      <p
        className={cn(
          'mt-[0.2em] text-[0.6em] font-medium',
          tone === 'up' ? 'text-success' : 'text-danger',
        )}
      >
        {delta}
      </p>
    ) : null}
  </div>
)

export const Pill = ({
  children,
  tone = 'neutral',
}: {
  children: ReactNode
  tone?: 'neutral' | 'ok' | 'warn' | 'bad' | 'accent'
}) => (
  <span
    className={cn(
      'inline-flex items-center rounded-full px-[0.6em] py-[0.15em] text-[0.58em] font-medium whitespace-nowrap',
      tone === 'neutral' && 'bg-surface-2 text-muted',
      tone === 'ok' && 'bg-success/12 text-success',
      tone === 'warn' && 'bg-[#f5a524]/15 text-[#b97300] dark:text-[#f5b84a]',
      tone === 'bad' && 'bg-danger/12 text-danger',
      tone === 'accent' && 'bg-accent-soft text-accent',
    )}
  >
    {children}
  </span>
)

/** Simple area/line chart from 0–100 values. */
export const Spark = ({
  values,
  className,
  color = 'var(--accent)',
}: {
  values: number[]
  className?: string
  color?: string
}) => {
  const w = 100
  const h = 40
  const step = w / (values.length - 1)
  const pts = values.map((v, i) => `${(i * step).toFixed(1)},${(h - (v / 100) * h).toFixed(1)}`)
  const id = `g${values.join('').slice(0, 12)}`
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className={cn('h-full w-full', className)}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.25" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,${h} ${pts.join(' ')} ${w},${h}`} fill={`url(#${id})`} />
      <polyline
        points={pts.join(' ')}
        fill="none"
        stroke={color}
        strokeWidth="1.2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

export const Bars = ({ values, className }: { values: number[]; className?: string }) => (
  <div className={cn('flex h-full items-end gap-[0.35em]', className)}>
    {values.map((v, i) => (
      <div
        key={i}
        className="flex-1 rounded-t-[0.25em] bg-accent/80"
        style={{ height: `${v}%`, opacity: 0.45 + (v / 100) * 0.55 }}
      />
    ))}
  </div>
)

export const Avatar = ({ initials, hue = 220 }: { initials: string; hue?: number }) => (
  <span
    className="grid size-[1.9em] shrink-0 place-items-center rounded-full text-[0.62em] font-semibold text-white"
    style={{ background: `hsl(${hue} 70% 48%)` }}
  >
    {initials}
  </span>
)

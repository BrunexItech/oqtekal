import Link from 'next/link'
import type { ReactNode } from 'react'

import { ArrowUpRight, Check } from '@/design-system'
import type { PillarWithServices } from '@/features/services'
import { cn } from '@/lib/cn'

/* Mini visuals: small, crisp illustrations of each capability (decorative). */

const MODULES = [
  'Finance',
  'Invoicing',
  'Inventory',
  'HR & payroll',
  'School fees',
  'Exams',
  'Rent',
  'Maintenance',
  'Fixtures',
  'Tickets',
]

const SystemsVisual = () => (
  <div aria-hidden className="grid grid-cols-3 gap-2">
    <ul className="col-span-3 mb-3 flex flex-wrap gap-1.5">
      {MODULES.map((m) => (
        <li
          key={m}
          className="rounded-full border border-white/12 bg-white/[0.05] px-3 py-1 text-xs text-paper/75"
        >
          {m}
        </li>
      ))}
    </ul>
    {[
      ['Fees collected', '82%'],
      ['Occupancy', '91%'],
      ['Stock value', 'KES 6.2M'],
    ].map(([k, v]) => (
      <div key={k} className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
        <p className="text-[0.65rem] text-paper/50">{k}</p>
        <p className="mt-1 font-display text-lg font-semibold">{v}</p>
      </div>
    ))}
    <div className="col-span-3 flex h-20 items-end gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] p-3">
      {[30, 46, 38, 60, 52, 74, 66, 88, 80, 96].map((h, i) => (
        <span
          key={i}
          className="flex-1 rounded-t bg-gradient-to-t from-brand-600 to-brand-400"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  </div>
)

const PaymentsVisual = () => (
  <div aria-hidden className="space-y-2">
    {[
      ['KES 7,850', 'STK Push · Order #5512'],
      ['KES 45,000', 'Paybill · Unit A3'],
      ['KES 1,200', 'B2C · Refund #318'],
    ].map(([a, d], i) => (
      <div
        key={a}
        className="flex items-center justify-between rounded-xl border border-line bg-surface px-3 py-2.5 shadow-[var(--shadow-card)]"
        style={{ marginLeft: `${i * 6}%`, marginRight: `${(2 - i) * 6}%` }}
      >
        <div>
          <p className="text-sm font-semibold">{a}</p>
          <p className="text-[0.7rem] text-muted">{d}</p>
        </div>
        <span className="flex items-center gap-1 text-[0.7rem] font-medium text-success">
          <Check className="size-3.5" /> Matched
        </span>
      </div>
    ))}
  </div>
)

const AppsVisual = () => (
  <div aria-hidden className="flex items-end justify-center gap-3">
    <div className="h-36 w-20 rounded-[1.1rem] border-[3px] border-fg/80 bg-surface p-1.5">
      <div className="h-full rounded-[0.7rem] bg-gradient-to-b from-brand-500 to-brand-700 p-2">
        <div className="h-1.5 w-8 rounded-full bg-white/60" />
        <div className="mt-2 space-y-1">
          <div className="h-5 rounded-md bg-white/90" />
          <div className="h-5 rounded-md bg-white/70" />
          <div className="h-5 rounded-md bg-white/50" />
        </div>
      </div>
    </div>
    <div className="h-24 w-36 rounded-lg border border-line bg-surface p-1.5 shadow-[var(--shadow-card)]">
      <div className="flex gap-1">
        <span className="size-1.5 rounded-full bg-[#ff5f57]" />
        <span className="size-1.5 rounded-full bg-[#febc2e]" />
        <span className="size-1.5 rounded-full bg-[#28c840]" />
      </div>
      <div className="mt-2 grid grid-cols-3 gap-1">
        <div className="col-span-2 h-12 rounded bg-accent-soft" />
        <div className="h-12 rounded bg-surface-2" />
      </div>
    </div>
  </div>
)

const CloudVisual = () => (
  <div aria-hidden className="space-y-3">
    <div className="flex items-end justify-between">
      <div>
        <p className="text-[0.7rem] text-muted">Uptime · 90 days</p>
        <p className="font-display text-2xl font-semibold tracking-tight">99.98%</p>
      </div>
      <span className="flex items-center gap-1.5 rounded-full bg-success/12 px-2 py-0.5 text-[0.7rem] font-medium text-success">
        <span className="size-1.5 rounded-full bg-success" /> All systems normal
      </span>
    </div>
    <div className="flex gap-[3px]">
      {Array.from({ length: 45 }, (_, i) => (
        <span
          key={i}
          className={cn('h-7 flex-1 rounded-sm', i === 31 ? 'bg-[#f5a524]' : 'bg-success/70')}
        />
      ))}
    </div>
  </div>
)

type Tile = {
  slug: string
  title: string
  blurb: string
  visual: ReactNode
  className: string
  dark?: boolean
}

const TILES: Tile[] = [
  {
    slug: 'business-systems',
    title: 'Business systems',
    blurb: 'ERP, school, property and sports systems — proven products, adapted to how you work.',
    visual: <SystemsVisual />,
    className: 'lg:col-span-7 lg:row-span-2',
    dark: true,
  },
  {
    slug: 'payments-and-integrations',
    title: 'M-Pesa & payments',
    blurb: 'STK Push, Paybill, payouts and reconciliation that never loses a shilling.',
    visual: <PaymentsVisual />,
    className: 'lg:col-span-5',
  },
  {
    slug: 'mobile-and-product',
    title: 'Web & mobile apps',
    blurb: 'Fast, beautiful apps for the phones your customers actually use.',
    visual: <AppsVisual />,
    className: 'lg:col-span-5',
  },
  {
    slug: 'cloud-and-hosting',
    title: 'Cloud & managed hosting',
    blurb: 'We run what we build: monitored, backed up and secured around the clock.',
    visual: <CloudVisual />,
    className: 'lg:col-span-12',
  },
]

/** Four flagship capabilities, then every other discipline one click away. */
export const Capabilities = ({ pillars }: { pillars: PillarWithServices[] }) => {
  const featured = new Set(TILES.map((t) => t.slug))
  const others = pillars.filter((p) => !featured.has(p.slug))

  return (
    <div>
      <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">
        {TILES.map((t) => {
          const pillar = pillars.find((p) => p.slug === t.slug)
          const count = pillar?.serviceList.length ?? 0
          return (
            <Link
              key={t.slug}
              href={`/services/${t.slug}`}
              className={cn(
                'group relative isolate flex flex-col justify-between gap-8 overflow-hidden rounded-[var(--radius-panel)] border p-6 transition-[transform,box-shadow,border-color] duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-[var(--shadow-float)] sm:p-8',
                t.dark
                  ? 'border-transparent bg-ink text-paper'
                  : 'border-line bg-surface hover:border-line-strong',
                t.slug === 'cloud-and-hosting' && 'lg:flex-row lg:items-center',
                t.className,
              )}
            >
              {t.dark ? (
                <div
                  aria-hidden
                  className="absolute -top-1/3 -right-1/4 -z-10 size-[36rem] rounded-full bg-[radial-gradient(circle,rgb(6_77_251/0.45),transparent_60%)] blur-2xl transition-transform duration-1000 group-hover:scale-110"
                />
              ) : null}
              <div className={cn(t.slug === 'cloud-and-hosting' && 'lg:max-w-md')}>
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
                    {t.title}
                  </h3>
                  <ArrowUpRight className="size-5 shrink-0 opacity-50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                </div>
                <p className={cn('mt-3 max-w-md', t.dark ? 'text-paper/70' : 'text-muted')}>
                  {t.blurb}
                </p>
                {count ? (
                  <p className={cn('mt-4 text-sm', t.dark ? 'text-brand-400' : 'text-accent')}>
                    {count} services →
                  </p>
                ) : null}
              </div>
              <div
                className={cn(
                  t.slug === 'cloud-and-hosting' ? 'w-full lg:max-w-xl' : '',
                  t.dark && 'lg:mt-8',
                )}
              >
                {t.visual}
              </div>
            </Link>
          )
        })}
      </div>

      {others.length ? (
        <div className="mt-8 flex flex-col gap-4 rounded-[var(--radius-panel)] border border-dashed border-line-strong p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <p className="font-medium">
            Also: <span className="text-muted">the full software lifecycle.</span>
          </p>
          <ul className="flex flex-wrap gap-2">
            {others.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/services/${p.slug}`}
                  className="inline-flex h-10 items-center rounded-full border border-line-strong bg-surface px-4 text-sm font-medium transition-colors hover:border-fg"
                >
                  {p.title}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/services"
                className="inline-flex h-10 items-center gap-1.5 rounded-full bg-fg px-4 text-sm font-medium text-bg"
              >
                All services <ArrowUpRight className="size-4" />
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  )
}

'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Image from 'next/image'
import { useEffect, useState, type ReactNode } from 'react'

import { BrandIcon, Check } from '@/design-system'
import { Symbol } from '@/features/brand'
import { cn } from '@/lib/cn'

/* --------------------------------------------------------------------------------------------
 * "What we do", shown rather than told: a payment arriving and reconciling, a customer
 * conversation, a business metric and a production deploy — all wired to one Oqtekal core.
 * Purely decorative (aria-hidden); the hero text carries the meaning for assistive tech.
 * ------------------------------------------------------------------------------------------ */

const EASE = [0.22, 1, 0.36, 1] as const

const PAYMENTS = [
  { amount: 'KES 7,850', ref: 'Order #5512', from: 'Savanna Foods' },
  { amount: 'KES 45,000', ref: 'Rent · Unit A3', from: 'Riverside Apts' },
  { amount: 'KES 18,200', ref: 'Fees · ADM 1043', from: 'Kiambu High' },
  { amount: 'KES 2,500', ref: 'Till 889201', from: 'Duka Express' },
]

const CHATS = [
  {
    name: 'Amina W.',
    q: 'Is my order ready for pickup?',
    a: 'Yes — collect from 2pm at Westlands.',
  },
  { name: 'Brian O.', q: 'Can I pay rent via M-Pesa?', a: 'Paybill 522522, account A3. Done!' },
  { name: 'Faith M.', q: 'Has my child’s fee cleared?', a: 'Received KES 18,200. Balance: 0.' },
]

/** Cycles an index every `ms` (paused for reduced motion). */
const useTicker = (length: number, ms: number) => {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => setI((v) => (v + 1) % length), ms)
    return () => clearInterval(t)
  }, [length, ms, reduce])
  return i
}

const Card = ({
  className,
  children,
  delay = 0,
}: {
  className?: string
  children: ReactNode
  delay?: number
}) => {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 18, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      className={cn(
        'rounded-[1.1em] border border-line/80 bg-surface/90 p-[0.95em] shadow-[0_1.4em_3em_-1.6em_rgb(11_15_25/0.35)] backdrop-blur-xl dark:border-white/10 dark:bg-surface/80',
        className,
      )}
    >
      {children}
    </motion.div>
  )
}

const Label = ({ children }: { children: ReactNode }) => (
  <p className="font-mono text-[0.62em] tracking-[0.12em] text-subtle uppercase">{children}</p>
)

/* ---- the four moments -------------------------------------------------------------------- */

const PaymentCard = ({ delay }: { delay: number }) => {
  const i = useTicker(PAYMENTS.length, 3400)
  const p = PAYMENTS[i]!
  return (
    <Card delay={delay}>
      <div className="flex items-center justify-between gap-[0.6em]">
        <Image
          src="/brand/partners/mpesa.png"
          alt=""
          width={640}
          height={234}
          className="h-[1.35em] w-auto"
        />
        <span className="flex items-center gap-[0.35em] rounded-full bg-success/12 px-[0.6em] py-[0.2em] text-[0.62em] font-medium text-success">
          <span className="size-[0.45em] animate-[pulse-dot_2s_infinite] rounded-full bg-success" />
          Live
        </span>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="mt-[0.7em]"
        >
          <p className="font-display text-[1.45em] leading-none font-semibold tracking-tight">
            {p.amount}
          </p>
          <p className="mt-[0.35em] text-[0.7em] text-muted">
            {p.from} · {p.ref}
          </p>
          <p className="mt-[0.55em] flex items-center gap-[0.35em] text-[0.68em] font-medium text-success">
            <Check className="size-[1.1em]" /> Reconciled automatically
          </p>
        </motion.div>
      </AnimatePresence>
    </Card>
  )
}

const ChatCard = ({ delay }: { delay: number }) => {
  const i = useTicker(CHATS.length * 2, 2600)
  const chat = CHATS[Math.floor(i / 2)]!
  const answered = i % 2 === 1
  return (
    <Card delay={delay}>
      <div className="flex items-center gap-[0.55em]">
        <span className="grid size-[2em] place-items-center rounded-full bg-[#25D366] text-white">
          <BrandIcon name="whatsapp" className="size-[1.15em]" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-[0.78em] font-semibold">{chat.name}</p>
          <p className="text-[0.62em] text-subtle">WhatsApp · shared inbox</p>
        </div>
      </div>
      <div className="mt-[0.7em] flex min-h-[4.6em] flex-col justify-end gap-[0.4em]">
        <motion.p
          key={`q${chat.name}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-[90%] self-start rounded-[0.8em] rounded-bl-[0.25em] bg-surface-2 px-[0.75em] py-[0.45em] text-[0.7em]"
        >
          {chat.q}
        </motion.p>
        <AnimatePresence>
          {answered ? (
            <motion.p
              key={`a${chat.name}`}
              initial={{ opacity: 0, y: 6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="max-w-[90%] self-end rounded-[0.8em] rounded-br-[0.25em] bg-brand-600 px-[0.75em] py-[0.45em] text-[0.7em] text-white"
            >
              {chat.a}
            </motion.p>
          ) : (
            <span className="flex gap-[0.25em] self-end rounded-full bg-surface-2 px-[0.7em] py-[0.55em]">
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  className="size-[0.4em] animate-[typing_1.2s_ease-in-out_infinite] rounded-full bg-subtle"
                  style={{ animationDelay: `${d * 0.15}s` }}
                />
              ))}
            </span>
          )}
        </AnimatePresence>
      </div>
    </Card>
  )
}

const MetricCard = ({ delay }: { delay: number }) => {
  const reduce = useReducedMotion()
  const points = [18, 26, 22, 34, 31, 42, 39, 52, 49, 61, 58, 72]
  const w = 100
  const h = 36
  const d = points
    .map(
      (v, k) =>
        `${k === 0 ? 'M' : 'L'}${((k / (points.length - 1)) * w).toFixed(1)} ${(h - (v / 80) * h).toFixed(1)}`,
    )
    .join(' ')
  return (
    <Card delay={delay}>
      <Label>Revenue · this month</Label>
      <div className="mt-[0.4em] flex items-baseline gap-[0.5em]">
        <p className="font-display text-[1.45em] leading-none font-semibold tracking-tight">
          KES 4.2M
        </p>
        <span className="text-[0.66em] font-medium text-success">▲ 18.4%</span>
      </div>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="mt-[0.6em] h-[3.2em] w-full overflow-visible"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="hero-metric" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--brand-500)" stopOpacity="0.28" />
            <stop offset="1" stopColor="var(--brand-500)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d={`${d} L${w} ${h} L0 ${h} Z`}
          fill="url(#hero-metric)"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: delay + 0.6 }}
        />
        <motion.path
          d={d}
          fill="none"
          stroke="var(--brand-500)"
          strokeWidth="1.6"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, ease: EASE, delay: delay + 0.3 }}
        />
      </svg>
      <p className="mt-[0.4em] text-[0.62em] text-subtle">ERP · finance dashboard</p>
    </Card>
  )
}

const DEPLOY_STEPS = ['Build', 'Tests · 55 passed', 'Security scan', 'Live on cloud']

const DeployCard = ({ delay }: { delay: number }) => {
  const step = useTicker(DEPLOY_STEPS.length + 2, 1100)
  return (
    <Card delay={delay} className="border-white/10! bg-ink/95! text-paper dark:bg-[#05070d]/90!">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[0.64em] text-paper/60">$ oqtekal deploy --prod</p>
        <span className="font-mono text-[0.6em] text-paper/40">38s</span>
      </div>
      <ul className="mt-[0.6em] space-y-[0.35em] font-mono text-[0.68em]">
        {DEPLOY_STEPS.map((s, k) => {
          const done = k < step
          return (
            <li
              key={s}
              className={cn(
                'flex items-center gap-[0.5em] transition-colors duration-300',
                done ? 'text-paper' : 'text-paper/35',
              )}
            >
              <span
                className={cn(
                  'grid size-[1.15em] place-items-center rounded-full',
                  done ? 'bg-[#3fbf8f] text-ink' : 'border border-white/20',
                )}
              >
                {done ? <Check className="size-[0.8em]" strokeWidth={3} /> : null}
              </span>
              {s}
            </li>
          )
        })}
      </ul>
      <p className="mt-[0.7em] flex items-center gap-[0.4em] text-[0.62em] text-paper/60">
        <span className="size-[0.45em] rounded-full bg-[#3fbf8f]" /> 99.98% uptime · Nairobi edge
      </p>
    </Card>
  )
}

/* ---- connectors -------------------------------------------------------------------------- */

const LINKS = [
  'M50 50 C 40 50, 34 30, 27 27',
  'M50 50 C 60 48, 66 26, 74 22',
  'M50 50 C 41 54, 36 72, 26 76',
  'M50 50 C 60 54, 64 74, 74 79',
]

const Connectors = () => (
  <svg
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
    className="pointer-events-none absolute inset-0 size-full"
  >
    <defs>
      <linearGradient id="hero-beam" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#2FA8FF" stopOpacity="0" />
        <stop offset="0.5" stopColor="#2FA8FF" />
        <stop offset="1" stopColor="#064DFB" stopOpacity="0" />
      </linearGradient>
    </defs>
    {LINKS.map((d, k) => (
      <g key={d}>
        <path
          d={d}
          fill="none"
          stroke="var(--line-strong)"
          strokeWidth="1"
          strokeDasharray="2 3"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d={d}
          fill="none"
          stroke="url(#hero-beam)"
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          pathLength={100}
          strokeDasharray="14 86"
          className="animate-[beam_3.2s_linear_infinite] motion-reduce:hidden"
          style={{ animationDelay: `${k * 0.8}s` }}
        />
      </g>
    ))}
  </svg>
)

const Core = () => (
  <div className="absolute top-1/2 left-1/2 grid size-[22%] -translate-x-1/2 -translate-y-1/2 place-items-center">
    <span className="absolute inset-[-28%] animate-[spin_18s_linear_infinite] rounded-full border border-dashed border-accent/30 motion-reduce:animate-none" />
    <span className="absolute inset-[-8%] animate-[core-pulse_3.2s_ease-out_infinite] rounded-full bg-brand-500/20 motion-reduce:animate-none" />
    <span className="relative grid size-full place-items-center rounded-[1.6em] border border-white/60 bg-gradient-to-br from-white to-brand-50 shadow-[0_1.5em_3.5em_-1em_rgb(6_77_251/0.55)] dark:border-white/10 dark:from-[#16203a] dark:to-[#0d1426]">
      <Symbol gradient className="size-[62%]" />
    </span>
  </div>
)

/* ---- layout ------------------------------------------------------------------------------ */

export const HeroSystem = ({ className }: { className?: string }) => (
  <div aria-hidden data-decorative className={cn('relative', className)}>
    {/* Tablet & desktop: the connected canvas. Sizes are in em, scaled to the container. */}
    <div className="@container hidden md:block">
      <div className="relative aspect-[1/0.92] w-full" style={{ fontSize: 'max(12px, 2.7cqw)' }}>
        <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgb(6_77_251/0.16),transparent_65%)] blur-2xl" />
        <Connectors />
        <Core />
        <div className="absolute top-[4%] left-0 w-[44%]">
          <ChatCard delay={0.5} />
        </div>
        <div className="absolute top-0 right-0 w-[42%]">
          <PaymentCard delay={0.35} />
        </div>
        <div className="absolute bottom-[2%] left-[1%] w-[43%]">
          <MetricCard delay={0.65} />
        </div>
        <div className="absolute right-0 bottom-[6%] w-[44%]">
          <DeployCard delay={0.8} />
        </div>
      </div>
    </div>

    {/* Phones: the same moments as a tidy two-column grid. */}
    <div className="grid grid-cols-2 gap-3 text-[13px] md:hidden">
      <PaymentCard delay={0.2} />
      <DeployCard delay={0.3} />
      <div className="col-span-2">
        <ChatCard delay={0.4} />
      </div>
    </div>
  </div>
)

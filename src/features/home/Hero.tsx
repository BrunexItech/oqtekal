import Image from 'next/image'

import {
  ArrowRight,
  ButtonLink,
  Clock,
  Cloud,
  Code,
  Container,
  ImageLoading,
  ShieldCheck,
} from '@/design-system'
import { asMedia } from '@/lib/media'
import type { Client, HomePage, SiteSetting } from '@/payload-types'

import { RotatingWord } from './RotatingWord'

type Props = {
  hero: HomePage['hero']
  stats: SiteSetting['stats']
  /** Company numbers are only shown once they are real (unticked "samples" in the admin). */
  showStats: boolean
  /** Real client logos (samples filtered out); the "Trusted by" row only appears when there are some. */
  clients: Client[]
}

const PROMISES = [
  { icon: Code, title: 'Expert', text: 'development' },
  { icon: Cloud, title: 'Scalable', text: 'cloud solutions' },
  { icon: ShieldCheck, title: 'Enterprise-grade', text: 'security' },
  { icon: Clock, title: 'On-time', text: 'delivery' },
] as const

/**
 * Home hero: a dark, full-screen stage — Nairobi at night, the Oqtekal ribbon floating above the
 * skyline — with the headline, two actions, a glass bar of promises and (once there are real
 * ones) client logos. Always dark, whatever the site theme; the header turns light-on-dark over it.
 */
export const Hero = ({ hero, stats, showStats, clients }: Props) => {
  const words = (hero.rotatingWords ?? []).map((w) => w.word).filter(Boolean)
  const logos = clients.flatMap((c) => {
    const logo = asMedia(c.logo)
    return logo?.url ? [{ id: c.id, name: c.name, logo }] : []
  })

  return (
    <section
      data-theme="dark"
      className="relative isolate -mt-[4.25rem] overflow-hidden bg-[#060914] text-fg md:-mt-[4.75rem]"
    >
      {/* Stage: photograph, shading for legibility, and the brand glow behind the ribbon. */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <ImageLoading tone="dark" />
        <Image
          src="/images/nairobi-night.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="animate-[slow-zoom_30s_ease-out_both] object-cover object-[60%_80%] brightness-[1.35] saturate-[1.15] motion-reduce:animate-none"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(6_9_20/0.8)_0%,rgb(6_9_20/0.2)_26%,transparent_55%,rgb(6_9_20/0.85)_88%,#060914_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(6_9_20/0.88)_0%,rgb(6_9_20/0.5)_38%,transparent_68%)]" />
        <div className="absolute top-[12%] right-[2%] size-[44rem] max-w-[90vw] rounded-full bg-[radial-gradient(circle,rgb(23_95_255/0.45),rgb(23_95_255/0.08)_45%,transparent_70%)] blur-2xl" />
      </div>

      <Container className="pt-[calc(4.25rem+2.5rem)] pb-14 md:pt-[calc(4.75rem+4rem)] md:pb-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-6">
          <div className="animate-[hero-in_1s_cubic-bezier(0.22,1,0.36,1)_both]">
            <p className="inline-flex items-center gap-2.5 rounded-full border border-accent/45 bg-white/[0.04] py-1.5 pr-4 pl-2 text-[0.82rem] text-fg/85 shadow-[0_0_24px_-6px_rgb(77_134_255/0.6)] backdrop-blur">
              <span className="grid size-5 place-items-center rounded-full bg-accent/20">
                <span className="size-2 animate-[pulse-dot_2s_infinite] rounded-full bg-accent" />
              </span>
              {hero.eyebrow ?? 'Innovative software solutions for a smarter tomorrow'}
            </p>

            <h1 className="mt-7 max-w-[15ch] text-display-xl [text-shadow:0_2px_30px_rgb(0_0_0/0.35)]">
              {hero.heading} {words.length ? <RotatingWord words={words} /> : null}
            </h1>

            <p className="mt-7 max-w-[34rem] text-lead text-fg/75">{hero.text}</p>

            <div className="mt-9 flex flex-col gap-3 xs:flex-row">
              <ButtonLink
                href="/contact"
                size="lg"
                icon={<ArrowRight className="size-4" />}
                className="shadow-[0_12px_40px_-10px_rgb(23_95_255/0.8)]"
              >
                {hero.primaryLabel ?? 'Start a project'}
              </ButtonLink>
              <ButtonLink
                href="/products"
                size="lg"
                variant="secondary"
                icon={<ArrowRight className="size-4" />}
                className="border-white/20! bg-white/[0.04]! backdrop-blur hover:border-white/45!"
              >
                {hero.secondaryLabel ?? 'Explore products'}
              </ButtonLink>
            </div>
          </div>

          {/* The ribbon, floating over the skyline. */}
          <div aria-hidden className="relative mx-auto w-[82%] max-w-[36rem] lg:w-full">
            <div className="animate-[ribbon-float_9s_ease-in-out_infinite] motion-reduce:animate-none">
              <Image
                src="/brand/oqtekal-ribbon.png"
                alt=""
                width={748}
                height={397}
                priority
                sizes="(min-width: 1024px) 36rem, 80vw"
                className="w-full drop-shadow-[0_30px_60px_rgb(6_40_160/0.65)]"
              />
            </div>
          </div>
        </div>

        {/* Promises: one glass bar. */}
        <ul className="mt-12 grid grid-cols-2 overflow-hidden rounded-[1.4rem] border border-white/12 bg-white/[0.05] backdrop-blur-xl md:mt-16 lg:mx-auto lg:max-w-5xl lg:grid-cols-4">
          {PROMISES.map(({ icon: Icon, title, text }, i) => (
            <li
              key={title}
              className={[
                'flex items-center gap-3.5 px-5 py-5 md:px-7',
                i % 2 === 1 ? 'border-l border-white/10' : '',
                i >= 2 ? 'border-t border-white/10 lg:border-t-0' : '',
                i === 2 ? 'lg:border-l' : '',
              ].join(' ')}
            >
              <Icon className="size-6 shrink-0 text-accent" />
              <span className="text-sm leading-snug text-fg/85">
                <span className="block font-medium text-fg">{title}</span>
                {text}
              </span>
            </li>
          ))}
        </ul>

        {logos.length ? (
          <div className="mt-12 text-center">
            <p className="text-label text-fg/55">Trusted by leading organisations</p>
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              {logos.map((c) => (
                <li key={c.id}>
                  <Image
                    src={c.logo.url!}
                    alt={c.name}
                    width={c.logo.width ?? 160}
                    height={c.logo.height ?? 48}
                    sizes="140px"
                    className="h-8 w-auto opacity-75 brightness-0 invert transition-opacity hover:opacity-100"
                  />
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {showStats && stats?.length ? (
          <dl className="mt-12 grid grid-cols-2 border-t border-white/10 md:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.id ?? i} className="flex flex-col gap-1 py-7 pr-4">
                <dt className="order-2 text-sm text-fg/65">{s.label}</dt>
                <dd className="order-1 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
      </Container>
    </section>
  )
}

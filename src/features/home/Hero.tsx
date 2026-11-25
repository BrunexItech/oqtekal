import Image from 'next/image'

import { ArrowRight, ButtonLink, Container } from '@/design-system'
import type { HomePage } from '@/payload-types'

import { RotatingWord } from './RotatingWord'

type Props = {
  hero: HomePage['hero']
}

/**
 * Home hero: a real data-centre photograph, dark and quiet on the left where the headline sits,
 * lit in brand violet and amber on the right — filling exactly one screen, so the headline and
 * both actions are visible the moment the page opens, nothing more to read.
 */
export const Hero = ({ hero }: Props) => {
  const words = (hero.rotatingWords ?? []).map((w) => w.word).filter(Boolean)
  return (
    <section className="relative isolate flex h-[calc(100svh-4.25rem)] items-center overflow-hidden md:h-[calc(100svh-4.75rem)]">
      <Image
        src="/images/hero-datacenter.jpg"
        alt="A data centre corridor lit in violet and amber"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgb(12_11_22/0.5)_0%,rgb(12_11_22/0.18)_38%,transparent_60%)]" />

      <Container className="relative">
        <div className="max-w-xl animate-[hero-in_1s_cubic-bezier(0.22,1,0.36,1)_both] text-paper">
          <h1 className="max-w-[15ch] text-display text-paper">
            {hero.heading} {words.length ? <RotatingWord words={words} /> : null}
          </h1>

          <div className="mt-8 flex flex-col gap-3 xs:flex-row">
            <ButtonLink href="/contact" size="lg" icon={<ArrowRight className="size-4" />}>
              {hero.primaryLabel ?? 'Start a project'}
            </ButtonLink>
            <ButtonLink
              href="/products"
              size="lg"
              variant="secondary"
              className="border-transparent! bg-white! text-ink! hover:bg-white/90!"
            >
              {hero.secondaryLabel ?? 'Explore products'}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  )
}

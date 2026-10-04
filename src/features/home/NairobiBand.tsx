import Image from 'next/image'

import { Container, ImageLoading } from '@/design-system'

/** Cinematic statement band: where we build, and the ambition. */
export const NairobiBand = () => (
  <section className="relative isolate overflow-hidden bg-ink text-paper">
    <ImageLoading tone="dark" className="-z-20" />
    <Image
      src="/images/nairobi-night.jpg"
      alt="Nairobi skyline at night"
      fill
      sizes="100vw"
      className="-z-20 object-cover object-[center_65%]"
    />
    <div
      aria-hidden
      className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(7_10_18/0.55)_0%,rgb(7_10_18/0.35)_40%,rgb(7_10_18/0.9)_100%)]"
    />
    <Container className="flex min-h-[min(64svh,36rem)] flex-col justify-end py-16 md:py-24">
      <p className="text-label text-brand-400">Nairobi · Kenya</p>
      <h2 className="mt-5 max-w-4xl text-display">
        Built in Nairobi.
        <br />
        <span className="text-paper/60">Engineered for Africa.</span>
      </h2>
      <div className="mt-10 grid max-w-4xl gap-6 border-t border-white/15 pt-8 text-paper/75 sm:grid-cols-3">
        <p>
          Software designed around how African businesses really work — mobile-first, M-Pesa-native.
        </p>
        <p>Hosted close to your customers, fast on mid-range phones and patchy networks.</p>
        <p>Supported by engineers in your time zone, reachable on WhatsApp.</p>
      </div>
    </Container>
  </section>
)

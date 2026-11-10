import { Container } from '@/design-system'
import { CurrentArt } from '@/features/brand'

/** Statement band on the brand artwork: where we build, and the ambition. */
export const NairobiBand = () => (
  <section className="relative isolate overflow-hidden bg-ink text-paper">
    <CurrentArt className="-z-20 object-[80%_center] lg:object-right" />
    <div
      aria-hidden
      className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgb(11_15_25/0.92)_0%,rgb(11_15_25/0.35)_55%,transparent_100%)]"
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

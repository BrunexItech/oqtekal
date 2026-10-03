import { ArrowRight, ButtonLink, Container } from '@/design-system'
import { Symbol } from '@/features/brand'

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden">
      <Container className="grid min-h-[70svh] items-center gap-10 py-20 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="text-label text-accent">Error 404</p>
          <h1 className="mt-5 text-display">This page does not exist.</h1>
          <p className="mt-6 max-w-xl text-lead text-muted">
            The link may be broken or the page may have moved. Let’s get you back on track.
          </p>
          <div className="mt-9 flex flex-col gap-3 xs:flex-row">
            <ButtonLink href="/" size="lg" icon={<ArrowRight className="size-4" />}>
              Back to home
            </ButtonLink>
            <ButtonLink href="/contact" size="lg" variant="secondary">
              Contact us
            </ButtonLink>
          </div>
        </div>
        <Symbol className="mx-auto hidden size-72 text-line md:block" />
      </Container>
    </section>
  )
}

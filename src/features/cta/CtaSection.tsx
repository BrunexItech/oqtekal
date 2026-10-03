import { BrandIcon, Container, Mail, Phone } from '@/design-system'
import { Symbol } from '@/features/brand'
import { ContactForm, type LeadType } from '@/features/contact'
import type { Settings } from '@/features/site'
import { whatsappLink } from '@/lib/site'

type Props = {
  settings: Settings
  eyebrow?: string | null
  heading?: string | null
  text?: string | null
  defaultType?: LeadType
  interest?: string
  submitLabel?: string
}

/** Closing call to action with an inline enquiry form. */
export const CtaSection = ({
  settings,
  eyebrow = 'Start a project',
  heading = 'Have something in mind? Let’s talk it through.',
  text = 'Tell us what you are trying to achieve. You will hear back from an engineer within one business day.',
  defaultType = 'project',
  interest,
  submitLabel,
}: Props) => (
  <section className="py-6 md:py-10" aria-labelledby="cta-heading">
    <Container>
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-ink px-5 py-12 text-paper sm:px-10 md:rounded-[2.5rem] md:px-14 md:py-16 lg:px-16 lg:py-20">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 grid-lines [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)] opacity-60 [--grid-line:rgb(255_255_255/0.05)]"
        />
        <Symbol className="absolute -top-24 -left-24 -z-10 size-[28rem] text-brand-600/15" />
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div className="flex flex-col">
            {eyebrow ? <p className="text-label text-brand-400">{eyebrow}</p> : null}
            <h2 id="cta-heading" className="mt-4 max-w-xl text-h1">
              {heading}
            </h2>
            {text ? <p className="mt-5 max-w-md text-lg text-paper/70">{text}</p> : null}
            <ul className="mt-10 space-y-4 text-paper/85 lg:mt-auto lg:pt-10">
              <li>
                <a
                  href={`mailto:${settings.email}`}
                  className="inline-flex items-center gap-3 hover:text-white"
                >
                  <span className="grid size-10 place-items-center rounded-full border border-white/15">
                    <Mail className="size-4" />
                  </span>
                  {settings.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${settings.phone.replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-3 hover:text-white"
                >
                  <span className="grid size-10 place-items-center rounded-full border border-white/15">
                    <Phone className="size-4" />
                  </span>
                  {settings.phone}
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink(
                    settings.whatsapp,
                    'Hello Oqtekal, I would like to talk about a project.',
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 hover:text-white"
                >
                  <span className="grid size-10 place-items-center rounded-full border border-white/15">
                    <BrandIcon name="whatsapp" className="size-4" />
                  </span>
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
          </div>
          {/* Light card so form fields keep full contrast */}
          <div className="rounded-[1.5rem] bg-bg p-5 text-fg sm:p-8">
            <ContactForm
              compact
              defaultType={defaultType}
              interest={interest}
              submitLabel={submitLabel}
            />
          </div>
        </div>
      </div>
    </Container>
  </section>
)

import Image from 'next/image'

import { ArrowRight, ButtonLink, Check, Container, ImageLoading } from '@/design-system'

const CAPABILITIES = [
  {
    title: 'LLM-powered support & chat',
    text: 'Assistants that answer from your own documents, with sources — handling routine questions and routing the rest to your team.',
  },
  {
    title: 'Workflow automation',
    text: 'Approvals, reminders and reconciliation that used to need a person now run on their own, with logs and alerts when something needs attention.',
  },
  {
    title: 'Document & data extraction',
    text: 'Invoices, forms and ID documents read automatically into your systems — far less manual typing.',
  },
  {
    title: 'Smarter dashboards',
    text: 'Plain-language summaries and anomaly alerts alongside the charts, so numbers are easier to act on.',
  },
]

/** Home-page showcase: AI and automation as a practical capability, not a gimmick. */
export const AiAutomation = () => (
  <section className="border-y border-line bg-surface-2/60">
    <Container className="grid items-center gap-14 py-20 md:py-28 lg:grid-cols-2 lg:gap-20">
      <div>
        <p className="text-label text-accent">AI & Automation</p>
        <h2 className="mt-5 text-h1">Software with intelligence built in.</h2>
        <p className="mt-5 max-w-lg text-lg text-muted">
          Every system we build can include AI where it genuinely helps — automating the repetitive
          parts of the work and giving your team clearer, faster answers. No hype, measured use,
          human review where it matters.
        </p>

        <ul className="mt-9 grid gap-6 sm:grid-cols-2">
          {CAPABILITIES.map((c) => (
            <li key={c.title} className="flex gap-3">
              <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                <Check className="size-3.5" strokeWidth={2.5} />
              </span>
              <span>
                <span className="block font-medium text-fg">{c.title}</span>
                <span className="mt-1 block text-sm text-muted">{c.text}</span>
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col gap-3 xs:flex-row">
          <ButtonLink
            href="/services/data-and-automation/ai-integration"
            size="lg"
            icon={<ArrowRight className="size-4" />}
          >
            How we use AI
          </ButtonLink>
          <ButtonLink href="/services/data-and-automation" size="lg" variant="secondary">
            Data & Automation services
          </ButtonLink>
        </div>
      </div>

      <div className="relative">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-panel)] shadow-[var(--shadow-float)]">
          <ImageLoading tone="dark" />
          <Image
            src="/images/monitoring.jpg"
            alt="A live analytics dashboard, the kind of data an AI assistant can summarise"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute -bottom-6 left-4 max-w-[85%] rounded-2xl border border-line bg-surface/95 px-5 py-4 shadow-[var(--shadow-float)] backdrop-blur sm:left-8">
          <p className="flex items-center gap-2 text-sm font-semibold">
            <span className="size-2 rounded-full bg-success" />
            Assistant summary
          </p>
          <p className="mt-1.5 text-sm text-muted">
            “Collections are 6% behind target this week — mostly one branch. Flagged for review.”
          </p>
        </div>
      </div>
    </Container>
  </section>
)

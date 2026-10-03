import type { Metadata } from 'next'

import { Check, Container, PageHeader, Section, SectionHeader } from '@/design-system'
import { getOpenJobs } from '@/features/careers'
import { ContactForm } from '@/features/contact'
import { breadcrumbJsonLd, buildMetadata, JsonLd } from '@/features/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Careers',
  description:
    'Build the software organisations run on. Open roles and internships at Oqtekal, Nairobi.',
  path: '/careers',
  eyebrow: 'Careers',
})

const PERKS = [
  'Real responsibility on systems people use every day',
  'Mentorship from senior engineers',
  'Hybrid work and flexible hours',
  'Learning budget for courses, books and conferences',
  'Modern tools and a calm, focused culture',
]

const JOB_TYPE: Record<string, string> = {
  'full-time': 'Full-time',
  contract: 'Contract',
  internship: 'Internship',
}

export default async function CareersPage() {
  const jobs = await getOpenJobs()
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Careers', path: '/careers' },
  ]
  return (
    <>
      <PageHeader
        crumbs={crumbs}
        eyebrow="Careers"
        title="Build the software organisations run on."
        lead="We are a small team that cares about craft, clarity and the people who use our software. If that sounds like you, we would like to hear from you."
      />

      <Section>
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div>
            <SectionHeader eyebrow="Why Oqtekal" heading="What you get" level="h2" />
            <ul className="mt-8 space-y-4">
              {PERKS.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <Check className="mt-1 size-4 shrink-0 text-accent" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-label text-muted">
              {jobs.length ? `${jobs.length} open roles` : 'Open roles'}
            </p>
            {jobs.length ? (
              <ul className="mt-6 space-y-4">
                {jobs.map((job) => (
                  <li key={job.id}>
                    <details className="group rounded-[var(--radius-card)] border border-line bg-surface [&_summary::-webkit-details-marker]:hidden">
                      <summary className="flex cursor-pointer list-none flex-col gap-2 p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
                        <span>
                          <span className="block font-display text-xl font-semibold tracking-tight group-hover:text-accent">
                            {job.title}
                          </span>
                          <span className="mt-1 block text-sm text-muted">
                            {job.location} · {JOB_TYPE[job.type] ?? job.type}
                          </span>
                        </span>
                        <span className="text-sm font-medium text-accent group-open:hidden">
                          View role →
                        </span>
                        <span className="hidden text-sm font-medium text-muted group-open:inline">
                          Close
                        </span>
                      </summary>
                      <div className="border-t border-line p-6 md:p-8">
                        <p className="text-muted">{job.summary}</p>
                        <div className="mt-6 grid gap-8 md:grid-cols-2">
                          {job.responsibilities?.length ? (
                            <div>
                              <h3 className="font-semibold">You will</h3>
                              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-muted">
                                {job.responsibilities.map((r) => (
                                  <li key={r.id ?? r.text}>{r.text}</li>
                                ))}
                              </ul>
                            </div>
                          ) : null}
                          {job.requirements?.length ? (
                            <div>
                              <h3 className="font-semibold">You have</h3>
                              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-muted">
                                {job.requirements.map((r) => (
                                  <li key={r.id ?? r.text}>{r.text}</li>
                                ))}
                              </ul>
                            </div>
                          ) : null}
                        </div>
                        <a
                          href="#apply"
                          className="mt-8 inline-flex font-medium text-accent hover:underline"
                        >
                          Apply for this role →
                        </a>
                      </div>
                    </details>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-6 rounded-[var(--radius-card)] border border-line bg-surface p-8 text-muted">
                No open roles right now — but we always read applications from great engineers and
                designers.
              </p>
            )}
          </div>
        </Container>
      </Section>

      <Section id="apply" tone="surface" className="scroll-mt-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <SectionHeader
            eyebrow="Apply"
            heading="Tell us about yourself."
            text="Mention the role, and share links to your work: GitHub, portfolio or projects you are proud of."
            level="h2"
          />
          <div className="rounded-[var(--radius-panel)] border border-line bg-bg p-6 sm:p-8">
            <ContactForm defaultType="career" lockType submitLabel="Send application" />
          </div>
        </Container>
      </Section>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  )
}

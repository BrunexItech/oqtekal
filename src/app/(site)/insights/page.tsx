import type { Metadata } from 'next'
import Link from 'next/link'

import { Container, PageHeader, Reveal, Section } from '@/design-system'
import { CATEGORY_LABEL, formatDate, getPosts, PostCard, PostCover } from '@/features/insights'
import { breadcrumbJsonLd, buildMetadata, JsonLd } from '@/features/seo'
import { cn } from '@/lib/cn'
import type { Post } from '@/payload-types'

export const metadata: Metadata = buildMetadata({
  title: 'Insights',
  description:
    'Practical notes from Oqtekal engineers on software, payments, hosting and building systems that last.',
  path: '/insights',
  eyebrow: 'Insights',
})

type Props = { searchParams: Promise<{ category?: string }> }

export default async function InsightsPage({ searchParams }: Props) {
  const { category } = await searchParams
  const all = await getPosts()
  const valid = category && category in CATEGORY_LABEL ? (category as Post['category']) : undefined
  const posts = valid ? all.filter((p) => p.category === valid) : all
  const used = Object.keys(CATEGORY_LABEL).filter((c) =>
    all.some((p) => p.category === c),
  ) as Post['category'][]
  const [featured, ...rest] = posts
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Insights', path: '/insights' },
  ]

  const chip = (label: string, href: string, active: boolean) => (
    <Link
      href={href}
      scroll={false}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'inline-flex h-10 shrink-0 items-center rounded-full border px-4 text-sm font-medium transition-colors',
        active ? 'border-fg bg-fg text-bg' : 'border-line-strong text-muted hover:text-fg',
      )}
    >
      {label}
    </Link>
  )

  return (
    <>
      <PageHeader
        crumbs={crumbs}
        eyebrow="Insights"
        title="Notes from the engineering floor."
        lead="Practical writing on building, integrating and running software in Kenya and beyond — no hype."
      />
      <Section>
        <Container>
          <nav
            aria-label="Categories"
            className="-mx-4 mb-14 no-scrollbar flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0"
          >
            {chip('All', '/insights', !valid)}
            {used.map((c) => chip(CATEGORY_LABEL[c], `/insights?category=${c}`, valid === c))}
          </nav>

          {featured ? (
            <Link
              href={`/insights/${featured.slug}`}
              className="group grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-14"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-panel)]">
                <div className="absolute inset-0 transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]">
                  <PostCover post={featured} priority sizes="(min-width: 1024px) 55vw, 100vw" />
                </div>
              </div>
              <div>
                <p className="text-sm text-muted">
                  {CATEGORY_LABEL[featured.category]} ·{' '}
                  <time dateTime={featured.publishedAt}>{formatDate(featured.publishedAt)}</time>
                </p>
                <h2 className="mt-3 text-h1 transition-colors group-hover:text-accent">
                  {featured.title}
                </h2>
                <p className="mt-4 text-lg text-muted">{featured.excerpt}</p>
              </div>
            </Link>
          ) : (
            <p className="text-muted">No articles in this category yet.</p>
          )}

          {rest.length ? (
            <div className="mt-20 grid gap-x-8 gap-y-14 border-t border-line pt-16 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((p, i) => (
                <Reveal key={p.id} delay={(i % 3) * 0.06}>
                  <PostCard post={p} />
                </Reveal>
              ))}
            </div>
          ) : null}
        </Container>
      </Section>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  )
}

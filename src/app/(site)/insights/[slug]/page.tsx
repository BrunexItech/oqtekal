import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Breadcrumbs, Container, Section } from '@/design-system'
import { CtaSection } from '@/features/cta'
import {
  CATEGORY_LABEL,
  formatDate,
  getPost,
  getPosts,
  PostCard,
  PostCover,
  readingTime,
} from '@/features/insights'
import { RichText } from '@/features/media'
import { articleJsonLd, breadcrumbJsonLd, buildMetadata, JsonLd } from '@/features/seo'
import { getSiteSettings } from '@/features/site'
import { asMedia } from '@/lib/media'
import { absoluteUrl, keepTogether } from '@/lib/site'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost((await params).slug)
  if (!post) return {}
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/insights/${post.slug}`,
    seo: post.seo,
    eyebrow: CATEGORY_LABEL[post.category],
    type: 'article',
  })
}

export default async function PostPage({ params }: Props) {
  const slug = (await params).slug
  const [post, all, settings] = await Promise.all([getPost(slug), getPosts(), getSiteSettings()])
  if (!post) notFound()

  const minutes = readingTime(post.content)
  const related = all.filter((p) => p.id !== post.id).slice(0, 3)
  const path = `/insights/${post.slug}`
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Insights', path: '/insights' },
    { name: post.title, path },
  ]
  const cover = asMedia(post.cover)

  return (
    <article>
      <Container className="pt-8 md:pt-10">
        <Breadcrumbs items={crumbs} className="mb-10 md:mb-14" />
        <div className="mx-auto max-w-3xl">
          <p className="text-sm text-muted">
            {CATEGORY_LABEL[post.category]} ·{' '}
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time> · {minutes} min
            read
          </p>
          <h1 className="mt-4 text-display">{keepTogether(post.title)}</h1>
          <p className="mt-6 text-lead text-muted">{post.excerpt}</p>
          <p className="mt-8 text-sm text-muted">By the Oqtekal engineering team</p>
        </div>
        <div className="relative mx-auto mt-12 aspect-[16/8] max-w-5xl overflow-hidden rounded-[var(--radius-panel)]">
          <PostCover post={post} priority sizes="(min-width: 1024px) 1024px, 100vw" />
        </div>
      </Container>

      <Section spacing="tight">
        <Container>
          <RichText data={post.content as SerializedEditorState} className="mx-auto max-w-3xl" />
        </Container>
      </Section>

      {related.length ? (
        <Section tone="surface">
          <Container>
            <h2 className="text-h1">Keep reading</h2>
            <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <div className="py-10 md:py-16">
        <CtaSection settings={settings} heading="Want this kind of thinking on your project?" />
      </div>

      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          articleJsonLd({
            title: post.title,
            description: post.excerpt,
            path,
            publishedAt: post.publishedAt,
            updatedAt: post.updatedAt,
            image: cover?.url ? absoluteUrl(cover.url) : undefined,
          }),
        ]}
      />
    </article>
  )
}

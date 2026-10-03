import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Container, PageHeader, Section } from '@/design-system'
import { RichText } from '@/features/media'
import { getTextPage } from '@/features/pages'
import { buildMetadata } from '@/features/seo'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await getTextPage((await params).slug)
  if (!page) return {}
  return buildMetadata({
    title: page.title,
    description: page.summary ?? page.title,
    path: `/legal/${page.slug}`,
    seo: page.seo,
  })
}

export default async function LegalPage({ params }: Props) {
  const page = await getTextPage((await params).slug)
  if (!page) notFound()
  const updated = new Intl.DateTimeFormat('en-KE', { dateStyle: 'long' }).format(
    new Date(page.updatedAt),
  )
  return (
    <>
      <PageHeader
        crumbs={[
          { name: 'Home', path: '/' },
          { name: page.title, path: `/legal/${page.slug}` },
        ]}
        eyebrow={`Last updated ${updated}`}
        title={page.title}
        lead={page.summary}
      />
      <Section spacing="tight">
        <Container>
          <RichText data={page.content as SerializedEditorState} className="max-w-3xl" />
        </Container>
      </Section>
    </>
  )
}

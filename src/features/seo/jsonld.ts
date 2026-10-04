import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME } from '@/lib/site'
import type { SiteSetting } from '@/payload-types'

export const organizationJsonLd = (settings: SiteSetting) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': absoluteUrl('/#organization'),
  name: SITE_NAME,
  url: absoluteUrl('/'),
  logo: absoluteUrl('/brand/icon-512.png'),
  description: SITE_DESCRIPTION,
  email: settings.email,
  telephone: settings.phone,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Nairobi',
    addressCountry: 'KE',
    // Street lines only; the P.O. Box goes in its own field.
    streetAddress: settings.address
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l && !/^p\.?\s*o\.?\s*box/i.test(l) && !/^nairobi$/i.test(l))
      .join(', '),
    postOfficeBoxNumber: settings.address.match(/P\.?\s*O\.?\s*Box\s*([\w-]+)/i)?.[1],
  },
  sameAs: (settings.socials ?? []).map((s) => s.url),
})

export const breadcrumbJsonLd = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
})

export const faqJsonLd = (faqs: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
})

export const serviceJsonLd = (s: { name: string; description: string; path: string }) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: s.name,
  description: s.description,
  url: absoluteUrl(s.path),
  provider: { '@id': absoluteUrl('/#organization') },
  areaServed: ['KE', 'East Africa'],
})

export const productJsonLd = (p: {
  name: string
  description: string
  path: string
  category: string
}) => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: p.name,
  description: p.description,
  url: absoluteUrl(p.path),
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: p.category,
  operatingSystem: 'Web, Android, iOS',
  publisher: { '@id': absoluteUrl('/#organization') },
})

export const articleJsonLd = (a: {
  title: string
  description: string
  path: string
  publishedAt: string
  updatedAt: string
  author?: string
  image?: string
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: a.title,
  description: a.description,
  url: absoluteUrl(a.path),
  datePublished: a.publishedAt,
  dateModified: a.updatedAt,
  author: a.author
    ? { '@type': 'Person', name: a.author }
    : { '@id': absoluteUrl('/#organization') },
  publisher: { '@id': absoluteUrl('/#organization') },
  ...(a.image ? { image: a.image } : {}),
})

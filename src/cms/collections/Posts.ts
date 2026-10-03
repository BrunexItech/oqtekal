import type { CollectionConfig } from 'payload'

import { isEditor, publishedOrStaff } from '../access'
import { placeholderField, seoField, slugField } from '../fields'
import { livePreviewFor } from '../preview'

export const POST_CATEGORIES = [
  { label: 'Engineering', value: 'engineering' },
  { label: 'Product', value: 'product' },
  { label: 'Payments', value: 'payments' },
  { label: 'Hosting & cloud', value: 'cloud' },
  { label: 'Company', value: 'company' },
] as const

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Article', plural: 'Insights (articles)' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', '_status'],
    group: 'Content',
    livePreview: livePreviewFor((d) => `/insights/${String(d.slug ?? '')}`),
  },
  defaultSort: '-publishedAt',
  versions: { drafts: true, maxPerDoc: 30 },
  access: { read: publishedOrStaff, create: isEditor, update: isEditor, delete: isEditor },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      admin: { description: 'Two sentences shown on the Insights page.' },
    },
    { name: 'cover', type: 'upload', relationTo: 'media' },
    { name: 'content', type: 'richText', required: true },
    seoField,
    slugField(),
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'engineering',
      options: [...POST_CATEGORIES],
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly' } },
    },
    placeholderField,
  ],
}

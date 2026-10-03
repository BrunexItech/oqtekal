import type { CollectionConfig } from 'payload'

import { isEditor, publishedOrStaff } from '../access'
import { orderField, placeholderField, seoField, slugField } from '../fields'
import { livePreviewFor } from '../preview'

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  labels: { singular: 'Case study', plural: 'Case studies' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'client', 'featured', '_status'],
    group: 'Work & people',
    livePreview: livePreviewFor((d) => `/work/${String(d.slug ?? '')}`),
  },
  defaultSort: 'order',
  versions: { drafts: true, maxPerDoc: 20 },
  access: { read: publishedOrStaff, create: isEditor, update: isEditor, delete: isEditor },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        { name: 'client', type: 'text', required: true, admin: { width: '50%' } },
        { name: 'industry', type: 'text', required: true, admin: { width: '25%' } },
        { name: 'year', type: 'number', admin: { width: '25%' } },
      ],
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      admin: { description: 'One or two sentences for cards.' },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Story',
          fields: [
            { name: 'cover', type: 'upload', relationTo: 'media' },
            {
              name: 'results',
              label: 'Headline results',
              type: 'array',
              maxRows: 4,
              labels: { singular: 'Result', plural: 'Results' },
              fields: [
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                  admin: { description: 'e.g. "3×" or "40 s"' },
                },
                { name: 'label', type: 'text', required: true },
              ],
            },
            { name: 'challenge', type: 'textarea', required: true },
            { name: 'solution', type: 'textarea', required: true },
            {
              name: 'approach',
              label: 'What we did',
              type: 'array',
              labels: { singular: 'Step', plural: 'Steps' },
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'text', type: 'textarea', required: true },
              ],
            },
            { name: 'outcome', type: 'textarea' },
            { name: 'product', type: 'relationship', relationTo: 'products' },
            { name: 'services', type: 'relationship', relationTo: 'services', hasMany: true },
            {
              name: 'stack',
              type: 'array',
              fields: [{ name: 'name', type: 'text', required: true }],
            },
            { name: 'testimonial', type: 'relationship', relationTo: 'testimonials' },
          ],
        },
        { label: 'Search & sharing', fields: [seoField] },
      ],
    },
    slugField(),
    orderField,
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Show on the home page.' },
    },
    placeholderField,
  ],
}

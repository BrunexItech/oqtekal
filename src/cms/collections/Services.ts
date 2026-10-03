import type { CollectionConfig } from 'payload'

import { isEditor, publishedOrStaff } from '../access'
import { faqsField, orderField, placeholderField, seoField, slugField } from '../fields'
import { livePreviewFor } from '../preview'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: { singular: 'Service', plural: 'Services' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'pillar', 'order', '_status'],
    group: 'Services & products',
    livePreview: livePreviewFor((d) => String(d.path ?? '/services')),
  },
  defaultSort: 'order',
  versions: { drafts: true, maxPerDoc: 20 },
  access: { read: publishedOrStaff, create: isEditor, update: isEditor, delete: isEditor },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'pillar',
      label: 'Service group',
      type: 'relationship',
      relationTo: 'pillars',
      required: true,
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      admin: { description: 'One sentence shown in lists and menus.' },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Page content',
          fields: [
            {
              name: 'headline',
              type: 'text',
              admin: { description: 'Big heading on the service page. Defaults to the title.' },
            },
            { name: 'intro', type: 'textarea', required: true },
            {
              name: 'deliverables',
              label: 'What you get',
              type: 'array',
              minRows: 1,
              labels: { singular: 'Item', plural: 'Items' },
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'text', type: 'textarea', required: true },
              ],
            },
            {
              name: 'outcomes',
              label: 'Outcomes for the client',
              type: 'array',
              labels: { singular: 'Outcome', plural: 'Outcomes' },
              fields: [{ name: 'text', type: 'text', required: true }],
            },
            {
              name: 'technologies',
              type: 'array',
              labels: { singular: 'Technology', plural: 'Technologies' },
              admin: { description: 'Tools and platforms we use for this service.' },
              fields: [{ name: 'name', type: 'text', required: true }],
            },
            {
              name: 'relatedProducts',
              type: 'relationship',
              relationTo: 'products',
              hasMany: true,
            },
            faqsField,
          ],
        },
        { label: 'Search & sharing', fields: [seoField] },
      ],
    },
    slugField(),
    {
      name: 'path',
      type: 'text',
      index: true,
      admin: { readOnly: true, position: 'sidebar', description: 'Set automatically.' },
      hooks: {
        beforeChange: [
          async ({ data, req }) => {
            const pillarId = typeof data?.pillar === 'object' ? data?.pillar?.id : data?.pillar
            if (!pillarId || !data?.slug) return data?.path
            const pillar = await req.payload.findByID({
              collection: 'pillars',
              id: pillarId,
              depth: 0,
              req,
            })
            return `/services/${pillar.slug}/${data.slug}`
          },
        ],
      },
    },
    orderField,
    placeholderField,
  ],
}

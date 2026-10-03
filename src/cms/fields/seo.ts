import type { Field } from 'payload'

/** Search & social sharing overrides. Every field is optional; sensible defaults are used. */
export const seoField: Field = {
  name: 'seo',
  type: 'group',
  label: 'Search & sharing',
  admin: {
    description:
      'Optional. How this page appears on Google and when shared on WhatsApp, LinkedIn, etc.',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      maxLength: 70,
      admin: { description: 'Up to ~60 characters. Defaults to the page title.' },
    },
    {
      name: 'description',
      type: 'textarea',
      maxLength: 200,
      admin: { description: 'Up to ~155 characters. Defaults to the summary.' },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Share image, 1200×630. A branded image is generated if empty.' },
    },
  ],
}

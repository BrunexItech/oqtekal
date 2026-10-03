import type { CollectionConfig } from 'payload'

import { anyone, isEditor } from '../access'
import { seoField, slugField } from '../fields'

/** Simple text pages such as the privacy policy and terms. */
export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Text page', plural: 'Text pages (legal)' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: 'Content',
    description: 'Pages shown at /legal/<slug>, e.g. privacy and terms.',
  },
  access: { read: anyone, create: isEditor, update: isEditor, delete: isEditor },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'summary', type: 'textarea' },
    { name: 'content', type: 'richText', required: true },
    seoField,
    slugField(),
  ],
}

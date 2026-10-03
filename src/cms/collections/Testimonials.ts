import type { CollectionConfig } from 'payload'

import { anyone, isEditor } from '../access'
import { orderField, placeholderField } from '../fields'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: { singular: 'Testimonial', plural: 'Testimonials' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'company', 'isPlaceholder'],
    group: 'Work & people',
    description: 'Only publish quotes you have permission to use.',
  },
  defaultSort: 'order',
  access: { read: anyone, create: isEditor, update: isEditor, delete: isEditor },
  fields: [
    { name: 'quote', type: 'textarea', required: true },
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true, admin: { width: '33%' } },
        { name: 'role', type: 'text', admin: { width: '33%' } },
        { name: 'company', type: 'text', admin: { width: '33%' } },
      ],
    },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    orderField,
    placeholderField,
  ],
}

import type { CollectionConfig } from 'payload'

import { anyone, isEditor } from '../access'
import { orderField, slugField } from '../fields'

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  labels: { singular: 'Job opening', plural: 'Careers' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'type', 'isOpen'], group: 'Content' },
  defaultSort: 'order',
  access: { read: anyone, create: isEditor, update: isEditor, delete: isEditor },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        {
          name: 'location',
          type: 'text',
          required: true,
          defaultValue: 'Nairobi · Hybrid',
          admin: { width: '50%' },
        },
        {
          name: 'type',
          type: 'select',
          required: true,
          defaultValue: 'full-time',
          admin: { width: '50%' },
          options: [
            { label: 'Full-time', value: 'full-time' },
            { label: 'Contract', value: 'contract' },
            { label: 'Internship', value: 'internship' },
          ],
        },
      ],
    },
    { name: 'summary', type: 'textarea', required: true },
    {
      name: 'responsibilities',
      type: 'array',
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    {
      name: 'requirements',
      type: 'array',
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    {
      name: 'isOpen',
      label: 'Accepting applications',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    slugField(),
    orderField,
  ],
}

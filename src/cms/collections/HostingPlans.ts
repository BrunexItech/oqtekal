import type { CollectionConfig } from 'payload'

import { anyone, isEditor } from '../access'
import { orderField } from '../fields'

export const HostingPlans: CollectionConfig = {
  slug: 'hosting-plans',
  labels: { singular: 'Hosting plan', plural: 'Hosting plans' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'priceMonthly', 'featured', 'order'],
    group: 'Services & products',
  },
  defaultSort: 'order',
  access: { read: anyone, create: isEditor, update: isEditor, delete: isEditor },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true, admin: { width: '50%' } },
        {
          name: 'category',
          type: 'select',
          required: true,
          defaultValue: 'web',
          admin: { width: '50%' },
          options: [
            { label: 'Web hosting', value: 'web' },
            { label: 'VPS / cloud server', value: 'vps' },
            { label: 'Business email', value: 'email' },
          ],
        },
      ],
    },
    {
      name: 'tagline',
      type: 'text',
      required: true,
      admin: { description: 'Who it is for, in one line.' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'priceMonthly',
          label: 'Price per month (KES)',
          type: 'number',
          required: true,
          min: 0,
          admin: { width: '50%' },
        },
        {
          name: 'priceYearly',
          label: 'Price per year (KES)',
          type: 'number',
          min: 0,
          admin: { width: '50%', description: 'Leave empty to use 10× the monthly price.' },
        },
      ],
    },
    {
      name: 'specs',
      type: 'array',
      labels: { singular: 'Spec', plural: 'Specs' },
      admin: { description: 'e.g. Storage → 50 GB NVMe' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'label', type: 'text', required: true, admin: { width: '50%' } },
            { name: 'value', type: 'text', required: true, admin: { width: '50%' } },
          ],
        },
      ],
    },
    {
      name: 'features',
      type: 'array',
      labels: { singular: 'Feature', plural: 'Features' },
      fields: [{ name: 'label', type: 'text', required: true }],
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Highlight as most popular',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    orderField,
  ],
}

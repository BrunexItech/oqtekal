import type { CollectionConfig } from 'payload'

import { anyone, isEditor } from '../access'
import { orderField, seoField, slugField } from '../fields'

/** Top-level service groups, e.g. "Cloud & Hosting". Services belong to one pillar. */
export const Pillars: CollectionConfig = {
  slug: 'pillars',
  labels: { singular: 'Service group', plural: 'Service groups' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'order', 'updatedAt'],
    group: 'Services & products',
    description: 'The main groups shown on the Services page (e.g. "Cloud & Hosting").',
  },
  defaultSort: 'order',
  access: { read: anyone, create: isEditor, update: isEditor, delete: isEditor },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      admin: { description: 'One or two sentences shown in lists and menus.' },
    },
    {
      name: 'intro',
      type: 'textarea',
      admin: { description: "Opening paragraph on this group's own page." },
    },
    {
      name: 'services',
      type: 'join',
      collection: 'services',
      on: 'pillar',
      admin: {
        description: 'Services in this group. Add a service and choose this group to list it here.',
      },
    },
    slugField(),
    orderField,
    seoField,
  ],
}

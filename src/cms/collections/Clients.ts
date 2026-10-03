import type { CollectionConfig } from 'payload'

import { anyone, isEditor } from '../access'
import { orderField, placeholderField } from '../fields'

export const Clients: CollectionConfig = {
  slug: 'clients',
  labels: { singular: 'Client logo', plural: 'Client logos' },
  admin: {
    useAsTitle: 'name',
    group: 'Work & people',
    description: 'Logos in the "Trusted by" strip. Only add clients who agreed to be listed.',
  },
  defaultSort: 'order',
  access: { read: anyone, create: isEditor, update: isEditor, delete: isEditor },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Single-colour or transparent logo works best.' },
    },
    { name: 'url', type: 'text' },
    orderField,
    placeholderField,
  ],
}

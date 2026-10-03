import type { CollectionConfig } from 'payload'

import { isAdmin, isSales } from '../access'

export const Subscribers: CollectionConfig = {
  slug: 'subscribers',
  labels: { singular: 'Newsletter subscriber', plural: 'Newsletter subscribers' },
  admin: { useAsTitle: 'email', defaultColumns: ['email', 'createdAt'], group: 'Inbox' },
  defaultSort: '-createdAt',
  access: { create: () => false, read: isSales, update: isSales, delete: isAdmin },
  fields: [
    { name: 'email', type: 'email', required: true, unique: true, index: true },
    { name: 'sourcePage', type: 'text', admin: { readOnly: true } },
  ],
}

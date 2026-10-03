import type { CollectionConfig } from 'payload'

import { isAdmin, isAdminField } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Staff account', plural: 'Staff accounts' },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'roles'],
    group: 'Settings',
  },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
    tokenExpiration: 60 * 60 * 8,
  },
  access: {
    // Staff can read/update themselves; only admins manage other accounts.
    read: ({ req }) =>
      req.user ? (isAdmin({ req } as never) ? true : { id: { equals: req.user.id } }) : false,
    create: isAdmin,
    update: ({ req }) =>
      req.user ? (isAdmin({ req } as never) ? true : { id: { equals: req.user.id } }) : false,
    delete: isAdmin,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      required: true,
      defaultValue: ['editor'],
      saveToJWT: true,
      access: { update: isAdminField, create: isAdminField },
      options: [
        { label: 'Admin — everything', value: 'admin' },
        { label: 'Editor — website content', value: 'editor' },
        { label: 'Sales — enquiries inbox', value: 'sales' },
      ],
    },
  ],
}

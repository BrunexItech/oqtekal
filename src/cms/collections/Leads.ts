import type { CollectionConfig } from 'payload'

import { isAdmin, isSales } from '../access'

export const LEAD_TYPES = [
  { label: 'New project', value: 'project' },
  { label: 'Product demo', value: 'demo' },
  { label: 'Hosting order', value: 'hosting' },
  { label: 'Job application', value: 'career' },
  { label: 'General question', value: 'general' },
] as const

/** Every website enquiry lands here, so nothing is lost in an email inbox. */
export const Leads: CollectionConfig = {
  slug: 'leads',
  labels: { singular: 'Enquiry', plural: 'Enquiries' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'status', 'createdAt'],
    group: 'Inbox',
    listSearchableFields: ['name', 'email', 'company', 'message'],
  },
  defaultSort: '-createdAt',
  access: {
    // Created only by the website's server action (which uses overrideAccess).
    create: () => false,
    read: isSales,
    update: isSales,
    delete: isAdmin,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'status',
          type: 'select',
          required: true,
          defaultValue: 'new',
          admin: { width: '50%' },
          options: [
            { label: 'New', value: 'new' },
            { label: 'Contacted', value: 'contacted' },
            { label: 'Won', value: 'won' },
            { label: 'Lost', value: 'lost' },
            { label: 'Spam', value: 'spam' },
          ],
        },
        {
          name: 'type',
          type: 'select',
          required: true,
          options: [...LEAD_TYPES],
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true, admin: { width: '50%' } },
        { name: 'company', type: 'text', admin: { width: '50%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'email', type: 'email', required: true, admin: { width: '50%' } },
        { name: 'phone', type: 'text', admin: { width: '50%' } },
      ],
    },
    { name: 'message', type: 'textarea', required: true },
    {
      type: 'row',
      fields: [
        { name: 'budget', type: 'text', admin: { width: '33%' } },
        { name: 'interest', label: 'Product / plan / role', type: 'text', admin: { width: '33%' } },
        { name: 'sourcePage', type: 'text', admin: { width: '33%', readOnly: true } },
      ],
    },
    { name: 'notes', label: 'Internal notes', type: 'textarea' },
  ],
}

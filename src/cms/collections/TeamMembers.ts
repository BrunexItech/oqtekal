import type { CollectionConfig } from 'payload'

import { anyone, isEditor } from '../access'
import { orderField, placeholderField } from '../fields'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  labels: { singular: 'Team member', plural: 'Team' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'order', 'isPlaceholder'],
    group: 'Work & people',
    description:
      'People shown in the Team section. Use portraits with the same background and lighting.',
  },
  defaultSort: 'order',
  access: { read: anyone, create: isEditor, update: isEditor, delete: isEditor },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true, admin: { width: '50%' } },
        { name: 'role', type: 'text', required: true, admin: { width: '50%' } },
      ],
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Portrait, at least 1000px tall. Set the focal point on the face.' },
    },
    {
      name: 'focus',
      type: 'text',
      required: true,
      admin: { description: 'One line, e.g. "Turns business processes into reliable systems."' },
    },
    { name: 'bio', type: 'textarea', required: true, admin: { description: '2–4 sentences.' } },
    {
      name: 'expertise',
      type: 'array',
      maxRows: 5,
      labels: { singular: 'Skill', plural: 'Skills' },
      fields: [{ name: 'label', type: 'text', required: true }],
    },
    {
      name: 'links',
      type: 'group',
      fields: [
        { name: 'linkedin', type: 'text', admin: { description: 'Full URL' } },
        { name: 'x', label: 'X (Twitter)', type: 'text' },
        { name: 'github', type: 'text' },
        { name: 'email', type: 'email' },
      ],
    },
    orderField,
    placeholderField,
  ],
}

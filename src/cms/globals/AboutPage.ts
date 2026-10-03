import type { GlobalConfig } from 'payload'

import { anyone, isEditor } from '../access'
import { previewUrl } from '../preview'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'About page',
  admin: { group: 'Pages', livePreview: { url: () => previewUrl('/about') } },
  access: { read: anyone, update: isEditor },
  versions: { drafts: true, max: 20 },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'intro', type: 'textarea', required: true },
    {
      name: 'story',
      type: 'array',
      label: 'Our story (paragraphs)',
      fields: [{ name: 'text', type: 'textarea', required: true }],
    },
    {
      name: 'values',
      type: 'array',
      labels: { singular: 'Value', plural: 'Values' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'text', type: 'textarea', required: true },
      ],
    },
    {
      name: 'commitments',
      label: 'What clients can count on',
      type: 'array',
      fields: [{ name: 'text', type: 'text', required: true }],
    },
  ],
}

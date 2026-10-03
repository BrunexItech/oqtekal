import type { CollectionConfig } from 'payload'

import { anyone, isEditor } from '../access'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Image', plural: 'Images & files' },
  admin: { group: 'Content', defaultColumns: ['filename', 'alt', 'updatedAt'] },
  access: { read: anyone, create: isEditor, update: isEditor, delete: isEditor },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*', 'application/pdf'],
    focalPoint: true,
    crop: true,
    imageSizes: [
      { name: 'thumb', width: 480 },
      { name: 'card', width: 960 },
      { name: 'wide', width: 1920 },
    ],
    adminThumbnail: 'thumb',
  },
  fields: [
    {
      name: 'alt',
      label: 'Description (for screen readers & Google)',
      type: 'text',
      required: true,
      admin: {
        description: 'Describe what is in the image, e.g. "Tolkyn inbox showing WhatsApp chats".',
      },
    },
  ],
}

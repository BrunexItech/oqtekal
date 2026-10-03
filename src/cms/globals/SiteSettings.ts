import type { GlobalConfig } from 'payload'

import { anyone, isEditor } from '../access'

export const SOCIAL_PLATFORMS = [
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'X (Twitter)', value: 'x' },
  { label: 'Facebook', value: 'facebook' },
  { label: 'Instagram', value: 'instagram' },
  { label: 'YouTube', value: 'youtube' },
  { label: 'TikTok', value: 'tiktok' },
  { label: 'GitHub', value: 'github' },
  { label: 'WhatsApp', value: 'whatsapp' },
] as const

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Company details',
  admin: {
    group: 'Settings',
    description: 'Contact details, social links and company facts used across the site.',
  },
  access: { read: anyone, update: isEditor },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Contact',
          fields: [
            { name: 'email', type: 'email', required: true, defaultValue: 'hello@oqtekal.com' },
            {
              type: 'row',
              fields: [
                {
                  name: 'phone',
                  type: 'text',
                  required: true,
                  admin: { width: '50%', description: 'Shown as written, e.g. +254 700 000 000' },
                },
                {
                  name: 'whatsapp',
                  type: 'text',
                  required: true,
                  admin: {
                    width: '50%',
                    description: 'Digits only with country code, e.g. 254700000000',
                  },
                },
              ],
            },
            { name: 'address', type: 'textarea', required: true, defaultValue: 'Nairobi, Kenya' },
            { name: 'hours', type: 'text', defaultValue: 'Mon – Fri, 8:00 – 18:00 EAT' },
            { name: 'mapUrl', label: 'Google Maps link', type: 'text' },
          ],
        },
        {
          label: 'Social media',
          fields: [
            {
              name: 'socials',
              type: 'array',
              labels: { singular: 'Account', plural: 'Accounts' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'platform',
                      type: 'select',
                      required: true,
                      options: [...SOCIAL_PLATFORMS],
                      admin: { width: '40%' },
                    },
                    { name: 'url', type: 'text', required: true, admin: { width: '60%' } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Company facts',
          fields: [
            {
              name: 'stats',
              label: 'Key numbers',
              type: 'array',
              maxRows: 4,
              admin: {
                description: 'Shown on the home and about pages, e.g. "40+" / "Systems delivered".',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'value', type: 'text', required: true, admin: { width: '40%' } },
                    { name: 'label', type: 'text', required: true, admin: { width: '60%' } },
                  ],
                },
              ],
            },
            {
              name: 'statsArePlaceholder',
              label: 'These numbers are samples (replace before launch)',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
        },
        {
          label: 'Announcement bar',
          fields: [
            {
              name: 'announcementEnabled',
              label: 'Show announcement bar',
              type: 'checkbox',
              defaultValue: false,
            },
            { name: 'announcementText', type: 'text' },
            { name: 'announcementLink', type: 'text' },
          ],
        },
      ],
    },
  ],
}

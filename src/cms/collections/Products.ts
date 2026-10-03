import type { CollectionConfig } from 'payload'

import { isEditor, publishedOrStaff } from '../access'
import { faqsField, orderField, placeholderField, seoField, slugField } from '../fields'
import { livePreviewFor } from '../preview'

export const PRODUCT_VISUALS = [
  { label: 'Communications (inbox & campaigns)', value: 'comms' },
  { label: 'School management', value: 'school' },
  { label: 'Property management', value: 'property' },
  { label: 'ERP / accounting', value: 'erp' },
  { label: 'Sports management', value: 'sports' },
  { label: 'Payments / M-Pesa', value: 'payments' },
  { label: 'Point of sale', value: 'pos' },
  { label: 'Health / clinic', value: 'health' },
  { label: 'SACCO / microfinance', value: 'sacco' },
  { label: 'Online store', value: 'store' },
] as const

export const Products: CollectionConfig = {
  slug: 'products',
  labels: { singular: 'Product', plural: 'Products' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'availability', 'order', '_status'],
    group: 'Services & products',
    livePreview: livePreviewFor((d) => `/products/${String(d.slug ?? '')}`),
  },
  defaultSort: 'order',
  versions: { drafts: true, maxPerDoc: 20 },
  access: { read: publishedOrStaff, create: isEditor, update: isEditor, delete: isEditor },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'tagline',
      type: 'text',
      required: true,
      admin: { description: 'Short promise, e.g. "Every customer conversation, one inbox."' },
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      admin: { description: 'Two sentences shown on product cards.' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'category',
          type: 'text',
          required: true,
          admin: { width: '50%', description: 'e.g. "Communications", "Education"' },
        },
        {
          // Not named "status": Payload drafts already use `_status` (same Postgres enum name).
          name: 'availability',
          type: 'select',
          required: true,
          defaultValue: 'live',
          admin: { width: '50%' },
          options: [
            { label: 'Live', value: 'live' },
            { label: 'Beta', value: 'beta' },
            { label: 'Coming soon', value: 'soon' },
            { label: 'Built to order', value: 'custom' },
          ],
        },
      ],
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Brand & visuals',
          fields: [
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Product logo (transparent PNG or SVG). Optional.' },
            },
            {
              name: 'partnerLogo',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description:
                  'Third-party logo shown as "Integrates with…" (e.g. the official M-Pesa logo). Use only official, unmodified files.',
              },
            },
            {
              name: 'visual',
              type: 'select',
              required: true,
              defaultValue: 'comms',
              options: [...PRODUCT_VISUALS],
              admin: {
                description:
                  'Built-in product illustration used until real screenshots are uploaded below.',
              },
            },
            {
              name: 'contextImage',
              label: 'Real-world photo',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description:
                  'A wide photo of where the product is used (e.g. a classroom for School). Avoid recognisable faces.',
              },
            },
            {
              name: 'contextCaption',
              label: 'Photo caption',
              type: 'text',
              admin: {
                description:
                  'One line shown over the photo, e.g. "Built for schools across Kenya".',
              },
            },
            {
              name: 'screenshots',
              type: 'array',
              labels: { singular: 'Screenshot', plural: 'Screenshots' },
              admin: {
                description: 'Real screenshots. The first one replaces the built-in illustration.',
              },
              fields: [
                { name: 'image', type: 'upload', relationTo: 'media', required: true },
                { name: 'caption', type: 'text' },
              ],
            },
            {
              name: 'externalUrl',
              label: 'Product website',
              type: 'text',
              admin: { description: 'e.g. https://tolkyn.co.ke (optional)' },
            },
          ],
        },
        {
          label: 'Page content',
          fields: [
            {
              name: 'problem',
              label: 'The problem it solves',
              type: 'textarea',
              required: true,
            },
            {
              name: 'features',
              type: 'array',
              minRows: 3,
              labels: { singular: 'Feature', plural: 'Features' },
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'text', type: 'textarea', required: true },
              ],
            },
            {
              name: 'audiences',
              label: 'Who it is for',
              type: 'array',
              labels: { singular: 'Audience', plural: 'Audiences' },
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'text', type: 'text' },
              ],
            },
            {
              name: 'integrations',
              type: 'array',
              labels: { singular: 'Integration', plural: 'Integrations' },
              fields: [{ name: 'name', type: 'text', required: true }],
            },
            {
              name: 'highlights',
              label: 'Key numbers',
              type: 'array',
              maxRows: 4,
              labels: { singular: 'Number', plural: 'Numbers' },
              fields: [
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                  admin: { description: 'e.g. "5 channels"' },
                },
                { name: 'label', type: 'text', required: true },
              ],
            },
            {
              name: 'pricingNote',
              type: 'text',
              admin: { description: 'e.g. "From KES 4,500 / month" (optional)' },
            },
            faqsField,
          ],
        },
        { label: 'Search & sharing', fields: [seoField] },
      ],
    },
    slugField('name'),
    orderField,
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar', description: 'Show on the home page.' },
    },
    placeholderField,
  ],
}

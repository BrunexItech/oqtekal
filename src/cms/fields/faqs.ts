import type { Field } from 'payload'

export const faqsField: Field = {
  name: 'faqs',
  label: 'Frequently asked questions',
  type: 'array',
  labels: { singular: 'Question', plural: 'Questions' },
  admin: { initCollapsed: true },
  fields: [
    { name: 'question', type: 'text', required: true },
    { name: 'answer', type: 'textarea', required: true },
  ],
}

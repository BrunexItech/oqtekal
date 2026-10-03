import type { Field } from 'payload'

export const orderField: Field = {
  name: 'order',
  type: 'number',
  defaultValue: 100,
  admin: {
    position: 'sidebar',
    description: 'Lower numbers appear first.',
  },
}

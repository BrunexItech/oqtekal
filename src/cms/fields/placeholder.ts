import type { Field } from 'payload'

/**
 * Marks sample content that must be replaced before launch.
 * The launch-checklist test fails while any published item still has this ticked.
 */
export const placeholderField: Field = {
  name: 'isPlaceholder',
  type: 'checkbox',
  label: 'Sample content (replace before launch)',
  defaultValue: false,
  admin: {
    position: 'sidebar',
    description: 'Untick once this item contains real, approved information.',
  },
}

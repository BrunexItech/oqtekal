import type { GlobalConfig } from 'payload'

import { anyone, isEditor } from '../access'
import { previewUrl } from '../preview'

const sectionIntro = (name: string, label: string) => ({
  name,
  label,
  type: 'group' as const,
  fields: [
    { name: 'eyebrow', type: 'text' as const },
    { name: 'heading', type: 'text' as const, required: true },
    { name: 'text', type: 'textarea' as const },
  ],
})

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Home page',
  admin: {
    group: 'Pages',
    livePreview: { url: () => previewUrl('/') },
  },
  access: { read: anyone, update: isEditor },
  versions: { drafts: true, max: 20 },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          name: 'hero',
          fields: [
            {
              name: 'eyebrow',
              type: 'text',
              defaultValue: 'Software engineering company · Nairobi',
            },
            {
              name: 'heading',
              type: 'text',
              required: true,
              admin: { description: 'The main headline.' },
            },
            { name: 'text', type: 'textarea', required: true },
            {
              type: 'row',
              fields: [
                {
                  name: 'primaryLabel',
                  type: 'text',
                  defaultValue: 'Start a project',
                  admin: { width: '50%' },
                },
                {
                  name: 'secondaryLabel',
                  type: 'text',
                  defaultValue: 'Explore products',
                  admin: { width: '50%' },
                },
              ],
            },
          ],
        },
        {
          label: 'Sections',
          fields: [
            sectionIntro('productsIntro', 'Products section'),
            sectionIntro('servicesIntro', 'Services section'),
            sectionIntro('workIntro', 'Selected work section'),
            sectionIntro('processIntro', 'How we work section'),
            sectionIntro('teamIntro', 'Team section'),
            sectionIntro('hostingIntro', 'Hosting section'),
            sectionIntro('ctaIntro', 'Final call to action'),
          ],
        },
        {
          label: 'How we work',
          fields: [
            {
              name: 'process',
              type: 'array',
              minRows: 3,
              maxRows: 6,
              labels: { singular: 'Step', plural: 'Steps' },
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'text', type: 'textarea', required: true },
                { name: 'duration', type: 'text', admin: { description: 'e.g. "1–2 weeks"' } },
              ],
            },
          ],
        },
      ],
    },
  ],
}

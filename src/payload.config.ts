import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import {
  CaseStudies,
  Clients,
  HostingPlans,
  Jobs,
  Leads,
  Media,
  Pages,
  Pillars,
  Posts,
  Products,
  Services,
  Subscribers,
  Testimonials,
  Users,
} from './cms/collections'
import { AboutPage, HomePage, SiteSettings } from './cms/globals'
import { revalidateCollection, revalidateGlobal } from './cms/hooks/revalidate'
import { env } from './lib/env'
import { migrations } from './migrations'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default buildConfig({
  secret: env.PAYLOAD_SECRET,
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      titleSuffix: ' · Oqtekal admin',
      icons: [{ rel: 'icon', type: 'image/svg+xml', url: '/icon.svg' }],
    },
    components: {
      graphics: {
        Logo: '/cms/components/AdminLogo#AdminLogo',
        Icon: '/cms/components/AdminIcon#AdminIcon',
      },
    },
    livePreview: {
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 390, height: 844 },
        { label: 'Tablet', name: 'tablet', width: 834, height: 1112 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  collections: [
    // Inbox & accounts: not shown on the public site.
    Leads,
    Subscribers,
    // Website content: saving any of these refreshes the cached pages.
    ...[
      Products,
      Pillars,
      Services,
      HostingPlans,
      CaseStudies,
      Testimonials,
      Clients,
      Posts,
      Jobs,
      Pages,
      Media,
    ].map(revalidateCollection),
    Users,
  ],
  globals: [HomePage, AboutPage, SiteSettings].map(revalidateGlobal),
  editor: lexicalEditor(),
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({
    pool: { connectionString: env.DATABASE_URL },
    migrationDir: path.resolve(dirname, 'migrations'),
    // Pending migrations run automatically when the production server starts.
    prodMigrations: migrations,
  }),
  // Admin emails (password resets). Without SMTP they are printed to the server log.
  ...(env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS
    ? {
        email: nodemailerAdapter({
          defaultFromAddress: env.SMTP_USER,
          defaultFromName: 'Oqtekal',
          transportOptions: {
            host: env.SMTP_HOST,
            port: env.SMTP_PORT,
            secure: env.SMTP_PORT === 465,
            auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
          } as never, // the adapter bundles older nodemailer typings than the nodemailer we install
        }),
      }
    : {}),
  sharp,
  telemetry: false,
})

/**
 * Seeds the database with complete sample content.
 *
 *   npm run seed            # refuses to run if content already exists
 *   npm run seed -- --force # wipes website content first (never touches staff accounts or enquiries)
 *
 * Creates an admin account from SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD if no users exist.
 */
import 'dotenv/config'

import crypto from 'node:crypto'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { getPayload, type CollectionSlug } from 'payload'

import { slugify } from '../../src/cms/fields/slug'
import config from '../../src/payload.config'

import {
  about,
  caseStudies,
  home,
  hostingPlans,
  jobs,
  legal,
  posts,
  settings,
  testimonials,
} from './data/content'
import { products } from './data/products'
import { pillars } from './data/services'
import { lexical, type Block } from './lexical'

const ASSETS = path.join(path.dirname(fileURLToPath(import.meta.url)), 'assets')
const force = process.argv.includes('--force')

const WIPE: CollectionSlug[] = [
  'services',
  'pillars',
  'case-studies',
  'testimonials',
  'products',
  'hosting-plans',
  'posts',
  'jobs',
  'pages',
  'clients',
  'media',
]

const payload = await getPayload({ config })
const log = (msg: string) => payload.logger.info(`[seed] ${msg}`)

const existing = await payload.count({ collection: 'services' })
if (existing.totalDocs > 0 && !force) {
  log('Content already exists. Run with --force to replace website content.')
  process.exit(0)
}

for (const collection of WIPE) {
  await payload.delete({ collection, where: { id: { exists: true } } })
}
log('Cleared website content')

// --- Admin account --------------------------------------------------------------------------
const users = await payload.count({ collection: 'users' })
if (!users.totalDocs) {
  const email = process.env.SEED_ADMIN_EMAIL ?? 'admin@oqtekal.com'
  const password = process.env.SEED_ADMIN_PASSWORD ?? crypto.randomBytes(12).toString('base64url')
  await payload.create({
    collection: 'users',
    data: { email, password, name: 'Oqtekal Admin', roles: ['admin'] },
  })
  log(`Created admin ${email} / ${password}  ← change this password after first login`)
}

const upload = async (file: string, alt: string) =>
  (await payload.create({ collection: 'media', data: { alt }, filePath: path.join(ASSETS, file) }))
    .id

// --- Products -------------------------------------------------------------------------------
const mpesaLogo = await upload('mpesa.png', 'M-Pesa logo')
const productIds: Record<string, number> = {}
for (const [i, p] of products.entries()) {
  const { partnerLogo, ...rest } = p
  const doc = await payload.create({
    collection: 'products',
    data: {
      ...rest,
      integrations: p.integrations.map((name) => ({ name })),
      partnerLogo: partnerLogo === 'mpesa' ? mpesaLogo : undefined,
      contextImage: existsSync(path.join(ASSETS, 'products', `${p.slug}.jpg`))
        ? await upload(`products/${p.slug}.jpg`, `${p.name} in use — ${p.category.toLowerCase()}`)
        : undefined,
      order: (i + 1) * 10,
      featured: true,
      _status: 'published',
    },
  })
  productIds[p.slug] = doc.id
}
log(`Products: ${products.length}`)

// --- Services -------------------------------------------------------------------------------
const serviceIds: Record<string, number> = {}
for (const [pi, pillar] of pillars.entries()) {
  const p = await payload.create({
    collection: 'pillars',
    data: {
      title: pillar.title,
      slug: pillar.slug,
      summary: pillar.summary,
      intro: pillar.intro,
      order: (pi + 1) * 10,
    },
  })
  for (const [si, s] of pillar.services.entries()) {
    const doc = await payload.create({
      collection: 'services',
      data: {
        title: s.title,
        slug: slugify(s.title),
        pillar: p.id,
        summary: s.summary,
        intro: s.intro,
        deliverables: s.deliverables,
        outcomes: s.outcomes.map((text) => ({ text })),
        technologies: s.technologies.map((name) => ({ name })),
        faqs: s.faqs,
        relatedProducts: (s.relatedProducts ?? []).map((slug) => productIds[slug]).filter(Boolean),
        order: (si + 1) * 10,
        _status: 'published',
      },
    })
    serviceIds[s.title] = doc.id
  }
}
log(`Service groups: ${pillars.length}, services: ${Object.keys(serviceIds).length}`)

const testimonialIds: number[] = []
for (const [i, t] of testimonials.entries()) {
  const doc = await payload.create({
    collection: 'testimonials',
    data: { ...t, order: (i + 1) * 10, isPlaceholder: true },
  })
  testimonialIds.push(doc.id)
}
log('Testimonials')

// --- Case studies ---------------------------------------------------------------------------
for (const [i, c] of caseStudies.entries()) {
  await payload.create({
    collection: 'case-studies',
    data: {
      ...c,
      product: productIds[c.product],
      services: c.services.map((t) => serviceIds[t]).filter(Boolean),
      stack: c.stack.map((name) => ({ name })),
      testimonial: testimonialIds[i],
      order: (i + 1) * 10,
      isPlaceholder: true,
      _status: 'published',
    },
  })
}
log(`Case studies: ${caseStudies.length}`)

// --- Hosting, careers, articles, legal ------------------------------------------------------------
for (const [i, plan] of hostingPlans.entries()) {
  await payload.create({
    collection: 'hosting-plans',
    data: {
      ...plan,
      category: plan.category as 'web',
      features: plan.features.map((label) => ({ label })),
      order: (i + 1) * 10,
    },
  })
}
for (const [i, job] of jobs.entries()) {
  await payload.create({
    collection: 'jobs',
    data: {
      ...job,
      slug: slugify(job.title),
      type: job.type as 'full-time',
      responsibilities: job.responsibilities.map((text) => ({ text })),
      requirements: job.requirements.map((text) => ({ text })),
      order: (i + 1) * 10,
    },
  })
}
const day = 24 * 60 * 60 * 1000
for (const [i, post] of posts.entries()) {
  await payload.create({
    collection: 'posts',
    data: {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      cover: post.cover ? await upload(post.cover[0], post.cover[1]) : undefined,
      category: post.category as 'engineering',
      content: lexical(post.body as Block[]),
      publishedAt: new Date(Date.now() - (i * 9 + 3) * day).toISOString(),
      isPlaceholder: true,
      _status: 'published',
    },
  })
}
for (const [slug, page] of Object.entries(legal)) {
  await payload.create({
    collection: 'pages',
    data: {
      title: page.title,
      slug,
      summary: page.summary,
      content: lexical(page.body as Block[]),
    },
  })
}
log('Hosting plans, careers, articles and legal pages')

// --- Globals --------------------------------------------------------------------------------
await payload.updateGlobal({
  slug: 'site-settings',
  data: {
    ...settings,
    socials: settings.socials.map((s) => ({ ...s, platform: s.platform as 'linkedin' })),
  },
})
await payload.updateGlobal({ slug: 'home-page', data: { ...home, _status: 'published' } })
await payload.updateGlobal({
  slug: 'about-page',
  data: {
    ...about,
    story: about.story.map((text) => ({ text })),
    commitments: about.commitments.map((text) => ({ text })),
    _status: 'published',
  },
})
log('Company details, home and about pages')

log(
  'Done ✓  Restart the site with a fresh cache: docker-compose ... up -d --force-recreate web (prod) or restart `npm run start` after `rm -rf .next/cache/fetch-cache` (local)',
)
process.exit(0)

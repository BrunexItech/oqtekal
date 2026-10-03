import { expect, test } from '@playwright/test'

/**
 * Launch gate: fails while sample content is still published.
 * Run before going live:  LAUNCH_CHECK=1 npx playwright test launch-checklist
 */
test.skip(!process.env.LAUNCH_CHECK, 'Set LAUNCH_CHECK=1 to run the pre-launch content check')

const COLLECTIONS = ['testimonials', 'case-studies', 'posts', 'clients', 'services', 'products']

for (const c of COLLECTIONS) {
  test(`no sample content left in ${c}`, async ({ request }) => {
    const res = await request.get(`/api/${c}?where[isPlaceholder][equals]=true&limit=50&depth=0`)
    const body = (await res.json()) as { totalDocs: number; docs: { id: number }[] }
    expect(body.totalDocs, `${c}: ${body.docs.map((d) => d.id).join(', ')}`).toBe(0)
  })
}

test('company numbers are confirmed', async ({ request }) => {
  const s = (await (await request.get('/api/globals/site-settings')).json()) as {
    statsArePlaceholder?: boolean
    phone?: string
  }
  expect(s.statsArePlaceholder).not.toBe(true)
  expect(s.phone).not.toBe('+254 700 000 000')
})

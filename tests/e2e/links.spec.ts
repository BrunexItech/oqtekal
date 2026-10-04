import { expect, PAGES, test } from './fixtures'

/**
 * No dummy CTAs: every link on every page must lead somewhere real.
 * Internal links must return a page (< 400); in-page anchors must point at an existing element;
 * no link may be empty or "#".
 */
test.describe('links', () => {
  test.skip(({ isMobile }) => isMobile, 'same links on mobile; run once')

  test('every link on every page works', async ({ page, request }) => {
    test.setTimeout(900_000)
    const internal = new Set<string>()
    const problems: string[] = []

    for (const path of PAGES) {
      await page.goto(path)
      const links = await page.$$eval('a', (as) =>
        as.map((a) => ({
          raw: a.getAttribute('href') ?? '',
          abs: (a as HTMLAnchorElement).href,
          text: a.textContent?.trim().slice(0, 40) ?? '',
        })),
      )
      for (const l of links) {
        if (!l.raw || l.raw === '#') {
          problems.push(`${path}: empty/# link "${l.text}"`)
          continue
        }
        const url = new URL(l.abs)
        if (url.origin !== new URL(page.url()).origin) continue
        if (url.hash && url.pathname === new URL(page.url()).pathname) {
          const id = decodeURIComponent(url.hash.slice(1))
          if (id && !(await page.locator(`[id="${id}"]`).count()))
            problems.push(`${path}: anchor #${id} has no target`)
          continue
        }
        internal.add(url.pathname + url.search)
      }
    }

    for (const href of internal) {
      const res = await request.get(href, { maxRedirects: 3 })
      if (res.status() >= 400) problems.push(`${href} → ${res.status()}`)
    }
    expect(problems).toEqual([])
    expect(internal.size).toBeGreaterThan(30)
  })
})

test('contact form sends a real enquiry', async ({ page, isMobile }) => {
  test.skip(isMobile, 'run once')
  await page.goto('/contact')
  await page.getByLabel('Your name').fill('E2E Test Visitor')
  await page.getByLabel('Work email').fill('e2e@example.com')
  await page.getByLabel('How can we help?').fill('Automated test enquiry — please ignore.')
  await page.getByRole('button', { name: /send message/i }).click()
  await expect(page.getByText('Message received.')).toBeVisible({ timeout: 15_000 })
})

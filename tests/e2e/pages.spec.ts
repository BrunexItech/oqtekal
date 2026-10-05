import AxeBuilder from '@axe-core/playwright'

import { expect, PAGES, test } from './fixtures'

// Audit finished pages. Sections fade in as they load, and measuring contrast halfway through a
// fade gives false failures, so wait until opacity has stopped changing everywhere.
const settled = async (page: import('@playwright/test').Page) => {
  const snapshot = () =>
    page.evaluate(() =>
      [...document.querySelectorAll('main *')].map((el) => getComputedStyle(el).opacity).join(),
    )
  let before = await snapshot()
  await expect(async () => {
    await page.waitForTimeout(250)
    const after = await snapshot()
    const stable = after === before
    before = after
    expect(stable, 'fade-ins still running').toBe(true)
  }).toPass({ timeout: 10_000, intervals: [0] })
}

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
})

for (const path of PAGES) {
  test(`${path} renders, has one h1, no horizontal scroll, and passes axe`, async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (e) => errors.push(e.message))

    const res = await page.goto(path)
    expect(res?.status()).toBe(200)
    await expect(page.locator('h1')).toHaveCount(1)

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    )
    expect(overflow, 'page must not scroll horizontally').toBeLessThanOrEqual(1)

    await settled(page)
    const axe = await new AxeBuilder({ page })
      .disableRules(['region'])
      // Product mock-ups are decorative illustrations (aria-hidden), not readable UI.
      .exclude('[data-decorative]')
      .analyze()
    const serious = axe.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')
    expect(serious.map((v) => `${v.id}: ${v.nodes[0]?.target}`)).toEqual([])
    expect(errors).toEqual([])
  })
}

test('unknown pages return a branded 404', async ({ page }) => {
  const res = await page.goto('/this-page-does-not-exist')
  expect(res?.status()).toBe(404)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('does not exist')
})

for (const path of ['/', '/services', '/products/tolkyn', '/hosting', '/contact']) {
  test(`${path} passes axe in dark mode`, async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('oq-theme', 'dark'))
    await page.goto(path)
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
    await settled(page)
    const axe = await new AxeBuilder({ page })
      .disableRules(['region'])
      .exclude('[data-decorative]')
      .analyze()
    const serious = axe.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')
    expect(serious.map((v) => `${v.id}: ${v.nodes[0]?.target}`)).toEqual([])
  })
}

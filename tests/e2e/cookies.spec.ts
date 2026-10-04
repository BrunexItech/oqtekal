import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

/** First-time visitor: no stored cookie choice. */
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem('oq-intro', '1'))
})

test('cookie banner offers a real choice and remembers it', async ({ page, context }) => {
  await page.goto('/')
  const banner = page.getByRole('dialog', { name: /cookies on oqtekal/i })
  await expect(banner).toBeVisible()

  const axe = await new AxeBuilder({ page }).include('[role="dialog"]').analyze()
  expect(axe.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')).toEqual(
    [],
  )

  await banner.getByRole('button', { name: 'Essential only' }).click()
  await expect(banner).toBeHidden()
  const saved = (await context.cookies()).find((c) => c.name === 'oq_consent')
  expect(saved?.value).toBe('essential')

  await page.reload()
  await expect(page.getByRole('dialog', { name: /cookies on oqtekal/i })).toBeHidden()

  // The choice can be changed from the footer at any time.
  await page.getByRole('button', { name: 'Cookie settings' }).click()
  await expect(banner).toBeVisible()
  await banner.getByRole('button', { name: 'Accept all' }).click()
  expect((await context.cookies()).find((c) => c.name === 'oq_consent')?.value).toBe('all')
})

test('cookie banner fits a small phone and does not cover the menu', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'mobile only')
  await page.setViewportSize({ width: 360, height: 740 })
  await page.goto('/')
  const banner = page.getByRole('dialog', { name: /cookies on oqtekal/i })
  const box = await banner.boundingBox()
  expect(box && box.x >= 0 && box.x + box.width <= 360).toBeTruthy()
  await page.getByRole('button', { name: 'Open menu' }).click()
  await expect(page.getByRole('dialog', { name: 'Menu' })).toBeVisible()
})

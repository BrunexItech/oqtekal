import { expect, test } from './fixtures'

test('theme toggle switches and remembers dark mode', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: /switch to dark mode/i }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
})

test('contact form shows validation errors without sending', async ({ page }) => {
  await page.goto('/contact')
  await page.getByRole('button', { name: /send message/i }).click()
  await expect(page.getByRole('alert').first()).toBeVisible()
  await expect(page.getByText('Please enter your name')).toBeVisible()
})

test('hosting order pre-fills the enquiry', async ({ page }) => {
  await page.goto('/hosting')
  await page
    .getByRole('link', { name: /order business/i })
    .first()
    .click()
  await expect(page).toHaveURL(/type=hosting/)
  await expect(page.getByLabel('What is this about?')).toHaveValue('hosting')
})

test.describe('desktop navigation', () => {
  test.skip(({ isMobile }) => isMobile, 'desktop only')

  test('services mega menu opens and closes with Escape', async ({ page }) => {
    await page.goto('/')
    const trigger = page.getByRole('button', { name: 'Services' })
    await trigger.click()
    await expect(trigger).toHaveAttribute('aria-expanded', 'true')
    await expect(page.getByRole('link', { name: 'M-Pesa integration' }).first()).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  test('choosing a service closes the menu immediately and opens the page', async ({ page }) => {
    await page.goto('/')
    const trigger = page.getByRole('button', { name: 'Services' })
    await trigger.click()
    await page.getByRole('link', { name: 'M-Pesa integration' }).first().click()
    await expect(trigger).toHaveAttribute('aria-expanded', 'false', { timeout: 1000 })
    await expect(page).toHaveURL(/\/services\/payments-and-integrations\/m-pesa-integration/)
  })
})

test.describe('mobile navigation', () => {
  test.skip(({ isMobile }) => !isMobile, 'mobile only')

  test('menu opens full screen and navigates', async ({ page }) => {
    await page.goto('/')
    const menuButton = page.getByRole('button', { name: 'Open menu' })
    const box = await menuButton.boundingBox()
    expect(box && box.x + box.width).toBeLessThanOrEqual(page.viewportSize()!.width)
    await menuButton.click()
    const dialog = page.getByRole('dialog', { name: 'Menu' })
    await expect(dialog).toBeVisible()
    await dialog.getByRole('button', { name: 'Products' }).click()
    await dialog.getByRole('link', { name: /Tolkyn/ }).click()
    await expect(page).toHaveURL(/\/products\/tolkyn/)
    await expect(dialog).toBeHidden()
  })
})

test('product showcase tabs switch with the keyboard', async ({ page, isMobile }) => {
  test.skip(isMobile, 'desktop layout')
  await page.goto('/')
  const tabs = page.getByRole('tablist', { name: 'Products' })
  await tabs.getByRole('tab').first().focus()
  await page.keyboard.press('ArrowDown')
  await expect(tabs.getByRole('tab').nth(1)).toHaveAttribute('aria-selected', 'true')
})

test('footer fits small phones', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'mobile only')
  await page.setViewportSize({ width: 360, height: 800 })
  await page.goto('/contact')
  const subscribe = page.locator('footer').getByRole('button', { name: /subscribe/i })
  await subscribe.scrollIntoViewIfNeeded()
  const box = await subscribe.boundingBox()
  expect(box && box.x + box.width).toBeLessThanOrEqual(360)
})

test('hero fits the phone screen and its showcase tabs work', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'mobile only')
  await page.setViewportSize({ width: 360, height: 780 })
  await page.goto('/')
  for (const el of [
    page.locator('h1'),
    page.locator('main').getByRole('link', { name: 'Start a project' }).first(),
  ]) {
    const box = await el.boundingBox()
    expect(
      box && box.x >= 0 && box.x + box.width <= 360,
      'hero content must stay inside the screen',
    ).toBeTruthy()
  }
  const tabs = page.getByRole('group', { name: 'Products shown' })
  await tabs.getByRole('button', { name: 'Schools' }).click()
  await expect(tabs.getByRole('button', { name: 'Schools' })).toHaveAttribute(
    'aria-pressed',
    'true',
  )
})

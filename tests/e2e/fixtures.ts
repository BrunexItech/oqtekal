import { test as base } from '@playwright/test'

/** Skips the first-visit intro animation so tests interact with the page immediately. */
export const test = base.extend({
  page: async ({ page }, use) => {
    await page.addInitScript(() => sessionStorage.setItem('oq-intro', '1'))
    await use(page)
  },
})

export { expect } from '@playwright/test'

export const PAGES = [
  '/',
  '/services',
  '/services/payments-and-integrations',
  '/services/payments-and-integrations/m-pesa-integration',
  '/products',
  '/products/tolkyn',
  '/products/m-pesa-integration',
  '/hosting',
  '/work',
  '/work/retail-group-unified-inbox',
  '/about',
  '/insights',
  '/insights/mpesa-stk-push-reliable-integration',
  '/careers',
  '/contact',
  '/legal/privacy',
  '/legal/terms',
]

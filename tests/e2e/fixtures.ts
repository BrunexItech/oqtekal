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
  ...[
    'software-engineering',
    'mobile-and-product',
    'cloud-and-hosting',
    'payments-and-integrations',
    'business-systems',
    'data-and-automation',
    'security-and-support',
  ].map((slug) => `/services/${slug}`),
  '/services/payments-and-integrations/m-pesa-integration',
  '/products',
  ...[
    'tolkyn',
    'school-management',
    'property-management',
    'erp',
    'sports-management',
    'm-pesa-integration',
    'pos-crm',
    'sacco-management',
    'hospital-clinic',
    'ecommerce',
  ].map((slug) => `/products/${slug}`),
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

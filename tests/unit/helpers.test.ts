import { describe, expect, it } from 'vitest'

import { slugify } from '@/cms/fields/slug'
import { readingTime } from '@/features/insights/readingTime'
import { rateLimit } from '@/lib/rate-limit'
import { formatKes, lowerFirst, whatsappLink } from '@/lib/site'

describe('slugify', () => {
  it.each([
    ['Payments & Integrations', 'payments-and-integrations'],
    ['UI/UX & product design', 'ui-ux-and-product-design'],
    ['  Café — Ndogo!  ', 'cafe-ndogo'],
  ])('%s → %s', (input, out) => expect(slugify(input)).toBe(out))
})

describe('lowerFirst', () => {
  it('lowercases ordinary titles only', () => {
    expect(lowerFirst('Custom software development')).toBe('custom software development')
    expect(lowerFirst('iOS & Android apps')).toBe('iOS & Android apps')
    expect(lowerFirst('UI/UX & product design')).toBe('UI/UX & product design')
    expect(lowerFirst('M-Pesa integration')).toBe('M-Pesa integration')
  })
})

describe('whatsappLink', () => {
  it('keeps digits only and encodes the message', () => {
    expect(whatsappLink('+254 700 000-000', 'Hi there')).toBe(
      'https://wa.me/254700000000?text=Hi%20there',
    )
  })
})

describe('formatKes', () => {
  it('formats shillings without decimals', () => {
    expect(formatKes(12000).replace(/\s/g, ' ')).toMatch(/12,000/)
  })
})

describe('readingTime', () => {
  it('counts words in nested Lexical nodes', () => {
    const doc = { root: { children: [{ children: [{ text: 'word '.repeat(440) }] }] } }
    expect(readingTime(doc)).toBe(2)
    expect(readingTime({})).toBe(1)
  })
})

describe('rateLimit', () => {
  it('blocks after the limit within the window', () => {
    const key = `test-${Math.random()}`
    expect([1, 2, 3].map(() => rateLimit(key, 2, 60_000))).toEqual([true, true, false])
  })
})

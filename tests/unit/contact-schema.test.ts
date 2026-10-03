import { describe, expect, it } from 'vitest'

import { fieldErrors, leadSchema, subscribeSchema } from '@/features/contact/schema'

const valid = {
  type: 'project',
  name: 'Amina Wanjiru',
  email: 'amina@example.co.ke',
  message: 'We need a school fees system with M-Pesa.',
}

describe('leadSchema', () => {
  it('accepts a complete, valid enquiry', () => {
    const r = leadSchema.safeParse({
      ...valid,
      phone: '+254 722 000 000',
      company: 'Savanna Foods',
    })
    expect(r.success).toBe(true)
  })

  it('turns empty optional fields into undefined', () => {
    const r = leadSchema.safeParse({ ...valid, phone: '', company: '   ' })
    expect(r.success && r.data.phone).toBe(undefined)
    expect(r.success && r.data.company).toBe(undefined)
  })

  it('rejects bad email, short message, bad phone and unknown type', () => {
    const r = leadSchema.safeParse({
      type: 'spam',
      name: 'A',
      email: 'not-an-email',
      phone: 'abc',
      message: 'hi',
    })
    expect(r.success).toBe(false)
    if (!r.success) {
      const errors = fieldErrors(r.error)
      expect(Object.keys(errors).sort()).toEqual(['email', 'message', 'name', 'phone', 'type'])
    }
  })

  it('caps message length', () => {
    expect(leadSchema.safeParse({ ...valid, message: 'x'.repeat(5001) }).success).toBe(false)
  })
})

describe('subscribeSchema', () => {
  it('validates email', () => {
    expect(subscribeSchema.safeParse({ email: 'a@b.co' }).success).toBe(true)
    expect(subscribeSchema.safeParse({ email: 'nope' }).success).toBe(false)
  })
})

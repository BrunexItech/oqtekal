/**
 * Sets a new password for an admin account (e.g. when the original was lost).
 *
 *   ADMIN_EMAIL=admin@oqtekal.com NEW_PASSWORD='…' npm run admin:password
 *
 * Creates the account (with the admin role) if it does not exist yet.
 */
import 'dotenv/config'

import { getPayload } from 'payload'

import config from '../../src/payload.config'

const email = (process.env.ADMIN_EMAIL ?? 'admin@oqtekal.com').trim().toLowerCase()
const password = process.env.NEW_PASSWORD ?? ''

if (password.length < 10) {
  console.error('NEW_PASSWORD must be at least 10 characters.')
  process.exit(1)
}

const payload = await getPayload({ config })
const existing = await payload.find({
  collection: 'users',
  where: { email: { equals: email } },
  limit: 1,
})

if (existing.docs[0]) {
  await payload.update({
    collection: 'users',
    id: existing.docs[0].id,
    data: { password, loginAttempts: 0, lockUntil: null },
  })
  console.log(`✓ Password updated for ${email}`)
} else {
  await payload.create({
    collection: 'users',
    data: { email, password, name: 'Oqtekal Admin', roles: ['admin'] },
  })
  console.log(`✓ Admin account created: ${email}`)
}
process.exit(0)

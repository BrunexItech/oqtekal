import type { Access, FieldAccess } from 'payload'

import type { User } from '@/payload-types'

type Role = NonNullable<User['roles']>[number]

const hasRole = (user: unknown, ...roles: Role[]): boolean => {
  const u = user as User | null | undefined
  return Boolean(u?.roles?.some((r) => roles.includes(r)))
}

/** Anyone, including anonymous site visitors. */
export const anyone: Access = () => true

export const isAdmin: Access = ({ req }) => hasRole(req.user, 'admin')
export const isAdminField: FieldAccess = ({ req }) => hasRole(req.user, 'admin')

/** Admins and editors manage site content. */
export const isEditor: Access = ({ req }) => hasRole(req.user, 'admin', 'editor')

/** Admins and sales staff work the leads inbox. */
export const isSales: Access = ({ req }) => hasRole(req.user, 'admin', 'sales')

/** Logged-in staff see drafts; the public only sees published documents. */
export const publishedOrStaff: Access = ({ req }) => {
  if (req.user) return true
  return { _status: { equals: 'published' } }
}

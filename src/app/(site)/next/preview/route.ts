import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'

import { env } from '@/lib/env'
import { getPayloadClient } from '@/lib/payload'

/** Entered from the admin's Preview / Live preview. Only logged-in staff can enable drafts. */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const path = searchParams.get('path') ?? '/'

  if (
    searchParams.get('secret') !== env.PREVIEW_SECRET ||
    !path.startsWith('/') ||
    path.startsWith('//')
  ) {
    return new Response('Invalid preview request', { status: 401 })
  }

  const payload = await getPayloadClient()
  const { user } = await payload.auth({ headers: request.headers })
  if (!user) return new Response('Please log in to the admin first.', { status: 403 })

  ;(await draftMode()).enable()
  redirect(path)
}

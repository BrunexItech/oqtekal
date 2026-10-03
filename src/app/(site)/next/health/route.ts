import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

/** Liveness + database check for Docker and uptime monitors. */
export async function GET() {
  try {
    const payload = await getPayloadClient()
    await payload.count({ collection: 'pillars' })
    return Response.json({ status: 'ok' }, { headers: { 'Cache-Control': 'no-store' } })
  } catch {
    return Response.json(
      { status: 'error' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    )
  }
}

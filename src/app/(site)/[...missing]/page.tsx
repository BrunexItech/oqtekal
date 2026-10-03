import { notFound } from 'next/navigation'

/** Any unknown URL renders the branded 404 inside the site layout (header, footer, theme). */
export default function CatchAll() {
  notFound()
}

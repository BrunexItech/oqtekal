import type { MetadataRoute } from 'next'

import { absoluteUrl, SITE_URL } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  // Keep the staging site out of search results.
  const isStaging = new URL(SITE_URL).hostname.startsWith('staging.')
  return {
    rules: isStaging
      ? [{ userAgent: '*', disallow: '/' }]
      : [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api/', '/next/'] }],
    sitemap: absoluteUrl('/sitemap.xml'),
  }
}

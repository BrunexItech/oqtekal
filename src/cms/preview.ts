/** Builds the URL the admin uses for "Preview" and live preview of a page. */
export const previewUrl = (path: string): string => {
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  const params = new URLSearchParams({ path, secret: process.env.PREVIEW_SECRET ?? '' })
  return `${site}/next/preview?${params.toString()}`
}

/** Shared live-preview settings for page-like collections. */
export const livePreviewFor = (pathOf: (data: Record<string, unknown>) => string) => ({
  url: ({ data }: { data: Record<string, unknown> }) => previewUrl(pathOf(data)),
})

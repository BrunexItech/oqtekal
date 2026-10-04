/** Canonical site URL without a trailing slash. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(
  /\/$/,
  '',
)

export const SITE_NAME = 'Oqtekal'
export const SITE_TAGLINE = 'Engineering what runs business'
export const SITE_DESCRIPTION =
  'Oqtekal is a Nairobi software engineering company. We build custom software, mobile apps, business systems, M-Pesa integrations and reliable hosting for organisations that need technology to work.'

export const absoluteUrl = (path = '/'): string =>
  `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`

export const whatsappLink = (number: string, text?: string): string => {
  const digits = number.replace(/\D/g, '')
  return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ''}`
}

export const formatKes = (amount: number): string =>
  new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    maximumFractionDigits: 0,
  }).format(amount)

/** "Custom software" → "custom software", but leaves "iOS…", "UI/UX…", "M-Pesa…" untouched. */
export const lowerFirst = (s: string): string =>
  /^[A-Z][a-z]/.test(s) && !/^[A-Z][a-z]*-[A-Z]/.test(s) ? s[0]!.toLowerCase() + s.slice(1) : s

/** Keeps brand names like "M-Pesa" from breaking across lines (non-breaking hyphen). */
export const keepTogether = (text: string): string =>
  text.replace(/M-Pesa/g, 'M‑Pesa').replace(/M-PESA/g, 'M‑PESA')

/** "254715274418" → "+254 715 274 418" (Kenyan numbers); other numbers are returned with a leading "+". */
export const formatWhatsapp = (number: string): string => {
  const d = number.replace(/\D/g, '')
  const m = d.match(/^254(\d{3})(\d{3})(\d{3})$/)
  return m ? `+254 ${m[1]} ${m[2]} ${m[3]}` : `+${d}`
}

/** True when the call number and the WhatsApp number are the same line. */
export const sameNumber = (phone: string, whatsapp: string): boolean => {
  const digits = (v: string) => v.replace(/\D/g, '').replace(/^0/, '254')
  return digits(phone) === digits(whatsapp)
}

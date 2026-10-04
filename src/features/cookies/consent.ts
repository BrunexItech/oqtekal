export const CONSENT_COOKIE = 'oq_consent'
export type Consent = 'all' | 'essential'

export const parseConsent = (value: string | undefined | null): Consent | null =>
  value === 'all' || value === 'essential' ? value : null

/** Fired on window to reopen the banner (footer "Cookie settings" link). */
export const OPEN_EVENT = 'oq:cookie-settings'

'use client'

import { OPEN_EVENT } from './consent'

/** Footer control that reopens the cookie banner so visitors can change their choice. */
export const CookieSettingsLink = ({ className }: { className?: string }) => (
  <button
    type="button"
    className={className}
    onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
  >
    Cookie settings
  </button>
)

import { SYMBOL_PATH, SYMBOL_TRANSFORM } from '@/features/brand'

import { IntroCleanup } from './IntroCleanup'

/**
 * First-visit intro: the ribbon draws itself, fills with the brand gradient, then the
 * curtain lifts. Pure CSS, shown only when <html data-intro> was set before paint
 * (first visit this session, motion allowed, not a crawler). The page renders underneath.
 */
export const IntroLoader = () => (
  <>
    <div aria-hidden className="oq-intro">
      <div className="oq-intro__inner">
        <svg viewBox="0 0 100 100" className="oq-intro__mark">
          <defs>
            <linearGradient id="oq-intro-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#2FA8FF" />
              <stop offset="0.55" stopColor="#064DFB" />
              <stop offset="1" stopColor="#14246E" />
            </linearGradient>
          </defs>
          <path
            className="oq-intro__fill"
            transform={SYMBOL_TRANSFORM}
            d={SYMBOL_PATH}
            fill="url(#oq-intro-grad)"
            fillRule="evenodd"
          />
          <path
            className="oq-intro__stroke"
            transform={SYMBOL_TRANSFORM}
            d={SYMBOL_PATH}
            pathLength={1}
            fill="none"
            stroke="#064DFB"
            strokeWidth={22}
            strokeLinejoin="round"
          />
        </svg>
        <p className="oq-intro__word">Oqtekal</p>
      </div>
    </div>
    <IntroCleanup />
  </>
)

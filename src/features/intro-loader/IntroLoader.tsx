import { SYMBOL_PATH, SYMBOL_TRANSFORM } from '@/features/brand'

import { IntroCleanup } from './IntroCleanup'

const WORD = 'OQTEKAL'

/**
 * First-visit intro (≈2s): a progress ring sweeps around the ribbon while it draws itself and
 * fills with the brand gradient, the wordmark rises letter by letter, then a split curtain opens
 * onto the page. Pure CSS, shown only when <html data-intro> was set before paint (first visit
 * this session, motion allowed, not a crawler). The real page renders underneath the whole time.
 */
export const IntroLoader = () => (
  <>
    <div aria-hidden className="oq-intro">
      <div className="oq-intro__panel oq-intro__panel--top" />
      <div className="oq-intro__panel oq-intro__panel--bottom" />
      <div className="oq-intro__stage">
        <div className="oq-intro__emblem">
          <svg viewBox="0 0 120 120" className="oq-intro__ring">
            <defs>
              <linearGradient id="oq-ring" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#2FA8FF" />
                <stop offset="1" stopColor="#064DFB" />
              </linearGradient>
            </defs>
            <circle cx="60" cy="60" r="57" className="oq-intro__orbit" />
            <circle cx="60" cy="60" r="50" className="oq-intro__track" />
            <circle cx="60" cy="60" r="50" pathLength={1} className="oq-intro__progress" />
          </svg>
          <svg viewBox="0 0 100 100" className="oq-intro__mark">
            <defs>
              <linearGradient id="oq-intro-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#2FA8FF" />
                <stop offset="0.55" stopColor="#064DFB" />
                <stop offset="1" stopColor="#3b5bdb" />
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
              stroke="#8fd3ff"
              strokeWidth={18}
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="oq-intro__word">
          {WORD.split('').map((ch, i) => (
            <span key={i} style={{ animationDelay: `${0.45 + i * 0.06}s` }}>
              {ch}
            </span>
          ))}
        </p>
        <p className="oq-intro__tag">Engineering what runs business</p>
      </div>
    </div>
    <IntroCleanup />
  </>
)

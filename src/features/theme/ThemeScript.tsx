/**
 * Runs before first paint: decides whether the intro animation plays (first visit this session,
 * motion allowed, not a crawler). The site has one fixed look, so there is no theme to detect.
 */
const script = `(()=>{try{if(!sessionStorage.getItem('oq-intro')&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches&&!/bot|crawl|spider|lighthouse/i.test(navigator.userAgent)){document.documentElement.dataset.intro='1';sessionStorage.setItem('oq-intro','1')}}catch(e){}})()`

export const ThemeScript = () => <script dangerouslySetInnerHTML={{ __html: script }} />

/**
 * Runs before first paint: applies the saved/system theme (no flash) and decides
 * whether the intro animation plays (first visit this session, motion allowed).
 */
const script = `(()=>{try{var d=document.documentElement,s=localStorage.getItem('oq-theme'),m=window.matchMedia('(prefers-color-scheme: dark)').matches;d.dataset.theme=s==='dark'||s==='light'?s:(m?'dark':'light');if(!sessionStorage.getItem('oq-intro')&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches&&!/bot|crawl|spider|lighthouse/i.test(navigator.userAgent)){d.dataset.intro='1';sessionStorage.setItem('oq-intro','1')}}catch(e){}})()`

export const ThemeScript = () => <script dangerouslySetInnerHTML={{ __html: script }} />

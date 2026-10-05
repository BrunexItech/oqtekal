export type NavService = { title: string; href: string }
export type NavPillar = { title: string; href: string; summary: string; services: NavService[] }
export type NavProduct = { name: string; href: string; tagline: string; category: string }

export type NavData = {
  pillars: NavPillar[]
  products: NavProduct[]
  /** True once at least one real case study is published; the Work page is hidden until then. */
  hasWork: boolean
}

export const COMPANY_LINKS = [
  { title: 'About Oqtekal', href: '/about', text: 'Who we are and how we work' },
  { title: 'Insights', href: '/insights', text: 'Notes on building software that lasts' },
  { title: 'Careers', href: '/careers', text: 'Build with us' },
  { title: 'Contact', href: '/contact', text: 'Start a conversation' },
] as const

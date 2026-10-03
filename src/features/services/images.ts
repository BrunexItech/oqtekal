import type { HeaderImage } from '@/design-system'

/** One photograph per service group, used on the group page and every service inside it. */
const IMAGES: Record<string, HeaderImage> = {
  'software-engineering': { src: '/images/code-macbook.jpg', alt: 'Code open on a laptop' },
  'mobile-and-product': { src: '/images/phone-hands.jpg', alt: 'Hands holding a smartphone' },
  'cloud-and-hosting': { src: '/images/server-rack.jpg', alt: 'Server racks in a data centre' },
  'payments-and-integrations': {
    src: '/images/phone-cash.jpg',
    alt: 'A smartphone showing a mobile-money app beside Kenyan shilling notes',
  },
  'business-systems': { src: '/images/warehouse.jpg', alt: 'Warehouse shelves stacked with stock' },
  'data-and-automation': { src: '/images/monitoring.jpg', alt: 'A live analytics dashboard' },
  'security-and-support': { src: '/images/server-green.jpg', alt: 'Servers lit in green' },
}

const FALLBACK: HeaderImage = {
  src: '/images/whiteboard.jpg',
  alt: 'Planning a system on a whiteboard',
}

export const pillarImage = (slug: string): HeaderImage => IMAGES[slug] ?? FALLBACK

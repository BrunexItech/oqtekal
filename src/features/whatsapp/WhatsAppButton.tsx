import { BrandIcon } from '@/design-system'
import { whatsappLink } from '@/lib/site'

/** Floating "chat on WhatsApp" button — the way most Kenyan clients prefer to start. */
export const WhatsAppButton = ({ number }: { number: string }) => (
  <a
    href={whatsappLink(number, 'Hello Oqtekal, I would like to talk about a project.')}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with Oqtekal on WhatsApp"
    className="group fixed right-4 bottom-[calc(var(--cookie-bar,0px)+1rem)] z-40 flex items-center gap-2 rounded-full bg-[#25D366] p-3.5 text-white shadow-[0_12px_30px_-10px_rgb(37_211_102/0.7)] transition-[bottom,transform] duration-300 ease-out-expo hover:scale-105 sm:right-6 sm:bottom-[calc(var(--cookie-bar,0px)+1.5rem)]"
  >
    <BrandIcon name="whatsapp" className="size-6" />
    <span className="hidden max-w-0 overflow-hidden text-sm font-medium whitespace-nowrap transition-[max-width] duration-500 ease-out-expo group-hover:max-w-40 md:inline">
      Chat with us
    </span>
  </a>
)

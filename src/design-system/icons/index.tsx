/**
 * The only icons used on the site. Functional UI glyphs come from one set (Lucide, 1.5 stroke)
 * so they stay visually consistent; brand marks come from Simple Icons.
 */
import type { LucideProps } from 'lucide-react'
import {
  ArrowRight as LArrowRight,
  ArrowUpRight as LArrowUpRight,
  Check as LCheck,
  ChevronDown as LChevronDown,
  Mail as LMail,
  MapPin as LMapPin,
  Menu as LMenu,
  Minus as LMinus,
  Moon as LMoon,
  Phone as LPhone,
  Plus as LPlus,
  Clock as LClock,
  Sun as LSun,
  X as LX,
} from 'lucide-react'

const withDefaults = (Icon: React.ComponentType<LucideProps>) => {
  const Wrapped = (props: LucideProps) => <Icon strokeWidth={1.5} aria-hidden {...props} />
  Wrapped.displayName = Icon.displayName
  return Wrapped
}

export const ArrowRight = withDefaults(LArrowRight)
export const ArrowUpRight = withDefaults(LArrowUpRight)
export const Check = withDefaults(LCheck)
export const ChevronDown = withDefaults(LChevronDown)
export const Clock = withDefaults(LClock)
export const Close = withDefaults(LX)
export const Mail = withDefaults(LMail)
export const MapPin = withDefaults(LMapPin)
export const Menu = withDefaults(LMenu)
export const Minus = withDefaults(LMinus)
export const Moon = withDefaults(LMoon)
export const Phone = withDefaults(LPhone)
export const Plus = withDefaults(LPlus)
export const Sun = withDefaults(LSun)

export { BrandIcon, type BrandName } from './brands'

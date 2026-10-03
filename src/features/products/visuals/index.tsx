import type { Product } from '@/payload-types'

import {
  CommsVisual,
  ErpVisual,
  PaymentsVisual,
  PosVisual,
  PropertyVisual,
  SchoolVisual,
  SportsVisual,
} from './Visuals'

const VISUALS: Record<Product['visual'], () => React.JSX.Element> = {
  comms: CommsVisual,
  school: SchoolVisual,
  property: PropertyVisual,
  erp: ErpVisual,
  sports: SportsVisual,
  payments: PaymentsVisual,
  pos: PosVisual,
}

/** Built-in illustration for a product type. */
export const ProductVisual = ({ visual }: { visual: Product['visual'] }) => {
  const Visual = VISUALS[visual] ?? CommsVisual
  return <Visual />
}

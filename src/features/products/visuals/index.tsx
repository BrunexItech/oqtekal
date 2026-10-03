import type { Product } from '@/payload-types'

import {
  CommsVisual,
  ErpVisual,
  HealthVisual,
  PaymentsVisual,
  PosVisual,
  PropertyVisual,
  SaccoVisual,
  SchoolVisual,
  SportsVisual,
  StoreVisual,
} from './Visuals'

const VISUALS: Record<Product['visual'], () => React.JSX.Element> = {
  comms: CommsVisual,
  school: SchoolVisual,
  property: PropertyVisual,
  erp: ErpVisual,
  sports: SportsVisual,
  payments: PaymentsVisual,
  pos: PosVisual,
  health: HealthVisual,
  sacco: SaccoVisual,
  store: StoreVisual,
}

/** Built-in illustration for a product type. */
export const ProductVisual = ({ visual }: { visual: Product['visual'] }) => {
  const Visual = VISUALS[visual] ?? CommsVisual
  return <Visual />
}

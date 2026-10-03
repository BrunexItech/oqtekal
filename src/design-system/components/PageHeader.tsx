import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

import { Container } from '../primitives/Container'
import { Eyebrow } from '../primitives/Eyebrow'
import { Breadcrumbs, type Crumb } from './Breadcrumbs'
import { keepTogether } from '@/lib/site'

type Props = {
  crumbs?: Crumb[]
  eyebrow?: string | null
  title: ReactNode
  lead?: ReactNode
  actions?: ReactNode
  aside?: ReactNode
  className?: string
}

/** Standard top of every inner page: breadcrumbs, eyebrow, title, lead and actions. */
export const PageHeader = ({ crumbs, eyebrow, title, lead, actions, aside, className }: Props) => (
  <header className={cn('relative isolate overflow-hidden border-b border-line', className)}>
    <div
      aria-hidden
      className="absolute inset-0 -z-10 grid-lines [mask-image:radial-gradient(ellipse_80%_70%_at_85%_0%,black,transparent_70%)]"
    />
    <Container className="pt-8 pb-14 md:pt-10 md:pb-20">
      {crumbs?.length ? <Breadcrumbs items={crumbs} className="mb-10 md:mb-14" /> : null}
      <div
        className={cn('grid gap-10', aside && 'lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-16')}
      >
        <div className="max-w-4xl">
          {eyebrow ? <Eyebrow className="mb-6">{eyebrow}</Eyebrow> : null}
          <h1 className="text-display">
            {typeof title === 'string' ? keepTogether(title) : title}
          </h1>
          {lead ? <div className="mt-6 max-w-2xl text-lead text-muted">{lead}</div> : null}
          {actions ? <div className="mt-9 flex flex-col gap-3 xs:flex-row">{actions}</div> : null}
        </div>
        {aside ? <div>{aside}</div> : null}
      </div>
    </Container>
  </header>
)

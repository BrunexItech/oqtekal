import Link from 'next/link'

import { cn } from '@/lib/cn'

export type Crumb = { name: string; path: string }

export const Breadcrumbs = ({ items, className }: { items: Crumb[]; className?: string }) => (
  <nav aria-label="Breadcrumb" className={cn('text-sm', className)}>
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-muted">
      {items.map((c, i) => {
        const last = i === items.length - 1
        return (
          <li key={c.path} className="flex items-center gap-2">
            {last ? (
              <span aria-current="page" className="text-fg">
                {c.name}
              </span>
            ) : (
              <>
                <Link href={c.path} className="transition-colors hover:text-fg">
                  {c.name}
                </Link>
                <span aria-hidden className="text-subtle">
                  /
                </span>
              </>
            )}
          </li>
        )
      })}
    </ol>
  </nav>
)

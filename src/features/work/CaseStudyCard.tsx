import Link from 'next/link'

import { ArrowUpRight } from '@/design-system'
import { CmsImage } from '@/features/media'
import { SampleBadge } from '@/features/placeholder'
import { ProductVisual } from '@/features/products'
import { cn } from '@/lib/cn'
import { asMedia } from '@/lib/media'
import type { CaseStudy } from '@/payload-types'

export const CaseCover = ({
  study,
  priority,
  sizes,
}: {
  study: CaseStudy
  priority?: boolean
  sizes?: string
}) => {
  const cover = asMedia(study.cover)
  if (cover) return <CmsImage media={cover} priority={priority} sizes={sizes} />
  const visual = typeof study.product === 'object' && study.product ? study.product.visual : 'erp'
  return (
    <div className="absolute inset-0 grid place-items-center bg-[linear-gradient(135deg,var(--brand-600),var(--brand-900))] p-[7%]">
      <div
        aria-hidden
        className="absolute inset-0 grid-lines opacity-30 [--grid-line:rgb(255_255_255/0.08)]"
      />
      <div className="relative w-full max-w-[44rem] translate-y-[6%]">
        <ProductVisual visual={visual} />
      </div>
    </div>
  )
}

export const CaseStudyCard = ({ study, large = false }: { study: CaseStudy; large?: boolean }) => (
  <Link href={`/work/${study.slug}`} className="group flex h-full flex-col">
    <div
      className={cn(
        'relative overflow-hidden rounded-[var(--radius-panel)] border border-line',
        large ? 'aspect-[16/10] md:aspect-[16/8]' : 'aspect-[16/11]',
      )}
    >
      <div className="absolute inset-0 transition-transform duration-1000 ease-out-expo group-hover:scale-[1.03]">
        <CaseCover
          study={study}
          sizes={large ? '(min-width: 1024px) 80vw, 100vw' : '(min-width: 768px) 45vw, 100vw'}
        />
      </div>
    </div>
    <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
      <span>{study.client}</span>
      <span aria-hidden>·</span>
      <span>{study.industry}</span>
      <SampleBadge show={study.isPlaceholder} />
    </div>
    <h3 className="mt-2 flex items-start gap-2 font-display text-2xl leading-tight font-semibold tracking-tight md:text-[1.75rem]">
      <span className="transition-colors group-hover:text-accent">{study.title}</span>
      <ArrowUpRight className="mt-1 size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </h3>
    {study.results?.length ? (
      <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
        {study.results.slice(0, 3).map((r) => (
          <div key={r.id ?? r.label} className="flex flex-col-reverse">
            <dt className="text-sm text-muted">{r.label}</dt>
            <dd className="font-display text-xl font-semibold tracking-tight text-accent">
              {r.value}
            </dd>
          </div>
        ))}
      </dl>
    ) : null}
  </Link>
)

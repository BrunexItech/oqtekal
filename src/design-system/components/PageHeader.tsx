import Image from 'next/image'
import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'
import { keepTogether } from '@/lib/site'

import { Container } from '../primitives/Container'
import { Eyebrow } from '../primitives/Eyebrow'
import { Breadcrumbs, type Crumb } from './Breadcrumbs'
import { ImageLoading } from './Spinner'

export type HeaderImage = { src: string; alt: string; position?: string; caption?: ReactNode }

type Props = {
  crumbs?: Crumb[]
  eyebrow?: string | null
  title: ReactNode
  lead?: ReactNode
  actions?: ReactNode
  aside?: ReactNode
  /**
   * `cinematic`: full-bleed photo behind the text. `split`: text beside a framed photo.
   * `art`: the same dark stage as cinematic, with brand artwork (pass it as `art`) instead of a photo.
   */
  variant?: 'default' | 'cinematic' | 'split' | 'art'
  image?: HeaderImage
  art?: ReactNode
  className?: string
}

const Title = ({ title }: { title: ReactNode }) => (
  <h1 className="text-display">{typeof title === 'string' ? keepTogether(title) : title}</h1>
)

/** Top of every inner page. Each page picks the variant and photo that tells its story. */
export const PageHeader = ({
  crumbs,
  eyebrow,
  title,
  lead,
  actions,
  aside,
  variant = 'default',
  image,
  art,
  className,
}: Props) => {
  if ((variant === 'cinematic' && image) || (variant === 'art' && art)) {
    return (
      <header className={cn('relative isolate overflow-hidden bg-ink text-paper', className)}>
        {variant === 'cinematic' && image ? (
          <>
            <ImageLoading tone="dark" className="-z-20" />
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="100vw"
              className="-z-20 animate-[slow-zoom_24s_ease-out_both] object-cover motion-reduce:animate-none"
              style={{ objectPosition: image.position ?? 'center' }}
            />
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(7_10_18/0.92)_0%,rgb(7_10_18/0.72)_45%,rgb(7_10_18/0.25)_100%),linear-gradient(0deg,rgb(7_10_18/0.85)_0%,transparent_45%)]"
            />
          </>
        ) : (
          <div aria-hidden className="absolute inset-0 -z-10">
            {art}
            {/* Keeps the text side calm on narrow screens, where the artwork sits behind it. */}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(11_15_25/0.86)_0%,rgb(11_15_25/0.55)_55%,transparent_100%)] lg:bg-[linear-gradient(90deg,rgb(11_15_25/0.7)_0%,transparent_55%)]" />
          </div>
        )}
        <Container className="flex min-h-[min(60svh,35rem)] flex-col pt-8 pb-14 md:pt-10 md:pb-20">
          {crumbs?.length ? (
            <Breadcrumbs
              items={crumbs}
              className="[&_*]:text-paper/70 [&_[aria-current]]:text-paper"
            />
          ) : null}
          <div className="mt-auto max-w-3xl pt-16">
            {eyebrow ? <Eyebrow className="mb-6 text-paper/70">{eyebrow}</Eyebrow> : null}
            <Title title={title} />
            {lead ? <div className="mt-6 max-w-2xl text-lead text-paper/75">{lead}</div> : null}
            {actions ? <div className="mt-9 flex flex-col gap-3 xs:flex-row">{actions}</div> : null}
          </div>
        </Container>
      </header>
    )
  }

  if (variant === 'split' && image) {
    return (
      <header className={cn('relative isolate overflow-hidden', className)}>
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(var(--line-strong)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_70%_at_20%_30%,black,transparent_75%)] [background-size:22px_22px] opacity-50"
        />
        <Container className="pt-8 pb-14 md:pt-10 md:pb-20">
          {crumbs?.length ? <Breadcrumbs items={crumbs} className="mb-10 md:mb-14" /> : null}
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
            <div>
              {eyebrow ? <Eyebrow className="mb-6">{eyebrow}</Eyebrow> : null}
              <Title title={title} />
              {lead ? <div className="mt-6 max-w-xl text-lead text-muted">{lead}</div> : null}
              {actions ? (
                <div className="mt-9 flex flex-col gap-3 xs:flex-row">{actions}</div>
              ) : null}
              {aside ? <div className="mt-10">{aside}</div> : null}
            </div>
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-panel)] shadow-[var(--shadow-float)]">
                <ImageLoading />
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover transition-transform duration-[1.5s] ease-out-expo hover:scale-[1.03]"
                  style={{ objectPosition: image.position ?? 'center' }}
                />
              </div>
              {image.caption ? (
                <div className="absolute -bottom-6 left-4 max-w-[80%] rounded-2xl border border-line bg-surface/95 px-5 py-4 shadow-[var(--shadow-float)] backdrop-blur sm:left-8">
                  {image.caption}
                </div>
              ) : null}
            </div>
          </div>
        </Container>
      </header>
    )
  }

  return (
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
            <Title title={title} />
            {lead ? <div className="mt-6 max-w-2xl text-lead text-muted">{lead}</div> : null}
            {actions ? <div className="mt-9 flex flex-col gap-3 xs:flex-row">{actions}</div> : null}
          </div>
          {aside ? <div>{aside}</div> : null}
        </div>
      </Container>
    </header>
  )
}

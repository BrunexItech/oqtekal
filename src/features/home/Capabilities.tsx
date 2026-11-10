import Image from 'next/image'
import Link from 'next/link'

import { ArrowRight, ArrowUpRight, ImageLoading } from '@/design-system'
import { pillarImage, type PillarWithServices } from '@/features/services'

/** Every service area as a photo tile, two short rows, ending with a link to the full list. */
export const Capabilities = ({ pillars }: { pillars: PillarWithServices[] }) => (
  <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
    {pillars.map((p) => {
      const photo = pillarImage(p.slug)
      return (
        <li key={p.id}>
          <Link
            href={`/services/${p.slug}`}
            className="group relative isolate flex aspect-[4/3.4] flex-col justify-end overflow-hidden rounded-[var(--radius-card)] bg-ink p-4 text-paper sm:aspect-[4/3] sm:p-5"
          >
            <ImageLoading tone="dark" className="-z-20" />
            <Image
              src={photo.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 24vw, 48vw"
              className="-z-20 object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.05]"
            />
            <span
              aria-hidden
              className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(11_15_25/0.05)_30%,rgb(11_15_25/0.85)_100%)]"
            />
            <ArrowUpRight className="absolute top-4 right-4 size-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="font-display text-[1.05rem] leading-snug font-semibold tracking-tight sm:text-lg">
              {p.title}
            </span>
            <span className="mt-1 text-sm text-paper/70">{p.serviceList.length} services</span>
          </Link>
        </li>
      )
    })}
    <li>
      <Link
        href="/services"
        className="group flex aspect-[4/3.4] flex-col justify-between rounded-[var(--radius-card)] bg-brand-600 p-4 text-white sm:aspect-[4/3] sm:p-5"
      >
        <span className="text-sm text-white/80">
          {pillars.reduce((n, p) => n + p.serviceList.length, 0)} services in total
        </span>
        <span className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight">
          See all services
          <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </Link>
    </li>
  </ul>
)

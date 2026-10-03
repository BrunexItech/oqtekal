'use client'

import Image from 'next/image'
import { useId, useState } from 'react'

import { BrandIcon, Mail, Plus } from '@/design-system'
import { SampleBadge } from '@/features/placeholder'
import { cn } from '@/lib/cn'
import type { Media, TeamMember } from '@/payload-types'

const initials = (name: string) =>
  name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')

/**
 * Portrait card. Photos are graded to a consistent duotone (so mismatched shoots still look
 * like one set) and return to colour on hover. "+" reveals the bio — works for touch and keyboard.
 */
export const TeamCard = ({ member, index }: { member: TeamMember; index: number }) => {
  const [open, setOpen] = useState(false)
  const bioId = useId()
  const photo = member.photo && typeof member.photo === 'object' ? (member.photo as Media) : null
  const links = member.links ?? {}

  return (
    <article className="group relative flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-panel)] bg-surface-2">
        {photo?.url ? (
          <Image
            src={photo.url}
            alt={photo.alt || `Portrait of ${member.name}`}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 85vw"
            className="object-cover contrast-[1.05] grayscale transition-[filter,transform] duration-700 ease-out-expo group-hover:scale-[1.03] group-hover:grayscale-0"
            style={{ objectPosition: `${photo.focalX ?? 50}% ${photo.focalY ?? 30}%` }}
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-[linear-gradient(140deg,var(--brand-600),var(--brand-900))] font-display text-7xl font-semibold text-white/90">
            {initials(member.name)}
          </div>
        )}
        {/* Brand tint that lifts on hover */}
        <div
          aria-hidden
          className="absolute inset-0 bg-brand-600/20 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0"
        />
        <span className="absolute top-5 left-5 rounded-full bg-black/35 px-2.5 py-1 text-label text-white backdrop-blur-sm">
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Bio panel */}
        <div
          id={bioId}
          className={cn(
            'absolute inset-x-3 bottom-3 rounded-[1.25rem] bg-ink/88 p-5 text-paper backdrop-blur-md transition-[opacity,transform] duration-500 ease-out-expo sm:p-6',
            open ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
          )}
          aria-hidden={!open}
        >
          <p className="text-[0.95rem] leading-relaxed text-paper/85">{member.bio}</p>
          <div className="mt-4 flex gap-2">
            {links.linkedin ? (
              <a
                href={links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={open ? 0 : -1}
                aria-label={`${member.name} on LinkedIn`}
                className="grid size-9 place-items-center rounded-full border border-white/20 hover:border-white/60"
              >
                <BrandIcon name="linkedin" className="size-4" />
              </a>
            ) : null}
            {links.x ? (
              <a
                href={links.x}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={open ? 0 : -1}
                aria-label={`${member.name} on X`}
                className="grid size-9 place-items-center rounded-full border border-white/20 hover:border-white/60"
              >
                <BrandIcon name="x" className="size-4" />
              </a>
            ) : null}
            {links.github ? (
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={open ? 0 : -1}
                aria-label={`${member.name} on GitHub`}
                className="grid size-9 place-items-center rounded-full border border-white/20 hover:border-white/60"
              >
                <BrandIcon name="github" className="size-4" />
              </a>
            ) : null}
            {links.email ? (
              <a
                href={`mailto:${links.email}`}
                tabIndex={open ? 0 : -1}
                aria-label={`Email ${member.name}`}
                className="grid size-9 place-items-center rounded-full border border-white/20 hover:border-white/60"
              >
                <Mail className="size-4" />
              </a>
            ) : null}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={bioId}
          aria-label={open ? `Hide ${member.name}'s bio` : `Read ${member.name}'s bio`}
          className={cn(
            'absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-white text-ink shadow-lg transition-transform duration-500 ease-out-expo hover:scale-105',
            open && 'rotate-45',
          )}
        >
          <Plus className="size-5" />
        </button>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="flex flex-wrap items-center gap-2 font-display text-xl font-semibold tracking-tight">
            {member.name}
            <SampleBadge show={member.isPlaceholder} className="text-muted" />
          </h3>
          <p className="text-accent">{member.role}</p>
        </div>
      </div>
      <p className="mt-2 text-muted">{member.focus}</p>
      {member.expertise?.length ? (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {member.expertise.map((e) => (
            <li
              key={e.id ?? e.label}
              className="rounded-full border border-line px-2.5 py-1 text-xs text-muted"
            >
              {e.label}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  )
}

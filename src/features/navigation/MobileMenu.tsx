'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { ArrowRight, ButtonLink, Close, Plus } from '@/design-system'
import { Logo } from '@/features/brand'
import { cn } from '@/lib/cn'

import { COMPANY_LINKS, type NavData } from './types'

type Group = 'services' | 'products' | 'company'

/** Full-screen menu for phones and tablets. */
export const MobileMenu = ({
  nav,
  open,
  onClose,
}: {
  nav: NavData
  open: boolean
  onClose: () => void
}) => {
  const [group, setGroup] = useState<Group | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  // Lock page scroll, move focus in, close on Escape, keep Tab inside the dialog.
  useEffect(() => {
    if (!open) return
    const previous = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key !== 'Tab' || !panelRef.current) return
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      )
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last?.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
      previous?.focus()
    }
  }, [open, onClose])

  if (!open) return null

  const toggle = (g: Group) => setGroup((cur) => (cur === g ? null : g))

  const groupButton = (g: Group, label: string) => (
    <button
      type="button"
      onClick={() => toggle(g)}
      aria-expanded={group === g}
      className="flex w-full items-center justify-between py-4 text-left font-display text-2xl font-semibold tracking-tight"
    >
      {label}
      <Plus
        className={cn(
          'size-5 transition-transform duration-300 ease-out-expo',
          group === g && 'rotate-45',
        )}
      />
    </button>
  )

  // Portalled to <body>: the header's backdrop-filter would otherwise trap `position: fixed`.
  return createPortal(
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-[70] flex animate-[menu-in_0.35s_cubic-bezier(0.22,1,0.36,1)] flex-col bg-bg lg:hidden"
    >
      <div className="container-x flex h-[4.25rem] shrink-0 items-center justify-between md:h-[4.75rem]">
        <Link href="/" onClick={onClose} aria-label="Oqtekal home">
          <Logo className="h-8" />
        </Link>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="grid size-10 place-items-center rounded-full border border-line-strong"
        >
          <Close className="size-5" />
        </button>
      </div>

      <nav aria-label="Mobile" className="container-x flex-1 overflow-y-auto pb-8">
        <ul className="divide-y divide-line border-b border-line">
          <li>
            {groupButton('services', 'Services')}
            {group === 'services' ? (
              <ul className="space-y-5 pb-6">
                {nav.pillars.map((p, i) => (
                  <li key={p.href}>
                    <Link
                      href={p.href}
                      onClick={onClose}
                      className="flex items-baseline gap-2.5 font-medium"
                    >
                      <span className="text-label text-accent">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {p.title}
                    </Link>
                    <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 pl-8">
                      {p.services.map((s) => (
                        <li key={s.href}>
                          <Link href={s.href} onClick={onClose} className="text-sm text-muted">
                            {s.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
                <li>
                  <Link
                    href="/services"
                    onClick={onClose}
                    className="text-sm font-medium text-accent"
                  >
                    All services →
                  </Link>
                </li>
              </ul>
            ) : null}
          </li>
          <li>
            {groupButton('products', 'Products')}
            {group === 'products' ? (
              <ul className="grid gap-1 pb-6 sm:grid-cols-2">
                {nav.products.map((p) => (
                  <li key={p.href}>
                    <Link href={p.href} onClick={onClose} className="block rounded-xl py-2.5">
                      <span className="block font-medium">{p.name}</span>
                      <span className="block text-sm text-muted">{p.tagline}</span>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/products"
                    onClick={onClose}
                    className="block py-2.5 text-sm font-medium text-accent"
                  >
                    All products →
                  </Link>
                </li>
              </ul>
            ) : null}
          </li>
          {[
            { title: 'Hosting', href: '/hosting' },
            { title: 'Work', href: '/work' },
            { title: 'Insights', href: '/insights' },
          ].map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={onClose}
                className="block py-4 font-display text-2xl font-semibold tracking-tight"
              >
                {l.title}
              </Link>
            </li>
          ))}
          <li>
            {groupButton('company', 'Company')}
            {group === 'company' ? (
              <ul className="space-y-1 pb-6">
                {COMPANY_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} onClick={onClose} className="block py-2 font-medium">
                      {l.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        </ul>

        <div className="mt-8 flex flex-col gap-3">
          <ButtonLink
            href="/contact"
            size="lg"
            onClick={onClose}
            icon={<ArrowRight className="size-4" />}
          >
            Start a project
          </ButtonLink>
          <ButtonLink href="/hosting" size="lg" variant="secondary" onClick={onClose}>
            View hosting plans
          </ButtonLink>
        </div>
      </nav>
    </div>,
    document.body,
  )
}

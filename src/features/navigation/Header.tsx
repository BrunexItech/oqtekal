'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useId, useRef, useState } from 'react'

import { ArrowRight, ArrowUpRight, ButtonLink, ChevronDown } from '@/design-system'
import { LogoLink } from '@/features/brand'
import { ThemeToggle } from '@/features/theme'
import { cn } from '@/lib/cn'

import { MobileMenu } from './MobileMenu'
import { COMPANY_LINKS, type NavData } from './types'

type PanelId = 'services' | 'products' | 'company'

const TOP_LINKS = [
  { title: 'Hosting', href: '/hosting' },
  { title: 'Work', href: '/work' },
  { title: 'Insights', href: '/insights' },
] as const

export const Header = ({ nav }: { nav: NavData }) => {
  const pathname = usePathname()
  const [open, setOpen] = useState<PanelId | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const baseId = useId()

  // Solid background once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close everything on navigation (adjusting state during render, not in an effect).
  const [lastPath, setLastPath] = useState(pathname)
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setOpen(null)
    setMobileOpen(false)
  }

  // Escape and outside-click close the open panel.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null)
    const onClick = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpen(null)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [open])

  // Hover intent for mouse users; clicks/keyboard toggle directly.
  const hoverOpen = useCallback((id: PanelId) => {
    clearTimeout(closeTimer.current)
    setOpen(id)
  }, [])
  const hoverClose = useCallback(() => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpen(null), 140)
  }, [])

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  const trigger = (id: PanelId, label: string, href: string) => (
    <li onMouseEnter={() => hoverOpen(id)} onMouseLeave={hoverClose}>
      <button
        type="button"
        aria-expanded={open === id}
        aria-controls={`${baseId}-${id}`}
        // Mouse: hover already opened it, so a click keeps it open. Keyboard (detail 0): toggle.
        onClick={(e) => setOpen((cur) => (e.detail === 0 && cur === id ? null : id))}
        className={cn(
          'inline-flex h-10 items-center gap-1 rounded-full px-3.5 text-[0.94rem] font-medium transition-colors hover:text-fg',
          open === id || isActive(href) ? 'text-fg' : 'text-muted',
        )}
      >
        {label}
        <ChevronDown
          className={cn(
            'size-4 transition-transform duration-300 ease-out-expo',
            open === id && 'rotate-180',
          )}
        />
      </button>
    </li>
  )

  const panelShell = (id: PanelId, children: React.ReactNode) => (
    <div
      id={`${baseId}-${id}`}
      hidden={open !== id}
      onMouseEnter={() => hoverOpen(id)}
      onMouseLeave={hoverClose}
      // Choosing a link closes the menu at once; the progress bar shows the next page loading.
      onClick={(e) => {
        if ((e.target as Element).closest('a')) {
          clearTimeout(closeTimer.current)
          setOpen(null)
        }
      }}
      className="absolute inset-x-0 top-full hidden lg:block"
    >
      <div className="container-x">
        <div className="animate-[panel-in_0.32s_cubic-bezier(0.22,1,0.36,1)] overflow-hidden rounded-[1.75rem] border border-line bg-surface shadow-[var(--shadow-float)]">
          {children}
        </div>
      </div>
    </div>
  )

  return (
    <header
      ref={headerRef}
      className={cn(
        'sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300',
        scrolled || open
          ? 'border-b border-line bg-bg/85 backdrop-blur-xl'
          : 'border-b border-transparent',
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <div className="container-x flex h-[4.25rem] items-center justify-between gap-6 md:h-[4.75rem]">
        <LogoLink className="shrink-0" />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {trigger('services', 'Services', '/services')}
            {trigger('products', 'Products', '/products')}
            {TOP_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? 'page' : undefined}
                  className={cn(
                    'inline-flex h-10 items-center rounded-full px-3.5 text-[0.94rem] font-medium transition-colors hover:text-fg',
                    isActive(l.href) ? 'text-fg' : 'text-muted',
                  )}
                >
                  {l.title}
                </Link>
              </li>
            ))}
            {trigger('company', 'Company', '/about')}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <span className="hidden sm:block">
            <ButtonLink
              href="/contact"
              size="sm"

              icon={<ArrowRight className="size-4" />}
            >
              Start a project
            </ButtonLink>
          </span>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            className="grid size-10 place-items-center rounded-full border border-line-strong lg:hidden"
          >
            <span aria-hidden className="flex w-4 flex-col gap-[5px]">
              <span className="h-[1.5px] w-full rounded bg-fg" />
              <span className="h-[1.5px] w-full rounded bg-fg" />
            </span>
          </button>
        </div>
      </div>

      {/* Services mega panel */}
      {panelShell(
        'services',
        <div className="grid grid-cols-[1fr_18rem]">
          <div className="grid grid-cols-4 gap-x-8 gap-y-9 p-9">
            {nav.pillars.map((p, i) => (
              <div key={p.href}>
                <Link href={p.href} className="group/p flex items-baseline gap-2.5">
                  <span className="text-label text-accent">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-display text-[0.98rem] font-semibold tracking-tight group-hover/p:text-accent">
                    {p.title}
                  </span>
                </Link>
                <ul className="mt-3 space-y-1.5 pl-[2.1rem]">
                  {p.services.slice(0, 5).map((s) => (
                    <li key={s.href}>
                      <Link
                        href={s.href}
                        className="text-sm text-muted transition-colors hover:text-fg"
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-between gap-6 border-l border-line bg-surface-2/60 p-8">
            <div>
              <p className="text-label text-muted">Not sure where to start?</p>
              <p className="mt-3 font-display text-xl leading-snug font-semibold tracking-tight">
                Talk to an engineer, not a salesperson.
              </p>
              <p className="mt-3 text-sm text-muted">
                Tell us what you are trying to achieve. We will recommend the simplest thing that
                works.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <ButtonLink href="/contact" size="sm" icon={<ArrowRight className="size-4" />}>
                Book a free consultation
              </ButtonLink>
              <Link href="/services" className="text-sm font-medium text-muted hover:text-fg">
                View all services →
              </Link>
            </div>
          </div>
        </div>,
      )}

      {/* Products mega panel */}
      {panelShell(
        'products',
        <div className="grid grid-cols-[1fr_18rem]">
          <ul className="grid grid-cols-2 gap-1 p-4 xl:grid-cols-3">
            {nav.products.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  className="group/prod flex h-full flex-col gap-1 rounded-2xl p-5 transition-colors hover:bg-surface-2"
                >
                  <span className="text-label text-subtle">{p.category}</span>
                  <span className="mt-1 flex items-center gap-1.5 font-display text-lg font-semibold tracking-tight">
                    {p.name}
                    <ArrowUpRight className="size-4 opacity-0 transition-all duration-300 group-hover/prod:translate-x-0.5 group-hover/prod:opacity-100" />
                  </span>
                  <span className="text-sm leading-snug text-muted">{p.tagline}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col justify-between gap-6 border-l border-line bg-ink p-8 text-paper">
            <div>
              <p className="text-label text-paper/60">Products</p>
              <p className="mt-3 font-display text-xl leading-snug font-semibold tracking-tight">
                Proven systems, ready to deploy and adapt.
              </p>
              <p className="mt-3 text-sm text-paper/70">
                Every product can be customised, integrated with M-Pesa, and hosted by us.
              </p>
            </div>
            <ButtonLink
              href="/products"
              variant="inverse"
              size="sm"
              icon={<ArrowRight className="size-4" />}
            >
              All products
            </ButtonLink>
          </div>
        </div>,
      )}

      {/* Company panel */}
      {panelShell(
        'company',
        <ul className="grid grid-cols-5 gap-1 p-4">
          {COMPANY_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="flex h-full flex-col gap-1.5 rounded-2xl p-5 transition-colors hover:bg-surface-2"
              >
                <span className="font-display text-base font-semibold tracking-tight">
                  {l.title}
                </span>
                <span className="text-sm leading-snug text-muted">{l.text}</span>
              </Link>
            </li>
          ))}
        </ul>,
      )}

      <MobileMenu nav={nav} open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  )
}

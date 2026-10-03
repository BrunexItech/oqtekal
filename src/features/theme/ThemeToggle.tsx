'use client'

import { useSyncExternalStore } from 'react'

import { Moon, Sun } from '@/design-system'
import { cn } from '@/lib/cn'

type Theme = 'light' | 'dark'

/** The theme lives on <html data-theme>; this subscribes to it instead of duplicating it in state. */
const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  return () => observer.disconnect()
}
const getTheme = (): Theme => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')
const getServerTheme = (): Theme => 'light'

export const ThemeToggle = ({ className }: { className?: string }) => {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme)

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('oq-theme', next)
    } catch {
      /* storage unavailable: theme still applies for this page view */
    }
  }

  const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={cn(
        'relative grid size-10 place-items-center rounded-full text-fg transition-colors hover:bg-surface-2',
        className,
      )}
    >
      <Sun className="size-[1.15rem] scale-100 transition-transform duration-500 ease-out-expo dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute size-[1.1rem] scale-0 rotate-90 transition-transform duration-500 ease-out-expo dark:scale-100 dark:rotate-0" />
    </button>
  )
}

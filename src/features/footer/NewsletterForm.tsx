'use client'

import { usePathname } from 'next/navigation'
import { useActionState } from 'react'

import { ArrowRight } from '@/design-system'
import { initialFormState, subscribe } from '@/features/contact'

export const NewsletterForm = () => {
  const [state, action, pending] = useActionState(subscribe, initialFormState)
  const pathname = usePathname()

  if (state.status === 'success') {
    return (
      <p role="status" className="text-sm text-paper/80">
        {state.message}
      </p>
    )
  }

  return (
    <form action={action} className="w-full md:w-[26rem]">
      <input type="hidden" name="sourcePage" value={pathname} />
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />
      <div className="flex rounded-full border border-white/15 bg-white/5 p-1.5 focus-within:border-white/40">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          className="min-w-0 flex-1 bg-transparent px-4 text-[0.95rem] text-white placeholder:text-paper/40 focus:outline-none"
        />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-paper px-4 text-sm font-medium text-ink transition-colors hover:bg-white disabled:opacity-60"
        >
          {pending ? 'Joining…' : 'Subscribe'}
          <ArrowRight className="size-4" />
        </button>
      </div>
      {state.status === 'error' ? (
        <p role="alert" className="mt-2 pl-4 text-sm text-[#ff9aa6]">
          {state.message}
        </p>
      ) : null}
    </form>
  )
}

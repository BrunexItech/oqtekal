'use client'

import { useRouter } from 'next/navigation'
import { useState, type FormEvent } from 'react'

import { ArrowRight } from '@/design-system'

const TLDS = ['.co.ke', '.ke', '.com', '.org', '.africa']

/** Domain enquiry: sends the visitor to the contact form with the domain pre-filled. */
export const DomainSearch = () => {
  const router = useRouter()
  const [name, setName] = useState('')
  const [tld, setTld] = useState('.co.ke')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const clean = name
      .trim()
      .toLowerCase()
      .replace(/^https?:\/\//, '')
      .replace(/\..*$/, '')
      .replace(/[^a-z0-9-]/g, '')
    if (!clean) return
    router.push(`/contact?type=hosting&interest=${encodeURIComponent(`Domain: ${clean}${tld}`)}`)
  }

  return (
    <form onSubmit={submit} className="w-full">
      <div className="flex flex-col gap-2 rounded-[1.5rem] border border-white/15 bg-white/5 p-2 sm:flex-row sm:rounded-full">
        <label htmlFor="domain" className="sr-only">
          Domain name
        </label>
        <input
          id="domain"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="yourbusiness"
          autoComplete="off"
          spellCheck={false}
          className="h-12 min-w-0 flex-1 bg-transparent px-5 text-lg text-white placeholder:text-paper/40 focus:outline-none"
        />
        <label htmlFor="tld" className="sr-only">
          Extension
        </label>
        <select
          id="tld"
          value={tld}
          onChange={(e) => setTld(e.target.value)}
          className="h-12 rounded-full bg-white/10 px-4 text-white focus:outline-none [&>option]:text-ink"
        >
          {TLDS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-paper px-6 font-medium text-ink transition-colors hover:bg-white"
        >
          Check & register
          <ArrowRight className="size-4" />
        </button>
      </div>
    </form>
  )
}

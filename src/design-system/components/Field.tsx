import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import { cn } from '@/lib/cn'

const control =
  'w-full rounded-xl border border-line-strong bg-surface px-4 py-3 text-[0.98rem] text-fg placeholder:text-subtle transition-[border-color,box-shadow] duration-200 hover:border-fg/30 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15 aria-[invalid=true]:border-danger'

type FieldShell = {
  label: string
  name: string
  error?: string
  hint?: string
  optional?: boolean
  children: ReactNode
}

export const FieldShell = ({ label, name, error, hint, optional, children }: FieldShell) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={name} className="flex items-baseline justify-between text-sm font-medium">
      <span>{label}</span>
      {optional ? <span className="text-xs font-normal text-subtle">Optional</span> : null}
    </label>
    {children}
    {error ? (
      <p id={`${name}-error`} className="text-sm text-danger" role="alert">
        {error}
      </p>
    ) : hint ? (
      <p id={`${name}-hint`} className="text-sm text-subtle">
        {hint}
      </p>
    ) : null}
  </div>
)

type Common = { label: string; name: string; error?: string; hint?: string; optional?: boolean }

const describedBy = (name: string, error?: string, hint?: string) =>
  error ? `${name}-error` : hint ? `${name}-hint` : undefined

export const Input = ({
  label,
  name,
  error,
  hint,
  optional,
  className,
  ...rest
}: Common & ComponentPropsWithoutRef<'input'>) => (
  <FieldShell label={label} name={name} error={error} hint={hint} optional={optional}>
    <input
      id={name}
      name={name}
      aria-invalid={error ? true : undefined}
      aria-describedby={describedBy(name, error, hint)}
      required={!optional}
      className={cn(control, className)}
      {...rest}
    />
  </FieldShell>
)

export const Textarea = ({
  label,
  name,
  error,
  hint,
  optional,
  className,
  ...rest
}: Common & ComponentPropsWithoutRef<'textarea'>) => (
  <FieldShell label={label} name={name} error={error} hint={hint} optional={optional}>
    <textarea
      id={name}
      name={name}
      rows={5}
      aria-invalid={error ? true : undefined}
      aria-describedby={describedBy(name, error, hint)}
      required={!optional}
      className={cn(control, 'min-h-32 resize-y', className)}
      {...rest}
    />
  </FieldShell>
)

export const Select = ({
  label,
  name,
  error,
  hint,
  optional,
  options,
  className,
  ...rest
}: Common & {
  options: { label: string; value: string }[]
} & ComponentPropsWithoutRef<'select'>) => (
  <FieldShell label={label} name={name} error={error} hint={hint} optional={optional}>
    <div className="relative">
      <select
        id={name}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, error, hint)}
        required={!optional}
        className={cn(control, 'appearance-none pr-11', className)}
        {...rest}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <svg
        aria-hidden
        viewBox="0 0 20 20"
        className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted"
      >
        <path
          d="M5 7.5l5 5 5-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  </FieldShell>
)

/** Pill-style single choice (e.g. budget). Uses real radio inputs. */
export const ChoiceGroup = ({
  label,
  name,
  options,
  defaultValue,
}: {
  label: string
  name: string
  options: { label: string; value: string }[]
  defaultValue?: string
}) => (
  <fieldset className="flex flex-col gap-3">
    <legend className="mb-3 text-sm font-medium">{label}</legend>
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <label key={o.value} className="cursor-pointer">
          <input
            type="radio"
            name={name}
            value={o.value}
            defaultChecked={o.value === defaultValue}
            className="peer sr-only"
          />
          <span className="inline-flex h-10 items-center rounded-full border border-line-strong bg-surface px-4 text-sm transition-colors peer-checked:border-accent peer-checked:bg-accent-soft peer-checked:text-accent peer-focus-visible:ring-4 peer-focus-visible:ring-accent/20 hover:border-fg/40">
            {o.label}
          </span>
        </label>
      ))}
    </div>
  </fieldset>
)

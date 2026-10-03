import { z } from 'zod'

export const LEAD_TYPE_VALUES = ['project', 'demo', 'hosting', 'career', 'general'] as const
export type LeadType = (typeof LEAD_TYPE_VALUES)[number]

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : undefined))

/** Shared by the browser form and the server action: one set of rules. */
export const leadSchema = z.object({
  type: z.enum(LEAD_TYPE_VALUES),
  name: z.string().trim().min(2, 'Please enter your name').max(120),
  email: z.email('Please enter a valid email address').trim().max(200),
  phone: optionalText(40).refine(
    (v) => !v || /^[+\d][\d\s()-]{6,}$/.test(v),
    'Please enter a valid phone number',
  ),
  company: optionalText(160),
  message: z.string().trim().min(10, 'Tell us a little more (at least 10 characters)').max(5000),
  budget: optionalText(60),
  interest: optionalText(160),
  sourcePage: optionalText(300),
})

export type LeadInput = z.infer<typeof leadSchema>

export const subscribeSchema = z.object({
  email: z.email('Please enter a valid email address').trim().max(200),
})

export type FormState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  errors?: Partial<Record<string, string>>
}

export const initialFormState: FormState = { status: 'idle' }

/** Flattens zod issues into { field: firstMessage }. */
export const fieldErrors = (error: z.ZodError): Record<string, string> => {
  const out: Record<string, string> = {}
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? 'form')
    if (!out[key]) out[key] = issue.message
  }
  return out
}

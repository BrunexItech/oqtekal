import { z } from 'zod'

/**
 * Environment variables, validated once at startup.
 * The app refuses to boot with a clear message instead of failing later at random.
 */
const schema = z.object({
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  PAYLOAD_SECRET: z.string().min(16, 'PAYLOAD_SECRET must be at least 16 characters'),
  NEXT_PUBLIC_SITE_URL: z.url().default('http://localhost:3000'),
  PREVIEW_SECRET: z.string().min(8).default('dev-preview-secret'),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().default(587),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_FROM: z.string().default('Oqtekal <hello@oqtekal.com>'),
  LEADS_NOTIFY_TO: z.string().optional(),
  TURNSTILE_SECRET_KEY: z.string().optional(),
})

const parsed = schema.safeParse(process.env)

if (!parsed.success) {
  const problems = parsed.error.issues
    .map((i) => `  - ${i.path.join('.')}: ${i.message}`)
    .join('\n')
  throw new Error(`Invalid environment configuration:\n${problems}\nSee .env.example.`)
}

export const env = parsed.data

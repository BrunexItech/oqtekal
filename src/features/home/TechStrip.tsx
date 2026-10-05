import { BrandIcon, Container, type BrandName } from '@/design-system'

const STACK: { name: BrandName; label: string }[] = [
  { name: 'nextjs', label: 'Next.js' },
  { name: 'react', label: 'React' },
  { name: 'typescript', label: 'TypeScript' },
  { name: 'python', label: 'Python' },
  { name: 'django', label: 'Django' },
  { name: 'fastapi', label: 'FastAPI' },
  { name: 'nodejs', label: 'Node.js' },
  { name: 'laravel', label: 'Laravel' },
  { name: 'flutter', label: 'Flutter' },
  { name: 'kotlin', label: 'Kotlin' },
  { name: 'swift', label: 'Swift' },
  { name: 'postgresql', label: 'PostgreSQL' },
  { name: 'redis', label: 'Redis' },
  { name: 'docker', label: 'Docker' },
  { name: 'nginx', label: 'Nginx' },
  { name: 'cloudflare', label: 'Cloudflare' },
]

/** "Built with": the mainstream technologies we use, as one quiet, still line. */
export const TechStrip = () => (
  <section aria-label="Technologies we use" className="border-y border-line py-8 md:py-9">
    <Container>
      <p className="text-label text-muted">Built with proven technology</p>
      <ul className="mt-5 flex flex-wrap gap-x-7 gap-y-3.5">
        {STACK.map((t) => (
          <li key={t.name} className="flex items-center gap-2.5 text-fg/80">
            <BrandIcon name={t.name} colored className="size-5" />
            <span className="text-[0.92rem] font-medium whitespace-nowrap">{t.label}</span>
          </li>
        ))}
      </ul>
    </Container>
  </section>
)

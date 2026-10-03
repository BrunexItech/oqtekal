import { BrandIcon, Container, Marquee, type BrandName } from '@/design-system'

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

/** "Built with" strip of the mainstream technologies we use. */
export const TechStrip = () => (
  <section aria-label="Technologies we use" className="border-y border-line py-8">
    <Container className="flex flex-col items-center gap-6 md:flex-row md:gap-10">
      <p className="shrink-0 text-label text-muted">Built with proven technology</p>
      <Marquee duration={45} className="w-full">
        {STACK.map((t) => (
          <span
            key={t.name}
            className="mx-7 flex items-center gap-3 text-fg/80 transition-colors hover:text-fg"
          >
            <BrandIcon name={t.name} colored className="size-6" />
            <span className="text-[0.95rem] font-medium whitespace-nowrap">{t.label}</span>
          </span>
        ))}
      </Marquee>
    </Container>
  </section>
)

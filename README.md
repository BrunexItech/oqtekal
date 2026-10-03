# oqtekal.com

Company website and content admin for **Oqtekal** — _Engineering what runs business_.

- **Site:** Next.js 16 (App Router, React Server Components), TypeScript strict, Tailwind CSS v4, Motion, Three.js (hero only, lazy-loaded)
- **Admin:** Payload CMS 3 at `/admin`, running inside the same app, PostgreSQL 16
- **Hosting:** Docker on the company VPS behind host nginx + Cloudflare (Full strict)

The full plan and decisions are in [docs/BUILD_PLAN.md](docs/BUILD_PLAN.md). Editors start with [docs/EDITOR_GUIDE.md](docs/EDITOR_GUIDE.md); operators with [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Run it locally

```bash
cp .env.example .env                                   # then set PAYLOAD_SECRET and SEED_ADMIN_PASSWORD
docker compose -p oqtekal -f docker/compose.dev.yml up -d   # Postgres on 127.0.0.1:5441
npm install
npm run seed                                           # sample content + admin account
npm run dev                                            # http://localhost:3000  ·  admin: /admin
```

`npm run seed -- --force` replaces website content (never staff accounts or enquiries).

## Quality gates

| Command                                               | What it checks                                                                                                            |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `npm run check`                                       | types, lint, formatting, unit tests                                                                                       |
| `npm run test:e2e`                                    | every page on desktop + mobile: renders, one `<h1>`, no horizontal scroll, axe accessibility (light & dark), menus, forms |
| `LAUNCH_CHECK=1 npx playwright test launch-checklist` | fails while sample content is still published — run before launch                                                         |
| `npx @lhci/cli autorun`                               | Lighthouse budgets (`lighthouserc.json`)                                                                                  |

CI runs all of the above on every push (`.github/workflows/ci.yml`).

## Project structure

```
src/
  app/(site)/        public pages — thin: fetch data, compose feature sections
  app/(payload)/     Payload admin + REST/GraphQL API (generated, do not edit)
  cms/               content model: collections, globals, shared fields, access rules, hooks
  design-system/     tokens, primitives, components, motion, icons — the only place styling lives
  features/          one folder per domain (products, services, team, contact…), each with a public index.ts
  lib/               env validation, Payload client, caching, mail, rate limiting, helpers
  migrations/        database migrations (applied automatically in production)
scripts/seed/        sample content
scripts/ops/         deploy, backup, restore
tests/               unit (Vitest) and e2e (Playwright + axe)
docker/              dev DB, production compose, nginx vhost
brand/               source logo files
```

Rules: pages don't style; features don't import each other's internals (ESLint enforces it);
colours and type only come from `design-system/tokens`.

## Content model changes

1. Edit `src/cms/**`
2. `npm run generate:types`
3. `npm run migrate:create -- <name>` and commit the new file in `src/migrations/`

# Oqtekal.com — Build Plan

> Status: **Phases 0–8 built** (2026-10-03). Remaining: Phase 9 launch tasks — real content, VPS deploy, DNS, SMTP, backups. See docs/DEPLOYMENT.md.
> Owner: Oqtekal · Domain: oqtekal.com · Hosting: own VPS behind Cloudflare

---

## 1. What we are building

A flagship company website that has to do four jobs:

1. **Prove quality on first contact.** A visitor should be able to judge the engineering from the site itself: it should be fast, precise, and calm.
2. **Present a broad offer clearly.** Oqtekal covers almost every kind of software work, so the site must present that without becoming a wall of cards.
3. **Sell the products.** Tolkyn, the School, Property, ERP and Sports systems, and M-Pesa integration each get their own product page.
4. **Turn visitors into conversations:** project enquiries, demo requests, hosting orders and WhatsApp chats.

The site is also a showcase in its own right, since Oqtekal sells hosting and web development.

### Non-negotiables

| Rule                            | What it means in practice                                                                                                                                                  |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| No "AI look"                    | No sparkles, robots, brains, neon purple glow or rows of identical stock icon cards. Typography, layout, real screenshots and numbered lists do the visual work.           |
| Editable by non-technical staff | Every piece of text, image, product, service, team member, price and testimonial is managed in the admin panel. Changing content never requires a developer or a redeploy. |
| Modular and scalable            | Feature-based folders, a single design-token source, strict TypeScript and no copy-pasted sections. Adding the 30th service should take the same effort as the 3rd.        |
| No room for error               | Automated tests, accessibility checks and performance budgets run in CI. A failing check blocks the deploy.                                                                |

---

## 2. Brand system (locked)

Assets live in `brand/logo/` and get copied into the app's `public/brand/` at build time.

| Token                | Value     | Use                                                                                  |
| -------------------- | --------- | ------------------------------------------------------------------------------------ |
| `--blue-600` (brand) | `#064DFB` | Primary buttons, links, key highlights. Sampled from the logo's K arm and A triangle |
| `--blue-400`         | `#2FA8FF` | Light end of the ribbon gradient (used sparingly)                                    |
| `--blue-900`         | `#14246E` | Deep fold tone, dark-section accents                                                 |
| `--ink`              | `#0B0F19` | Text, dark sections                                                                  |
| `--paper`            | `#F7F6F2` | Main background (warm off-white)                                                     |
| `--stone-500`        | `#5E636E` | Secondary text                                                                       |
| `--line`             | `#E4E2DC` | Borders and dividers                                                                 |

- **Light-first site with a full dark mode**, following the system setting plus a manual toggle. Every color pair meets WCAG AA contrast, checked automatically in CI.
- **Type:**
  - Display: **Archivo** (wide/expanded cut), which echoes the logo's wide letterforms.
  - Body and UI: **Inter**.
  - Small technical labels: **JetBrains Mono**.
  - All fonts are self-hosted through `next/font`: no Google requests at runtime and no layout shift.
- **Iconography:** Services use numbers (01, 02…) and real product screenshots rather than icons. The few functional icons (arrow, menu, close, check) come from one consistent minimal set (Lucide), drawn at a 1.5px stroke. Social media icons use the official brand marks (Simple Icons).
- **Logo usage:**
  - Header: `oqtekal-logo.png`, or `-dark-bg` in dark mode.
  - Footer: the tagline version.
  - Favicon set: already generated.

---

## 3. Information architecture

```
/                         Home
/services                 All services, grouped into pillars
/services/[pillar]        e.g. /services/software-engineering
/services/[pillar]/[slug] e.g. /services/software-engineering/mobile-apps
/products                 Product suite overview
/products/[slug]          Tolkyn, School, Property, ERP, Sports, M-Pesa…
/hosting                  Hosting & domains plans (CMS-managed pricing)
/work                     Case studies
/work/[slug]              One case study
/about                    Story, values, the team of three, how we work
/insights                 Articles (blog)
/insights/[slug]
/careers                  Open roles (can be empty, shows "always hiring" note)
/contact                  Enquiry form, WhatsApp, booking, office details
/legal/privacy            Kenya Data Protection Act 2019 compliant
/legal/terms
/admin                    Content admin (Payload) — staff only
```

### Service pillars

The services are modelled as **pillar → service**. The structure is data, not code, so new services are added in the admin.

| Pillar                         | Services (initial)                                                                                        |
| ------------------------------ | --------------------------------------------------------------------------------------------------------- |
| **01 Software Engineering**    | Custom software, web applications, enterprise systems, legacy modernisation, APIs & microservices         |
| **02 Mobile & Product**        | iOS/Android apps, cross-platform apps, UI/UX & product design, MVP development                            |
| **03 Cloud & Hosting**         | Web hosting, domains & email, VPS & cloud servers, DevOps & CI/CD, managed maintenance                    |
| **04 Payments & Integrations** | M-Pesa (STK Push, C2B/B2C, paybill/till), payment gateways, SMS & WhatsApp APIs, third-party integrations |
| **05 Business Systems**        | ERP, POS & inventory, CRM, HR & payroll, school/property/sports management                                |
| **06 Data & Automation**       | Dashboards & reporting, data pipelines, workflow automation, AI integration                               |
| **07 Security & Support**      | Security audits, backups & disaster recovery, IT consulting, SLA support                                  |

### Products (initial)

| Product                                | Notes                                                                                                       |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Tolkyn**                             | Already live at tolkyn.co.ke. Positioned as unified communications: WhatsApp, SMS, email, telephony and CRM |
| **School Management System**           |                                                                                                             |
| **Property / House Management System** |                                                                                                             |
| **ERP**                                | Accounting, invoicing, HR & payroll, assets, manufacturing                                                  |
| **Sports Management System**           |                                                                                                             |
| **M-Pesa Integration**                 | A service-product: "Integrates with M-Pesa" lockup using the official logo, per Safaricom brand rules       |
| _(optional)_ **Stoka**                 | POS for dukas. Include if you want it public                                                                |

Each product page uses one template with the same sections:

- Hero with product logo and screenshot
- The problem it solves
- 3–6 key features
- Screenshots gallery
- Who it's for
- Integrations
- Optional pricing
- FAQ
- "Request a demo"

---

## 4. Page designs (section by section)

### Home

1. **Intro animation:** The ribbon draws itself and settles into the header logo. See §6.
2. **Hero:**
   - Headline, e.g. _"Engineering what runs business."_
   - A one-line sub-headline.
   - Buttons: **Start a project** and **Explore products**.
   - Visual: the ribbon as a slowly turning 3D form (WebGL), with a static image fallback on low-power devices.
3. **Trust strip:** Logos of clients and technologies, plus key figures (projects delivered, uptime, years).
4. **Products:** A large showcase of the six products with real screenshots. Product tabs on desktop, swipeable cards on mobile.
5. **Services:** The seven pillars as a numbered editorial list (01–07). Hovering or tapping a pillar reveals its services. No icon grid.
6. **Selected work:** 2–3 case studies, each with a measured result (e.g. _"Checkout time cut from 4 min to 40 s"_).
7. **How we work:** Discover → Design → Build → Launch → Support, as a horizontal timeline that pins while you scroll.
8. **The team:** Three large portrait cards (see §4.1).
9. **Testimonials:** One quote at a time, large type, with name, role and company.
10. **Hosting teaser:** Three plans and a "See all plans" link.
11. **Final call to action:** "Have a project in mind?", with a short form inline and a WhatsApp button.
12. **Footer:**
    - Sitemap columns, social icons, contact details and the newsletter signup.
    - Legal links and © Oqtekal.

### 4.1 Team: designed for three people

With only three people, the section should look intentional rather than empty, so three is the design target.

- **Desktop:** Three tall portrait cards side by side. **Mobile:** a horizontal swipe row.
- **Each card:**
  - A consistent, colour-graded portrait.
  - Name, role, a one-line focus statement and 2–3 expertise tags.
  - Social links (LinkedIn, X, GitHub).
- **Hover or tap** flips to a short bio. On touch devices it opens an accessible dialog.
- The About page reuses the same component, with longer bios.
- **Placeholders:** Placeholder portraits are flagged `isPlaceholder` in the admin, and a launch checklist test fails while any remain.

### 4.2 Hosting page

- **Plans** are stored in the admin: name, price in KES (monthly or yearly), specs and a featured flag. They're shown as comparison cards and a full feature table.
- **Domain search:** Phase 1 is a simple form that sends an enquiry. Phase 2 could connect a live domain-availability API.
- **Ordering:** "Order" opens a pre-filled enquiry or WhatsApp message. Automated billing (e.g. WHMCS or our own) is planned for later and isn't required to launch.

---

## 5. Technical architecture

### Stack

| Layer          | Choice                                                                                  | Why                                                                                    |
| -------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Framework      | **Next.js (App Router), React Server Components**                                       | Static generation where possible, fast, strong SEO                                     |
| Language       | **TypeScript, `strict: true`**                                                          | Whole classes of errors removed at compile time                                        |
| Styling        | **Tailwind CSS v4** with CSS-variable tokens                                            | Tokens defined once; dark mode by swapping variables                                   |
| Motion         | **Motion** (Framer Motion) + CSS; **React Three Fiber** for the hero only (lazy-loaded) | Rich motion that never blocks the first paint                                          |
| CMS / admin    | **Payload CMS 3** running inside the same Next.js app                                   | Self-hosted on your VPS, simple form-based editor, typed content, no third-party cloud |
| Database       | **PostgreSQL 16** (Docker)                                                              | Reliable, backed up nightly                                                            |
| Media          | Local volume on the VPS, served via Next image optimisation and cached by Cloudflare    | No external dependency                                                                 |
| Forms          | Server actions + **Zod** validation + **Cloudflare Turnstile** (spam protection)        | Validated on both client and server                                                    |
| Email          | SMTP (domain mailbox, e.g. Zoho or Google Workspace for `@oqtekal.com`) via Nodemailer  | Contact form notifications and auto-replies                                            |
| Analytics      | **Umami** self-hosted on the VPS                                                        | Privacy-friendly, no cookie banner needed for analytics                                |
| Error tracking | **Sentry** (free tier) or self-hosted GlitchTip                                         | Errors are reported, not discovered by users                                           |

> **Kickoff check:** Before Phase 0, confirm which Next.js version the current Payload release supports, and pin both. We don't upgrade either during the build.

### Folder structure

```
oqtekal/
├── brand/                     source logo files (not deployed)
├── docs/                      this plan, ADRs, content guide for editors
├── src/
│   ├── app/
│   │   ├── (site)/            public pages — thin: fetch data, compose sections
│   │   │   ├── page.tsx
│   │   │   ├── services/…
│   │   │   ├── products/…
│   │   │   └── …
│   │   ├── (payload)/admin/   Payload admin route
│   │   ├── api/               route handlers (revalidate webhook, health)
│   │   ├── sitemap.ts · robots.ts · manifest.ts
│   │   └── layout.tsx
│   ├── design-system/         the ONLY place visual primitives live
│   │   ├── tokens/            colors, type scale, spacing, radii, motion
│   │   ├── primitives/        Button, Link, Container, Section, Heading, Text, Badge, Tag
│   │   ├── components/        Card, Dialog, Tabs, Accordion, Marquee, Field, Select…
│   │   └── motion/            Reveal, Stagger, Parallax, PinnedScroll (all reduced-motion aware)
│   ├── features/              one folder per domain, self-contained
│   │   ├── hero/
│   │   ├── services/          components/, queries.ts, types.ts, index.ts
│   │   ├── products/
│   │   ├── work/
│   │   ├── team/
│   │   ├── hosting/
│   │   ├── testimonials/
│   │   ├── insights/
│   │   ├── contact/           form, server action, schema, email templates
│   │   └── intro-loader/      the ribbon animation
│   ├── cms/                   Payload config
│   │   ├── collections/       Services, Pillars, Products, CaseStudies, Team, Testimonials,
│   │   │                      HostingPlans, Posts, Jobs, Clients, Leads, Media, Users
│   │   ├── globals/           SiteSettings, Navigation, Footer, Home, SocialLinks, ContactInfo
│   │   ├── blocks/            reusable page blocks (RichText, Gallery, Stats, CTA, FAQ…)
│   │   ├── fields/            shared fields (seo, slug, isPlaceholder, publishStatus)
│   │   └── hooks/             revalidate pages on publish
│   ├── lib/                   seo.ts, env.ts (validated), mailer.ts, analytics.ts, utils
│   └── styles/                globals.css (imports tokens)
├── tests/
│   ├── unit/                  Vitest
│   └── e2e/                   Playwright (+ axe accessibility checks)
├── docker/                    Dockerfile, compose.yml, nginx vhost sample
└── .github/workflows/         CI: lint, typecheck, test, build, Lighthouse
```

**Rules that keep it modular:**

- **Pages don't style.** A page fetches data and composes feature sections; styling lives in features and the design system.
- **Features never import from each other.** Shared things move down into `design-system/` or `lib/`.
- **Each feature has a public `index.ts`.** Nothing reaches into another feature's internals.
- **Content types are generated from the Payload schema,** so a renamed field breaks the build rather than the live site.
- **No hard-coded colors or font sizes outside `tokens/`.** ESLint enforces this.

### Admin experience (for non-technical staff)

- **Plain-language labels and help text** on every field, e.g. "Short pitch shown on the product card. 1–2 sentences."
- **Live preview:** editors see the page as they type.
- **Draft → Publish workflow,** with version history and one-click restore.
- **Image focal-point picker,** so faces never get cropped.
- **Roles:**
  - **Admin:** everything.
  - **Editor:** content only.
  - **Sales:** leads inbox only.
- **Leads inbox:** every contact form submission is stored with its status (New → Contacted → Won/Lost), so enquiries aren't lost in an email inbox.
- **A one-page editor guide** (`docs/EDITOR_GUIDE.md`) with screenshots.

---

## 6. The intro loader ("the spinner")

**Concept:** The ribbon symbol _draws itself_. A single stroke traces the loop, the fill flows in along it (blue gradient), the diagonal tail slides into place, and the symbol then glides up into the header logo position as the page fades in.

**Rules that keep it impressive without slowing the site:**

- **The page renders underneath** from the server. The loader is an overlay, so it never delays content or hurts load-speed scores.
- **Length:** about 1.4 seconds. It plays **once per session**, and later page navigations use a subtle route transition instead.
- **Reduced motion:** visitors whose device requests it get no loader, just an instant fade.
- **Fully vector** (SVG + CSS/Motion), under 8 KB, with no video or GIF.
- **Fallback:** if JavaScript fails, the overlay never appears.

---

## 7. Motion & interaction principles

- **Easing:** One easing family for everything (`cubic-bezier(0.22, 1, 0.36, 1)`).
- **Durations:**
  - 150–250 ms for UI responses (hover, press).
  - 500–800 ms for reveals.
- **Reveals:** Elements rise 16px and fade in once. No bouncing and no endless loops.
- **Scroll effects:** Pinned and scroll-linked sections are used in at most 2 places, so the effect stays special.
- **Custom cursor:** desktop only, as a small blue dot that grows over links. It can be switched off, and is never used on touch devices.
- **Reduced motion:** Every animation respects `prefers-reduced-motion`.

---

## 8. Quality gates ("no room for error")

| Gate                   | Tool                | Threshold (blocks deploy)                                                                        |
| ---------------------- | ------------------- | ------------------------------------------------------------------------------------------------ |
| Types                  | `tsc --noEmit`      | 0 errors                                                                                         |
| Lint / format          | ESLint + Prettier   | 0 errors                                                                                         |
| Unit tests             | Vitest              | All pass; schema, utilities and form validation covered                                          |
| End-to-end             | Playwright          | Key journeys pass: navigation, contact form, demo request, hosting order, dark mode, mobile menu |
| Accessibility          | axe (in Playwright) | 0 serious or critical violations on every page                                                   |
| Performance            | Lighthouse CI       | Performance ≥ 95, Accessibility 100, Best Practices 100, SEO 100                                 |
| Core Web Vitals budget | Lighthouse          | LCP < 2.0 s, CLS < 0.05, INP < 200 ms, initial JS < 170 KB gz                                    |
| Links                  | Link checker        | No broken internal links                                                                         |
| Launch checklist       | Custom test         | No `isPlaceholder` content, all pages have SEO fields, legal pages exist                         |

**Process:**

- Pre-commit hooks (lint-staged) on every commit.
- CI runs on every push via GitHub Actions.
- `main` is always deployable, and work happens on feature branches.

---

## 9. SEO & discoverability

- **Metadata on every page** (title, description, canonical URL), editable in the admin with sensible defaults.
- **Auto-generated social preview images** (Open Graph) for every page, product and article, rendered on the brand template.
- **Structured data:** Organization, WebSite, Product, Service, Article, BreadcrumbList and FAQPage. This helps Google show rich results.
- **Discovery files:** `sitemap.xml` (auto-updated on publish), `robots.txt` and `manifest.webmanifest`.
- **Local SEO:** Google Business Profile and LocalBusiness structured data with your address.
- **Clean URLs:** Human-readable addresses, with 301 redirects managed in the admin.

---

## 10. Security & reliability

- **Security headers:** a strict Content-Security-Policy, HSTS, X-Frame-Options, Referrer-Policy and Permissions-Policy.
- **Admin protection:**
  - Login rate-limited, strong passwords, optional 2FA.
  - Optionally, `/admin` restricted to approved IPs via a Cloudflare rule.
- **Forms:**
  - Spam protection (Turnstile), rate limiting, server-side validation.
  - Nothing is trusted from the browser.
- **Secrets** live in environment variables, validated at startup. The app refuses to boot if any are missing.
- **Backups:**
  - Nightly `pg_dump` and media sync, kept for 14 days.
  - A weekly copy goes off-server (e.g. to Cloudflare R2 or Backblaze).
  - **The restore process is tested before launch.**
- **Monitoring:**
  - An uptime monitor (Uptime Kuma, self-hosted, or a free tier).
  - Error tracking (Sentry).
  - A `/api/health` endpoint.

---

## 11. Deployment (your VPS)

```
Cloudflare (DNS, CDN, WAF, Full-strict TLS w/ Origin cert)
        │
host nginx  ── oqtekal.com ──► 127.0.0.1:8091  (Next.js + Payload container)
        │                          │
        └─ tolkyn.co.ke ─► :8090   └─► postgres container (internal network only)
```

- **Docker Compose:**
  - `web`: a multi-stage build running as a non-root user.
  - `db`: Postgres 16.
  - `umami`: analytics.
- **Isolation from Tolkyn:** Its own nginx server block and port, so it runs alongside tolkyn.co.ke without affecting it.
- **Staging:** `staging.oqtekal.com`, protected by a password, used for review before each production deploy.
- **Deploy process:**
  1. CI passes.
  2. Pull and build on the VPS.
  3. Run database migrations.
  4. Swap the container.
  5. Run a health check.
  6. Purge the Cloudflare cache.

  A one-command rollback goes back to the previous image.

- **Email DNS:** SPF, DKIM and DMARC records for `oqtekal.com`, so the contact form's emails don't land in spam.

---

## 12. Delivery phases

Each phase ends with a checkpoint where you review on staging before the next phase starts.

| Phase                                            | Scope                                                                                                                       | Exit criteria                                                     |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| **0. Foundation**                                | Repo, tooling, CI, Docker, Payload + Postgres running, env validation, design tokens, fonts, brand assets, staging deployed | Empty site with admin login live on staging; CI green             |
| **1. Design system**                             | Primitives, components and motion utilities; header (desktop and mobile), footer, dark mode, intro loader                   | Component showcase page reviewed and approved by you              |
| **2. Content model**                             | All admin collections and globals, live preview, roles, seeded realistic placeholder content                                | You can add a team member or service yourself without help        |
| **3. Home page**                                 | All home sections from §4, wired to the admin                                                                               | Home approved on desktop and mobile; Lighthouse budgets met       |
| **4. Services & Products**                       | Pillar, service and product templates; product pages for all six products                                                   | Every product and service page published from the admin           |
| **5. Work, About, Team, Hosting**                | Case studies, About with the team, hosting plans and comparison                                                             | Pages approved                                                    |
| **6. Contact & leads**                           | Forms, Turnstile, email notifications and auto-replies, leads inbox, WhatsApp                                               | A test enquiry arrives by email and in the admin; spam is blocked |
| **7. Insights, Careers, Legal**                  | Blog, jobs, privacy and terms                                                                                               | Pages live with real or placeholder copy                          |
| **8. SEO, performance, accessibility hardening** | Structured data, social images, sitemap; full audit and fixes                                                               | Every quality gate in §8 passes on every page                     |
| **9. Launch**                                    | Production deploy, DNS cutover, backups, monitoring, analytics, editor guide, handover                                      | oqtekal.com live; restore drill done; launch checklist 100%       |

**After launch:**

- Automated hosting billing.
- Live domain search.
- A client portal.
- Swahili (the structure is ready for a second language from day one).
- Case-study videos.

---

## 13. What I need from you

These items aren't blocking. Placeholders are used until they arrive, and the launch checklist tracks them.

1. **Team (3 people):** Full names, roles, a 2–3 sentence bio each, portraits, and LinkedIn/X/GitHub links. For portraits, use the same background and lighting for all three; a phone camera near a window works.
2. **Products:** For each one, its logo (if any), 3–5 real screenshots, and a one-line pitch. Also tell me whether Stoka should be listed.
3. **Contact:** Email, phone/WhatsApp number, office address (or "Nairobi, Kenya" only), and business hours.
4. **Social accounts:** Links for every platform you use.
5. **Proof:**
   - Any client names or logos you have permission to show.
   - 1–3 testimonials.
   - Real numbers: projects delivered, years in operation.
6. **Hosting plans:** Names, KES prices and specs, or I'll draft market-typical plans for you to edit.
7. **Domain mailbox:** Which provider for `@oqtekal.com` email (Zoho Mail is free for small teams; Google Workspace is paid).
8. **VPS:** Confirm the same server as tolkyn.co.ke (38.242.200.152) and that port 8091 is free.
9. **M-Pesa logo:** I'll use the official asset and follow Safaricom's brand guidelines. Please check those guidelines before launch.

---

## 14. Decisions log

| #   | Decision                                                                           | Reason                                                |
| --- | ---------------------------------------------------------------------------------- | ----------------------------------------------------- |
| D1  | Payload CMS self-hosted instead of Sanity                                          | Everything must run on our VPS                        |
| D2  | Brand blue `#064DFB` (from the final logo) replaces the earlier `#2B59FF` proposal | Match the logo exactly                                |
| D3  | Light-first with full dark mode                                                    | Friendlier for long reading; dark mode for preference |
| D4  | Numbered editorial service list instead of an icon grid                            | No "AI look"                                          |
| D5  | Intro loader is an overlay, once per session                                       | Impressive without hurting performance or SEO         |
| D6  | Tagline: "Engineering what runs business"                                          | Specific, confident, not generic                      |

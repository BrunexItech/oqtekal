/* Seed content: service groups (pillars) and services. Editable afterwards in the admin. */

export type SeedService = {
  title: string
  summary: string
  intro: string
  deliverables: { title: string; text: string }[]
  outcomes: string[]
  technologies: string[]
  faqs: { question: string; answer: string }[]
  relatedProducts?: string[]
}

export type SeedPillar = {
  title: string
  slug: string
  summary: string
  intro: string
  services: SeedService[]
}

export const pillars: SeedPillar[] = [
  {
    title: 'Software Engineering',
    slug: 'software-engineering',
    summary: 'Custom software, web applications and enterprise systems, engineered to last.',
    intro:
      'When off-the-shelf software forces your team to work around it, we build software that works the way your organisation does — designed with the people who will use it, tested properly and documented for the long term.',
    services: [
      {
        title: 'Custom software development',
        summary: 'Software shaped around how your organisation actually works.',
        intro:
          'We turn the processes that run your organisation into dependable software. We start by understanding the work, not by writing code: who does what, where the delays are, and what “done” looks like. Then we build in short, visible increments so you see progress every two weeks.',
        deliverables: [
          {
            title: 'Discovery & specification',
            text: 'Workshops with your team, process maps and a clear scope with costs before any build begins.',
          },
          {
            title: 'Design you can click through',
            text: 'Interactive prototypes tested with real users, so changes happen on screens, not in code.',
          },
          {
            title: 'Iterative build',
            text: 'Fortnightly releases to a staging environment you can try, with progress you can measure.',
          },
          {
            title: 'Launch & handover',
            text: 'Data migration, staff training, documentation and a support plan that matches your needs.',
          },
        ],
        outcomes: [
          'Less manual work and fewer errors',
          'One source of truth instead of spreadsheets',
          'Software you own, with full source code',
        ],
        technologies: [
          'TypeScript',
          'React / Next.js',
          'Python',
          'Django / FastAPI',
          'PostgreSQL',
          'Docker',
        ],
        faqs: [
          {
            question: 'Do we own the code?',
            answer:
              'Yes. On full payment you own the source code and all project assets. We use open, mainstream technologies so any competent team can maintain it.',
          },
          {
            question: 'How do you price custom projects?',
            answer:
              'After a short discovery we give a fixed price for a clearly defined first release, then smaller fixed-price phases. You never sign up for an open-ended bill.',
          },
        ],
      },
      {
        title: 'Web application development',
        summary: 'Fast, secure web apps and portals that work on every device.',
        intro:
          'Customer portals, booking systems, dashboards and internal tools that load quickly on a phone in Kisumu and on a desktop in London. We build for real network conditions, accessibility and search engines from the first line of code.',
        deliverables: [
          {
            title: 'Responsive interfaces',
            text: 'Designed mobile-first and tested on the devices your users actually own.',
          },
          {
            title: 'Secure accounts & roles',
            text: 'Login, permissions, audit trails and data protection aligned with the Kenya Data Protection Act.',
          },
          {
            title: 'Performance budget',
            text: 'Pages that load in under two seconds on a mid-range Android phone over 4G.',
          },
        ],
        outcomes: [
          'Higher conversion and lower bounce',
          'Fewer support calls',
          'A platform that scales with traffic',
        ],
        technologies: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis'],
        faqs: [
          {
            question: 'Can you redesign our existing web app?',
            answer:
              'Yes. We usually improve it in stages so your users never face a risky “big bang” switch-over.',
          },
          {
            question: 'Will it rank on Google?',
            answer:
              'We build with technical SEO in mind: fast pages, clean URLs, structured data and correct metadata.',
          },
        ],
      },
      {
        title: 'Enterprise systems',
        summary: 'Large, integrated systems for organisations with complex operations.',
        intro:
          'Multi-branch operations, approvals, compliance and many integrations need careful architecture. We design enterprise systems that remain understandable as they grow, with clear modules, strong audit trails and predictable performance.',
        deliverables: [
          {
            title: 'Architecture & roadmap',
            text: 'A modular design and a phased plan that delivers value early and reduces risk.',
          },
          {
            title: 'Workflow & approvals',
            text: 'Configurable approval chains, notifications and complete audit logs.',
          },
          {
            title: 'Integrations',
            text: 'Connections to ERP, payment, HR, government and partner systems.',
          },
        ],
        outcomes: [
          'Consistent processes across branches',
          'Audit-ready records',
          'Lower cost of change over time',
        ],
        technologies: [
          'Python',
          'TypeScript',
          'PostgreSQL',
          'Message queues',
          'Docker',
          'Kubernetes',
        ],
        faqs: [
          {
            question: 'Can you work with our internal IT team?',
            answer:
              'Yes. We regularly work alongside in-house teams, sharing code, documentation and knowledge as we go.',
          },
          {
            question: 'How do you handle sensitive data?',
            answer:
              'Encryption in transit and at rest, least-privilege access, audit logging and data-processing agreements as standard.',
          },
        ],
      },
      {
        title: 'Legacy modernisation',
        summary: 'Move old systems to modern technology without stopping the business.',
        intro:
          'Old systems hold years of valuable business rules — and growing risk. We modernise step by step: wrapping, replacing and migrating parts of the system while it keeps running, so there is never a risky weekend cut-over.',
        deliverables: [
          {
            title: 'System assessment',
            text: 'An honest audit of what to keep, what to replace and what it will cost.',
          },
          {
            title: 'Incremental migration',
            text: 'New modules run alongside the old system until each part is safely replaced.',
          },
          {
            title: 'Data migration',
            text: 'Cleaned, verified data with reconciliation reports you can sign off.',
          },
        ],
        outcomes: [
          'Reduced operational risk',
          'Lower hosting and licence costs',
          'A system new developers can maintain',
        ],
        technologies: ['PHP / Laravel', 'Python', 'TypeScript', 'PostgreSQL', 'MySQL', 'Docker'],
        faqs: [
          {
            question: 'Will our staff need retraining?',
            answer:
              'We keep familiar workflows where they work well and provide training for anything that changes.',
          },
          {
            question: 'What if the original developer has left?',
            answer:
              'That is common. We reverse-engineer the system, document it, and then plan the migration.',
          },
        ],
      },
      {
        title: 'APIs & microservices',
        summary: 'Clean, documented APIs that let your systems and partners connect.',
        intro:
          'Good APIs let your mobile apps, partners and internal systems share data safely. We design versioned, documented and monitored APIs that other developers enjoy using.',
        deliverables: [
          {
            title: 'API design',
            text: 'REST or GraphQL contracts designed and reviewed before implementation.',
          },
          {
            title: 'Developer documentation',
            text: 'Interactive OpenAPI docs, examples and a sandbox environment.',
          },
          {
            title: 'Security & limits',
            text: 'Authentication, rate limiting, monitoring and alerting from day one.',
          },
        ],
        outcomes: [
          'Faster partner onboarding',
          'Mobile and web apps sharing one backend',
          'Fewer integration failures',
        ],
        technologies: ['FastAPI', 'Node.js', 'GraphQL', 'OpenAPI', 'PostgreSQL', 'Redis'],
        faqs: [
          {
            question: 'Can you document an API we already have?',
            answer:
              'Yes, we can audit, document and harden existing APIs without breaking current consumers.',
          },
          {
            question: 'Do you build webhooks?',
            answer: 'Yes, including signed payloads, retries and delivery logs.',
          },
        ],
      },
    ],
  },
  {
    title: 'Mobile & Product',
    slug: 'mobile-and-product',
    summary: 'iOS and Android apps, product design and MVPs that users keep coming back to.',
    intro:
      'Great apps are simple to use and quick to load, even on modest phones and patchy networks. We design and build mobile products with the user at the centre — from first sketch to the app stores and beyond.',
    services: [
      {
        title: 'iOS & Android apps',
        summary: 'Native-quality apps for the phones your customers actually use.',
        intro:
          'We build mobile apps that feel at home on both iPhone and Android, work offline where it matters, and handle real-world conditions like low storage and intermittent data.',
        deliverables: [
          {
            title: 'App design',
            text: 'Platform-appropriate interfaces, tested with your users before development.',
          },
          {
            title: 'Development & testing',
            text: 'Automated tests and testing on real low- and mid-range devices.',
          },
          {
            title: 'Store launch',
            text: 'App Store and Google Play listing, review process and release management.',
          },
        ],
        outcomes: [
          'High store ratings',
          'Lower data usage for your customers',
          'Reliable offline behaviour',
        ],
        technologies: ['Flutter', 'React Native', 'Kotlin', 'Swift', 'Firebase', 'Expo'],
        faqs: [
          {
            question: 'Native or cross-platform?',
            answer:
              'For most business apps, cross-platform (Flutter or React Native) gives native quality at a lower cost. We recommend native only when the app truly needs it.',
          },
          {
            question: 'Can the app work offline?',
            answer:
              'Yes. We design offline-first where it matters and sync safely when the connection returns.',
          },
        ],
      },
      {
        title: 'Cross-platform apps',
        summary: 'One codebase for iOS, Android and web — without compromising quality.',
        intro:
          'A single, well-architected codebase lets you launch on every platform at once and ship improvements faster, at a fraction of the cost of separate native teams.',
        deliverables: [
          {
            title: 'Shared architecture',
            text: 'Business logic shared across platforms, with native features where needed.',
          },
          {
            title: 'Performance tuning',
            text: 'Smooth animations and fast start-up on older devices.',
          },
          {
            title: 'Release pipeline',
            text: 'Automated builds and over-the-air updates where supported.',
          },
        ],
        outcomes: [
          'Faster time to market',
          'Lower maintenance cost',
          'Consistent experience everywhere',
        ],
        technologies: ['Flutter', 'React Native', 'Expo', 'TypeScript', 'Dart'],
        faqs: [
          {
            question: 'Will it feel like a “real” app?',
            answer:
              'Yes — modern cross-platform frameworks render at native speed and use native components where it matters.',
          },
          {
            question: 'Can we add a web version later?',
            answer: 'Usually yes, sharing much of the same code and design system.',
          },
        ],
      },
      {
        title: 'UI/UX & product design',
        summary: 'Research-led design that makes complex software feel simple.',
        intro:
          'We design interfaces people understand without a manual. Our designers work from research and real tasks, not decoration, and hand developers a complete, consistent design system.',
        deliverables: [
          {
            title: 'User research',
            text: 'Interviews and task analysis with the people who will use the product.',
          },
          {
            title: 'Prototypes & testing',
            text: 'Clickable prototypes validated with real users before build.',
          },
          {
            title: 'Design system',
            text: 'Reusable components, colours and typography documented for developers.',
          },
        ],
        outcomes: [
          'Faster task completion',
          'Less training needed',
          'A consistent, recognisable product',
        ],
        technologies: ['Figma', 'Prototyping', 'Usability testing', 'Design systems'],
        faqs: [
          {
            question: 'Can you redesign an existing product?',
            answer: 'Yes. We begin with an audit and usability testing to find what to fix first.',
          },
          {
            question: 'Do you only design, or also build?',
            answer:
              'Both. Many clients hire us for design only; others for design and engineering together.',
          },
        ],
      },
      {
        title: 'MVP development',
        summary: 'Launch a focused first version in weeks, then learn from real users.',
        intro:
          'Founders and innovation teams need to learn quickly without wasting budget. We help you decide what not to build, then ship a focused, production-quality first version you can put in front of customers.',
        deliverables: [
          {
            title: 'Scope workshop',
            text: 'We cut the idea down to the smallest version that proves the value.',
          },
          { title: '6–10 week build', text: 'A production-ready MVP, not a throwaway prototype.' },
          {
            title: 'Analytics & feedback',
            text: 'Measurement built in so you know what users actually do.',
          },
        ],
        outcomes: [
          'Real user feedback in weeks',
          'A foundation you can scale',
          'A clear roadmap for version two',
        ],
        technologies: [
          'Next.js',
          'Flutter',
          'Supabase / PostgreSQL',
          'Stripe / M-Pesa',
          'Analytics',
        ],
        faqs: [
          {
            question: 'How fast can we launch?',
            answer: 'Most MVPs launch in 6–10 weeks, depending on scope and integrations.',
          },
          {
            question: 'Is an MVP low quality?',
            answer: 'No. It is small in scope, not in quality. We build it so it can grow.',
          },
        ],
      },
    ],
  },
  {
    title: 'Cloud & Hosting',
    slug: 'cloud-and-hosting',
    summary: 'Fast, secure hosting, domains, business email and cloud infrastructure.',
    intro:
      'Your website and systems are only as good as the infrastructure under them. We host, monitor and maintain them on fast, secure servers — with local support that answers the phone.',
    services: [
      {
        title: 'Web hosting',
        summary: 'Fast, secure website hosting with daily backups and local support.',
        intro:
          'NVMe-powered hosting for business websites and WordPress, with free SSL, daily backups and a Kenyan team you can reach on WhatsApp. No upsell traps, no slow shared servers.',
        deliverables: [
          { title: 'Fast servers', text: 'NVMe storage, HTTP/2 and caching tuned for speed.' },
          { title: 'Free SSL & security', text: 'Automatic HTTPS, firewall and malware scanning.' },
          {
            title: 'Daily backups',
            text: 'Restorable backups kept off-server, with one-click restore.',
          },
        ],
        outcomes: [
          'Faster websites',
          'Peace of mind with backups',
          'Support from people who know your site',
        ],
        technologies: ['NVMe', 'LiteSpeed / Nginx', 'Cloudflare', "Let's Encrypt"],
        faqs: [
          {
            question: 'Can you move my existing website?',
            answer:
              'Yes, migration is free on all hosting plans and we handle it with no downtime.',
          },
          {
            question: 'Can I pay with M-Pesa?',
            answer: 'Yes. You can pay monthly or yearly via M-Pesa, card or bank transfer.',
          },
        ],
      },
      {
        title: 'Domains & business email',
        summary: '.co.ke and .com domains, plus professional email on your own domain.',
        intro:
          'Look professional with email at your own domain. We register and manage your .co.ke, .ke and .com domains, set up DNS correctly, and configure email that actually reaches the inbox.',
        deliverables: [
          {
            title: 'Domain registration',
            text: '.co.ke, .ke, .com and more, with auto-renewal reminders.',
          },
          {
            title: 'Business email',
            text: 'Mailboxes on your domain with webmail and phone apps.',
          },
          {
            title: 'Deliverability setup',
            text: 'SPF, DKIM and DMARC configured so your emails avoid spam folders.',
          },
        ],
        outcomes: ['A professional image', 'Emails that land in inboxes', 'No surprise expiries'],
        technologies: ['DNS', 'SPF / DKIM / DMARC', 'Google Workspace', 'Zoho Mail'],
        faqs: [
          {
            question: 'Can you transfer my domain from another provider?',
            answer: 'Yes, we handle the transfer and DNS so your website and email keep working.',
          },
          {
            question: 'Do you set up Google Workspace?',
            answer: 'Yes, as well as Zoho Mail and our own hosted mailboxes.',
          },
        ],
      },
      {
        title: 'VPS & cloud servers',
        summary: 'Dedicated resources for applications that have outgrown shared hosting.',
        intro:
          'Managed virtual servers for applications, APIs and databases that need guaranteed resources. We set them up securely, monitor them around the clock and keep them patched.',
        deliverables: [
          {
            title: 'Secure setup',
            text: 'Hardened OS, firewall, SSH keys and automatic security updates.',
          },
          {
            title: 'Monitoring & alerts',
            text: 'Uptime, resource and error monitoring with alerts to our engineers.',
          },
          {
            title: 'Backups & snapshots',
            text: 'Scheduled off-site backups and tested restore procedures.',
          },
        ],
        outcomes: [
          'Predictable performance',
          'Fewer security incidents',
          'An engineer watching your servers',
        ],
        technologies: [
          'Ubuntu',
          'Docker',
          'Nginx',
          'PostgreSQL',
          'Cloudflare',
          'Uptime monitoring',
        ],
        faqs: [
          {
            question: 'Managed or unmanaged?',
            answer:
              'Both. Managed plans include monitoring, patching and support; unmanaged plans give you root access only.',
          },
          {
            question: 'Where are the servers?',
            answer:
              'We use reputable data centres and can recommend regions based on your users and data requirements.',
          },
        ],
      },
      {
        title: 'DevOps & CI/CD',
        summary: 'Automated testing and deployment so releases are routine, not risky.',
        intro:
          'If deploying is stressful, it happens too rarely. We automate builds, tests and deployments, containerise applications and set up monitoring, so your team can release safely any day of the week.',
        deliverables: [
          { title: 'CI/CD pipelines', text: 'Automatic tests and deployments on every change.' },
          {
            title: 'Containerisation',
            text: 'Docker images and reproducible environments from laptop to production.',
          },
          {
            title: 'Observability',
            text: 'Logs, metrics and error tracking that show problems before users do.',
          },
        ],
        outcomes: [
          'More frequent, safer releases',
          'Faster recovery from incidents',
          'Less time on manual operations',
        ],
        technologies: [
          'GitHub Actions',
          'GitLab CI',
          'Docker',
          'Kubernetes',
          'Terraform',
          'Sentry',
        ],
        faqs: [
          {
            question: 'Can you work with our existing setup?',
            answer: 'Yes, we improve what you have rather than replacing everything.',
          },
          {
            question: 'Do you offer on-call support?',
            answer: 'Yes, as part of our SLA support plans.',
          },
        ],
      },
      {
        title: 'Managed maintenance',
        summary: 'Updates, monitoring and fixes for your websites and applications.',
        intro:
          'Software needs care after launch. Our maintenance plans keep your website or application updated, secure and fast, with a fixed monthly fee and clear response times.',
        deliverables: [
          {
            title: 'Updates & patches',
            text: 'Framework, plugin and security updates applied and tested.',
          },
          { title: 'Monitoring', text: 'Uptime and performance checks, with alerts to our team.' },
          {
            title: 'Monthly hours',
            text: 'Development time for small improvements and content changes.',
          },
        ],
        outcomes: [
          'Fewer outages and security issues',
          'Predictable costs',
          'A team that knows your system',
        ],
        technologies: [
          'Uptime monitoring',
          'Automated backups',
          'Security scanning',
          'Performance audits',
        ],
        faqs: [
          {
            question: 'Can you maintain software another company built?',
            answer: 'Yes. We start with a short audit, then take over maintenance.',
          },
          {
            question: 'What are the response times?',
            answer:
              'They depend on your plan, from same-day to under one hour for critical issues.',
          },
        ],
      },
    ],
  },
  {
    title: 'Payments & Integrations',
    slug: 'payments-and-integrations',
    summary: 'M-Pesa, card payments, SMS, WhatsApp and the systems your business depends on.',
    intro:
      'Money and messages must arrive every time. We connect your systems to M-Pesa, banks, card processors, SMS and WhatsApp — with reconciliation, retries and monitoring built in.',
    services: [
      {
        title: 'M-Pesa integration',
        summary: 'STK Push, Paybill, Till, B2C and automatic reconciliation.',
        intro:
          'We integrate M-Pesa Daraja APIs into websites, apps and business systems: customers pay with a prompt on their phone, payments are matched automatically, and refunds or payouts happen from your system.',
        deliverables: [
          {
            title: 'STK Push (Lipa na M-Pesa)',
            text: 'Payment prompts sent straight to the customer’s phone at checkout.',
          },
          {
            title: 'C2B, Paybill & Till',
            text: 'Real-time confirmation and automatic matching to invoices or accounts.',
          },
          {
            title: 'B2C payouts & refunds',
            text: 'Disbursements, salaries, refunds and commissions from your system.',
          },
          {
            title: 'Reconciliation',
            text: 'Every transaction recorded, matched and exportable for accounting.',
          },
        ],
        outcomes: [
          'Faster checkout',
          'No manual payment matching',
          'Fewer failed or lost payments',
        ],
        technologies: [
          'M-Pesa Daraja API',
          'Webhooks',
          'Python / Node.js',
          'PostgreSQL',
          'Queue workers',
        ],
        faqs: [
          {
            question: 'Do I need a Paybill or Till number?',
            answer:
              'Yes, from Safaricom. We guide you through the application and Daraja go-live process.',
          },
          {
            question: 'How do you handle failed callbacks?',
            answer:
              'We store every request, retry safely and query transaction status, so no payment is ever lost.',
          },
        ],
        relatedProducts: ['m-pesa-integration'],
      },
      {
        title: 'Payment gateways',
        summary: 'Card, bank and mobile money payments in one checkout.',
        intro:
          'Accept Visa, Mastercard, Airtel Money, bank transfers and M-Pesa in a single, secure checkout. We integrate leading gateways and keep sensitive card data off your servers.',
        deliverables: [
          {
            title: 'Unified checkout',
            text: 'One flow for cards, mobile money and bank payments.',
          },
          {
            title: 'Subscriptions & invoices',
            text: 'Recurring billing, payment links and automated reminders.',
          },
          { title: 'Security', text: 'Tokenised payments and PCI-aware architecture.' },
        ],
        outcomes: [
          'Higher payment success',
          'Lower compliance burden',
          'Payments from customers abroad',
        ],
        technologies: ['Pesapal', 'Flutterwave', 'Paystack', 'Stripe', 'Airtel Money'],
        faqs: [
          {
            question: 'Which gateway should we use?',
            answer:
              'It depends on your customers, currencies and fees. We compare options and recommend one honestly.',
          },
          {
            question: 'Do you store card numbers?',
            answer:
              'No. Card data goes directly to the gateway; your system only stores secure tokens.',
          },
        ],
      },
      {
        title: 'SMS & WhatsApp APIs',
        summary: 'Notifications, reminders and two-way conversations at scale.',
        intro:
          'Reach customers where they are. We integrate bulk SMS, WhatsApp Business messaging and USSD into your systems for reminders, alerts, OTPs and two-way customer conversations.',
        deliverables: [
          {
            title: 'Transactional messages',
            text: 'Receipts, reminders, OTPs and alerts triggered by your system.',
          },
          { title: 'Two-way conversations', text: 'Shared inbox for WhatsApp and SMS replies.' },
          { title: 'Delivery tracking', text: 'Delivery reports and opt-out handling built in.' },
        ],
        outcomes: [
          'Fewer missed payments and appointments',
          'Faster customer replies',
          'Compliant messaging',
        ],
        technologies: ["Africa's Talking", 'WhatsApp Business API', 'Twilio', 'USSD'],
        faqs: [
          {
            question: 'Can customers reply to our messages?',
            answer: 'Yes. Replies arrive in a shared inbox — see our Tolkyn product.',
          },
          {
            question: 'Do you handle opt-outs?',
            answer: 'Yes, STOP requests are honoured automatically.',
          },
        ],
        relatedProducts: ['tolkyn'],
      },
      {
        title: 'Systems integration',
        summary: 'Make your software talk to each other — reliably.',
        intro:
          'Data re-typed between systems causes errors and wasted hours. We connect ERPs, CRMs, e-commerce, banks, KRA eTIMS and partner systems so information flows automatically and accurately.',
        deliverables: [
          { title: 'Integration mapping', text: 'Which data moves where, when and who owns it.' },
          {
            title: 'Connectors & sync',
            text: 'Robust connectors with retries, logging and alerting.',
          },
          {
            title: 'Compliance integrations',
            text: 'KRA eTIMS and other regulatory integrations.',
          },
        ],
        outcomes: ['No double entry', 'Accurate, timely data', 'Visibility when something fails'],
        technologies: ['REST / SOAP', 'Webhooks', 'KRA eTIMS', 'Queues', 'ETL'],
        faqs: [
          {
            question: 'Can you integrate with KRA eTIMS?',
            answer:
              'Yes, we integrate invoicing systems with eTIMS so invoices are transmitted automatically.',
          },
          {
            question: 'What if the other system has no API?',
            answer:
              'We look at alternatives such as database sync, file exchange or secure automation.',
          },
        ],
      },
    ],
  },
  {
    title: 'Business Systems',
    slug: 'business-systems',
    summary: 'ERP, POS, CRM, HR and industry systems for schools, property and sports.',
    intro:
      'Ready-built systems you can adapt, instead of starting from zero. Each is proven in production, integrates with M-Pesa, and can be customised to your processes and hosted by us.',
    services: [
      {
        title: 'ERP implementation',
        summary: 'Finance, inventory, HR and operations in one connected system.',
        intro:
          'We implement and customise ERP for growing Kenyan businesses: accounting, invoicing, inventory, procurement, HR and payroll, fixed assets and manufacturing — configured to how you work and integrated with M-Pesa and KRA.',
        deliverables: [
          {
            title: 'Process configuration',
            text: 'Chart of accounts, approvals and workflows set up for your business.',
          },
          {
            title: 'Data migration',
            text: 'Balances, customers, suppliers and stock moved in safely.',
          },
          {
            title: 'Training & support',
            text: 'Hands-on training per department and post-launch support.',
          },
        ],
        outcomes: [
          'Faster month-end close',
          'Real-time stock and cash visibility',
          'Compliance with KRA requirements',
        ],
        technologies: ['Oqtekal ERP', 'PostgreSQL', 'KRA eTIMS', 'M-Pesa'],
        faqs: [
          {
            question: 'Can we start with just accounting?',
            answer:
              'Yes. Most clients start with finance and invoicing, then add modules as they grow.',
          },
          {
            question: 'Does payroll handle Kenyan statutory deductions?',
            answer: 'Yes: PAYE, SHIF, NSSF, Housing Levy and reliefs, with the required returns.',
          },
        ],
        relatedProducts: ['erp'],
      },
      {
        title: 'POS & inventory',
        summary: 'Point of sale and stock control for retail and hospitality.',
        intro:
          'A fast till that works offline, barcode scanning, M-Pesa payments, stock levels per branch and sales reports on your phone — built for Kenyan shops, supermarkets and restaurants.',
        deliverables: [
          {
            title: 'Point of sale',
            text: 'Fast checkout with barcode scanning, receipts and M-Pesa.',
          },
          {
            title: 'Stock control',
            text: 'Stock levels, transfers, re-order alerts and stock takes.',
          },
          { title: 'Reports', text: 'Daily sales, margins and best-sellers per branch.' },
        ],
        outcomes: ['Shorter queues', 'Less stock loss', 'Know your numbers every day'],
        technologies: ['Offline-first apps', 'Barcode & label printing', 'M-Pesa', 'Cloud sync'],
        faqs: [
          {
            question: 'Does it work when the internet is down?',
            answer: 'Yes. Sales continue offline and sync when the connection returns.',
          },
          {
            question: 'Can it handle multiple branches?',
            answer: 'Yes, with stock and sales per branch and consolidated reports.',
          },
        ],
      },
      {
        title: 'CRM systems',
        summary: 'Track customers, leads and conversations in one place.',
        intro:
          'Stop losing leads in WhatsApp chats and notebooks. We implement CRM that captures every enquiry, tracks follow-ups and connects to your messaging channels, so your team never forgets a customer.',
        deliverables: [
          {
            title: 'Lead & pipeline tracking',
            text: 'Every enquiry captured, assigned and followed up.',
          },
          {
            title: 'Channel integration',
            text: 'WhatsApp, SMS, email and calls linked to each customer.',
          },
          { title: 'Reports', text: 'Conversion, response times and team performance.' },
        ],
        outcomes: [
          'More leads converted',
          'Faster responses',
          'A complete history of every customer',
        ],
        technologies: ['Tolkyn', 'WhatsApp Business API', 'Email', 'Telephony'],
        faqs: [
          {
            question: 'Can it import our existing contacts?',
            answer: 'Yes, from spreadsheets, phones and other systems, with duplicates removed.',
          },
          {
            question: 'Does it include telephony?',
            answer: 'Yes, Tolkyn includes calling, IVR and call logging.',
          },
        ],
        relatedProducts: ['tolkyn'],
      },
      {
        title: 'HR & payroll systems',
        summary: 'Kenyan payroll, leave and staff records — accurate every month.',
        intro:
          'Payroll errors damage trust. Our HR and payroll systems calculate Kenyan statutory deductions correctly, generate payslips and returns, and manage leave, contracts and staff records.',
        deliverables: [
          {
            title: 'Statutory payroll',
            text: 'PAYE, SHIF, NSSF, Housing Levy, reliefs and P9 forms.',
          },
          { title: 'Self-service', text: 'Payslips and leave requests on the phone.' },
          {
            title: 'Bank & M-Pesa payouts',
            text: 'Salary files for banks and bulk M-Pesa payments.',
          },
        ],
        outcomes: ['Accurate, on-time payroll', 'Less HR admin', 'Audit-ready records'],
        technologies: ['Oqtekal ERP', 'KRA iTax formats', 'M-Pesa B2C', 'Bank files'],
        faqs: [
          {
            question: 'Do you keep up with tax changes?',
            answer: 'Yes. Statutory rates are updated as regulations change.',
          },
          {
            question: 'Can staff access payslips on their phones?',
            answer: 'Yes, through a secure self-service portal.',
          },
        ],
        relatedProducts: ['erp'],
      },
      {
        title: 'Industry systems',
        summary: 'School, property and sports management systems, ready to adapt.',
        intro:
          'Purpose-built systems for schools, landlords and property managers, and sports leagues and clubs. Each solves the everyday problems of its industry and connects to M-Pesa and SMS out of the box.',
        deliverables: [
          {
            title: 'School management',
            text: 'Admissions, fees, exams, timetables and parent communication.',
          },
          {
            title: 'Property management',
            text: 'Tenants, rent collection, reminders, maintenance and owner reports.',
          },
          {
            title: 'Sports management',
            text: 'Leagues, fixtures, registrations, results and ticketing.',
          },
        ],
        outcomes: [
          'Days of admin saved every month',
          'Faster payments',
          'Happier parents, tenants and fans',
        ],
        technologies: ['Web & mobile apps', 'M-Pesa', 'SMS & WhatsApp', 'Cloud hosting'],
        faqs: [
          {
            question: 'Can these be customised?',
            answer: 'Yes. They are ready to use, and we adapt them to your rules and branding.',
          },
          {
            question: 'Do you offer a demo?',
            answer: 'Yes — request a demo from any product page.',
          },
        ],
        relatedProducts: ['school-management', 'property-management', 'sports-management'],
      },
    ],
  },
  {
    title: 'Data & Automation',
    slug: 'data-and-automation',
    summary: 'Dashboards, data pipelines, workflow automation and practical AI.',
    intro:
      'Decisions improve when the right numbers are visible and repetitive work is automated. We turn scattered data into reliable reporting, and automate the tasks that waste your team’s time.',
    services: [
      {
        title: 'Dashboards & reporting',
        summary: 'The numbers that matter, live, in one place.',
        intro:
          'We build dashboards that answer real management questions — sales, cash, collections, stock, performance — from your live systems, so nobody waits for a spreadsheet at month-end.',
        deliverables: [
          {
            title: 'KPI definition',
            text: 'We agree what to measure and how, so everyone trusts the numbers.',
          },
          { title: 'Live dashboards', text: 'Interactive dashboards on desktop and mobile.' },
          { title: 'Scheduled reports', text: 'Automatic summaries by email or WhatsApp.' },
        ],
        outcomes: ['Faster decisions', 'One version of the truth', 'Less manual reporting'],
        technologies: ['Metabase', 'Power BI', 'PostgreSQL', 'Python'],
        faqs: [
          {
            question: 'Can it combine data from several systems?',
            answer: 'Yes, that is usually the point. We bring the data together first.',
          },
          {
            question: 'Can managers see it on their phones?',
            answer: 'Yes, dashboards are designed to work on mobile.',
          },
        ],
      },
      {
        title: 'Data engineering',
        summary: 'Reliable pipelines that collect, clean and organise your data.',
        intro:
          'Good analytics needs clean, well-structured data. We build pipelines and data warehouses that collect data from your systems, clean it and keep it up to date automatically.',
        deliverables: [
          { title: 'Pipelines', text: 'Scheduled, monitored data extraction and loading.' },
          { title: 'Data warehouse', text: 'A clean, documented model ready for reporting.' },
          { title: 'Data quality', text: 'Validation checks that flag problems early.' },
        ],
        outcomes: ['Trustworthy data', 'Reports that build themselves', 'A foundation for AI'],
        technologies: ['Python', 'dbt', 'PostgreSQL', 'Airflow', 'BigQuery'],
        faqs: [
          {
            question: 'Do we need a data warehouse?',
            answer: 'Not always. We recommend the simplest setup that meets your reporting needs.',
          },
          {
            question: 'How do you protect personal data?',
            answer:
              'We minimise, anonymise and restrict access in line with the Data Protection Act.',
          },
        ],
      },
      {
        title: 'Workflow automation',
        summary: 'Let software do the repetitive work.',
        intro:
          'Approvals by email, copying data between systems, sending the same reminders every week — we automate these workflows so your team can focus on work that needs people.',
        deliverables: [
          { title: 'Process audit', text: 'We find the tasks that cost the most time.' },
          { title: 'Automations', text: 'Reliable automations with logs and error alerts.' },
          {
            title: 'Documents & approvals',
            text: 'Generated documents and digital approval chains.',
          },
        ],
        outcomes: ['Hours saved every week', 'Fewer human errors', 'Faster turnaround'],
        technologies: ['n8n', 'Python', 'APIs', 'Webhooks', 'Document generation'],
        faqs: [
          {
            question: 'What should we automate first?',
            answer:
              'Frequent, rule-based tasks with clear inputs — we will help you rank them by value.',
          },
          {
            question: 'What happens when an automation fails?',
            answer: 'It alerts the right person and keeps a log, so nothing fails silently.',
          },
        ],
      },
      {
        title: 'AI integration',
        summary: 'Practical AI features that solve real problems — not hype.',
        intro:
          'We add AI where it genuinely helps: summarising documents, answering customer questions from your own knowledge base, classifying requests and extracting data from forms — with human review where it matters.',
        deliverables: [
          {
            title: 'Use-case assessment',
            text: 'An honest view of where AI adds value, and where it does not.',
          },
          {
            title: 'Assistants on your data',
            text: 'Answers grounded in your documents, with sources.',
          },
          { title: 'Document processing', text: 'Extracting data from invoices, forms and IDs.' },
        ],
        outcomes: ['Faster responses', 'Less manual data entry', 'Measured, responsible AI use'],
        technologies: ['Large language models', 'Retrieval (RAG)', 'Python', 'Vector search'],
        faqs: [
          {
            question: 'Is our data safe?',
            answer:
              'We choose providers and setups that do not train on your data, and restrict access carefully.',
          },
          {
            question: 'Will AI replace our staff?',
            answer: 'Our focus is removing tedious work so your people can do more valuable work.',
          },
        ],
      },
    ],
  },
  {
    title: 'Security & Support',
    slug: 'security-and-support',
    summary: 'Security audits, backups, IT consulting and dependable support.',
    intro:
      'Technology is only valuable when it is safe and available. We protect your systems, plan for the worst, and stay on call when you need us.',
    services: [
      {
        title: 'Security audits',
        summary: 'Find and fix vulnerabilities before attackers do.',
        intro:
          'We review your applications, servers and processes for security weaknesses, explain the risks in plain language and help you fix them in order of importance.',
        deliverables: [
          {
            title: 'Application review',
            text: 'Testing for common vulnerabilities such as those in the OWASP Top 10.',
          },
          {
            title: 'Infrastructure review',
            text: 'Server, network and access configuration checks.',
          },
          { title: 'Prioritised report', text: 'Clear findings, risk ratings and fix guidance.' },
        ],
        outcomes: [
          'Reduced risk of breaches',
          'Confidence for clients and partners',
          'Data protection compliance',
        ],
        technologies: ['OWASP', 'Penetration testing', 'Dependency scanning', 'Access reviews'],
        faqs: [
          {
            question: 'Will testing disrupt our systems?',
            answer:
              'We agree scope and timing in advance and avoid disruptive tests on production.',
          },
          {
            question: 'Can you help fix the issues?',
            answer: 'Yes, we can fix them or support your team while they do.',
          },
        ],
      },
      {
        title: 'Backups & disaster recovery',
        summary: 'Be able to recover — quickly — when something goes wrong.',
        intro:
          'Hardware fails, people make mistakes and ransomware happens. We design backup and recovery plans, automate them, and test restores regularly, so a bad day does not become a disaster.',
        deliverables: [
          {
            title: 'Backup strategy',
            text: 'What to back up, how often and where, based on your risk.',
          },
          {
            title: 'Automated off-site backups',
            text: 'Encrypted backups stored in a separate location.',
          },
          { title: 'Restore drills', text: 'Scheduled tests proving that recovery works.' },
        ],
        outcomes: [
          'Recover in hours, not weeks',
          'Protection from ransomware',
          'Proven, documented procedures',
        ],
        technologies: ['Encrypted backups', 'Object storage', 'Snapshots', 'Runbooks'],
        faqs: [
          {
            question: 'How often should we back up?',
            answer:
              'It depends on how much data you can afford to lose; for most systems, at least daily.',
          },
          {
            question: 'Have you tested restoring?',
            answer:
              'That is the question we ask every client. Untested backups are a hope, not a plan.',
          },
        ],
      },
      {
        title: 'IT consulting',
        summary: 'Independent advice on technology decisions.',
        intro:
          'Choosing systems, vendors or architecture is expensive to get wrong. We give independent, practical advice — and we will tell you when the simplest option is the right one.',
        deliverables: [
          {
            title: 'Technology strategy',
            text: 'A roadmap aligned with your business goals and budget.',
          },
          { title: 'Vendor selection', text: 'Requirements, comparisons and negotiation support.' },
          {
            title: 'Project rescue',
            text: 'Assessment and recovery plans for struggling projects.',
          },
        ],
        outcomes: ['Better decisions', 'Lower total cost', 'Projects back on track'],
        technologies: ['Architecture reviews', 'Requirements', 'Vendor assessment'],
        faqs: [
          {
            question: 'Do you only recommend your own products?',
            answer: 'No. If another product fits better, we will say so.',
          },
          {
            question: 'Can you review a vendor proposal?',
            answer: 'Yes, we regularly review proposals and contracts for clients.',
          },
        ],
      },
      {
        title: 'SLA support',
        summary: 'Guaranteed response times from engineers who know your system.',
        intro:
          'Critical systems need people ready to respond. Our support agreements give you clear response times, a named team, monitoring and regular health reports.',
        deliverables: [
          {
            title: 'Response guarantees',
            text: 'Defined response and resolution times by severity.',
          },
          { title: 'Multiple channels', text: 'Support by WhatsApp, phone, email and ticket.' },
          { title: 'Monthly reports', text: 'Uptime, incidents and recommendations.' },
        ],
        outcomes: ['Less downtime', 'Predictable support costs', 'Accountability'],
        technologies: ['Monitoring', 'Incident management', 'Ticketing'],
        faqs: [
          {
            question: 'Do you support evenings and weekends?',
            answer: 'Yes, extended and 24/7 cover are available on higher plans.',
          },
          {
            question: 'Can you support systems we did not build?',
            answer: 'Yes, after a short onboarding audit.',
          },
        ],
      },
    ],
  },
]

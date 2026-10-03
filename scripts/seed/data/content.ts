/* Seed content: work, people, hosting, articles, careers, legal and page copy.
 * Everything marked isPlaceholder must be replaced with real, approved information before launch. */

export const team = [
  {
    name: 'Bruno Sharif',
    role: 'Founder & Lead Engineer',
    focus: 'Turns business processes into dependable systems.',
    bio: 'Bruno leads engineering at Oqtekal and has built communication platforms, ERP and payment systems used daily by Kenyan businesses. He cares about software that is simple to use and boring to operate.',
    expertise: ['Systems architecture', 'Payments & M-Pesa', 'Python & TypeScript'],
    photo: 'team-1.jpg',
  },
  {
    name: 'Amina Odhiambo',
    role: 'Head of Product & Design',
    focus: 'Makes complex software feel simple.',
    bio: 'Amina leads product and design, turning research with real users into interfaces people understand without a manual. She runs discovery workshops and owns the design system behind every Oqtekal product.',
    expertise: ['Product strategy', 'UX research', 'Design systems'],
    photo: 'team-2.jpg',
  },
  {
    name: 'Wanjiru Kamau',
    role: 'Cloud & Infrastructure Lead',
    focus: 'Keeps every system fast, secure and online.',
    bio: 'Wanjiru runs Oqtekal’s hosting and infrastructure — servers, deployments, monitoring and backups — and leads our security and support practice.',
    expertise: ['Cloud & DevOps', 'Security', 'Site reliability'],
    photo: 'team-3.jpg',
  },
]

export const testimonials = [
  {
    quote:
      'Before Tolkyn, our customer messages lived on five different phones. Now the whole team works from one inbox and nothing falls through the cracks.',
    name: 'Grace M.',
    role: 'Operations Manager',
    company: 'Nairobi retail group',
  },
  {
    quote:
      'Fee payments now reconcile themselves. Our bursar used to spend the first week of every month matching M-Pesa messages — that time is simply gone.',
    name: 'Peter K.',
    role: 'School Administrator',
    company: 'Private secondary school, Kiambu',
  },
  {
    quote:
      'They asked better questions about our business than our previous vendor ever did, and delivered exactly what they promised, on time.',
    name: 'Daniel O.',
    role: 'Finance Director',
    company: 'Regional manufacturer',
  },
]

export const caseStudies = [
  {
    title: 'One inbox for every customer conversation',
    slug: 'retail-group-unified-inbox',
    client: 'Nairobi retail group',
    industry: 'Retail',
    year: 2026,
    summary:
      'Replacing five staff phones and three tools with a shared WhatsApp, SMS and call inbox.',
    product: 'tolkyn',
    services: ['SMS & WhatsApp APIs', 'CRM systems'],
    results: [
      { value: '4×', label: 'faster first response' },
      { value: '100%', label: 'conversations on record' },
      { value: '3 → 1', label: 'tools to manage' },
    ],
    challenge:
      'Customer enquiries arrived through personal WhatsApp numbers, an SMS tool and phone calls. When staff were away or left, conversations and customer history went with them, and managers had no view of response times.',
    solution:
      'We deployed Tolkyn with a single WhatsApp Business number shared by the whole team, migrated and deduplicated their contacts into the phone book, and connected bulk SMS and cloud telephony so every interaction appears on one customer timeline.',
    approach: [
      {
        title: 'Discovery',
        text: 'Mapped every channel and the questions customers ask most often.',
      },
      {
        title: 'Migration',
        text: 'Moved contacts from phones and spreadsheets, removing duplicates.',
      },
      {
        title: 'Rollout',
        text: 'Trained the team in two short sessions and set up assignment rules.',
      },
    ],
    outcome:
      'Managers now see response times and workload per person, follow-ups are tracked, and customer history stays with the business — not on individual phones.',
    stack: ['Tolkyn', 'WhatsApp Business API', 'SMS', 'SIP telephony'],
    featured: true,
  },
  {
    title: 'Fees collected on time, without the queues',
    slug: 'school-fees-automation',
    client: 'Private secondary school, Kiambu',
    industry: 'Education',
    year: 2026,
    summary:
      'Automating M-Pesa fee collection, statements and reminders for a 1,200-student school.',
    product: 'school-management',
    services: ['M-Pesa integration', 'Industry systems'],
    results: [
      { value: '1 week', label: 'of bursar time saved monthly' },
      { value: 'Instant', label: 'payment matching' },
      { value: '24/7', label: 'parent statements' },
    ],
    challenge:
      'The bursar’s office matched hundreds of M-Pesa messages to students by hand each month, parents queued for statements, and fee balances were never quite up to date.',
    solution:
      'We rolled out our School Management system with M-Pesa Paybill integration: parents pay with the admission number as the account, payments are matched instantly and balances update in real time. SMS reminders go out automatically.',
    approach: [
      {
        title: 'Data clean-up',
        text: 'Imported and verified student records and opening balances.',
      },
      {
        title: 'Payments',
        text: 'Connected the school’s Paybill with automatic matching and receipts.',
      },
      { title: 'Communication', text: 'Set up balance requests and reminders by SMS.' },
    ],
    outcome:
      'Fee collection is faster, statements are accurate, and the office spends its time on students instead of spreadsheets.',
    stack: ['School Management', 'M-Pesa Daraja', 'SMS'],
    featured: true,
  },
  {
    title: 'Month-end close in days, not weeks',
    slug: 'manufacturer-erp',
    client: 'Regional manufacturer',
    industry: 'Manufacturing',
    year: 2025,
    summary: 'Bringing finance, stock, production and payroll into one ERP.',
    product: 'erp',
    services: ['ERP implementation', 'HR & payroll systems'],
    results: [
      { value: '3 days', label: 'to close the month' },
      { value: 'Live', label: 'stock and production costs' },
      { value: '0', label: 'payroll recalculations' },
    ],
    challenge:
      'Finance, stores and production each kept their own spreadsheets. Month-end close took more than two weeks, stock counts never matched the books and payroll was recalculated by hand every month.',
    solution:
      'We implemented the ERP Suite in three phases — finance first, then inventory and manufacturing, then HR and payroll — migrating balances and training each department as its module went live.',
    approach: [
      {
        title: 'Phase 1 · Finance',
        text: 'Chart of accounts, invoicing, receivables and bank reconciliation.',
      },
      {
        title: 'Phase 2 · Operations',
        text: 'Inventory, bills of materials and work orders with costing.',
      },
      {
        title: 'Phase 3 · People',
        text: 'HR records and statutory payroll with bank and M-Pesa payouts.',
      },
    ],
    outcome:
      'Management reviews live numbers every week, and the finance team closes the month in days.',
    stack: ['ERP Suite', 'PostgreSQL', 'M-Pesa', 'KRA eTIMS'],
    featured: true,
  },
]

export const hostingPlans = [
  {
    name: 'Starter',
    category: 'web',
    tagline: 'For a professional business website.',
    priceMonthly: 500,
    priceYearly: 5000,
    specs: [
      { label: 'Websites', value: '1' },
      { label: 'NVMe storage', value: '10 GB' },
      { label: 'Email accounts', value: '5' },
      { label: 'Bandwidth', value: 'Unmetered' },
    ],
    features: [
      'Free SSL certificate',
      'Daily backups',
      'Free website migration',
      'WhatsApp support',
    ],
    featured: false,
  },
  {
    name: 'Business',
    category: 'web',
    tagline: 'For growing businesses and online shops.',
    priceMonthly: 1200,
    priceYearly: 12000,
    specs: [
      { label: 'Websites', value: '5' },
      { label: 'NVMe storage', value: '50 GB' },
      { label: 'Email accounts', value: '25' },
      { label: 'Bandwidth', value: 'Unmetered' },
    ],
    features: [
      'Everything in Starter',
      'Free .co.ke domain (1st year)',
      'Staging site',
      'Malware scanning',
      'Priority support',
    ],
    featured: true,
  },
  {
    name: 'Pro',
    category: 'web',
    tagline: 'For busy sites that need more power.',
    priceMonthly: 2500,
    priceYearly: 25000,
    specs: [
      { label: 'Websites', value: 'Unlimited' },
      { label: 'NVMe storage', value: '150 GB' },
      { label: 'Email accounts', value: 'Unlimited' },
      { label: 'Bandwidth', value: 'Unmetered' },
    ],
    features: [
      'Everything in Business',
      'Dedicated resources',
      'Hourly backups',
      'Performance tuning',
      'Uptime monitoring',
    ],
    featured: false,
  },
  {
    name: 'Cloud VPS 2',
    category: 'vps',
    tagline: 'Managed server for apps and APIs.',
    priceMonthly: 3500,
    priceYearly: 35000,
    specs: [
      { label: 'vCPU', value: '2' },
      { label: 'RAM', value: '4 GB' },
      { label: 'NVMe storage', value: '80 GB' },
      { label: 'Management', value: 'Fully managed' },
    ],
    features: ['Security hardening', 'Monitoring & alerts', 'Weekly off-site backups', 'Patching'],
    featured: false,
  },
  {
    name: 'Cloud VPS 4',
    category: 'vps',
    tagline: 'For production systems and databases.',
    priceMonthly: 6500,
    priceYearly: 65000,
    specs: [
      { label: 'vCPU', value: '4' },
      { label: 'RAM', value: '8 GB' },
      { label: 'NVMe storage', value: '160 GB' },
      { label: 'Management', value: 'Fully managed' },
    ],
    features: [
      'Everything in VPS 2',
      'Daily off-site backups',
      'Docker & CI/CD setup',
      '1-hour critical response',
    ],
    featured: true,
  },
  {
    name: 'Cloud VPS 8',
    category: 'vps',
    tagline: 'For high-traffic platforms.',
    priceMonthly: 12500,
    priceYearly: 125000,
    specs: [
      { label: 'vCPU', value: '8' },
      { label: 'RAM', value: '16 GB' },
      { label: 'NVMe storage', value: '320 GB' },
      { label: 'Management', value: 'Fully managed' },
    ],
    features: [
      'Everything in VPS 4',
      'Load balancing ready',
      'Monthly health report',
      'Named engineer',
    ],
    featured: false,
  },
  {
    name: 'Business Email',
    category: 'email',
    tagline: 'Professional email on your own domain.',
    priceMonthly: 250,
    priceYearly: 2500,
    specs: [
      { label: 'Per mailbox', value: '1' },
      { label: 'Storage', value: '25 GB' },
      { label: 'Apps', value: 'Webmail, iOS, Android' },
    ],
    features: ['Spam & virus filtering', 'SPF, DKIM & DMARC setup', 'Calendar & contacts'],
    featured: false,
  },
]

export const jobs = [
  {
    title: 'Full-Stack Engineer (TypeScript / Python)',
    location: 'Nairobi · Hybrid',
    type: 'full-time',
    summary:
      'Build and improve the products and client systems that Kenyan organisations run on, from database to interface.',
    responsibilities: [
      'Design and build features across our products and client projects',
      'Write clear, tested, maintainable code and review others’ work',
      'Work directly with clients to understand real problems',
    ],
    requirements: [
      '3+ years building production web applications',
      'Strong TypeScript or Python, and solid SQL',
      'Care for users, clarity and craft',
    ],
  },
  {
    title: 'Engineering Intern',
    location: 'Nairobi · On-site',
    type: 'internship',
    summary:
      'A structured six-month internship working on real projects with mentorship from senior engineers.',
    responsibilities: [
      'Contribute to real features under mentorship',
      'Learn our engineering practices and tools',
    ],
    requirements: [
      'Final-year student or recent graduate in a computing field',
      'A project you can show us and talk about',
    ],
  },
]

export const posts = [
  {
    title: 'How to integrate M-Pesa STK Push without losing a single payment',
    slug: 'mpesa-stk-push-reliable-integration',
    category: 'payments',
    excerpt:
      'Callbacks fail, phones go offline and customers tap “cancel”. Here is how we design M-Pesa integrations that never lose track of money.',
    body: [
      [
        'p',
        'Most M-Pesa integrations work on the happy path. The problems start when the callback never arrives, the customer’s phone is switched off, or the same payment is confirmed twice. In production, those edge cases happen every day.',
      ],
      ['h2', '1. Store the request before you send it'],
      [
        'p',
        'Write every STK Push request to your database with its CheckoutRequestID before calling Safaricom. If anything fails afterwards, you still know exactly what you asked for and can recover.',
      ],
      ['h2', '2. Treat callbacks as notifications, not truth'],
      [
        'p',
        'Callbacks can be delayed, duplicated or lost. Make your callback handler idempotent, and run a scheduled job that queries the status of any request still pending after a few minutes.',
      ],
      ['h2', '3. Reconcile every day'],
      [
        'p',
        'Compare your records with the M-Pesa statement daily. Automated reconciliation turns a stressful month-end into a report you glance at.',
      ],
      [
        'p',
        'Done well, M-Pesa becomes the most reliable part of your checkout. Done casually, it becomes the source of your most painful support tickets.',
      ],
    ],
  },
  {
    title: 'Five signs your business has outgrown spreadsheets',
    slug: 'outgrown-spreadsheets',
    category: 'product',
    excerpt:
      'Spreadsheets are a brilliant start. Here is how to tell when they have quietly become the most expensive system you own.',
    body: [
      [
        'p',
        'Spreadsheets are flexible, familiar and free — which is exactly why they end up running far more of the business than they were ever meant to.',
      ],
      ['h2', 'The warning signs'],
      [
        'ul',
        [
          'Month-end takes longer every quarter',
          'Different people have different “latest” versions',
          'One person is the only one who understands the formulas',
          'You re-type the same data into several files',
          'You cannot answer simple questions without a day of work',
        ],
      ],
      [
        'p',
        'If three or more sound familiar, it is time to look at a system designed for the job — starting small, with the process that hurts most.',
      ],
    ],
  },
  {
    title: 'What “fast” really means for a Kenyan website',
    slug: 'fast-websites-kenya',
    category: 'cloud',
    excerpt:
      'Your visitors are mostly on mid-range Android phones and mobile data. Designing for them changes almost every technical decision.',
    body: [
      [
        'p',
        'A site that feels instant on office Wi-Fi can take ten seconds on a mid-range phone with a weak 4G signal — and most of your visitors are on exactly that.',
      ],
      ['h2', 'Measure on real devices'],
      [
        'p',
        'Test on the phones your customers use, over mobile data. Lab scores are useful, but real-user measurements tell the truth.',
      ],
      ['h2', 'Send less'],
      [
        'p',
        'Every kilobyte costs your visitors time and money. Optimise images, ship less JavaScript and host close to your users.',
      ],
    ],
  },
  {
    title: 'Why we build boring software',
    slug: 'why-we-build-boring-software',
    category: 'engineering',
    excerpt:
      'The most valuable systems are the ones nobody has to think about. Our engineering principles, explained.',
    body: [
      [
        'p',
        'Our clients do not want exciting software. They want software that works every morning, is easy to change, and does not need a hero to keep it running.',
      ],
      ['h2', 'Proven technology'],
      [
        'p',
        'We choose mainstream, well-supported tools so that any good engineer can maintain the system — including your own team.',
      ],
      ['h2', 'Small, frequent releases'],
      [
        'p',
        'Small changes are easy to test, easy to review and easy to undo. Big releases are where projects go wrong.',
      ],
    ],
  },
]

export const legal = {
  privacy: {
    title: 'Privacy policy',
    summary:
      'How Oqtekal collects, uses and protects personal data, in line with the Kenya Data Protection Act, 2019.',
    body: [
      [
        'p',
        'This policy explains how Oqtekal (“we”) handles personal data collected through oqtekal.com and our services. We process personal data in accordance with the Kenya Data Protection Act, 2019.',
      ],
      ['h2', 'What we collect'],
      [
        'p',
        'When you contact us we collect the details you provide, such as your name, email, phone number, company and message. We also collect limited, privacy-friendly analytics about how the site is used, without advertising cookies.',
      ],
      ['h2', 'How we use it'],
      [
        'p',
        'We use your details only to respond to your enquiry, provide our services, and — if you subscribe — send our newsletter. We never sell personal data.',
      ],
      ['h2', 'Your rights'],
      [
        'p',
        'You may request access to, correction of, or deletion of your personal data at any time by emailing hello@oqtekal.com.',
      ],
      ['h2', 'Retention & security'],
      [
        'p',
        'We keep personal data only as long as necessary and protect it with appropriate technical and organisational measures.',
      ],
    ],
  },
  terms: {
    title: 'Terms of use',
    summary: 'The terms that apply when you use oqtekal.com.',
    body: [
      [
        'p',
        'By using oqtekal.com you agree to these terms. If you do not agree, please do not use the site.',
      ],
      ['h2', 'Content'],
      [
        'p',
        'Content on this site is provided for general information. Specific services are governed by the written agreement between Oqtekal and the client.',
      ],
      ['h2', 'Intellectual property'],
      [
        'p',
        'The Oqtekal name, logo and site content are our property. Third-party names and logos belong to their respective owners.',
      ],
      ['h2', 'Liability'],
      [
        'p',
        'We work hard to keep this site accurate and available but provide it “as is”, without warranties, to the extent permitted by law.',
      ],
      ['h2', 'Governing law'],
      ['p', 'These terms are governed by the laws of Kenya.'],
    ],
  },
}

export const settings = {
  email: 'hello@oqtekal.com',
  phone: '+254 700 000 000',
  whatsapp: '254700000000',
  address: 'Nairobi, Kenya',
  hours: 'Mon – Fri, 8:00 – 18:00 EAT',
  socials: [
    { platform: 'linkedin', url: 'https://www.linkedin.com/company/oqtekal' },
    { platform: 'x', url: 'https://x.com/oqtekal' },
    { platform: 'facebook', url: 'https://www.facebook.com/oqtekal' },
    { platform: 'instagram', url: 'https://www.instagram.com/oqtekal' },
    { platform: 'github', url: 'https://github.com/oqtekal' },
    { platform: 'whatsapp', url: 'https://wa.me/254700000000' },
  ],
  stats: [
    { value: '40+', label: 'Systems delivered' },
    { value: '7', label: 'Service disciplines' },
    { value: '99.9%', label: 'Hosting uptime' },
    { value: '<1 day', label: 'Response time' },
  ],
  statsArePlaceholder: true,
}

export const home = {
  hero: {
    eyebrow: 'Software engineering company · Nairobi',
    heading: 'Engineering what runs business.',
    text: 'We design, build and run the software organisations depend on — custom systems, mobile apps, M-Pesa payments and hosting — engineered properly and supported for the long term.',
    primaryLabel: 'Start a project',
    secondaryLabel: 'Explore products',
  },
  productsIntro: {
    eyebrow: 'Products',
    heading: 'Proven systems, ready to adapt.',
    text: 'Software already running real organisations — customised to your rules, integrated with M-Pesa and hosted by us.',
  },
  servicesIntro: {
    eyebrow: 'Services',
    heading: 'Everything software, under one roof.',
    text: 'From the first idea to the server it runs on. One accountable team, seven disciplines.',
  },
  workIntro: {
    eyebrow: 'Selected work',
    heading: 'Measured by results, not deliverables.',
    text: 'A few of the systems we have built, and what changed for the organisations that use them.',
  },
  processIntro: {
    eyebrow: 'How we work',
    heading: 'A process designed to remove surprises.',
    text: 'Clear scope, visible progress every two weeks and a team that stays after launch.',
  },
  teamIntro: {
    eyebrow: 'The team',
    heading: 'Small team. Senior people. Direct line.',
    text: 'You work directly with the engineers who design and build your system — no account managers in between.',
  },
  hostingIntro: {
    eyebrow: 'Hosting',
    heading: 'Fast, secure hosting with people who pick up the phone.',
    text: 'NVMe servers, daily backups and free migration — billed in shillings, payable by M-Pesa.',
  },
  ctaIntro: {
    eyebrow: 'Start a project',
    heading: 'Have something in mind? Let’s talk it through.',
    text: 'Tell us what you are trying to achieve. You will hear back from an engineer within one business day.',
  },
  process: [
    {
      title: 'Discover',
      text: 'We learn how your organisation works, agree goals and define a clear, priced scope.',
      duration: '1–2 weeks',
    },
    {
      title: 'Design',
      text: 'Clickable prototypes tested with your users, so changes happen before code is written.',
      duration: '1–3 weeks',
    },
    {
      title: 'Build',
      text: 'Fortnightly releases to a staging site you can try. Progress is visible, never assumed.',
      duration: '4–12 weeks',
    },
    {
      title: 'Launch',
      text: 'Data migration, training and a calm, rehearsed go-live with us on hand.',
      duration: '1 week',
    },
    {
      title: 'Support',
      text: 'Monitoring, maintenance and improvements from the team that built it.',
      duration: 'Ongoing',
    },
  ],
}

export const about = {
  heading: 'We build the software organisations run on.',
  intro:
    'Oqtekal is a Nairobi software engineering company. We design, build, host and support the systems behind schools, businesses, landlords, leagues and enterprises across Kenya and beyond.',
  story: [
    'Oqtekal began with a simple observation: most organisations do not need more software — they need software that fits how they work, connects to the tools they already use, and keeps working long after launch.',
    'So we built a company around engineering properly. We ask more questions before we write code, we ship in small, visible steps, and we stay to support what we build. Our products — from Tolkyn to our ERP, school and property systems — grew out of real client problems, and every one of them integrates with M-Pesa from day one.',
    'Today we offer everything software-related under one roof: custom development, mobile apps, business systems, payments and integrations, data and automation, hosting and support. One team, accountable end to end.',
  ],
  values: [
    {
      title: 'Clarity over cleverness',
      text: 'Plain language, clear scope and code the next engineer can understand.',
    },
    {
      title: 'Craft in the details',
      text: 'Fast pages, careful copy, tested edge cases. Quality is a hundred small decisions.',
    },
    {
      title: 'Long-term partnership',
      text: 'We measure success years after launch, not on the day we hand over.',
    },
    {
      title: 'Honest advice',
      text: 'If the simplest option is the right one — or someone else’s product fits better — we say so.',
    },
  ],
  commitments: [
    'A fixed, written scope and price before work begins',
    'Visible progress on a staging site every two weeks',
    'You own the source code and your data',
    'Replies from an engineer within one business day',
    'Support from the team that built your system',
  ],
}

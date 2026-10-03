/* Seed content: products. */

type Visual =
  | 'comms'
  | 'school'
  | 'property'
  | 'erp'
  | 'sports'
  | 'payments'
  | 'pos'
  | 'health'
  | 'sacco'
  | 'store'

export type SeedProduct = {
  name: string
  slug: string
  tagline: string
  summary: string
  category: string
  availability: 'live' | 'beta' | 'soon' | 'custom'
  contextCaption?: string
  visual: Visual
  externalUrl?: string
  problem: string
  features: { title: string; text: string }[]
  audiences: { title: string; text: string }[]
  integrations: string[]
  highlights: { value: string; label: string }[]
  pricingNote?: string
  faqs: { question: string; answer: string }[]
  partnerLogo?: 'mpesa'
}

export const products: SeedProduct[] = [
  {
    name: 'Tolkyn',
    slug: 'tolkyn',
    contextCaption: 'Every customer conversation answered — from one shared inbox.',
    tagline: 'Every customer conversation, in one inbox.',
    summary:
      'WhatsApp, SMS, email and phone calls in a single shared inbox, with campaigns, a phone book and CRM built in.',
    category: 'Communications',
    availability: 'live',
    visual: 'comms',
    externalUrl: 'https://tolkyn.co.ke',
    problem:
      'Customer conversations are scattered across personal WhatsApp numbers, SMS tools, email and missed calls. Messages go unanswered, staff leave with customer history on their phones, and nobody knows how quickly the business really responds.',
    features: [
      {
        title: 'Shared WhatsApp inbox',
        text: 'Your whole team answers from one business number, with assignment, notes and history.',
      },
      {
        title: 'Bulk SMS & email campaigns',
        text: 'Send personalised campaigns to segments of your phone book, with delivery reports.',
      },
      {
        title: 'Cloud telephony & IVR',
        text: 'Business phone numbers, call routing, an auto-attendant and a softphone in the browser.',
      },
      {
        title: 'Phone book & CRM',
        text: 'Every contact, deduplicated, with a timeline of every message, call and interaction.',
      },
      {
        title: 'Follow-up tracking',
        text: 'Never forget a customer: see who needs a reply or a call back today.',
      },
      {
        title: 'Team performance',
        text: 'Response times, conversation volumes and outcomes by person and channel.',
      },
    ],
    audiences: [
      { title: 'Retail & e-commerce', text: 'Order updates, customer support and promotions.' },
      { title: 'Schools & institutions', text: 'Parent communication at scale.' },
      { title: 'Service businesses', text: 'Bookings, reminders and follow-ups.' },
    ],
    integrations: ['WhatsApp Business', 'SMS', 'Email', 'SIP telephony', 'M-Pesa', 'REST API'],
    highlights: [
      { value: '5', label: 'channels in one inbox' },
      { value: '1', label: 'shared business number' },
      { value: '0', label: 'conversations lost when staff change' },
    ],
    pricingNote: 'Packages for small teams to enterprises',
    faqs: [
      {
        question: 'Can we keep our existing WhatsApp number?',
        answer: 'In most cases yes. We will check your number and guide you through the migration.',
      },
      {
        question: 'How many staff can use it?',
        answer: 'As many as your package allows; each person gets their own login and permissions.',
      },
    ],
  },
  {
    name: 'School Management',
    slug: 'school-management',
    contextCaption: 'Built for schools across Kenya: fees, exams and parents in one place.',
    tagline: 'Run the whole school from one place.',
    summary:
      'Admissions, fees, exams, timetables and parent communication — with M-Pesa fee payments reconciled automatically.',
    category: 'Education',
    availability: 'live',
    visual: 'school',
    problem:
      'Bursars chase fee balances in spreadsheets, teachers re-enter marks by hand, and parents queue at the office for statements. Information is everywhere except where it is needed.',
    features: [
      {
        title: 'Fees & M-Pesa',
        text: 'Parents pay with a Paybill account number; payments are matched to the right student instantly.',
      },
      {
        title: 'Exams & report cards',
        text: 'Marks entry, ranking, analysis and printable report forms in minutes.',
      },
      {
        title: 'Admissions & records',
        text: 'Student profiles, documents, classes and history in one place.',
      },
      {
        title: 'Timetables & attendance',
        text: 'Timetable planning and daily attendance from any device.',
      },
      {
        title: 'Parent communication',
        text: 'SMS and WhatsApp for balances, results and announcements.',
      },
      {
        title: 'Management dashboards',
        text: 'Collections, performance and enrolment trends at a glance.',
      },
    ],
    audiences: [
      { title: 'Primary & secondary schools', text: 'CBC and 8-4-4 ready.' },
      { title: 'Colleges & training centres', text: 'Courses, intakes and fees.' },
      { title: 'School groups', text: 'Several campuses, one view.' },
    ],
    integrations: ['M-Pesa Paybill', 'SMS', 'WhatsApp', 'Bank statements', 'Accounting export'],
    highlights: [
      { value: 'Instant', label: 'fee payment matching' },
      { value: 'Minutes', label: 'to produce report forms' },
      { value: '24/7', label: 'parent statements' },
    ],
    faqs: [
      {
        question: 'Does it support CBC assessment?',
        answer: 'Yes, including competency-based rubrics and reports.',
      },
      {
        question: 'Can parents see balances themselves?',
        answer: 'Yes, by SMS request or through the parent portal.',
      },
    ],
  },
  {
    name: 'Property Management',
    slug: 'property-management',
    contextCaption: 'From one building to a portfolio — rent collected, tenants informed.',
    tagline: 'Rent collected. Tenants happy. Owners informed.',
    summary:
      'Tenants, units, rent collection, reminders, maintenance and owner reports for landlords and property managers.',
    category: 'Real estate',
    availability: 'live',
    visual: 'property',
    problem:
      'Landlords and agents track rent in notebooks and bank statements, chase late payers one call at a time, and struggle to give owners an accurate, timely picture of their property.',
    features: [
      {
        title: 'Rent collection via M-Pesa',
        text: 'Each unit gets an account number; payments are recorded automatically.',
      },
      {
        title: 'Automatic reminders',
        text: 'Friendly SMS and WhatsApp reminders before and after the due date.',
      },
      {
        title: 'Tenants & leases',
        text: 'Tenant records, deposits, leases and move-in / move-out checklists.',
      },
      {
        title: 'Maintenance requests',
        text: 'Tenants report issues; you assign, track and record the cost.',
      },
      {
        title: 'Owner statements',
        text: 'Accurate monthly statements and remittances for every owner.',
      },
      { title: 'Arrears tracking', text: 'See who owes what, for how long, at any moment.' },
    ],
    audiences: [
      { title: 'Landlords', text: 'From a single building to a portfolio.' },
      { title: 'Property managers & agents', text: 'Many owners, one system.' },
      { title: 'Estates & associations', text: 'Service charges and levies.' },
    ],
    integrations: ['M-Pesa Paybill', 'SMS', 'WhatsApp', 'Bank reconciliation', 'Accounting export'],
    highlights: [
      { value: 'Fewer', label: 'late payments with reminders' },
      { value: 'Real-time', label: 'occupancy and arrears' },
      { value: '1 click', label: 'owner statements' },
    ],
    faqs: [
      {
        question: 'Can tenants pay with their own reference?',
        answer:
          'Yes, payments are matched using the unit account number or the tenant’s phone number.',
      },
      {
        question: 'Does it handle commercial property?',
        answer: 'Yes, including service charges and escalations.',
      },
    ],
  },
  {
    name: 'ERP Suite',
    slug: 'erp',
    contextCaption: 'Stock, money and people — finally in the same system.',
    tagline: 'Finance, people and operations — connected.',
    summary:
      'Accounting, invoicing, inventory, HR and Kenyan payroll, fixed assets and manufacturing in one system.',
    category: 'Business operations',
    availability: 'live',
    visual: 'erp',
    problem:
      'Growing businesses outgrow spreadsheets and disconnected tools. Month-end takes weeks, stock never matches, payroll is calculated by hand and management decides with numbers that are already out of date.',
    features: [
      {
        title: 'Accounting & reports',
        text: 'General ledger, trial balance, P&L, balance sheet and cash flow, always up to date.',
      },
      {
        title: 'Invoicing & receivables',
        text: 'Professional invoices, statements, reminders and eTIMS-ready records.',
      },
      {
        title: 'Inventory & purchasing',
        text: 'Stock across locations, purchase orders, suppliers and valuation.',
      },
      {
        title: 'HR & Kenyan payroll',
        text: 'PAYE, SHIF, NSSF and Housing Levy calculated correctly, with payslips and returns.',
      },
      { title: 'Fixed assets', text: 'Asset register, depreciation schedules and disposals.' },
      { title: 'Manufacturing', text: 'Bills of materials, work orders and production costing.' },
    ],
    audiences: [
      { title: 'Distributors & wholesalers', text: 'Stock, credit and multiple branches.' },
      { title: 'Manufacturers', text: 'Production and costing.' },
      { title: 'Service companies & NGOs', text: 'Projects, payroll and donor reporting.' },
    ],
    integrations: ['M-Pesa', 'KRA eTIMS', 'Bank files', 'Excel import / export', 'REST API'],
    highlights: [
      { value: 'Days', label: 'not weeks, to close the month' },
      { value: '100%', label: 'statutory payroll deductions' },
      { value: 'Live', label: 'cash and stock positions' },
    ],
    faqs: [
      {
        question: 'Can it replace QuickBooks or Sage?',
        answer: 'Yes. We migrate your balances and history so you can switch at a period end.',
      },
      {
        question: 'Is it cloud or on-premise?',
        answer: 'Either. We host it for you, or install it on your own servers.',
      },
    ],
  },
  {
    name: 'Sports Management',
    slug: 'sports-management',
    contextCaption: 'Leagues, clubs and fans — organised from registration to the final whistle.',
    tagline: 'Leagues, clubs and fans — organised.',
    summary:
      'Registrations, fixtures, results, league tables, player records and ticketing for leagues, federations and clubs.',
    category: 'Sports',
    availability: 'beta',
    visual: 'sports',
    problem:
      'Leagues and clubs juggle registrations on paper, fixtures in spreadsheets and results on social media. Officials waste time, fans lack reliable information and revenue from tickets and fees leaks.',
    features: [
      {
        title: 'Registrations & licensing',
        text: 'Clubs and players register online, with documents and fees paid via M-Pesa.',
      },
      {
        title: 'Fixtures & scheduling',
        text: 'Automatic fixture generation with venues, referees and clash checks.',
      },
      {
        title: 'Live results & tables',
        text: 'Results entered at the venue update league tables instantly.',
      },
      {
        title: 'Player records',
        text: 'Appearances, goals, cards and suspensions tracked automatically.',
      },
      { title: 'Ticketing', text: 'Sell tickets via M-Pesa with QR code entry.' },
      { title: 'Fan website & app', text: 'Fixtures, results and news for supporters.' },
    ],
    audiences: [
      { title: 'Leagues & federations', text: 'Competitions at any level.' },
      { title: 'Clubs & academies', text: 'Squads, training and fees.' },
      { title: 'Tournament organisers', text: 'One-off events and cups.' },
    ],
    integrations: ['M-Pesa', 'SMS', 'QR ticketing', 'Website widgets'],
    highlights: [
      { value: 'Instant', label: 'league table updates' },
      { value: 'Paperless', label: 'player registration' },
      { value: 'QR', label: 'ticketing at the gate' },
    ],
    faqs: [
      {
        question: 'Which sports are supported?',
        answer: 'Football first, with rugby, basketball and others configurable.',
      },
      {
        question: 'Can fans buy tickets on their phones?',
        answer: 'Yes, via M-Pesa, with a QR code ticket sent by SMS.',
      },
    ],
  },
  {
    name: 'M-Pesa Integration',
    slug: 'm-pesa-integration',
    contextCaption: 'Kenya pays with M-Pesa. Your systems should too.',
    tagline: 'Get paid instantly. Reconcile automatically.',
    summary:
      'STK Push, Paybill, Till, B2C payouts and automatic reconciliation for your website, app or business system.',
    category: 'Payments',
    availability: 'live',
    visual: 'payments',
    partnerLogo: 'mpesa',
    problem:
      'Customers want to pay with M-Pesa, but manual confirmation is slow and error-prone: staff check SMS messages, match payments by hand and miss transactions — while customers wait.',
    features: [
      {
        title: 'STK Push checkout',
        text: 'Customers receive a payment prompt on their phone and confirm with their PIN.',
      },
      {
        title: 'Paybill & Till confirmation',
        text: 'Real-time callbacks record every payment the moment it happens.',
      },
      {
        title: 'Automatic matching',
        text: 'Payments matched to orders, invoices or accounts — no manual work.',
      },
      {
        title: 'B2C payouts',
        text: 'Refunds, salaries, commissions and disbursements from your system.',
      },
      {
        title: 'Resilient by design',
        text: 'Retries, status queries and full logs so no transaction is lost.',
      },
      { title: 'Reports & exports', text: 'Daily summaries and exports for your accountant.' },
    ],
    audiences: [
      { title: 'E-commerce & apps', text: 'Smooth checkout on web and mobile.' },
      { title: 'Schools, landlords, SACCOs', text: 'Account-based collections.' },
      { title: 'Platforms', text: 'Payouts to agents, drivers or vendors.' },
    ],
    integrations: [
      'M-Pesa Daraja',
      'Webhooks',
      'ERP & accounting',
      'WooCommerce',
      'Custom systems',
    ],
    highlights: [
      { value: 'Seconds', label: 'from payment to confirmation' },
      { value: '0', label: 'manual matching' },
      { value: 'Full', label: 'audit trail' },
    ],
    pricingNote: 'Fixed-price integration packages',
    faqs: [
      {
        question: 'How long does integration take?',
        answer: 'Typically 1–3 weeks including Safaricom go-live, depending on your system.',
      },
      {
        question: 'Can you integrate with WordPress / WooCommerce?',
        answer: 'Yes, as well as custom-built systems and mobile apps.',
      },
    ],
  },
  {
    name: 'Stoka POS',
    slug: 'stoka-pos',
    tagline: 'The till, stock book and debt book for every duka.',
    summary:
      'A fast, offline-first point of sale with barcode scanning, labels, M-Pesa checkout and a debt book — built for Kenyan shops.',
    category: 'Retail',
    availability: 'live',
    visual: 'pos',
    contextCaption: 'Shorter queues, accurate stock and no more lost debts.',
    problem:
      'Small shops lose money to stock that is never counted, credit that is never written down and long queues at the till. Generic POS systems are too expensive and stop working when the internet drops.',
    features: [
      {
        title: 'Fast checkout',
        text: 'Scan, total and take M-Pesa or cash in seconds — even offline.',
      },
      {
        title: 'Barcode labels',
        text: 'Print your own barcode labels for products that do not have one.',
      },
      { title: 'Stock control', text: 'Know exactly what is on the shelf, with low-stock alerts.' },
      {
        title: 'Debt book',
        text: 'Record credit sales and send polite SMS reminders to customers.',
      },
      {
        title: 'Daily reports',
        text: 'Sales, margins and best-sellers on your phone every evening.',
      },
      {
        title: 'Several branches',
        text: 'Every shop on one account, with transfers between them.',
      },
    ],
    audiences: [
      { title: 'Dukas & mini-marts', text: 'Simple, fast and affordable.' },
      { title: 'Supermarkets', text: 'Several tills and branches.' },
      { title: 'Pharmacies & hardware', text: 'Thousands of items, tracked.' },
    ],
    integrations: ['M-Pesa', 'Barcode scanners', 'Label printers', 'SMS'],
    highlights: [
      { value: 'Offline', label: 'keeps selling without internet' },
      { value: 'Seconds', label: 'per checkout' },
      { value: '0', label: 'forgotten debts' },
    ],
    faqs: [
      {
        question: 'Does it work without internet?',
        answer: 'Yes. Sales continue offline and sync when the connection returns.',
      },
      {
        question: 'What hardware do I need?',
        answer: 'An Android phone or tablet is enough; scanners and printers are optional.',
      },
    ],
  },
  {
    name: 'SACCO & Microfinance',
    slug: 'sacco-microfinance',
    tagline: 'Members, savings and loans — managed with confidence.',
    summary:
      'Member records, savings, loans, guarantors and dividends, with M-Pesa deposits and automatic reminders. Built to order on our finance platform.',
    category: 'Financial services',
    availability: 'custom',
    visual: 'sacco',
    contextCaption: 'Every shilling saved and lent, accounted for.',
    problem:
      'SACCOs and microfinance institutions juggle spreadsheets for savings, paper for guarantors and manual follow-up for arrears — slow for members and risky for the board.',
    features: [
      {
        title: 'Member portal',
        text: 'Members check savings, loans and statements on their phones.',
      },
      {
        title: 'Loans & guarantors',
        text: 'Applications, guarantor approval, appraisal and disbursement.',
      },
      {
        title: 'M-Pesa deposits',
        text: 'Savings and repayments matched to the right member instantly.',
      },
      {
        title: 'Arrears follow-up',
        text: 'Automatic SMS reminders and portfolio-at-risk tracking.',
      },
      { title: 'Dividends & interest', text: 'Calculated accurately at year end.' },
      { title: 'Board reports', text: 'Regulatory and management reports on demand.' },
    ],
    audiences: [
      { title: 'SACCOs', text: 'Deposit-taking and non-deposit-taking.' },
      { title: 'Microfinance', text: 'Group and individual lending.' },
      { title: 'Chamas & investment groups', text: 'Contributions and payouts.' },
    ],
    integrations: ['M-Pesa', 'SMS', 'Bank files', 'Accounting'],
    highlights: [
      { value: 'Instant', label: 'deposit matching' },
      { value: 'Live', label: 'portfolio at risk' },
      { value: '24/7', label: 'member statements' },
    ],
    faqs: [
      {
        question: 'What does "built to order" mean?',
        answer:
          'We assemble it for you from our proven finance, M-Pesa and messaging modules, configured to your by-laws and products.',
      },
      {
        question: 'Can we migrate existing member data?',
        answer:
          'Yes. We import and reconcile your member, savings and loan records before go-live.',
      },
    ],
  },
  {
    name: 'Hospital & Clinic',
    slug: 'hospital-clinic',
    tagline: 'Shorter queues. Accurate billing. Better care.',
    summary:
      'Patient registration, appointments, consultations, pharmacy and billing — with M-Pesa and insurance claims. Built to order for your facility.',
    category: 'Healthcare',
    availability: 'custom',
    visual: 'health',
    contextCaption: 'Patients seen faster, every shilling and prescription accounted for.',
    problem:
      'Clinics lose time to paper files, long queues, missed charges and slow insurance claims — while patients wait and revenue leaks.',
    features: [
      {
        title: 'Registration & records',
        text: 'Patient records, history and documents in one secure place.',
      },
      {
        title: 'Appointments & queue',
        text: 'Bookings, triage and a live queue for every department.',
      },
      { title: 'Pharmacy & stock', text: 'Dispensing, stock levels and expiry tracking.' },
      {
        title: 'Billing & claims',
        text: 'Cash, M-Pesa and insurance billing with claim tracking.',
      },
      { title: 'Lab results', text: 'Requests and results routed to the right clinician.' },
      { title: 'Reports', text: 'Visits, revenue and stock reports for management.' },
    ],
    audiences: [
      { title: 'Clinics & medical centres', text: 'Single or multiple branches.' },
      { title: 'Hospitals', text: 'Departments and wards.' },
      { title: 'Pharmacies & labs', text: 'Stand-alone or integrated.' },
    ],
    integrations: ['M-Pesa', 'SMS reminders', 'Insurance claims', 'Accounting'],
    highlights: [
      { value: 'Shorter', label: 'waiting times' },
      { value: 'Every', label: 'charge captured' },
      { value: 'Secure', label: 'patient records' },
    ],
    faqs: [
      {
        question: 'Is patient data protected?',
        answer:
          'Yes — role-based access, audit logs and encryption, aligned with the Data Protection Act.',
      },
      {
        question: 'Can it start small?',
        answer:
          'Yes. Many clinics start with registration, billing and pharmacy, then add modules.',
      },
    ],
  },
  {
    name: 'E-commerce',
    slug: 'ecommerce',
    tagline: 'Sell online. Get paid by M-Pesa. Deliver on time.',
    summary:
      'A fast online store with M-Pesa and card checkout, order management, delivery tracking and SMS updates. Built to order on our commerce platform.',
    category: 'Commerce',
    availability: 'custom',
    visual: 'store',
    contextCaption: 'From checkout to doorstep — every order tracked.',
    problem:
      'Selling through WhatsApp and Instagram alone means lost orders, manual payment checks and customers asking "where is my order?" all day.',
    features: [
      { title: 'Fast storefront', text: 'Quick on mobile data, easy to browse and search.' },
      { title: 'M-Pesa & card checkout', text: 'STK Push and cards, confirmed automatically.' },
      { title: 'Order management', text: 'Every order from paid to packed to delivered.' },
      { title: 'Delivery tracking', text: 'Riders, zones and SMS updates for customers.' },
      { title: 'Stock sync', text: 'Shop and online stock kept in step (works with Stoka POS).' },
      { title: 'Abandoned-cart recovery', text: 'Automatic SMS or WhatsApp nudges.' },
    ],
    audiences: [
      { title: 'Retailers', text: 'Add an online channel to your shop.' },
      { title: 'Brands', text: 'Sell direct to customers.' },
      { title: 'Wholesalers', text: 'Ordering portals for resellers.' },
    ],
    integrations: ['M-Pesa', 'Cards', 'SMS & WhatsApp', 'Stoka POS'],
    highlights: [
      { value: 'Mobile', label: 'first storefront' },
      { value: 'Auto', label: 'payment confirmation' },
      { value: 'Live', label: 'delivery tracking' },
    ],
    faqs: [
      {
        question: 'Can I keep selling on WhatsApp too?',
        answer: 'Yes — share product links on WhatsApp and orders flow into the same system.',
      },
      {
        question: 'Do you handle deliveries?',
        answer: 'We integrate with your riders or courier partners and track every delivery.',
      },
    ],
  },
]

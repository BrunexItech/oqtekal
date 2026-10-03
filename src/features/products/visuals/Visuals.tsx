import { cn } from '@/lib/cn'

import { Avatar, Bars, Frame, Kpi, Pill, Spark } from './Frame'

/* ------------------------------------------------------------------ Communications (Tolkyn) */
export const CommsVisual = () => {
  const chats = [
    {
      n: 'Amina Wanjiru',
      m: 'Is the order ready for pickup?',
      c: 'WhatsApp',
      t: '2m',
      h: 150,
      u: 2,
    },
    { n: 'Kiprop Logistics', m: 'Invoice #2041 received, thanks', c: 'Email', t: '9m', h: 20 },
    { n: '+254 722 ••• 410', m: 'STOP promos please', c: 'SMS', t: '14m', h: 280 },
    { n: 'Brian Otieno', m: 'Can we reschedule the call?', c: 'Call', t: '31m', h: 330 },
    { n: 'Faith Muthoni', m: 'Payment sent via M-Pesa', c: 'WhatsApp', t: '1h', h: 200 },
  ]
  const tone = (c: string) =>
    (c === 'WhatsApp' ? 'ok' : c === 'SMS' ? 'warn' : c === 'Call' ? 'bad' : 'accent') as 'ok'
  return (
    <Frame
      title="app.tolkyn.co.ke/inbox"
      nav={['Inbox', 'Campaigns', 'Contacts', 'Calls', 'Phone book', 'Reports']}
    >
      <div className="flex h-full gap-[0.9em]">
        <div className="flex w-[42%] flex-col gap-[0.35em]">
          <div className="mb-[0.3em] flex items-center justify-between">
            <p className="font-display text-[0.95em] font-semibold">Inbox</p>
            <Pill tone="accent">5 channels</Pill>
          </div>
          {chats.map((c, i) => (
            <div
              key={c.n}
              className={cn(
                'flex items-center gap-[0.55em] rounded-[0.55em] border p-[0.5em]',
                i === 0 ? 'border-accent/40 bg-accent-soft/60' : 'border-line bg-surface',
              )}
            >
              <Avatar initials={c.n.replace(/[^A-Z]/g, '').slice(0, 2) || '#'} hue={c.h} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-[0.4em]">
                  <p className="truncate text-[0.66em] font-semibold">{c.n}</p>
                  <span className="text-[0.55em] text-subtle">{c.t}</span>
                </div>
                <div className="mt-[0.15em] flex items-center justify-between gap-[0.4em]">
                  <p className="truncate text-[0.6em] text-muted">{c.m}</p>
                  <Pill tone={tone(c.c)}>{c.c}</Pill>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex min-w-0 flex-1 flex-col rounded-[0.7em] border border-line bg-surface">
          <div className="flex items-center gap-[0.55em] border-b border-line p-[0.65em]">
            <Avatar initials="AW" hue={150} />
            <div>
              <p className="text-[0.7em] font-semibold">Amina Wanjiru</p>
              <p className="text-[0.56em] text-success">WhatsApp · online</p>
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-end gap-[0.5em] p-[0.8em]">
            <p className="max-w-[75%] self-start rounded-[0.7em] rounded-bl-[0.2em] bg-surface-2 px-[0.75em] py-[0.5em] text-[0.62em]">
              Hi! Is my order #5512 ready for pickup today?
            </p>
            <p className="max-w-[75%] self-end rounded-[0.7em] rounded-br-[0.2em] bg-brand-600 px-[0.75em] py-[0.5em] text-[0.62em] text-white">
              Yes, it is packed. You can collect from 2pm at our Westlands shop.
            </p>
            <p className="max-w-[60%] self-start rounded-[0.7em] rounded-bl-[0.2em] bg-surface-2 px-[0.75em] py-[0.5em] text-[0.62em]">
              Perfect, thank you 🙏
            </p>
          </div>
          <div className="m-[0.6em] mt-0 flex h-[2.2em] items-center rounded-full border border-line px-[0.8em] text-[0.58em] text-subtle">
            Reply on WhatsApp…
          </div>
        </div>
      </div>
    </Frame>
  )
}

/* ------------------------------------------------------------------ School management */
export const SchoolVisual = () => (
  <Frame
    title="school.oqtekal.app/dashboard"
    nav={['Dashboard', 'Students', 'Fees', 'Exams', 'Timetable', 'Parents']}
  >
    <div className="flex h-full flex-col gap-[0.8em]">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[0.6em] text-subtle">Term 3 · Week 7</p>
          <p className="font-display text-[1.05em] font-semibold">Good morning, Principal</p>
        </div>
        <Pill tone="ok">All systems normal</Pill>
      </div>
      <div className="grid grid-cols-4 gap-[0.6em]">
        <Kpi label="Students" value="1,284" delta="+42 this term" />
        <Kpi label="Attendance today" value="96.4%" delta="+1.2%" />
        <Kpi label="Fees collected" value="KES 18.6M" delta="82% of target" />
        <Kpi label="Outstanding" value="KES 4.1M" delta="214 families" tone="down" />
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-[1.4fr_1fr] gap-[0.6em]">
        <div className="flex flex-col rounded-[0.7em] border border-line bg-surface p-[0.8em]">
          <div className="flex justify-between">
            <p className="text-[0.66em] font-semibold">Fee collection by week</p>
            <span className="text-[0.56em] text-subtle">M-Pesa · Bank · Cash</span>
          </div>
          <Bars values={[38, 52, 46, 70, 64, 82, 76, 90]} className="mt-[0.7em] min-h-0 flex-1" />
        </div>
        <div className="flex flex-col gap-[0.4em] rounded-[0.7em] border border-line bg-surface p-[0.8em]">
          <p className="text-[0.66em] font-semibold">Mean score by class</p>
          {[
            ['Form 4 East', 78],
            ['Form 4 West', 71],
            ['Form 3 North', 66],
            ['Form 2 South', 59],
          ].map(([c, v]) => (
            <div key={c as string} className="text-[0.58em]">
              <div className="mb-[0.25em] flex justify-between">
                <span className="text-muted">{c}</span>
                <span className="font-semibold">{v}%</span>
              </div>
              <div className="h-[0.45em] rounded-full bg-surface-2">
                <div className="h-full rounded-full bg-accent" style={{ width: `${v}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Frame>
)

/* ------------------------------------------------------------------ Property management */
export const PropertyVisual = () => {
  const units = Array.from({ length: 24 }, (_, i) =>
    i % 7 === 3 ? 'vacant' : i % 5 === 1 ? 'late' : 'paid',
  )
  return (
    <Frame
      title="rent.oqtekal.app/properties/riverside"
      nav={['Overview', 'Units', 'Tenants', 'Rent', 'Maintenance', 'Reports']}
    >
      <div className="flex h-full flex-col gap-[0.8em]">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[0.6em] text-subtle">Riverside Apartments · Kilimani</p>
            <p className="font-display text-[1.05em] font-semibold">October rent</p>
          </div>
          <Pill tone="accent">Auto-reminders on</Pill>
        </div>
        <div className="grid grid-cols-3 gap-[0.6em]">
          <Kpi label="Collected" value="KES 2.31M" delta="91% of expected" />
          <Kpi label="Occupancy" value="88%" delta="21 of 24 units" />
          <Kpi label="Open repairs" value="3" delta="1 urgent" tone="down" />
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-[1fr_1.15fr] gap-[0.6em]">
          <div className="rounded-[0.7em] border border-line bg-surface p-[0.8em]">
            <p className="mb-[0.6em] text-[0.66em] font-semibold">Units</p>
            <div className="grid grid-cols-6 gap-[0.35em]">
              {units.map((s, i) => (
                <div
                  key={i}
                  className={cn(
                    'grid aspect-square place-items-center rounded-[0.35em] text-[0.5em] font-semibold',
                    s === 'paid' && 'bg-accent/15 text-accent',
                    s === 'late' && 'bg-[#f5a524]/20 text-[#b97300] dark:text-[#f5b84a]',
                    s === 'vacant' && 'border border-dashed border-line-strong text-subtle',
                  )}
                >
                  {String.fromCharCode(65 + Math.floor(i / 6))}
                  {(i % 6) + 1}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-[0.35em] rounded-[0.7em] border border-line bg-surface p-[0.8em]">
            <p className="mb-[0.2em] text-[0.66em] font-semibold">Latest payments</p>
            {[
              ['A3 · J. Kamau', 'KES 45,000', 'M-Pesa', 'ok'],
              ['B1 · S. Achieng', 'KES 38,500', 'M-Pesa', 'ok'],
              ['C4 · P. Mwangi', 'KES 52,000', 'Bank', 'ok'],
              ['A2 · L. Njeri', 'Due 5 days', 'Reminder sent', 'warn'],
            ].map(([u, a, m, t]) => (
              <div
                key={u}
                className="flex items-center justify-between border-b border-line pb-[0.35em] text-[0.6em] last:border-0"
              >
                <span className="font-medium">{u}</span>
                <span className="flex items-center gap-[0.5em]">
                  <span className="text-muted">{a}</span>
                  <Pill tone={t as 'ok'}>{m}</Pill>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  )
}

/* ------------------------------------------------------------------ ERP */
export const ErpVisual = () => (
  <Frame
    title="erp.oqtekal.app/finance"
    nav={['Finance', 'Invoices', 'Inventory', 'HR & payroll', 'Assets', 'Reports']}
  >
    <div className="flex h-full flex-col gap-[0.8em]">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[0.6em] text-subtle">FY 2026 · Year to date</p>
          <p className="font-display text-[1.05em] font-semibold">Financial overview</p>
        </div>
        <div className="flex gap-[0.35em]">
          <Pill>KES</Pill>
          <Pill tone="accent">Consolidated</Pill>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-[0.6em]">
        <Kpi label="Revenue" value="84.2M" delta="+18.4% YoY" />
        <Kpi label="Gross margin" value="41.7%" delta="+2.1 pts" />
        <Kpi label="Receivables" value="9.8M" delta="38 days DSO" tone="down" />
        <Kpi label="Payroll (Sep)" value="6.4M" delta="PAYE · SHIF · NSSF ok" />
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-[1.5fr_1fr] gap-[0.6em]">
        <div className="flex flex-col rounded-[0.7em] border border-line bg-surface p-[0.8em]">
          <div className="flex justify-between text-[0.62em]">
            <span className="font-semibold">Revenue vs expenses</span>
            <span className="text-subtle">Jan – Sep</span>
          </div>
          <div className="relative mt-[0.5em] min-h-0 flex-1">
            <Spark values={[30, 38, 35, 48, 52, 50, 63, 70, 78]} className="absolute inset-0" />
            <Spark
              values={[22, 26, 30, 31, 35, 34, 38, 41, 44]}
              className="absolute inset-0"
              color="var(--subtle)"
            />
          </div>
        </div>
        <div className="flex flex-col gap-[0.3em] rounded-[0.7em] border border-line bg-surface p-[0.8em]">
          <p className="mb-[0.2em] text-[0.66em] font-semibold">Recent invoices</p>
          {[
            ['INV-2041', 'Kiprop Logistics', 'Paid', 'ok'],
            ['INV-2040', 'Savanna Foods', 'Sent', 'accent'],
            ['INV-2039', 'Mara Hotels', 'Overdue', 'bad'],
            ['INV-2038', 'Nyota Pharma', 'Paid', 'ok'],
          ].map(([n, c, s, t]) => (
            <div
              key={n}
              className="flex items-center justify-between border-b border-line pb-[0.3em] text-[0.58em] last:border-0"
            >
              <span>
                <span className="font-mono text-subtle">{n}</span>{' '}
                <span className="font-medium">{c}</span>
              </span>
              <Pill tone={t as 'ok'}>{s}</Pill>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Frame>
)

/* ------------------------------------------------------------------ Sports management */
export const SportsVisual = () => (
  <Frame
    title="league.oqtekal.app/premier"
    nav={['League', 'Fixtures', 'Teams', 'Players', 'Referees', 'Tickets']}
  >
    <div className="flex h-full flex-col gap-[0.8em]">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[0.6em] text-subtle">Season 2026 · Matchday 14</p>
          <p className="font-display text-[1.05em] font-semibold">League table</p>
        </div>
        <Pill tone="bad">● 2 matches live</Pill>
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-[1.35fr_1fr] gap-[0.6em]">
        <div className="rounded-[0.7em] border border-line bg-surface p-[0.8em]">
          <div className="grid grid-cols-[1.6em_1fr_2em_2em_2.4em] gap-[0.4em] border-b border-line pb-[0.35em] text-[0.55em] text-subtle">
            <span>#</span>
            <span>Club</span>
            <span>P</span>
            <span>GD</span>
            <span className="text-right">Pts</span>
          </div>
          {[
            ['Nairobi City Stars', 14, '+16', 32],
            ['Kakamega Homeboyz', 14, '+11', 29],
            ['Coast United', 14, '+7', 26],
            ['Rift Valley FC', 14, '+3', 22],
            ['Lakeside Rangers', 14, '-2', 19],
          ].map(([club, p, gd, pts], i) => (
            <div
              key={club as string}
              className="grid grid-cols-[1.6em_1fr_2em_2em_2.4em] items-center gap-[0.4em] border-b border-line py-[0.42em] text-[0.6em] last:border-0"
            >
              <span className={cn('font-semibold', i < 2 ? 'text-accent' : 'text-subtle')}>
                {i + 1}
              </span>
              <span className="flex items-center gap-[0.5em] truncate font-medium">
                <span
                  className="size-[0.9em] rounded-full"
                  style={{ background: `hsl(${i * 67 + 200} 65% 50%)` }}
                />
                {club}
              </span>
              <span className="text-muted">{p}</span>
              <span className="text-muted">{gd}</span>
              <span className="text-right font-semibold">{pts}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-[0.6em]">
          <div className="rounded-[0.7em] border border-accent/40 bg-accent-soft/50 p-[0.8em]">
            <div className="flex items-center justify-between text-[0.55em]">
              <span className="font-semibold text-danger">LIVE · 67′</span>
              <span className="text-subtle">Kasarani</span>
            </div>
            <div className="mt-[0.5em] flex items-center justify-between font-display text-[0.8em] font-semibold">
              <span>City Stars</span>
              <span className="text-[1.3em]">2 – 1</span>
              <span>Coast Utd</span>
            </div>
          </div>
          <div className="flex min-h-0 flex-1 flex-col gap-[0.35em] rounded-[0.7em] border border-line bg-surface p-[0.8em]">
            <p className="text-[0.66em] font-semibold">Top scorers</p>
            {[
              ['M. Odhiambo', 12],
              ['K. Barasa', 10],
              ['J. Wekesa', 9],
            ].map(([n, g]) => (
              <div key={n as string} className="flex justify-between text-[0.6em]">
                <span>{n}</span>
                <span className="font-semibold">{g} goals</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </Frame>
)

/* ------------------------------------------------------------------ Payments / M-Pesa */
export const PaymentsVisual = () => (
  <Frame
    title="pay.oqtekal.app/transactions"
    nav={['Transactions', 'STK Push', 'C2B / Paybill', 'B2C payouts', 'Reconcile', 'Webhooks']}
    accent="#16a34a"
  >
    <div className="flex h-full gap-[0.9em]">
      <div className="flex min-w-0 flex-1 flex-col gap-[0.6em]">
        <div className="flex items-center justify-between">
          <p className="font-display text-[0.95em] font-semibold">Payments</p>
          <span className="flex items-center gap-[0.5em] rounded-full border border-line bg-white px-[0.7em] py-[0.25em] text-[0.55em] text-[#4f5561]">
            Powered by
            {/* eslint-disable-next-line @next/next/no-img-element -- decorative mock-up */}
            <img src="/brand/partners/mpesa.png" alt="" className="h-[1.6em] w-auto" />
          </span>
        </div>
        <div className="grid grid-cols-3 gap-[0.6em]">
          <Kpi label="Collected today" value="KES 1.48M" delta="1,912 payments" />
          <Kpi label="Success rate" value="98.7%" delta="+0.4%" />
          <Kpi label="Auto-reconciled" value="100%" delta="0 manual entries" />
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-[0.3em] rounded-[0.7em] border border-line bg-surface p-[0.8em]">
          <div className="mb-[0.2em] flex justify-between text-[0.62em]">
            <span className="font-semibold">Live transactions</span>
            <span className="text-subtle">Callback latency 0.8s</span>
          </div>
          {[
            ['SJK4X9QP2L', 'Paybill 522522 · Acc 1043', '2,500', 'ok', 'Confirmed'],
            ['SJK4X9QM7A', 'STK Push · Order #5512', '7,850', 'ok', 'Confirmed'],
            ['SJK4X9QJ1C', 'Till 889201', '640', 'ok', 'Confirmed'],
            ['SJK4X9QF0Z', 'STK Push · Order #5509', '12,000', 'warn', 'Pending PIN'],
            ['SJK4X9QB3N', 'B2C · Refund #318', '1,200', 'accent', 'Paid out'],
          ].map(([code, desc, amt, tone, st]) => (
            <div
              key={code}
              className="flex items-center justify-between gap-[0.6em] border-b border-line pb-[0.32em] text-[0.58em] last:border-0"
            >
              <span className="font-mono text-subtle">{code}</span>
              <span className="flex-1 truncate">{desc}</span>
              <span className="font-semibold">KES {amt}</span>
              <Pill tone={tone as 'ok'}>{st}</Pill>
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-[27%] shrink-0 items-center justify-center">
        <div className="flex aspect-[9/18] w-full flex-col rounded-[1.4em] border-[0.35em] border-ink bg-surface p-[0.7em] shadow-[var(--shadow-card)] dark:border-[#2a3142]">
          <div className="mx-auto mb-[0.8em] h-[0.35em] w-[35%] rounded-full bg-line-strong" />
          <div className="rounded-[0.7em] bg-surface-2 p-[0.7em] text-center">
            {/* eslint-disable-next-line @next/next/no-img-element -- decorative mock-up */}
            <img src="/brand/partners/mpesa.png" alt="" className="mx-auto h-[1.5em] w-auto" />
            <p className="mt-[0.4em] text-[0.55em] text-muted">Pay KES 7,850 to</p>
            <p className="text-[0.62em] font-semibold">Savanna Foods Ltd</p>
            <p className="mt-[0.2em] text-[0.5em] text-subtle">Order #5512</p>
            <div className="mx-auto mt-[0.7em] flex justify-center gap-[0.3em]">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className="size-[0.55em] rounded-full bg-fg" />
              ))}
            </div>
            <div className="mt-[0.8em] rounded-[0.5em] bg-[#16a34a] py-[0.45em] text-[0.55em] font-semibold text-white">
              Send
            </div>
          </div>
          <div className="mt-auto rounded-[0.6em] bg-success/12 p-[0.55em] text-[0.5em] text-success">
            ✓ Confirmed. KES 7,850 paid.
          </div>
        </div>
      </div>
    </div>
  </Frame>
)

/* ------------------------------------------------------------------ Point of sale */
export const PosVisual = () => (
  <Frame title="stoka.app/till" nav={['Till', 'Products', 'Stock', 'Debt book', 'Sales', 'Labels']}>
    <div className="flex h-full gap-[0.8em]">
      <div className="grid min-w-0 flex-1 grid-cols-4 content-start gap-[0.5em]">
        {[
          ['Unga 2kg', '210'],
          ['Sugar 1kg', '185'],
          ['Milk 500ml', '65'],
          ['Bread', '70'],
          ['Cooking oil 1L', '380'],
          ['Rice 2kg', '420'],
          ['Soap bar', '120'],
          ['Tea leaves', '150'],
          ['Eggs (tray)', '450'],
          ['Salt 1kg', '60'],
          ['Airtime 100', '100'],
          ['Water 1L', '50'],
        ].map(([n, p], i) => (
          <div
            key={n}
            className={cn(
              'rounded-[0.6em] border p-[0.55em]',
              i === 4 ? 'border-accent bg-accent-soft/60' : 'border-line bg-surface',
            )}
          >
            <div className="mb-[0.4em] aspect-[4/3] rounded-[0.4em] bg-surface-2" />
            <p className="truncate text-[0.58em] font-medium">{n}</p>
            <p className="text-[0.55em] text-muted">KES {p}</p>
          </div>
        ))}
      </div>
      <div className="flex w-[32%] shrink-0 flex-col rounded-[0.7em] border border-line bg-surface p-[0.8em]">
        <p className="text-[0.68em] font-semibold">Current sale</p>
        <div className="mt-[0.5em] flex flex-col gap-[0.35em] text-[0.58em]">
          {[
            ['Cooking oil 1L', 2, 760],
            ['Unga 2kg', 1, 210],
            ['Milk 500ml', 3, 195],
          ].map(([n, q, t]) => (
            <div key={n as string} className="flex justify-between border-b border-line pb-[0.3em]">
              <span>
                {n} <span className="text-subtle">×{q}</span>
              </span>
              <span className="font-medium">{t}</span>
            </div>
          ))}
        </div>
        <div className="mt-auto">
          <div className="flex justify-between font-display text-[0.9em] font-semibold">
            <span>Total</span>
            <span>KES 1,165</span>
          </div>
          <div className="mt-[0.5em] grid grid-cols-2 gap-[0.35em] text-center text-[0.55em] font-semibold">
            <span className="rounded-[0.45em] bg-[#16a34a] py-[0.5em] text-white">M-Pesa</span>
            <span className="rounded-[0.45em] bg-surface-2 py-[0.5em]">Cash</span>
          </div>
        </div>
      </div>
    </div>
  </Frame>
)

/* ------------------------------------------------------------------ Hospital & clinic */
export const HealthVisual = () => (
  <Frame
    title="clinic.oqtekal.app/today"
    nav={['Today', 'Patients', 'Appointments', 'Pharmacy', 'Billing', 'Reports']}
    accent="#0d9488"
  >
    <div className="flex h-full flex-col gap-[0.8em]">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[0.6em] text-subtle">Westlands branch · Thursday</p>
          <p className="font-display text-[1.05em] font-semibold">Patient flow</p>
        </div>
        <Pill tone="ok">SHA claims synced</Pill>
      </div>
      <div className="grid grid-cols-4 gap-[0.6em]">
        <Kpi label="Patients today" value="86" delta="+12 vs last Thu" />
        <Kpi label="Avg. wait" value="14 min" delta="−6 min" />
        <Kpi label="Collected" value="KES 412K" delta="M-Pesa 71%" />
        <Kpi label="Low stock" value="5 items" delta="Reorder sent" tone="down" />
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-[1.3fr_1fr] gap-[0.6em]">
        <div className="flex flex-col gap-[0.35em] rounded-[0.7em] border border-line bg-surface p-[0.8em]">
          <p className="mb-[0.2em] text-[0.66em] font-semibold">Queue</p>
          {[
            ['09:40', 'J. Mwangi', 'Consultation', 'accent', 'With doctor'],
            ['09:55', 'A. Hassan', 'Lab results', 'warn', 'Waiting'],
            ['10:05', 'P. Achieng', 'Pharmacy', 'ok', 'Paid'],
            ['10:10', 'K. Otieno', 'Triage', 'neutral', 'Checked in'],
          ].map(([t, n, d, tone, st]) => (
            <div
              key={n}
              className="flex items-center justify-between border-b border-line pb-[0.3em] text-[0.58em] last:border-0"
            >
              <span className="font-mono text-subtle">{t}</span>
              <span className="w-[30%] font-medium">{n}</span>
              <span className="flex-1 text-muted">{d}</span>
              <Pill tone={tone as 'ok'}>{st}</Pill>
            </div>
          ))}
        </div>
        <div className="flex flex-col rounded-[0.7em] border border-line bg-surface p-[0.8em]">
          <p className="text-[0.66em] font-semibold">Visits this week</p>
          <Bars values={[52, 64, 58, 80, 74, 40, 30]} className="mt-[0.7em] min-h-0 flex-1" />
        </div>
      </div>
    </div>
  </Frame>
)

/* ------------------------------------------------------------------ SACCO & microfinance */
export const SaccoVisual = () => (
  <Frame
    title="sacco.oqtekal.app/overview"
    nav={['Overview', 'Members', 'Savings', 'Loans', 'Dividends', 'Reports']}
    accent="#16a34a"
  >
    <div className="flex h-full flex-col gap-[0.8em]">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[0.6em] text-subtle">Umoja SACCO · October</p>
          <p className="font-display text-[1.05em] font-semibold">Society overview</p>
        </div>
        <Pill tone="accent">Auto-deductions on</Pill>
      </div>
      <div className="grid grid-cols-4 gap-[0.6em]">
        <Kpi label="Members" value="3,412" delta="+58 this month" />
        <Kpi label="Savings" value="KES 96.4M" delta="+4.2%" />
        <Kpi label="Loan book" value="KES 71.8M" delta="PAR 2.1%" />
        <Kpi label="Arrears" value="KES 1.5M" delta="Reminders sent" tone="down" />
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-[1.4fr_1fr] gap-[0.6em]">
        <div className="flex flex-col rounded-[0.7em] border border-line bg-surface p-[0.8em]">
          <div className="flex justify-between text-[0.62em]">
            <span className="font-semibold">Deposits vs loans</span>
            <span className="text-subtle">12 months</span>
          </div>
          <div className="relative mt-[0.5em] min-h-0 flex-1">
            <Spark
              values={[40, 44, 47, 52, 55, 58, 63, 66, 70, 74, 79, 84]}
              className="absolute inset-0"
            />
            <Spark
              values={[30, 33, 35, 41, 43, 46, 50, 52, 57, 60, 63, 66]}
              className="absolute inset-0"
              color="var(--subtle)"
            />
          </div>
        </div>
        <div className="flex flex-col gap-[0.3em] rounded-[0.7em] border border-line bg-surface p-[0.8em]">
          <p className="mb-[0.2em] text-[0.66em] font-semibold">Loan applications</p>
          {[
            ['M. Wanjiku', '120,000', 'Approved', 'ok'],
            ['S. Kiprono', '45,000', 'Guarantors', 'warn'],
            ['L. Atieno', '300,000', 'Committee', 'accent'],
            ['D. Mutua', '20,000', 'Disbursed', 'ok'],
          ].map(([n, a, st, tone]) => (
            <div
              key={n}
              className="flex items-center justify-between border-b border-line pb-[0.3em] text-[0.58em] last:border-0"
            >
              <span className="font-medium">{n}</span>
              <span className="text-muted">KES {a}</span>
              <Pill tone={tone as 'ok'}>{st}</Pill>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Frame>
)

/* ------------------------------------------------------------------ Online store */
export const StoreVisual = () => (
  <Frame
    title="shop.oqtekal.app/orders"
    nav={['Orders', 'Products', 'Customers', 'Deliveries', 'Payments', 'Storefront']}
    accent="#f97316"
  >
    <div className="flex h-full flex-col gap-[0.8em]">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[0.6em] text-subtle">Today</p>
          <p className="font-display text-[1.05em] font-semibold">Orders</p>
        </div>
        <Pill tone="ok">Store online</Pill>
      </div>
      <div className="grid grid-cols-4 gap-[0.6em]">
        <Kpi label="Orders" value="148" delta="+22%" />
        <Kpi label="Revenue" value="KES 386K" delta="M-Pesa 84%" />
        <Kpi label="Delivered" value="121" delta="Same-day 92%" />
        <Kpi label="Abandoned carts" value="9" delta="SMS recovery on" tone="down" />
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-[1.3fr_1fr] gap-[0.6em]">
        <div className="flex flex-col gap-[0.35em] rounded-[0.7em] border border-line bg-surface p-[0.8em]">
          <p className="mb-[0.2em] text-[0.66em] font-semibold">Latest orders</p>
          {[
            ['#7731', 'Kilimani', '3,450', 'Out for delivery', 'accent'],
            ['#7730', 'Thika Rd', '12,900', 'Paid', 'ok'],
            ['#7729', 'Mombasa', '6,200', 'Packed', 'warn'],
            ['#7728', 'Karen', '1,850', 'Delivered', 'ok'],
          ].map(([o, l, a, st, tone]) => (
            <div
              key={o}
              className="flex items-center justify-between border-b border-line pb-[0.3em] text-[0.58em] last:border-0"
            >
              <span className="font-mono text-subtle">{o}</span>
              <span className="w-[22%]">{l}</span>
              <span className="font-medium">KES {a}</span>
              <Pill tone={tone as 'ok'}>{st}</Pill>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 content-start gap-[0.45em] rounded-[0.7em] border border-line bg-surface p-[0.8em]">
          {['Sneakers', 'Backpack', 'Headphones', 'Watch'].map((n, i) => (
            <div key={n}>
              <div
                className="aspect-square rounded-[0.4em]"
                style={{ background: `hsl(${20 + i * 55} 70% ${i % 2 ? 88 : 80}%)` }}
              />
              <p className="mt-[0.25em] truncate text-[0.55em] font-medium">{n}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Frame>
)

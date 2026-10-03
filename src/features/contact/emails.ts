import type { LeadInput } from './schema'

const TYPE_LABEL: Record<LeadInput['type'], string> = {
  project: 'New project enquiry',
  demo: 'Product demo request',
  hosting: 'Hosting order',
  career: 'Job application',
  general: 'General question',
}

const escape = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] ?? c,
  )

const shell = (
  body: string,
) => `<!doctype html><html><body style="margin:0;background:#f7f6f2;font-family:Inter,Segoe UI,Arial,sans-serif;color:#0b0f19">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 16px">
<table role="presentation" width="100%" style="max-width:560px;background:#ffffff;border-radius:16px;border:1px solid #e2e0d9">
<tr><td style="padding:28px 32px 8px"><strong style="font-size:18px;letter-spacing:-0.01em">Oqtekal</strong></td></tr>
<tr><td style="padding:8px 32px 32px;font-size:15px;line-height:1.6">${body}</td></tr>
</table>
<p style="font-size:12px;color:#7a808b;margin-top:16px">Oqtekal · Engineering what runs business · oqtekal.com</p>
</td></tr></table></body></html>`

export const notifyEmail = (lead: LeadInput) => {
  const rows: [string, string | undefined][] = [
    ['Name', lead.name],
    ['Email', lead.email],
    ['Phone', lead.phone],
    ['Company', lead.company],
    ['Interest', lead.interest],
    ['Budget', lead.budget],
    ['Page', lead.sourcePage],
  ]
  const present = rows.filter((r): r is [string, string] => Boolean(r[1]))
  const subject = `${TYPE_LABEL[lead.type]} — ${lead.name}${lead.company ? `, ${lead.company}` : ''}`
  const text = `${present.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n${lead.message}`
  const html = shell(
    `<h1 style="font-size:20px;margin:0 0 16px">${escape(TYPE_LABEL[lead.type])}</h1>
<table role="presentation" style="font-size:14px;margin-bottom:16px">${present
      .map(
        ([k, v]) =>
          `<tr><td style="color:#7a808b;padding:2px 16px 2px 0">${k}</td><td>${escape(v)}</td></tr>`,
      )
      .join('')}</table>
<div style="white-space:pre-wrap;border-top:1px solid #e2e0d9;padding-top:16px">${escape(lead.message)}</div>`,
  )
  return { subject, text, html }
}

export const autoReplyEmail = (lead: LeadInput) => {
  const first = lead.name.split(' ')[0]
  const subject = 'We have received your message — Oqtekal'
  const text = `Hi ${first},\n\nThank you for getting in touch. An Oqtekal engineer will review your message and reply within one business day.\n\nIf it is urgent, reply to this email or message us on WhatsApp.\n\n— The Oqtekal team`
  const html = shell(
    `<p>Hi ${escape(first)},</p><p>Thank you for getting in touch. An Oqtekal engineer will review your message and reply <strong>within one business day</strong>.</p><p>If it is urgent, simply reply to this email or message us on WhatsApp.</p><p>— The Oqtekal team</p>`,
  )
  return { subject, text, html }
}

import { readFile } from 'node:fs/promises'
import path from 'node:path'

import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'

import { SYMBOL_PATH, SYMBOL_TRANSFORM } from '@/features/brand'

/** Branded 1200×630 share image: /og?title=…&eyebrow=… */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const title = (searchParams.get('title') ?? 'Engineering what runs business.').slice(0, 110)
  const eyebrow = (searchParams.get('eyebrow') ?? 'Oqtekal').slice(0, 40)
  const font = await readFile(path.join(process.cwd(), 'src/assets/fonts/archivo-bold-118.ttf'))

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px 80px',
        background: '#0b0f19',
        color: '#f7f6f2',
        fontFamily: 'Archivo',
        position: 'relative',
      }}
    >
      <svg
        width="560"
        height="560"
        viewBox="0 0 100 100"
        style={{ position: 'absolute', right: -90, bottom: -150, opacity: 0.9 }}
      >
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2FA8FF" />
            <stop offset="0.55" stopColor="#064DFB" />
            <stop offset="1" stopColor="#14246E" />
          </linearGradient>
        </defs>
        <path transform={SYMBOL_TRANSFORM} d={SYMBOL_PATH} fill="url(#g)" fillRule="evenodd" />
      </svg>
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 30, letterSpacing: 6 }}
      >
        <span style={{ color: '#2fa8ff' }}>OQTEKAL</span>
        <span style={{ color: '#7b818d' }}>/</span>
        <span
          style={{ color: '#a3a8b3', letterSpacing: 3, textTransform: 'uppercase', fontSize: 24 }}
        >
          {eyebrow}
        </span>
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: title.length > 60 ? 64 : 78,
          lineHeight: 1.04,
          letterSpacing: -2,
          maxWidth: 900,
        }}
      >
        {title}
      </div>
      <div style={{ display: 'flex', fontSize: 26, color: '#a3a8b3' }}>
        oqtekal.com · Engineering what runs business
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [{ name: 'Archivo', data: font, weight: 700, style: 'normal' }],
      headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=604800' },
    },
  )
}

/**
 * Generates public/brand/current-field.svg — the still version of the hero artwork, used behind
 * page headers and in the footer: a field of fine current lines, lit in brand blue where it
 * passes through the Oqtekal mark. Deterministic, so re-running gives the same file.
 *
 *   npm run brand:art
 */
import { writeFileSync } from 'node:fs'

import { SYMBOL_PATH, SYMBOL_TRANSFORM } from '../../src/features/brand/symbol'

const W = 1600
const H = 800
// Where the mark sits (its artboard is a 100×100 square).
const MARK = { x: 750, y: -10, size: 820 }

// Small seeded generator (mulberry32) so the artwork never changes between builds.
let seed = 20261005
const rand = () => {
  seed = (seed + 0x6d2b79f5) | 0
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

/** The same slowly bending field as the live hero, frozen at one moment. */
const angle = (x: number, y: number) =>
  (Math.sin(x * 0.003 + 2.1) + Math.cos(y * 0.0041 - 1.4) + Math.sin((x + y) * 0.0019 + 0.9)) *
    0.42 +
  0.28

const n = (v: number) => Math.round(v * 10) / 10

const stroke = (x: number, y: number, length: number) => {
  const a0 = angle(x, y)
  const cx = x + Math.cos(a0) * length * 0.5
  const cy = y + Math.sin(a0) * length * 0.5
  const a1 = angle(cx, cy)
  const ex = cx + Math.cos(a1) * length * 0.5
  const ey = cy + Math.sin(a1) * length * 0.5
  return `M${n(x)} ${n(y)}Q${n(cx)} ${n(cy)} ${n(ex)} ${n(ey)}`
}

const field = (count: number, min: number, max: number) => {
  let d = ''
  for (let i = 0; i < count; i++) {
    d += stroke(rand() * (W + 200) - 100, rand() * (H + 100) - 50, min + rand() * (max - min))
  }
  return d
}

const inMark = (count: number, min: number, max: number) => {
  let d = ''
  for (let i = 0; i < count; i++) {
    d += stroke(
      MARK.x + rand() * MARK.size - 30,
      MARK.y + MARK.size * (0.12 + rand() * 0.76),
      min + rand() * (max - min),
    )
  }
  return d
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" fill="none" stroke-linecap="round">
<defs>
<clipPath id="m"><path transform="translate(${MARK.x} ${MARK.y}) scale(${MARK.size / 100}) ${SYMBOL_TRANSFORM}" d="${SYMBOL_PATH}" clip-rule="evenodd"/></clipPath>
<linearGradient id="g" gradientUnits="userSpaceOnUse" x1="${MARK.x}" y1="${MARK.y + 150}" x2="${MARK.x + MARK.size}" y2="${MARK.y + MARK.size - 150}"><stop offset=".05" stop-color="#3DB8FF"/><stop offset=".6" stop-color="#0F5CFF"/><stop offset="1" stop-color="#3550D8"/></linearGradient>
</defs>
<path stroke="#fff" stroke-opacity=".1" stroke-width="1" d="${field(620, 50, 150)}"/>
<path stroke="#fff" stroke-opacity=".17" stroke-width="1" d="${field(260, 30, 110)}"/>
<g clip-path="url(#m)" stroke="url(#g)">
<path stroke-opacity=".5" stroke-width="1.6" d="${inMark(1250, 30, 90)}"/>
<path stroke-opacity=".95" stroke-width="1.8" d="${inMark(1250, 24, 70)}"/>
</g>
</svg>
`

writeFileSync(new URL('../../public/brand/current-field.svg', import.meta.url), svg)
console.log(`current-field.svg  ${(svg.length / 1024).toFixed(0)} KB`)

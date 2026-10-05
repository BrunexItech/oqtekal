'use client'

import { useEffect, useRef } from 'react'

import { SYMBOL_PATH, SYMBOL_TRANSFORM } from '@/features/brand'
import { cn } from '@/lib/cn'

/* --------------------------------------------------------------------------------------------
 * The hero artwork: a field of fine current lines drifting across the page. Wherever the current
 * passes through the Oqtekal mark it lights up in brand blue, so the symbol is never drawn — it
 * is revealed by what runs through it. Lines bend away from the pointer.
 * Purely decorative (aria-hidden); drawn once and left still for reduced motion.
 * ------------------------------------------------------------------------------------------ */

const MARK = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path transform="${SYMBOL_TRANSFORM}" d="${SYMBOL_PATH}" fill-rule="evenodd"/></svg>`,
)}`

/** Mask resolution: one cell per CELL css pixels. */
const CELL = 3
const STRIDE = 4 // x, y, life, speed

export const HeroCurrent = ({ className }: { className?: string }) => {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mark = new Image()
    let w = 0
    let h = 0
    let cols = 0
    let rows = 0
    let mask = new Uint8Array(0)
    let inside = new Int32Array(0)
    let parts = new Float32Array(0)
    let blue: CanvasGradient | string = '#064DFB'
    let ink = '#0B0F19'
    let t = Math.random() * 100
    let frame = 0
    let visible = true
    const pointer = { x: -1e4, y: -1e4 }

    const inMark = (x: number, y: number) => {
      const c = (x / CELL) | 0
      const r = (y / CELL) | 0
      return c >= 0 && r >= 0 && c < cols && r < rows && mask[r * cols + c] === 1
    }

    const spawn = (i: number, anywhere = false) => {
      const o = i * STRIDE
      if (inside.length && Math.random() < 0.72) {
        const cell = inside[(Math.random() * inside.length) | 0]!
        parts[o] = ((cell % cols) + Math.random()) * CELL
        parts[o + 1] = (((cell / cols) | 0) + Math.random()) * CELL
      } else {
        parts[o] = anywhere ? Math.random() * w : Math.random() * w * 0.5 - 20
        parts[o + 1] = Math.random() * h
      }
      parts[o + 2] = 50 + Math.random() * 150
      parts[o + 3] = 0.55 + Math.random() * 0.75
    }

    const setup = () => {
      const rect = canvas.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width
      h = rect.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.lineCap = 'round'

      // Rasterise the mark, centred, into a coarse grid we can test against cheaply.
      cols = Math.ceil(w / CELL)
      rows = Math.ceil(h / CELL)
      const size = Math.min(w * 0.82, h * 1.25)
      const left = (w - size) / 2
      const top = (h - size) / 2
      const off = document.createElement('canvas')
      off.width = cols
      off.height = rows
      const octx = off.getContext('2d', { willReadFrequently: true })
      mask = new Uint8Array(cols * rows)
      const cells: number[] = []
      if (octx && mark.complete && mark.naturalWidth) {
        octx.drawImage(mark, left / CELL, top / CELL, size / CELL, size / CELL)
        const data = octx.getImageData(0, 0, cols, rows).data
        for (let k = 0; k < mask.length; k++) {
          if (data[k * 4 + 3]! > 120) {
            mask[k] = 1
            cells.push(k)
          }
        }
      }
      inside = Int32Array.from(cells)

      const grad = ctx.createLinearGradient(left, top, left + size, top + size)
      grad.addColorStop(0.1, '#35B4FF')
      grad.addColorStop(0.6, '#0A56FF')
      grad.addColorStop(1, '#2B45C8')
      blue = grad
      ink = getComputedStyle(canvas).color

      const count = Math.max(1300, Math.min(4400, Math.round((w * h) / 210)))
      parts = new Float32Array(count * STRIDE)
      for (let i = 0; i < count; i++) spawn(i, true)
      ctx.clearRect(0, 0, w, h)
    }

    const step = () => {
      t += 0.0035
      // Fade what is already there, so every line leaves a short trail.
      ctx.globalCompositeOperation = 'destination-out'
      ctx.globalAlpha = 1
      ctx.fillStyle = 'rgba(0,0,0,0.042)'
      ctx.fillRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'source-over'

      const lit = new Path2D()
      const dim = new Path2D()
      for (let i = 0, n = parts.length / STRIDE; i < n; i++) {
        const o = i * STRIDE
        const x = parts[o]!
        const y = parts[o + 1]!
        // A smooth, slowly shifting field that always carries the current to the right.
        let a =
          (Math.sin(x * 0.0052 + t * 1.7) +
            Math.cos(y * 0.0068 - t * 1.3) +
            Math.sin((x + y) * 0.0031 + t)) *
          0.46
        const dx = x - pointer.x
        const dy = y - pointer.y
        const d2 = dx * dx + dy * dy
        if (d2 < 19600) a += (dy > 0 ? 1 : -1) * (1 - d2 / 19600) * 1.1
        const on = inMark(x, y)
        const v = parts[o + 3]! * (on ? 0.9 : 1.5)
        const nx = x + Math.cos(a) * v
        const ny = y + Math.sin(a) * v
        const path = on ? lit : dim
        path.moveTo(x, y)
        path.lineTo(nx, ny)
        parts[o] = nx
        parts[o + 1] = ny
        if (--parts[o + 2]! < 0 || nx > w + 4 || ny < -4 || ny > h + 4) spawn(i)
      }
      ctx.globalAlpha = 0.13
      ctx.strokeStyle = ink
      ctx.lineWidth = 0.8
      ctx.stroke(dim)
      ctx.globalAlpha = 0.95
      ctx.strokeStyle = blue
      ctx.lineWidth = 1.3
      ctx.stroke(lit)
    }

    const loop = () => {
      frame = 0
      if (!visible || document.hidden) return
      step()
      frame = requestAnimationFrame(loop)
    }
    const play = () => {
      if (!reduce && !frame) frame = requestAnimationFrame(loop)
    }
    // Arrive already formed rather than assembling from nothing. The warm-up is spread over a few
    // frames so it never holds up the page.
    let warm = 0
    const warmUp = () => {
      frame = 0
      for (let i = 0; i < 10 && warm > 0; i++, warm--) step()
      if (warm > 0) {
        frame = requestAnimationFrame(warmUp)
        return
      }
      canvas.dataset.ready = ''
      play()
    }
    const start = () => {
      cancelAnimationFrame(frame)
      frame = 0
      setup()
      if (!w) return
      warm = reduce ? 200 : 70
      frame = requestAnimationFrame(warmUp)
    }

    mark.onload = start
    mark.src = MARK

    let lastWidth = 0
    const resize = new ResizeObserver(([entry]) => {
      const width = Math.round(entry?.contentRect.width ?? 0)
      if (!mark.complete || width === lastWidth) return
      lastWidth = width
      start()
    })
    resize.observe(canvas)

    const seen = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true
      if (visible) play()
    })
    seen.observe(canvas)

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
    }
    // Follow the light/dark switch.
    const theme = new MutationObserver(() => {
      ink = getComputedStyle(canvas).color
    })
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('visibilitychange', play)

    return () => {
      cancelAnimationFrame(frame)
      resize.disconnect()
      seen.disconnect()
      theme.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('visibilitychange', play)
    }
  }, [])

  return (
    <div aria-hidden data-decorative className={cn('relative', className)}>
      <canvas
        ref={ref}
        className="absolute -inset-x-[14%] -inset-y-[8%] h-[116%] w-[128%] [mask-image:radial-gradient(ellipse_62%_60%_at_50%_50%,black_55%,transparent_100%)] text-fg opacity-0 transition-opacity duration-[1400ms] ease-out data-[ready]:opacity-100"
      />
    </div>
  )
}

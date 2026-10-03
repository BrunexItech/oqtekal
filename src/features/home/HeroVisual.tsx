'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

import { Symbol } from '@/features/brand'
import { cn } from '@/lib/cn'

const RibbonScene = dynamic(() => import('./RibbonScene'), { ssr: false })

/**
 * The hero's ribbon. A static gradient symbol renders immediately (no layout shift, works without JS);
 * the WebGL version loads after the page is idle, only on capable devices, and fades in over it.
 */
export const HeroVisual = ({ className }: { className?: string }) => {
  const [enable3d, setEnable3d] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean }
      deviceMemory?: number
    }
    const capable =
      !nav.webdriver &&
      !nav.connection?.saveData &&
      (nav.hardwareConcurrency ?? 4) >= 4 &&
      (nav.deviceMemory ?? 4) >= 4 &&
      !!document.createElement('canvas').getContext('webgl2')
    if (!capable) return
    const start = () => setEnable3d(true)
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number
    }
    if (w.requestIdleCallback) w.requestIdleCallback(start, { timeout: 2500 })
    else setTimeout(start, 1200)
  }, [])

  return (
    <div className={cn('relative aspect-square w-full', className)}>
      <div
        className={cn(
          'absolute inset-[14%] transition-[opacity,transform] duration-1000 ease-out-expo',
          ready ? 'scale-95 opacity-0' : 'opacity-100',
        )}
      >
        <Symbol
          gradient
          className="size-full animate-[float_7s_ease-in-out_infinite] motion-reduce:animate-none"
        />
      </div>
      {enable3d ? (
        <div
          className={cn(
            'absolute inset-0 transition-opacity duration-1000',
            ready ? 'opacity-100' : 'opacity-0',
          )}
        >
          <RibbonScene onReady={() => setTimeout(() => setReady(true), 120)} />
        </div>
      ) : null}
    </div>
  )
}

'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'

import { SYMBOL_PATH } from '@/features/brand'

/** Extrudes the traced ribbon symbol into a bevelled 3D object. */
const useRibbonGeometry = () =>
  useMemo(() => {
    const data = new SVGLoader().parse(
      `<svg xmlns="http://www.w3.org/2000/svg"><path d="${SYMBOL_PATH}"/></svg>`,
    )
    const shapes = data.paths.flatMap((p) => SVGLoader.createShapes(p))
    const geometry = new THREE.ExtrudeGeometry(shapes, {
      depth: 120,
      bevelEnabled: true,
      bevelThickness: 40,
      bevelSize: 22,
      bevelSegments: 10,
      curveSegments: 48,
    })
    geometry.center()
    // SVG y points down; flip so the mark reads correctly.
    geometry.scale(1, -1, 1)
    geometry.computeVertexNormals()
    const box = new THREE.Box3().setFromBufferAttribute(
      geometry.attributes.position as THREE.BufferAttribute,
    )
    const size = box.getSize(new THREE.Vector3())
    const s = 3.4 / Math.max(size.x, size.y)
    geometry.scale(s, s, s)
    return geometry
  }, [])

const Ribbon = ({ reduced }: { reduced: boolean }) => {
  const group = useRef<THREE.Group>(null)
  const geometry = useRibbonGeometry()
  const pointer = useThree((s) => s.pointer)

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#0a52ff'),
        metalness: 0.25,
        roughness: 0.22,
        clearcoat: 1,
        clearcoatRoughness: 0.12,
        sheen: 0.6,
        sheenColor: new THREE.Color('#2fa8ff'),
        iridescence: 0.25,
      }),
    [],
  )

  useFrame((state, delta) => {
    const g = group.current
    if (!g) return
    const t = state.clock.elapsedTime
    const targetY = reduced ? -0.35 : Math.sin(t * 0.35) * 0.45 - 0.2 + pointer.x * 0.35
    const targetX = reduced ? 0.18 : Math.cos(t * 0.3) * 0.12 + 0.12 - pointer.y * 0.25
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetY, 2.2, delta)
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetX, 2.2, delta)
    g.position.y = reduced ? 0 : Math.sin(t * 0.8) * 0.06
  })

  return (
    <group ref={group}>
      <mesh geometry={geometry} material={material} />
    </group>
  )
}

/** Lights tuned to give the blue ribbon the depth of the logo artwork, without glow effects. */
const Lights = () => (
  <>
    <ambientLight intensity={0.55} />
    <directionalLight position={[3, 4, 5]} intensity={2.4} color="#ffffff" />
    <directionalLight position={[-4, -2, 3]} intensity={1.2} color="#7cc4ff" />
    <directionalLight position={[0, 0, -5]} intensity={1.6} color="#2fa8ff" />
    <pointLight position={[0, 2.5, 2.5]} intensity={6} distance={9} color="#ffffff" />
  </>
)

export default function RibbonScene({ onReady }: { onReady?: () => void }) {
  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    onReady?.()
  }, [onReady])

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6.2], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop={reduced ? 'demand' : 'always'}
      aria-hidden
    >
      <Lights />
      <Ribbon reduced={reduced} />
    </Canvas>
  )
}

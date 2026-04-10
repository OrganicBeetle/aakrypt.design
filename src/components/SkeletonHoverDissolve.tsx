import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

interface ParticleNode {
  currentPosition: THREE.Vector3
  restPosition: THREE.Vector3
  velocity: THREE.Vector3
}

interface ParticleBuffers {
  colors: Float32Array
  particles: ParticleNode[]
  positions: Float32Array
}

interface SkeletonHoverDissolveProps {
  alt: string
  className?: string
  src: string
}

function supportsInteractiveCanvas() {
  if (typeof window === 'undefined') {
    return false
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches

  if (reducedMotion || coarsePointer) {
    return false
  }

  try {
    const canvas = document.createElement('canvas')
    const gl =
      canvas.getContext('webgl', { alpha: true }) ??
      canvas.getContext('experimental-webgl', { alpha: true })

    return Boolean(gl)
  } catch {
    return false
  }
}

async function sampleImageToParticles(
  imageUrl: string,
  particleDensity: number,
  displayWidth: number,
) {
  return new Promise<ParticleBuffers>((resolve, reject) => {
    const image = new Image()
    image.decoding = 'async'
    image.src = imageUrl

    image.onload = () => {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d', { willReadFrequently: true })

      if (!context) {
        reject(new Error('Could not create image sampling context'))
        return
      }

      canvas.width = image.width
      canvas.height = image.height
      context.drawImage(image, 0, 0)

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data
      const aspectRatio = image.width / image.height || 1
      const displayHeight = displayWidth / aspectRatio
      const step = Math.max(1, Math.ceil(1 / particleDensity))

      const tempPositions: number[] = []
      const tempColors: number[] = []
      const tempParticles: ParticleNode[] = []

      for (let y = 0; y < canvas.height; y += step) {
        for (let x = 0; x < canvas.width; x += step) {
          const index = (y * canvas.width + x) * 4
          const alpha = data[index + 3]

          if (alpha <= 40) {
            continue
          }

          const px = ((x / canvas.width) - 0.5) * displayWidth
          const py = -((y / canvas.height) - 0.5) * displayHeight
          const pz = 0
          const restPosition = new THREE.Vector3(px, py, pz)

          tempPositions.push(px, py, pz)
          tempColors.push(0.01, 0.01, 0.01)
          tempParticles.push({
            currentPosition: restPosition.clone(),
            restPosition: restPosition.clone(),
            velocity: new THREE.Vector3(0, 0, 0),
          })
        }
      }

      resolve({
        colors: new Float32Array(tempColors),
        particles: tempParticles,
        positions: new Float32Array(tempPositions),
      })
    }

    image.onerror = () => {
      reject(new Error('Failed to load skeleton image'))
    }
  })
}

function ParticleSystem({ imageUrl }: { imageUrl: string }) {
  const pointsRef = useRef<THREE.Points>(null)
  const particlesRef = useRef<ParticleNode[]>([])
  const mouseRef = useRef(new THREE.Vector2(-9999, -9999))
  const isHoveringRef = useRef(false)
  const raycasterRef = useRef(new THREE.Raycaster())
  const { camera, gl } = useThree()
  const [buffers, setBuffers] = useState<ParticleBuffers | null>(null)

  useEffect(() => {
    let isMounted = true

    // Increased displayWidth from 380 to 520 for a larger presence
    sampleImageToParticles(imageUrl, 0.55, 520)
      .then((result) => {
        if (!isMounted) {
          return
        }

        setBuffers(result)
        particlesRef.current = result.particles
      })
      .catch(() => {
        if (!isMounted) {
          return
        }

        setBuffers(null)
      })

    return () => {
      isMounted = false
    }
  }, [imageUrl])

  useEffect(() => {
    const canvas = gl.domElement

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect()
      mouseRef.current.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1
      mouseRef.current.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1
    }

    const handlePointerEnter = () => {
      isHoveringRef.current = true
    }

    const handlePointerLeave = () => {
      isHoveringRef.current = false
      mouseRef.current.set(-9999, -9999)
    }

    canvas.addEventListener('pointermove', handlePointerMove)
    canvas.addEventListener('pointerenter', handlePointerEnter)
    canvas.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      canvas.removeEventListener('pointermove', handlePointerMove)
      canvas.removeEventListener('pointerenter', handlePointerEnter)
      canvas.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [gl])

  useFrame(() => {
    if (!pointsRef.current || particlesRef.current.length === 0) {
      return
    }

    const positionAttribute = pointsRef.current.geometry.attributes
      .position as THREE.BufferAttribute
    const positions = positionAttribute.array as Float32Array
    const raycaster = raycasterRef.current

    raycaster.setFromCamera(mouseRef.current, camera)

    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
    const intersectPoint = new THREE.Vector3()
    raycaster.ray.intersectPlane(plane, intersectPoint)

    const repelRadius = 95
    const repelStrength = 62
    const returnSpeed = isHoveringRef.current ? 0.022 : 0.075

    particlesRef.current.forEach((particle, index) => {
      const index3 = index * 3

      if (isHoveringRef.current) {
        const dx = particle.currentPosition.x - intersectPoint.x
        const dy = particle.currentPosition.y - intersectPoint.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < repelRadius) {
          const force = Math.pow(1 - distance / repelRadius, 2) * repelStrength
          const angle = Math.atan2(dy, dx)
          const scatter = (Math.random() - 0.5) * 0.45

          particle.velocity.x += Math.cos(angle + scatter) * force * 0.18
          particle.velocity.y += Math.sin(angle + scatter) * force * 0.18
        }
      }

      particle.currentPosition.x += particle.velocity.x
      particle.currentPosition.y += particle.velocity.y

      const toRestX = particle.restPosition.x - particle.currentPosition.x
      const toRestY = particle.restPosition.y - particle.currentPosition.y

      particle.velocity.x += toRestX * returnSpeed
      particle.velocity.y += toRestY * returnSpeed
      particle.velocity.multiplyScalar(isHoveringRef.current ? 0.84 : 0.8)

      positions[index3] = particle.currentPosition.x
      positions[index3 + 1] = particle.currentPosition.y
      positions[index3 + 2] = particle.currentPosition.z
    })

    positionAttribute.needsUpdate = true
  })

  if (!buffers) {
    return null
  }

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={buffers.positions}
          count={buffers.positions.length / 3}
          itemSize={3}
          args={[buffers.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          array={buffers.colors}
          count={buffers.colors.length / 3}
          itemSize={3}
          args={[buffers.colors, 3]}
        />
      
      </bufferGeometry>
      <pointsMaterial
        blending={THREE.NormalBlending}
        depthWrite={false}
        opacity={0.98}
        size={2.9}
        sizeAttenuation
        transparent
        vertexColors
      />
    </points>
  )
}

function SkeletonHoverDissolve({
  src,
  alt,
  className,
}: SkeletonHoverDissolveProps) {
  const [canAnimate, setCanAnimate] = useState(false)

  useEffect(() => {
    setCanAnimate(supportsInteractiveCanvas())
  }, [])

  if (!canAnimate) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
      />
    )
  }

  return (
    <div className={`relative ${className ?? ''}`}>
      <Canvas
        camera={{ fov: 45, position: [0, 0, 600] }}
        gl={{ alpha: true, antialias: true, preserveDrawingBuffer: false }}
        style={{ background: 'transparent' }}
      >
        <ParticleSystem imageUrl={src} />
      </Canvas>
    </div>
  )
}

export default SkeletonHoverDissolve


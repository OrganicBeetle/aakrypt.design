import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleData {
  restPosition: THREE.Vector3;
  currentPosition: THREE.Vector3;
  velocity: THREE.Vector3;
  size: number;
  jitterSeed: number;
}

interface ParticleSkeletonProps {
  imageUrl: string;
  particleDensity?: number;
  repelStrength?: number;
  repelRadius?: number;
  returnSpeed?: number;
  particleSize?: number;
  displayWidth?: number;
}

// Utility to sample image and create particle data
async function sampleImageToParticles(
  imageUrl: string,
  particleDensity: number,
  particleSize: number,
  displayWidth: number
): Promise<{
  positions: Float32Array;
  colors: Float32Array;
  particles: ParticleData[];
}> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      const aspectRatio = img.width / img.height;
      const displayHeight = displayWidth / aspectRatio;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      const tempPositions: number[] = [];
      const tempColors: number[] = [];
      const tempParticles: ParticleData[] = [];

      // Sample pixels to create particles
      const step = Math.ceil(1 / particleDensity);

      for (let y = 0; y < canvas.height; y += step) {
        for (let x = 0; x < canvas.width; x += step) {
          const i = (y * canvas.width + x) * 4;
          const alpha = data[i + 3];

          // Only create particles where there's visible content
          if (alpha > 50) {
            // Normalize positions to centered range
            const px = ((x / canvas.width) - 0.5) * displayWidth;
            const py = -((y / canvas.height) - 0.5) * displayHeight;
            const pz = 0;

            const restPos = new THREE.Vector3(px, py, pz);

            tempPositions.push(px, py, pz);

            // Use grayscale values for color (dark particles)
            const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
            const colorValue = brightness / 255;
            const darkFactor = 0.15; // Make particles darker for skeleton effect
            tempColors.push(
              colorValue * darkFactor,
              colorValue * darkFactor,
              colorValue * darkFactor
            );

            tempParticles.push({
              restPosition: restPos.clone(),
              currentPosition: restPos.clone(),
              velocity: new THREE.Vector3(0, 0, 0),
              size: particleSize * (0.8 + Math.random() * 0.4),
              jitterSeed: Math.random() * Math.PI * 2,
            });
          }
        }
      }

      resolve({
        positions: new Float32Array(tempPositions),
        colors: new Float32Array(tempColors),
        particles: tempParticles,
      });
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    img.src = imageUrl;
  });
}

function ParticleSystem({
  imageUrl,
  particleDensity = 0.5,
  repelStrength = 40,
  repelRadius = 100,
  returnSpeed = 0.12,
  particleSize = 2.5,
  displayWidth = 400,
}: ParticleSkeletonProps) {
  const meshRef = useRef<THREE.Points>(null);
  const particlesDataRef = useRef<ParticleData[]>([]);
  const mouseRef = useRef(new THREE.Vector2(-9999, -9999));
  const isHoveringRef = useRef(false);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const { camera, gl } = useThree();

  const [particleBuffers, setParticleBuffers] = useState<{
    positions: Float32Array;
    colors: Float32Array;
  } | null>(null);

  // Load and sample image
  useEffect(() => {
    let mounted = true;

    sampleImageToParticles(imageUrl, particleDensity, particleSize, displayWidth)
      .then((result) => {
        if (mounted) {
          setParticleBuffers({
            positions: result.positions,
            colors: result.colors,
          });
          particlesDataRef.current = result.particles;
        }
      })
      .catch((error) => {
        console.error('Failed to load particle skeleton:', error);
      });

    return () => {
      mounted = false;
    };
  }, [imageUrl, particleDensity, particleSize, displayWidth]);

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handleMouseEnter = () => {
      isHoveringRef.current = true;
    };

    const handleMouseLeave = () => {
      isHoveringRef.current = false;
      mouseRef.current.set(-9999, -9999);
    };

    const canvas = gl.domElement;
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [gl]);

  // Animation loop
  useFrame((state) => {
    if (!meshRef.current || particlesDataRef.current.length === 0) return;

    const positionAttr = meshRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const positions = positionAttr.array as Float32Array;

    // Get 3D position of mouse in world space
    raycaster.setFromCamera(mouseRef.current, camera);
    const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const intersectPoint = new THREE.Vector3();
    raycaster.ray.intersectPlane(planeZ, intersectPoint);

    const time = state.clock.getElapsedTime();

    particlesDataRef.current.forEach((particle, i) => {
      const i3 = i * 3;

      // Add subtle organic jitter for "biological" feel
      const jitterAmount = 0.2;
      const jitterX = Math.sin(time * 1.8 + particle.jitterSeed) * jitterAmount;
      const jitterY = Math.cos(time * 1.3 + particle.jitterSeed) * jitterAmount;

      if (isHoveringRef.current) {
        // Calculate distance to mouse
        const dx = particle.currentPosition.x - intersectPoint.x;
        const dy = particle.currentPosition.y - intersectPoint.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Only affect particles within cursor radius
        if (distance < repelRadius) {
          // Stronger repulsion when closer to cursor
          const force = Math.pow(1 - distance / repelRadius, 2) * repelStrength;
          const angle = Math.atan2(dy, dx);

          // Add random scatter for "globule" effect
          const scatter = (Math.random() - 0.5) * 0.3;

          particle.velocity.x += Math.cos(angle + scatter) * force * 0.15;
          particle.velocity.y += Math.sin(angle + scatter) * force * 0.15;
        }
      }

      // Apply velocity
      particle.currentPosition.x += particle.velocity.x;
      particle.currentPosition.y += particle.velocity.y;

      // Return to rest position with spring-like motion
      const dx = particle.restPosition.x - particle.currentPosition.x;
      const dy = particle.restPosition.y - particle.currentPosition.y;

      particle.velocity.x += dx * returnSpeed;
      particle.velocity.y += dy * returnSpeed;

      // Apply damping for smooth deceleration
      particle.velocity.multiplyScalar(0.88);

      // Update position buffer with jitter
      positions[i3] = particle.currentPosition.x + jitterX;
      positions[i3 + 1] = particle.currentPosition.y + jitterY;
      positions[i3 + 2] = particle.currentPosition.z;
    });

    positionAttr.needsUpdate = true;
  });

  if (!particleBuffers) {
    return null;
  }

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleBuffers.positions.length / 3}
          array={particleBuffers.positions}
          itemSize={3}
          args={[particleBuffers.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleBuffers.colors.length / 3}
          array={particleBuffers.colors}
          itemSize={3}
          args={[particleBuffers.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={particleSize}
        vertexColors
        transparent
        opacity={0.95}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  );
}

export function ParticleSkeleton(props: ParticleSkeletonProps) {
  return (
    <div className="absolute inset-0 pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 600], fov: 45 }}
        gl={{ alpha: true, antialias: true, preserveDrawingBuffer: false }}
        style={{ background: 'transparent' }}
      >
        <ParticleSystem {...props} />
      </Canvas>
    </div>
  );
}

export default ParticleSkeleton;

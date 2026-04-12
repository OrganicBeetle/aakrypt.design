import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';

interface MorphParticle {
  skeletonPos: THREE.Vector3;
  wheelPos: THREE.Vector3;
  currentPos: THREE.Vector3;
  velocity: THREE.Vector3;
  size: number;
  alpha: number;
}

interface SkeletonToWheelMorphProps {
  heroContent: React.ReactNode;
  aboutContent: React.ReactNode;
  skeletonImageUrl: string;
  wheelImages?: string[]; // Images for the wheel
  wheelRadius?: number;
}

// Particle system that morphs from skeleton to wheel
function MorphingParticleSystem({
  skeletonImageUrl,
  morphProgress,
  wheelRadius = 200,
}: {
  skeletonImageUrl: string;
  morphProgress: number;
  wheelRadius: number;
}) {
  const meshRef = useRef<THREE.Points>(null);
  const particlesRef = useRef<MorphParticle[]>([]);
  const [initialized, setInitialized] = useState(false);

  // Initialize particles from skeleton image
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;

      const displayWidth = 400;
      const aspectRatio = img.width / img.height;
      const displayHeight = displayWidth / aspectRatio;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      const tempParticles: MorphParticle[] = [];
      const step = 3; // Sample every 3rd pixel

      // Create skeleton particles
      for (let y = 0; y < canvas.height; y += step) {
        for (let x = 0; x < canvas.width; x += step) {
          const i = (y * canvas.width + x) * 4;
          const alpha = data[i + 3];

          if (alpha > 50) {
            const px = ((x / canvas.width) - 0.5) * displayWidth;
            const py = -((y / canvas.height) - 0.5) * displayHeight;
            const skeletonPos = new THREE.Vector3(px, py, 0);

            // Assign to random wheel position
            const angle = Math.random() * Math.PI * 2;
            const radiusVariation = wheelRadius * (0.8 + Math.random() * 0.4);
            const wheelX = Math.cos(angle) * radiusVariation;
            const wheelY = Math.sin(angle) * radiusVariation;
            const wheelPos = new THREE.Vector3(wheelX, wheelY, 0);

            tempParticles.push({
              skeletonPos: skeletonPos.clone(),
              wheelPos: wheelPos,
              currentPos: skeletonPos.clone(),
              velocity: new THREE.Vector3(0, 0, 0),
              size: 1.5 + Math.random() * 1,
              alpha: alpha / 255,
            });
          }
        }
      }

      particlesRef.current = tempParticles;
      setInitialized(true);
    };

    img.src = skeletonImageUrl;
  }, [skeletonImageUrl, wheelRadius]);

  // Animation loop
  useFrame(() => {
    if (!meshRef.current || !initialized) return;

    const positionAttr = meshRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const positions = positionAttr.array as Float32Array;

    particlesRef.current.forEach((particle, i) => {
      const i3 = i * 3;

      // Interpolate between skeleton and wheel positions
      particle.currentPos.lerpVectors(
        particle.skeletonPos,
        particle.wheelPos,
        morphProgress
      );

      // Add slight jitter
      const jitter = Math.sin(Date.now() * 0.001 + i) * 0.5;

      positions[i3] = particle.currentPos.x + jitter;
      positions[i3 + 1] = particle.currentPos.y + jitter;
      positions[i3 + 2] = particle.currentPos.z;
    });

    positionAttr.needsUpdate = true;
  });

  if (!initialized || particlesRef.current.length === 0) {
    return null;
  }

  const positionsArray = new Float32Array(particlesRef.current.length * 3);
  particlesRef.current.forEach((p, i) => {
    positionsArray[i * 3] = p.currentPos.x;
    positionsArray[i * 3 + 1] = p.currentPos.y;
    positionsArray[i * 3 + 2] = p.currentPos.z;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positionsArray.length / 3}
          array={positionsArray}
          itemSize={3}
          args={[positionsArray, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={2}
        color="#1a1a1a"
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export function SkeletonToWheelMorph({
  heroContent,
  aboutContent,
  skeletonImageUrl,
  wheelRadius = 200,
}: SkeletonToWheelMorphProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Morph progress: 0 = skeleton, 1 = wheel
  const morphProgress = useTransform(scrollYProgress, [0, 0.6, 1], [0, 0.8, 1]);

  // Hero opacity - fade out hero content
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 0.5, 0]);
  const heroBlur = useTransform(scrollYProgress, [0, 0.4], [0, 10]);

  // About opacity - fade in about content
  const aboutOpacity = useTransform(scrollYProgress, [0.5, 0.8, 1], [0, 0.5, 1]);
  const aboutBlur = useTransform(scrollYProgress, [0.5, 0.8, 1], [10, 3, 0]);

  // Particle canvas opacity - visible throughout
  const particleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 0.7, 0]);

  return (
    <div ref={containerRef} className="relative h-[250vh]">
      {/* Hero Background - fades out */}
      <motion.div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ opacity: heroOpacity }}
      >
        <motion.div
          className="w-full h-full"
          style={{ filter: `blur(${heroBlur.get()}px)` }}
        >
          {heroContent}
        </motion.div>
      </motion.div>

      {/* Morphing Particle System - stays throughout */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-20"
        style={{ opacity: particleOpacity }}
      >
        <Canvas
          camera={{ position: [0, 0, 600], fov: 45 }}
          gl={{ alpha: true, antialias: true }}
          style={{ background: 'transparent' }}
        >
          <MorphingParticleSystem
            skeletonImageUrl={skeletonImageUrl}
            morphProgress={morphProgress.get()}
            wheelRadius={wheelRadius}
          />
        </Canvas>
      </motion.div>

      {/* About Section - fades in */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-10"
        style={{ opacity: aboutOpacity }}
      >
        <motion.div
          className="w-full h-screen"
          style={{ filter: `blur(${aboutBlur.get()}px)` }}
        >
          {aboutContent}
        </motion.div>
      </motion.div>

      {/* Dark overlay for smooth transition */}
      <motion.div
        className="fixed inset-0 bg-black pointer-events-none z-5"
        style={{
          opacity: useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 0.5, 0]),
        }}
      />
    </div>
  );
}

// Simplified version with smooth fade
export function SkeletonToWheelMorphSimple({
  heroContent,
  aboutContent,
  skeletonImageUrl: _skeletonImageUrl,
}: SkeletonToWheelMorphProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Phase 1: Hero visible (0-0.3)
  // Phase 2: Transition (0.3-0.7)
  // Phase 3: About visible (0.7-1.0)

  const heroOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [1, 0.8, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroBlur = useTransform(scrollYProgress, [0.2, 0.6], [0, 15]);

  const aboutOpacity = useTransform(scrollYProgress, [0.4, 0.7, 1], [0, 0.5, 1]);
  const aboutScale = useTransform(scrollYProgress, [0.4, 1], [1.05, 1]);
  const aboutBlur = useTransform(scrollYProgress, [0.4, 0.8, 1], [12, 4, 0]);

  // Overlay for smooth blend
  const overlayOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 0.8, 0]);

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      {/* Hero */}
      <motion.div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{
          opacity: heroOpacity,
          scale: heroScale,
        }}
      >
        <motion.div
          className="w-full h-full"
          style={{ filter: `blur(${heroBlur.get()}px)` }}
        >
          {heroContent}
        </motion.div>
      </motion.div>

      {/* Transition overlay */}
      <motion.div
        className="fixed inset-0 bg-black pointer-events-none"
        style={{ opacity: overlayOpacity }}
      />

      {/* About */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{
          opacity: aboutOpacity,
          scale: aboutScale,
        }}
      >
        <motion.div
          className="w-full h-screen"
          style={{ filter: `blur(${aboutBlur.get()}px)` }}
        >
          {aboutContent}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default SkeletonToWheelMorph;

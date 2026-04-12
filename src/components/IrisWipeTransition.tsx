import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface TransitionProps {
  heroContent: React.ReactNode
  aboutContent: React.ReactNode
}

/**
 * Intricate ScrollTrigger Transition
 * Multi-layered animation between Hero and About sections
 * 
 * Animations:
 * - Progressive blur (0px → 12px → 0px)
 * - Scale transformations (parallax effect)
 * - Opacity cascading (staggered element reveals)
 * - Brightness shift (light transition)
 * - Overlay effect (transition moment)
 * - Y-axis movement (parallax depth)
 */
export function IrisWipeTransition({ heroContent, aboutContent }: TransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // ===== HERO ANIMATIONS =====
  // Hero blur: 0px → 12px → 12px
  const heroBlur = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    [0, 4, 12, 12]
  )

  // Hero opacity: 1 → 0.9 → 0.3 → 0
  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.6, 1],
    [1, 0.9, 0.1, 0]
  )

  // Hero scale: 1 → 1 → 0.92 → 0.92
  const heroScale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.65, 1],
    [1, 1, 0.92, 0.92]
  )

  // Hero Y movement: 0 → -10 → -20 → -20
  const heroY = useTransform(
    scrollYProgress,
    [0, 0.3, 0.65, 1],
    [0, -10, -20, -20]
  )

  // Hero brightness: 1 → 0.95 → 0.7 → 0.7
  const heroBrightness = useTransform(
    scrollYProgress,
    [0, 0.3, 0.65, 1],
    [1, 0.95, 0.7, 0.7]
  )

  // ===== ABOUT ANIMATIONS =====
  // About blur: 12px → 8px → 2px → 0px
  const aboutBlur = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    [12, 8, 2, 0]
  )

  // About opacity: 0 → 0.1 → 0.8 → 1
  const aboutOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    [0, 0.05, 0.8, 1]
  )

  // About scale: 0.95 → 0.97 → 0.99 → 1
  const aboutScale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.65, 1],
    [0.95, 0.97, 0.99, 1]
  )

  // About Y movement: 20 → 10 → 5 → 0
  const aboutY = useTransform(
    scrollYProgress,
    [0, 0.3, 0.65, 1],
    [20, 10, 5, 0]
  )

  // About brightness: 0.6 → 0.7 → 0.95 → 1
  const aboutBrightness = useTransform(
    scrollYProgress,
    [0, 0.3, 0.65, 1],
    [0.6, 0.7, 0.95, 1]
  )

  // ===== OVERLAY ANIMATIONS =====
  // Overlay opacity: 0 → 0.3 → 0.5 → 0.3 → 0 (pulse effect)
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, 0.3, 0.5, 0.2, 0]
  )

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      {/* ===== TRANSITION OVERLAY ===== */}
      <motion.div
        className="fixed inset-0 z-30 pointer-events-none"
        style={{
          backgroundColor: '#2c353c',
          opacity: overlayOpacity,
        }}
      />

      {/* ===== HERO SECTION (Sticky) ===== */}
      <motion.div
        className="sticky top-0 h-screen w-full overflow-hidden bg-paper"
        style={{
          opacity: heroOpacity,
          scale: heroScale,
          y: heroY,
        }}
      >
        <motion.div
          style={{
            filter: `blur(${heroBlur.get()}px) brightness(${heroBrightness.get()})`,
          }}
          className="w-full h-full"
        >
          {heroContent}
        </motion.div>
      </motion.div>

      {/* ===== ABOUT SECTION (Fixed) ===== */}
      <motion.div
        className="fixed inset-0 h-screen w-full bg-ink flex items-center justify-center"
        style={{
          opacity: aboutOpacity,
          scale: aboutScale,
          y: aboutY,
        }}
      >
        <motion.div
          style={{
            filter: `blur(${aboutBlur.get()}px) brightness(${aboutBrightness.get()})`,
          }}
          className="w-full h-full flex items-center justify-center"
        >
          {aboutContent}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default IrisWipeTransition

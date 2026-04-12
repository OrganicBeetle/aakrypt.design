import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface BlurOverlayTransitionProps {
  heroContent: React.ReactNode;
  aboutContent: React.ReactNode;
  overlayColor?: string; // hex color for overlay
  grainTexture?: boolean; // add film grain effect
}

export function BlurOverlayTransition({
  heroContent,
  aboutContent,
  overlayColor = '#000000',
  grainTexture = true,
}: BlurOverlayTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Hero effects
  const heroBlur = useTransform(scrollYProgress, [0, 0.4, 0.7], [0, 5, 15]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.98, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.5, 0]);
  
  // Overlay opacity
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.5, 1, 1]);
  
  // About effects - fade in with slight scale
  const aboutOpacity = useTransform(scrollYProgress, [0.3, 0.7, 1], [0, 0.3, 1]);
  const aboutScale = useTransform(scrollYProgress, [0.5, 1], [1.05, 1]);
  const aboutBlur = useTransform(scrollYProgress, [0.5, 0.8, 1], [10, 3, 0]);

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      {/* Hero Section - Fixed and fading */}
      <motion.div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{
          opacity: heroOpacity,
          scale: heroScale,
        }}
      >
        <motion.div
          className="w-full h-full"
          style={{
            filter: `blur(${heroBlur.get()}px)`,
          }}
        >
          {heroContent}
        </motion.div>
      </motion.div>

      {/* Overlay - appears then disappears */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundColor: overlayColor,
          opacity: overlayOpacity,
        }}
      >
        {grainTexture && (
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
              mixBlendMode: 'overlay',
            }}
          />
        )}
      </motion.div>

      {/* About Section - fades in behind overlay */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{
          opacity: aboutOpacity,
          scale: aboutScale,
        }}
      >
        <motion.div
          className="w-full h-screen"
          style={{
            filter: `blur(${aboutBlur.get()}px)`,
          }}
        >
          {aboutContent}
        </motion.div>
      </motion.div>
    </div>
  );
}

// Enhanced version with color transition
export function BlurOverlayTransitionEnhanced({
  heroContent,
  aboutContent,
}: BlurOverlayTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Hero effects
  const heroBlur = useTransform(scrollYProgress, [0, 0.35, 0.65], [0, 4, 12]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.98, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5, 0.8], [1, 0.6, 0]);
  const heroBrightness = useTransform(scrollYProgress, [0, 0.5], [1, 0.7]);
  
  // Overlay phases: fade in dark → transition color → fade out
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, 0.4, 0.9, 0.9, 0]
  );
  
  // About effects
  const aboutOpacity = useTransform(scrollYProgress, [0.4, 0.7, 1], [0, 0.4, 1]);
  const aboutScale = useTransform(scrollYProgress, [0.5, 0.85, 1], [1.08, 1.02, 1]);
  const aboutBlur = useTransform(scrollYProgress, [0.5, 0.75, 1], [8, 2, 0]);
  const aboutY = useTransform(scrollYProgress, [0.5, 1], [20, 0]);

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      {/* Hero Section */}
      <motion.div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{
          opacity: heroOpacity,
          scale: heroScale,
        }}
      >
        <motion.div
          className="w-full h-full"
          style={{
            filter: `blur(${heroBlur.get()}px) brightness(${heroBrightness.get()})`,
          }}
        >
          {heroContent}
        </motion.div>
      </motion.div>

      {/* Gradient Overlay with grain */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{
          opacity: overlayOpacity,
          background: 'radial-gradient(ellipse at center, #1a1a1a 0%, #000000 100%)',
        }}
      >
        {/* Film grain texture */}
        <div 
          className="absolute inset-0 opacity-20 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E")`,
          }}
        />
      </motion.div>

      {/* About Section */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{
          opacity: aboutOpacity,
          scale: aboutScale,
          y: aboutY,
        }}
      >
        <motion.div
          className="w-full h-screen"
          style={{
            filter: `blur(${aboutBlur.get()}px)`,
          }}
        >
          {aboutContent}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default BlurOverlayTransition;

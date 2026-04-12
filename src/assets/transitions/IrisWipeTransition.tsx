import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface IrisWipeTransitionProps {
  heroContent: React.ReactNode;
  aboutContent: React.ReactNode;
  startFromCenter?: boolean; // true = center, false = cursor position
}

export function IrisWipeTransition({
  heroContent,
  aboutContent,
  startFromCenter = true,
}: IrisWipeTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 }); // percentage
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Transform scroll to circle scale (0 to 150vmax)
  const circleScale = useTransform(scrollYProgress, [0, 0.5, 1], [0, 75, 150]);
  
  // Hero opacity - fade out as circle expands
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [1, 0.7, 0]);
  
  // Hero blur
  const heroBlur = useTransform(scrollYProgress, [0, 0.5], [0, 10]);

  // Track cursor for dynamic origin
  useEffect(() => {
    if (startFromCenter) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setCursorPos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [startFromCenter]);

  const originX = startFromCenter ? 50 : cursorPos.x;
  const originY = startFromCenter ? 50 : cursorPos.y;

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      {/* Hero Section - Fixed */}
      <motion.div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ opacity: heroOpacity }}
      >
        <motion.div
          style={{ filter: heroBlur.get() > 0 ? `blur(${heroBlur.get()}px)` : 'none' }}
          className="w-full h-full"
        >
          {heroContent}
        </motion.div>
      </motion.div>

      {/* About Section - Revealed through expanding circle */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          style={{
            clipPath: `circle(${circleScale.get()}vmax at ${originX}% ${originY}%)`,
          }}
        >
          <div className="w-full h-screen">
            {aboutContent}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Animated circle overlay version (smoother on some browsers)
export function IrisWipeTransitionSVG({
  heroContent,
  aboutContent,
}: IrisWipeTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Circle radius (0 to 3000 - covers screen diagonally)
  const circleRadius = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1500, 3000]);
  
  // Hero effects
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [1, 0.7, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.98, 0.95]);
  const heroBlur = useTransform(scrollYProgress, [0, 0.5], [0, 8]);

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
          style={{ 
            filter: `blur(${heroBlur.get()}px)`,
          }}
          className="w-full h-full"
        >
          {heroContent}
        </motion.div>
      </motion.div>

      {/* About Section with SVG Mask */}
      <div className="fixed inset-0 pointer-events-none">
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ pointerEvents: 'none' }}
        >
          <defs>
            <mask id="iris-mask">
              <rect width="100%" height="100%" fill="black" />
              <motion.circle
                cx="50%"
                cy="50%"
                r={circleRadius}
                fill="white"
              />
            </mask>
          </defs>
        </svg>
        
        <div 
          className="w-full h-screen"
          style={{ mask: 'url(#iris-mask)', WebkitMask: 'url(#iris-mask)' }}
        >
          {aboutContent}
        </div>
      </div>
    </div>
  );
}

export default IrisWipeTransition;

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import backgroundAbout from '../assets/background_about.png';

/**
 * Constantinos Haritos Inspired Flood Transition
 * 
 * Features:
 * - Scroll-driven liquid flood effect
 * - Organic wavy clip-path
 * - Seamless texture integration
 */

const ScrollFloodTransition = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the transition area
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transform scroll progress into clip-path values
  // We create a wavy bottom-to-top flood
  // 0% scroll: polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)
  // 100% scroll: polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)
  
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.45],
    [
      "polygon(0% 100%, 50% 100%, 100% 100%, 100% 100%, 0% 100%)",
      "polygon(0% 0%, 50% -5%, 100% 0%, 100% 100%, 0% 100%)"
    ]
  );

  // Once it covers the screen (around 0.5), we can start fading it out
  // to reveal the actual section beneath, or just keep it as background.
  // But since DesignPhilosophy is z-50, it will appear above it anyway.
  // We'll fade out the overlay at the end of the transition area to be clean.
  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  return (
    <div ref={containerRef} className="relative h-[150vh] w-full pointer-events-none">
      {/* The Flood Layer */}
      <motion.div
        style={{ clipPath, opacity }}
        className="fixed inset-0 z-40 h-screen w-full bg-[#2c353c]"
      >
        {/* Texture Layer */}
        <div 
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage: `url(${backgroundAbout})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mixBlendMode: 'overlay'
          }}
        />
        
        {/* Grain Overlay for cohesion */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </motion.div>
    </div>
  );
};

export default ScrollFloodTransition;

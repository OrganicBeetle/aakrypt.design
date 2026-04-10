import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Constantinos Haritos: Flood Effect Page Transition
 * 
 * Features:
 * - Seamless liquid "flood" transition between sections
 * - SVG path manipulation for organic wave motion
 * - Scroll-triggered synchronization
 */

interface FloodTransitionProps {
  color?: string; // The color that will "flood" the screen
}

const FloodTransition = ({ color = "#000000" }: FloodTransitionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const path = pathRef.current;

    if (!container || !path) return;

    // Use pinning to ensure the flood takes over the screen during transition
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: 1.2,
      }
    });

    // 1. Initial Rise (Curves up from bottom)
    tl.to(path, {
      attr: { d: "M 0 100 Q 50 0 100 100 L 100 0 Q 50 0 0 0 Z" },
      ease: "power1.in"
    });

    // 2. Full Coverage (Becomes a solid block)
    tl.to(path, {
      attr: { d: "M 0 100 Q 50 100 100 100 L 100 0 Q 50 0 0 0 Z" },
      ease: "none"
    });

    // 3. Clear (Exits upward)
    tl.to(path, {
      attr: { d: "M 0 0 Q 50 0 100 0 L 100 0 Q 50 0 0 0 Z" },
      ease: "power1.out"
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative z-50 h-screen w-full pointer-events-none overflow-hidden"
    >
      <svg 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none" 
        className="h-full w-full"
      >
        <path
          ref={pathRef}
          d="M 0 100 Q 50 100 100 100 L 100 100 Q 50 100 0 100 Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export default FloodTransition;

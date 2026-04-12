import { useLayoutEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);

export const useNavAnimation = (activeId: string) => {
  const dotRef = useRef<SVGCircleElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<Record<string, number>>({});

  const updatePositions = useCallback(() => {
    if (!containerRef.current || !pathRef.current) return;

    const items = containerRef.current.querySelectorAll('[data-nav-id]');
    const containerWidth = containerRef.current.offsetWidth;
    const newPositions: Record<string, number> = {};

    items.forEach((item) => {
      const el = item as HTMLElement;
      const id = el.getAttribute('data-nav-id');
      if (id) {
        // Calculate center of item as a percentage (0 to 1) of the container
        const centerX = el.offsetLeft + el.offsetWidth / 2;
        newPositions[id] = centerX / containerWidth;
      }
    });

    setPositions(newPositions);
  }, []);

  useLayoutEffect(() => {
    updatePositions();
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  }, [updatePositions]);

  useLayoutEffect(() => {
    if (!dotRef.current || !pathRef.current || !positions[activeId]) return;

    const targetProgress = positions[activeId];

    // Initial set if first run
    if (!gsap.getProperty(dotRef.current, "motionPath")) {
      gsap.set(dotRef.current, {
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
          alignOrigin: [0.5, 0.5],
          start: targetProgress,
          end: targetProgress,
        },
      });
    }

    gsap.to(dotRef.current, {
      duration: 0.6,
      ease: 'power3.inOut',
      motionPath: {
        path: pathRef.current,
        align: pathRef.current,
        alignOrigin: [0.5, 0.5],
        start: (gsap.getProperty(dotRef.current, "motionPath") as any)?.progress ?? 0,
        end: targetProgress,
      },
    });
  }, [activeId, positions]);

  return { dotRef, pathRef, containerRef };
};

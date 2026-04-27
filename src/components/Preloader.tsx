import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

function Preloader() {
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    const seen = window.sessionStorage.getItem('aakarshita-preloader-seen')
    if (seen !== 'true') {
      setShouldRender(true)
      setIsMounted(true)
    }
  }, [])

  const text = "AAKARSHITA"
  const letters = text.split("")

  useEffect(() => {
    if (!isMounted || !shouldRender) return

    const overlay = overlayRef.current
    const container = containerRef.current
    if (!overlay || !container) return

    const ctx = gsap.context(() => {
      const chars = container.querySelectorAll('.preloader-char')
      
      // 1. Initial State - start hidden but ready
      gsap.set(chars, { 
        opacity: 0, 
        y: 30,
        rotateX: -90
      })

      const tl = gsap.timeline({
        onComplete: () => {
          // Final fallback to ensure site is revealed
          window.sessionStorage.setItem('aakarshita-preloader-seen', 'true')
          setShouldRender(false)
        }
      })

      // 2. Staggered reveal of letters (0.8s)
      tl.to(chars, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
      })

      // 3. Loading "Breathing" - limited repetitions instead of infinite
      tl.to(chars, {
        opacity: 0.3,
        duration: 0.6,
        stagger: {
          each: 0.08,
          repeat: 2, // 2 pulses total (~2 seconds)
          yoyo: true
        },
        ease: "power1.inOut"
      })

      // 4. Exit Animation - triggered immediately after pulses
      tl.to(chars, {
        opacity: 0,
        y: -40,
        stagger: 0.04,
        duration: 0.6,
        ease: "power4.in"
      }, "+=0.2")
      .to(overlay, {
        yPercent: -100,
        duration: 1.1,
        ease: [0.76, 0, 0.24, 1] 
      }, "-=0.3")

    }, overlay)

    return () => ctx.revert()
  }, [isMounted, shouldRender])

  if (!shouldRender) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#F1F0EE] opacity-100 paper-surface"
      style={{ backgroundColor: '#F1F0EE' }}
    >
      <div 
        ref={containerRef} 
        className="flex overflow-visible"
        style={{ perspective: '1000px' }}
      >
        {letters.map((char, i) => (
          <span
            key={i}
            className="preloader-char inline-block font-display text-[8vw] md:text-[5rem] font-medium uppercase tracking-[0.05em] text-[#2C353C]"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Preloader

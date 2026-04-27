import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

function Preloader() {
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const monogramRef = useRef<HTMLSpanElement | null>(null)
  const [isMounted, setIsMounted] = useState(() => {
    if (typeof window === 'undefined') {
      return true
    }

    return window.sessionStorage.getItem('aakarshita-preloader-seen') !== 'true'
  })

  useLayoutEffect(() => {
    if (!isMounted) {
      return
    }

    const overlay = overlayRef.current
    const monogram = monogramRef.current

    if (!overlay || !monogram) {
      return
    }

    const context = gsap.context(() => {
      gsap.set(monogram, { autoAlpha: 0, y: 18 })

      const timeline = gsap.timeline()

      timeline.to(monogram, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
      timeline.to(
        overlay,
        {
          yPercent: -100,
          duration: 1,
          ease: 'power4.inOut',
          onComplete: () => {
            window.sessionStorage.setItem('aakarshita-preloader-seen', 'true')
            setIsMounted(false)
          },
        },
        1.8,
      )
    }, overlay)

    return () => {
      context.revert()
    }
  }, [isMounted])

  if (!isMounted) {
    return null
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-paper opacity-100 paper-surface"
    >
      <span
        ref={monogramRef}
        className="font-display text-[4rem] font-medium uppercase tracking-[0.18em] text-charcoal"
      >
        AS
      </span>
    </div>
  )
}

export default Preloader

import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import heroBackground from '../assets/background.png'
import skeletonElement from '../assets/skeleton-bgremoved.png'
import InteractiveSkeleton from '../components/InteractiveSkeleton'

function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current

    if (!section) {
      return
    }

    const introItems = Array.from(
      section.querySelectorAll<HTMLElement>('[data-hero-intro]'),
    )
    const navItems = Array.from(
      document.querySelectorAll<HTMLElement>('[data-nav-link]'),
    )
    const heroImage = section.querySelector<HTMLElement>('[data-hero-image]')

    const context = gsap.context(() => {
      gsap.set(introItems, { autoAlpha: 0, y: 24 })
      gsap.set(navItems, { autoAlpha: 0, y: -18 })
      gsap.set(heroImage, { autoAlpha: 0, y: 28, scale: 0.96 })

      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })

      timeline.to(navItems, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.05,
      })
      timeline.to(
        heroImage,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1,
        },
        '-=0.2',
      )
      timeline.to(
        introItems,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.08,
        },
        '-=0.45',
      )
    }, section)

    return () => {
      context.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative isolate min-h-screen overflow-hidden bg-paper text-charcoal"
    >
      <img
        src={heroBackground}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="portfolio-side-text" aria-hidden="true">
        PORTFOLIO
      </div>

      <div className="relative z-10 min-h-screen w-full">
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            data-hero-image
            className="h-[75vh] w-[60vw] min-w-[320px] max-w-[850px]"
          >
            <InteractiveSkeleton
              imageUrl={skeletonElement}
              className="h-full w-full"
              particleDensity={0.55}
              repelRadius={130}
              repelStrength={85}
              displayWidth={520}
            />
          </div>
        </div>

        <div className="absolute bottom-2 left-2 z-20 max-w-xl sm:bottom-3 sm:left-3 md:bottom-4 md:left-4 lg:bottom-4 lg:left-4">
          <p
            data-hero-intro
            className="p-2.5 font-seasons text-[23px] leading-none text-black/82 sm:text-[21px]"
          >
            Hi, this is
          </p>
          <h1
            data-hero-intro
            className="mt-1 font-anton text-[11.6vw] leading-[0.8] tracking-[-0.03em] text-black sm:text-[5.7rem] lg:text-[6.8rem]"
          >
            Aakarshita
          </h1>
        </div>
      </div>
    </section>
  )
}

export default Hero

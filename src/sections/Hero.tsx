import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/all'
import skeletonElement from '../assets/skeleton-bgremoved.png'
import InteractiveSkeleton from '../components/InteractiveSkeleton'

gsap.registerPlugin(Draggable)

function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const floatOneRef = useRef<HTMLDivElement>(null)
  const floatTwoRef = useRef<HTMLDivElement>(null)
  const textWrapperRef = useRef<HTMLDivElement>(null)

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
    const heroImages = Array.from(
      section.querySelectorAll<HTMLElement>('[data-hero-image]'),
    )

    const context = gsap.context(() => {
      // 1. Initial Setup
      gsap.set(introItems, { autoAlpha: 0, y: 24 })
      gsap.set(navItems, { autoAlpha: 0, y: -18 })
      
      // Start positions for floaters
      gsap.set(floatOneRef.current, { x: 50, y: 50 })
      gsap.set(floatTwoRef.current, { 
        x: window.innerWidth - 450, 
        y: window.innerHeight - 450 
      })
      
      // Hide all images initially
      gsap.set(heroImages, { autoAlpha: 0, y: 30 })

      const introTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } })

      introTimeline.to(navItems, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.05,
      })
      
      // Animate skeletons while respecting their intended opacity (0.5 for floaters)
      introTimeline.to(
        heroImages,
        {
          opacity: (_i, target) => {
            if (target === floatOneRef.current || target === floatTwoRef.current) {
              return 0.5;
            }
            return 1;
          },
          visibility: 'visible',
          y: 0,
          duration: 1,
          stagger: 0.1
        },
        '-=0.2',
      )

      introTimeline.to(
        introItems,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.08,
        },
        '-=0.45',
      )

      // 2. Parallax Logic
      // Skeletons (Foreground) - move slower than scroll for depth
      gsap.to(".skeleton-parallax", {
        y: -120,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Hero Text (Mid layer) - slight upward movement
      gsap.to(textWrapperRef.current, {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // 3. Wandering & Draggable Logic
      const setupSkeleton = (el: HTMLElement | null, delay = 0) => {
        if (!el) return;

        let currentTween: gsap.core.Tween | null = null;

        const move = () => {
          const maxX = window.innerWidth - el.offsetWidth * 0.5;
          const maxY = window.innerHeight - el.offsetHeight * 0.5;

          currentTween = gsap.to(el, {
            x: gsap.utils.random(0, maxX), 
            y: gsap.utils.random(0, maxY),
            duration: gsap.utils.random(15, 25), 
            ease: "sine.inOut",
            onComplete: move
          });
        };

        gsap.delayedCall(delay, move);

        Draggable.create(el, {
          type: "x,y",
          edgeResistance: 0.65,
          bounds: section,
          inertia: true,
          onPress: function() {
            if (currentTween) currentTween.kill();
            gsap.set(this.target, { cursor: 'grabbing', zIndex: 100 });
          },
          onDrag: function() {
            // Force custom cursor to update by dispatching mousemove
            window.dispatchEvent(new MouseEvent('mousemove', {
              clientX: this.pointerX,
              clientY: this.pointerY,
              bubbles: true
            }));
          },
          onRelease: function() {
            gsap.set(this.target, { cursor: 'grab', zIndex: 20 });
            move();
          }
        });
      };

      setupSkeleton(floatOneRef.current, 1.2);
      setupSkeleton(floatTwoRef.current, 1.5);

    }, section)

    return () => {
      context.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative isolate min-h-screen overflow-hidden text-chalk"
    >
      <div className="relative z-10 min-h-screen w-full">
        {/* 2. Interactive Canvas (Behind skeletons and text) */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-auto">
          <div
            data-hero-image
            className="h-[75vh] w-[60vw] min-w-[320px] max-w-[850px]"
          >
            <InteractiveSkeleton
              imageUrl={skeletonElement}
              className="h-full w-full"
              particleDensity={0.4}
              repelRadius={120}
              repelStrength={80}
              displayWidth={520}
            />
          </div>
        </div>

        {/* 3. Floating Skeletons Wrapper for Parallax (Above canvas, below text) */}
        <div className="skeleton-parallax absolute inset-0 pointer-events-none z-20">
          <div 
            ref={floatOneRef}
            data-hero-image
            className="absolute top-0 left-0 pointer-events-auto opacity-[0.5] cursor-grab"
            style={{ transform: 'scale(0.5)', transformOrigin: 'center center' }}
          >
            <img src={skeletonElement} alt="" className="w-[30vw] h-auto select-none pointer-events-none" />
          </div>

          <div 
            ref={floatTwoRef}
            data-hero-image
            className="absolute top-0 left-0 pointer-events-auto opacity-[0.5] cursor-grab"
            style={{ transform: 'scale(0.5)', transformOrigin: 'center center' }}
          >
            <img src={skeletonElement} alt="" className="w-[30vw] h-auto select-none pointer-events-none" />
          </div>
        </div>

        {/* 4. Hero Text Container (Topmost Hero Layer) */}
        <div 
          ref={textWrapperRef}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center pointer-events-none"
        >
          <div className="flex flex-col items-center translate-y-[-2vh] pointer-events-none">
            <p
              data-hero-intro
              className="font-script text-white opacity-90 tracking-[0.05em] mb-[-0.4em] pointer-events-auto"
              style={{ fontSize: 'clamp(40px, 2vw, 28px)' }}
            >
              Hi! I am
            </p>
            <h1
              data-hero-intro
              className="font-display leading-[1.4] tracking-[-0.02em] uppercase select-none py-2 pointer-events-auto"
              style={{ 
                fontSize: 'clamp(60px, 10vw, 140px)',
                color: '#c61212'
              }}
            >
              AAKARSHITA
            </h1>
          </div>
        </div>

        {/* Footer Text */}
        <div className="absolute bottom-6 left-6 z-40">
          <p
            data-hero-intro
            className="font-script text-white opacity-70 text-[14px] sm:text-[16px] tracking-wide"
          >
            Fashion Design Portfolio
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero

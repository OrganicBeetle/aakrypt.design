import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import createPlaceholderImage from '../utils/placeholderImage'

gsap.registerPlugin(ScrollTrigger)

interface ProcessStep {
  number: string
  title: string
  description: string
}

const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Research & Reference',
    description:
      'Every collection begins with obsessive reference-gathering. Architecture, film stills, street photography, historical costume.',
  },
  {
    number: '02',
    title: 'Sketching & Ideation',
    description:
      'Hundreds of rough sketches. No editing at this stage - only volume and velocity of ideas.',
  },
  {
    number: '03',
    title: 'Fabric & Material',
    description:
      'Draping on the stand. Feeling how fabric moves, resists, and reveals the body underneath.',
  },
  {
    number: '04',
    title: 'Construction',
    description:
      'Pattern making and toile building. Where the idea meets reality and is forced to negotiate.',
  },
  {
    number: '05',
    title: 'Refinement',
    description:
      'Editing ruthlessly. Removing everything that is not essential until only the idea remains.',
  },
]

function Process() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const processPlaceholder = createPlaceholderImage(560, 420, 'IMAGE')

  useLayoutEffect(() => {
    const section = sectionRef.current

    if (!section) {
      return
    }

    const steps = Array.from(section.querySelectorAll<HTMLElement>('[data-process-step]'))

    const context = gsap.context(() => {
      steps.forEach((step) => {
        const number = step.querySelector<HTMLElement>('[data-process-number]')
        const title = step.querySelector<HTMLElement>('[data-process-title]')
        const description = step.querySelector<HTMLElement>('[data-process-description]')
        const rule = step.querySelector<HTMLElement>('[data-process-rule]')
        const image = step.querySelector<HTMLElement>('[data-process-image]')

        gsap.set([title, description, image], { autoAlpha: 0 })
        gsap.set(title, { x: -60 })
        gsap.set(description, { y: 24 })
        gsap.set(image, { x: 80 })
        gsap.set(rule, { width: 0 })
        gsap.set(number, { autoAlpha: 0.25 })

        const timeline = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: step,
            start: 'top top',
            end: '+=85%',
            pin: true,
            scrub: 0.45,
            pinSpacing: true,
            invalidateOnRefresh: true,
          },
        })

        timeline.to(number, { autoAlpha: 0.45, duration: 0.2 }, 0)
        timeline.to(title, { autoAlpha: 1, x: 0, duration: 0.7 }, 0.12)
        timeline.to(rule, { width: 120, duration: 0.5 }, 0.28)
        timeline.to(description, { autoAlpha: 1, y: 0, duration: 0.65 }, 0.36)
        timeline.to(image, { autoAlpha: 1, x: 0, duration: 0.75 }, 0.18)
      })
    }, section)

    return () => {
      context.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} id="process" className="bg-ink text-chalk">
      <div className="px-6 pt-20 sm:px-10 sm:pt-24 lg:px-14 lg:pt-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-accent">
            004 - PROCESS
          </p>
        </div>
      </div>

      {processSteps.map((step) => (
        <article
          key={step.number}
          data-process-step
          className="relative flex min-h-screen items-center overflow-hidden px-6 py-16 sm:px-10 lg:px-14"
        >
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
            <span
              data-process-number
              className="font-heading text-[24vw] leading-none text-[#1A1A1A] sm:text-[20vw] lg:text-[15vw]"
            >
              {step.number}
            </span>
          </div>

          <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[minmax(0,1fr)_560px] lg:items-center lg:gap-16">
            <div className="max-w-2xl">
              <h2
                data-process-title
                className="font-heading text-[12vw] font-light leading-[0.94] text-chalk sm:text-[8vw] lg:text-[4vw]"
              >
                {step.title}
              </h2>

              <div
                data-process-rule
                className="mt-6 h-px bg-accent"
                style={{ width: 0 }}
              />

              <p
                data-process-description
                className="mt-7 max-w-xl text-[15px] leading-[1.8] text-mist"
              >
                {step.description}
              </p>
            </div>

            <img
              data-process-image
              src={processPlaceholder}
              alt={`Placeholder for ${step.title}`}
              loading="lazy"
              className="h-[320px] w-full bg-ash object-cover sm:h-[380px] lg:h-[420px] lg:w-[560px]"
            />
          </div>
        </article>
      ))}
    </section>
  )
}

export default Process

import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Splitting from 'splitting'
import createPlaceholderImage from '../utils/placeholderImage'

gsap.registerPlugin(ScrollTrigger)

const paragraphs = [
  'I am Aakarshita Sharma, a fashion designer specialising in ready-to-wear and avant-garde experimental design. My work lives at the intersection of the wearable and the unwearable.',
  'Trained in [Your Institute - placeholder], I approach each collection as a question rather than an answer - probing material, silhouette, and cultural tension to find something that has not been seen before.',
  'When I am not designing, I am sketching, researching subcultures, and pulling references from architecture, philosophy, and the street.',
]

const stats = [
  { value: '[X]', label: 'Collections' },
  { value: '[X]', label: 'Years of Study' },
]

function About() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const photoPlaceholder = createPlaceholderImage(400, 520, 'PHOTO')

  useLayoutEffect(() => {
    const section = sectionRef.current

    if (!section) {
      return
    }

    const results = Splitting({
      target: section.querySelectorAll('[data-about-heading]'),
      by: 'words',
    }) as Array<{ words?: HTMLElement[] }>
    const headingWords = results.flatMap(
      (result: { words?: HTMLElement[] }) => result.words ?? [],
    )
    const revealItems = Array.from(
      section.querySelectorAll<HTMLElement>('[data-about-item]'),
    )

    const context = gsap.context(() => {
      gsap.set(headingWords, { autoAlpha: 0, y: 28 })
      gsap.set(revealItems, { autoAlpha: 0, y: 32 })

      const timeline = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: section.querySelector('[data-about-content]'),
          start: 'top 72%',
          once: true,
        },
      })

      timeline.to(headingWords, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
      })
      timeline.to(
        revealItems,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
        },
        '-=0.4',
      )
    }, section)

    return () => {
      context.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-ink px-6 py-20 text-chalk sm:px-10 sm:py-24 lg:px-14 lg:py-32"
    >
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[minmax(280px,400px)_minmax(0,1fr)] lg:gap-20">
        <div className="lg:min-h-[140vh]">
          <div className="lg:sticky lg:top-28">
            <img
              src={photoPlaceholder}
              alt="Placeholder portrait"
              loading="lazy"
              className="h-[520px] w-full max-w-[400px] border border-[#2a2a2a] bg-ash object-cover"
            />
            <p className="mt-10 text-[10px] uppercase tracking-[0.25em] text-mist">
              Aakarshita Sharma
            </p>
          </div>
        </div>

        <div
          data-about-content
          className="max-w-3xl pt-2 lg:pt-12"
        >
          <p
            data-about-item
            className="text-[11px] uppercase tracking-[0.3em] text-accent"
          >
            001 - ABOUT
          </p>

          <h2
            data-about-heading
            className="about-heading mt-6 max-w-4xl font-heading text-[11vw] font-light leading-[0.92] text-chalk sm:text-[8vw] lg:text-[4vw]"
          >
            Designing at the boundary of structure and instinct.
          </h2>

          <div className="mt-10 space-y-7">
            {paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                data-about-item
                className="max-w-2xl text-[15px] leading-[1.8] text-mist"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {stats.map((stat) => (
              <div key={stat.label} data-about-item>
                <p className="font-heading text-6xl font-semibold italic leading-none text-accent sm:text-7xl">
                  {stat.value}
                </p>
                <p className="mt-3 text-[11px] uppercase tracking-[0.25em] text-mist">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

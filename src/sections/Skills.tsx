import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Splitting from 'splitting'

gsap.registerPlugin(ScrollTrigger)

interface SkillItem {
  name: string
  proficiency: number
}

interface SkillGroup {
  title: string
  skills: SkillItem[]
}

const skillGroups: SkillGroup[] = [
  {
    title: 'Design',
    skills: [
      { name: 'Draping', proficiency: 92 },
      { name: 'Pattern Making', proficiency: 90 },
      { name: 'Garment Construction', proficiency: 94 },
      { name: 'Illustration', proficiency: 86 },
      { name: 'Mood-boarding', proficiency: 88 },
      { name: 'Collection Development', proficiency: 96 },
    ],
  },
  {
    title: 'Software',
    skills: [
      { name: 'Adobe Illustrator', proficiency: 94 },
      { name: 'Photoshop', proficiency: 89 },
      { name: 'CLO 3D', proficiency: 83 },
      { name: 'InDesign', proficiency: 79 },
      { name: 'Procreate', proficiency: 87 },
      { name: 'Figma', proficiency: 76 },
    ],
  },
  {
    title: 'Research',
    skills: [
      { name: 'Trend Forecasting', proficiency: 91 },
      { name: 'Fabric Sourcing', proficiency: 84 },
      { name: 'Cultural Research', proficiency: 95 },
      { name: 'Editorial Styling', proficiency: 81 },
      { name: 'Consumer Insight', proficiency: 78 },
    ],
  },
]

function Skills() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current

    if (!section) {
      return
    }

    const quoteResults = Splitting({
      target: section.querySelectorAll('[data-skills-quote]'),
      by: 'words',
    }) as Array<{ words?: HTMLElement[] }>
    const quoteWords = quoteResults.flatMap(
      (result: { words?: HTMLElement[] }) => result.words ?? [],
    )
    const skillRows = Array.from(
      section.querySelectorAll<HTMLElement>('[data-skill-row]'),
    )
    const bars = Array.from(
      section.querySelectorAll<HTMLElement>('[data-skill-bar]'),
    )

    const context = gsap.context(() => {
      gsap.set(quoteWords, { autoAlpha: 0, y: 24 })
      gsap.set(skillRows, { autoAlpha: 0, y: 20 })
      gsap.set(bars, { width: '0%' })

      const quoteTimeline = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: section.querySelector('[data-skills-quote-wrap]'),
          start: 'top 75%',
          once: true,
        },
      })

      quoteTimeline.to(quoteWords, {
        autoAlpha: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.08,
      })

      skillRows.forEach((row) => {
        const bar = row.querySelector<HTMLElement>('[data-skill-bar]')
        const proficiency = bar?.dataset.value ?? '0'

        const rowTimeline = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: row,
            start: 'top 88%',
            once: true,
          },
        })

        rowTimeline.to(row, {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
        })
        rowTimeline.to(
          bar,
          {
            width: `${proficiency}%`,
            duration: 0.8,
          },
          '-=0.25',
        )
      })
    }, section)

    return () => {
      context.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="bg-ink px-6 py-20 text-chalk sm:px-10 sm:py-24 lg:px-14 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <p className="text-[11px] uppercase tracking-[0.3em] text-accent">
          003 - SKILLS &amp; TOOLS
        </p>

        <div data-skills-quote-wrap className="mt-8 max-w-5xl lg:mt-10">
          <h2
            data-skills-quote
            className="skills-quote font-heading text-[12vw] font-light italic leading-[0.95] text-chalk sm:text-[7.8vw] lg:text-[3.5vw]"
          >
            Craft is not a limitation. It is a language.
          </h2>
        </div>

        <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-3 lg:gap-12">
          {skillGroups.map((group) => (
            <div key={group.title}>
              <h3 className="font-heading text-[2rem] font-light italic text-accent">
                {group.title}
              </h3>

              <div className="mt-8 space-y-6">
                {group.skills.map((skill) => (
                  <div key={skill.name} data-skill-row>
                    <div className="flex items-center gap-4">
                      <span className="shrink-0 text-[14px] text-chalk">
                        {skill.name}
                      </span>
                      <div className="relative h-px flex-1 overflow-hidden bg-[#2a2a2a]">
                        <span
                          data-skill-bar
                          data-value={skill.proficiency}
                          className="absolute left-0 top-0 h-full bg-accent"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills

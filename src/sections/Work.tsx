import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import createPlaceholderImage from '../utils/placeholderImage'

gsap.registerPlugin(ScrollTrigger)

export interface Project {
  id: number
  title: string
  category: string
  year: string
  coverImage: string
  description: string
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Collection One',
    category: 'Ready-to-wear',
    year: '2024',
    coverImage: createPlaceholderImage(420, 560, 'IMAGE', '#1E1E1E'),
    description:
      'A placeholder description for the first collection, balancing clean structure with a refined editorial mood.',
  },
  {
    id: 2,
    title: 'Untitled No. 2',
    category: 'Avant-garde',
    year: '2023',
    coverImage: createPlaceholderImage(420, 560, 'IMAGE', '#1E1E1E'),
    description:
      'A placeholder description for an avant-garde body of work exploring silhouette, tension, and staged restraint.',
  },
  {
    id: 3,
    title: 'Deconstruct',
    category: 'Experimental',
    year: '2023',
    coverImage: createPlaceholderImage(420, 560, 'IMAGE', '#1E1E1E'),
    description:
      'A placeholder description for an experimental project driven by texture, fragmentation, and material contrast.',
  },
]

function Work() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current

    if (!section) {
      return
    }

    const track = section.querySelector<HTMLElement>('[data-work-track]')
    const list = section.querySelector<HTMLElement>('[data-work-list]')

    if (!track || !list) {
      return
    }

    const context = gsap.context(() => {
      const media = gsap.matchMedia()

      media.add('(min-width: 1024px)', () => {
        const getDistance = () => Math.max(0, list.scrollWidth - track.offsetWidth)

        gsap.set(list, { x: 0 })

        const tween = gsap.to(list, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${getDistance() + window.innerHeight * 0.45}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })

        return () => {
          tween.scrollTrigger?.kill()
          tween.kill()
          gsap.set(list, { clearProps: 'transform' })
        }
      })

      return () => {
        media.revert()
      }
    }, section)

    return () => {
      context.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="work"
      className="overflow-hidden bg-ink px-6 py-20 text-chalk sm:px-10 sm:py-24 lg:px-14 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <p className="text-[16px] uppercase tracking-[0.3em] text-accent">
          002 - WORK
        </p>
      </div>

      <div
        data-work-track
        className="mx-auto mt-12 max-w-7xl overflow-visible lg:mt-16"
      >
        <div
          data-work-list
          className="flex flex-col gap-8 lg:w-max lg:flex-row lg:gap-10"
        >
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/work/${project.id}`}
              data-cursor="VIEW"
              className="work-card group relative flex h-[560px] w-full overflow-hidden border border-transparent bg-ash transition-colors duration-300 lg:w-[420px]"
            >
              <div className="absolute inset-0 border-l border-transparent transition-colors duration-300 group-hover:border-accent" />

              <img
                src={project.coverImage}
                alt={`Placeholder for ${project.title}`}
                loading="lazy"
                className="h-full w-full bg-[#1E1E1E] object-cover"
              />

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgba(10,10,10,0.94)] via-[rgba(10,10,10,0.68)] to-transparent px-7 pb-8 pt-16">
                <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-mist">
                  {project.category} / {project.year}
                </p>
                <h3 className="work-card-title font-heading text-[2.5rem] font-light leading-[0.95] text-chalk transition-transform duration-300">
                  {project.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Work

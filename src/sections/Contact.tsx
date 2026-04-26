import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const links = [
  { label: 'Email', href: 'mailto:hello@aakarshita.com' },
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn', href: '#' },
]

function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current

    if (!section) {
      return
    }

    const lines = Array.from(
      section.querySelectorAll<HTMLElement>('[data-contact-line]'),
    )
    const links = Array.from(
      section.querySelectorAll<HTMLElement>('[data-contact-link]'),
    )

    const context = gsap.context(() => {
      gsap.set(lines, { autoAlpha: 0, y: 48 })
      gsap.set(links, { autoAlpha: 0, y: 18 })

      const timeline = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: section,
          start: 'top 72%',
          once: true,
        },
      })

      timeline.to(lines, {
        autoAlpha: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.15,
      })
      timeline.to(
        links,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.2,
        },
        '-=0.15',
      )
    }, section)

    return () => {
      context.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative flex min-h-screen flex-col justify-between overflow-hidden px-6 py-20 text-chalk sm:px-10 sm:py-24 lg:px-14 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <span className="font-heading text-[22vw] font-light leading-none text-[#111111] sm:text-[20vw] lg:text-[18vw]">
          CONTACT
        </span>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <p className="text-[11px] uppercase tracking-[0.3em] text-accent">
          005 - CONTACT
        </p>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center text-center">
        <div className="max-w-5xl">
          <h2
            data-contact-line
            className="font-heading text-[13vw] font-light leading-[0.92] text-chalk sm:text-[9vw] lg:text-[6vw]"
          >
            Let&apos;s make
          </h2>
          <h3
            data-contact-line
            className="font-heading text-[13vw] font-light italic leading-[0.92] text-chalk sm:text-[9vw] lg:text-[6vw]"
          >
            something together.
          </h3>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-5 sm:mt-12">
          {links.map((link) => (
            <a
              key={link.label}
              data-contact-link
              href={link.href}
              className="contact-link relative pb-1 text-[12px] uppercase tracking-[0.2em] text-mist transition-colors duration-300 hover:text-chalk"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      </div>

      <footer className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-3 text-[11px] text-mist sm:flex-row sm:items-center sm:justify-between">
        <p>© 2025 Aakarshita Sharma - Designed &amp; Built with intention.</p>
        <p className="sm:text-right">Made in India</p>
      </footer>
    </section>
  )
}

export default Contact

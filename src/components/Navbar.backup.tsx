import { AnimatePresence, motion } from 'framer-motion'
import { useLayoutEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'About Me', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

const overlayVariants = {
  hidden: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useLayoutEffect(() => {
    const trigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        setIsScrolled(self.scroll() > 80)
      },
    })

    return () => {
      trigger.kill()
    }
  }, [])

  useLayoutEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = isMenuOpen ? 'hidden' : previousOverflow || ''

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isMenuOpen])

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
          isScrolled
            ? 'bg-paper/88 shadow-[0_8px_30px_rgba(44,53,60,0.08)] backdrop-blur-[8px]'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex w-full max-w-[1400px] items-start justify-end px-2 py-1 sm:px-3 sm:py-2 lg:px-4">
          <nav className="hidden items-center gap-8 md:flex md:translate-x-[57px] lg:gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                data-nav-link
                className="nav-link relative pb-1 font-montserrat text-[14px] uppercase tracking-[0.16em] text-charcoal/85 transition-colors duration-300 hover:text-charcoal lg:text-[15px]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            className="relative flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span
              className={`block h-px w-6 bg-chalk transition-transform duration-300 ${
                isMenuOpen ? 'translate-y-[6px] rotate-45 bg-charcoal' : 'bg-charcoal'
              }`}
            />
            <span
              className={`block h-px w-6 transition-opacity duration-300 ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              } bg-charcoal`}
            />
            <span
              className={`block h-px w-6 transition-transform duration-300 ${
                isMenuOpen ? '-translate-y-[6px] -rotate-45 bg-charcoal' : 'bg-charcoal'
              }`}
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            className="paper-surface fixed inset-0 z-40 flex min-h-screen items-center justify-center px-8 md:hidden"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.nav className="flex flex-col items-center gap-6 text-center">
              {navLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  variants={itemVariants}
                  className="font-display text-[12vw] font-medium uppercase leading-none tracking-[0.06em] text-charcoal sm:text-[9vw]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}

export default Navbar

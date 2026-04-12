import { AnimatePresence, motion } from 'framer-motion'
import { useLayoutEffect, useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'About Me', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-_\\/[]{}—=+*^?#_'

function ScrambleLink({ label, href, isScrolled, isDark }: { label: string; href: string; isScrolled: boolean; isDark: boolean }) {
  const [displayText, setDisplayText] = useState(label)
  const [isHovering, setIsHovering] = useState(false)
  const intervalRef = useRef<number | null>(null)
  const iterationRef = useRef(0)

  useEffect(() => {
    if (isHovering) {
      iterationRef.current = 0
      intervalRef.current = window.setInterval(() => {
        setDisplayText((_prev) =>
          label
            .split('')
            .map((_char, index) => {
              if (index < iterationRef.current) {
                return label[index]
              }
              return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
            })
            .join(''),
        )

        if (iterationRef.current >= label.length) {
          if (intervalRef.current) clearInterval(intervalRef.current)
        }

        iterationRef.current += 1 / 3
      }, 30)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
      setDisplayText(label)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isHovering, label])

  return (
    <a
      href={href}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`relative inline-block py-1 font-body text-[13px] uppercase tracking-[0.2em] transition-colors duration-300 lg:text-[14px] ${
        isDark 
          ? 'text-paper/90 hover:text-paper'
          : isScrolled ? 'text-charcoal' : 'text-charcoal/85 hover:text-charcoal'
      }`}
    >
      <span className="relative z-10 inline-block min-w-[80px] text-center md:text-left">
        {displayText}
      </span>
    </a>
  )
}

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
  const [isDark, setIsDark] = useState(false)
  const [isWorkSection, setIsWorkSection] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useLayoutEffect(() => {
    const scrollTrigger = ScrollTrigger.create({
      start: 20,
      onToggle: (self) => {
        setIsScrolled(self.isActive)
      },
    })

    const darkTrigger = ScrollTrigger.create({
      trigger: 'main',
      start: 'top -80%', 
      onToggle: (self) => {
        setIsDark(self.isActive)
      },
    })

    const workTrigger = ScrollTrigger.create({
      trigger: '#work',
      start: 'top 120px',
      end: 'bottom top',
      onToggle: (self) => {
        setIsWorkSection(self.isActive)
      },
    })

    return () => {
      scrollTrigger.kill()
      darkTrigger.kill()
      workTrigger.kill()
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
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ease-in-out ${
          isWorkSection
            ? 'border-b border-white/5 bg-[#585757]/80 py-2 backdrop-blur-md'
            : isScrolled
            ? isDark
              ? 'border-b border-white/5 bg-[#2c353c]/80 py-2 backdrop-blur-md'
              : 'border-b border-charcoal/5 bg-paper/75 py-2 backdrop-blur-md'
            : 'bg-transparent py-2 sm:py-3 lg:py-4'
        }`}
      >
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-end px-6 sm:px-8 lg:px-10">
          <nav className="hidden items-center gap-10 md:flex lg:gap-14">
            {navLinks.map((link, index) => (
              <div 
                key={link.label} 
                data-cursor="NAV"
                className={index === 1 ? 'md:-ml-5' : ''} 
              >
                <ScrambleLink
                  label={link.label}
                  href={link.href}
                  isScrolled={isScrolled}
                  isDark={isDark}
                />
              </div>
            ))}
          </nav>

          <button
            type="button"
            data-cursor="NAV"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            className="relative flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span
              className={`block h-px w-6 transition-transform duration-300 ${
                isDark ? 'bg-paper' : 'bg-charcoal'
              } ${isMenuOpen ? 'translate-y-[6px] rotate-45' : ''}`}
            />
            <span
              className={`block h-px w-6 transition-opacity duration-300 ${
                isDark ? 'bg-paper' : 'bg-charcoal'
              } ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}
            />
            <span
              className={`block h-px w-6 transition-transform duration-300 ${
                isDark ? 'bg-paper' : 'bg-charcoal'
              } ${isMenuOpen ? '-translate-y-[6px] -rotate-45' : ''}`}
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
                  className={`font-display text-[12vw] font-medium uppercase leading-none tracking-[0.06em] transition-colors duration-300 sm:text-[9vw] ${
                    isDark ? 'text-paper' : 'text-charcoal'
                  }`}
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

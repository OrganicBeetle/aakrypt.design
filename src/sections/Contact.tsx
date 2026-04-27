import React, { useRef, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, type Variants } from 'framer-motion'
import characterImg from '../assets/ContactMe/Character.png'

const Contact = () => {
  const [copyStatus, setCopyStatus] = useState(false)
  const phoneNumber = '7683900870'

  const links = [
    { label: 'Email', href: 'https://mail.google.com/mail/?view=cm&fs=1&to=aakrypt.design@gmail.com' },
    { label: 'Contact', href: `tel:${phoneNumber}`, isPhone: true },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/aakarshita-sharma-design' },
    { label: 'Resume', href: 'https://drive.google.com/file/d/1iS4okAb4rmtC6_KRhnsjwHUHZl2TO9G_/preview' },
    { label: 'Instagram', href: 'https://www.instagram.com/aakrypt?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' },
  ]

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault()
    navigator.clipboard.writeText(phoneNumber)
    setCopyStatus(true)
    setTimeout(() => setCopyStatus(false), 4000)
  }

  const sectionRef = useRef<HTMLElement>(null)
  
  // Base Motion Values for Mouse Tracking (kept for character rotation)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth springs for high-performance interaction
  const springConfig = { damping: 30, stiffness: 120 }
  const xSpring = useSpring(mouseX, springConfig)
  const ySpring = useSpring(mouseY, springConfig)

  // Character Rotation - Fixed in place, only rotating towards cursor
  const characterRotateY = useTransform(xSpring, [-0.5, 0.5], [-15, 15])
  const characterRotateX = useTransform(ySpring, [-0.5, 0.5], [10, -10])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const title = "LET'S TALK"
  const characters = Array.from(title)

  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  }

  const childVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.01,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      onMouseMove={handleMouseMove}
      className="relative flex h-screen w-full items-center overflow-hidden bg-transparent shadow-none backdrop-blur-0"
      style={{ background: 'transparent', backgroundColor: 'transparent', boxShadow: 'none', backdropFilter: 'none' }}
    >
      {/* Left Section (~60%) */}
      <div className="relative z-10 flex h-full w-[60%] flex-col justify-center items-center px-12 lg:px-24 text-center -mt-[15vh]">
        <div className="relative flex flex-col items-center justify-center gap-1 lg:gap-2">
          <motion.h2
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            className="!font-anton text-[calc(10vw-15px)] tracking-[1px] leading-[0.85] text-[#e50914] lg:text-[calc(12vw-15px)]"
          >
            {characters.map((char, index) => (
              <motion.span key={index} variants={childVariants} className="font-[inherit]">
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h2>

          <div className="relative">
            <motion.p
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              whileInView={{ clipPath: 'inset(0 0 0 0)' }}
              viewport={{ once: false }}
              transition={{
                duration: 1.5,
                delay: 1.4,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="font-homemade text-[3vw] leading-tight text-chalk lg:text-[3.25vw] -mt-8"
            >
              about working together, or your favorite tarot card
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 2.8 }}
            className="flex w-full max-w-2xl items-center justify-between font-mono text-[15px] tracking-[0.2em] text-chalk sm:text-[17px] mt-4 lg:mt-6"
          >
            {links.map((link, index) => (
              <React.Fragment key={link.label}>
                <div className="relative group">
                  {link.isPhone ? (
                    <button
                      onClick={handleContactClick}
                      className="relative py-1 opacity-70 transition-all duration-300 hover:opacity-100 uppercase cursor-pointer"
                    >
                      {link.label}
                      <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-chalk transition-all duration-300 group-hover:w-full" />
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative py-1 opacity-70 transition-all duration-300 hover:opacity-100 uppercase"
                    >
                      {link.label}
                      <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-chalk transition-all duration-300 group-hover:w-full" />
                    </a>
                  )}

                  <AnimatePresence>
                    {link.isPhone && copyStatus && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, x: '-50%' }}
                        animate={{ opacity: 1, y: -45, x: '-50%' }}
                        exit={{ opacity: 0, y: 0, x: '-50%' }}
                        className="absolute left-1/2 z-50 flex items-center gap-3 rounded-lg bg-black px-4 py-2 text-[12px] font-bold tracking-normal text-white shadow-2xl whitespace-nowrap"
                      >
                        <span className="flex items-center gap-2">
                          <svg className="h-3 w-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                          Number copied
                        </span>
                        <div className="h-3 w-[1px] bg-white/20" />
                        <a 
                          href={`tel:${phoneNumber}`}
                          className="text-[#ff4d4d] transition-colors hover:text-red-400 underline underline-offset-2"
                        >
                          Call Now
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {index < links.length - 1 && (
                  <span className="mx-2 opacity-30 text-stone">|</span>
                )}
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right Section (~40%) */}
      <div className="relative flex h-full w-[40%] items-end justify-end">
        <div className="relative h-full w-full" style={{ perspective: 1200 }}>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: '15%' }}
            viewport={{ once: false }}
            transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ 
              rotateY: characterRotateY, 
              rotateX: characterRotateX,
              transformStyle: "preserve-3d"
            }}
            className="absolute bottom-0 right-0 h-full w-full origin-bottom-right"
          >
            <motion.img
              src={characterImg}
              alt="Contact Character"
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                y: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.4, ease: "easeOut" }
              }}
              initial={{ rotate: -2, scale: 1 }}
              className="absolute bottom-0 right-0 h-[92%] max-w-none translate-x-[5%] translate-y-[2%] object-contain object-bottom"
              style={{ transformStyle: "preserve-3d" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact

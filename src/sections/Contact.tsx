import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, type Variants } from 'framer-motion'
import characterImg from '../assets/ContactMe/Character.png'

const Contact = () => {
  const links = [
    { label: 'Email', href: 'mailto:aakrypt.design@gmail.com' },
    { label: 'Contact', href: 'tel:7683900870' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/aakarshita-sharma-design' },
    { label: 'Resume', href: '/pdf/Etched_Denim Portfolio.pdf' },
    { label: 'Instagram', href: 'https://www.instagram.com/aakrypt?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' },
  ]

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
      <div className="relative z-10 flex h-full w-[60%] flex-col justify-center items-center px-12 lg:px-24 text-center">
        <div className="relative flex flex-col items-center">
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
              className="font-script -mt-[2vw] text-[3vw] leading-tight text-chalk lg:text-[2.25vw]"
            >
              about working together, or your favorite tarot card
            </motion.p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 2.8 }}
          className="mt-16 flex w-full max-w-2xl items-center justify-between font-mono text-[15px] tracking-[0.2em] text-chalk sm:text-[17px]"
        >
          {links.map((link, index) => (
            <React.Fragment key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative py-1 opacity-70 transition-all duration-300 hover:opacity-100"
              >
                {link.label.toUpperCase()}
                <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-chalk transition-all duration-300 group-hover:w-full" />
              </a>
              {index < links.length - 1 && (
                <span className="mx-2 opacity-30 text-stone">|</span>
              )}
            </React.Fragment>
          ))}
        </motion.div>
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

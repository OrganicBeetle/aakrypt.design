import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

function Cursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isInteractive, setIsInteractive] = useState(false)
  const [isFinePointer, setIsFinePointer] = useState(false)
  const [cursorLabel, setCursorLabel] = useState('')
  const [isClicked, setIsClicked] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const dotX = useSpring(cursorX, { damping: 20, stiffness: 1000, mass: 0.1 })
  const dotY = useSpring(cursorY, { damping: 20, stiffness: 1000, mass: 0.1 })
  const ringX = useSpring(cursorX, { damping: 30, stiffness: 400, mass: 0.5 })
  const ringY = useSpring(cursorY, { damping: 30, stiffness: 400, mass: 0.5 })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)')

    const handleMediaChange = () => {
      setIsFinePointer(mediaQuery.matches)
    }

    const handleMouseMove = (event: MouseEvent) => {
      cursorX.set(event.clientX)
      cursorY.set(event.clientY)
      setIsVisible(prev => {
        if (!prev) return true;
        return prev;
      });
    }

    const handlePointerOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      const interactiveTarget = target?.closest<HTMLElement>('a, button, [data-cursor]')
      const cursorTarget = target?.closest<HTMLElement>('[data-cursor]')

      setIsInteractive(Boolean(interactiveTarget))
      setCursorLabel(cursorTarget?.dataset.cursor ?? '')
    }

    const handlePointerOut = (event: MouseEvent) => {
      const relatedTarget = event.relatedTarget as HTMLElement | null
      const nextInteractive = relatedTarget?.closest<HTMLElement>('a, button, [data-cursor]')
      const nextCursorTarget = relatedTarget?.closest<HTMLElement>('[data-cursor]')

      if (!nextInteractive) {
        setIsInteractive(false)
      }

      setCursorLabel(nextCursorTarget?.dataset.cursor ?? '')
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
      setIsInteractive(false)
      setCursorLabel('')
    }

    const handleMouseDown = () => {
      setIsClicked(true)
    }

    const handleMouseUp = () => {
      setIsClicked(false)
    }

    handleMediaChange()

    mediaQuery.addEventListener('change', handleMediaChange)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseover', handlePointerOver)
    document.addEventListener('mouseout', handlePointerOut)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseover', handlePointerOver)
      document.removeEventListener('mouseout', handlePointerOut)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [cursorX, cursorY])

  if (!isFinePointer) {
    return null
  }

  const isCardHover = cursorLabel === 'CARD'
  const isNavHover = cursorLabel === 'NAV'

  return (
    <>
      <motion.div
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center rounded-full"
        style={{
          x: isCardHover ? ringX : dotX,
          y: isCardHover ? ringY : dotY,
          width: 12,
          height: 12,
          marginLeft: -6,
          marginTop: -6,
        }}
        initial={false}
        animate={{
          scale: isCardHover ? (isClicked ? 4 : 4.5) : isNavHover ? 0.4 : isClicked ? 0.75 : 1,
          opacity: isVisible ? (isNavHover ? 0.3 : 1) : 0,
          backgroundColor: isClicked ? '#bcc9cc' : '#2c353c',
          borderColor: 'rgba(44, 53, 60, 0.55)',
        }}
        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.span
          className="select-none text-[2px] font-medium uppercase leading-none tracking-[0.08em] text-white"
          initial={false}
          animate={{
            opacity: isCardHover ? 1 : 0,
            scale: isCardHover ? 1 : 0.8,
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          VIEW
        </motion.span>
      </motion.div>
      <motion.div
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border border-charcoal/70"
        style={{
          x: ringX,
          y: ringY,
          width: 40,
          height: 40,
          marginLeft: -20,
          marginTop: -20,
        }}
        initial={false}
        animate={{
          scale: isNavHover ? 0.8 : isCardHover ? 0.2 : isInteractive ? 0.65 : 1,
          opacity: isVisible 
            ? isNavHover 
              ? 0.15 
              : (isCardHover ? 0 : isInteractive ? 0.45 : 0.4) 
            : 0,
          backgroundColor: isInteractive
            ? 'rgba(188, 201, 204, 0.24)'
            : 'rgba(44, 53, 60, 0)',
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
      />
    </>
  )
}

export default Cursor

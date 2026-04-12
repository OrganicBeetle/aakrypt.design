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

  const dotX = useSpring(cursorX, { damping: 30, stiffness: 700, mass: 0.2 })
  const dotY = useSpring(cursorY, { damping: 30, stiffness: 700, mass: 0.2 })
  const ringX = useSpring(cursorX, { damping: 24, stiffness: 220, mass: 0.8 })
  const ringY = useSpring(cursorY, { damping: 24, stiffness: 220, mass: 0.8 })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)')

    const handleMediaChange = () => {
      setIsFinePointer(mediaQuery.matches)
    }

    const handleMouseMove = (event: MouseEvent) => {
      cursorX.set(event.clientX)
      cursorY.set(event.clientY)
      setIsVisible(true)
    }

    const handlePointerOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      const interactiveTarget = target?.closest<HTMLElement>('a, button')
      const cursorTarget = target?.closest<HTMLElement>('[data-cursor]')

      setIsInteractive(Boolean(interactiveTarget))
      setCursorLabel(cursorTarget?.dataset.cursor ?? '')
    }

    const handlePointerOut = (event: MouseEvent) => {
      const relatedTarget = event.relatedTarget as HTMLElement | null
      const nextInteractive = relatedTarget?.closest<HTMLElement>('a, button')
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

  const isLabeled = cursorLabel.length > 0
  const isNavHover = cursorLabel === 'NAV'

  return (
    <>
      <motion.div
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[9999] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          width: 12,
          height: 12,
          marginLeft: -6,
          marginTop: -6,
        }}
        initial={false}
        animate={{
          scale: isNavHover ? 0.4 : isLabeled ? 0.6 : isInteractive ? 2.5 : 1,
          opacity: isVisible ? (isNavHover ? 0.3 : 1) : 0,
          backgroundColor: isClicked ? '#bcc9cc' : '#2c353c',
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
      />
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
          scale: isNavHover ? 0.8 : isLabeled ? 1.8 : isInteractive ? 0.65 : 1,
          opacity: isVisible 
            ? isNavHover 
              ? 0.15 
              : (isInteractive || isLabeled ? 0.9 : 0.4) 
            : 0,
          backgroundColor: isInteractive
            ? isLabeled && !isNavHover
              ? 'rgba(44, 53, 60, 0.16)'
              : 'rgba(188, 201, 204, 0.24)'
            : 'rgba(44, 53, 60, 0)',
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
      >
        {!isNavHover && (
          <span className="flex h-full w-full items-center justify-center text-[10px] uppercase tracking-[0.22em] text-charcoal">
            {cursorLabel}
          </span>
        )}
      </motion.div>
    </>
  )
}

export default Cursor

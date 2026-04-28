import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './Work.module.css'
import type { ProjectData } from './types'

interface Props {
  project: ProjectData | null
  isActive: boolean
  onClose: () => void
}

const PdfModal: React.FC<Props> = ({ project, isActive, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollPosRef = useRef(0)

  useEffect(() => {
    const lenis = (window as any).lenis
    
    if (isActive) {
      // Save current scroll position
      scrollPosRef.current = window.scrollY
      
      // Apply styles to lock background
      document.documentElement.classList.add('modal-open')
      document.body.classList.add('modal-open')
      
      // Use fixed positioning with negative top to stay at same spot
      // without allowing scrolling
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollPosRef.current}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
      
      if (lenis) {
        lenis.stop()
      }
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleEsc)

    return () => {
      window.removeEventListener('keydown', handleEsc)
      
      if (isActive) {
        // Restore background
        document.documentElement.classList.remove('modal-open')
        document.body.classList.remove('modal-open')
        
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        document.body.style.overflow = ''
        
        if (lenis) {
          lenis.start()
        }
        
        // Restore scroll position
        window.scrollTo(0, scrollPosRef.current)
      }
    }
  }, [isActive, onClose])

  useEffect(() => {
    if (!isActive || !containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current,
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out"
        }
      )
    })

    return () => ctx.revert()
  }, [isActive])

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose()
    }
  }

  if (!project || !isActive) return null

  return (
    <div
      ref={overlayRef}
      className={styles.pdfOverlay}
      onClick={handleOverlayClick}
      data-lenis-prevent
    >
      <div 
        ref={containerRef} 
        className={styles.pdfContainer}
        data-lenis-prevent
      >
        <div className={styles.pdfHeader}>
          <h2 className={styles.pdfTitle}>{project.title}</h2>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className={styles.pdfViewer} data-lenis-prevent>
          <iframe
            src={project.pdf}
            frameBorder="0"
            allowFullScreen
            title={`${project.title} PDF`}
          />
        </div>
      </div>
    </div>
  )
}

export default PdfModal

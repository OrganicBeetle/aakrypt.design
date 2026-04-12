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

  useEffect(() => {
    if (isActive) {
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }
    
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

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleEsc)

    return () => {
      window.removeEventListener('keydown', handleEsc)
      ctx.revert()
    }
  }, [isActive, onClose])

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
    >
      <div ref={containerRef} className={styles.pdfContainer}>
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
        <div className={styles.pdfViewer}>
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

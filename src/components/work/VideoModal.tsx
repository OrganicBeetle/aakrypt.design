import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './Work.module.css'
import type { ProjectData } from './types'

interface Props {
  project: ProjectData | null
  isActive: boolean
  originRect: DOMRect | null
  onClose: () => void
}

const VideoModal: React.FC<Props> = ({ project, isActive, originRect, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!isActive || !modalRef.current || !originRect) return

    const el = modalRef.current

    gsap.fromTo(el,
      {
        position: "fixed",
        top: originRect.top,
        left: originRect.left,
        width: originRect.width,
        height: originRect.height,
        borderRadius: "12px"
      },
      {
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        borderRadius: "0px",
        duration: 0.6,
        ease: "power3.inOut"
      }
    )

    videoRef.current?.play().catch(() => {})
  }, [isActive, originRect])

  const handleClose = () => {
    if (!modalRef.current || !originRect) return

    gsap.to(modalRef.current, {
      top: originRect.top,
      left: originRect.left,
      width: originRect.width,
      height: originRect.height,
      borderRadius: "12px",
      duration: 0.5,
      ease: "power3.inOut",
      onComplete: onClose
    })
  }

  if (!project) return null

  return (
    <div className={`${styles.modalOverlay} ${isActive ? styles.active : ''}`}>
      <div ref={modalRef} className={styles.modalVideoContainer} onClick={handleClose}>
        <video
          ref={videoRef}
          className={styles.modalVideo}
          src={project.video}
          muted
          loop
          playsInline
          autoPlay
        />
      </div>
    </div>
  )
}

export default VideoModal
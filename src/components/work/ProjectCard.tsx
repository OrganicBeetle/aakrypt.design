import React, { useRef } from 'react'
import styles from './Work.module.css'
import type { ProjectData } from './types'

interface Props {
  project: ProjectData
  onClick: (p: ProjectData) => void
}

const ProjectCard: React.FC<Props> = ({ project, onClick }) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleMouseEnter = () => {
    if (videoRef.current) {
      const playPromise = videoRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.log("Video play interaction handled:", err)
        })
      }
    }
  }

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  // Use the provided poster or a high-quality placeholder if none exists
  const posterUrl = project.poster || `https://placehold.co/600x800/121212/ffffff?text=${encodeURIComponent(project.title)}`

  return (
    <div
      className={`${styles.projectCard} ${styles[project.gridClass]}`}
      data-cursor="CARD"
      onClick={() => onClick(project)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.thumbWrapper}>
        <video
          ref={videoRef}
          className={styles.cardVideo}
          src={project.video}
          poster={posterUrl}
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className={styles.cardMeta}>
          <h3 className={styles.cardTitle}>{project.title}</h3>
          <span className={styles.cardIndex}>{project.index}</span>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
import React, { useRef, useState } from 'react'
import styles from './Work.module.css'
import type { ProjectData } from './types'

interface Props {
  project: ProjectData
  onClick: (p: ProjectData) => void
}

const ProjectCard: React.FC<Props> = ({ project, onClick }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [videoError, setVideoError] = useState(false)

  const handleMouseEnter = () => {
    if (!project.video || videoError) return
    
    setIsHovered(true)
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
    setIsHovered(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  const handleVideoError = () => {
    setVideoError(true)
    setIsHovered(false)
  }

  // Use the provided poster or a high-quality placeholder if none exists
  const posterUrl = project.poster || `https://placehold.co/600x800/121212/ffffff?text=${encodeURIComponent(project.title)}`

  const hasVideo = project.video && !videoError

  return (
    <div
      className={`${styles.projectCard} ${styles[project.gridClass]}`}
      data-cursor="CARD"
      onClick={() => onClick(project)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.thumbWrapper}>
        {/* Static Thumbnail Overlay */}
        <img 
          src={posterUrl} 
          alt={project.title}
          className={`${styles.cardVideo} absolute inset-0 z-10 transition-opacity duration-300 ${isHovered && hasVideo ? 'opacity-0' : 'opacity-100'}`}
        />
        
        {project.video && (
          <video
            ref={videoRef}
            className={styles.cardVideo}
            src={project.video}
            muted
            loop
            playsInline
            preload="auto"
            onError={handleVideoError}
          />
        )}
        <div className={styles.cardMeta}>
          <h3 className={styles.cardTitle}>{project.title}</h3>
          <span className={styles.cardIndex}>{project.index}</span>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
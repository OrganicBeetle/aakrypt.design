import React, { useRef } from 'react'
import styles from './Work.module.css'
import type { ProjectData } from './types'

interface Props {
  project: ProjectData
  onClick: (p: ProjectData) => void
}

const ProjectCard: React.FC<Props> = ({ project, onClick }) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <div
      className={`${styles.projectCard} ${styles[project.gridClass]}`}
      onClick={() => onClick(project)}
    >
      <div className={styles.thumbWrapper}>
        <video
          ref={videoRef}
          className={styles.cardVideo}
          src={project.video}
          muted
          loop
          playsInline
          autoPlay
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
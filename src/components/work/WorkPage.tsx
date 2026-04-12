import React, { useState, useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import ProjectCard from './ProjectCard'
import type { ProjectData } from './types'
import PdfModal from './PdfModal'
import GridLayout from './GridLayout'
import styles from './Work.module.css'

gsap.registerPlugin(ScrollTrigger)

const projects: ProjectData[] = [
  { title: "bag", video: "/videos/bag.mp4", pdf: "/pdfs/bag.pdf", index: "01/09", gridClass: "bag" },
  { title: "illustrations", video: "/videos/illustrations.mp4", pdf: "/pdfs/illustrations.pdf", index: "02/09", gridClass: "illustrations" },
  { title: "denim", video: "/videos/denim.mp4", pdf: "/pdfs/denim.pdf", index: "03/09", gridClass: "denim" },
  { title: "shirt", video: "/videos/shirt.mp4", pdf: "/pdfs/shirt.pdf", index: "04/09", gridClass: "shirt" },
  { title: "transform ii", video: "/videos/transform_ii.mp4", pdf: "/pdfs/transform_ii.pdf", index: "05/09", gridClass: "transform_ii" },
  { title: "transform i", video: "/videos/transform_i.mp4", pdf: "/pdfs/transform_i.pdf", index: "06/09", gridClass: "transform_i" },
  { title: "jacket", video: "/videos/jacket.mp4", pdf: "/pdfs/jacket.pdf", index: "07/09", gridClass: "jacket" },
  { title: "craft", video: "/videos/craft.mp4", pdf: "/pdfs/craft.pdf", index: "08/09", gridClass: "craft" },
  { title: "digital work", video: "/videos/digital_work.mp4", pdf: "/pdfs/digital_work.pdf", index: "09/09", gridClass: "digital_work" },
]

const WorkPage: React.FC = () => {
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!overlayRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(overlayRef.current, {
        y: "-100%",
        ease: "power2.inOut",
        duration: 1.5,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          once: true
        }
      })
    })

    return () => ctx.revert()
  }, [])

  const handleOpen = (project: ProjectData) => {
    setActiveProject(project)
  }

  const handleClose = () => {
    setActiveProject(null)
  }

  return (
    <div ref={containerRef} className={styles.workPage}>
      <div ref={overlayRef} className={styles.scrollOverlay} />

      <div className={styles.workLabel}>
        Projects
      </div>

      <GridLayout>
        {projects.map(p => (
          <ProjectCard
            key={p.title}
            project={p}
            onClick={handleOpen}
          />
        ))}
      </GridLayout>

      <PdfModal
        project={activeProject}
        isActive={activeProject !== null}
        onClose={handleClose}
      />
    </div>
  )
}

export default WorkPage
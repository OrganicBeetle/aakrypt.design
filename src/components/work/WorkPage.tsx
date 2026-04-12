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
  { 
    title: "Etched: Denim", 
    video: "/videos/denim.mp4", 
    poster: "/poster/denim_thumbnail.png",
    pdf: "https://drive.google.com/file/d/1bbR_sK_xz3qWEG45knMkvN1t-KDwrK0Y/preview", 
    index: "03/09", 
    gridClass: "denim" 
  },

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
  const labelRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Reveal Overlay Animation
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          y: "-100%",
          ease: "power2.inOut",
          duration: 1.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 95%", // Start very early as it enters
            once: true
          }
        })
      }

      // 2. Projects Label Animation (Snappy fade-in as it peeks from bottom)
      if (labelRef.current) {
        gsap.fromTo(labelRef.current, 
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            ease: "power1.out",
            scrollTrigger: {
              trigger: labelRef.current,
              start: "top 98%", // Start as soon as it peeks
              end: "top 85%",   // Finish quickly
              scrub: 0.3,
            }
          }
        )
      }

      // 3. Project Cards Staggered Fade-in (Short and snappy)
      const cards = containerRef.current?.querySelectorAll(`.${styles.projectCard}`)
      if (cards && cards.length > 0) {
        gsap.fromTo(cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%", // Trigger earlier as the section enters
              toggleActions: "play none none reverse"
            }
          }
        )
      }
    }, containerRef)

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

      <div ref={labelRef} className={styles.workLabel}>
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
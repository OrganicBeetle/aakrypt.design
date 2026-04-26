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
  { title: "bag", video: "/videos/bag.mp4", pdf: "https://drive.google.com/file/d/1x4EcWRPvyVobNbm9s7n-SH9QE5Fib2W8/preview", index: "01/07", gridClass: "bag" },
  { 
    title: "Etched: Denim", 
    video: "/videos/denim.mp4", 
    poster: "/poster/denim_thumbnail.png",
    pdf: "https://drive.google.com/file/d/1RpQKN-UK4SeZd_Ug7MIZ78hwO4sVOBGb/preview", 
    index: "02/07", 
    gridClass: "denim" 
  },

  { title: "shirt", video: "/videos/shirt.mp4", pdf: "/pdfs/shirt.pdf", index: "03/07", gridClass: "shirt" },
  { title: "transform ii", video: "/videos/transform_ii.mp4", pdf: "https://drive.google.com/file/d/1c1Od0CogjhFFXSZBDEgubbSF2xhUohT6/preview", index: "04/07", gridClass: "transform_ii" },
  { title: "jacket", video: "/videos/jacket.mp4", pdf: "https://drive.google.com/file/d/1q_HKSiQ0vWvMNmsulMtwd71xdT_bVR8t/preview", index: "05/07", gridClass: "jacket" },
  { title: "craft", video: "/videos/craft.mp4", pdf: "https://drive.google.com/file/d/11sZ2VIc9idH9w6I8znFmNvagyAXRTg5f/preview", index: "06/07", gridClass: "craft" },
  { title: "digital work", video: "/videos/digital_work.mp4", pdf: "/pdfs/digital_work.pdf", index: "07/07", gridClass: "digital_work" },
]

const WorkPage: React.FC = () => {
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
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

      // 3. Project Cards Entrance Animation (One by one as they enter view)
      const cards = containerRef.current?.querySelectorAll(`.${styles.projectCard}`)
      if (cards && cards.length > 0) {
        cards.forEach((card) => {
          // Entrance Animation
          gsap.fromTo(card,
            { 
              opacity: 0, 
              y: 100,
              scale: 0.9,
              rotateX: -15
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
              duration: 1.2,
              ease: "power4.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none reverse"
              }
            }
          );
        });
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
      <div ref={labelRef} className={styles.workLabel}>
        <div className="relative mb-2 select-none">
          {/* Overlay Script: MY */}
          <span 
            className="absolute -top-5 left-1 z-10 font-script text-[clamp(2rem,5vw,3.5rem)] text-white"
            style={{ transform: 'rotate(-45deg)', transformOrigin: 'bottom left' }}
          >
            My
          </span>
          
          {/* Main Display: PROJECTS */}
          <h2 className="relative z-0 font-extenda text-[clamp(50px,6.5vw,120px)] leading-[0.8] text-[#C61212] uppercase tracking-[0.002em]">
            Projects
          </h2>
        </div>
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
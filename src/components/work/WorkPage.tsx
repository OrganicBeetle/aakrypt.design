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
  { title: "FLUOROVISION: HANDBAG", 
    poster: "/poster/Fluorovision.png",
    video: "/videos/fluorovision.mp4", 
    pdf: "https://drive.google.com/file/d/1x4EcWRPvyVobNbm9s7n-SH9QE5Fib2W8/preview", 
    index: "01/09", 
    gridClass: "bag" },
  
  { title: "MYRIAD: TRANSFORM I", 
    video: "/videos/transform_ii.mp4",
    poster: "/poster/myriad.jpeg", 
    pdf: "https://drive.google.com/file/d/1c1Od0CogjhFFXSZBDEgubbSF2xhUohT6/preview", 
    index: "02/09", 
    gridClass: "top" },
  
  { 
    title: "ETCHED: DENIM [INDUSTRY PROJECT]", 
    video: "/videos/denim.mp4", 
    poster: "/poster/denim_thumbnail.png",
    pdf: "https://drive.google.com/file/d/1RpQKN-UK4SeZd_Ug7MIZ78hwO4sVOBGb/preview", 
    index: "03/09", 
    gridClass: "denim" 
  },

  { title: "AXIS: SHIRT [CLIENT PROJECT]",
    video: "/videos/shirt.mp4", 
    poster: "/poster/shirt-centre.jpeg",
    pdf: "/pdfs/shirt.pdf", 
    index: "04/09", 
    gridClass: "shirt" },
  
  { title: "MILAN DI KALA: TOP", 
    video: "/videos/top.mp4",
    pdf: "",
    poster: "/poster/milan-di-kala.jpeg",
    index: "05/09", 
    gridClass: "transform_ii" },
  
  { title: "EXTRAS", 
    video: "",
    pdf: "",
    index: "06/09", 
    gridClass: "right_transform" },
  
  { title: "SACRED WITHIN: JACKET", video: "/videos/jacket.mp4", pdf: "https://drive.google.com/file/d/1q_HKSiQ0vWvMNmsulMtwd71xdT_bVR8t/preview", index: "07/09", gridClass: "jacket" },

  { title: "VINAMR: CRAFT", 
    video: "/videos/craft.mp4",
    poster: "/poster/craft.png", 
    pdf: "https://drive.google.com/file/d/11sZ2VIc9idH9w6I8znFmNvagyAXRTg5f/preview", index: "08/09", gridClass: "craft" },
  
  { title: "NOIR NEXUS: PASSION PROJECT", video: "/videos/digital_work.mp4", 
    poster: "/poster/noir-nexus.jpeg",
    pdf: "https://drive.google.com/file/d/1CdW_r7YpccIAXCByTDjZcw3sgxtWD3KX/preview", index: "09/09", gridClass: "digital_work" },
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
            ease: "power2.out",
            scrollTrigger: {
              trigger: labelRef.current,
              start: "top 98%", 
              end: "top 92%",   
              scrub: true,
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
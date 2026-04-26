import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import notebookAsset from '../assets/SkillsPage/Notebook.png';
import evidenceBagAsset from '../assets/SkillsPage/evidence_bag.png';
import envelopeAsset from '../assets/SkillsPage/envelope.png';
import coffeeAsset from '../assets/SkillsPage/coffee.png';

gsap.registerPlugin(ScrollTrigger);

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scriptFont = { fontFamily: "'Biro Script Plus', cursive" };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Select all elements with the 'skill-element' class
      const elements = containerRef.current?.querySelectorAll('.skill-element');
      
      if (elements && elements.length > 0) {
        // Animate FROM these values TO their original CSS values
        gsap.from(elements, {
          opacity: 0,
          y: 40,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none none",
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="skills"
      className="relative h-screen min-h-screen w-full overflow-hidden"
      style={{ isolation: 'isolate' }}
    >
      {/* 2. Main Content Container */}
      <div ref={containerRef} className="relative z-30 h-full w-full">
        
        {/* Bottom Left: Envelope Asset */}
        <div 
          className="skill-element absolute bottom-[5%] left-[5%] md:bottom-[6%] md:left-[17%] z-35 rotate-[20deg] md:scale-[1.65] origin-center"
          style={{ 
            filter: 'drop-shadow(15px 25px 40px rgba(0,0,0,0.6))',
            width: 'clamp(150px, 20vw, 300px)'
          }}
        >
          <img 
            src={envelopeAsset} 
            alt="Envelope" 
            className="w-full h-auto object-contain" 
          />
        </div>

        {/* Center: Notebook Asset */}
        <div 
          className="skill-element absolute top-[65%] left-[50vw] -translate-x-1/2 -translate-y-1/2 z-40 rotate-[12deg] md:scale-[1.15] origin-center"
          style={{ 
            filter: 'drop-shadow(25px 50px 80px rgba(0,0,0,0.75))',
            width: 'clamp(280px, 45vw, 650px)'
          }}
        >
          <div className="relative w-full aspect-[4/5]">
            <img src={notebookAsset} alt="Notebook" className="w-full h-full object-contain" />
            
            {/* --- Notebook Text Content --- */}
            {/* Left Page: TECHNICAL */}
            <div className="absolute top-[30%] left-[16%] w-[35%] pointer-events-none">
              <h3 
                className="text-black text-[clamp(0.7rem,1.8vw,1.6rem)] mb-[5%] rotate-[-4deg]"
                style={{ ...scriptFont, letterSpacing: '0.08em' }}
              >
                TECHNICAL
              </h3>
              <ul className="-mt-[3%] rotate-[-4deg] text-black text-[clamp(0.5rem,1.25vw,1.25rem)] leading-tight">
                <li className="ml-[5%] rotate-[-2deg]" style={{ ...scriptFont, letterSpacing: '0.04em' }}>Pattern Making</li>
                <li className="mt-[10%] ml-[5%] rotate-[-2deg]" style={{ ...scriptFont, letterSpacing: '0.04em' }}>Garment Construction</li>
                <li className="mt-[10%] ml-[5%] rotate-[-2deg]" style={{ ...scriptFont, letterSpacing: '0.04em' }}>Draping</li>
                <li className="mt-[13%] ml-[5%] rotate-[-1.5deg]" style={{ ...scriptFont, letterSpacing: '0.04em' }}>Techpack Development</li>
                <li className="mt-[13%] ml-[5%] rotate-[-1.5deg]" style={{ ...scriptFont, letterSpacing: '0.04em' }}>Fabric Knowledge</li>
              </ul>
            </div>

            {/* Right Page: CREATIVE */}
            <div className="absolute top-[27%] left-[56%] w-[35%] pointer-events-none">
              <h3 
                className="text-black text-[clamp(0.7rem,1.8vw,1.6rem)] -mt-[5%] mb-[10%] rotate-[-9deg] ml-[15%]"
                style={{ ...scriptFont, letterSpacing: '0.08em' }}
              >
                CREATIVE
              </h3>
              <ul className="-mt-[3%] rotate-[2deg] text-black text-[clamp(0.5rem,1.25vw,1.25rem)] leading-tight">
                <li className="-mt-[8%] ml-[3%] rotate-[-8deg]" style={{ ...scriptFont, letterSpacing: '0.04em' }}>Illustrations</li>
                <li className="mt-[10%] ml-[5%] rotate-[-8deg]" style={{ ...scriptFont, letterSpacing: '0.04em' }}>Concept Development</li>
                <li className="mt-[12%] ml-[9%] rotate-[-8deg]" style={{ ...scriptFont, letterSpacing: '0.04em' }}>Moodboarding</li>
                <li className="mt-[13%] ml-[12%] rotate-[-8deg]" style={{ ...scriptFont, letterSpacing: '0.04em' }}>Collection Development</li>
                <li className="mt-[15%] ml-[18%] rotate-[-8deg]" style={{ ...scriptFont, letterSpacing: '0.04em' }}>Trend Research</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Top Right Heading: MY SKILLS */}
        <div className="skill-element absolute top-[5%] right-[5%] md:top-[6%] md:right-[8%] flex flex-col items-end z-50 pointer-events-none -mr-[5vw]">
          <div className="relative">
            {/* "MY" */}
            <span 
              className="absolute -top-[20%] -left-[10%] z-10 font-script text-white" 
              style={{ 
                transform: 'rotate(-12deg)', 
                display: 'inline-block',
                fontSize: 'clamp(1.5rem, 4vw, 5rem)',
                ...scriptFont
              }}
            >
              My
            </span>
            {/* "SKILLS" */}
            <h2 
              className="font-extenda uppercase text-[#C61212] tracking-tighter leading-[0.8]" 
              style={{ 
                fontWeight: 900, 
                letterSpacing: '-0.02em',
                fontSize: 'clamp(3.5rem, 10vw, 10rem)'
              }}
            >
              Skills
            </h2>
          </div>
        </div>

        {/* Bottom Right: Evidence Bag Asset */}
        <div 
          className="skill-element absolute bottom-[2%] right-[2%] md:bottom-[45%] md:right-[66%] z-40 rotate-[-30deg] md:scale-[1.55] origin-center"
          style={{ 
            filter: 'drop-shadow(20px 40px 70px rgba(0,0,0,0.7))',
            width: 'clamp(220px, 32vw, 600px)'
          }}
        >
          <img 
            src={evidenceBagAsset} 
            alt="Evidence Bag" 
            className="w-full h-auto object-contain" 
          />
          {/* Label below bag */}
          <div className="-mt-12 -ml-[4%] w-full text-center pointer-events-none">
            <p className="font-mono text-[clamp(0.6rem,0.65vw,0.8rem)] text-[#ffffffb4] font-bold tracking-[0.1em] uppercase rotate-[20deg]">
              Digital Toolkit
            </p>
          </div>
        </div>

        {/* Right of Notebook: Coffee Asset */}
        <div 
          className="skill-element absolute top-[40%] right-[5%] md:top-[30%] md:right-[12%] z-30 rotate-[-5deg] md:scale-[2.25] origin-center"
          style={{ 
            filter: 'drop-shadow(35px 75px 95px rgba(0,0,0,0.95))',
            width: 'clamp(120px, 15vw, 250px)'
          }}
        >
          <img 
            src={coffeeAsset} 
            alt="Coffee" 
            className="w-full h-auto object-contain" 
          />
        </div>

      </div>
    </section>
  );
};

export default Skills;

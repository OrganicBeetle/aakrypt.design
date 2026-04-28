import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import notepadImg from '../assets/About Me/notepad.png';
import photoPaperImg from '../assets/About Me/photo paper.png';
import moiImg from '../assets/About Me/Moi.jpeg';
import circleDecor from '../assets/DesignPhilosophy/circle.png';

gsap.registerPlugin(ScrollTrigger);

const AboutMe: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const notepadRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states for scroll reveal
      gsap.set(photoRef.current, { x: -80, opacity: 0, rotate: -10 });
      gsap.set(headingRef.current, { y: 40, opacity: 0 });
      gsap.set(notepadRef.current, { x: 120, opacity: 0, rotate: -8 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'restart none none restart',
        }
      });

      tl.to(photoRef.current, {
        x: 0,
        opacity: 1,
        rotate: 0,
        duration: 1.2,
        ease: 'power3.out'
      })
      .to(headingRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.8')
      .to(notepadRef.current, {
        x: 0,
        opacity: 1,
        rotate: -8,
        duration: 1.2,
        ease: 'power4.out'
      }, '-=0.6')
      .fromTo(".about-circle-decor", 
        { scale: 0, opacity: 0, rotate: -45 },
        { 
          scale: 1, 
          opacity: 1.0, 
          rotate: -5, 
          duration: 1, 
          ease: "back.out(1.7)" 
        },
        "+=0.2" // Slight delay after notepad/text finishes
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about-me"
      className="relative min-h-screen w-full flex flex-col lg:flex-row overflow-hidden py-[10vh] lg:py-0"
    >
      <div className="relative z-10 w-full h-full flex flex-col lg:flex-row px-[5vw] lg:px-[8vw] py-[6vh] lg:py-[8vh] items-center lg:items-stretch">
        
        {/* 2. Left Side: Photo Paper (Top) & Heading (Bottom) */}
        <div className="relative w-full lg:w-[40%] flex flex-col justify-between items-center lg:items-start min-h-[50vh] lg:min-h-0 mb-[8vh] lg:mb-0 ">
          <div 
            ref={photoRef}
            className="photo-paper-container relative lg:mt-[calc(5vh+5px)] lg:ml-[2vw]"
            style={{
              width: 'clamp(220px, 28vw, 380px)',
              filter: 'drop-shadow(0 1.5vh 3vh rgba(0,0,0,0.25))'
            }}
          >
            {/* Background Photo Paper - Base for containment */}
            <div className="relative w-full">
              <img 
                src={photoPaperImg} 
                alt="Photo paper background" 
                className="w-full h-auto block scale-[2.5]"
              />
              {/* Actual Portrait - Positioned relative to paper frame */}
              <div className="absolute top-[5%] left-[2%] w-[84%] h-[78%] flex items-center justify-center">
                <img 
                  src={moiImg} 
                  alt="Aakarshita Portrait" 
                  className=" w-full h-full object-cover rounded-sm shadow-inner scale-[2.25]"
                />
              </div>
            </div>
          </div>

          {/* Heading */}
          <div ref={headingRef} className="heading-wrapper relative mt-[10vh] lg:mt-[12vh] lg:mb-[4vh] lg:-ml-[2vh] select-none text-center lg:text-left">
            <span 
              className="a-bit absolute -top-[3.5vh] lg:-top-[5vh] left-[0%] lg:left-[0%] z-10 font-script text-[clamp(1.2rem,4.5vw,3.2rem)] text-white whitespace-nowrap"
              style={{ 
                transformOrigin: 'bottom left',
                textShadow: '0 0.2vh 1vh rgba(0,0,0,0.2)'
              }}
            >
              A bit
            </span>
            
            <h2 
              className="about-me relative z-0 font-extenda leading-[0.9] uppercase tracking-[0.05rem] text-[#C61212]"
              style={{ 
                fontSize: 'clamp(45px, 9vw, 140px)',
              }}
            >
              About Me
            </h2>
          </div>
        </div>

        {/* 3. Right Side: Notepad Wrapper */}
        <div className="relative w-full lg:w-[60%] flex justify-center lg:justify-end items-center mt-[4vh] lg:mt-0">
          <div 
            ref={notepadRef}
            className="notepad-wrapper relative w-[90%] lg:w-full -rotate-[8deg]"
            style={{
              maxWidth: '60vw',
              filter: 'drop-shadow(0 2.5vh 5vh rgba(0,0,0,0.4))',
            }}
          >
            <div className="relative w-full scale-100 lg:scale-105">
              <img 
                src={notepadImg} 
                alt="Notepad" 
                className="w-full h-auto opacity-85"
              />
              
              {/* Content area inside notepad */}
              <div 
                className="absolute inset-x-0 p-[10%] flex flex-col items-start justify-start text-left text-black font-homemade leading-[1.2] overflow-y-auto scrollbar-hide rotate-[8deg]"
                style={{ 
                  top: '20%',
                  height: '50%',
                  maxHeight: '50%',
                  paddingLeft: 'calc(10% + 5px)'
                }}
              >
                <div className="w-full space-y-[0.5vh] lg:space-y-[1vh]">
                  <p className="font-homemade text-[clamp(calc(0.5rem+2px),2.1vw,calc(1.8rem+2px))]">
                    Hi! I am Aakarshita,
                    <span className="relative inline-block mx-[0.5vw] px-[0.5vw] font-homemade">
                      <span className="relative z-10 font-homemade text-white">a year III fashion design student</span>
                      <span 
                        className="absolute inset-0 bg-[#9A0606] opacity-100" 
                        style={{ borderRadius: '20% 80% 30% 70% / 60% 30% 70% 40%' }}
                      />
                    </span>
                    at Indian <br /> Institute of Art & Design Delhi.
                  </p>
                  
                  <p className="font-homemade text-[clamp(calc(0.5rem+2px),2.1vw,calc(1.8rem+2px))]">
                    My work is submerged in a universe that I created, with each project manifesting itself into a 
                    <span className="relative inline-block px-[0.5vw] mx-[0.5vw] font-homemade">
                      persona.
                      <img 
                        src={circleDecor} 
                        alt="" 
                        className="about-circle-decor absolute top-[calc(-45%-8px)] left-[calc(50%+5px)] -translate-x-1/2 -translate-y-1/2 w-[151%] max-w-none pointer-events-none z-10 mix-blend-multiply contrast-200 saturate-200 brightness-110"
                        style={{ transform: 'translate(-50%, -50%) rotate(-5deg)' }}
                      />
                    </span>
                  </p>

                  <p className="font-homemade text-[clamp(calc(0.5rem+2px),2.1vw,calc(1.8rem+2px))]">
                    I love 
                    <span className="relative inline-block mx-[0.5vw] px-[0.5vw] font-homemade">
                      <span className="relative z-10 font-homemade text-white">conspiracy theories</span>
                      <span 
                        className="absolute inset-0 bg-[#9A0606] opacity-100" 
                        style={{ borderRadius: '70% 30% 80% 20% / 30% 60% 40% 70%' }}
                      />
                    </span>, 
                    humanoid creatures, dance, music, and every other way that allows me to express.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;

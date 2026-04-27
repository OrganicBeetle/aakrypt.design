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
      gsap.set(notepadRef.current, { x: 120, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
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
        duration: 1.2,
        ease: 'power4.out'
      }, '-=0.6');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about-me"
      className="relative min-h-screen w-full flex flex-col lg:flex-row overflow-hidden"
    >
      <div className="relative z-10 w-full h-full flex flex-col lg:flex-row px-[5vw] lg:px-[8vw] py-[6vh] lg:py-[8vh]">
        
        {/* 2. Left Side: Photo Paper (Top) & Heading (Bottom) */}
        <div className="relative w-full lg:w-[40%] flex flex-col justify-between items-start min-h-[70vh] lg:min-h-0">
          <div 
            ref={photoRef}
            className="photo-paper-container relative -mt-[2vh] lg:-mt-[2vh] -ml-[2vw] lg:-ml-[2vw]"
            style={{
              width: 'clamp(220px, 25vw, 380px)',
              filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.25))'
            }}
          >
            <img 
              src={photoPaperImg} 
              alt="Photo paper background" 
              className="w-full h-auto mt-[10rem] scale-[250%] ml-[5rem]"
            />
            <div className="absolute inset-0 flex items-center justify-center p-[6%] pb-[14%] mt-[10rem] scale-[300%] ml-[5rem]">
              <img 
                src={moiImg} 
                alt="Aakarshita Portrait" 
                className="w-full h-full object-cover rounded-sm shadow-inner mt-[1.20rem] ml-2"
              />
            </div>
          </div>

          {/* Heading at background's bottom left */}
          <div ref={headingRef} className="heading-wrapper relative mb-[2vh] lg:mb-[4vh] mt-[12vh] -ml-[4vh] lg:-ml-[8vh] select-none">
            <span 
              className="a-bit absolute -top-15 lg:-top-2 -left-4 z-10 font-script text-[clamp(1.5rem,4vw,3.5rem)] text-white"
              style={{ 
                transform: 'rotate(-25deg)', 
                transformOrigin: 'bottom left',
                textShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}
            >
              A bit
            </span>
            
            <h2 
              className="about-me relative z-0 font-extenda leading-[0.9] uppercase tracking-[0.05rem] text-[#C61212] ml-[-1vw] lg:ml-50"
              style={{ 
                fontSize: 'clamp(50px, 7vw, 130px)',
              }}
            >
              About Me
            </h2>
          </div>
        </div>

        {/* 3. Right Side: Notepad Wrapper */}
        <div className="relative w-full lg:w-[250%] flex justify-center lg:justify-end items-center mt-[2vh] lg:mt-0 -mr-[8vw]">
          <div 
            ref={notepadRef}
            className="notepad-wrapper relative"
            style={{
              width: 'clamp(620px, 55vw, 1080px)', 
              transform: 'rotate(-2deg)', 
              filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.4))'
            }}
          >
            <img 
              src={notepadImg} 
              alt="Notepad" 
              className="w-full h-auto scale-105 opacity-75"
            />
            
            {/* Content area inside notepad */}
            <div 
              className="absolute inset-0 p-[12%] pt-[18%] lg:pt-[15%] flex flex-col items-start justify-start text-left text-black font-palisade leading-[1.4] overflow-y-auto rotate-[10deg] mt-[15vh]"
            >
              <p className="font-palisade text-[clamp(1.1rem,2.5vw,1.6rem)] mb-5">
                Hi! I am Aakarshita,
                <span className="relative inline-block mx-1 px-[0.3rem] font-palisade">
                  <span className="relative z-10 font-palisade text-white">a year III fashion design student</span>
                  <span 
                    className="absolute inset-0 bg-[#9A0606] opacity-100 -rotate-[] scale-100 skew-x-[-10deg]" 
                    style={{ borderRadius: '20% 80% 30% 70% / 60% 30% 70% 40%' }}
                  />
                </span>
                at Indian Institute of Art & Design Delhi.
              </p>
              
              <p className="font-palisade text-[clamp(1.1rem,2.5vw,1.6rem)] mb-8">
                My work is submerged in a universe that I created, with each project manifesting itself into a 
                <span className="relative inline-block px-1 mx-1 font-palisade">
                  persona.
                  <img 
                    src={circleDecor} 
                    alt="" 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] max-w-none opacity-80 pointer-events-none -z-10"
                    style={{ transform: 'translate(-50%, -50%) rotate(-5deg)' }}
                  />
                </span>
              </p>

              <p className="font-palisade text-[clamp(1.1rem,2.5vw,1.6rem)] -mt-7">
                I love 
                <span className="relative inline-block mx-1 px-[0.3rem] font-palisade">
                  <span className="relative z-10 font-palisade text-white">conspiracy theories</span>
                  <span 
                    className="absolute inset-0 bg-[#9A0606] opacity-100 rotate-1 scale-100 skew-x-[5deg]" 
                    style={{ borderRadius: '70% 30% 80% 20% / 30% 60% 40% 70%' }}
                  />
                </span>, 
                humanoid creatures, dance, music, and every other way that allows me to express.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;

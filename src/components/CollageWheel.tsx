import { motion } from 'framer-motion';
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Splitting from 'splitting';

gsap.registerPlugin(ScrollTrigger);

// Import images from assets
import booklet from '../assets/image-wheel/booklet.png';
import stamp from '../assets/image-wheel/stamp.png';
import collage from '../assets/image-wheel/collage.jpg.jpeg';
import skellyHand from '../assets/image-wheel/skelly hand.png';
import cellophane from '../assets/image-wheel/cellophane.png';
import brain from '../assets/image-wheel/brain.png';
import starryNight from '../assets/image-wheel/starry night.png';
import digicrow from '../assets/image-wheel/digi crow.png';
import puppet from '../assets/image-wheel/puppet.png';
import eye from '../assets/image-wheel/eye.png';
import printBodice from '../assets/image-wheel/print bodice jpeg.png';
import cowUdder from '../assets/DesignPhilosophy/cow udder white.png';
import circleDecor from '../assets/DesignPhilosophy/circle.png';

const images = [
  { src: printBodice, scale: 1, z: 4 },
  { src: booklet, scale: 1, z: 3 },
  { src: stamp, scale: 0.9, z: 2 },
  { src: collage, scale: 0.75, z: 4 },
  { src: skellyHand, scale: 0.65, z: 3 },
  { src: cellophane, scale: 2.25, z: 1},
  { src: brain, scale: 1, z: 2 },
  { src: starryNight, scale: 1.1, z: 3 },
  { src: digicrow, scale: 0.95, z: 2 },
  { src: puppet, scale: 1.05, z: 3 },
  { src: eye, scale: 1, z: 2 },
];

const CollageWheel = () => {
  const RADIUS = 140; // Constant radius for authentic wheel feeling
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Selectors
    const howI = section.querySelector('.how-i');
    const create = section.querySelector('.create-text');
    
    // Initialize splitting on the description text
    const splittingResult = Splitting({
      target: section.querySelectorAll('[data-about-description]'),
      by: 'chars',
    }) as any;

    const chars = splittingResult.flatMap((res: any) => res.chars || []);

    const ctx = gsap.context(() => {
      // Set initial states for editorial entrance
      gsap.set(howI, { opacity: 0, y: 60, rotation: -10 });
      gsap.set(create, { opacity: 0, y: 100 });
      gsap.set(chars, { opacity: 0, y: 40 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true
        }
      });

      // 1. CREATE (main heading) enters the stage
      tl.to(create, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power4.out"
      });

      // 2. HOW I (script) enters with more dramatic offset
      tl.to(howI, {
        opacity: 1,
        y: 0,
        rotation: -12,
        duration: 1.2,
        ease: "power4.out"
      }, "-=1.0"); // Overlap with CREATE but slightly delayed

      // 3. BODY TEXT (chars) fades + slides in with stagger
      tl.to(chars, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.02,
        ease: "power3.out"
      }, "-=0.8"); // Start while headings are finishing

      // 4. Parallax Background Assets
      gsap.to(".parallax-character", {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      gsap.to(".parallax-circle", {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="relative my-[6vh] flex min-h-[130vh] w-full items-center overflow-visible py-[10vh]"
    >
      {/* Left Content Area */}
      <div className="relative z-20 w-1/2 px-12 lg:px-24">
        {/* Background Decorative Character (Behind text block) */}
        <div className="absolute left-[50%] top-[45%] -translate-y-1/2 -z-10 pointer-events-none select-none">
          <img 
            src={cowUdder} 
            alt="" 
            className="parallax-character relative w-[100%] max-w-[400px] opacity-[0.5]" 
          />
        </div>

        <div className="max-w-xl">
          {/* Hand-placed Heading Composition */}
          <div className="relative mb-2 select-none">
            {/* Overlay Script: HOW I */}
            <span 
              className="how-i absolute -top-5 -left-4 z-10 font-script text-[clamp(2rem,5vw,3.5rem)] text-white"
              style={{ transform: 'rotate(-12deg)', transformOrigin: 'bottom left' }}
            >
              How I
            </span>
            
            {/* Main Display: CREATE */}
            <h2 className="create-text relative z-0 font-extenda text-[clamp(80px,10vw,160px)] leading-[0.8] text-[#C61212] uppercase tracking-[0.002em]">
              Create
            </h2>
          </div>
          
          <p 
            data-about-description
            className="mt-2 font-mono text-[18px] leading-relaxed text-white/85 max-w-md"
          >
            I dissect concepts into fragments: color, texture, context; often extending into original 
            <span className="relative inline-block px-2 mx-1">
              <img 
                src={circleDecor} 
                alt="" 
                className="parallax-circle absolute -top-[4.5vh] left-[5vw] -translate-x-1/2 -translate-y-1/2 w-[150%] max-w-none scale-[1.1] opacity-[0.9] -z-10" 
                style={{ transform: 'translate(-50%, -50%) rotate(3deg)' }}
              />
              <span className='font-mono'>characters.</span>
            </span>
          </p>
        </div>
      </div>

      {/* The Rotating Collage Wheel Container */}
      <div 
        className="absolute right-[10px] top-1/2 h-[1080px] w-[1080px] -translate-y-1/2 translate-x-1/2"
        style={{ perspective: '1500px' }}
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{
            duration: 32,
            ease: "linear",
            repeat: Infinity,
          }}
          className="relative h-full w-full"
          style={{ 
            willChange: "transform",
            transformStyle: "preserve-3d"
          }}
        >
          {images.map((img, index) => {
            const angle = (index * 360) / images.length;
            const rad = (angle * Math.PI) / 180;
            const x = RADIUS * Math.cos(rad);
            const y = RADIUS * Math.sin(rad);
            const rotation = angle + 90;

            return (
              <motion.div
                key={index}
                className="absolute left-1/2 top-1/2"
                style={{
                  zIndex: img.z,
                  x: x,
                  y: y,
                  rotate: rotation,
                  scale: img.scale,
                  willChange: "transform",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden"
                }}
              >
                <div className="relative group -translate-x-1/2 -translate-y-1/2">
                  <motion.img
                    src={img.src}
                    alt=""
                    className="max-w-[280px] h-auto transition-transform duration-500 group-hover:scale-110"
                    style={{ 
                      filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))',
                      WebkitBackfaceVisibility: 'hidden'
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default CollageWheel;

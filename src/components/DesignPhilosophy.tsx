import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Assets
import backgroundAbout from '../assets/background_about.png';
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

const IMAGES = [
  { src: booklet, label: "Archive 01" },
  { src: stamp, label: "Detailing" },
  { src: collage, label: "Fragment" },
  { src: skellyHand, label: "Structure" },
  { src: cellophane, label: "Texture", offset: -8 },
  { src: brain, label: "Concept" },
  { src: starryNight, label: "Atmosphere" },
  { src: digicrow, label: "Digital" },
  { src: puppet, label: "Form" },
  { src: eye, label: "Vision" },
  { src: printBodice, label: "Craft" },
];

const DesignPhilosophy = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Wheel configuration
  const RADIUS = isMobile ? 320 : 480; 
  const ROTATION_DURATION = 45; // Seconds for a full loop

  return (
    <section 
      className="relative z-50 h-screen w-full overflow-hidden bg-charcoal font-body"
    >
      {/* Background with optimized cover and subtle parallax-ready positioning */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <img
          src={backgroundAbout}
          alt="Background"
          className="h-full w-full object-cover object-center opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
      </motion.div>

      <div className="relative z-10 grid h-full w-full grid-cols-1 items-center px-6 sm:px-12 lg:grid-cols-2 lg:px-24">
        {/* Left Column: Typography */}
        <div className="max-w-3xl pt-20 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="mb-6 font-anton text-[clamp(4rem,10vw,8.5rem)] uppercase leading-[0.85] text-white">
              How I <br /> create
            </h2>
            
            <div className="max-w-xl">
              <p className="font-seasons text-[24px] leading-[1.4] text-white lg:text-[32px]">
                <span 
                  className="inline bg-black/45 px-3 py-1.5 box-decoration-clone leading-[1.8]"
                  style={{ WebkitBoxDecorationBreak: 'clone' }}
                >
                  Experimentation, context research and conceptualization; constant juggling throughout the process.
                </span>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right Column: The Mechanical Wheel */}
        <div className="absolute right-0 top-1/2 h-[1200px] w-[1200px] -translate-y-1/2 translate-x-1/2 lg:relative lg:right-auto lg:top-auto lg:h-full lg:w-full lg:translate-x-0 lg:translate-y-0">
          <div className="relative flex h-full w-full items-center justify-center lg:justify-end">
            
            {/* The Rotating Container - Center aligned to the right edge of screen */}
            <motion.div
              className="absolute right-0 top-1/2 flex h-[1px] w-[1px] items-center justify-center lg:right-0"
              animate={{ rotate: [0, 360] }}
              transition={{
                duration: ROTATION_DURATION,
                ease: "linear",
                repeat: Infinity,
              }}
              style={{ 
                willChange: "transform",
                transformStyle: "preserve-3d"
              }}
            >
              {IMAGES.map((img, index) => {
                const baseAngle = (index * 360) / IMAGES.length;
                const angle = baseAngle + (img.offset || 0);
                const rad = (angle * Math.PI) / 180;
                
                // Polar to Cartesian positioning
                const x = RADIUS * Math.cos(rad);
                const y = RADIUS * Math.sin(rad);
                
                // The image rotation (90deg offset to face outward)
                const imageRotation = angle + 90;

                return (
                  <motion.div
                    key={index}
                    className="absolute"
                    style={{
                      x: x,
                      y: y,
                      rotate: imageRotation,
                      willChange: "transform",
                      transformStyle: "preserve-3d"
                    }}
                    whileHover={{ scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="relative h-[220px] w-[160px] cursor-none overflow-hidden bg-stone/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-sm lg:h-[280px] lg:w-[210px]">
                      <img
                        src={img.src}
                        alt={img.label}
                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                        style={{ WebkitBackfaceVisibility: 'hidden' }}
                        loading="lazy"
                      />
                      {/* Subtle Overlay */}
                      <div className="absolute inset-0 bg-black/5" />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Pivot Point Indicator (Subtle Mechanical Detail) */}
            <div className="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border border-white/20 bg-black shadow-[0_0_20px_rgba(255,255,255,0.1)] lg:right-0" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignPhilosophy;

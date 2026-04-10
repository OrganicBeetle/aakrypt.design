import { motion } from 'framer-motion';
import heroBackground from '../assets/background.png';

/**
 * High-End Rotating Wheel Component
 * Features:
 * - Continuous 360deg rotation using Framer Motion
 * - Depth trick using perspective and scaling
 * - Gradient mask for smooth edge blending
 * - Organic image placement (quadrant-based with offsets)
 */

const IMAGES = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1529139513065-07b2ee6a9e03?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?q=80&w=600&auto=format&fit=crop',
];

const RotatingWheel = () => {
  // Config for the wheel layout
  const totalImages = IMAGES.length;
  const wheelRadius = 420; // Base radius in pixels

  return (
    <section className="relative flex h-screen w-full items-center overflow-hidden bg-paper">
      <img
        src={heroBackground}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="pointer-events-none absolute inset-0 bg-white/6" />

      {/* Left Content Area (Reserved for Text) */}
      <div className="relative z-20 w-1/2 px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-md"
        >
          <p className="mb-4 font-montserrat text-[14px] uppercase tracking-[0.3em] text-accent">
            Selected Editorial
          </p>
          <h2 className="font-anton text-[8vw] leading-[0.85] text-charcoal sm:text-[5rem] lg:text-[6rem]">
            Visionary <br /> Portfolios
          </h2>
          <p className="mt-8 font-seasons text-[18px] leading-relaxed text-charcoal/70">
            A curation of works exploring the intersection of texture, 
            motion, and staged restraint. Balancing clean structure with 
            a refined editorial mood.
          </p>
        </motion.div>
      </div>

      {/* The Rotating Wheel Container */}
      <div 
        className="absolute -right-[35%] top-1/2 h-[120vh] w-[120vh] -translate-y-1/2"
        style={{
          perspective: '1200px',
        }}
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{
            duration: 32,
            ease: "linear",
            repeat: Infinity,
          }}
          className="relative flex h-full w-full items-center justify-center"
          style={{ 
            transformStyle: 'preserve-3d',
            willChange: 'transform'
          }}
        >
          {IMAGES.map((src, index) => {
            // Distribute images into 4 quadrants with organic offsets
            const baseAngle = (index / totalImages) * 360;
            
            // Subtle offset: Slightly varies the angle and radius for a non-perfect "human" feel
            const angleOffset = (index % 3) * 5 - 5; 
            const radiusOffset = (index % 2) * 30 - 15;
            
            const angle = baseAngle + angleOffset;
            const radius = wheelRadius + radiusOffset;

            // Polar to Cartesian conversion for positioning
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;

            return (
              <div
                key={index}
                className="absolute"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: `translate(-50%, -50%) translateZ(0)`, // Center the image and trigger GPU
                  willChange: 'transform'
                }}
              >
                <div
                  className="group relative h-[280px] w-[210px] overflow-hidden bg-ash shadow-2xl transition-all duration-500 hover:scale-105"
                  style={{
                    // Depth Trick: Rotation & slight skew to simulate 3D arc
                    transform: `rotate(${angle + 90}deg)`,
                    WebkitBackfaceVisibility: 'hidden'
                  }}
                >
                  <img
                    src={src}
                    alt={`Editorial piece ${index + 1}`}
                    className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                    loading="lazy"
                    style={{ WebkitBackfaceVisibility: 'hidden' }}
                  />
                  {/* Subtle inner shadow for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default RotatingWheel;

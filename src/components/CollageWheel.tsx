import { motion } from 'framer-motion';

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
import backgroundAbout from '../assets/background_about.png';

const images = [
  { src: printBodice, scale: 1, z: 4 },
  { src: booklet, scale: 1.5, z: 3 },
  { src: stamp, scale: 0.9, z: 2 },
  { src: collage, scale: 1, z: 4 },
  { src: skellyHand, scale: 1, z: 3 },
  { src: cellophane, scale: 2.25, z: 3 },
  { src: brain, scale: 1, z: 2 },
  { src: starryNight, scale: 1.1, z: 3 },
  { src: digicrow, scale: 0.95, z: 2 },
  { src: puppet, scale: 1.05, z: 3 },
  { src: eye, scale: 1, z: 2 },
];

const CollageWheel = () => {
  const RADIUS = 380; // Constant radius for authentic wheel feeling

  return (
    <section className="relative flex h-screen w-full items-center overflow-hidden">
      {/* Background Image */}
      <img
        src={backgroundAbout}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      />
      
      <div className="absolute inset-0 bg-black/5 pointer-events-none" />

      {/* Left Content Area (Reserved for Text) */}
      <div className="relative z-20 w-1/2 px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-xl"
        >
          <h2 className="font-anton text-[7vw] leading-[0.8] text-paper sm:text-[4.5rem] lg:text-[5.5rem] uppercase italic">
            How I Create
          </h2>
          <div className="mt-5 h-px w-20 bg-accent/40" />
          <p className="mt-2 font-Cormorant Garamond text-[20px] leading-relaxed text-paper/80 max-w-md">
            Keeping the vision rooted in concept through <span className='bg-[#2C353C] font-Cormorant Garamond'>context based experimentation.</span>
          </p>
        </motion.div>
      </div>

      {/* The Rotating Collage Wheel Container */}
      <div 
        className="absolute right-0 top-1/2 h-[1200px] w-[1200px] -translate-y-1/2 translate-x-1/2"
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
            // Calculate equidistant angle
            const angle = (index * 360) / images.length;
            
            // Convert angle to radians for x, y positioning
            const rad = (angle * Math.PI) / 180;
            const x = RADIUS * Math.cos(rad);
            const y = RADIUS * Math.sin(rad);

            // Tangential rotation (90deg offset to align "top" outwards)
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
                <div className="relative group">
                  <motion.img
                    src={img.src}
                    alt=""
                    className="max-w-[280px] h-auto transition-transform duration-500 group-hover:scale-110"
                    style={{ 
                      // Using only drop-shadow to respect PNG transparency
                      filter: 'drop-shadow(0 15px 35px rgba(0,0,0,0.3))',
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

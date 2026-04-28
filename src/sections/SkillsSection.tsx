import { motion } from 'framer-motion'
import TarotCard from '../components/TarotCard'

// Import card assets
import techFront from '../assets/SkillsPage/technical tarot front.png'
import techBack from '../assets/SkillsPage/technical tarot back.png'
import creativeFront from '../assets/SkillsPage/creative tarot front.png'
import creativeBack from '../assets/SkillsPage/creative tarot back.png'
import digitalFront from '../assets/SkillsPage/digital tarot front.png'
import digitalBack from '../assets/SkillsPage/digital tarot back.png'

function SkillsSection() {
  const cards = [
    {
      title: 'TECHNICAL',
      frontImage: techFront,
      backImage: techBack,
      delay: 0,
      dealDelay: 1.2, // Increased delay to let stack be visible
      deckX: '115%', // Pull into center stack from its flex position
      deckY: 10,
      deckRotate: -5,
      finalY: 32,
      finalRotate: -4,
    },
    {
      title: 'CREATIVE',
      frontImage: creativeFront,
      backImage: creativeBack,
      delay: 150,
      dealDelay: 1.8, 
      deckX: '0%',
      deckY: 0,
      deckRotate: 0,
      finalY: -32,
      finalRotate: 0,
    },
    {
      title: 'DIGITAL',
      frontImage: digitalFront,
      backImage: digitalBack,
      delay: 300,
      dealDelay: 2.4, 
      deckX: '-115%', // Pull into center stack from its flex position
      deckY: 10,
      deckRotate: 5,
      finalY: 32,
      finalRotate: 4,
    },
  ]

  return (
    <section
      id="skills-section"
      className="relative flex min-h-[120vh] w-full items-center justify-center overflow-hidden px-8 py-24 text-chalk sm:px-12 lg:px-20 lg:py-32"
      aria-label="Skills section"
      style={{ 
        background: 'none', 
        backgroundColor: 'transparent', 
        border: 'none',
        boxShadow: 'none',
        outline: 'none'
      }}
    >
      {/* Page Heading */}
      <div className="absolute top-[calc(8vh+5rem)] right-[5vw] lg:right-[3vw] z-20 select-none pointer-events-none text-right">
        <div className="relative inline-flex flex-col items-end">
          <motion.span 
            initial={{ opacity: 0, x: '-12rem', y: '25px', rotate: 0 }}
            whileInView={{ opacity: 1, x: '-12rem', y: '25px', rotate: [-25] }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-script text-[clamp(1.2rem,4vw,2.8rem)] text-chalk whitespace-nowrap z-10 mb-[-1.5vh] mr-[4vw] lg:mr-[6vw]"
            style={{ textShadow: '0 0.2vh 1vh rgba(0,0,0,0.2)' }}
          >
            My
          </motion.span>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-anton text-[clamp(3.5rem,10vw,12rem)] leading-[0.8] uppercase tracking-tighter text-[#c61212] z-0"
          >
            Skills
          </motion.h2>
        </div>
      </div>

      <div className="relative flex min-h-[120vh] w-full items-center justify-center" style={{ background: 'none' }}>
        <div className="relative flex w-full max-w-[90vw] flex-col items-center justify-center gap-[clamp(20px,5vh,60px)] sm:flex-row sm:gap-[clamp(15px,4vw,40px)] lg:gap-[clamp(20px,6vw,80px)]">
          {cards.map((card, index) => (
            <motion.div
              key={`${card.title}-${index}`}
              className="relative z-10 aspect-[3/4.2] w-[min(64.4vw,299px)] sm:w-[24%]"
              initial={{
                x: card.deckX,
                y: card.deckY,
                rotate: card.deckRotate,
                scale: 0.98,
                opacity: 1, // Visible stack
              }}
              whileInView={{
                x: 0,
                y: card.finalY,
                rotate: card.finalRotate,
                scale: 1,
                opacity: 1,
              }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{
                delay: card.dealDelay,
                duration: 1.8, // Slow, fluid dealing
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ background: 'none' }}
            >
              <TarotCard
                frontImage={card.backImage}
                backImage={card.frontImage}
                delay={card.delay}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SkillsSection

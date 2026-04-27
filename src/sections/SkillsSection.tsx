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
      <div className="relative flex min-h-[120vh] w-full items-center justify-center" style={{ background: 'none' }}>
        <div className="relative flex w-full max-w-7xl flex-col items-center justify-center gap-12 sm:flex-row sm:gap-8 lg:gap-16">
          {cards.map((card, index) => (
            <motion.div
              key={`${card.title}-${index}`}
              className="relative z-10 aspect-[3/4.2] w-[min(72vw,240px)] sm:w-[28%]"
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

import { motion } from 'framer-motion'
import TarotCard from '../components/TarotCard'

function SkillsSection() {
  const cards = [
    {
      title: 'TECHNICAL',
      skills: ['Pattern Making', 'Draping', 'Garment Construction'],
      delay: 0,
      dealDelay: 0.4,
      deckX: '110%',
      deckY: 10,
      deckRotate: -10,
      finalY: 32,
      finalRotate: -4,
    },
    {
      title: 'CREATIVE',
      skills: ['Illustration', 'Concept Development', 'Mood Boarding'],
      delay: 80,
      dealDelay: 0.7,
      deckX: '0%',
      deckY: 0,
      deckRotate: 3,
      finalY: -32,
      finalRotate: 0,
    },
    {
      title: 'TOOLS',
      skills: ['Photoshop', 'Illustrator', 'Canva'],
      delay: 160,
      dealDelay: 1,
      deckX: '-110%',
      deckY: 10,
      deckRotate: 10,
      finalY: 32,
      finalRotate: 4,
    },
  ]

  return (
    <section
      id="skills-section"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden text-chalk"
      aria-label="Skills section"
    >
      <div className="relative flex min-h-screen w-full items-center justify-center px-6">
      <div className="relative flex w-full max-w-6xl flex-col items-center justify-center gap-8 sm:flex-row sm:gap-6 lg:gap-10">
          {cards.map((card, index) => (
            <motion.div
              key={`${card.title}-${index}`}
              className="relative z-10 aspect-[3/5] w-[min(72vw,260px)] sm:w-[30%]"
              initial={{
                x: card.deckX,
                y: card.deckY,
                rotate: card.deckRotate,
                scale: 0.96,
                opacity: 0.92,
              }}
              whileInView={{
                x: 0,
                y: card.finalY,
                rotate: card.finalRotate,
                scale: 1,
                opacity: 1,
              }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{
                delay: card.dealDelay,
                duration: 0.95,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <TarotCard
                title={card.title}
                skills={card.skills}
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

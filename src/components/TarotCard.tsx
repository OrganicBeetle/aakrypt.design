import tarotBack from '../assets/SkillsPage/TarotBack.webp'
import tarotFront from '../assets/SkillsPage/TarotFront.webp'

type TarotCardProps = {
  title: string
  skills: string[]
  delay: number
}

function TarotCard({ title, skills, delay }: TarotCardProps) {
  return (
    <div
      className="group h-full w-full"
      style={{ perspective: '1000px' }}
    >
      <div
        className="relative h-full w-full rounded-[6px] shadow-[0_24px_70px_rgba(0,0,0,0.42)] transition-transform duration-700 ease-out group-hover:[transform:rotateY(180deg)]"
        style={{
          transformStyle: 'preserve-3d',
          transitionDelay: `${delay}ms`,
        }}
      >
        <div
          className="absolute inset-0 overflow-hidden rounded-[6px]"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <img
            src={tarotBack}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>

        <div
          className="absolute inset-0 overflow-hidden rounded-[6px] [transform:rotateY(180deg)]"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <img
            src={tarotFront}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/24" />
          <div className="relative z-10 flex h-full w-full items-center justify-center p-[12%] text-center text-black">
            <div className="w-full rounded-[4px] border border-black/10 bg-[#f3ead6]/92 px-4 py-5 shadow-[0_12px_32px_rgba(0,0,0,0.32)]">
              <h3 className="font-heading text-[clamp(1rem,2.4vw,1.65rem)] uppercase tracking-[0.12em]">
                {title}
              </h3>
              <ul className="mt-5 space-y-2 text-[clamp(0.72rem,1.3vw,0.95rem)] font-medium uppercase tracking-[0.08em]">
                {skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TarotCard

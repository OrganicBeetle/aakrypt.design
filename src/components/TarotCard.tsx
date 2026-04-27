type TarotCardProps = {
  frontImage: string
  backImage: string
  delay: number
}

function TarotCard({ frontImage, backImage, delay }: TarotCardProps) {
  return (
    <div
      className="group h-full w-full"
      style={{ perspective: '1000px' }}
    >
      <div
        className="relative h-full w-full rounded-[14px] transition-transform duration-700 ease-out group-hover:[transform:rotateY(180deg)]"
        style={{
          transformStyle: 'preserve-3d',
          transitionDelay: `${delay}ms`,
        }}
      >
        {/* Back of Card (Visible initially) */}
        <div
          className="absolute inset-0 overflow-hidden rounded-[14px] bg-transparent"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <img
            src={backImage}
            alt="Tarot Card Back"
            className="h-full w-full object-cover object-center scale-100"
          />
        </div>

        {/* Front of Card (Visible on hover) */}
        <div
          className="absolute inset-0 overflow-hidden rounded-[14px] bg-transparent [transform:rotateY(180deg)]"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <img
            src={frontImage}
            alt="Tarot Card Front"
            className="absolute inset-0 h-full w-full object-cover object-center scale-100"
          />
        </div>
      </div>
    </div>
  )
}

export default TarotCard

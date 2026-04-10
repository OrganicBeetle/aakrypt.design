import Contact from '../sections/Contact'
import Hero from '../sections/Hero'
import Process from '../sections/Process'
import Skills from '../sections/Skills'
import Work from '../sections/Work'
import CollageWheel from '../components/CollageWheel'

function HomePage() {
  return (
    <main className="bg-paper text-charcoal" aria-label="Portfolio app shell">
      <Hero />
      <CollageWheel />
      <Work />
      <Skills />
      <Process />
      <Contact />
    </main>
  )
}

export default HomePage

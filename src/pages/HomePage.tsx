import Contact from '../sections/Contact'
import Hero from '../sections/Hero'
import Process from '../sections/Process'
import Skills from '../sections/Skills'
import Work from '../sections/Work'
import CollageWheel from '../components/CollageWheel'
import { useEffect } from 'react'

function HomePage() {
  useEffect(() => {
    // Scroll to exact top on page load
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [])

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

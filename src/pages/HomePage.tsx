import Contact from '../sections/Contact'
import Hero from '../sections/Hero'
import Work from '../sections/Work'
import CollageWheel from '../components/CollageWheel'
import AboutMe from '../sections/AboutMe'
import SkillsSection from '../sections/SkillsSection'
import { useEffect } from 'react'

function HomePage() {
  useEffect(() => {
    // Scroll to exact top on page load
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [])

  return (
    <main className="text-chalk bg-transparent" aria-label="Portfolio app shell">
      <Hero />
      <CollageWheel />
      <Work />
      <AboutMe />
      <SkillsSection />
      <Contact />
    </main>
  )
}

export default HomePage

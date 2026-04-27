import { AnimatePresence, motion } from 'framer-motion'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Preloader from './components/Preloader'
import { Route, Routes } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import useLenis from './hooks/useLenis'
import HomePage from './pages/HomePage'

function App() {
  const location = useLocation()
  useLenis()

  return (
    <>
      <Preloader />
      <Cursor />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.5 }}
        >
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default App

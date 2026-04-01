import { useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { Preloader } from './components/Preloader'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Stats } from './components/Stats'
import { ServiceGrid } from './components/ServiceGrid'
import { Gallery } from './components/Gallery'
import { JuanSection } from './components/JuanSection'
import { Testimonials } from './components/Testimonials'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { MusicPlayer } from './components/MusicPlayer'

function App() {
  const [loading, setLoading] = useState(true)

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <>
      <Preloader onComplete={() => setLoading(false)} />

      <div className={`bg-asphalt text-white selection:bg-neon-gold selection:text-asphalt overflow-x-hidden grain transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Scroll progress bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-neon-gold origin-left z-50 shadow-[0_0_10px_#FFD700]"
          style={{ scaleX }}
        />

        <Navbar />

        <main>
          <Hero />
          <Stats />
          <ServiceGrid />
          <Gallery />
          <JuanSection />
          <Testimonials />
          <Contact />
        </main>

        <Footer />

        {/* Floating WhatsApp FAB */}
        <motion.a
          href="https://wa.me/5491161135826"
          className="whatsapp-fab z-50"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: loading ? 0 : 1, opacity: loading ? 0 : 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
          aria-label="Contactar por WhatsApp"
        >
          <MessageCircle size={30} />
        </motion.a>

        {/* Floating Music Player (Loaded unconditionally to capture clicks) */}
        <MusicPlayer isVisible={!loading} />
      </div>
    </>
  )
}

export default App

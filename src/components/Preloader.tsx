import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    let current = 0
    // Fast at first, slow near 90, then instant to 100 on window load
    const interval = setInterval(() => {
      current += Math.random() * 12
      if (current > 90) current = 90
      setProgress(Math.floor(current))
    }, 120)

    const handleLoad = () => {
      clearInterval(interval)
      setProgress(100)
      setTimeout(() => {
        setIsLoaded(true)
      }, 500)
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
    }

    return () => {
      clearInterval(interval)
      window.removeEventListener('load', handleLoad)
    }
  }, [onComplete])

  const handleEnter = () => {
    window.dispatchEvent(new CustomEvent('musicControl', { detail: 'play' }))
    setDone(true)
    setTimeout(onComplete, 600)
  }

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-asphalt flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <div className="relative mb-8 flex justify-center w-full px-6">
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              src="/img/bici.gif"
              alt="Cargando Bici"
              className="w-full max-w-xs md:max-w-sm lg:max-w-md object-contain drop-shadow-[0_0_20px_rgba(255,215,0,0.15)]"
            />
          </div>

          {/* Brand name */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-10"
          >
            <div className="font-heading text-4xl tracking-widest text-rasta drop-shadow-[0_0_8px_rgba(255,215,0,0.5)] mb-1">
              PEDALEANDO ME VOY
            </div>
            <div className="text-white/30 font-body text-xs uppercase tracking-[0.3em]">
              Sintonizando la mejor vibra…
            </div>
          </motion.div>

          {!isLoaded ? (
            <>
              {/* Progress bar */}
              <div className="w-64 h-0.5 bg-white/10 rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-neon-gold rounded-full shadow-[0_0_8px_#FFD700]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut', duration: 0.15 }}
                />
              </div>
              <div className="mt-3 font-heading text-neon-gold text-lg">
                {progress}<span className="text-white/30 text-sm">%</span>
              </div>
            </>
          ) : (
             <motion.button 
               initial={{ scale: 0.8, opacity: 0 }} 
               animate={{ scale: 1, opacity: 1 }} 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               onClick={handleEnter}
               className="mt-4 px-8 py-4 bg-neon-gold text-asphalt font-heading text-xl rounded-full uppercase tracking-widest shadow-[0_0_20px_rgba(255,215,0,0.5)] hover:shadow-[0_0_30px_rgba(255,215,0,0.8)] transition-all flex items-center gap-3"
             >
               ENTRAR AL TALLER 🔊
             </motion.button>
          )}

          {/* Rasta strip bottom */}
          <div className="absolute bottom-0 left-0 right-0 flex h-1">
            <div className="flex-1 bg-neon-red" />
            <div className="flex-1 bg-neon-gold" />
            <div className="flex-1 bg-neon-green" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

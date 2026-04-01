import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'

export const MusicPlayer = ({ isVisible }: { isVisible: boolean }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Intentar reproducir automáticamente (el navegador puede bloquearlo si no hubo click)
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3 // Volumen bajito 30% para no asustar
    }
  }, [])

  useEffect(() => {
    const handleMusicControl = (e: any) => {
      if (!audioRef.current) return
      
      if (e.detail === 'stop' && isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else if (e.detail === 'play' && !isPlaying) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(console.error)
      }
    }

    window.addEventListener('musicControl', handleMusicControl)
    return () => window.removeEventListener('musicControl', handleMusicControl)
  }, [isPlaying])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className={`transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <audio ref={audioRef} loop src="/audio/fondo.mp3?v=2" />

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={
          isPlaying 
            ? { opacity: 1, y: 0, scale: 1 } 
            : { opacity: 1, y: 0, scale: [1, 1.05, 1], boxShadow: ["0px 0px 0px rgba(255,215,0,0)", "0px 0px 15px rgba(255,215,0,0.4)", "0px 0px 0px rgba(255,215,0,0)"] }
        }
        transition={{ 
          delay: isPlaying ? 0 : 1, 
          repeat: isPlaying ? 0 : Infinity, 
          duration: 2 
        }}
        onClick={togglePlay}
        className={`fixed bottom-6 left-6 z-50 flex items-center gap-4 bg-black/80 backdrop-blur-md px-6 py-4 rounded-full transition-all group ${
          isPlaying ? 'border border-neon-gold/30 shadow-[0_0_15px_rgba(255,215,0,0.15)]' : 'border border-white/20'
        }`}
      >
        <div className="relative flex items-center justify-center">
          {isPlaying ? (
            <Volume2 size={28} className="text-neon-gold" />
          ) : (
            <VolumeX size={28} className="text-white/80 group-hover:text-white" />
          )}
          
          {/* Ondas sonoras animadas si está sonando */}
          {isPlaying && (
            <motion.div 
              className="absolute inset-0 rounded-full border border-neon-gold"
              animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          )}
        </div>

        <span className="font-heading tracking-widest text-sm uppercase text-white/90 group-hover:text-white transition-colors">
          {isPlaying ? 'Vibra On' : 'Activar Música'}
        </span>
      </motion.button>
    </div>
  )
}

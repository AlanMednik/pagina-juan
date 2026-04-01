import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowDown } from 'lucide-react'

export const Hero = () => {
  const heroRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })

  const videoScale    = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const videoOpacity  = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.5, 0])
  const videoBlur     = useTransform(scrollYProgress, [0, 1], [0, 10])
  const contentY      = useTransform(scrollYProgress, [0, 1], ['0%', '-25%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* VIDEO COVER — no black bars */}
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden"
        style={{ scale: videoScale, opacity: videoOpacity }}
      >
        <motion.div
          style={{
            filter: useTransform(videoBlur, (v) => `blur(${v}px)`),
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100vw',
            height: '56.25vw',
            minHeight: '100vh',
            minWidth: '177.78vh',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <iframe
            src="https://www.youtube.com/embed/UDn-wVM-L98?autoplay=1&mute=1&controls=0&loop=1&playlist=UDn-wVM-L98&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1"
            title="Pedaleando Me Voy background"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
          />
        </motion.div>
        {/* Vignette — only edges, keeps center clear */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(0,0,0,0.6)_100%)]" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-asphalt to-transparent" />
      </motion.div>

      {/* CONTENT */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-20 text-center px-6 max-w-6xl mx-auto flex flex-col items-center"
      >
        {/* Badge — dark pill so it reads over any video */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="px-6 py-2 bg-black/70 backdrop-blur-sm border border-white/20 rounded-full text-white font-heading tracking-widest text-sm uppercase">
            🔧 El Mecánico del Parque Avellaneda
          </span>
        </motion.div>

        {/* LOGO — the visual hero, dominates the screen */}
        <motion.img
          src="/img/logo-hero.png"
          alt="Pedaleando Me Voy"
          className="w-[320px] md:w-[500px] lg:w-[640px] xl:w-[720px] mx-auto mb-8
                     drop-shadow-[0_0_60px_rgba(255,215,0,0.35)]
                     filter brightness-110"
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Headline — secondary, subtle */}
        <h1 className="sr-only">Bicicletería de Juan — Pedaleando Me Voy</h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          className="text-base md:text-lg text-white/60 max-w-lg mx-auto mb-10 font-light tracking-wide"
        >
          Mecánica especializada donde estés. En{' '}
          <span className="text-neon-gold font-medium">tu casa</span> o en{' '}
          <span className="text-neon-green font-medium">el parque</span>.
          {' '}Trabajo rápido con buena vibra.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="https://wa.me/5491161135826"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-neon-gold text-asphalt font-heading px-12 py-4 rounded-full text-xl
                       shadow-[0_0_30px_rgba(255,215,0,0.5)]
                       hover:shadow-[0_0_60px_rgba(255,215,0,0.8)]
                       transition-all transform hover:scale-105 active:scale-95"
          >
            ESCRIBIME AHORA
          </a>
          <a
            href="#services"
            className="border-2 border-white/30 hover:border-neon-gold text-white
                       px-12 py-4 rounded-full text-xl font-heading
                       transition-all backdrop-blur-sm hover:bg-white/5"
          >
            MIS SERVICIOS
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center opacity-50"
      >
        <span className="text-xs uppercase tracking-widest mb-2 font-heading text-white">Scroll</span>
        <ArrowDown size={14} className="text-neon-gold" />
      </motion.div>

      {/* Rasta strip */}
      <div className="absolute right-0 top-1/3 h-48 w-1 flex flex-col z-20 opacity-40">
        <div className="flex-1 bg-neon-red" />
        <div className="flex-1 bg-neon-gold" />
        <div className="flex-1 bg-neon-green" />
      </div>
    </section>
  )
}

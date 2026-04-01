import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { BikeBg } from './BikeBg'

export const JuanSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const photoY = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const textY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="juan" ref={containerRef} className="py-40 bg-asphalt overflow-hidden relative">
      <BikeBg type="wrench" position="right" size={500} opacity={0.05} />
      {/* Background Text */}
      <div className="absolute top-0 left-0 w-full overflow-hidden select-none pointer-events-none opacity-5">
        <span className="text-[20rem] font-heading whitespace-nowrap -translate-x-1/2">
          CONOCÉ EL HOMBRE DETRÁS DE LAS HERRAMIENTAS
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
        {/* Photo Column */}
        <motion.div 
          style={{ y: photoY }}
          className="relative group"
        >
          <div className="relative aspect-square md:aspect-[4/5] rounded-[2rem] overflow-hidden neon-border-red">
            <img
              src="/img/juan-bio.png"
              alt="Juan - El Bicicletero"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-transparent to-transparent" />
          </div>
          
          {/* Drifting stats */}
          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute -right-10 top-20 bg-neon-gold p-6 rounded-2xl text-asphalt rotate-6 z-20 shadow-2xl"
          >
            <div className="text-sm font-heading opacity-50 uppercase tracking-widest">Desde</div>
            <div className="text-4xl font-heading">2015</div>
            <div className="text-sm font-heading opacity-50 uppercase tracking-widest">Rodando</div>
          </motion.div>
        </motion.div>

        {/* Text Column */}
        <motion.div style={{ y: textY }} className="z-10">
          <span className="text-neon-red font-heading tracking-widest text-sm mb-4 block uppercase font-bold">
            Pura Vida & Herramientas
          </span>
          <h2 className="text-6xl md:text-8xl font-heading mb-10 leading-none">
            SOY <br/><span className="text-neon-gold text-glow-gold italic">JUAN</span>
          </h2>
          
          <div className="space-y-6 text-white/70 text-lg leading-relaxed font-body">
            <p>
              ¡Hola! Soy Juan, amante de las bicicletas y la buena música. Decidí que tu tiempo vale oro y por eso <span className="text-white font-bold">Pedaleando Me Voy</span> es un servicio pensado para tu comodidad.
            </p>
            <p>
              No hace falta que vengas al taller: yo trabajo directamente en el <span className="text-neon-green">Parque Avellaneda</span>, o si preferís, paso por tu casa a buscar la bici, la dejo como nueva y te la devuelvo lista para rodar.
            </p>
            <p className="italic">
              Cubro los barrios de Villa Luro, Parque Avellaneda, Flores, Floresta y Mataderos. Mi taller es el asfalto y mi techo es el cielo.
            </p>
          </div>

          <div className="flex gap-4 mt-12 flex-wrap">
            {['Pasión', 'Honestidad', 'Paciencia', 'One Love'].map((pill, i) => (
              <span key={i} className="px-4 py-2 bg-asphalt-light-light rounded-full border border-white/5 text-sm font-heading tracking-widest uppercase hover:text-neon-gold transition-colors">
                {pill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

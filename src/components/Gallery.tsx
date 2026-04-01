import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const images = [
  { src: '/img/parque.png',       label: 'Taller móvil en el parque',    span: 'col-span-2 row-span-2' },
  { src: '/img/herramientas.png', label: 'Herramientas profesionales',    span: 'col-span-1 row-span-1' },
  { src: '/img/bici-lista.png',   label: 'Rodando con estilo',            span: 'col-span-1 row-span-1' },
  { src: '/img/rueda.png',        label: 'Ajuste de rayos',               span: 'col-span-1 row-span-1' },
  { src: '/img/logo.png',         label: 'Pura vida en cada arreglo',     span: 'col-span-1 row-span-1' },
  { src: '/img/juan-bio.png',     label: 'El maestro en acción',          span: 'col-span-2 row-span-1' },
]

export const Gallery = () => {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-40, 40])

  return (
    <section id="galeria" ref={ref} className="py-32 px-6 bg-asphalt-light overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-heading mb-4"
          >
            MI <span className="text-neon-green italic">TRABAJO</span>
          </motion.h2>
          <p className="text-white/40 uppercase tracking-[0.2em] text-sm font-heading">
            Fotos de la cancha — sin filtros, todo real
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[220px] gap-4">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              style={{ y: i % 2 === 0 ? y : undefined }}
              className={`${img.span} relative rounded-3xl overflow-hidden group cursor-pointer`}
            >
              <img
                src={img.src}
                alt={img.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-asphalt/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="font-heading text-xl tracking-tight text-white">{img.label}</span>
              </div>
              {/* Neon border flash on hover */}
              <div className="absolute inset-0 rounded-3xl border border-neon-gold/0 group-hover:border-neon-gold/40 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

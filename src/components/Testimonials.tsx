import { Star, Quote } from 'lucide-react'
import { motion } from 'framer-motion'

const reviews = [
  {
    name: 'Marcos G.',
    role: 'Mountain Bike User',
    text: 'Juan me arregló la bici en el parque mientras yo tomaba unos mates. Un genio, quedó impecable y el precio muy justo.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    name: 'Sofi R.',
    role: 'City Cruiser',
    text: 'Lo llamé por un pinchazo en casa y llegó al toque. Súper profesional y se nota que sabe mucho de bicis viejas.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    name: 'Pedro L.',
    role: 'Road Cycling',
    text: 'Excelente servicio. La vibra de Juan es lo mejor. Me dejó la transmisión como nueva, ni se escucha el roce.',
    avatar: 'https://randomuser.me/api/portraits/men/46.jpg'
  },
  {
    name: 'Ana V.',
    role: 'Bici Urbana',
    text: 'El mejor bicicletero de la zona. Trabajo prolijo y súper transparente. 100% recomendado.',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
  },
  {
    name: 'Carlos M.',
    role: 'MTB Rider',
    text: 'Me pasó de todo en un paseo y Juan llegó en 20 minutos. Tiene todo el equipo. Una máquina.',
    avatar: 'https://randomuser.me/api/portraits/men/55.jpg'
  },
  {
    name: 'Laura P.',
    role: 'Ciclista Urbana',
    text: 'Super recomendable, muy amable y honesto con los precios. No te cobra de más. Volvería mil veces.',
    avatar: 'https://randomuser.me/api/portraits/women/22.jpg'
  },
]

// Triplicated so the loop is seamless at any screen width
const loopedReviews = [...reviews, ...reviews, ...reviews]

export const Testimonials = () => {
  return (
    <section className="py-40 bg-asphalt-light overflow-hidden relative">
      {/* Bike wheel background animation */}
      <BikeWheelBg />

      <div className="max-w-7xl mx-auto px-6 mb-20 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-heading mb-4 italic"
        >
          QUIEN LO SIENTE <span className="text-neon-green">LO SABE</span>
        </motion.h2>
        <p className="text-white/40 uppercase tracking-widest text-sm font-heading">
          Como decía Bob Marley: "Who feels it, knows it"
        </p>
      </div>

      {/* Seamless infinite marquee — no gap, triple set so any width works */}
      <div className="relative z-10 overflow-hidden">
        <div className="marquee-track">
          {loopedReviews.map((review, i) => (
            <TestimonialCard key={i} review={review} />
          ))}
        </div>
      </div>
    </section>
  )
}

const TestimonialCard = ({ review }: { review: typeof reviews[0] }) => (
  <div className="marquee-card w-[380px] shrink-0 bg-asphalt p-8 rounded-[2rem] border border-white/5 relative group/card hover:border-neon-gold/30 transition-colors">
    <Quote className="absolute top-6 right-8 text-white/4 w-14 h-14" />

    <div className="flex gap-1 mb-5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={14} className="fill-neon-gold text-neon-gold" />
      ))}
    </div>

    <p className="text-lg font-body italic text-white/75 leading-relaxed mb-7">
      "{review.text}"
    </p>

    <div className="flex items-center gap-3">
      <img
        src={review.avatar}
        alt={review.name}
        className="w-11 h-11 rounded-full border-2 border-neon-gold"
      />
      <div>
        <div className="font-heading text-lg tracking-tight">{review.name}</div>
        <div className="text-xs text-white/35 uppercase tracking-widest">{review.role}</div>
      </div>
    </div>
  </div>
)

// Animated wheel SVG that floats in the background
const BikeWheelBg = () => (
  <motion.div
    className="absolute right-[-80px] top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none select-none"
    animate={{ rotate: 360 }}
    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
  >
    <svg width="500" height="500" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" stroke="white" strokeWidth="2"/>
      <circle cx="50" cy="50" r="5" stroke="white" strokeWidth="2"/>
      {/* Spokes */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180
        return (
          <line
            key={i}
            x1={50 + 5 * Math.cos(angle)}
            y1={50 + 5 * Math.sin(angle)}
            x2={50 + 47 * Math.cos(angle)}
            y2={50 + 47 * Math.sin(angle)}
            stroke="white"
            strokeWidth="0.8"
          />
        )
      })}
    </svg>
  </motion.div>
)

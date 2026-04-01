import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { BikeBg } from './BikeBg'

export const Stats = () => {
  const stats = [
    { label: 'BICIS ARREGLADAS', value: 500, suffix: '+' },
    { label: 'BUENA ONDA', value: 100, suffix: '%' },
    { label: 'LOCAL FIJO', value: 0, suffix: '' },
    { label: 'SOPORTE WHATSAPP', value: 24, suffix: '/7' },
  ];

  return (
    <section className="py-20 border-y border-white/5 bg-asphalt-light-light relative overflow-hidden">      
      <BikeBg type="gear" position="left" size={350} opacity={0.05} speed={20} />
      <BikeBg type="gear" position="right" size={220} opacity={0.04} speed={14} />
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
        {stats.map((stat, idx) => (
          <Counter key={idx} stat={stat} />
        ))}
      </div>
    </section>
  )
}

const Counter = ({ stat }: { stat: any }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = stat.value;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, stat.value]);

  return (
    <div ref={ref} className="group cursor-default">
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="text-5xl md:text-7xl font-heading text-neon-gold mb-2 group-hover:scale-110 transition-transform text-shadow-glow"
      >
        {count}{stat.suffix}
      </motion.div>
      <div className="text-white/40 font-heading tracking-widest text-sm uppercase md:text-base">
        {stat.label}
      </div>
    </div>
  );
}

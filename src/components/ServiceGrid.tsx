import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Wrench, Bike, Zap, Droplets } from 'lucide-react'
import { BikeBg } from './BikeBg'

const services = [
  {
    title: 'SERVICE GENERAL',
    desc: 'Ajuste de frenos, cambios, lubricación de cadena y control de presión. Todo lo que tu bici necesita para rodar suave.',
    icon: Wrench,
    color: 'neon-gold'
  },
  {
    title: 'PONCHADURAS',
    desc: 'Reparación de cámaras o cambio por nuevas en el momento. No te quedes a pata en medio del paseo.',
    icon: Bike,
    color: 'neon-green'
  },
  {
    title: 'TRANSMISIÓN',
    desc: 'Limpieza profunda de piñones, platos y cadena. Cambio de cables y fundas para cambios perfectos.',
    icon: Zap,
    color: 'neon-red'
  },
  {
    title: 'FRENOS HIDRÁULICOS',
    desc: 'Purga y cambio de líquido para frenos de disco. Máxima seguridad para tus descensos.',
    icon: Droplets,
    color: 'neon-gold'
  }
];

export const ServiceGrid = () => {
  return (
    <section id="services" className="py-32 px-6 relative overflow-hidden">
      <BikeBg type="wheel" position="left" size={500} opacity={0.03} speed={40} />
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <h2 className="text-5xl md:text-7xl font-heading mb-4">
            MIS <span className="text-neon-gold italic">SERVICIOS</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto font-body uppercase tracking-[0.2em] text-sm">
            Mecánica integral móvil para todo tipo de bicicletas
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <ServiceCard key={idx} service={service} index={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}

const ServiceCard = ({ service, index }: { service: any, index: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="group relative h-[400px] rounded-3xl bg-asphalt-light p-8 border border-white/5 overflow-hidden transition-colors hover:border-white/20"
    >
      <div className={`absolute top-0 left-0 w-full h-1 bg-${service.color}/50`} />
      <div 
        style={{ transform: 'translateZ(50px)' }}
        className="flex flex-col h-full"
      >
        <div className={`mb-8 p-4 rounded-2xl bg-asphalt inline-block self-start group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(0,0,0,0.5)]`}>
          <service.icon className={`w-10 h-10 text-${service.color}`} />
        </div>
        
        <h3 className="text-3xl font-heading mb-4 text-glow-gold">{service.title}</h3>
        <p className="text-white/60 leading-relaxed font-body text-sm">
          {service.desc}
        </p>
        
        <div className="mt-auto pt-6 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className={`text-${service.color} font-heading tracking-widest text-xs uppercase`}>
            Consultar Presupuesto
          </span>
        </div>
      </div>

      {/* Gloss Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none group-hover:from-white/10" />
    </motion.div>
  );
}

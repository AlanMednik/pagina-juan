import { motion } from 'framer-motion'
import { MapPin, Clock, Truck, Send } from 'lucide-react'
import YouTube from 'react-youtube'
import { BikeBg } from './BikeBg'

export const Contact = () => {
  const details = [
    { icon: MapPin, label: 'Punto de Encuentro', value: 'Parque Avellaneda (Cerca del Antiguo Natatorio)', color: 'neon-green' },
    { icon: Clock, label: 'Horarios', value: 'Lun a Sáb: 10:00 - 19:00', color: 'neon-gold' },
    { icon: Truck, label: 'A Domicilio', value: 'Consultar zona de cobertura', color: 'neon-red' },
  ];

  return (
    <section id="contact" className="py-40 px-6 bg-asphalt relative overflow-hidden">
      <BikeBg type="chain" position="center" size={700} opacity={0.04} />
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
        
        {/* Info Column */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <div className="mb-12">
            <h2 className="text-6xl md:text-8xl font-heading mb-6 tracking-tighter">¿NOS <span className="text-neon-gold italic text-glow-gold">VEMOS?</span></h2>
            <p className="text-white/60 text-xl font-body leading-relaxed max-w-lg">
              Escribime para coordinar. Podemos vernos en tu casa o encontrarnos en el punto de encuentro de Parque Avellaneda para un arreglo rápido al aire libre.
            </p>
          </div>

          <div className="space-y-8 mb-12">
            {details.map((detail, i) => (
              <div key={i} className="flex gap-6 items-start group">
                <div className={`p-4 rounded-2xl bg-asphalt-light border border-white/5 transition-colors group-hover:bg-asphalt-light-light shadow-[0_10px_30px_rgba(0,0,0,0.5)]`}>
                  <detail.icon className={`w-8 h-8 text-${detail.color}`} />
                </div>
                <div>
                  <div className="text-white/40 uppercase tracking-widest text-xs font-heading mb-1">{detail.label}</div>
                  <div className="text-xl font-heading tracking-tight text-white/90">{detail.value}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-[2.5rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 neon-border-red h-80 shadow-3xl">
             <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26257.252358241283!2d-58.51675392216693!3d-34.65074926104464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc971e76c85c7%3A0x11f078e0f40106c6!2sParque%20Avellaneda%2C%20C1407%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1774055698048!5m2!1ses-419!2sar" 
                className="w-full h-full border-0"
                loading="lazy"
              />
          </div>
        </motion.div>

        {/* Music Column */}
        <motion.div
           initial={{ opacity: 0, x: 50 }}
           whileInView={{ opacity: 1, x: 0 }}
           className="relative"
        >
          <div className="glass-morphism rounded-[3rem] p-12 h-full flex flex-col justify-between border-neon-gold/20 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
            <div>
              <span className="px-4 py-1 bg-neon-green/20 text-neon-green rounded-full font-heading tracking-widest text-xs uppercase mb-6 inline-block">Sintoniza la vibra</span>
              <h3 className="text-5xl font-heading mb-6 tracking-tighter">VIBRA <br/><span className="text-italic text-neon-gold">POSITIVA</span></h3>
              <p className="text-white/40 mb-10 font-body">
                ¿Necesitás pensarlo? Te dejo una lista con mucho reggae para que te relajes y disfrutes del momento mientras arreglamos tu nave.
              </p>
            </div>

            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-neon-red via-neon-gold to-neon-green rounded-[2.2rem] opacity-20 blur-xl group-hover:opacity-40 transition-opacity" />
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/10">
                <YouTube
                  videoId="gBGJ_mJ1BYQ"
                  opts={{
                    width: '100%',
                    height: '350',
                    playerVars: {
                      autoplay: 0,
                    }
                  }}
                  onPlay={() => {
                    window.dispatchEvent(new CustomEvent('musicControl', { detail: 'stop' }))
                  }}
                  className="w-full"
                />
              </div>
            </div>

            <div className="mt-12 flex justify-between items-center bg-asphalt p-4 rounded-full border border-white/5">
              <span className="font-heading text-white/50 tracking-widest px-6 uppercase text-sm">Próxima parada: Tu casa</span>
              <a 
                href="https://wa.me/5491161135826"
                className="bg-neon-gold text-asphalt p-4 rounded-full transform hover:rotate-12 transition-all hover:scale-110 shadow-lg"
              >
                <Send size={24} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

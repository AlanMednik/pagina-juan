import { Instagram, Facebook, Youtube, Send, Bike } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className="pt-32 pb-10 bg-asphalt-light border-t border-white/5 relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15 select-none pointer-events-none w-full max-w-3xl flex justify-center">
        <img src="/img/bici.gif" className="w-full mix-blend-screen object-contain" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-20 items-start mb-20">
        
        {/* Brand */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-neon-gold rounded-2xl transform shadow-2xl">
              <Bike className="text-asphalt w-8 h-8" />
            </div>
            <h3 className="text-4xl font-heading tracking-tighter text-rasta drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]">PEDALEANDO ME VOY</h3>
          </div>
          <p className="text-white/40 max-w-sm mb-10 font-body text-lg leading-relaxed">
            Mecánica de bicicletas móvil con la mejor energía. Tu bici merece rodar feliz y nosotros nos encargamos de que así sea. Pura vida en cada ajuste.
          </p>
          <div className="flex gap-4">
             {[
               { icon: Instagram, href: 'https://www.instagram.com/juan_rasta83/' },
               { icon: Facebook, href: '#' },
               { icon: Youtube, href: '#' }
             ].map((social, i) => (
                <a key={i} href={social.href} className="p-4 rounded-2xl bg-asphalt border border-white/5 hover:border-neon-gold transition-all hover:scale-110 shadow-lg group">
                  <social.icon className="w-6 h-6 text-white group-hover:text-neon-gold" />
                </a>
             ))}
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-heading text-2xl mb-8 tracking-widest text-neon-red">SECCIONES</h4>
          <ul className="space-y-4 font-heading text-lg tracking-widest uppercase">
            <li><a href="#home" className="text-white/50 hover:text-white transition-colors">Inicio</a></li>
            <li><a href="#services" className="text-white/50 hover:text-white transition-colors">Servicios</a></li>
            <li><a href="#juan" className="text-white/50 hover:text-white transition-colors">Sobre Juan</a></li>
            <li><a href="#contact" className="text-white/50 hover:text-white transition-colors">Contacto</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-heading text-2xl mb-8 tracking-widest text-neon-green">AYUDA</h4>
          <div className="space-y-6">
            <a 
               href="https://wa.me/5491161135826"
               className="group block p-6 rounded-3xl bg-asphalt border border-white/5 hover:border-neon-green/30 transition-all hover:bg-asphalt-light"
            >
              <div className="flex items-center gap-3 mb-2">
                <Send className="w-5 h-5 text-neon-green" />
                <span className="font-heading text-xl tracking-tighter text-neon-green">SOPORTE 24/7</span>
              </div>
              <p className="text-xs text-white/30 uppercase tracking-widest font-heading">Escribime por WhatsApp</p>
            </a>

            <div className="text-white/40 text-sm font-body">
              <p className="mb-2 uppercase tracking-widest font-heading text-xs">Zona de Cobertura</p>
              <p>Parque Avellaneda, Villa Luro, Flores, Floresta y Mataderos.</p>
            </div>
          </div>
        </div>

      </div>

      {/* Extreme Bottom */}
      <div className="max-w-7xl mx-auto px-6 border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between gap-6 items-center">
        <p className="text-white/20 font-body text-sm">© 2024 PEDALEANDO ME VOY - EL ARTE DE RODAR.</p>
        
        <div className="flex gap-1">
          <div className="w-8 h-1 bg-neon-red opacity-30" />
          <div className="w-8 h-1 bg-neon-gold opacity-30" />
          <div className="w-8 h-1 bg-neon-green opacity-30" />
        </div>

        <p className="text-white/20 font-body text-sm">DESIGNED BY VIRAL ARCHITECT GOD</p>
      </div>
      
    </footer>
  )
}

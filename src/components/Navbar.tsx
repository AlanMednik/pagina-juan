import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Bike } from 'lucide-react'

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#home' },
    { name: 'Servicios', href: '#services' },
    { name: 'Juan', href: '#juan' },
    { name: 'Contacto', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 py-4 ${
        isScrolled ? 'top-4' : 'top-0'
      }`}
    >
      <div 
        className={`max-w-7xl mx-auto flex items-center justify-between px-6 py-3 transition-all duration-500 ${
          isScrolled 
            ? 'glass-morphism rounded-full shadow-2xl scale-95 border-neon-gold/20' 
            : 'bg-transparent'
        }`}
      >
        <a href="#home" className="flex items-center gap-2 group">
          <div className="p-2 bg-neon-gold rounded-full transform group-hover:rotate-12 transition-transform">
            <Bike className="text-asphalt w-5 h-5" />
          </div>
          <span className="font-heading text-2xl tracking-tighter hidden sm:block text-rasta drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]">
            PEDALEANDO ME VOY
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              className="font-heading text-lg tracking-widest text-white/70 hover:text-neon-gold transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-gold transition-all group-hover:w-full" />
            </a>
          ))}
          <a 
            href="https://wa.me/5491161135826"
            className="bg-neon-green/90 hover:bg-neon-green text-asphalt font-heading px-6 py-2 rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-[0_4px_15px_rgba(0,200,83,0.3)]"
          >
            WHATSAPP
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden glass-morphism absolute top-20 left-6 right-6 rounded-3xl p-8 flex flex-col items-center gap-6 shadow-3xl"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-heading text-2xl tracking-widest hover:text-neon-gold"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="https://wa.me/5491161135826"
              className="w-full text-center bg-neon-green text-asphalt font-heading py-3 rounded-full"
            >
              WHATSAPP
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
const HeroSection = () => {
  return <section className="relative min-h-screen flex flex-col lg:flex-row">
      {/* LEFT COLUMN - Content Zone */}
      <div className="relative z-10 w-full lg:w-1/2 min-h-[60vh] lg:min-h-screen bg-black flex flex-col justify-center px-6 md:px-12 lg:px-16 xl:px-20 pt-28 pb-8 lg:pt-24 lg:pb-0">
        <div className="max-w-xl">
          {/* Logo */}
          <img src="/logo-barbie-kills.png" alt="Barbie Kills" className="w-48 md:w-64 lg:w-72 xl:w-80 mb-8 animate-fade-in" />

          {/* Headline */}
          <h1 className="font-bebas text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-none mb-6 animate-fade-in animation-delay-200">
            EMBLEMÁTICA.
            <br />
            <span className="neon-pink-text">AUTÊNTICA.</span>
            <br />
            ELEGANTE.
          </h1>

          {/* Subtitle */}
          <p className="font-oswald text-base md:text-lg lg:text-xl text-gray-300 mb-10 max-w-lg animate-fade-in animation-delay-400">
            A trilha sonora que transforma seu evento em um festival inesquecível.
          </p>

          {/* CTA Button */}
          <div className="animate-fade-in animation-delay-600">
            <Button variant="hero" size="xl" className="animate-glow-pulse" asChild>
              <a href="https://wa.me/5519981736659" target="_blank" rel="noopener noreferrer">CONTRATE</a>
            </Button>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN - Image Zone */}
      <div className="w-full lg:w-1/2 h-[50vh] lg:h-screen lg:absolute lg:right-0 lg:top-0">
        <img src="/Banda_Casamentos_Eventos-2.png" alt="Barbie Kills ao vivo" className="w-full h-full object-cover object-[center_top] lg:object-center" />
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-float hidden lg:flex">
        <a href="#historia" className="flex flex-col items-center gap-2 text-foreground/60 hover:text-neon-pink transition-colors">
          <span className="font-oswald text-xs uppercase tracking-widest">Descubra</span>
          <ChevronDown className="w-6 h-6" />
        </a>
      </div>
    </section>;
};
export default HeroSection;
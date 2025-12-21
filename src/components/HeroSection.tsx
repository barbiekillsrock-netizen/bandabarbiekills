import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
const HeroSection = () => {
  return <section className="relative min-h-screen flex flex-col lg:flex-row">
      {/* Mobile: Image on top */}
      <div className="lg:hidden h-[50vh] w-full relative">
        <img src="/show-banda-barbie-kills-ao-vivo.jpg" alt="Barbie Kills ao vivo" className="w-full h-full object-cover object-center" />
      </div>

      {/* LEFT COLUMN - Content Zone (Pure Black) */}
      <div className="w-full lg:w-1/2 bg-[#000000] flex flex-col justify-center p-8 md:p-12 lg:p-20">
        {/* Logo */}
        <img src="/logo-barbie-kills.png" alt="Barbie Kills" className="w-64 md:w-80 mb-8 self-start animate-fade-in" />

        {/* Headline */}
        <h1 className="font-bebas text-5xl md:text-6xl lg:text-7xl text-white leading-none mb-6 animate-fade-in animation-delay-200">
          EMBLEMÁTICA.
          <br />
          <span className="neon-pink-text">AUTÊNTICA.</span>
          <br />
          ELEGANTE.
        </h1>

        {/* Subtitle */}
        <p className="font-oswald text-lg md:text-xl text-gray-300 mb-10 max-w-lg animate-fade-in animation-delay-400">
          A trilha sonora que transforma seu evento em um festival inesquecível.
        </p>

        {/* CTA Button */}
        <div className="self-start animate-fade-in animation-delay-600">
          <Button variant="hero" size="xl" className="animate-glow-pulse" asChild>
            <a href="https://wa.me/5519981736659" target="_blank" rel="noopener noreferrer">CONTRATE</a>
          </Button>
        </div>
      </div>

      {/* RIGHT COLUMN - Visual Zone (Desktop only) */}
      <div className="hidden lg:block w-1/2 h-screen">
        <img src="/show-banda-barbie-kills-ao-vivo.jpg" alt="Barbie Kills ao vivo" className="w-full h-full object-cover object-center" />
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-float">
        <a href="#historia" className="flex flex-col items-center gap-2 text-foreground/60 hover:text-neon-pink transition-colors">
          <span className="font-oswald text-xs uppercase tracking-widest">Descubra</span>
          <ChevronDown className="w-6 h-6" />
        </a>
      </div>
    </section>;
};
export default HeroSection;
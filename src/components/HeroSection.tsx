import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import Logo from './Logo';
const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/show-banda-barbie-kills-ao-vivo.jpg"
          alt="Barbie Kills ao vivo"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-24">
        <div className="max-w-3xl">
          {/* Logo */}
          <div className="mb-8 animate-fade-in">
            <Logo size="lg" />
          </div>

          {/* Headline */}
          <h1 className="heading-display text-5xl md:text-7xl lg:text-8xl text-foreground mb-6 animate-fade-in animation-delay-200">
            EMBLEMÁTICA.
            <br />
            <span className="neon-pink-text">AUTÊNTICA.</span>
            <br />
            ELEGANTE.
          </h1>

          {/* Subtitle */}
          <p className="subtitle text-lg md:text-xl text-foreground/80 mb-10 max-w-xl animate-fade-in animation-delay-400">
            A trilha sonora que transforma seu evento em um festival inesquecível.
          </p>

          {/* CTA Button */}
          <div className="animate-fade-in animation-delay-600">
            <Button variant="hero" size="xl" className="animate-glow-pulse">
              Solicitar Orçamento
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-float">
        <a href="#historia" className="flex flex-col items-center gap-2 text-foreground/60 hover:text-neon-pink transition-colors">
          <span className="font-oswald text-xs uppercase tracking-widest">Descubra</span>
          <ChevronDown className="w-6 h-6" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;

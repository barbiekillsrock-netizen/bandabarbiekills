import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
const HeroSection = () => {
  return <section className="relative min-h-screen">
      {/* Background Image - Full screen */}
      <div className="absolute inset-0 w-full h-full">
        <img src="/Banda_Casamentos.png" alt="Barbie Kills ao vivo" className="w-full h-full object-cover object-[center_top] lg:object-[75%_center]" />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent lg:via-black/50 lg:to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-20">
        <div className="max-w-xl">
          {/* Logo */}
          <img src="/logo-barbie-kills.png" alt="Barbie Kills" className="w-48 md:w-64 lg:w-80 mb-8 animate-fade-in" />

          {/* Headline */}
          <h1 className="font-bebas text-4xl md:text-6xl lg:text-7xl text-white leading-none mb-6 animate-fade-in animation-delay-200">
            EMBLEMÁTICA.
            <br />
            <span className="neon-pink-text">AUTÊNTICA.</span>
            <br />
            ELEGANTE.
          </h1>

          {/* Subtitle */}
          <p className="font-oswald text-base md:text-xl text-gray-300 mb-10 max-w-lg animate-fade-in animation-delay-400">
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
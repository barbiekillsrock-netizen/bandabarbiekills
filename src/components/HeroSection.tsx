import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row">
      {/* LEFT COLUMN - Content Zone */}
      <div className="relative z-10 w-full lg:w-1/2 min-h-[60vh] lg:min-h-screen bg-black flex flex-col justify-center px-6 md:px-12 lg:px-16 xl:px-20 pt-28 pb-8 lg:pt-24 lg:pb-0">
        <div className="max-w-xl">
          {/* Logo */}
          <img
            src="/barbie-kills-banda-eventos-casamentos.webp"
            alt="Banda Barbie Kills em show para casamentos e eventos"
            width={600}
            height={214}
            className="w-48 md:w-64 lg:w-72 xl:w-80 mb-8 animate-fade-in"
            decoding="async"
          />

          {/* Decorative Headline */}
          <div className="font-bebas text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-none mb-6 animate-fade-in animation-delay-200">
            EMBLEMÁTICA.
            <br />
            <span className="neon-pink-text">AUTÊNTICA.</span>
            <br />
            ELEGANTE.
          </div>

          {/* H1 - Main SEO Title */}
          <h1 className="font-oswald text-base md:text-lg lg:text-xl text-foreground mb-4 max-w-lg animate-fade-in animation-delay-400">
            Barbie Kills: Banda Premium para Casamentos e Eventos em Campinas e SP
          </h1>
          <h2 className="font-oswald text-sm md:text-base lg:text-lg text-muted-foreground mb-10 max-w-lg animate-fade-in animation-delay-400">
            Um show de alta energia com o melhor do Pop, Rock, Música Brasileira, MPB, Samba Rock
          </h2>

          {/* CTA Button */}
          <div className="animate-fade-in animation-delay-600">
            <Button variant="hero" size="xl" className="animate-glow-pulse" asChild>
              <a href="https://wa.me/5519981736659" target="_blank" rel="noopener noreferrer">
                CONTRATE
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN - Image Zone */}
      <div className="w-full lg:w-1/2 min-h-[50vh] lg:h-screen lg:absolute lg:right-0 lg:top-0 overflow-hidden">
        <img
          src="/banda-casamentos-eventos-campinas-barbie-kills.webp"
          srcSet="/banda-casamentos-eventos-campinas-barbie-kills.webp 1200w"
          sizes="(max-width: 768px) 100vw, 50vw"
          alt="Show da banda de casamento Barbie Kills em Campinas e região"
          width={1200}
          height={1350}
          className="w-full h-full object-cover object-top lg:object-center"
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-float hidden lg:flex">
        <a
          href="#historia"
          className="flex flex-col items-center gap-2 text-foreground/60 hover:text-neon-pink transition-colors"
          aria-label="Rolar para a seção Nossa História"
        >
          <span className="font-oswald text-xs uppercase tracking-widest">Descubra</span>
          <ChevronDown className="w-6 h-6" />
        </a>
      </div>
    </section>
  );
};
export default HeroSection;

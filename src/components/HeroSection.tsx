import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* MOBILE: Background image with dark overlay */}
      <div
        className="absolute inset-0 lg:hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/banda-casamentos-eventos-campinas-barbie-kills.webp')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* DESKTOP: Image occupying ~60% from the right, with left fade mask */}
      <div
        className="hidden lg:block absolute top-0 right-0 w-[65%] h-full"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 30%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 30%)",
        }}
      >
        <img
          src="/banda-casamentos-eventos-campinas-barbie-kills.webp"
          srcSet="/banda-casamentos-eventos-campinas-barbie-kills.webp 1200w"
          sizes="65vw"
          alt="Show da banda de casamento Barbie Kills em Campinas e região"
          width={1200}
          height={1350}
          className="w-full h-full object-cover object-center"
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Content Layer - always on top */}
      <div className="relative z-10 w-full lg:w-1/2 min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-16 xl:px-20 pt-28 pb-8 lg:pt-24 lg:pb-0">
        <div className="max-w-xl">
          {/* Logo */}
          <img
            src="/barbie-kills-banda-eventos-casamentos.webp"
            alt="Logo Barbie Kills - Banda para Eventos Premium"
            width={320}
            height={120}
            // 1. Mantemos as larguras responsivas
            // 2. Removemos animações complexas se o site estiver travando (opcional)
            // 3. Garantimos que ele não tenha filtros inline
            className="w-48 md:w-64 lg:w-72 xl:w-80 h-auto object-contain animate-fade-in relative z-10"
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />

          {/* Decorative Headline */}
          <div
            className="font-bebas text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-6 animate-fade-in animation-delay-200"
            style={{ lineHeight: 1.1, letterSpacing: "-0.02em" }}
          >
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
            Um show de alta energia com o melhor do Pop, Rock, MPB e Samba Rock
          </h2>

          {/* CTA Button */}
          <div className="animate-fade-in animation-delay-600">
            <Button variant="hero" size="xl" className="animate-glow-pulse" asChild>
              <a href="https://wa.me/5519982846842" target="_blank" rel="noopener noreferrer">
                CONTRATE
              </a>
            </Button>
          </div>
        </div>
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

import { Award, Globe, Building2, Headphones } from "lucide-react";

const showFeatures = [
  {
    icon: Award,
    title: "EXPERIÊNCIA",
    description: "+14 anos de estrada em eventos de alto padrão.",
  },
  {
    icon: Globe,
    title: "MÚSICOS DE ELITE E PRESENÇA DE PALCO",
    description: "Fluentes em inglês para eventos internacionais.",
  },
  {
    icon: Building2,
    title: "TRADIÇÃO E SEGURANÇA EM EVENTOS",
    description: "Honda, Ambev, e grandes corporações confiam em nós.",
  },
  {
    icon: Headphones,
    title: "EQUIPAMENTOS",
    description: "Tecnologia de última geração em som e luz.",
  },
];

const UniqueShowSection = () => {
  return (
    <section className="py-16 lg:py-20 section-gradient">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          {/* O H2 PARA O GOOGLE (Invisível) - Focado na autoridade corporativa e pop rock */}
          <h2 className="sr-only">
            Tradição e Estrutura: Banda de Pop Rock para Eventos Corporativos e Internacionais
          </h2>

          {/* O TÍTULO VISUAL (Agora como <p> mantendo o design original) */}
          <p className="heading-display text-5xl md:text-6xl lg:text-7xl text-foreground mb-4">
            UM SHOW <span className="neon-pink-text">ÚNICO</span>
          </p>
          <p className="subtitle text-lg text-muted-foreground max-w-2xl mx-auto">
            O que nos torna a escolha certa para o seu evento
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {showFeatures.map((feature) => (
            <article
              key={feature.title}
              className="group relative p-8 rounded-2xl bg-card border border-white/5 hover:border-neon-pink/50 transition-all duration-500 hover-lift"
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-neon-pink/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 text-center">
                {/* Icon */}
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:border-neon-pink/50 group-hover:neon-pink-glow transition-all duration-500">
                    <feature.icon
                      className="w-8 h-8 text-foreground/60 group-hover:text-neon-pink transition-colors duration-300"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 className="heading-display text-2xl md:text-3xl text-foreground mb-4 group-hover:neon-pink-text transition-all duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-body text-base md:text-lg leading-relaxed">{feature.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UniqueShowSection;

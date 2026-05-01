const ManifestoSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-[#000000]">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Coluna da Esquerda - Imagem */}
          <div className="relative">
            <img
              src="/vocalista-banda-casamento.webp"
              alt="Vocalista da Banda Barbie Kills cantando em festa de casamento"
              width={600}
              height={600}
              className="w-full h-auto aspect-[4/5] lg:aspect-square object-cover rounded-3xl"
              loading="lazy"
              decoding="async"
            />
            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-neon-pink/20 to-transparent opacity-50 pointer-events-none" />
          </div>

          {/* Coluna da Direita - Manifesto */}
          <div className="flex flex-col justify-center">
            <div className="space-y-4">
              {/* O H2 INVISÍVEL PARA O GOOGLE - Focado em atrair o mercado corporativo e casamentos premium */}
              <h2 className="sr-only">
                Experiência Musical Premium para Casamentos e Eventos Corporativos em Campinas
              </h2>

              {/* O TEXTO VISUAL PARA O CLIENTE - Design e classes originais mantidas */}
              <p className="heading-display text-5xl md:text-6xl lg:text-7xl text-foreground leading-tight">
                Tocamos com <span className="neon-pink-text">ALMA.</span>
                <br />
                Unimos as <span className="neon-pink-text">PESSOAS.</span>
                <br />
                Transcendemos os <span className="neon-pink-text">SENTIMENTOS.</span>
              </p>
            </div>

            <p className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-xl">
              Nossa proposta entrega uma experiência musical única e incomparável, capaz de sensibilizar o público mais
              exigente com repertório seleto.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;

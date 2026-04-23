const HistorySection = () => {
  return (
    <section id="historia" className="py-16 lg:py-20 bg-[#050505]">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative group">
            <img
              src="/banda-eventos-campinas.webp"
              alt="Banda Barbie Kills ao vivo em evento corporativo em Campinas"
              width={600}
              height={600}
              className="w-full h-[500px] lg:h-[600px] object-cover rounded-lg shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-700"
              loading="lazy"
            />
            {/* Decorative Border */}
            <div className="absolute -inset-4 border border-neon-pink/20 rounded-lg -z-10 group-hover:border-neon-pink/40 transition-colors duration-500" />
          </div>

          {/* Content */}
          <div className="lg:pl-8">
            <div className="mb-8">
              {/* 1. O H2 PARA O GOOGLE (Invisível) - Focado no mercado B2B e gênero musical */}
              <h2 className="sr-only">Banda de Pop Rock para Eventos Corporativos e Premiações</h2>

              {/* 2. O TÍTULO VISUAL (Agora como <p> para manter o design premium) */}
              <p className="heading-display text-5xl md:text-6xl lg:text-7xl text-foreground">
                NOSSA <span className="neon-pink-text">HISTÓRIA</span>
              </p>
            </div>

            <div className="space-y-6 text-body text-lg leading-relaxed">
              <p>
                A banda The Barbie Kills consolidou sua posição como referência no mercado de{" "}
                <a href="/blog/banda-para-casamento-estrutura-tecnica" className="text-neon-pink hover:underline">
                  casamentos de alto padrão
                </a>{" "}
                e festas corporativas em São Paulo e Campinas. O grupo é liderado pela vocalista Mariana Chaib, que
                conquistou projeção nacional após sua trajetória na Rede Globo, e une elegância, técnica e uma energia
                contagiante no palco.
              </p>
              <p>
                Com uma identidade única, o projeto transita com naturalidade por clássicos do pop, rock, indie, soul,
                jazz e música brasileira. O histórico de mais de 600 shows nas principais casas do país, somado a um
                time de músicos renomados e um repertório de 150 músicas, garante uma entrega personalizada para um
                público seleto.
              </p>
              <p>
                Mais do que uma apresentação musical, a Barbie Kills entrega uma conexão genuína, transformando grandes
                eventos em experiências eternizadas pela excelência sonora e performance de palco.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
              <div className="text-center">
                <span className="heading-display text-4xl md:text-5xl neon-pink-text">+14</span>
                <p className="subtitle text-xs mt-2 text-muted-foreground">Anos de Estrada</p>
              </div>
              <div className="text-center">
                <span className="heading-display text-4xl md:text-5xl neon-pink-text">+600</span>
                <p className="subtitle text-xs mt-2 text-muted-foreground">Shows</p>
              </div>
              <div className="text-center">
                <span className="heading-display text-4xl md:text-5xl neon-pink-text">100%</span>
                <p className="subtitle text-xs mt-2 text-muted-foreground">Satisfação</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;

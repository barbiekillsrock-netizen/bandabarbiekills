const HistorySection = () => {
  return <section id="historia" className="py-24 lg:py-32 bg-[#050505]">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative group">
            <img src="/historia-banda-barbie-kills-campinas.jpg" alt="História da Banda Barbie Kills em Campinas" className="w-full h-[500px] lg:h-[600px] object-cover rounded-lg shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-700" />
            {/* Decorative Border */}
            <div className="absolute -inset-4 border border-neon-pink/20 rounded-lg -z-10 group-hover:border-neon-pink/40 transition-colors duration-500" />
          </div>

          {/* Content */}
          <div className="lg:pl-8">
            <h2 className="heading-display text-5xl md:text-6xl lg:text-7xl text-foreground mb-8">NOSSA <span className="neon-pink-text">HISTÓRIA</span></h2>

            <div className="space-y-6 text-body text-lg leading-relaxed">
              <p>A banda The Barbie Kills consolidou-se como referência no mercado de eventos de alto padrão, casamentos e festas corporativas. Liderada pela vocalista <span className="text-foreground font-medium">Mariana Chaib</span> — cuja projeção nacional teve início após sua participação na Rede Globo —, a banda une elegância, técnica e uma energia incomparável.</p>
              <p>O projeto destaca-se por uma identidade única que transita com sofisticação pelos clássicos do pop, rock, indie, soul, jazz e blues. Com um histórico de mais de 600 shows realizados nas principais casas do país, o grupo conta com um time de músicos renomados e um repertório vasto de 150 músicas, sempre focados em atender a um público seleto e exigente.</p>
              <p>Mais do que uma apresentação musical, a Barbie Kills entrega uma conexão genuína, transformando grandes eventos em experiências eternizadas pela excelência sonora e performance de palco.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
              <div className="text-center">
                <span className="heading-display text-4xl md:text-5xl neon-pink-text">+14</span>
                <p className="subtitle text-xs mt-2 text-muted-foreground">Anos de Estrada</p>
              </div>
              <div className="text-center">
                <span className="heading-display text-4xl md:text-5xl neon-pink-text">+500</span>
                <p className="subtitle text-xs mt-2 text-muted-foreground">Eventos</p>
              </div>
              <div className="text-center">
                <span className="heading-display text-4xl md:text-5xl neon-pink-text">100%</span>
                <p className="subtitle text-xs mt-2 text-muted-foreground">Satisfação</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HistorySection;
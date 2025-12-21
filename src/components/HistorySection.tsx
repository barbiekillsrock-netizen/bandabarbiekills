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
            <h2 className="heading-display text-5xl md:text-6xl lg:text-7xl neon-pink-text mb-8">NOSSA HISTÓRIA</h2>

            <div className="space-y-6 text-body text-lg leading-relaxed">
              <p>Liderada por Mariana Chaib, a Barbie Kills transcende sentimentos com mais de 14 anos de estrada, levando emoção e energia incomparáveis a cada apresentação.<span className="text-foreground font-medium">Mariana Chaib</span>, a Barbie Kills transcende sentimentos com mais de 12 anos de estrada, levando emoção e energia incomparáveis a cada apresentação.
              </p>
              <p>Nascida da paixão pela música que move multidões, a banda se consolidou como referência em eventos premium, casamentos inesquecíveis e festas corporativas de alto padrão.</p>
              <p>
                Com uma identidade única que mistura power, elegância e conexão genuína com o público, criamos momentos que ficam eternizados na memória de todos os presentes.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
              <div className="text-center">
                <span className="heading-display text-4xl md:text-5xl neon-pink-text">+13</span>
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
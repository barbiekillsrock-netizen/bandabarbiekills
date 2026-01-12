import { Star, Music, Heart, Users } from 'lucide-react';
const features = [{
  icon: Star,
  title: 'UMA BANDA DE ALTA PERFORMANCE',
  description: 'Tão eletrizante que faz cada convidado sentir que faz parte do show.'
}, {
  icon: Music,
  title: 'UM SHOW DE POP ROCK INTERATIVO',
  description: 'Que conecta as pessoas e transforma o ambiente em pura diversão, emoção e nostalgia e que não deixa ninguém parado.'
}, {
  icon: Heart,
  title: 'MOMENTOS INESQUECÍVEIS NA PISTA',
  description: 'Tão intensos que se transformam em memórias efetivadas guardadas para sempre.'
}, {
  icon: Users,
  title: 'MÚSICOS DE ELITE E PRESENÇA DE PALCO',
  description: 'Que sabem fazer a leitura da pista e que se adaptam à qualquer público.'
}];
const WhoHiresSection = () => {
  return <section id="diferencial" className="relative py-16 lg:py-20 overflow-hidden">
      {/* Parallax Background */}
      <div className="absolute inset-0 parallax-bg" style={{
      backgroundImage: 'url(/estrutura-show-banda-baile.jpg)'
    }} />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/80" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="heading-display text-5xl md:text-6xl lg:text-7xl text-foreground mb-4">QUEM NOS <span className="neon-pink-text">CONTRATA</span> PROCURA</h2>
          
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => <div key={feature.title} className="glass-card p-8 lg:p-10 rounded-2xl hover-lift group" style={{
          animationDelay: `${index * 100}ms`
        }}>
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-xl bg-neon-pink/10 flex items-center justify-center group-hover:bg-neon-pink/20 transition-colors duration-300">
                    <feature.icon className="w-8 h-8 text-neon-pink icon-glow" />
                  </div>
                </div>
                <div>
                  <h3 className="heading-display text-2xl md:text-3xl text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-body text-lg">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};
export default WhoHiresSection;
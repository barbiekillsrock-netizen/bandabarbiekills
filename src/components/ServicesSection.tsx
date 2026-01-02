import { Heart, Building2, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ServicesSection = () => {
  const whatsappLink = "https://wa.me/5519982318180?text=Ol%C3%A1%21%20Quero%20um%20or%C3%A7amento%20para%20meu%20evento.";

  return (
    <section id="servicos" className="py-0">
      {/* SECTION A: Wedding Parties */}
      <div className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-[#0a0010] via-[#150020] to-[#0a0010]">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-pink/30 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px]" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Heart className="w-12 h-12 text-neon-pink animate-pulse" />
            </div>
            
            <h2 className="heading-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-8">
              FESTAS DE CASAMENTO: <span className="neon-pink-text">A EXPERIÊNCIA BARBIE KILLS</span>
            </h2>
            
            <p className="text-body text-lg md:text-xl leading-relaxed text-muted-foreground mb-10 max-w-3xl mx-auto">
              Sua festa de casamento não é apenas um evento, é o show da sua vida. Entregamos uma performance de alta voltagem que tira os convidados da cadeira e transforma a pista em um festival particular. Com um repertório sofisticado de Pop e Rock, criamos uma conexão real que garante uma pista cheia até o último acorde.
            </p>
            
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button 
                size="xl" 
                className="bg-neon-pink hover:bg-neon-pink/90 text-white font-bold text-lg px-10 py-6 rounded-full shadow-[0_0_30px_rgba(255,0,128,0.5)] hover:shadow-[0_0_50px_rgba(255,0,128,0.7)] transition-all duration-300"
              >
                QUERO UMA FESTA INESQUECÍVEL
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* SECTION B: Corporate Events */}
      <div className="relative py-20 lg:py-28 overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-1/2 left-0 w-72 h-72 bg-purple-600/30 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-neon-pink/20 rounded-full blur-[120px]" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text Content */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Building2 className="w-10 h-10 text-purple-400" />
              </div>
              
              <h2 className="heading-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-8">
                EVENTOS CORPORATIVOS E <span className="text-purple-400">SHOWS EMPRESARIAIS</span>
              </h2>
              
              <p className="text-body text-lg leading-relaxed text-muted-foreground">
                Unimos o espírito do Rock com o profissionalismo absoluto exigido pelo mercado premium. Oferecemos infraestrutura de som e luz de alta performance, pontualidade rigorosa e um cronograma flexível para convenções e premiações. É entretenimento de alto nível que reforça o prestígio da sua marca.
              </p>
            </div>
            
            {/* Right: Trusted By Grid */}
            <div className="glass-card p-8 lg:p-10 rounded-2xl">
              <p className="subtitle text-sm text-muted-foreground mb-6 text-center uppercase tracking-widest">
                Trusted By
              </p>
              <div className="grid grid-cols-2 gap-6">
                {/* Honda Placeholder */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex items-center justify-center h-24 hover:bg-white/10 transition-colors">
                  <span className="heading-display text-2xl text-white/60">HONDA</span>
                </div>
                {/* Ambev Placeholder */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex items-center justify-center h-24 hover:bg-white/10 transition-colors">
                  <span className="heading-display text-2xl text-white/60">AMBEV</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION C: Ceremonies - Los Libres */}
      <div className="relative py-16 lg:py-20 overflow-hidden bg-gradient-to-r from-[#0a0805] via-[#12100a] to-[#0a0805]">
        {/* Gold ambient glow */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-amber-600/30 via-yellow-500/20 to-amber-600/30 rounded-full blur-[80px]" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="glass-card border-amber-500/20 bg-gradient-to-br from-amber-950/20 to-transparent p-8 lg:p-12 rounded-2xl">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500/20 to-yellow-600/10 flex items-center justify-center border border-amber-500/30">
                  <Music className="w-10 h-10 text-amber-400" />
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <h3 className="heading-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
                  CERIMÔNIAS COM <span className="text-amber-400">LOS LIBRES</span>
                </h3>
                
                <p className="text-body text-lg leading-relaxed text-muted-foreground max-w-3xl">
                  Para o momento do 'sim', o projeto acústico Los Libres traz uma curadoria personalizada. Redesenhamos clássicos do Pop e Rock com arranjos delicados e emocionantes, criando a atmosfera perfeita para uma cerimônia autêntica e sofisticada.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

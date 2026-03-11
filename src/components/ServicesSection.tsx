import { Heart, Building2, Music, ArrowUpRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import losLibresLogo from '@/assets/logo-los-libres.jpg';

const ServicesSection = () => {
  const whatsappLink = "https://wa.me/5519982318180?text=Ol%C3%A1%21%20Quero%20um%20or%C3%A7amento%20para%20meu%20evento.";

  return (
    <section id="servicos" className="relative py-16 lg:py-24 bg-gradient-to-b from-[#0a0010] via-[#0d0015] to-[#050505]">
      <span id="solucoes-musicais" className="absolute -top-20" />
      {/* Background glow */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-pink/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/15 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header with SEO keywords */}
        <header className="text-center mb-12">
          <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            NOSSAS <span className="neon-pink-text">SOLUÇÕES MUSICAIS</span>
          </h2>
          <p className="text-body text-muted-foreground max-w-2xl mx-auto">
            Entretenimento de <strong>alto padrão em Campinas</strong> e região para cada momento do seu evento
          </p>
        </header>

        {/* Tabs Component - visual navigation */}
        <Tabs defaultValue="casamentos" className="w-full max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 bg-[#0a0010] border border-white/10 rounded-xl p-1 mb-8 gap-1">
            <TabsTrigger 
              value="casamentos" 
              className="bg-transparent data-[state=active]:bg-neon-pink data-[state=active]:text-white data-[state=inactive]:bg-[#0a0010] rounded-lg py-3 px-4 font-bold uppercase tracking-wide text-sm transition-all border-0 shadow-none data-[state=active]:shadow-none"
            >
              <Heart className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Casamentos</span>
              <span className="sm:hidden">Casamento</span>
            </TabsTrigger>
            <TabsTrigger 
              value="corporativo"
              className="bg-transparent data-[state=active]:bg-neon-pink data-[state=active]:text-white data-[state=inactive]:bg-[#0a0010] rounded-lg py-3 px-4 font-bold uppercase tracking-wide text-sm transition-all border-0 shadow-none data-[state=active]:shadow-none"
            >
              <Building2 className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Corporativo</span>
              <span className="sm:hidden">Empresas</span>
            </TabsTrigger>
            <TabsTrigger 
              value="cerimonias"
              className="bg-transparent data-[state=active]:bg-neon-pink data-[state=active]:text-white data-[state=inactive]:bg-[#0a0010] rounded-lg py-3 px-4 font-bold uppercase tracking-wide text-sm transition-all border-0 shadow-none data-[state=active]:shadow-none"
            >
              <Music className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Cerimônias</span>
              <span className="sm:hidden">Cerimônia</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: Casamentos */}
          <TabsContent value="casamentos" className="mt-0 data-[state=inactive]:hidden" forceMount>
            <article className="glass-card rounded-2xl p-6 lg:p-10 border border-neon-pink/20 bg-gradient-to-br from-neon-pink/5 to-transparent" data-service="casamentos">
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                <div className="flex-1">
                  <h3 className="heading-display text-2xl lg:text-3xl text-foreground mb-4">
                    FESTAS DE <span className="neon-pink-text">CASAMENTO</span>
                  </h3>
                  <p className="text-body text-muted-foreground mb-6">
                    Transformamos sua festa no <strong>show da sua vida</strong> com performance de alta voltagem e repertório Pop/Rock.
                  </p>
                  
                  <ul className="space-y-3 mb-8" role="list">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-neon-pink flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground"><strong className="text-foreground">Música para Casamento</strong> em Campinas e Interior de SP</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-neon-pink flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Repertório sofisticado que <strong className="text-foreground">lota a pista</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-neon-pink flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Interação real com os convidados</span>
                    </li>
                  </ul>

                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <Button 
                      size="lg" 
                      className="bg-neon-pink hover:bg-neon-pink/90 text-white font-bold rounded-full shadow-[0_0_25px_rgba(255,0,128,0.4)] hover:shadow-[0_0_40px_rgba(255,0,128,0.6)] transition-all"
                    >
                      SOLICITAR ORÇAMENTO
                    </Button>
                  </a>
                </div>

                <div className="hidden lg:flex w-48 h-48 rounded-full bg-gradient-to-br from-neon-pink/20 to-purple-600/10 items-center justify-center border border-neon-pink/30">
                  <Heart className="w-20 h-20 text-neon-pink" />
                </div>
              </div>
            </article>
          </TabsContent>

          {/* Tab 2: Corporativo */}
          <TabsContent value="corporativo" className="mt-0 data-[state=inactive]:hidden" forceMount>
            <article className="glass-card rounded-2xl p-6 lg:p-10 border border-neon-pink/20 bg-gradient-to-br from-neon-pink/5 to-transparent" data-service="corporativo">
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                <div className="flex-1">
                  <h3 className="heading-display text-2xl lg:text-3xl text-foreground mb-4">
                    EVENTOS <span className="neon-pink-text">CORPORATIVOS</span>
                  </h3>
                  <p className="text-body text-muted-foreground mb-6">
                    Entretenimento premium para convenções e premiações com <strong>infraestrutura de som e luz</strong> de última geração.
                  </p>
                  
                  <ul className="space-y-3 mb-8" role="list">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-neon-pink flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground"><strong className="text-foreground">Evento em Campinas</strong> e Grande São Paulo</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-neon-pink flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Pontualidade e <strong className="text-foreground">cronograma flexível</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-neon-pink flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Shows para premiações e confraternizações</span>
                    </li>
                  </ul>

                  {/* Social Proof - Trusted By */}
                  <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10 mb-6">
                    <span className="text-xs text-muted-foreground uppercase tracking-widest">Trusted By:</span>
                    <div className="flex flex-wrap gap-3">
                      <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-2">
                        <span className="heading-display text-lg text-white/50">HONDA</span>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-2">
                        <span className="heading-display text-lg text-white/50">AMBEV</span>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-2">
                        <span className="heading-display text-lg text-white/50">HARLEY DAVIDSON</span>
                      </div>
                    </div>
                  </div>

                  <a href="/corporativo" className="inline-flex items-center gap-2 text-neon-pink font-oswald uppercase tracking-wider text-sm hover:underline transition-colors">
                    Conheça nossa página exclusiva para eventos corporativos <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>

                <div className="hidden lg:flex w-48 h-48 rounded-full bg-gradient-to-br from-neon-pink/20 to-purple-600/10 items-center justify-center border border-neon-pink/30">
                  <Building2 className="w-20 h-20 text-neon-pink" />
                </div>
              </div>
            </article>
          </TabsContent>

          {/* Tab 3: Cerimônias - Los Libres */}
          <TabsContent value="cerimonias" className="mt-0 data-[state=inactive]:hidden" forceMount>
            <article className="glass-card rounded-2xl p-6 lg:p-10 border border-neon-pink/20 bg-gradient-to-br from-neon-pink/5 to-transparent" data-service="cerimonias">
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                <div className="flex-1">
                  <h3 className="heading-display text-2xl lg:text-3xl text-foreground mb-4">
                    CERIMÔNIAS COM <span className="neon-pink-text">LOS LIBRES</span>
                  </h3>
                  <p className="text-body text-muted-foreground mb-6">
                    Curadoria personalizada e arranjos delicados em clássicos do Pop e Rock para uma <strong>cerimônia autêntica</strong>.
                  </p>
                  
                  <ul className="space-y-3 mb-8" role="list">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-neon-pink flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground"><strong className="text-foreground">Banda em Campinas</strong> para cerimônias elegantes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-neon-pink flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Projeto acústico <strong className="text-foreground">Unplugged Folk</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-neon-pink flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Repertório personalizado para o momento do 'sim'</span>
                    </li>
                  </ul>

                  <a 
                    href="https://bandaloslibres.netlify.app" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="border-neon-pink/50 text-neon-pink hover:bg-neon-pink/10 font-bold rounded-full transition-all group"
                    >
                      CONHEÇA A PROPOSTA COMPLETA
                      <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Button>
                  </a>
                </div>

                {/* Los Libres Logo */}
                <a 
                  href="https://bandaloslibres.netlify.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-40 h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-2 border-neon-pink/30 shadow-[0_0_30px_rgba(255,0,128,0.2)] hover:shadow-[0_0_40px_rgba(255,0,128,0.4)] transition-all"
                >
                  <img 
                    src={losLibresLogo} 
                    alt="Barbie Kills - Banda Barbie Kills - Show em Holambra e Artur Nogueira"
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </a>
              </div>
            </article>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ServicesSection;

import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Check, Music, Zap, Mic } from "lucide-react";
import Navbar from "@/components/Navbar";
import losLibresLogo from "@/assets/logo-banda-cerimonia-coquetel.webp";
import WhatsAppButton from "@/components/WhatsAppButton";

const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const Footer = lazy(() => import("@/components/Footer"));

const LazySkeleton = () => <div className="min-h-[200px] bg-background" />;

const SITE_URL = "https://www.bandabarbiekills.com.br";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Banda para Eventos Corporativos - Barbie Kills",
  description:
    "Show premium com painel de LED e logística completa para eventos corporativos em SP, Campinas e Interior.",
  provider: {
    "@type": "MusicGroup",
    "@id": `${SITE_URL}/#band`,
  },
  areaServed: [
    "São Paulo",
    "Campinas",
    "Alphaville",
    "Barueri",
    "Holambra",
    "Itu",
    "Jundiaí",
    "Indaiatuba",
    "Vinhedo",
    "Valinhos",
    "Sorocaba",
    "Paulínia",
    "Piracicaba",
    "Americana",
    "Louveira",
    "Jaguariúna",
    "Atibaia",
    "Bragança Paulista",
    "São Caetano do Sul",
    "Limeira",
    "Santana de Parnaíba",
  ],
  serviceType: "Entretenimento Musical Corporativo",
};

const whatsappLink =
  "https://wa.me/5519981736659?text=Ol%C3%A1%21%20Gostaria%20de%20um%20or%C3%A7amento%20para%20evento%20corporativo.";

const Corporativo = () => {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Helmet>
        <title>Banda para Eventos Corporativos em SP, Campinas e Região</title>
        <meta
          name="description"
          content="Contratar banda para evento corporativo? A Barbie Kills oferece show premium, painel de LED e logística completa para festas em todo o estado de SP."
        />
        <link rel="alternate" hrefLang="pt-br" href="https://www.bandabarbiekills.com.br/corporativo" />
        <link rel="canonical" href="https://www.bandabarbiekills.com.br/corporativo" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.bandabarbiekills.com.br/corporativo" />
        <meta property="og:title" content="Banda para Eventos Corporativos em SP, Campinas e Região" />
        <meta
          property="og:description"
          content="Contratar banda para evento corporativo? A Barbie Kills oferece show premium, painel de LED e logística completa para festas em todo o estado de SP."
        />
        <meta property="og:image" content="https://www.bandabarbiekills.com.br/corporativo/banda-evento-sp.webp" />
        <meta property="og:site_name" content="Barbie Kills" />
        <meta property="og:locale" content="pt_BR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Banda para Eventos Corporativos em SP, Campinas e Região" />
        <meta name="twitter:description" content="Show premium e logística completa para eventos corporativos." />
        <meta name="twitter:image" content="https://www.bandabarbiekills.com.br/corporativo/banda-evento-sp.webp" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Helmet>

      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#050505] via-[#0B0015] to-[#020005]">
        <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl pt-24">
          <img
            src="/barbie-kills-banda-eventos-casamentos.webp"
            alt="Banda Barbie Kills em show para casamentos e eventos"
            width={280}
            height={100}
            className="w-48 md:w-64 mx-auto mb-8 animate-fade-in"
          />
          <h1 className="heading-display text-2xl md:text-3xl lg:text-4xl text-foreground mb-4 animate-fade-in animation-delay-200 max-w-3xl mx-auto">
            Contratar Banda para Evento Corporativo: <span className="neon-pink-text">Show Premium</span> e
            Infraestrutura
          </h1>
          <p className="font-oswald text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in animation-delay-400">
            Leve a energia da Barbie Kills para sua convenção com a segurança de mais de 600 shows realizados para as
            maiores marcas do Brasil
          </p>
          <div className="animate-fade-in animation-delay-600">
            <Button variant="hero" size="xl" className="animate-glow-pulse" asChild>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                Solicitar Orçamento
              </a>
            </Button>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <span className="text-xs text-muted-foreground uppercase tracking-widest w-full mb-2">Trusted By</span>
            {["HONDA", "AMBEV", "DEFENSORIA PÚBLICA SP", "TRIUMPH", "HARLEY DAVIDSON"].map((brand) => (
              <div key={brand} className="bg-white/5 border border-white/10 rounded-lg px-5 py-2.5">
                <span className="heading-display text-sm md:text-base text-white/50">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIÊNCIA SOB MEDIDA ── */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-[#050505] via-[#0B0015] to-[#020005]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-center max-w-6xl mx-auto">
            <div className="flex-1">
              <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
                Banda para Festa Corporativa em <span className="neon-pink-text">SP, Campinas e Interior</span>
              </h2>
              <h3 className="font-oswald text-xl text-neon-pink mb-4">
                Música Planejada para Cada Momento do Cronograma
              </h3>
              <p className="text-body text-lg text-muted-foreground leading-relaxed">
                Não entregamos apenas um show, mas uma trilha sonora estratégica desenhada para o sucesso do seu evento
                corporativo. Nossa expertise permite adaptar o repertório com precisão: desde a sobriedade necessária
                para um <strong>welcome coffee</strong> ou coquetel de networking, até a elegância de um jantar de gala
                ou a explosão de energia de uma premiação de final de ano. Com músicos fluentes em inglês, garantimos
                uma comunicação bilíngue impecável, ideal para recepções com executivos internacionais e multinacionais
                sediadas em <strong>Campinas, São Paulo e nos principais polos industriais do interior paulista</strong>
                . Entendemos que cada minuto do seu cronograma é vital, por isso trabalhamos em total sinergia com o
                cerimonial e a produção do evento.
              </p>
            </div>
            <div className="flex-1 w-full">
              <div className="rounded-2xl overflow-hidden border border-neon-pink/20 shadow-[0_0_40px_rgba(255,0,128,0.1)]">
                <img
                  src="/corporativo/banda-evento-sp.webp"
                  alt="Banda Barbie Kills em show para evento corporativo premium em Campinas SP"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── IMPACTO VISUAL E LED ── */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-[#020005] via-[#0a0010] to-[#050505]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row-reverse gap-12 items-center max-w-6xl mx-auto">
            <div className="flex-1">
              <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
                <span className="neon-pink-text">Infraestrutura Turn-Key</span> com Painel de LED
              </h2>
              <h3 className="font-oswald text-xl text-neon-pink mb-4">
                Painel de LED de Alta Definição e Suporte Visual
              </h3>
              <p className="text-body text-lg text-muted-foreground leading-relaxed">
                {`Elevamos o padrão visual do seu evento com uma infraestrutura de painel de LED de alta definição própria, eliminando a necessidade de múltiplos fornecedores. Nossa solução permite a exibição estratégica de logotipos, vídeos institucionais de alta resolução, conteúdos de motion graphics e apresentações personalizadas, integrando a identidade visual da sua marca diretamente à performance musical. Essa sinergia entre som e imagem cria uma experiência imersiva e profissional, ideal para lançamentos de produtos, premiações corporativas e convenções de vendas que exigem um palco impactante e alinhado ao branding da empresa.`}
              </p>
            </div>
            <div className="flex-1 w-full">
              <div className="rounded-2xl overflow-hidden border border-neon-pink/20 shadow-[0_0_40px_rgba(255,0,128,0.1)]">
                <img
                  src="/corporativo/contratar-banda-evento.webp"
                  alt="banda para eventos corporativos interior sp"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOLUÇÕES MUSICAIS ── */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-[#050505] via-[#0B0015] to-[#020005]">
        <div className="container mx-auto px-6">
          <header className="text-center mb-12">
            <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
              Soluções Musicais: <span className="neon-pink-text">Do Welcome Coffee à Confraternização</span>
            </h2>
          </header>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <article className="glass-card rounded-2xl p-8 border border-neon-pink/20 bg-gradient-to-br from-neon-pink/5 to-transparent hover-lift text-center">
              <a
                href="https://bandaloslibres.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="block mb-6"
              >
                <img
                  src={losLibresLogo}
                  alt="banda para festa corporativa sp"
                  width={120}
                  height={120}
                  className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-neon-pink/30"
                  loading="lazy"
                />
              </a>
              <div className="w-12 h-12 rounded-xl bg-neon-pink/10 flex items-center justify-center mx-auto mb-4">
                <Music className="w-6 h-6 text-neon-pink" />
              </div>
              <h3 className="heading-display text-xl text-foreground mb-3">Recepção & Networking</h3>
              <p className="text-body text-muted-foreground text-sm">
                Jazz, Soul e Pop Acústico com volume controlado. A trilha perfeita para facilitar o diálogo entre
                executivos e criar uma atmosfera de networking sofisticada.
              </p>
              <a
                href="https://bandaloslibres.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-neon-pink font-oswald text-sm uppercase tracking-wider hover:underline"
              >
                Los Libres →
              </a>
            </article>
            <article className="glass-card rounded-2xl p-8 border border-neon-pink/20 bg-gradient-to-br from-neon-pink/5 to-transparent hover-lift text-center">
              <div className="w-12 h-12 rounded-xl bg-neon-pink/10 flex items-center justify-center mx-auto mb-4 mt-6">
                <Zap className="w-6 h-6 text-neon-pink" />
              </div>
              <h3 className="heading-display text-xl text-foreground mb-3">Confraternização & Pista</h3>
              <p className="text-body text-muted-foreground text-sm">
                Performance eletrizante com leitura de pista impecável para todas as faixas etárias. Foco total em
                integração e celebração de resultados.
              </p>
            </article>
            <article className="glass-card rounded-2xl p-8 border border-neon-pink/20 bg-gradient-to-br from-neon-pink/5 to-transparent hover-lift text-center">
              <div className="w-12 h-12 rounded-xl bg-neon-pink/10 flex items-center justify-center mx-auto mb-4 mt-6">
                <Mic className="w-6 h-6 text-neon-pink" />
              </div>
              <h3 className="heading-display text-xl text-foreground mb-3">Pocket Show Motivacional</h3>
              <p className="text-body text-muted-foreground text-sm">
                Uma experiência exclusiva que une a trajetória de sucesso de Mariana Chaib (Rede Globo) a momentos
                musicais de alto impacto emocional.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ── SEGURANÇA OPERACIONAL ── */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-[#020005] via-[#0a0010] to-[#050505]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-center max-w-6xl mx-auto">
            <div className="flex-1">
              <h3 className="font-oswald text-xl text-neon-pink mb-4">Logística Turn-Key e Compliance Total</h3>
              <p className="text-body text-lg text-muted-foreground leading-relaxed mb-8">
                Somos seu único ponto de contato para som, luz e imagem. Facilitamos a contratação com emissão de Nota
                Fiscal, Rider Técnico detalhado e flexibilidade total de cronograma.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Emissão de Nota Fiscal e contrato formal",
                  "Rider Técnico detalhado e mapa de palco",
                  "Equipe de roadies e técnicos de som próprios",
                  "Flexibilidade total de cronograma",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-neon-pink flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Button variant="hero" size="xl" className="animate-glow-pulse" asChild>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  Solicitar Orçamento
                </a>
              </Button>
            </div>
            <div className="flex-1 w-full">
              <div className="glass-card rounded-2xl p-8 lg:p-10 border border-neon-pink/20 text-center">
                <div className="heading-display text-6xl lg:text-8xl text-neon-pink mb-4">600+</div>
                <p className="text-body text-lg text-muted-foreground">
                  Shows realizados para as maiores marcas do Brasil
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mantenha o Footer em Suspense se desejar, pois ele é mais pesado */}
      <Suspense fallback={<div className="h-20" />}>
        <Footer />
      </Suspense>

      {/* O botão de WhatsApp agora carrega instantaneamente, sem depender do Suspense */}
      <WhatsAppButton />
    </main>
  );
};

export default Corporativo;

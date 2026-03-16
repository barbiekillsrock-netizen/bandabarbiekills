import { useParams, Navigate } from "react-router";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { ChevronDown, Quote, Music, Mic2, Speaker, Lightbulb } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import TestimonialsSection from "@/components/TestimonialsSection";
import { getCidadeBySlug } from "@/data/cidadesData";
import { useState, useCallback } from "react";

const SITE_URL = "https://www.bandabarbiekills.com.br";

const YouTubeFacade = ({ id, title }: { id: string; title: string }) => {
  const [loaded, setLoaded] = useState(false);
  const handleLoad = useCallback(() => setLoaded(true), []);

  if (loaded) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${id}?autoplay=1`}
        title={title}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    );
  }

  return (
    <button
      onClick={handleLoad}
      className="relative w-full h-full bg-black group cursor-pointer"
      aria-label={`Reproduzir vídeo: ${title}`}
    >
      <img
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt={`Banda Barbie Kills ao vivo - ${title}`}
        width={480}
        height={360}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
        <svg viewBox="0 0 68 48" className="w-16 h-12" aria-hidden="true">
          <path
            d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55C3.97 2.33 2.27 4.81 1.48 7.74.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"
            fill="red"
          />
          <path d="M45 24 27 14v20" fill="white" />
        </svg>
      </div>
    </button>
  );
};

const focoLabel = (foco: string) => {
  if (foco === "Casamento") return "Casamentos";
  if (foco === "Corporativo") return "Eventos Corporativos";
  return "Casamentos e Eventos";
};

const CidadeLanding = () => {
  const { slug } = useParams<{ slug: string }>();
  const cidade = getCidadeBySlug(slug || "");

  if (!cidade) return <Navigate to="/" replace />;

  const { cidade: nome, foco, hook, venues } = cidade;
  const canonicalUrl = `${SITE_URL}/cidade/${slug}`;
  const metaTitle = `Banda para ${focoLabel(foco)} em ${nome} | Barbie Kills`;
  const metaDesc = `${hook} Banda premium para ${focoLabel(foco)} em ${nome}. Shows de alta energia com Mariana Chaib. Atendemos ${venues} Infraestrutura completa e repertório.`;

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDesc} />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="pt-BR" href={canonicalUrl} />
        <link rel="alternate" hrefLang="pt" href={canonicalUrl} />
        <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${SITE_URL}/banda-barbie-kills-casamento-rock.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDesc} />
        <meta name="twitter:image" content={`${SITE_URL}/banda-barbie-kills-casamento-rock.png`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: `Barbie Kills - Banda para ${focoLabel(foco)} em ${nome}`,
            description: metaDesc,
            provider: {
              "@type": "MusicGroup",
              name: "Barbie Kills",
              url: SITE_URL,
            },
            areaServed: { "@type": "City", name: nome },
            url: canonicalUrl,
          })}
        </script>
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col lg:flex-row">
        <div className="relative z-10 w-full lg:w-1/2 min-h-[60vh] lg:min-h-screen bg-black flex flex-col justify-center px-6 md:px-12 lg:px-16 xl:px-20 pt-28 pb-8 lg:pt-24 lg:pb-0">
          <div className="max-w-xl">
            <img
              src="/logo-barbie-kills.webp"
              alt={`Barbie Kills - Banda para ${focoLabel(foco)} em ${nome}`}
              width={320}
              height={120}
              className="w-48 md:w-64 lg:w-72 xl:w-80 mb-8 animate-fade-in"
            />
            <div className="font-bebas text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-none mb-6 animate-fade-in animation-delay-200">
              EMBLEMÁTICA.
              <br />
              <span className="neon-pink-text">AUTÊNTICA.</span>
              <br />
              ELEGANTE.
            </div>
            <h1 className="font-oswald text-base md:text-lg lg:text-xl text-foreground mb-4 max-w-lg animate-fade-in animation-delay-400">
              Barbie Kills: Banda Premium para {focoLabel(foco)} em {nome}
            </h1>
            <p className="font-oswald text-sm md:text-base lg:text-lg text-muted-foreground mb-10 max-w-lg animate-fade-in animation-delay-400">
              {hook} Unimos sofisticação e alta performance para transformar seu evento em um momento histórico em{" "}
              {nome}.
            </p>
            <div className="animate-fade-in animation-delay-600">
              <Button variant="hero" size="xl" className="animate-glow-pulse" asChild>
                <a href="https://wa.me/5519981736659" target="_blank" rel="noopener noreferrer">
                  CONTRATE JÁ
                </a>
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 min-h-[50vh] lg:h-screen lg:absolute lg:right-0 lg:top-0 overflow-hidden">
          <img
            src="/Banda_Casamentos_Eventos-2.webp"
            alt={`Banda Barbie Kills ao vivo em ${nome}`}
            width={960}
            height={1080}
            className="w-full h-full object-cover object-top lg:object-center"
            fetchPriority="high"
          />
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-float hidden lg:flex">
          <a
            href="#autoridade"
            className="flex flex-col items-center gap-2 text-foreground/60 hover:text-neon-pink transition-colors"
          >
            <span className="font-oswald text-xs uppercase tracking-widest">Descubra</span>
            <ChevronDown className="w-6 h-6" />
          </a>
        </div>
      </section>

      {/* Authority Block */}
      <section id="autoridade" className="py-16 lg:py-24 bg-[#050505]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-8">
              REFERÊNCIA EM <span className="neon-pink-text">{focoLabel(foco).toUpperCase()}</span>
            </h2>
            <p className="text-body text-lg md:text-xl leading-relaxed text-muted-foreground mb-12">
              Com mais de 14 anos de estrada e 600 shows realizados, a Barbie Kills é liderada pela vocalista Mariana
              Chaib, destaque na Rede Globo. Somos referência em casamentos de luxo e eventos corporativos de alto
              padrão, entregando uma experiência musical única que transita pelo Pop, Rock, Soul e Música Brasileira.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Music, label: "Pop, Rock & Soul" },
                { icon: Mic2, label: "Vocalista Destaque" },
                { icon: Speaker, label: "Som Profissional" },
                { icon: Lightbulb, label: "Iluminação Premium" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="glass-card p-6 rounded-2xl text-center hover-lift">
                  <Icon className="w-8 h-8 text-neon-pink mx-auto mb-3" />
                  <p className="font-oswald text-sm uppercase tracking-wider text-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Performance Gallery */}
      <section className="py-16 lg:py-20 section-gradient">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <img
                src="/banda-casamento-interacao-noiva.webp"
                alt={`Barbie Kills interação com convidados em ${nome}`}
                width={600}
                height={400}
                className="rounded-2xl w-full object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <img
                src="/estrutura-show-banda-baile.webp"
                alt={`Estrutura de show Barbie Kills em ${nome}`}
                width={600}
                height={400}
                className="rounded-2xl w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Technical Differentials */}
      <section className="py-16 lg:py-24 bg-[#050505]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-8 text-center">
              LOGÍSTICA E ESTRUTURA <span className="neon-pink-text">IMPECÁVEL</span> EM {nome.toUpperCase()}
            </h2>
            <p className="text-body text-lg md:text-xl leading-relaxed text-muted-foreground text-center mb-12">
              Conhecemos a fundo a acústica e a dinâmica dos principais espaços da região, como {venues} Nossa equipe
              utiliza tecnologia de última geração em som e luz, garantindo a mesma segurança e qualidade que marcas
              como Honda e Ambev confiam para seus eventos.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials (reused from Home) */}
      <TestimonialsSection />

      {/* Video Section */}
      <section className="py-16 lg:py-20 section-gradient">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="heading-display text-5xl md:text-6xl lg:text-7xl text-foreground mb-4">
              <span className="neon-pink-text">CONHEÇA</span> NOSSO SOM
            </h2>
            <p className="subtitle text-lg text-muted-foreground max-w-2xl mx-auto">
              Assista aos nossos shows e sinta a energia
            </p>
          </div>
          <div className="mb-8">
            <div className="aspect-video rounded-2xl overflow-hidden video-glow">
              <YouTubeFacade id="rAVb_-U7OAU" title="Barbie Kills - Show Completo" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="aspect-video rounded-2xl overflow-hidden video-glow hover:scale-[1.02] transition-transform duration-300">
              <YouTubeFacade id="s0BHAN9Edew" title="Barbie Kills - Casamento" />
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden video-glow hover:scale-[1.02] transition-transform duration-300">
              <YouTubeFacade id="RLIIDCt0MlA" title="Barbie Kills - Evento Corporativo" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 lg:py-24 bg-[#050505]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="heading-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            ELEVE O NÍVEL DO SEU <span className="neon-pink-text">EVENTO EM {nome.toUpperCase()}</span>
          </h2>
          <p className="subtitle text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Clique em "Contrate Já" para um orçamento personalizado
          </p>
          <Button variant="hero" size="xl" className="animate-glow-pulse" asChild>
            <a href="https://wa.me/5519981736659" target="_blank" rel="noopener noreferrer">
              Contrate Já
            </a>
          </Button>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default CidadeLanding;

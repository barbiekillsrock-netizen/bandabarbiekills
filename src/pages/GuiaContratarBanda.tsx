import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, List, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { blogPosts } from "@/data/blogPosts";

const tocItems = [
  { id: "por-que-banda-ao-vivo", label: "Por que optar por banda ao vivo?" },
  { id: "primeiros-passos", label: "Primeiros passos antes da contratação" },
  { id: "criterios-avaliar", label: "Critérios para avaliar bandas de casamento" },
  { id: "agendar-banda", label: "Como agendar a banda sem dor de cabeça" },
  { id: "perguntas-chave", label: "Perguntas-chave para fazer à banda" },
  { id: "repertorio-personalizado", label: "A importância do repertório personalizado" },
  { id: "diferenciais-premium", label: "Diferenciais de uma banda premium" },
  { id: "conclusao", label: "Conclusão" },
  { id: "faq", label: "Perguntas frequentes (FAQ)" },
];

const faqItems = [
  {
    question: "Quanto custa contratar uma banda para casamento?",
    answer: "O valor varia conforme a formação, repertório, infraestrutura e localização do evento. Bandas premium com estrutura completa de som e iluminação, como a Barbie Kills, oferecem pacotes que incluem tudo — do equipamento à equipe técnica. O ideal é solicitar um orçamento personalizado para o seu evento.",
  },
  {
    question: "Com quanto tempo de antecedência devo contratar a banda?",
    answer: "Recomendamos fechar contrato com pelo menos 6 a 12 meses de antecedência, especialmente para datas em alta temporada (outubro a março). Bandas conceituadas costumam ter agenda disputada.",
  },
  {
    question: "A banda traz o próprio equipamento de som e iluminação?",
    answer: "Bandas profissionais como a Barbie Kills levam toda a infraestrutura necessária: som digital de alta fidelidade, iluminação cênica, microfones e monitoramento. Isso garante qualidade e elimina a necessidade de contratar fornecedores extras.",
  },
  {
    question: "É possível personalizar o repertório do casamento?",
    answer: "Sim! Uma boa banda permite que os noivos escolham músicas especiais para momentos como a entrada, primeira dança e brinde. A Barbie Kills trabalha com curadoria musical personalizada para cada casal.",
  },
  {
    question: "A banda atende casamentos fora de Campinas?",
    answer: "Sim. A Barbie Kills atende casamentos e eventos em todo o interior de São Paulo, incluindo Jundiaí, Sorocaba, Piracicaba, Valinhos, Indaiatuba e capital, com logística otimizada para deslocamentos de até 2 horas.",
  },
];

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const articleStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Guia prático para contratar banda ao vivo para casamento",
      description: "Guia completo para contratar banda de casamento. Dicas de repertório, técnica e como escolher a melhor banda ao vivo em Campinas e SP.",
      image: "https://www.bandabarbiekills.com.br/blog/banda-casamento-sp.webp",
      datePublished: "2026-04-13",
      author: { "@type": "Organization", name: "Barbie Kills" },
      publisher: {
        "@type": "Organization",
        name: "Barbie Kills",
        logo: { "@type": "ImageObject", url: "https://www.bandabarbiekills.com.br/logo-barbie-kills.png" },
      },
    },
    {
      "@type": "VideoObject",
      name: "Barbie Kills — Show ao vivo para casamento",
      description: "Veja a Barbie Kills em ação em um casamento premium.",
      thumbnailUrl: "https://img.youtube.com/vi/Doxi-lkKz4M/maxresdefault.jpg",
      uploadDate: "2026-04-13T09:00:00-03:00",
      contentUrl: "https://www.youtube.com/shorts/Doxi-lkKz4M",
      embedUrl: "https://www.youtube.com/embed/Doxi-lkKz4M",
    },
  ],
};

const GuiaContratarBanda = () => {
  const [tocOpen, setTocOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const notifyIndexNow = async () => {
      try {
        await fetch("https://api.indexnow.org/indexnow", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            host: "bandabarbiekills.com.br",
            key: "0d4f0a7723064ef38a617f3332619d1e",
            keyLocation: "https://barbiekills.com.br/0d4f0a7723064ef38a617f3332619d1e.txt",
            urlList: [window.location.href],
          }),
        });
      } catch { /* silent */ }
    };
    notifyIndexNow();
  }, []);

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== "guia-contratar-banda-casamento-ao-vivo")
    .slice(0, 2);

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Guia Completo: Como Contratar a Melhor Banda para Casamento em 2026</title>
        <meta name="description" content="Guia completo para contratar banda de casamento. Dicas de repertório, técnica e como escolher a melhor banda ao vivo em Campinas e SP. Confira!" />
        <link rel="canonical" key="canonical" href="https://www.bandabarbiekills.com.br/guia-contratar-banda-casamento-ao-vivo" />
        <link rel="alternate" key="alternate-pt-BR" hrefLang="pt-BR" href="https://www.bandabarbiekills.com.br/guia-contratar-banda-casamento-ao-vivo" />
        <link rel="alternate" key="alternate-pt" hrefLang="pt" href="https://www.bandabarbiekills.com.br/guia-contratar-banda-casamento-ao-vivo" />
        <link rel="alternate" key="alternate-x-default" hrefLang="x-default" href="https://www.bandabarbiekills.com.br/guia-contratar-banda-casamento-ao-vivo" />
        <meta property="og:title" content="Guia Completo: Como Contratar a Melhor Banda para Casamento em 2026" />
        <meta property="og:description" content="Guia completo para contratar banda de casamento. Dicas de repertório, técnica e como escolher a melhor banda ao vivo em Campinas e SP." />
        <meta property="og:url" content="https://www.bandabarbiekills.com.br/guia-contratar-banda-casamento-ao-vivo" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://www.bandabarbiekills.com.br/blog/banda-casamento-sp.webp" />
        <meta property="article:published_time" content="2026-04-13" />
        <script type="application/ld+json">{JSON.stringify(articleStructuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqStructuredData)}</script>
      </Helmet>

      <Navbar />

      {/* Hero */}
      <section className="pt-24">
        <div className="relative h-[50vh] min-h-[400px]">
          <img
            src="/blog/banda-casamento-sp.webp"
            alt="Banda Barbie Kills em performance ao vivo para casamento premium em São Paulo e Campinas"
            width={1200}
            height={600}
            className="w-full h-full object-cover object-center"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            {/* Back */}
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-neon-pink transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" />
              Voltar para o Blog
            </Link>

            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <span>13/04/2026</span>
              <span>•</span>
              <span>10 min de leitura</span>
            </div>

            {/* H1 */}
            <h1 className="heading-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-tight">
              Guia prático para contratar banda ao vivo para casamento
            </h1>

            {/* Lead */}
            <p className="text-body text-xl text-neon-pink/80 italic mb-10 leading-relaxed border-l-4 border-neon-pink pl-6">
              Saiba como escolher banda ao vivo para casamento, garantindo repertório ideal, técnica apurada e ambientação perfeita para seu evento.
            </p>

            {/* Table of Contents - inline within article flow */}
            <nav className="mb-10 p-6 bg-gradient-to-r from-neon-pink/5 to-purple-900/5 border border-neon-pink/20 rounded-lg">
              <p className="font-oswald text-sm uppercase tracking-widest text-muted-foreground mb-3">Índice de Conteúdo</p>
              <ol className="space-y-1.5">
                {tocItems.map((item, i) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="text-muted-foreground hover:text-neon-pink transition-colors text-sm">
                      {i + 1}. {item.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {/* Article Content */}
            <article className="prose prose-invert prose-lg max-w-none">
              <p className="text-body text-lg text-muted-foreground mb-6 leading-relaxed">
                Contratar uma banda ao vivo para o casamento é uma daquelas decisões que realmente podem transformar a festa. Com mais de duas décadas observando o que emociona e reúne pessoas, podemos afirmar: a escolha do grupo musical faz toda diferença na energia desse dia. Pensando nisso, compartilhamos aqui um guia prático, baseado em experiência própria e em exemplos nossos, da <Link to="/" className="text-neon-pink hover:underline">Banda Barbie Kills</Link>, sobre como acertar na contratação.
              </p>

              {/* H2: Por que optar por banda ao vivo? */}
              <h2 id="por-que-banda-ao-vivo" className="heading-display text-2xl md:text-3xl text-neon-pink mt-10 mb-4 scroll-mt-24">
                Por que optar por banda ao vivo?
              </h2>
              <p className="text-body text-lg text-muted-foreground mb-6 leading-relaxed">
                Percebemos em cada celebração que acompanho que, quando uma banda entra no palco, algo muda no ar. Não se trata apenas de música: é interação, personalidade, improviso. O ao vivo contagia.
              </p>

              <blockquote className="border-l-4 border-neon-pink pl-6 my-8 italic text-muted-foreground">
                <p>Emoção verdadeiramente compartilhada é o que fica na memória.</p>
              </blockquote>

              {/* YouTube Shorts embed */}
              <div className="my-10 flex justify-center">
                <div className="w-full max-w-md aspect-[9/16] rounded-lg overflow-hidden border border-white/10 shadow-xl">
                  <iframe
                    src="https://www.youtube.com/embed/Doxi-lkKz4M"
                    title="Barbie Kills — Show ao vivo para casamento"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                    loading="lazy"
                  />
                </div>
              </div>

              <p className="text-body text-lg text-muted-foreground mb-6 leading-relaxed">
                Além disso, há outros elementos que, na nossa opinião, pesam bastante:
              </p>

              <ul className="list-disc list-inside space-y-3 my-6 text-body text-lg text-muted-foreground">
                <li>A autenticidade que só músicos de talento conseguem transmitir</li>
                <li>A possibilidade de adaptar repertório ao momento</li>
                <li>O envolvimento dos convidados enquanto tudo acontece</li>
                <li>A experiência sensorial: não só se ouve, mas se sente a música</li>
              </ul>

              <p className="text-body text-lg text-muted-foreground mb-6 leading-relaxed">
                E foi por buscar esses mesmos detalhes que a <Link to="/" className="text-neon-pink hover:underline">Banda Barbie Kills</Link>, por exemplo, tornou-se referência em <Link to="/blog/musicas-mais-pedidas-casamento-2026" className="text-neon-pink hover:underline">casamentos premium</Link>, dando um espetáculo com repertório variado, energia e elegância.
              </p>

              {/* H2: Primeiros passos */}
              <h2 id="primeiros-passos" className="heading-display text-2xl md:text-3xl text-neon-pink mt-10 mb-4 scroll-mt-24">
                Primeiros passos antes da contratação
              </h2>
              <p className="text-body text-lg text-muted-foreground mb-6 leading-relaxed">
                Antes de fechar contrato, sempre oriento os casais a observarem três pontos principais:
              </p>
              <ol className="list-decimal list-inside space-y-3 my-6 text-body text-lg text-muted-foreground">
                <li><strong className="text-foreground">Estilo do evento:</strong> É um casamento grande ou mais íntimo? Formal ou descontraído?</li>
                <li><strong className="text-foreground">Perfil dos noivos e convidados:</strong> Músicas que marcaram a vida de todos tornam a experiência única.</li>
                <li><strong className="text-foreground">Orçamento disponível:</strong> O valor investido em música pode variar bastante, então é bom estabelecer limites desde o início.</li>
              </ol>

              {/* H2: Critérios */}
              <h2 id="criterios-avaliar" className="heading-display text-2xl md:text-3xl text-neon-pink mt-10 mb-4 scroll-mt-24">
                Critérios para avaliar bandas de casamento
              </h2>
              <p className="text-body text-lg text-muted-foreground mb-6 leading-relaxed">
                Para mim, há critérios que são indispensáveis quando o assunto é fazer uma escolha de qualidade. Reuni os principais que uso como referência:
              </p>

              <h3 className="font-oswald text-xl text-foreground mt-8 mb-3 uppercase tracking-wider">Portfólio e histórico</h3>
              <p className="text-body text-lg text-muted-foreground mb-6 leading-relaxed">
                Veja se têm experiência em casamentos, quais eventos já atenderam e quem são os músicos.
              </p>

              <h3 className="font-oswald text-xl text-foreground mt-8 mb-3 uppercase tracking-wider">Repertório diversificado</h3>
              <p className="text-body text-lg text-muted-foreground mb-6 leading-relaxed">
                Uma boa banda consegue adaptar o setlist para todos os gostos (de MPB a pop internacional).
              </p>

              <h3 className="font-oswald text-xl text-foreground mt-8 mb-3 uppercase tracking-wider">Materiais de apresentação</h3>
              <p className="text-body text-lg text-muted-foreground mb-6 leading-relaxed">
                Solicite vídeos e áudios ao vivo, não apenas gravações em estúdio.
              </p>

              {/* Image */}
              <figure className="my-10 float-left mr-6 mb-4 w-full sm:w-1/2 md:w-2/5">
                <img
                  src="/blog/melhor-banda-casamento-campinas-barbie-kills.webp"
                  alt="Vocalista Mariana e banda Barbie Kills se apresentando ao vivo em festa de casamento premium em Campinas"
                  width={400}
                  height={267}
                  className="w-full rounded-lg object-cover"
                  loading="lazy"
                />
                <figcaption className="mt-3 text-sm text-muted-foreground italic">
                  Barbie Kills em casamento premium — energia e elegância no palco
                </figcaption>
              </figure>

              <h3 className="font-oswald text-xl text-foreground mt-8 mb-3 uppercase tracking-wider">Presença de palco e Feedback</h3>
              <p className="text-body text-lg text-muted-foreground mb-6 leading-relaxed">
                O jeito como a banda interage faz toda diferença. Leia depoimentos e peça referências. A própria <Link to="/" className="text-neon-pink hover:underline">Barbie Kills</Link> disponibiliza vídeos e depoimentos que ajudam a perceber se o estilo deles combina com a festa desejada.
              </p>

              {/* H2: Agendar */}
              <h2 id="agendar-banda" className="heading-display text-2xl md:text-3xl text-neon-pink mt-10 mb-4 scroll-mt-24">
                Como agendar a banda sem dor de cabeça
              </h2>
              <p className="text-body text-lg text-muted-foreground mb-6 leading-relaxed">
                Questione sobre logísticas: montagem de som, passagem de som, alimentação dos músicos e horários. Conheça também as <Link to="/corporativo" className="text-neon-pink hover:underline">cidades atendidas</Link> pela banda para verificar a disponibilidade na sua região.
              </p>

              {/* H2: Perguntas-chave */}
              <h2 id="perguntas-chave" className="heading-display text-2xl md:text-3xl text-neon-pink mt-10 mb-4 scroll-mt-24">
                Perguntas-chave para fazer à banda
              </h2>
              <p className="text-body text-lg text-muted-foreground mb-6 leading-relaxed">
                Em minhas consultorias, indico perguntar: Vocês fornecem o equipamento? Há cobrança para horas adicionais? Vocês têm backup para imprevistos?
              </p>

              {/* H2: Repertório personalizado */}
              <h2 id="repertorio-personalizado" className="heading-display text-2xl md:text-3xl text-neon-pink mt-10 mb-4 scroll-mt-24">
                A importância do repertório personalizado
              </h2>
              <p className="text-body text-lg text-muted-foreground mb-6 leading-relaxed">
                Algo que sempre defendo é uma trilha sonora que tenha a cara do casal. Em apresentações que já acompanhei da <Link to="/" className="text-neon-pink hover:underline">Barbie Kills</Link>, percebi como a leitura de pista é uma arte: saber alternar entre emoção e agitação.
              </p>

              {/* H2: Diferenciais */}
              <h2 id="diferenciais-premium" className="heading-display text-2xl md:text-3xl text-neon-pink mt-10 mb-4 scroll-mt-24">
                Diferenciais de uma banda premium
              </h2>
              <p className="text-body text-lg text-muted-foreground mb-6 leading-relaxed">
                Cito como exemplo a atuação da <Link to="/" className="text-neon-pink hover:underline">Barbie Kills</Link>: formação com músicos experientes, vocal marcante, repertório de 150 músicas e flexibilidade para eventos em <Link to="/cidade/banda-casamento-campinas" className="text-neon-pink hover:underline">Campinas</Link>, <Link to="/cidade/banda-casamento-sorocaba" className="text-neon-pink hover:underline">São Paulo</Link> e região.
              </p>

              {/* H2: Conclusão */}
              <h2 id="conclusao" className="heading-display text-2xl md:text-3xl text-neon-pink mt-10 mb-4 scroll-mt-24">
                Conclusão
              </h2>
              <p className="text-body text-lg text-muted-foreground mb-6 leading-relaxed">
                Escolher uma banda ao vivo é um dos grandes diferenciais para criar uma festa marcante. Sua trilha merece o melhor.
              </p>

              {/* CTA */}
              <div className="mt-12 p-8 bg-gradient-to-r from-neon-pink/10 to-purple-900/10 border border-neon-pink/20 rounded-lg text-center">
                <Button variant="neonPink" size="lg" asChild className="whitespace-normal h-auto py-4 text-center leading-snug">
                  <a href="https://wa.me/5519982846842" target="_blank" rel="noopener noreferrer">
                    QUERO SOLICITAR UM ORÇAMENTO PARA MEU CASAMENTO
                  </a>
                </Button>
              </div>

              {/* H2: FAQ */}
              <h2 id="faq" className="heading-display text-2xl md:text-3xl text-neon-pink mt-14 mb-6 scroll-mt-24">
                Perguntas frequentes (FAQ)
              </h2>
              <div className="space-y-8">
                {faqItems.map((item, i) => (
                  <div key={i} className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg">
                    <h3 className="font-oswald text-lg text-foreground mb-3">{item.question}</h3>
                    <p className="text-body text-muted-foreground leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-[#050505]">
          <div className="container mx-auto px-6">
            <h2 className="heading-display text-3xl text-foreground mb-8 text-center">Leia também</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {relatedPosts.map((rp) => (
                <Link key={rp.slug} to={`/blog/${rp.slug}`} className="group">
                  <article className="bg-background/30 border border-white/10 rounded-lg overflow-hidden transition-all duration-500 hover:border-neon-pink/40">
                    <div className="relative h-48 overflow-hidden">
                      <img src={rp.image} alt={rp.imageAlt} width={400} height={192} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" loading="lazy" />
                    </div>
                    <div className="p-6">
                      <h3 className="font-oswald text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-neon-pink transition-colors">{rp.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{rp.excerpt}</p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default GuiaContratarBanda;

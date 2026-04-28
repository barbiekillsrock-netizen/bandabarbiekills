import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { publicSupabase } from "@/integrations/supabase/publicClient";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HistorySection from "@/components/HistorySection";
import ManifestoSection from "@/components/ManifestoSection";
import { Quote, Sparkles, CheckCircle2, ArrowDown, Star } from "lucide-react";
import neonBgTexture from "@/assets/killer-queen-fundo-neon.png";

type Revenue = {
  id: string;
  title: string;
  description: string | null;
  sale_value: number | null;
};

type Opportunity = {
  id: string;
  client_name: string;
  event_type: string | null;
  event_date: string | null;
  location: string | null;
  guests: number | null;
  proposal_terms?: string | null;
};

type ProposalData = {
  opportunity: Opportunity;
  revenues: Revenue[];
};

const WHATSAPP_NUMBER = "5519982846842";
const WHATSAPP = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Olá, Banda Barbie Kills! Recebi a proposta comercial e gostaria de conversar.",
)}`;

// Mesmos vídeos da Home (MediaSection)
const proposalVideos = [
  { id: "rAVb_-U7OAU", title: "Show Completo" },
  { id: "s0BHAN9Edew", title: "Casamento" },
  { id: "RLIIDCt0MlA", title: "Evento Corporativo" },
];

// Empresas que confiam em nós (lista oficial)
const clients = [
  "HYUNDAI",
  "HARLEY DAVIDSON",
  "PROCURADORIA SP",
  "BACARDI",
  "AMBEV",
];

// Mesmos depoimentos da Home (TestimonialsSection)
const testimonials = [
  {
    image: "/depoimento-marcos-mion-banda.webp",
    name: "Marcos Mion",
    role: "Apresentador de TV",
    quote:
      "Fantástica! A vocalista canta demais, sempre surpreende e a banda toda é espetacular",
  },
  {
    image: "/depoimento-tiago-kiss-produtor.webp",
    name: "Thiago Kiss",
    role: "Produtor Charlie Brown Jr. e Titãs",
    quote:
      "A banda tá f*da, conceito muito bom e a sonoridade está impecável! Impressiona por onde passa",
  },
  {
    image: "/depoimento-tatiane-franco-evento.webp",
    name: "Tatiane Franco",
    role: "COO Laboratórios Franco do Amaral",
    quote:
      "Completamente apaixonada pelo show da minha festa! Também tive um atendimento excepcional",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const formatBRL = (value: number) =>
  value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const Proposta = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<ProposalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const { data: rpcData, error } = await publicSupabase.rpc(
        "get_proposal_data" as any,
        { p_opportunity_id: id },
      );
      if (error || !rpcData) {
        setNotFound(true);
      } else {
        setData(rpcData as unknown as ProposalData);
      }
      setLoading(false);
    })();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="font-bebas text-2xl tracking-[0.3em] text-neon-pink animate-pulse">
          CARREGANDO PROPOSTA...
        </p>
      </div>
    );
  }

  if (notFound || !data) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-bebas text-4xl tracking-wider text-foreground mb-3">
            PROPOSTA NÃO ENCONTRADA
          </h1>
          <p className="text-muted-foreground font-sans">
            Verifique o link recebido ou entre em contato com nossa produção.
          </p>
        </div>
      </div>
    );
  }

  const { opportunity: opp, revenues } = data;
  const fmtDate = opp.event_date
    ? new Date(opp.event_date + "T00:00:00").toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : null;

  // Validade automática: 7 dias a partir de hoje (geração da proposta)
  const today = new Date();
  const fmtToday = today.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <Helmet>
        <title>Proposta Exclusiva para {opp.client_name} | Barbie Kills</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-black text-foreground overflow-x-hidden relative pt-20">
        {/* Ambient stage lighting + neon background texture (subtle) */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <div
            className="absolute inset-0 opacity-[0.55] mix-blend-screen"
            style={{
              backgroundImage: `url(${neonBgTexture})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }}
          />
          <div className="absolute inset-0 bg-black/15" />
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-neon-pink/20 blur-[140px]" />
          <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-[140px]" />
          <div className="absolute bottom-0 left-1/3 w-[700px] h-[400px] rounded-full bg-neon-pink/10 blur-[160px]" />
        </div>

        {/* HERO */}
        <section className="relative z-10 min-h-[90svh] flex items-center justify-center overflow-hidden border-b border-white/5">
          <div className="absolute inset-0">
            <picture>
              <source
                media="(max-width: 768px)"
                srcSet="/banda-casamentos-eventos-campinas-barbie-kills-mobile.webp"
              />
              <img
                src="/banda-casamentos-eventos-campinas-barbie-kills.webp"
                alt=""
                className="w-full h-full object-cover object-center opacity-40"
                loading="eager"
                decoding="async"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black" />
            <div className="absolute inset-0 bg-gradient-to-tr from-neon-pink/10 via-transparent to-purple-700/20" />
          </div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
            className="relative z-10 container mx-auto px-6 max-w-5xl text-center py-24"
          >
            <motion.p
              variants={fadeUp}
              className="text-xs md:text-sm text-neon-pink mb-6 tracking-[0.4em] uppercase font-oswald"
            >
              <Sparkles className="inline-block w-3.5 h-3.5 mr-2 -mt-1" />
              Proposta Exclusiva. Confidencial.
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="heading-display text-5xl md:text-7xl lg:text-8xl text-foreground mb-8 leading-[0.95]"
            >
              UMA EXPERIÊNCIA MUSICAL EXCLUSIVA PARA{" "}
              <span className="neon-pink-text">{opp.client_name}</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="subtitle text-base md:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed"
            >
              A trilha sonora definitiva para a celebração
              {fmtDate ? (
                <>
                  {" "}de <span className="text-white font-medium">{fmtDate}</span>.
                </>
              ) : (
                <>
                  {" "}do seu{" "}
                  <span className="text-white font-medium">
                    {opp.event_type || "evento"}
                  </span>
                  .
                </>
              )}
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-4 text-sm md:text-base text-white/60 font-inter font-light max-w-xl mx-auto"
            >
              Performance de palco impecável. Curadoria de excelência sonora.
            </motion.p>

            {(opp.location || opp.guests) && (
              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-wrap justify-center gap-3 text-xs md:text-sm font-oswald uppercase tracking-[0.2em]"
              >
                {opp.location && (
                  <span className="px-4 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-white/90">
                    {opp.location}
                  </span>
                )}
                {opp.guests && (
                  <span className="px-4 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-white/90">
                    {opp.guests} convidados
                  </span>
                )}
              </motion.div>
            )}

            <motion.div variants={fadeUp} className="mt-14 flex justify-center">
              <ArrowDown className="text-neon-pink animate-bounce" size={28} />
            </motion.div>
          </motion.div>
        </section>

        {/* HISTÓRIA — mesma seção da Home */}
        <div className="relative z-10">
          <HistorySection />
        </div>

        {/* MANIFESTO — mesma seção da Home */}
        <div className="relative z-10">
          <ManifestoSection />
        </div>

        {/* SOCIAL PROOF — clients carousel */}
        <section className="relative z-10 py-20 md:py-24 border-b border-white/5 overflow-hidden">
          <div className="container mx-auto px-6 max-w-6xl">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center mb-12"
            >
              <p className="subtitle text-xs text-neon-pink mb-4 tracking-[0.4em] uppercase">
                Quem confia
              </p>
              <p className="heading-display text-4xl md:text-6xl text-foreground leading-tight">
                EMPRESAS QUE <span className="neon-pink-text">CONFIAM EM NÓS</span>
              </p>
            </motion.div>

            <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
              <div className="flex gap-12 animate-[marquee_30s_linear_infinite] whitespace-nowrap">
                {[...clients, ...clients, ...clients].map((c, i) => (
                  <span
                    key={i}
                    className="font-bebas text-3xl md:text-4xl text-white/40 hover:text-neon-pink transition-colors tracking-[0.2em]"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS — mesma estrutura da Home */}
        <section className="relative z-10 py-20 md:py-24 border-b border-white/5 bg-[#050505]/60">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16">
              <p className="heading-display text-5xl md:text-6xl lg:text-7xl text-foreground mb-4">
                O QUE <span className="neon-pink-text">DIZEM</span> SOBRE NÓS
              </p>
              <p className="subtitle text-lg text-muted-foreground max-w-2xl mx-auto">
                Depoimentos de quem viveu a experiência Barbie Kills
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {testimonials.map((t, i) => (
                <motion.article
                  key={t.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="glass-card p-8 lg:p-10 rounded-2xl text-center hover-lift"
                >
                  <div className="mb-6 flex justify-center">
                    <img
                      src={t.image}
                      alt={`Depoimento de ${t.name} sobre a Banda Barbie Kills`}
                      width={120}
                      height={120}
                      className="testimonial-circle"
                      loading="lazy"
                    />
                  </div>
                  <Quote className="w-8 h-8 text-neon-pink/40 mx-auto mb-4" aria-hidden="true" />
                  <blockquote className="text-body text-lg leading-relaxed mb-6 italic">
                    "{t.quote}"
                  </blockquote>
                  <footer>
                    <p className="heading-display text-xl text-foreground">{t.name}</p>
                    <p className="subtitle text-xs text-muted-foreground mt-1">{t.role}</p>
                  </footer>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* VIDEOS — mesmos da Home */}
        <section className="relative z-10 py-20 md:py-28 border-b border-white/5">
          <div className="container mx-auto px-6 max-w-6xl">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center mb-12"
            >
              <p className="subtitle text-xs text-neon-pink mb-4 tracking-[0.4em] uppercase">
                Sinta a energia
              </p>
              <p className="heading-display text-5xl md:text-6xl lg:text-7xl text-foreground">
                <span className="neon-pink-text">CONHEÇA</span> NOSSO SOM
              </p>
            </motion.div>

            <div className="mb-8">
              <div className="aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(255,0,128,0.15)]">
                <iframe
                  src={`https://www.youtube.com/embed/${proposalVideos[0].id}`}
                  title={`Barbie Kills — ${proposalVideos[0].title}`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {proposalVideos.slice(1).map((v, i) => (
                <motion.div
                  key={v.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(255,0,128,0.15)]"
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${v.id}`}
                    title={`Barbie Kills — ${v.title}`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SCOPE / REVENUES — dynamic from CRM, com PREÇO ISOLADO POR ITEM */}
        <section className="relative z-10 py-20 md:py-28 border-b border-white/5">
          <div className="container mx-auto px-6 max-w-4xl">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center mb-14"
            >
              <p className="subtitle text-xs text-neon-pink mb-4 tracking-[0.4em] uppercase">
                Escopo Detalhado
              </p>
              <p className="heading-display text-5xl md:text-6xl lg:text-7xl text-foreground leading-tight">
                O QUE <span className="neon-pink-text">ENTREGAMOS</span>
              </p>
            </motion.div>

            {revenues.length === 0 ? (
              <div className="rounded-xl p-8 text-center border border-white/10 bg-white/[0.03]">
                <p className="text-white/60 font-inter">
                  Os itens da proposta serão detalhados em breve.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {revenues.map((rev, i) => (
                  <motion.div
                    key={rev.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-sm overflow-hidden hover:border-neon-pink/30 transition-colors"
                  >
                    <div className="p-6 md:p-8">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-3">
                        <div className="flex items-start gap-4 flex-1">
                          <CheckCircle2
                            className="text-neon-pink shrink-0 mt-1"
                            size={22}
                          />
                          <h3 className="font-bebas text-2xl md:text-3xl tracking-wider text-white leading-tight uppercase">
                            {rev.title}
                          </h3>
                        </div>
                        {rev.sale_value != null && Number(rev.sale_value) > 0 && (
                          <div className="text-left md:text-right pl-9 md:pl-0 shrink-0">
                            <p className="text-[10px] text-white/50 font-oswald uppercase tracking-[0.3em] mb-1">
                              Investimento
                            </p>
                            <p className="font-bebas text-3xl md:text-4xl neon-pink-text leading-none tracking-wider">
                              R$ {formatBRL(Number(rev.sale_value))}
                            </p>
                          </div>
                        )}
                      </div>
                      {rev.description && (
                        <p className="text-base text-white/70 font-inter font-light leading-relaxed pl-9 whitespace-pre-line">
                          {rev.description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA — padrão idêntico ao Footer da Home */}
        <section className="relative z-10 py-20 md:py-28">
          <div className="container mx-auto px-6 max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="heading-display text-5xl md:text-6xl lg:text-7xl text-foreground mb-6">
                PRONTO PARA <span className="neon-pink-text">ELEVAR O NÍVEL</span> <br />
                DO SEU EVENTO?
              </p>
              <p className="subtitle text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
                Entre em contato e faça seu orçamento agora mesmo
              </p>
              <Button variant="hero" size="xl" className="animate-glow-pulse" asChild>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                  Contrate Já
                </a>
              </Button>

              {/* Validade da Proposta */}
              <p className="mt-12 text-xs md:text-sm text-white/45 font-inter font-light leading-relaxed max-w-2xl mx-auto text-center">
                Esta proposta é exclusiva e válida por 7 dias a partir de{" "}
                <span className="text-white/60">{fmtToday}</span>. Após este período, os valores e a
                disponibilidade da data estarão sujeitos a nova confirmação.
              </p>
            </motion.div>
          </div>
        </section>

        {/* FLOATING WHATSAPP — same style as Home */}
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar com a produção pelo WhatsApp"
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 hover:shadow-[0_0_20px_rgba(37,211,102,0.5)]"
        >
          <img src="/icons/whatsapp-white.svg" alt="" width={28} height={28} className="w-7 h-7" />
        </a>

        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.333%); }
          }
        `}</style>
      </main>

      <Footer variant="minimal" />
    </>
  );
};

export default Proposta;

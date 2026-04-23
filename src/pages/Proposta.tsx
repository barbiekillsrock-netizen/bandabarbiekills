import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { publicSupabase } from "@/integrations/supabase/publicClient";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  MessageCircle,
  CheckCircle2,
  Mic2,
  Clock,
  Cpu,
  Star,
  Quote,
  Music4,
  ArrowDown,
} from "lucide-react";

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
};

type ProposalData = {
  opportunity: Opportunity;
  revenues: Revenue[];
};

const WHATSAPP_NUMBER = "5519982846842";
const WHATSAPP = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Olá, Banda Barbie Kills! Recebi a proposta comercial e gostaria de conversar.",
)}`;

const proposalVideos = [
  { id: "rAVb_-U7OAU", title: "Live at Alma Campinas" },
  { id: "s0BHAN9Edew", title: "What's Up — Live" },
];

const clients = [
  "HONDA",
  "AMBEV",
  "BACARDI",
  "ITAÚ",
  "UNIMED",
  "GLOBO",
  "VOLKSWAGEN",
  "NESTLÉ",
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

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
  const total = revenues.reduce((s, r) => s + (Number(r.sale_value) || 0), 0);
  const fmtDate = opp.event_date
    ? new Date(opp.event_date + "T00:00:00").toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : null;
  const fmtTotal = total.toLocaleString("pt-BR", { minimumFractionDigits: 2 });

  return (
    <>
      <Helmet>
        <title>Proposta Exclusiva | Barbie Kills</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <main className="min-h-screen bg-black text-foreground overflow-x-hidden relative">
        {/* Ambient stage lighting */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-neon-pink/20 blur-[140px]" />
          <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-[140px]" />
          <div className="absolute bottom-0 left-1/3 w-[700px] h-[400px] rounded-full bg-neon-pink/10 blur-[160px]" />
        </div>

        {/* HERO */}
        <section className="relative z-10 min-h-[100svh] flex items-center justify-center overflow-hidden border-b border-white/5">
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
              className="font-bebas text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-[0.95] tracking-wide"
            >
              UMA EXPERIÊNCIA
              <br />
              MUSICAL EXCLUSIVA PARA
              <br />
              <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                {opp.client_name}
              </span>
              <span className="text-neon-pink">.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-base md:text-xl text-white/85 font-sans max-w-2xl mx-auto leading-relaxed font-light"
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
              className="mt-4 text-sm md:text-base text-white/60 font-sans font-light max-w-xl mx-auto"
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

        {/* AUTHORITY */}
        <section className="relative z-10 py-20 md:py-28 border-b border-white/5">
          <div className="container mx-auto px-6 max-w-6xl">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="text-center mb-16"
            >
              <p className="text-xs text-neon-pink mb-4 tracking-[0.4em] uppercase font-oswald">
                A Autoridade
              </p>
              <h2 className="font-bebas text-4xl md:text-6xl lg:text-7xl text-white leading-tight">
                A FORÇA POR TRÁS DA{" "}
                <span className="bg-gradient-to-r from-neon-pink to-fuchsia-400 bg-clip-text text-transparent">
                  BARBIE KILLS
                </span>
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-10 items-center mb-20">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative rounded-2xl overflow-hidden aspect-[4/5] max-w-md mx-auto lg:mx-0"
              >
                <img
                  src="/vocalista-banda-casamento.webp"
                  alt="Mariana Chaib — vocalista Barbie Kills"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-xs text-neon-pink font-oswald uppercase tracking-[0.3em] mb-1">
                    Vocalista
                  </p>
                  <p className="font-bebas text-3xl text-white tracking-wide">
                    MARIANA CHAIB
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="space-y-6"
              >
                <p className="text-lg md:text-xl text-white/85 font-sans font-light leading-relaxed">
                  À frente da banda, a vocalista{" "}
                  <span className="text-white font-medium">Mariana Chaib</span> —
                  com passagem pela <span className="text-white font-medium">Rede Globo</span> —
                  empresta uma <em className="text-neon-pink not-italic">voz intoxicante</em> e uma
                  presença de palco que transforma cada música em um momento inesquecível.
                </p>
                <p className="text-base md:text-lg text-white/70 font-sans font-light leading-relaxed">
                  Ao seu lado, um sexteto fixo de músicos de elite — sem freelancers — entrega
                  leitura de pista impecável e conexão genuína com cada convidado.
                </p>

                <div className="grid grid-cols-3 gap-3 pt-4">
                  {[
                    { n: "+14", l: "Anos de estrada" },
                    { n: "+600", l: "Shows realizados" },
                    { n: "100%", l: "Satisfação" },
                  ].map((s) => (
                    <div
                      key={s.l}
                      className="rounded-xl p-5 text-center border border-white/10 bg-white/[0.03] backdrop-blur-sm"
                    >
                      <p className="font-bebas text-3xl md:text-4xl bg-gradient-to-br from-neon-pink to-fuchsia-400 bg-clip-text text-transparent tracking-wide">
                        {s.n}
                      </p>
                      <p className="text-[10px] md:text-xs text-white/60 font-oswald uppercase tracking-wider mt-1">
                        {s.l}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF — clients carousel + Mion */}
        <section className="relative z-10 py-20 md:py-24 border-b border-white/5 overflow-hidden">
          <div className="container mx-auto px-6 max-w-6xl">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center mb-12"
            >
              <p className="text-xs text-neon-pink mb-4 tracking-[0.4em] uppercase font-oswald">
                Quem confia
              </p>
              <h2 className="font-bebas text-4xl md:text-6xl text-white leading-tight">
                MARCAS QUE JÁ <span className="text-neon-pink">VIVERAM</span> A EXPERIÊNCIA
              </h2>
            </motion.div>

            {/* Marquee */}
            <div className="relative overflow-hidden mb-16 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
              <div className="flex gap-12 animate-[marquee_30s_linear_infinite] whitespace-nowrap">
                {[...clients, ...clients].map((c, i) => (
                  <span
                    key={i}
                    className="font-bebas text-3xl md:text-4xl text-white/40 hover:text-neon-pink transition-colors tracking-[0.2em]"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl mx-auto"
            >
              <div className="relative rounded-2xl border border-neon-pink/30 bg-gradient-to-br from-neon-pink/10 via-black/50 to-purple-900/20 backdrop-blur-md p-8 md:p-12 shadow-[0_0_60px_rgba(255,0,128,0.15)]">
                <Quote
                  className="absolute -top-4 -left-2 text-neon-pink/60"
                  size={56}
                  strokeWidth={1.5}
                />
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="fill-neon-pink text-neon-pink"
                    />
                  ))}
                </div>
                <p className="text-lg md:text-2xl text-white font-sans font-light italic leading-relaxed mb-6">
                  "Fantástica! A vocalista canta demais... a banda toda é espetacular."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-[1px] bg-neon-pink" />
                  <p className="font-oswald uppercase tracking-[0.25em] text-sm text-white/80">
                    Marcos Mion <span className="text-white/40">— Apresentador</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* VIDEOS */}
        <section className="relative z-10 py-20 md:py-28 border-b border-white/5">
          <div className="container mx-auto px-6 max-w-6xl">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center mb-12"
            >
              <p className="text-xs text-neon-pink mb-4 tracking-[0.4em] uppercase font-oswald">
                Sinta a energia
              </p>
              <h2 className="font-bebas text-4xl md:text-6xl text-white leading-tight">
                VEJA A BANDA <span className="text-neon-pink">AO VIVO</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {proposalVideos.map((v, i) => (
                <motion.div
                  key={v.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group"
                >
                  <div className="aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(255,0,128,0.15)] group-hover:shadow-[0_0_60px_rgba(255,0,128,0.3)] transition-shadow">
                    <iframe
                      src={`https://www.youtube.com/embed/${v.id}`}
                      title={`Barbie Kills — ${v.title}`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                  <p className="mt-3 font-oswald uppercase tracking-[0.25em] text-sm text-white/70 text-center">
                    {v.title}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SOLUTION CARDS */}
        <section className="relative z-10 py-20 md:py-28 border-b border-white/5">
          <div className="container mx-auto px-6 max-w-6xl">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center mb-14"
            >
              <p className="text-xs text-neon-pink mb-4 tracking-[0.4em] uppercase font-oswald">
                A Solução
              </p>
              <h2 className="font-bebas text-4xl md:text-6xl lg:text-7xl text-white leading-tight">
                SHOW <span className="bg-gradient-to-r from-neon-pink to-fuchsia-400 bg-clip-text text-transparent">ELETRIC BLOOM</span>
              </h2>
              <p className="mt-5 text-base md:text-lg text-white/70 max-w-2xl mx-auto font-light">
                A nossa fórmula consagrada em mais de 600 eventos premium.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  icon: Mic2,
                  title: "Formação",
                  desc: "Sexteto de elite — duas vozes, guitarra, teclado, baixo e bateria. Equipe fixa, sem freelancers.",
                },
                {
                  icon: Clock,
                  title: "Duração",
                  desc: "Até 3h30 de jornada musical, com curadoria atravessando Pop, Rock, Indie e clássicos atemporais.",
                },
                {
                  icon: Cpu,
                  title: "Infraestrutura",
                  desc: "Som e iluminação de última geração com tecnologia digital — leitura de pista impecável.",
                },
              ].map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-sm p-8 hover:border-neon-pink/40 transition-all overflow-hidden"
                >
                  <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-neon-pink/0 group-hover:bg-neon-pink/20 blur-3xl transition-all duration-500" />
                  <card.icon
                    className="text-neon-pink mb-5 relative z-10"
                    size={32}
                    strokeWidth={1.5}
                  />
                  <h3 className="font-bebas text-3xl text-white tracking-wide mb-3 relative z-10">
                    {card.title.toUpperCase()}
                  </h3>
                  <p className="text-sm md:text-base text-white/70 font-sans font-light leading-relaxed relative z-10">
                    {card.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SCOPE / REVENUES — dynamic from CRM */}
        <section className="relative z-10 py-20 md:py-28 border-b border-white/5">
          <div className="container mx-auto px-6 max-w-4xl">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center mb-14"
            >
              <p className="text-xs text-neon-pink mb-4 tracking-[0.4em] uppercase font-oswald">
                Escopo Detalhado
              </p>
              <h2 className="font-bebas text-4xl md:text-6xl text-white leading-tight">
                O QUE <span className="text-neon-pink">ENTREGAMOS</span>
              </h2>
            </motion.div>

            {revenues.length === 0 ? (
              <div className="rounded-xl p-8 text-center border border-white/10 bg-white/[0.03]">
                <p className="text-white/60 font-sans">
                  Os itens da proposta serão detalhados em breve.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
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
                      <div className="flex items-start gap-4 mb-3">
                        <CheckCircle2
                          className="text-neon-pink shrink-0 mt-1"
                          size={22}
                        />
                        <h3 className="font-bebas text-2xl md:text-3xl tracking-wider text-white leading-tight uppercase">
                          {rev.title}
                        </h3>
                      </div>
                      {rev.description && (
                        <p className="text-base text-white/70 font-sans font-light leading-relaxed pl-9 whitespace-pre-line">
                          {rev.description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* INVESTMENT TOTAL */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="relative rounded-2xl border-2 border-neon-pink/40 bg-gradient-to-br from-neon-pink/15 via-black/60 to-purple-900/30 backdrop-blur-md p-8 md:p-10 mt-10 shadow-[0_0_60px_rgba(255,0,128,0.25)] overflow-hidden"
                >
                  <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-neon-pink/20 blur-3xl" />

                  <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                    <div>
                      <p className="text-xs md:text-sm text-neon-pink uppercase font-oswald tracking-[0.4em] font-bold mb-2">
                        <Sparkles className="inline-block w-3.5 h-3.5 mr-2 -mt-1" />
                        Investimento na Experiência
                      </p>
                      <p className="text-sm text-white/70 font-sans font-light max-w-md">
                        Tudo incluso: backline completo, equipe técnica e DJ por 6 horas.
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-white/50 font-oswald uppercase tracking-[0.3em] mb-1">
                        Total
                      </p>
                      <p className="font-bebas text-5xl md:text-6xl bg-gradient-to-r from-white via-pink-100 to-neon-pink bg-clip-text text-transparent tracking-wider leading-none">
                        R$ {fmtTotal}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="relative z-10 py-20 md:py-28">
          <div className="container mx-auto px-6 max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <Music4 className="inline-block text-neon-pink mb-6" size={40} strokeWidth={1.5} />
              <h2 className="font-bebas text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight">
                VAMOS FAZER <span className="bg-gradient-to-r from-neon-pink to-fuchsia-400 bg-clip-text text-transparent">ACONTECER?</span>
              </h2>
              <p className="text-base md:text-lg text-white/70 font-sans font-light mb-10 leading-relaxed max-w-2xl mx-auto">
                Estamos à disposição para tirar dúvidas, ajustar detalhes e garantir que cada
                momento da sua celebração seja inesquecível.
              </p>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                <Button variant="hero" size="xl" className="gap-3">
                  <MessageCircle size={22} />
                  FALAR COM A PRODUÇÃO
                </Button>
              </a>
              <p className="mt-10 text-xs text-white/40 font-oswald uppercase tracking-[0.3em]">
                Barbie Kills • Música que faz história
              </p>
            </motion.div>
          </div>
        </section>

        {/* STICKY MOBILE CTA */}
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-neon-pink to-fuchsia-500 text-white font-oswald uppercase tracking-[0.2em] text-xs shadow-[0_0_30px_rgba(255,0,128,0.5)] hover:shadow-[0_0_50px_rgba(255,0,128,0.7)] transition-shadow"
        >
          <MessageCircle size={18} />
          <span className="hidden sm:inline">Falar com a Produção</span>
          <span className="sm:hidden">WhatsApp</span>
        </a>
      </main>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </>
  );
};

export default Proposta;

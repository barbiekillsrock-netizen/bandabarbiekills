import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Helmet } from "react-helmet-async";
import { publicSupabase } from "@/integrations/supabase/publicClient";
import { Button } from "@/components/ui/button";
import { Sparkles, MessageCircle, CheckCircle2 } from "lucide-react";

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

const WHATSAPP = "https://wa.me/5519981736659";

const proposalVideos = [
  { id: "rAVb_-U7OAU", title: "Show Completo" },
  { id: "s0BHAN9Edew", title: "Casamento" },
  { id: "RLIIDCt0MlA", title: "Evento Corporativo" },
];

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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="font-bebas text-2xl tracking-widest text-neon-pink animate-pulse">
          CARREGANDO PROPOSTA...
        </p>
      </div>
    );
  }

  if (notFound || !data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
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

  return (
    <>
      <Helmet>
        <title>Proposta Comercial | Barbie Kills</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <main className="min-h-screen bg-background overflow-x-hidden">
        {/* HERO */}
        <section className="relative py-20 md:py-28 section-gradient border-b border-white/5">
          <div className="container mx-auto px-6 max-w-5xl text-center">
            <p className="subtitle text-neon-pink text-sm md:text-base mb-4 tracking-[0.3em] uppercase font-oswald">
              Proposta Exclusiva
            </p>
            <h1 className="heading-display text-5xl md:text-7xl lg:text-8xl text-foreground mb-6 leading-none">
              <span className="neon-pink-text">{opp.client_name}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-sans max-w-2xl mx-auto leading-relaxed">
              Preparamos uma experiência musical sob medida para o seu{" "}
              <span className="text-foreground font-semibold">
                {opp.event_type || "evento"}
              </span>
              {fmtDate && (
                <>
                  {" "}em <span className="text-foreground font-semibold">{fmtDate}</span>
                </>
              )}
              .
            </p>

            {(opp.location || opp.guests) && (
              <div className="mt-8 flex flex-wrap justify-center gap-3 text-xs md:text-sm font-oswald uppercase tracking-wider">
                {opp.location && (
                  <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-foreground">
                    📍 {opp.location}
                  </span>
                )}
                {opp.guests && (
                  <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-foreground">
                    👥 {opp.guests} convidados
                  </span>
                )}
              </div>
            )}
          </div>
        </section>

        {/* APRESENTAÇÃO DA BANDA */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="text-center mb-12">
              <p className="subtitle text-sm text-neon-pink mb-3 tracking-[0.25em] uppercase font-oswald">
                Quem somos
              </p>
              <p className="heading-display text-4xl md:text-6xl text-foreground mb-6 leading-tight">
                A <span className="neon-pink-text">BARBIE KILLS</span>
              </p>
              <p className="text-base md:text-lg text-muted-foreground font-sans max-w-3xl mx-auto leading-relaxed">
                Mais de 600 shows realizados e uma trajetória consolidada como referência em
                casamentos de luxo e eventos corporativos premium em Campinas, São Paulo e
                Interior. Nossa entrega vai além da música: desenhamos a atmosfera perfeita
                para o momento mais importante da sua celebração.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-12">
              {[
                { n: "600+", l: "Shows realizados" },
                { n: "100%", l: "Equipe fixa de elite" },
                { n: "5★", l: "Avaliação dos clientes" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="glass-card rounded-xl p-6 text-center border border-white/10 bg-white/[0.03]"
                >
                  <p className="font-bebas text-4xl md:text-5xl text-neon-pink tracking-wide">
                    {s.n}
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground font-oswald uppercase tracking-wider mt-1">
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* VÍDEOS */}
        <section className="py-16 md:py-20 section-gradient">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="text-center mb-10">
              <p className="subtitle text-sm text-neon-pink mb-3 tracking-[0.25em] uppercase font-oswald">
                Sinta a energia
              </p>
              <p className="heading-display text-4xl md:text-6xl text-foreground leading-tight">
                CONHEÇA <span className="neon-pink-text">NOSSO SOM</span>
              </p>
            </div>

            <div className="aspect-video rounded-2xl overflow-hidden video-glow mb-6">
              <iframe
                src={`https://www.youtube.com/embed/${proposalVideos[0].id}`}
                title={`Barbie Kills — ${proposalVideos[0].title}`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {proposalVideos.slice(1).map((v) => (
                <div
                  key={v.id}
                  className="aspect-video rounded-2xl overflow-hidden video-glow"
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${v.id}`}
                    title={`Barbie Kills — ${v.title}`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ESCOPO / SERVIÇOS */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-12">
              <p className="subtitle text-sm text-neon-pink mb-3 tracking-[0.25em] uppercase font-oswald">
                <Sparkles className="inline-block w-4 h-4 mr-2 -mt-1" />
                Escopo da Proposta
              </p>
              <p className="heading-display text-4xl md:text-6xl text-foreground leading-tight">
                O QUE <span className="neon-pink-text">ENTREGAMOS</span>
              </p>
            </div>

            {revenues.length === 0 ? (
              <div className="glass-card rounded-xl p-8 text-center border border-white/10">
                <p className="text-muted-foreground font-sans">
                  Os itens da proposta serão detalhados em breve.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {revenues.map((rev) => (
                  <div
                    key={rev.id}
                    className="glass-card rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden"
                  >
                    <div className="p-6 md:p-8">
                      <div className="flex items-start gap-4 mb-4">
                        <CheckCircle2
                          className="text-neon-pink shrink-0 mt-1"
                          size={22}
                        />
                        <h3 className="font-bebas text-2xl md:text-3xl tracking-wider text-foreground leading-tight uppercase">
                          {rev.title}
                        </h3>
                      </div>
                      {rev.description && (
                        <p className="text-base text-muted-foreground font-sans leading-relaxed pl-9 whitespace-pre-line">
                          {rev.description}
                        </p>
                      )}
                      <div className="flex justify-end mt-5 pt-4 border-t border-white/5">
                        <p className="font-bebas text-2xl md:text-3xl text-neon-pink tracking-wider">
                          R${" "}
                          {(Number(rev.sale_value) || 0).toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* TOTAL */}
                <div className="glass-card rounded-xl border-2 border-neon-pink/40 bg-gradient-to-br from-neon-pink/10 via-black/40 to-black/40 p-8 mt-8 shadow-[0_0_40px_rgba(255,0,128,0.15)]">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <p className="text-xs md:text-sm text-neon-pink uppercase font-oswald tracking-[0.3em] font-bold mb-1">
                        Investimento Total
                      </p>
                      <p className="text-xs text-muted-foreground font-sans">
                        Valor consolidado de todos os serviços inclusos.
                      </p>
                    </div>
                    <p className="font-bebas text-5xl md:text-6xl text-foreground tracking-wider leading-none">
                      R${" "}
                      {total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="py-16 md:py-24 section-gradient border-t border-white/5">
          <div className="container mx-auto px-6 max-w-3xl text-center">
            <p className="heading-display text-4xl md:text-6xl text-foreground mb-6 leading-tight">
              VAMOS FAZER <span className="neon-pink-text">ACONTECER?</span>
            </p>
            <p className="text-base md:text-lg text-muted-foreground font-sans mb-10 leading-relaxed max-w-2xl mx-auto">
              Estamos à disposição para tirar dúvidas, ajustar detalhes e garantir que
              cada momento da sua celebração seja inesquecível.
            </p>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
              <Button variant="hero" size="xl" className="gap-3">
                <MessageCircle size={22} />
                FALAR COM A PRODUÇÃO
              </Button>
            </a>
            <p className="mt-8 text-xs text-muted-foreground font-oswald uppercase tracking-[0.25em]">
              Barbie Kills • Música que faz história
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Proposta;

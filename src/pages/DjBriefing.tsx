import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Send, Music, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const STYLES = [
  "Axé",
  "Black Music",
  "Eletrônica (Dance / House / Psy)",
  "Flash Back anos 60/70/80",
  "Forró",
  "Funk Brasileiro",
  "Lounge e Ambiente (início da festa)",
  "MPB",
  "Pop Rock Nacional e Internacional",
  "Samba",
  "Pagode",
  "Sertanejo",
] as const;

const LEVELS = ["nao_tocar", "pouco", "normal", "muito"] as const;
const LEVEL_LABELS: Record<string, string> = {
  nao_tocar: "Não Tocar",
  pouco: "Pouco",
  normal: "Normal",
  muito: "Muito",
};
const LEVEL_UNSELECTED = "border-white/10 bg-white/5 text-white/40";
const LEVEL_SELECTED = "border-neon-pink bg-neon-pink text-white";

type WishlistItem = { music: string; artist: string };

const DjBriefing = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const [styles, setStyles] = useState<Record<string, string>>({});
  const [wishlist, setWishlist] = useState<WishlistItem[]>([{ music: "", artist: "" }]);
  const [specialMoments, setSpecialMoments] = useState<WishlistItem[]>([{ music: "", artist: "" }]);
  const [authorizedNames, setAuthorizedNames] = useState("");
  const [blacklist, setBlacklist] = useState("");
  const [observations, setObservations] = useState("");

  // Stored data for read-only completed view
  const [storedData, setStoredData] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      const { data, error } = await supabase
        .from("music_briefings")
        .select("*")
        .eq("opportunity_id", id)
        .maybeSingle();

      if (error || !data) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      if (data.status === "completed") {
        setCompleted(true);
        setStoredData(data);
      } else {
        // Load any partial data
        const sj = data.styles_json as Record<string, string> | null;
        if (sj && Object.keys(sj).length > 0) setStyles(sj);
        const wl = data.wishlist as WishlistItem[] | null;
        if (wl && wl.length > 0) setWishlist(wl);
        const sm = data.special_moments as WishlistItem[] | null;
        if (sm && sm.length > 0) setSpecialMoments(sm);
        if (data.authorized_names) setAuthorizedNames(data.authorized_names);
        if (data.blacklist) setBlacklist(data.blacklist);
        if (data.observations) setObservations(data.observations);
      }
      setLoading(false);
    };
    load();
  }, [id]);

  const handleSubmit = async () => {
    setSubmitting(true);
    const cleanWishlist = wishlist.filter((w) => w.music.trim() || w.artist.trim());
    const cleanSpecial = specialMoments.filter((w) => w.music.trim() || w.artist.trim());

    const now = new Date();
    // GMT-3
    const submitted_at = new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString();

    const { error } = await supabase
      .from("music_briefings")
      .update({
        styles_json: styles,
        wishlist: cleanWishlist,
        special_moments: cleanSpecial,
        authorized_names: authorizedNames || null,
        blacklist: blacklist || null,
        observations: observations || null,
        status: "completed",
        submitted_at,
      })
      .eq("opportunity_id", id!)
      .eq("status", "pending");

    if (error) {
      toast.error("Erro ao enviar o briefing. Tente novamente.");
      setSubmitting(false);
      return;
    }

    setCompleted(true);
    setStoredData({
      styles_json: styles,
      wishlist: cleanWishlist,
      special_moments: cleanSpecial,
      authorized_names: authorizedNames,
      blacklist,
      observations,
      submitted_at,
    });
    setSubmitting(false);
  };

  const addWishlistRow = () => setWishlist((prev) => [...prev, { music: "", artist: "" }]);
  const removeWishlistRow = (i: number) => setWishlist((prev) => prev.filter((_, idx) => idx !== i));
  const updateWishlist = (i: number, field: keyof WishlistItem, val: string) =>
    setWishlist((prev) => prev.map((item, idx) => (idx === i ? { ...item, [field]: val } : item)));

  const addSpecialRow = () => setSpecialMoments((prev) => [...prev, { music: "", artist: "" }]);
  const removeSpecialRow = (i: number) => setSpecialMoments((prev) => prev.filter((_, idx) => idx !== i));
  const updateSpecial = (i: number, field: keyof WishlistItem, val: string) =>
    setSpecialMoments((prev) => prev.map((item, idx) => (idx === i ? { ...item, [field]: val } : item)));

  if (loading)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Music className="text-neon-pink animate-pulse" size={48} />
      </div>
    );

  if (notFound)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="font-bebas text-4xl text-white mb-4">Link Inválido</h1>
          <p className="text-muted-foreground">Este formulário não foi encontrado ou ainda não foi gerado.</p>
        </div>
      </div>
    );

  if (completed) {
    const sd = storedData;
    const sj = (sd?.styles_json || {}) as Record<string, string>;
    const wl = (sd?.wishlist || []) as WishlistItem[];
    const sm = (sd?.special_moments || []) as WishlistItem[];

    return (
      <>
        <Helmet>
          <title>Briefing Finalizado | Barbie Kills</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="min-h-screen bg-black p-4 md:p-8">
          <div className="max-w-2xl mx-auto text-center py-12">
            <img
              src="/barbie-kills-banda-eventos-casamentos-nav.webp"
              alt="Barbie Kills"
              className="h-12 mx-auto mb-6"
            />
            <CheckCircle className="text-green-400 mx-auto mb-6" size={64} />
            <h1 className="font-bebas text-4xl md:text-5xl text-white mb-4 tracking-wider">
              Briefing Recebido com Sucesso!
            </h1>
            <p className="text-muted-foreground text-lg mb-12">
              A Barbie Kills já está preparando a trilha do seu sonho.
            </p>

            {/* Read-only summary */}
            <div className="text-left space-y-6">
              {Object.keys(sj).length > 0 && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h2 className="font-bebas text-xl text-white mb-4 tracking-wider">Estilos Selecionados</h2>
                  <div className="space-y-2">
                    {STYLES.map((s) =>
                      sj[s] ? (
                        <div key={s} className="flex justify-between text-sm">
                          <span className="text-white">{s}</span>
                          <span className="text-muted-foreground">{LEVEL_LABELS[sj[s]] || sj[s]}</span>
                        </div>
                      ) : null,
                    )}
                  </div>
                </div>
              )}
              {wl.length > 0 && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h2 className="font-bebas text-xl text-white mb-4 tracking-wider">Para Animar Ainda Mais</h2>
                  {wl.map((w, i) => (
                    <p key={i} className="text-sm text-white">
                      {w.music} — {w.artist}
                    </p>
                  ))}
                </div>
              )}
              {sm.length > 0 && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h2 className="font-bebas text-xl text-white mb-4 tracking-wider">Momentos Especiais</h2>
                  {sm.map((w, i) => (
                    <p key={i} className="text-sm text-white">
                      {w.music} — {w.artist}
                    </p>
                  ))}
                </div>
              )}
              {(sd?.authorized_names || sd?.blacklist || sd?.observations) && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
                  {sd.authorized_names && (
                    <div>
                      <h3 className="font-bebas text-lg text-white tracking-wider">Autorizados a Pedir</h3>
                      <p className="text-sm text-white">{sd.authorized_names}</p>
                    </div>
                  )}
                  {sd.blacklist && (
                    <div>
                      <h3 className="font-bebas text-lg text-white tracking-wider">O Que Não Tocar</h3>
                      <p className="text-sm text-white">{sd.blacklist}</p>
                    </div>
                  )}
                  {sd.observations && (
                    <div>
                      <h3 className="font-bebas text-lg text-white tracking-wider">Observações</h3>
                      <p className="text-sm text-white">{sd.observations}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  // ─── EDITABLE FORM ─────────────────────────────────────────
  return (
    <>
      <Helmet>
        <title>Briefing para o DJ | Barbie Kills</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen bg-black">
        {/* Header */}
        <div className="bg-gradient-to-b from-black via-[#0a0010] to-black border-b border-white/10">
          <div className="max-w-2xl mx-auto px-4 py-8 text-center">
            <img
              src="/barbie-kills-banda-eventos-casamentos-nav.webp"
              alt="Barbie Kills"
              className="h-10 mx-auto mb-4"
            />
            <h1 className="font-bebas text-3xl md:text-4xl text-white tracking-wider mb-2">Briefing para o DJ</h1>
            <p className="text-muted-foreground text-base">
              Olá! Defina aqui a vibe que você deseja para a pista de dança com nosso DJ.
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-8 space-y-10">
          {/* SEÇÃO 1: TERMÔMETRO DE ESTILOS */}
          <section>
            <h2 className="font-bebas text-2xl text-white tracking-wider mb-6">Termômetro de Estilos</h2>
            <div className="space-y-4">
              {STYLES.map((style) => (
                <div key={style} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-white font-semibold text-base mb-3">{style}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {LEVELS.map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setStyles((prev) => ({ ...prev, [style]: level }))}
                        className={`py-3 px-2 rounded-lg border text-xs font-bold uppercase tracking-wider transition-all ${
                          styles[style] === level ? LEVEL_SELECTED : LEVEL_UNSELECTED + " hover:bg-white/10"
                        }`}
                      >
                        {LEVEL_LABELS[level]}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SEÇÃO 2: DESEJOS */}
          <section>
            <h2 className="font-bebas text-2xl text-white tracking-wider mb-6">Para Animar Ainda Mais</h2>
            <div className="space-y-3">
              {wishlist.map((item, i) => (
                <div key={i} className="flex gap-2">
                  <Input
                    placeholder="Música"
                    value={item.music}
                    onChange={(e) => updateWishlist(i, "music", e.target.value)}
                    className="bg-black/40 border-white/10 rounded-md p-4 h-auto text-base font-sans text-foreground flex-1"
                  />
                  <Input
                    placeholder="Artista"
                    value={item.artist}
                    onChange={(e) => updateWishlist(i, "artist", e.target.value)}
                    className="bg-black/40 border-white/10 rounded-md p-4 h-auto text-base font-sans text-foreground flex-1"
                  />
                  {wishlist.length > 1 && (
                    <Button variant="ghost" size="icon" onClick={() => removeWishlistRow(i)} className="text-red-400 shrink-0">
                      <Trash2 size={18} />
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="ghost" onClick={addWishlistRow} className="text-neon-pink text-sm">
                <Plus size={16} className="mr-1" /> Adicionar Música
              </Button>
            </div>

            <h2 className="font-bebas text-2xl text-white tracking-wider mt-10 mb-6">Momentos Especiais</h2>
            <p className="text-muted-foreground text-sm mb-4">
              Entrada, dança dos noivos, buquê, saída... associe a música ao momento.
            </p>
            <div className="space-y-3">
              {specialMoments.map((item, i) => (
                <div key={i} className="flex gap-2">
                  <Input
                    placeholder="Música / Momento"
                    value={item.music}
                    onChange={(e) => updateSpecial(i, "music", e.target.value)}
                    className="bg-black/40 border-white/10 rounded-md p-4 h-auto text-base font-sans text-foreground flex-1"
                  />
                  <Input
                    placeholder="Artista"
                    value={item.artist}
                    onChange={(e) => updateSpecial(i, "artist", e.target.value)}
                    className="bg-black/40 border-white/10 rounded-md p-4 h-auto text-base font-sans text-foreground flex-1"
                  />
                  {specialMoments.length > 1 && (
                    <Button variant="ghost" size="icon" onClick={() => removeSpecialRow(i)} className="text-red-400 shrink-0">
                      <Trash2 size={18} />
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="ghost" onClick={addSpecialRow} className="text-neon-pink text-sm">
                <Plus size={16} className="mr-1" /> Adicionar Momento
              </Button>
            </div>
          </section>

          {/* SEÇÃO 3: GOVERNANÇA */}
          <section>
            <h2 className="font-bebas text-2xl text-white tracking-wider mb-6">Governança & Restrições</h2>
            <div className="space-y-6">
              <div>
                <Label className="text-white text-sm font-bold uppercase tracking-wider mb-2 block">
                  Autorizados a Pedir Músicas
                </Label>
                <textarea
                  className="w-full min-h-[80px] bg-black/40 border border-white/10 rounded-md p-4 text-base font-sans text-foreground outline-none focus:border-neon-pink/50"
                  value={authorizedNames}
                  onChange={(e) => setAuthorizedNames(e.target.value)}
                  placeholder="Nomes das pessoas que podem solicitar músicas ao DJ..."
                />
              </div>
              <div>
                <Label className="text-white text-sm font-bold uppercase tracking-wider mb-2 block">
                  O QUE NÃO TOCAR
                </Label>
                <textarea
                  className="w-full min-h-[100px] bg-black/40 border border-white/10 rounded-md p-4 text-base font-sans text-foreground outline-none focus:border-neon-pink/50"
                  value={blacklist}
                  onChange={(e) => setBlacklist(e.target.value)}
                  placeholder="Músicas, artistas ou estilos que devem ser evitados..."
                />
              </div>
              <div>
                <Label className="text-white text-sm font-bold uppercase tracking-wider mb-2 block">
                  Observações Gerais
                </Label>
                <textarea
                  className="w-full min-h-[100px] bg-black/40 border border-white/10 rounded-md p-4 text-base font-sans text-foreground outline-none focus:border-neon-pink/50"
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                  placeholder="Detalhes adicionais, horários, momentos específicos, clima desejado..."
                />
              </div>
            </div>
          </section>

          {/* SUBMIT */}
          <div className="pt-4 pb-16">
            <Button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full py-8 bg-neon-pink hover:bg-pink-600 text-white font-bebas text-2xl tracking-wider uppercase"
            >
              {submitting ? (
                "Enviando..."
              ) : (
                <>
                  <Send size={20} className="mr-3" /> Finalizar Briefing
                </>
              )}
            </Button>
            <p className="text-muted-foreground text-xs text-center mt-4 uppercase tracking-wider">
              Após finalizar, o briefing não poderá ser editado.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DjBriefing;

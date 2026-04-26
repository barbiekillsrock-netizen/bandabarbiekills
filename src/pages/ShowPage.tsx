import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Music, Loader2, CheckCircle2, Copy, Sparkles, Lock, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { publicSupabase as supabase } from "@/integrations/supabase/publicClient";
import type { RealtimeChannel } from "@supabase/supabase-js";

type SetlistStatus = "available" | "pending" | "locked" | "played";

interface SetlistRow {
  id: string;
  show_id: string;
  status: SetlistStatus;
  custom_min_price: number | null;
  custom_sug_price: number | null;
  position: number;
  song: { title: string; artist: string | null; default_min_price: number; default_sug_price: number } | null;
}

interface ActiveShow {
  id: string;
  location: string;
  event_date: string;
}

const ShowPage = () => {
  const [activeShow, setActiveShow] = useState<ActiveShow | null>(null);
  const [setlist, setSetlist] = useState<SetlistRow[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [selected, setSelected] = useState<SetlistRow | null>(null);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // PIX result
  const [pix, setPix] = useState<{
    payment_id: string; qr_code: string | null; qr_code_base64: string | null; ticket_url: string | null;
  } | null>(null);
  const [paid, setPaid] = useState(false);

  // Carrega show ativo + setlist
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      const { data: shows } = await supabase
        .from("shows")
        .select("id, location, event_date, is_active")
        .eq("is_active", true)
        .limit(1);
      const show = shows?.[0] ?? null;
      if (!mounted) return;
      if (!show) {
        setActiveShow(null); setSetlist([]); setLoading(false); return;
      }
      setActiveShow({ id: show.id, location: show.location, event_date: show.event_date });

      const { data: list } = await supabase
        .from("show_setlist")
        .select("id, show_id, status, custom_min_price, custom_sug_price, position, song:songs(title, artist, default_min_price, default_sug_price)")
        .eq("show_id", show.id)
        .order("position", { ascending: true });
      if (!mounted) return;
      setSetlist((list ?? []) as unknown as SetlistRow[]);
      setLoading(false);
    };
    load();

    // Realtime: shows + setlist
    const channels: RealtimeChannel[] = [];
    const c1 = supabase.channel("public:shows-show")
      .on("postgres_changes", { event: "*", schema: "public", table: "shows" }, () => load())
      .subscribe();
    const c2 = supabase.channel("public:setlist-show")
      .on("postgres_changes", { event: "*", schema: "public", table: "show_setlist" }, () => load())
      .subscribe();
    channels.push(c1, c2);

    return () => { mounted = false; channels.forEach((c) => supabase.removeChannel(c)); };
  }, []);

  // Realtime do próprio pagamento (após gerar PIX)
  useEffect(() => {
    if (!pix?.payment_id) return;
    const ch = supabase.channel(`payment:${pix.payment_id}`)
      .on("postgres_changes",
        { event: "UPDATE", schema: "public", table: "payments", filter: `id=eq.${pix.payment_id}` },
        (payload) => {
          const newStatus = (payload.new as { status: string }).status;
          if (newStatus === "approved") setPaid(true);
        })
      .subscribe();

    // Polling fallback (2s) caso Realtime não chegue
    const poll = setInterval(async () => {
      const { data } = await supabase.rpc("get_payment_status", { p_payment_id: pix.payment_id });
      if (data && data[0]?.status === "approved") setPaid(true);
    }, 3000);

    return () => { supabase.removeChannel(ch); clearInterval(poll); };
  }, [pix?.payment_id]);

  const sortedList = useMemo(() => {
    return [...setlist].sort((a, b) => {
      const order: Record<SetlistStatus, number> = { available: 0, pending: 1, locked: 2, played: 3 };
      return order[a.status] - order[b.status] || a.position - b.position;
    });
  }, [setlist]);

  const openModal = (row: SetlistRow) => {
    if (row.status !== "available") return;
    const sug = row.custom_sug_price ?? row.song?.default_sug_price ?? 50;
    setSelected(row); setAmount(String(sug)); setName(""); setPix(null); setPaid(false);
  };

  const handleGeneratePix = async () => {
    if (!selected) return;
    const cleanName = name.trim();
    if (cleanName.length < 1) { toast.error("Diga seu nome"); return; }
    const min = Number(selected.custom_min_price ?? selected.song?.default_min_price ?? 1);
    const amt = Number(amount);
    if (!Number.isFinite(amt) || amt < min) {
      toast.error(`Valor mínimo: R$ ${min.toFixed(2)}`); return;
    }

    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-pix", {
        body: { show_setlist_id: selected.id, requester_name: cleanName, amount: amt },
      });
      if (error || !data?.payment_id) {
        toast.error(data?.error ?? "Falha ao gerar PIX. Tente outra música.");
        return;
      }
      setPix(data);
    } catch {
      toast.error("Erro de conexão. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  const closeModal = () => {
    setSelected(null); setPix(null); setPaid(false); setName(""); setAmount("");
  };

  const copyPix = async () => {
    if (!pix?.qr_code) return;
    try { await navigator.clipboard.writeText(pix.qr_code); toast.success("Código PIX copiado!"); }
    catch { toast.error("Não foi possível copiar"); }
  };

  return (
    <>
      <Helmet>
        <title>Pedidos ao Vivo | Barbie Kills</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="Peça sua música preferida no show ao vivo da Barbie Kills via PIX." />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />

        <main className="flex-1 pt-28 pb-24 px-4">
          <div className="max-w-2xl mx-auto">
            {loading ? (
              <div className="flex items-center justify-center py-32">
                <Loader2 className="w-8 h-8 animate-spin text-neon-pink" />
              </div>
            ) : !activeShow ? (
              <WaitingState />
            ) : (
              <>
                <header className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-pink/40 bg-neon-pink/10 text-neon-pink text-xs font-oswald uppercase tracking-widest mb-5">
                    <span className="w-2 h-2 rounded-full bg-neon-pink animate-pulse" />
                    Ao Vivo Agora
                  </div>
                  <h1 className="font-bebas text-5xl md:text-6xl text-white leading-none mb-2">
                    Peça sua música
                  </h1>
                  <p className="font-oswald uppercase tracking-wider text-neon-cyan text-sm">
                    {activeShow.location}
                  </p>
                </header>

                <ul className="space-y-3">
                  {sortedList.map((row) => (
                    <SetlistCard key={row.id} row={row} onPick={openModal} />
                  ))}
                </ul>

                <p className="text-center text-xs text-white/40 mt-10 font-light">
                  Pagamento seguro via PIX. A música entra na fila assim que confirmamos o pagamento.
                </p>
              </>
            )}
          </div>
        </main>

        <Footer variant="minimal" />
      </div>

      {/* MODAL DE PEDIDO */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && closeModal()}>
        <DialogContent className="bg-black/95 border border-neon-pink/30 text-white max-w-md">
          {!pix ? (
            <>
              <DialogHeader>
                <DialogTitle className="font-bebas text-3xl text-white tracking-wide">
                  {selected?.song?.title}
                </DialogTitle>
                <DialogDescription className="text-white/60 font-light">
                  {selected?.song?.artist ?? "Diga seu nome — a banda chama você no microfone."}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div>
                  <Label className="text-white/80 text-xs uppercase font-oswald tracking-wider">Seu nome / apelido</Label>
                  <Input
                    value={name} onChange={(e) => setName(e.target.value)} maxLength={60}
                    placeholder="Como quer ser chamado(a)?"
                    className="mt-1 bg-white/5 border-white/10 text-white placeholder:text-white/30"
                  />
                </div>
                <div>
                  <Label className="text-white/80 text-xs uppercase font-oswald tracking-wider">Valor (R$)</Label>
                  <Input
                    type="number" inputMode="decimal" min={selected?.custom_min_price ?? selected?.song?.default_min_price ?? 1}
                    value={amount} onChange={(e) => setAmount(e.target.value)}
                    className="mt-1 bg-white/5 border-white/10 text-white text-lg font-bebas tracking-wide"
                  />
                  <p className="text-xs text-white/40 mt-1.5">
                    Mínimo: R$ {Number(selected?.custom_min_price ?? selected?.song?.default_min_price ?? 0).toFixed(2)}
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleGeneratePix} disabled={submitting} variant="neonPink" size="lg" className="w-full">
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Gerar PIX <Sparkles className="w-4 h-4" /></>}
                </Button>
              </DialogFooter>
            </>
          ) : (
            <AnimatePresence mode="wait">
              {!paid ? (
                <motion.div key="pix" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <DialogHeader>
                    <DialogTitle className="font-bebas text-3xl text-white">Pague para entrar na fila</DialogTitle>
                    <DialogDescription className="text-white/60">
                      Aponte o app do banco no QR ou copie o código. Esta tela atualiza sozinha quando o pagamento cair.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col items-center gap-4 py-4">
                    {pix.qr_code_base64 && (
                      <img
                        src={`data:image/png;base64,${pix.qr_code_base64}`}
                        alt="QR Code PIX"
                        className="w-56 h-56 rounded-lg bg-white p-2"
                      />
                    )}
                    <Button onClick={copyPix} variant="neonPinkOutline" className="w-full">
                      <Copy className="w-4 h-4" /> Copiar código PIX
                    </Button>
                    <p className="text-xs text-white/40 flex items-center gap-1.5">
                      <Clock className="w-3 h-3" /> Expira em 5 minutos
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="paid" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-8">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.1 }}>
                    <CheckCircle2 className="w-20 h-20 text-neon-cyan mx-auto mb-4" />
                  </motion.div>
                  <h3 className="font-bebas text-4xl text-white mb-2">Pedido Confirmado!</h3>
                  <p className="text-white/70 font-light">A banda já sabe.<br/>Logo, logo é a sua música.</p>
                  <Button onClick={closeModal} variant="neonPink" className="mt-6">Fechar</Button>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

const SetlistCard = ({ row, onPick }: { row: SetlistRow; onPick: (r: SetlistRow) => void }) => {
  const sug = row.custom_sug_price ?? row.song?.default_sug_price ?? 50;
  const min = row.custom_min_price ?? row.song?.default_min_price ?? 1;

  if (row.status === "locked" || row.status === "played") {
    return (
      <li className="rounded-xl border border-white/5 bg-white/[0.02] px-5 py-4 flex items-center justify-between opacity-50">
        <div>
          <p className="font-bebas text-2xl text-white/60 leading-tight tracking-wide">{row.song?.title}</p>
          {row.song?.artist && <p className="text-xs text-white/30 font-oswald uppercase">{row.song.artist}</p>}
        </div>
        <span className="text-xs font-oswald uppercase tracking-widest text-neon-cyan flex items-center gap-1.5">
          <Lock className="w-3 h-3" /> Esgotada
        </span>
      </li>
    );
  }

  if (row.status === "pending") {
    return (
      <li className="rounded-xl border border-yellow-500/30 bg-yellow-500/[0.04] px-5 py-4 flex items-center justify-between">
        <div>
          <p className="font-bebas text-2xl text-white/80 leading-tight tracking-wide">{row.song?.title}</p>
          {row.song?.artist && <p className="text-xs text-white/40 font-oswald uppercase">{row.song.artist}</p>}
        </div>
        <span className="text-xs font-oswald uppercase tracking-widest text-yellow-400 flex items-center gap-1.5">
          <Clock className="w-3 h-3 animate-pulse" /> Em negociação
        </span>
      </li>
    );
  }

  return (
    <li>
      <button
        onClick={() => onPick(row)}
        className="w-full text-left rounded-xl border border-neon-pink/20 bg-gradient-to-r from-neon-pink/[0.06] to-transparent px-5 py-4 flex items-center justify-between gap-4 transition-all duration-200 hover:border-neon-pink/60 hover:from-neon-pink/[0.12] active:scale-[0.99]"
      >
        <div className="min-w-0">
          <p className="font-bebas text-2xl text-white leading-tight tracking-wide truncate">{row.song?.title}</p>
          {row.song?.artist && <p className="text-xs text-white/50 font-oswald uppercase truncate">{row.song.artist}</p>}
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <p className="text-[10px] text-white/40 font-oswald uppercase tracking-wider leading-none">a partir de</p>
            <p className="font-bebas text-xl text-neon-pink leading-tight">R$ {Number(min).toFixed(0)}</p>
          </div>
          <div className="px-3 py-2 rounded-md bg-neon-pink text-white font-oswald uppercase tracking-wider text-xs">
            Pedir
          </div>
        </div>
      </button>
    </li>
  );
};

const WaitingState = () => (
  <div className="text-center py-32">
    <Music className="w-16 h-16 text-neon-pink/40 mx-auto mb-6" />
    <h1 className="font-bebas text-5xl text-white mb-3 tracking-wide">Aguarde o show começar</h1>
    <p className="text-white/50 font-light max-w-sm mx-auto">
      Quando a Barbie Kills subir ao palco, esta tela libera os pedidos musicais ao vivo.
    </p>
  </div>
);

export default ShowPage;

import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { ArrowLeft, Check, Music, Plus, Play, Archive, History } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table";

interface Payment {
  id: string;
  requester_name: string;
  amount: number;
  status: string;
  approved_at: string | null;
  played_at: string | null;
  show_setlist_id: string;
  is_manual: boolean;
  play_state: string;
  setlist: { id: string; song: { title: string; artist: string | null; style: string | null } | null } | null;
}
interface SlotOption { id: string; song: { title: string } | null; }

const AdminPalco = () => {
  const { showId } = useParams<{ showId: string }>();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [slots, setSlots] = useState<SlotOption[]>([]);
  const [manualSlot, setManualSlot] = useState("");
  const [manualName, setManualName] = useState("");
  const [manualAmount, setManualAmount] = useState("");
  const [open, setOpen] = useState(false);

  const load = async () => {
    if (!showId) return;
    const [pRes, sRes] = await Promise.all([
      supabase.from("payments")
        .select("*, setlist:show_setlist(id, song:songs(title, artist, style))")
        .eq("show_id", showId)
        .eq("status", "approved")
        .order("amount", { ascending: false })
        .order("created_at", { ascending: true }),
      supabase.from("show_setlist").select("id, song:songs(title)").eq("show_id", showId),
    ]);
    setPayments((pRes.data ?? []) as unknown as Payment[]);
    setSlots((sRes.data ?? []) as unknown as SlotOption[]);
  };

  useEffect(() => {
    load();
    const ch = supabase.channel(`palco:${showId}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "payments", filter: `show_id=eq.${showId}` }, load)
      .on("postgres_changes", { event: "*", schema: "public", table: "show_setlist", filter: `show_id=eq.${showId}` }, load)
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [showId]);

  // Particiona pagamentos
  const { queue, history, discarded } = useMemo(() => {
    const q: Payment[] = [];
    const h: Payment[] = [];
    const d: Payment[] = [];
    for (const p of payments) {
      if (p.play_state === "concluida") h.push(p);
      else if (p.play_state === "descartada") d.push(p);
      else q.push(p); // queued + tocando
    }
    return { queue: q, history: h, discarded: d };
  }, [payments]);

  const setPlaying = async (paymentId: string) => {
    const { error } = await supabase.functions.invoke("stage-action", {
      body: { action: "set_playing", payment_id: paymentId },
    });
    if (error) toast.error("Falha"); else toast.success("Tocando agora");
  };

  const setConcluida = async (paymentId: string) => {
    const { error } = await supabase.functions.invoke("stage-action", {
      body: { action: "set_concluida", payment_id: paymentId },
    });
    if (error) toast.error("Falha"); else toast.success("Concluída");
  };

  const setDescartada = async (paymentId: string) => {
    if (!confirm("Descartar esse pedido? Vai sair da fila ativa (mas fica registrado).")) return;
    const { error } = await supabase.functions.invoke("stage-action", {
      body: { action: "set_descartada", payment_id: paymentId },
    });
    if (error) toast.error("Falha"); else toast.success("Descartado");
  };

  const submitManual = async () => {
    if (!manualSlot || !manualName) { toast.error("Música e nome obrigatórios"); return; }
    const { error } = await supabase.functions.invoke("stage-action", {
      body: { action: "manual_payment", setlist_id: manualSlot, requester_name: manualName, amount: Number(manualAmount) || 0 },
    });
    if (error) toast.error("Falha"); else {
      toast.success("Adicionado à fila"); setOpen(false);
      setManualSlot(""); setManualName(""); setManualAmount("");
    }
  };

  return (
    <>
      <Helmet><title>Painel de Palco | Admin</title><meta name="robots" content="noindex" /></Helmet>
      <div className="min-h-screen bg-black text-white">
        <header className="border-b border-white/10 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/admin/shows" className="text-white/40 hover:text-white"><ArrowLeft className="w-5 h-5" /></Link>
            <h1 className="font-bebas text-2xl tracking-wider">PAINEL DE PALCO</h1>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="neonPinkOutline" size="sm"><Plus className="w-4 h-4" /> Manual</Button>
            </DialogTrigger>
            <DialogContent className="bg-black border border-neon-pink/30 text-white max-w-md">
              <DialogHeader><DialogTitle className="font-bebas text-2xl">Pagamento Manual</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-white/60 uppercase">Música</Label>
                  <Select value={manualSlot} onValueChange={setManualSlot}>
                    <SelectTrigger className="bg-white/5 border-white/10"><SelectValue placeholder="Escolha..." /></SelectTrigger>
                    <SelectContent className="bg-black border-white/10 text-white">
                      {slots.map((s) => <SelectItem key={s.id} value={s.id}>{s.song?.title}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs text-white/60 uppercase">Nome do fã</Label>
                  <Input value={manualName} onChange={(e) => setManualName(e.target.value)} className="bg-white/5 border-white/10" />
                </div>
                <div>
                  <Label className="text-xs text-white/60 uppercase">Valor R$ (opcional)</Label>
                  <Input type="number" value={manualAmount} onChange={(e) => setManualAmount(e.target.value)} className="bg-white/5 border-white/10" />
                </div>
                <Button onClick={submitManual} variant="neonPink" className="w-full">Confirmar</Button>
              </div>
            </DialogContent>
          </Dialog>
        </header>

        <main className="p-4 md:p-8 max-w-6xl mx-auto">
          <Tabs defaultValue="queue">
            <TabsList className="bg-white/5 mb-6">
              <TabsTrigger value="queue">
                <Music className="w-4 h-4 mr-2" /> Fila Ativa ({queue.length})
              </TabsTrigger>
              <TabsTrigger value="history">
                <History className="w-4 h-4 mr-2" /> Histórico ({history.length})
              </TabsTrigger>
              <TabsTrigger value="discarded">
                <Archive className="w-4 h-4 mr-2" /> Descartados ({discarded.length})
              </TabsTrigger>
            </TabsList>

            {/* FILA ATIVA */}
            <TabsContent value="queue">
              {queue.length === 0 ? (
                <EmptyState text="Fila vazia" subtitle="Aguardando pedidos pagos..." />
              ) : (
                <div className="rounded-xl border border-white/10 overflow-hidden">
                  <Table>
                    <TableHeader className="bg-white/5">
                      <TableRow className="border-b border-white/10 hover:bg-transparent">
                        <TableHead className="w-28">Valor</TableHead>
                        <TableHead>Fã</TableHead>
                        <TableHead className="hidden md:table-cell">Música</TableHead>
                        <TableHead className="hidden lg:table-cell">Confirmado</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {queue.map((p) => {
                        const isPlaying = p.play_state === "tocando";
                        return (
                          <TableRow
                            key={p.id}
                            className={`border-b border-white/5 ${
                              isPlaying
                                ? "bg-neon-pink/15 shadow-[inset_0_0_20px_hsl(326_100%_50%/0.25)] animate-pulse"
                                : "hover:bg-white/[0.02]"
                            }`}
                          >
                            <TableCell className="font-bebas text-2xl text-neon-pink">
                              R$ {Number(p.amount).toFixed(0)}
                            </TableCell>
                            <TableCell>
                              <div className="font-medium text-white">{p.requester_name}</div>
                              {p.is_manual && <span className="text-[10px] text-white/40 uppercase">manual</span>}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              <div className="font-bebas text-lg tracking-wide">{p.setlist?.song?.title ?? "—"}</div>
                              {p.setlist?.song?.artist && (
                                <div className="text-xs text-white/40 font-oswald uppercase">{p.setlist.song.artist}</div>
                              )}
                            </TableCell>
                            <TableCell className="hidden lg:table-cell text-xs text-white/50">
                              {p.approved_at ? new Date(p.approved_at).toLocaleTimeString("pt-BR") : "—"}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-1.5 flex-wrap">
                                <Button
                                  onClick={() => setPlaying(p.id)}
                                  size="sm"
                                  variant={isPlaying ? "neonPink" : "neonPinkOutline"}
                                  className="text-xs"
                                >
                                  <Play className="w-3.5 h-3.5" />
                                  {isPlaying ? "Tocando" : "Tocar"}
                                </Button>
                                <Button
                                  onClick={() => setConcluida(p.id)}
                                  size="sm"
                                  variant="outline"
                                  className="border-neon-cyan/40 text-neon-cyan hover:bg-neon-cyan/10 text-xs"
                                >
                                  <Check className="w-3.5 h-3.5" /> Concluir
                                </Button>
                                <Button
                                  onClick={() => setDescartada(p.id)}
                                  size="sm"
                                  variant="ghost"
                                  className="text-white/40 hover:text-red-400 hover:bg-red-500/10"
                                >
                                  <Archive className="w-3.5 h-3.5" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>

            {/* HISTÓRICO */}
            <TabsContent value="history">
              {history.length === 0 ? (
                <EmptyState text="Sem histórico" subtitle="Nenhum pedido foi concluído ainda." />
              ) : (
                <ArchiveTable items={history} />
              )}
            </TabsContent>

            {/* DESCARTADOS */}
            <TabsContent value="discarded">
              {discarded.length === 0 ? (
                <EmptyState text="Nenhum descarte" subtitle="Pedidos descartados aparecem aqui." />
              ) : (
                <ArchiveTable items={discarded} />
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </>
  );
};

const ArchiveTable = ({ items }: { items: Payment[] }) => (
  <div className="rounded-xl border border-white/10 overflow-hidden">
    <Table>
      <TableHeader className="bg-white/5">
        <TableRow className="border-b border-white/10 hover:bg-transparent">
          <TableHead className="w-24">Valor</TableHead>
          <TableHead>Fã</TableHead>
          <TableHead className="hidden md:table-cell">Música</TableHead>
          <TableHead className="hidden md:table-cell">Confirmado</TableHead>
          <TableHead className="hidden lg:table-cell">Tocada</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((p) => (
          <TableRow key={p.id} className="border-b border-white/5 hover:bg-white/[0.02]">
            <TableCell className="font-bebas text-lg text-neon-pink/80">R$ {Number(p.amount).toFixed(0)}</TableCell>
            <TableCell>{p.requester_name}</TableCell>
            <TableCell className="hidden md:table-cell">
              <div className="font-bebas text-base tracking-wide">{p.setlist?.song?.title ?? "—"}</div>
              {p.setlist?.song?.artist && (
                <div className="text-xs text-white/40 font-oswald uppercase">{p.setlist.song.artist}</div>
              )}
            </TableCell>
            <TableCell className="hidden md:table-cell text-xs text-white/50">
              {p.approved_at ? new Date(p.approved_at).toLocaleString("pt-BR") : "—"}
            </TableCell>
            <TableCell className="hidden lg:table-cell text-xs text-white/50">
              {p.played_at ? new Date(p.played_at).toLocaleString("pt-BR") : "—"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

const EmptyState = ({ text, subtitle }: { text: string; subtitle: string }) => (
  <div className="text-center py-32">
    <Music className="w-20 h-20 text-white/20 mx-auto mb-6" />
    <p className="font-bebas text-3xl text-white/60 tracking-wide">{text}</p>
    <p className="text-white/40 mt-2">{subtitle}</p>
  </div>
);

export default AdminPalco;

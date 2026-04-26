import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { ArrowLeft, Check, Music, Plus } from "lucide-react";
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

interface Payment {
  id: string; requester_name: string; amount: number; status: string;
  approved_at: string | null; played_at: string | null; show_setlist_id: string;
  is_manual: boolean;
  setlist: { id: string; song: { title: string; artist: string | null } | null } | null;
}
interface SlotOption { id: string; song: { title: string } | null; }

const AdminPalco = () => {
  const { showId } = useParams<{ showId: string }>();
  const [queue, setQueue] = useState<Payment[]>([]);
  const [slots, setSlots] = useState<SlotOption[]>([]);
  const [manualSlot, setManualSlot] = useState("");
  const [manualName, setManualName] = useState("");
  const [manualAmount, setManualAmount] = useState("");
  const [open, setOpen] = useState(false);

  const load = async () => {
    if (!showId) return;
    const [pRes, sRes] = await Promise.all([
      supabase.from("payments")
        .select("*, setlist:show_setlist(id, song:songs(title, artist))")
        .eq("show_id", showId).eq("status", "approved").is("played_at", null)
        .order("approved_at", { ascending: true }),
      supabase.from("show_setlist").select("id, song:songs(title)").eq("show_id", showId),
    ]);
    setQueue((pRes.data ?? []) as unknown as Payment[]);
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

  const markPlayed = async (slotId: string) => {
    const { error } = await supabase.functions.invoke("stage-action", {
      body: { action: "mark_played", setlist_id: slotId },
    });
    if (error) toast.error("Falha"); else toast.success("Marcada como tocada");
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

        <main className="p-4 md:p-8 max-w-3xl mx-auto">
          {queue.length === 0 ? (
            <div className="text-center py-32">
              <Music className="w-20 h-20 text-white/20 mx-auto mb-6" />
              <p className="font-bebas text-3xl text-white/60 tracking-wide">Fila vazia</p>
              <p className="text-white/40 mt-2">Aguardando pedidos pagos...</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {queue.map((p, i) => (
                <li key={p.id} className={`rounded-2xl border-2 ${i === 0 ? "border-neon-pink bg-neon-pink/10" : "border-white/10 bg-white/[0.03]"} p-5 md:p-6 flex items-center justify-between gap-4`}>
                  <div className="min-w-0 flex items-center gap-4">
                    <div className={`w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center font-bebas text-xl md:text-2xl ${i === 0 ? "bg-neon-pink text-white" : "bg-white/10 text-white/60"}`}>
                      {i + 1}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bebas text-2xl md:text-4xl text-white tracking-wide truncate leading-none">
                        {p.setlist?.song?.title}
                      </p>
                      <p className="text-xs md:text-sm text-neon-cyan font-oswald uppercase tracking-wider mt-1">
                        Pedida por {p.requester_name} {p.is_manual && "· manual"}
                      </p>
                    </div>
                  </div>
                  <Button onClick={() => markPlayed(p.show_setlist_id)} variant="neonPink" size="lg" className="shrink-0">
                    <Check className="w-5 h-5" /> Tocada
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </main>
      </div>
    </>
  );
};

export default AdminPalco;

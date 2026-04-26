import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { ArrowLeft, Plus, Trash2, GripVertical } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select";

interface Show { id: string; location: string; event_date: string; is_active: boolean; }
interface Song { id: string; title: string; artist: string | null; default_min_price: number; default_sug_price: number; }
interface SetlistRow {
  id: string; song_id: string; status: string; position: number;
  custom_min_price: number | null; custom_sug_price: number | null;
  song: Song | null;
}

const AdminShowDetail = () => {
  const { showId } = useParams<{ showId: string }>();
  const [show, setShow] = useState<Show | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [setlist, setSetlist] = useState<SetlistRow[]>([]);
  const [pickSongId, setPickSongId] = useState("");

  const load = async () => {
    if (!showId) return;
    const [s1, s2, s3] = await Promise.all([
      supabase.from("shows").select("*").eq("id", showId).maybeSingle(),
      supabase.from("songs").select("*").eq("active", true).order("title"),
      supabase.from("show_setlist").select("*, song:songs(*)").eq("show_id", showId).order("position"),
    ]);
    setShow(s1.data as Show);
    setSongs((s2.data ?? []) as Song[]);
    setSetlist((s3.data ?? []) as unknown as SetlistRow[]);
  };
  useEffect(() => { load(); }, [showId]);

  const addToSetlist = async () => {
    if (!pickSongId || !showId) return;
    const pos = setlist.length;
    const { error } = await supabase.from("show_setlist").insert({ show_id: showId, song_id: pickSongId, position: pos });
    if (error) toast.error(error.message); else { toast.success("Adicionada"); setPickSongId(""); load(); }
  };

  const updatePrice = async (id: string, field: "custom_min_price" | "custom_sug_price", val: string) => {
    const v = val === "" ? null : Number(val);
    const patch = field === "custom_min_price" ? { custom_min_price: v } : { custom_sug_price: v };
    await supabase.from("show_setlist").update(patch).eq("id", id);
  };

  const removeFromSetlist = async (id: string) => {
    if (!confirm("Remover do setlist?")) return;
    const { error } = await supabase.from("show_setlist").delete().eq("id", id);
    if (error) toast.error(error.message); else load();
  };

  const release = async (id: string) => {
    await supabase.functions.invoke("stage-action", { body: { action: "release_slot", setlist_id: id } });
    toast.success("Slot liberado"); load();
  };

  const availableSongs = songs.filter((s) => !setlist.some((r) => r.song_id === s.id));

  return (
    <>
      <Helmet><title>Setlist · {show?.location ?? ""} | Admin</title><meta name="robots" content="noindex" /></Helmet>
      <div className="min-h-screen bg-background text-white">
        <header className="border-b border-white/10 px-6 py-4 flex items-center gap-3">
          <Link to="/admin/shows" className="text-white/60 hover:text-white"><ArrowLeft className="w-5 h-5" /></Link>
          <div>
            <h1 className="font-bebas text-2xl tracking-wider">{show?.location ?? "..."}</h1>
            <p className="text-xs text-white/50">{show && new Date(show.event_date).toLocaleDateString("pt-BR")}</p>
          </div>
        </header>

        <main className="max-w-4xl mx-auto p-6 space-y-6">
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
            <h2 className="font-bebas text-xl tracking-wide mb-3">Adicionar do Repertório</h2>
            <div className="flex gap-3">
              <Select value={pickSongId} onValueChange={setPickSongId}>
                <SelectTrigger className="bg-white/5 border-white/10"><SelectValue placeholder="Escolha uma música..." /></SelectTrigger>
                <SelectContent className="bg-black border-white/10 text-white">
                  {availableSongs.map((s) => (
                    <SelectItem key={s.id} value={s.id}>{s.title}{s.artist ? ` — ${s.artist}` : ""}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={addToSetlist} variant="neonPink" disabled={!pickSongId}><Plus className="w-4 h-4" /> Adicionar</Button>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-white/60 font-oswald uppercase text-xs tracking-wider">
                <tr>
                  <th className="text-left p-3">Música</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-right p-3 w-28">Mín R$</th>
                  <th className="text-right p-3 w-28">Sug R$</th>
                  <th className="p-3 w-32"></th>
                </tr>
              </thead>
              <tbody>
                {setlist.map((r) => (
                  <tr key={r.id} className="border-t border-white/5">
                    <td className="p-3 font-bebas text-lg tracking-wide">{r.song?.title}</td>
                    <td className="p-3"><StatusBadge status={r.status} /></td>
                    <td className="p-3">
                      <Input type="number" defaultValue={r.custom_min_price ?? r.song?.default_min_price ?? ""} onBlur={(e) => updatePrice(r.id, "custom_min_price", e.target.value)} className="bg-white/5 border-white/10 h-8 text-right" />
                    </td>
                    <td className="p-3">
                      <Input type="number" defaultValue={r.custom_sug_price ?? r.song?.default_sug_price ?? ""} onBlur={(e) => updatePrice(r.id, "custom_sug_price", e.target.value)} className="bg-white/5 border-white/10 h-8 text-right" />
                    </td>
                    <td className="p-3 text-right space-x-1">
                      {(r.status === "pending" || r.status === "locked") && (
                        <Button onClick={() => release(r.id)} variant="ghost" size="sm" className="text-yellow-400 hover:bg-yellow-500/10 text-xs">Liberar</Button>
                      )}
                      <Button onClick={() => removeFromSetlist(r.id)} variant="ghost" size="sm" className="text-white/40 hover:text-red-400 hover:bg-red-500/10">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
                {setlist.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-white/40">Setlist vazio.</td></tr>}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const map: Record<string, { label: string; cls: string }> = {
    available: { label: "Disponível", cls: "bg-neon-cyan/15 text-neon-cyan" },
    pending: { label: "Em negociação", cls: "bg-yellow-500/15 text-yellow-400" },
    locked: { label: "Paga", cls: "bg-neon-pink/15 text-neon-pink" },
    played: { label: "Tocada", cls: "bg-white/10 text-white/40" },
  };
  const m = map[status] ?? { label: status, cls: "bg-white/10 text-white/60" };
  return <span className={`text-[10px] px-2 py-1 rounded-full font-oswald uppercase tracking-wider ${m.cls}`}>{m.label}</span>;
};

export default AdminShowDetail;

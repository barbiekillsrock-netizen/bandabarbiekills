import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { Plus, Trash2, Music, Radio, Settings, ArrowLeft, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

interface Show { id: string; location: string; event_date: string; is_active: boolean; }
interface Song {
  id: string;
  title: string;
  artist: string | null;
  default_min_price: number;
  style: string | null;
  active: boolean;
}

const AdminShows = () => {
  const [shows, setShows] = useState<Show[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  // Forms
  const [newShow, setNewShow] = useState({ location: "", event_date: "" });
  const [newSong, setNewSong] = useState({ title: "", artist: "", style: "", default_min_price: "20" });

  const load = async () => {
    setLoading(true);
    const [s1, s2] = await Promise.all([
      supabase.from("shows").select("*").order("event_date", { ascending: false }),
      supabase.from("songs").select("*").order("title", { ascending: true }),
    ]);
    setShows((s1.data ?? []) as Show[]);
    setSongs((s2.data ?? []) as unknown as Song[]);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const createShow = async () => {
    if (!newShow.location || !newShow.event_date) { toast.error("Preencha local e data"); return; }
    const { error } = await supabase.from("shows").insert(newShow);
    if (error) toast.error(error.message); else { toast.success("Show criado"); setNewShow({ location: "", event_date: "" }); load(); }
  };

  const createSong = async () => {
    if (!newSong.title) { toast.error("Título obrigatório"); return; }
    const { error } = await supabase.from("songs").insert({
      title: newSong.title,
      artist: newSong.artist || null,
      style: newSong.style.trim() || null,
      default_min_price: Number(newSong.default_min_price),
    });
    if (error) toast.error(error.message);
    else { toast.success("Música cadastrada"); setNewSong({ title: "", artist: "", style: "", default_min_price: "20" }); load(); }
  };

  const deleteSong = async (id: string) => {
    if (!confirm("Excluir música?")) return;
    const { error } = await supabase.from("songs").delete().eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Excluída"); load(); }
  };

  const toggleLive = async (showId: string, isActive: boolean) => {
    const { error } = await supabase.functions.invoke("stage-action", {
      body: { action: "toggle_live", show_id: showId, is_active: isActive },
    });
    if (error) toast.error("Falha"); else { toast.success(isActive ? "Show AO VIVO" : "Show pausado"); load(); }
  };

  const deleteShow = async (id: string) => {
    if (!confirm("Excluir show e todo o setlist?")) return;
    const { error } = await supabase.from("shows").delete().eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Excluído"); load(); }
  };

  return (
    <>
      <Helmet><title>Admin · Shows | Barbie Kills</title><meta name="robots" content="noindex" /></Helmet>
      <div className="min-h-screen bg-background text-white">
        <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/admin" className="text-white/60 hover:text-white"><ArrowLeft className="w-5 h-5" /></Link>
            <h1 className="font-bebas text-2xl tracking-wider">Live Request Engine</h1>
          </div>
          <Link to="/show" target="_blank" className="text-xs text-neon-cyan flex items-center gap-1.5 hover:underline">
            Ver /show <ExternalLink className="w-3 h-3" />
          </Link>
        </header>

        <main className="max-w-5xl mx-auto p-6">
          <Tabs defaultValue="shows">
            <TabsList className="bg-white/5">
              <TabsTrigger value="shows"><Radio className="w-4 h-4 mr-2" /> Shows</TabsTrigger>
              <TabsTrigger value="songs"><Music className="w-4 h-4 mr-2" /> Repertório</TabsTrigger>
            </TabsList>

            {/* SHOWS */}
            <TabsContent value="shows" className="space-y-6 mt-6">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
                <h2 className="font-bebas text-xl tracking-wide">Novo Show</h2>
                <div className="grid md:grid-cols-3 gap-3">
                  <Input placeholder="Local (ex: Sesc Pompeia)" value={newShow.location}
                    onChange={(e) => setNewShow({ ...newShow, location: e.target.value })}
                    className="bg-white/5 border-white/10" />
                  <Input type="date" value={newShow.event_date}
                    onChange={(e) => setNewShow({ ...newShow, event_date: e.target.value })}
                    className="bg-white/5 border-white/10" />
                  <Button onClick={createShow} variant="neonPink"><Plus className="w-4 h-4" /> Criar</Button>
                </div>
              </div>

              <div className="space-y-3">
                {loading ? <p className="text-white/40">Carregando...</p> : shows.map((s) => (
                  <div key={s.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-4 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-bebas text-xl text-white">{s.location}</p>
                        {s.is_active && <span className="text-[10px] px-2 py-0.5 rounded-full bg-neon-pink text-white font-oswald uppercase tracking-wider">Ao Vivo</span>}
                      </div>
                      <p className="text-xs text-white/50">{new Date(s.event_date).toLocaleDateString("pt-BR")}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Label className="text-xs text-white/60">Live</Label>
                        <Switch checked={s.is_active} onCheckedChange={(v) => toggleLive(s.id, v)} />
                      </div>
                      <Link to={`/admin/shows/${s.id}`}>
                        <Button variant="outline" size="sm" className="border-white/20 bg-transparent text-white hover:bg-white/5">
                          <Settings className="w-4 h-4" /> Setlist
                        </Button>
                      </Link>
                      <Link to={`/admin/palco/${s.id}`}>
                        <Button variant="neonPinkOutline" size="sm">
                          <Radio className="w-4 h-4" /> Palco
                        </Button>
                      </Link>
                      <Button onClick={() => deleteShow(s.id)} variant="ghost" size="sm" className="text-white/40 hover:text-red-400 hover:bg-red-500/10">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {!loading && shows.length === 0 && <p className="text-white/40 text-center py-8">Nenhum show cadastrado.</p>}
              </div>
            </TabsContent>

            {/* SONGS */}
            <TabsContent value="songs" className="space-y-6 mt-6">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
                <h2 className="font-bebas text-xl tracking-wide">Nova Música</h2>
                <div className="grid md:grid-cols-5 gap-3">
                  <Input placeholder="Título" value={newSong.title}
                    onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
                    className="md:col-span-2 bg-white/5 border-white/10" />
                  <Input placeholder="Artista (opcional)" value={newSong.artist}
                    onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
                    className="bg-white/5 border-white/10" />
                  <Input placeholder="Estilo (ex: Rock)" value={newSong.style}
                    onChange={(e) => setNewSong({ ...newSong, style: e.target.value })}
                    className="bg-white/5 border-white/10" />
                  <Input type="number" placeholder="Mín R$" value={newSong.default_min_price}
                    onChange={(e) => setNewSong({ ...newSong, default_min_price: e.target.value })}
                    className="bg-white/5 border-white/10" />
                </div>
                <Button onClick={createSong} variant="neonPink"><Plus className="w-4 h-4" /> Adicionar ao Repertório</Button>
              </div>

              <div className="rounded-xl border border-white/10 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-white/5 text-white/60 font-oswald uppercase text-xs tracking-wider">
                    <tr>
                      <th className="text-left p-3">Música</th>
                      <th className="text-left p-3">Artista</th>
                      <th className="text-left p-3">Estilo</th>
                      <th className="text-right p-3">Mín</th>
                      <th className="p-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {songs.map((s) => (
                      <tr key={s.id} className="border-t border-white/5">
                        <td className="p-3 font-bebas text-lg tracking-wide">{s.title}</td>
                        <td className="p-3 text-white/60">{s.artist ?? "—"}</td>
                        <td className="p-3 text-neon-cyan/80 font-oswald uppercase text-xs tracking-wider">{s.style ?? "—"}</td>
                        <td className="p-3 text-right text-neon-pink">R$ {Number(s.default_min_price).toFixed(0)}</td>
                        <td className="p-3 text-right">
                          <Button onClick={() => deleteSong(s.id)} variant="ghost" size="sm" className="text-white/40 hover:text-red-400 hover:bg-red-500/10">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {songs.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-white/40">Repertório vazio.</td></tr>}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </>
  );
};

export default AdminShows;

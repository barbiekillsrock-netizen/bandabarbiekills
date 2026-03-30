import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Save, Edit2, X } from "lucide-react";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";

type StandardItem = Tables<"standard_revenue_items">;

const AdminTemplatesTab = () => {
  const [items, setItems] = useState<StandardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const fetchItems = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("standard_revenue_items")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleCreate = async () => {
    if (!newTitle.trim()) return;
    const { data, error } = await supabase
      .from("standard_revenue_items")
      .insert([{ title: newTitle.trim(), default_description: newDesc.trim() || null }])
      .select()
      .single();
    if (error) {
      toast.error("Erro ao criar template");
      return;
    }
    if (data) {
      setItems((prev) => [data, ...prev]);
      setNewTitle("");
      setNewDesc("");
      toast.success("Template criado!");
    }
  };

  const handleUpdate = async (id: string) => {
    const { error } = await supabase
      .from("standard_revenue_items")
      .update({ title: editTitle.trim(), default_description: editDesc.trim() || null })
      .eq("id", id);
    if (error) {
      toast.error("Erro ao atualizar");
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, title: editTitle.trim(), default_description: editDesc.trim() || null } : i,
      ),
    );
    setEditingId(null);
    toast.success("Template atualizado!");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir este template?")) return;
    await supabase.from("standard_revenue_items").delete().eq("id", id);
    setItems((prev) => prev.filter((i) => i.id !== id));
    toast.success("Template excluído");
  };

  const startEdit = (item: StandardItem) => {
    setEditingId(item.id);
    setEditTitle(item.title);
    setEditDesc(item.default_description || "");
  };

  return (
    <div className="space-y-6">
      {/* Create new */}
      <div className="glass-card rounded-lg p-6 border-2 border-neon-pink/30 bg-black/40 shadow-[0_0_20px_rgba(255,0,128,0.1)]">
        <h2 className="font-bebas text-xl mb-4 text-foreground tracking-widest uppercase flex items-center gap-2">
          <Plus size={18} className="text-neon-pink" /> Novo Item do Catálogo
        </h2>
        <div className="space-y-3">
          <Input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Título do item (ex: Show Trio Acústico)"
            className="bg-black/40 border-white/10 rounded-md p-4 h-auto text-base font-sans text-foreground"
          />
          <textarea
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            placeholder="Descrição / Escopo detalhado do serviço..."
            className="w-full min-h-[120px] bg-black/40 border border-white/10 rounded-md p-4 text-base text-foreground focus:ring-1 focus:ring-neon-pink outline-none font-sans leading-relaxed resize-y"
          />
          <Button
            variant="neonPink"
            onClick={handleCreate}
            disabled={!newTitle.trim()}
            className="font-bold px-10 h-11 uppercase text-xs"
          >
            <Plus size={16} className="mr-2" /> Adicionar ao Catálogo
          </Button>
        </div>
      </div>

      {/* List */}
      {loading ? (
        <p className="text-muted-foreground">Carregando templates...</p>
      ) : items.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">Nenhum item no catálogo.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="glass-card rounded-lg p-6 bg-black/30 border border-white/10 hover:border-neon-pink/20 transition-colors"
            >
              {editingId === item.id ? (
                <div className="space-y-3">
                  <Input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="bg-black/40 border-neon-pink/40 rounded-md p-4 h-auto text-base font-sans text-foreground"
                  />
                  <textarea
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    className="w-full min-h-[120px] bg-black/40 border border-neon-pink/40 rounded-md p-4 text-base text-foreground focus:ring-1 focus:ring-neon-pink outline-none font-sans leading-relaxed resize-y"
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleUpdate(item.id)}
                      className="bg-neon-pink hover:bg-neon-pink/80 text-white font-bold text-xs px-6"
                    >
                      <Save size={14} className="mr-1" /> Salvar
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setEditingId(null)}
                      className="text-muted-foreground"
                    >
                      <X size={14} className="mr-1" /> Cancelar
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bebas text-xl tracking-wide text-foreground">{item.title}</h3>
                    {item.default_description && (
                      <p className="text-base text-muted-foreground mt-2 whitespace-pre-wrap leading-relaxed font-sans">
                        {item.default_description}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => startEdit(item)}
                      className="text-muted-foreground hover:text-neon-pink"
                    >
                      <Edit2 size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500/50 hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminTemplatesTab;

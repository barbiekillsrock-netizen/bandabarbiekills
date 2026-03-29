import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import {
  ArrowLeft,
  Sparkles,
  RotateCcw,
  Save,
  AlertTriangle,
  X,
  ClipboardList,
  UserCircle2,
  Calendar,
  MapPin,
  Users,
  Phone,
  Trash2,
  Plus,
  DollarSign,
} from "lucide-react";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";
import { generateAISalesMessage } from "@/services/aiService";
import AiMessageModal from "@/components/AiMessageModal";

type Opportunity = Tables<"opportunities">;
type RevenueItem = Tables<"revenue_items">;
type CostItem = Tables<"cost_items">;

const statusColors: Record<string, string> = {
  new: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  contacted: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  negotiating: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  won: "bg-green-500/20 text-green-300 border-green-500/30",
  lost: "bg-red-500/20 text-red-300 border-red-500/30",
};

const AdminOpportunityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [opp, setOpp] = useState<Opportunity | null>(null);
  const [revenues, setRevenues] = useState<RevenueItem[]>([]);
  const [costs, setCosts] = useState<CostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [masterPrompt, setMasterPrompt] = useState("");
  const [localCustomPrompt, setLocalCustomPrompt] = useState("");
  const [isSavingPrompt, setIsSavingPrompt] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  // New item forms
  const [newRevTitle, setNewRevTitle] = useState("");
  const [newRevValue, setNewRevValue] = useState("");
  const [newCostDesc, setNewCostDesc] = useState("");
  const [newCostValue, setNewCostValue] = useState("");

  const profileRef = useRef<ReturnType<typeof setTimeout>>();
  const negotiationRef = useRef<ReturnType<typeof setTimeout>>();
  const repertoireRef = useRef<ReturnType<typeof setTimeout>>();

  const [aiLoading, setAiLoading] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  const [aiModalOpen, setAiModalOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      const [oppRes, revRes, costRes, settingsRes] = await Promise.all([
        supabase.from("opportunities").select("*").eq("id", id).single(),
        supabase.from("revenue_items").select("*").eq("opportunity_id", id).order("created_at"),
        supabase.from("cost_items").select("*").eq("opportunity_id", id).order("created_at"),
        supabase.from("site_settings").select("value").eq("key", "master_sales_prompt").single(),
      ]);

      if (oppRes.data) {
        setOpp(oppRes.data);
        const mPrompt = settingsRes.data?.value || "";
        setMasterPrompt(mPrompt);
        setLocalCustomPrompt(oppRes.data.custom_prompt || mPrompt);
      }
      if (revRes.data) setRevenues(revRes.data);
      if (costRes.data) setCosts(costRes.data);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const updateField = useCallback(
    async (field: string, value: any) => {
      if (!id) return;
      await supabase
        .from("opportunities")
        .update({ [field]: value })
        .eq("id", id);
      setOpp((prev) => (prev ? { ...prev, [field]: value } : prev));
    },
    [id],
  );

  const handleSaveCustomPrompt = async () => {
    setIsSavingPrompt(true);
    try {
      await updateField("custom_prompt", localCustomPrompt);
      toast.success("Estratégia salva!");
    } catch (error) {
      toast.error("Erro ao salvar.");
    } finally {
      setIsSavingPrompt(false);
    }
  };

  const handleDebouncedSave = useCallback(
    (field: string, value: string, ref: React.MutableRefObject<ReturnType<typeof setTimeout> | undefined>) => {
      setOpp((prev) => (prev ? { ...prev, [field]: value } : prev));
      if (ref.current) clearTimeout(ref.current);
      ref.current = setTimeout(() => {
        updateField(field, value || null);
      }, 2000);
    },
    [updateField],
  );

  const handleGenerateAI = async () => {
    if (!opp) return;
    setAiLoading(true);
    try {
      const message = await generateAISalesMessage(opp, localCustomPrompt);
      setAiMessage(message);
      setAiModalOpen(true);
    } catch (err: any) {
      toast.error("IA ocupada.");
    } finally {
      setAiLoading(false);
    }
  };

  // Funções Financeiras (RESTAURADAS)
  const addRevenue = async () => {
    if (!newRevTitle.trim() || !id) return;
    const { data } = await supabase
      .from("revenue_items")
      .insert([{ title: newRevTitle.trim(), sale_value: parseFloat(newRevValue) || 0, opportunity_id: id }])
      .select()
      .single();
    if (data) {
      setRevenues((prev) => [...prev, data]);
      setNewRevTitle("");
      setNewRevValue("");
      toast.success("Receita adicionada");
    }
  };

  const deleteRevenue = async (revId: string) => {
    await supabase.from("revenue_items").delete().eq("id", revId);
    setRevenues((prev) => prev.filter((r) => r.id !== revId));
  };

  const addCost = async () => {
    if (!newCostDesc.trim() || !id) return;
    const { data } = await supabase
      .from("cost_items")
      .insert([{ description: newCostDesc.trim(), cost_value: parseFloat(newCostValue) || 0, opportunity_id: id }])
      .select()
      .single();
    if (data) {
      setCosts((prev) => [...prev, data]);
      setNewCostDesc("");
      setNewCostValue("");
      toast.success("Custo adicionado");
    }
  };

  const deleteCost = async (costId: string) => {
    await supabase.from("cost_items").delete().eq("id", costId);
    setCosts((prev) => prev.filter((c) => c.id !== costId));
  };

  const totalRevenue = revenues.reduce((sum, r) => sum + (r.sale_value || 0), 0);
  const totalCost = costs.reduce((sum, c) => sum + (c.cost_value || 0), 0);
  const profit = totalRevenue - totalCost;

  if (loading)
    return (
      <div className="p-20 text-center font-bebas text-2xl text-neon-pink animate-pulse">SINCRONIZANDO DADOS...</div>
    );
  if (!opp) return null;

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex" />
        <title>{opp.client_name} | CRM BK</title>
      </Helmet>

      <div className="min-h-screen bg-[#050505] text-white p-4 md:p-8 max-w-6xl mx-auto">
        <Button variant="ghost" onClick={() => navigate("/admin")} className="mb-6 opacity-60 hover:opacity-100">
          <ArrowLeft size={18} className="mr-2" /> VOLTAR
        </Button>

        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6 bg-black/40 p-8 rounded-2xl border border-white/5">
          <h1 className="font-bebas text-5xl tracking-widest uppercase">{opp.client_name}</h1>
          <div className="flex gap-3">
            <Button
              onClick={handleGenerateAI}
              disabled={aiLoading}
              className="bg-neon-pink hover:bg-neon-pink/80 text-white font-black px-10 py-7 text-lg shadow-lg shadow-neon-pink/30"
            >
              <Sparkles size={20} className="mr-2" /> {aiLoading ? "GERANDO..." : "GERAR MENSAGEM"}
            </Button>
            <Select value={opp.status || "new"} onValueChange={(val) => updateField("status", val)}>
              <SelectTrigger className={`w-40 border-2 ${statusColors[opp.status || "new"]}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black border-white/10">
                <SelectItem value="new">NOVO</SelectItem>
                <SelectItem value="contacted">CONTATADO</SelectItem>
                <SelectItem value="negotiating">NEGOCIANDO</SelectItem>
                <SelectItem value="won">FECHADO</SelectItem>
                <SelectItem value="lost">PERDIDO</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* --- GRID DE DADOS DO EVENTO (RESTORED) --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/[0.03] p-4 rounded-xl border border-white/5">
            <p className="text-[10px] text-muted-foreground uppercase font-bold flex items-center gap-2 mb-1">
              <Calendar size={12} /> Data
            </p>
            <p className="text-sm">
              {opp.event_date ? new Date(opp.event_date + "T00:00:00").toLocaleDateString("pt-BR") : "—"}
            </p>
          </div>
          <div className="bg-white/[0.03] p-4 rounded-xl border border-white/5">
            <p className="text-[10px] text-muted-foreground uppercase font-bold flex items-center gap-2 mb-1">
              <MapPin size={12} /> Local
            </p>
            <p className="text-sm">{opp.location || "—"}</p>
          </div>
          <div className="bg-white/[0.03] p-4 rounded-xl border border-white/5">
            <p className="text-[10px] text-muted-foreground uppercase font-bold flex items-center gap-2 mb-1">
              <Users size={12} /> Público
            </p>
            <p className="text-sm">{opp.guests || "—"}</p>
          </div>
          <div className="bg-white/[0.03] p-4 rounded-xl border border-white/5">
            <p className="text-[10px] text-muted-foreground uppercase font-bold flex items-center gap-2 mb-1">
              <Phone size={12} /> WhatsApp
            </p>
            <div className="flex items-center gap-2">
              <p className="text-sm">{opp.phone || "—"}</p>
              {opp.phone && (
                <a
                  href={`https://wa.me/55${opp.phone.replace(/\D/g, "")}`}
                  target="_blank"
                  className="p-1 bg-green-500/20 text-green-400 rounded"
                >
                  <Phone size={10} />
                </a>
              )}
            </div>
          </div>
        </div>

        <Tabs defaultValue="resumo">
          <TabsList className="bg-white/5 p-1 h-14 mb-8">
            <TabsTrigger value="resumo" className="px-8 font-bold uppercase tracking-widest">
              RESUMO
            </TabsTrigger>
            <TabsTrigger value="financeiro" className="px-8 font-bold uppercase tracking-widest">
              CALCULADORA
            </TabsTrigger>
            <TabsTrigger value="repertorio" className="px-8 font-bold uppercase tracking-widest">
              REPERTÓRIO
            </TabsTrigger>
          </TabsList>

          <TabsContent value="resumo" className="space-y-8 animate-in fade-in duration-500">
            <section className="glass-card rounded-3xl p-8 border-2 border-neon-pink/40 bg-black/40">
              <div className="flex justify-between items-center mb-6">
                <Label className="text-neon-pink text-xs font-black uppercase tracking-widest">
                  Estratégia Personalizada
                </Label>
                <div className="flex gap-4">
                  <Button variant="ghost" size="sm" onClick={() => setResetDialogOpen(true)} className="text-[9px]">
                    <RotateCcw size={12} className="mr-1" /> RESETAR
                  </Button>
                  <Button
                    onClick={handleSaveCustomPrompt}
                    disabled={isSavingPrompt}
                    className="bg-green-600 hover:bg-green-500 text-white font-black px-6"
                  >
                    <Save size={16} className="mr-2" /> SALVAR ESTRATÉGIA
                  </Button>
                </div>
              </div>
              <textarea
                className="w-full min-h-[220px] bg-black/60 border border-white/10 rounded-2xl p-6 text-base text-gray-200 focus:border-neon-pink outline-none"
                value={localCustomPrompt}
                onChange={(e) => setLocalCustomPrompt(e.target.value)}
              />
            </section>

            <section className="space-y-4">
              <Label className="text-[10px] uppercase font-bold opacity-50">Perfil do Lead (Auto-save)</Label>
              <textarea
                className="w-full min-h-[150px] bg-white/5 border border-white/10 rounded-2xl p-6 text-gray-300 outline-none focus:border-white/30"
                value={opp.client_profile || ""}
                onChange={(e) => handleDebouncedSave("client_profile", e.target.value, profileRef)}
              />
            </section>

            <section className="space-y-4">
              <Label className="text-[10px] uppercase font-bold opacity-50">Histórico de Negociação (Auto-save)</Label>
              <textarea
                className="w-full min-h-[150px] bg-white/5 border border-white/10 rounded-2xl p-6 text-gray-300 outline-none focus:border-white/30"
                value={opp.negotiation_history || ""}
                onChange={(e) => handleDebouncedSave("negotiation_history", e.target.value, negotiationRef)}
              />
            </section>
          </TabsContent>

          <TabsContent value="financeiro" className="space-y-8 animate-in fade-in duration-500">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Receitas */}
              <div className="bg-black/30 p-6 rounded-2xl border border-white/5">
                <h3 className="font-bebas text-2xl mb-4 text-green-400">Receitas</h3>
                <div className="flex gap-2 mb-4">
                  <Input
                    value={newRevTitle}
                    onChange={(e) => setNewRevTitle(e.target.value)}
                    placeholder="Item"
                    className="bg-black/40"
                  />
                  <Input
                    value={newRevValue}
                    onChange={(e) => setNewRevValue(e.target.value)}
                    placeholder="R$"
                    type="number"
                    className="w-24 bg-black/40"
                  />
                  <Button onClick={addRevenue} className="bg-green-600">
                    <Plus size={16} />
                  </Button>
                </div>
                {revenues.map((r) => (
                  <div key={r.id} className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-sm">{r.title}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-green-400 font-bold">R$ {r.sale_value?.toLocaleString("pt-BR")}</span>
                      <button onClick={() => deleteRevenue(r.id)}>
                        <Trash2 size={14} className="text-red-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {/* Custos */}
              <div className="bg-black/30 p-6 rounded-2xl border border-white/5">
                <h3 className="font-bebas text-2xl mb-4 text-red-400">Custos</h3>
                <div className="flex gap-2 mb-4">
                  <Input
                    value={newCostDesc}
                    onChange={(e) => setNewCostDesc(e.target.value)}
                    placeholder="Custo"
                    className="bg-black/40"
                  />
                  <Input
                    value={newCostValue}
                    onChange={(e) => setNewCostValue(e.target.value)}
                    placeholder="R$"
                    type="number"
                    className="w-24 bg-black/40"
                  />
                  <Button onClick={addCost} className="bg-red-600">
                    <Plus size={16} />
                  </Button>
                </div>
                {costs.map((c) => (
                  <div key={c.id} className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-sm">{c.description}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-red-400 font-bold">R$ {c.cost_value?.toLocaleString("pt-BR")}</span>
                      <button onClick={() => deleteCost(c.id)}>
                        <Trash2 size={14} className="text-red-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Resumo Financeiro */}
            <div className="bg-neon-pink/10 p-8 rounded-3xl border border-neon-pink/30 flex justify-around text-center">
              <div>
                <p className="text-xs uppercase opacity-60 mb-2">Total Receita</p>
                <p className="text-3xl font-bebas text-green-400">R$ {totalRevenue.toLocaleString("pt-BR")}</p>
              </div>
              <div>
                <p className="text-xs uppercase opacity-60 mb-2">Total Custos</p>
                <p className="text-3xl font-bebas text-red-400">R$ {totalCost.toLocaleString("pt-BR")}</p>
              </div>
              <div>
                <p className="text-xs uppercase opacity-60 mb-2">Lucro BK</p>
                <p className={`text-4xl font-bebas ${profit >= 0 ? "text-green-400" : "text-red-400"}`}>
                  R$ {profit.toLocaleString("pt-BR")}
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="repertorio" className="animate-in fade-in duration-500">
            <section className="glass-card rounded-3xl p-8 border border-white/10">
              <Label className="text-xs font-bold uppercase opacity-50 mb-4 block">
                Setlist e Observações Técnicas (Auto-save)
              </Label>
              <textarea
                className="w-full min-h-[400px] bg-black/40 border border-white/10 rounded-2xl p-8 text-base text-gray-200 outline-none focus:border-neon-pink transition-all font-mono"
                value={opp.requested_repertoire || ""}
                onChange={(e) => handleDebouncedSave("requested_repertoire", e.target.value, repertoireRef)}
                placeholder="Músicas pedidas, restrições de volume, formação técnica específica..."
              />
            </section>
          </TabsContent>
        </Tabs>

        {/* --- MODAL RESET --- */}
        {resetDialogOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in">
            <div className="bg-[#111] w-[90%] max-w-sm p-10 rounded-3xl border-2 border-neon-pink">
              <h2 className="font-bebas text-4xl mb-4 text-white flex items-center gap-3">
                <AlertTriangle className="text-neon-pink" /> RESETAR?
              </h2>
              <p className="text-gray-400 text-sm mb-10 leading-relaxed">
                Apagar sua estratégia personalizada para este lead?
              </p>
              <div className="flex flex-col gap-3 font-bold">
                <Button
                  onClick={handleResetPromptConfirm}
                  className="bg-neon-pink hover:bg-neon-pink/80 text-white py-6"
                >
                  SIM, RESETAR
                </Button>
                <Button variant="ghost" onClick={() => setResetDialogOpen(false)} className="text-white">
                  CANCELAR
                </Button>
              </div>
            </div>
          </div>
        )}

        <AiMessageModal
          open={aiModalOpen}
          onOpenChange={setAiModalOpen}
          message={aiMessage}
          opportunityId={opp.id}
          phone={opp.phone}
        />
      </div>
    </>
  );
};

export default AdminOpportunityDetail;

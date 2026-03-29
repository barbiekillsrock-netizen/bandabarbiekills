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
import { ArrowLeft, Plus, Trash2, Sparkles, Save, RotateCcw, AlertTriangle, FileText } from "lucide-react";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";
import { generateAISalesMessage } from "@/services/aiService";
import AiMessageModal from "@/components/AiMessageModal";

type Opportunity = Tables<"opportunities">;
type RevenueItem = Tables<"revenue_items"> & { cost_items?: Tables<"cost_items">[] };

const statusOptions = [
  { value: "new", label: "Novo" },
  { value: "contacted", label: "Contatado" },
  { value: "negotiating", label: "Negociando" },
  { value: "won", label: "Fechado" },
  { value: "lost", label: "Perdido" },
];

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
  const [loading, setLoading] = useState(true);

  // AI & Prompt States
  const [aiLoading, setAiLoading] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [masterPrompt, setMasterPrompt] = useState("");
  const [localCustomPrompt, setLocalCustomPrompt] = useState("");
  const [isSavingPrompt, setIsSavingPrompt] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  // Form states
  const [newRevTitle, setNewRevTitle] = useState("");
  const [newRevValue, setNewRevValue] = useState("");

  // Debounce refs
  const negotiationRef = useRef<ReturnType<typeof setTimeout>>();
  const repertoireRef = useRef<ReturnType<typeof setTimeout>>();
  const profileRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      const [oppRes, revRes, settingsRes] = await Promise.all([
        supabase.from("opportunities").select("*").eq("id", id).single(),
        supabase.from("revenue_items").select("*, cost_items(*)").eq("opportunity_id", id).order("created_at"),
        supabase.from("site_settings").select("value").eq("key", "master_sales_prompt").single(),
      ]);

      if (oppRes.data) {
        setOpp(oppRes.data);
        const mPrompt = settingsRes.data?.value || "";
        setMasterPrompt(mPrompt);
        setLocalCustomPrompt(oppRes.data.custom_prompt || mPrompt);
      }
      if (revRes.data) setRevenues(revRes.data);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const updateField = useCallback(async (field: string, value: any) => {
    if (!id) return;
    await supabase.from("opportunities").update({ [field]: value }).eq("id", id);
    setOpp((prev) => (prev ? { ...prev, [field]: value } : prev));
  }, [id]);

  const handleDebouncedSave = useCallback((field: string, value: string, ref: React.MutableRefObject<ReturnType<typeof setTimeout> | undefined>) => {
    setOpp((prev) => (prev ? { ...prev, [field]: value } : prev));
    if (ref.current) clearTimeout(ref.current);
    ref.current = setTimeout(() => {
      updateField(field, value || null);
      toast.success("Salvo automaticamente");
    }, 2000);
  }, [updateField]);

  const handleStatusChange = async (status: string) => {
    await updateField("status", status);
    toast.success(`Status atualizado para "${statusOptions.find((s) => s.value === status)?.label}"`);
  };

  // --- REVENUE & COST LOGIC ---
  const addRevenue = async () => {
    if (!newRevTitle.trim() || !id) return;
    const { data } = await supabase.from("revenue_items").insert([{ title: newRevTitle.trim(), sale_value: parseFloat(newRevValue) || 0, opportunity_id: id }]).select().single();
    if (data) {
      setRevenues(prev => [...prev, { ...data, cost_items: [] }]);
      setNewRevTitle(""); setNewRevValue("");
      toast.success("Receita adicionada");
    }
  };

  const addCostToRevenue = async (revId: string, desc: string, val: number) => {
    const { data } = await supabase.from("cost_items").insert([{ description: desc, cost_value: val, opportunity_id: id, revenue_item_id: revId }]).select().single();
    if (data) {
      setRevenues(prev => prev.map(r => r.id === revId ? { ...r, cost_items: [...(r.cost_items || []), data] } : r));
      toast.success("Custo adicionado");
    }
  };

  const deleteRevenue = async (revId: string) => {
    await supabase.from("revenue_items").delete().eq("id", revId);
    setRevenues(prev => prev.filter(r => r.id !== revId));
  };

  const deleteCost = async (costId: string, revId: string) => {
    await supabase.from("cost_items").delete().eq("id", costId);
    setRevenues(prev => prev.map(r => r.id === revId ? { ...r, cost_items: r.cost_items?.filter(c => c.id !== costId) } : r));
  };

  const handleGenerateAI = async () => {
    if (!opp) return;
    setAiLoading(true);
    try {
      const message = await generateAISalesMessage(opp, localCustomPrompt);
      setAiMessage(message);
      setAiModalOpen(true);
    } catch (err: any) {
      toast.error(err.message || "Erro ao gerar mensagem");
    } finally {
      setAiLoading(false);
    }
  };

  const totalRevenue = revenues.reduce((sum, r) => sum + (Number(r.sale_value) || 0), 0);
  const totalCost = revenues.reduce((sum, r) => sum + (r.cost_items?.reduce((s, c) => s + (Number(c.cost_value) || 0), 0) || 0), 0);
  const profit = totalRevenue - totalCost;

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><p className="text-muted-foreground">Carregando...</p></div>;
  if (!opp) return <div className="min-h-screen bg-background flex items-center justify-center"><p className="text-muted-foreground">Oportunidade não encontrada.</p></div>;

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>{opp.client_name} | CRM Barbie Kills</title>
      </Helmet>
      <div className="min-h-screen bg-background p-4 md:p-8 max-w-5xl mx-auto">
        <Button variant="ghost" onClick={() => navigate("/admin")} className="mb-6 text-muted-foreground">
          <ArrowLeft size={18} /><span className="ml-2">Voltar</span>
        </Button>

        {/* --- HEADER ORIGINAL (RESTAURADO) --- */}
        <div className="glass-card rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="font-bebas text-3xl tracking-wider text-foreground">{opp.client_name}</h1>
              <p className="text-muted-foreground text-sm mt-1">
                {opp.event_type || "Tipo não informado"} • {opp.event_date ? new Date(opp.event_date + "T00:00:00").toLocaleDateString("pt-BR") : "Data não informada"} • {opp.location || "Local não informado"}
              </p>
              {opp.phone && (
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-muted-foreground text-sm">📱 {opp.phone}</p>
                  <a href={`https://wa.me/55${opp.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-green-600/20 text-green-400 hover:bg-green-600/30 transition-colors text-xs">
                    <img src="/icons/whatsapp-white.svg" alt="WhatsApp" className="w-4 h-4" />WhatsApp
                  </a>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={handleGenerateAI} disabled={aiLoading} className="bg-neon-pink hover:bg-neon-pink/80 text-white">
                <Sparkles size={16} className="mr-2" />{aiLoading ? "Gerando..." : "Gerar Mensagem"}
              </Button>
              <Select value={opp.status || "new"} onValueChange={handleStatusChange}>
                <SelectTrigger className={`w-40 border ${statusColors[opp.status || "new"]}`}><SelectValue /></SelectTrigger>
                <SelectContent>{statusOptions.map((s) => (<SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>))}</SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <AiMessageModal open={aiModalOpen} onOpenChange={setAiModalOpen} message={aiMessage} opportunityId={opp.id} phone={opp.phone} />

        <Tabs defaultValue="resumo">
          <TabsList className="w-full md:w-auto mb-4">
            <TabsTrigger value="resumo">Resumo</TabsTrigger>
            <TabsTrigger value="financeiro">Calculadora Financeira</TabsTrigger>
            <TabsTrigger value="repertorio">Repertório / Setlist</TabsTrigger>
          </TabsList>

          {/* --- ABA RESUMO --- */}
          <TabsContent value="resumo" className="space-y-6">
            <div className="glass-card rounded-lg p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><Label className="text-muted-foreground text-xs uppercase tracking-wider">Cliente</Label><p className="text-foreground">{opp.client_name}</p></div>
                <div><Label className="text-muted-foreground text-xs uppercase tracking-wider">Telefone</Label><p className="text-foreground">{opp.phone || "—"}</p></div>
                <div><Label className="text-muted-foreground text-xs uppercase tracking-wider">Evento</Label><p className="text-foreground">{opp.event_type || "—"}</p></div>
                <div><Label className="text-muted-foreground text-xs uppercase tracking-wider">Data</Label><p className="text-foreground">{opp.event_date ? new Date(opp.event_date + "T00:00:00").toLocaleDateString("pt-BR") : "—"}</p></div>
                <div><Label className="text-muted-foreground text-xs uppercase tracking-wider">Local</Label><p className="text-foreground">{opp.location || "—"}</p></div>
                <div><Label className="text-muted-foreground text-xs uppercase tracking-wider">Público</Label><p className="text-foreground">{opp.guests || "—"}</p></div>
              </div>
            </div>

            {/* ESTRATÉGIA COM SALVAMENTO MANUAL */}
            <div className="glass-card rounded-lg p-6 border border-neon-pink/30 relative">
              <div className="flex justify-between items-center mb-2">
                <Label className="text-neon-pink text-xs uppercase tracking-wider font-bold">🎯 Estratégia de Abordagem Personalizada</Label>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setResetDialogOpen(true)} className="h-7 text-[10px] text-muted-foreground hover:text-white"><RotateCcw size={10} className="mr-1" /> Resetar Padrão</Button>
                  <Button size="sm" onClick={() => { updateField("custom_prompt", localCustomPrompt); toast.success("Estratégia salva!"); }} className="h-7 bg-green-600 hover:bg-green-500 text-white text-xs font-bold"><Save size={12} className="mr-1" /> Salvar Estratégia</Button>
                </div>
              </div>
              <textarea className="w-full min-h-[140px] bg-background border border-neon-pink/40 rounded-md p-3 text-sm text-foreground focus:ring-2 focus:ring-neon-pink focus:outline-none" value={localCustomPrompt} onChange={(e) => setLocalCustomPrompt(e.target.value)} />
              <p className="text-[10px] text-muted-foreground mt-1 italic">Salva apenas no botão verde.</p>
            </div>

            <div className="glass-card rounded-lg p-6">
              <Label className="text-muted-foreground text-xs uppercase mb-2 block">Perfil do Cliente (Auto-save)</Label>
              <textarea className="w-full min-h-[120px] bg-background border border-input rounded-md p-3 text-sm" value={opp.client_profile || ""} onChange={(e) => handleDebouncedSave("client_profile", e.target.value, profileRef)} />
            </div>

            <div className="glass-card rounded-lg p-6">
              <Label className="text-muted-foreground text-xs uppercase mb-2 block">Histórico de Negociação (Auto-save)</Label>
              <textarea className="w-full min-h-[120px] bg-background border border-input rounded-md p-3 text-sm" value={opp.negotiation_history || ""} onChange={(e) => handleDebouncedSave("negotiation_history", e.target.value, negotiationRef)} />
            </div>
          </TabsContent>

          {/* --- ABA FINANCEIRA (REVISADA) --- */}
          <TabsContent value="financeiro" className="space-y-6">
            <div className="glass-card rounded-lg p-6 border border-white/10">
              <h2 className="font-bebas text-xl mb-4 text-foreground">Novo Item de Receita</h2>
              <div className="flex gap-2">
                <Input value={newRevTitle} onChange={e => setNewRevTitle(e.target.value)} placeholder="Ex: Show Quarteto" className="flex-1" />
                <Input value={newRevValue} onChange={e => setNewRevValue(e.target.value)} type="number" placeholder="Valor Venda" className="w-32" />
                <Button variant="neonPink" onClick={addRevenue}><Plus size={16} /></Button>
              </div>
            </div>

            {revenues.map((rev) => (
              <div key={rev.id} className="glass-card rounded-lg p-6 border border-white/5 space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <div><h3 className="font-bold text-foreground">{rev.title}</h3><p className="text-xs text-green-400 font-bold uppercase">Venda: R$ {rev.
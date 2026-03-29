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
import { ArrowLeft, Plus, Trash2, Sparkles, Save, RotateCcw, AlertTriangle, X, FileText, Calculator } from "lucide-react";
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
  won: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  lost: "bg-red-500/20 text-red-300 border-red-500/30",
};

const AdminOpportunityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [opp, setOpp] = useState<Opportunity | null>(null);
  const [revenues, setRevenues] = useState<RevenueItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [aiLoading, setAiLoading] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [masterPrompt, setMasterPrompt] = useState("");
  const [localCustomPrompt, setLocalCustomPrompt] = useState("");
  const [isSavingPrompt, setIsSavingPrompt] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  const [newRevTitle, setNewRevTitle] = useState("");

  const negotiationRef = useRef<ReturnType<typeof setTimeout>>();
  const repertoireRef = useRef<ReturnType<typeof setTimeout>>();
  const profileRef = useRef<ReturnType<typeof setTimeout>>();

  const fetchData = useCallback(async () => {
    if (!id) return;
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
    if (revRes.data) setRevenues(revRes.data as RevenueItem[]);
    setLoading(false);
  }, [id]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const updateField = useCallback(async (field: string, value: any) => {
    if (!id) return;
    await supabase.from("opportunities").update({ [field]: value }).eq("id", id);
    setOpp((prev) => (prev ? { ...prev, [field]: value } : prev));
  }, [id]);

  const handleStatusChange = async (status: string) => {
    await updateField("status", status);
    toast.success(`Status atualizado`);
  };

  // --- LÓGICA FINANCEIRA REVISADA (BOTTOM-UP) ---
  const addRevenue = async () => {
    if (!newRevTitle.trim() || !id) return;
    const { data } = await supabase.from("revenue_items").insert([{ 
      title: newRevTitle.trim(), 
      sale_value: 0, // Começa zerado, PM define depois do custo
      opportunity_id: id 
    }]).select().single();
    if (data) {
      setRevenues(prev => [...prev, { ...data, cost_items: [] }]);
      setNewRevTitle("");
      toast.success("Serviço criado. Agora lance os custos.");
    }
  };

  const addCostToRevenue = async (revId: string, desc: string, val: number) => {
    const { data } = await supabase.from("cost_items").insert([{ 
      description: desc, 
      cost_value: val, 
      opportunity_id: id, 
      revenue_item_id: revId 
    }]).select().single();
    if (data) {
      setRevenues(prev => prev.map(r => r.id === revId ? { ...r, cost_items: [...(r.cost_items || []), data] } : r));
    }
  };

  const updateRevenueValue = async (revId: string, newValue: number) => {
    await supabase.from("revenue_items").update({ sale_value: newValue }).eq("id", revId);
    setRevenues(prev => prev.map(r => r.id === revId ? { ...r, sale_value: newValue } : r));
  };

  const deleteRevenue = async (revId: string) => {
    if (!confirm("Excluir este serviço?")) return;
    await supabase.from("revenue_items").delete().eq("id", revId);
    setRevenues(prev => prev.filter(r => r.id !== revId));
  };

  const deleteCost = async (costId: string, revId: string) => {
    await supabase.from("cost_items").delete().eq("id", costId);
    setRevenues(prev => prev.map(r => r.id === revId ? { ...r, cost_items: r.cost_items?.filter(c => c.id !== costId) } : r));
  };

  const totalRevenue = revenues.reduce((sum, r) => sum + (Number(r.sale_value) || 0), 0);
  const totalCost = revenues.reduce((sum, r) => sum + (r.cost_items?.reduce((s, c) => s + (Number(c.cost_value) || 0), 0) || 0), 0);
  const profit = totalRevenue - totalCost;

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center font-bebas text-xl text-neon-pink">CARREGANDO...</div>;
  if (!opp) return null;

  return (
    <>
      <Helmet><title>{opp.client_name} | CRM Barbie Kills</title></Helmet>
      <div className="min-h-screen bg-background p-4 md:p-8 max-w-5xl mx-auto">
        <Button variant="ghost" onClick={() => navigate("/admin")} className="mb-6 text-muted-foreground hover:text-white transition-colors">
          <ArrowLeft size={18} /><span className="ml-2">Voltar</span>
        </Button>

        {/* --- HEADER ORIGINAL PRESERVADO --- */}
        <div className="glass-card rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="font-bebas text-3xl tracking-wider text-foreground">{opp.client_name}</h1>
              <p className="text-muted-foreground text-sm mt-1">
                {opp.event_type || "Tipo não informado"} • {opp.event_date ? new Date(opp.event_date + "T00:00:00").toLocaleDateString("pt-BR") : "Data não informada"} • {opp.location || "Local não informado"}
              </p>
              {opp.phone && (
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-muted-foreground text-sm font-mono">📱 {opp.phone}</p>
                  <a href={`https://wa.me/55${opp.phone.replace(/\D/g, "")}`} target="_blank" className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-green-600/20 text-green-400 hover:bg-green-600/30 transition-colors text-xs font-bold">
                    <img src="/icons/whatsapp-white.svg" alt="WhatsApp" className="w-4 h-4" /> WhatsApp
                  </a>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={() => setAiModalOpen(true)} className="bg-neon-pink hover:bg-neon-pink/80 text-white font-bold">
                <Sparkles size={16} className="mr-2" />GERAR MENSAGEM
              </Button>
              <Select value={opp.status || "new"} onValueChange={handleStatusChange}>
                <SelectTrigger className={`w-40 border-2 font-bold ${statusColors[opp.status || "new"]}`}><SelectValue /></SelectTrigger>
                <SelectContent>{statusOptions.map((s) => (<SelectItem key={s.value} value={s.value}>{s.label.toUpperCase()}</SelectItem>))}</SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <AiMessageModal open={aiModalOpen} onOpenChange={setAiModalOpen} message={aiMessage} opportunityId={opp.id} phone={opp.phone} />

        <Tabs defaultValue="resumo">
          <TabsList className="w-full md:w-auto mb-6 bg-white/5 p-1 border border-white/10 rounded-lg">
            <TabsTrigger value="resumo" className="px-8 font-bold data-[state=active]:bg-neon-pink uppercase text-xs">Resumo / Estratégia</TabsTrigger>
            <TabsTrigger value="financeiro" className="px-8 font-bold data-[state=active]:bg-neon-pink uppercase text-xs">Calculadora Financeira</TabsTrigger>
            <TabsTrigger value="repertorio" className="px-8 font-bold data-[state=active]:bg-neon-pink uppercase text-xs">Repertório / Setlist</TabsTrigger>
          </TabsList>

          {/* --- ABA RESUMO (CONSERVADA) --- */}
          <TabsContent value="resumo" className="space-y-6">
            <div className="glass-card rounded-lg p-6 border-2 border-neon-pink/30 relative bg-black/40">
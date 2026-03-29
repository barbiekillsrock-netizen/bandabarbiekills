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
import { ArrowLeft, Plus, Trash2, Sparkles, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";
import { generateAISalesMessage } from "@/services/aiService";
import AiMessageModal from "@/components/AiMessageModal";

type Opportunity = Tables<"opportunities">;
type RevenueItem = Tables<"revenue_items">;
type CostItem = Tables<"cost_items">;

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
  const [costs, setCosts] = useState<CostItem[]>([]);
  const [loading, setLoading] = useState(true);

  // AI state
  const [aiLoading, setAiLoading] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  const [aiModalOpen, setAiModalOpen] = useState(false);

  // Debounce refs
  const negotiationRef = useRef<ReturnType<typeof setTimeout>>();
  const repertoireRef = useRef<ReturnType<typeof setTimeout>>();
  const profileRef = useRef<ReturnType<typeof setTimeout>>();
  const customPromptRef = useRef<ReturnType<typeof setTimeout>>();

  // Master prompt fallback
  const [masterPrompt, setMasterPrompt] = useState("");

  // New item forms
  const [newRevTitle, setNewRevTitle] = useState("");
  const [newRevValue, setNewRevValue] = useState("");
  const [newCostDesc, setNewCostDesc] = useState("");
  const [newCostValue, setNewCostValue] = useState("");

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      const [oppRes, revRes, costRes, settingsRes] = await Promise.all([
        supabase.from("opportunities").select("*").eq("id", id).single(),
        supabase.from("revenue_items").select("*").eq("opportunity_id", id).order("created_at"),
        supabase.from("cost_items").select("*").eq("opportunity_id", id).order("created_at"),
        supabase.from("site_settings").select("value").eq("key", "master_sales_prompt").single(),
      ]);
      if (oppRes.data) setOpp(oppRes.data);
      if (revRes.data) setRevenues(revRes.data);
      if (costRes.data) setCosts(costRes.data);
      if (settingsRes.data?.value) setMasterPrompt(settingsRes.data.value);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const updateField = useCallback(
    async (field: string, value: string | number | null) => {
      if (!id) return;
      await supabase
        .from("opportunities")
        .update({ [field]: value })
        .eq("id", id);
      setOpp((prev) => (prev ? { ...prev, [field]: value } : prev));
    },
    [id],
  );

  const handleDebouncedSave = useCallback(
    (field: string, value: string, ref: React.MutableRefObject<ReturnType<typeof setTimeout> | undefined>) => {
      setOpp((prev) => (prev ? { ...prev, [field]: value } : prev));
      if (ref.current) clearTimeout(ref.current);
      ref.current = setTimeout(() => {
        updateField(field, value || null);
        toast.success("Salvo automaticamente");
      }, 2000);
    },
    [updateField],
  );

  const handleStatusChange = async (status: string) => {
    await updateField("status", status);
    toast.success(`Status atualizado para "${statusOptions.find((s) => s.value === status)?.label}"`);
  };

  const handleResetPrompt = async () => {
    if (!confirm("Deseja resetar a estratégia para o padrão global?")) return;
    await updateField("custom_prompt", null);
    toast.success("Estratégia resetada para o padrão");
  };

  const handleGenerateAI = async () => {
    if (!opp) return;
    const promptToUse = opp.custom_prompt?.trim() || masterPrompt;
    if (!promptToUse) {
      toast.error("Configure o Prompt Mestre em Configurações.");
      return;
    }
    setAiLoading(true);
    try {
      const message = await generateAISalesMessage(opp, promptToUse);
      setAiMessage(message);
      setAiModalOpen(true);
    } catch (err: any) {
      toast.error(err.message || "Erro ao gerar mensagem de IA");
    } finally {
      setAiLoading(false);
    }
  };

  // Finance and items logic remains same...
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
    toast.success("Receita removida");
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
    toast.success("Custo removido");
  };

  const totalRevenue = revenues.reduce((sum, r) => sum + (r.sale_value || 0), 0);
  const totalCost = costs.reduce((sum, c) => sum + (c.cost_value || 0), 0);
  const profit = totalRevenue - totalCost;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  if (!opp) return null;

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>{opp.client_name} | CRM Barbie Kills</title>
      </Helmet>
      <div className="min-h-screen bg-background p-4 md:p-8 max-w-5xl mx-auto">
        <Button variant="ghost" onClick={() => navigate("/admin")} className="mb-6 text-muted-foreground">
          <ArrowLeft size={18} />
          <span className="ml-2">Voltar</span>
        </Button>

        <div className="glass-card rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="font-bebas text-3xl tracking-wider text-foreground">{opp.client_name}</h1>
              <p className="text-muted-foreground text-sm mt-1">
                {opp.event_type || "Tipo não informado"} • {opp.location || "Local não informado"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={handleGenerateAI} disabled={aiLoading} className="bg-neon-pink hover:bg-neon-pink/80 text-white font-bold">
                <Sparkles size={16} className="mr-2" />
                {aiLoading ? "Gerando..." : "Gerar Mensagem"}
              </Button>
              <Select value={opp.status || "new"} onValueChange={handleStatusChange}>
                <SelectTrigger className={`w-40 border ${statusColors[opp.status || "new"]}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((s) => (
                    <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <AiMessageModal
          open={aiModalOpen}
          onOpenChange={setAiModalOpen}
          message={aiMessage}
          opportunityId={opp.id}
          phone={opp.phone}
        />

        <Tabs defaultValue="resumo">
          <TabsList className="w-full md:w-auto mb-4">
            <TabsTrigger value="resumo">Resumo</TabsTrigger>
            <TabsTrigger value="financeiro">Calculadora Financeira</TabsTrigger>
            <TabsTrigger value="repertorio">Repertório / Setlist</TabsTrigger>
          </TabsList>

          <TabsContent value="resumo" className="space-y-6">
            {/* Custom Prompt Card - REVISADO */}
            <div className="glass-card rounded-lg p-6 border border-neon-pink/30 relative">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-neon-pink text-xs uppercase tracking-wider font-bold">
                  🎯 Estratégia de Abordagem Personalizada
                </Label>
                {opp.custom_prompt && (
                  <button 
                    onClick={handleResetPrompt}
                    className="text-muted-foreground hover:text-white flex items-center gap-1 text-[10px] transition-colors"
                    title="Voltar ao prompt global"
                  >
                    <RotateCcw size
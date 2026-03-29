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

  const [aiLoading, setAiLoading] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  const [aiModalOpen, setAiModalOpen] = useState(false);

  const negotiationRef = useRef<ReturnType<typeof setTimeout>>();
  const repertoireRef = useRef<ReturnType<typeof setTimeout>>();
  const profileRef = useRef<ReturnType<typeof setTimeout>>();
  const customPromptRef = useRef<ReturnType<typeof setTimeout>>();

  const [masterPrompt, setMasterPrompt] = useState("");
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
    toast.success(`Status atualizado`);
  };

  const handleResetPrompt = async () => {
    if (!confirm("Resetar para o padrão global?")) return;
    await updateField("custom_prompt", null);
    toast.success("Prompt resetado");
  };

  const handleGenerateAI = async () => {
    if (!opp) return;
    const promptToUse = opp.custom_prompt?.trim() || masterPrompt;
    setAiLoading(true);
    try {
      const message = await generateAISalesMessage(opp, promptToUse);
      setAiMessage(message);
      setAiModalOpen(true);
    } catch (err: any) {
      toast.error(err.message || "Erro na IA");
    } finally {
      setAiLoading(false);
    }
  };

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
    }
  };

  const deleteCost = async (costId: string) => {
    await supabase.from("cost_items").delete().eq("id", costId);
    setCosts((prev) => prev.filter((c) => c.id !== costId));
  };

  const totalRevenue = revenues.reduce((sum, r) => sum + (r.sale_value || 0), 0);
  const totalCost = costs.reduce((sum, c) => sum + (c.cost_value || 0), 0);
  const profit = totalRevenue - totalCost;

  if (loading) return <div className="p-8 text-center text-muted-foreground">Carregando...</div>;
  if (!opp) return null;

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>{opp.client_name} | CRM</title>
      </Helmet>
      <div className="min-h-screen bg-background p-4 md:p-8 max-w-5xl mx-auto">
        <Button variant="ghost" onClick={() => navigate("/admin")} className="mb-6">
          <ArrowLeft size={18} className="mr-2" /> Voltar
        </Button>

        <div className="glass-card rounded-lg p-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="font-bebas text-3xl tracking-wider">{opp.client_name}</h1>
            <p className="text-muted-foreground text-sm">
              {opp.event_type} • {opp.location}
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleGenerateAI} disabled={aiLoading} className="bg-neon-pink hover:bg-neon-pink/80">
              <Sparkles size={16} className="mr-2" /> {aiLoading ? "Gerando..." : "Gerar Mensagem"}
            </Button>
            <Select value={opp.status || "new"} onValueChange={handleStatusChange}>
              <SelectTrigger className={`w-40 border ${statusColors[opp.status || "new"]}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="resumo">
          <TabsList className="mb-4">
            <TabsTrigger value="resumo">Resumo</TabsTrigger>
            <TabsTrigger value="financeiro">Calculadora</TabsTrigger>
            <TabsTrigger value="repertorio">Repertório</TabsTrigger>
          </TabsList>

          <TabsContent value="resumo" className="space-y-6">
            <div className="glass-card rounded-lg p-6 border border-neon-pink/30 relative">
              <div className="flex justify-between items-center mb-2">
                <Label className="text-neon-pink text-xs font-bold uppercase tracking-wider">
                  🎯 Estratégia Personalizada
                </Label>
                {opp.custom_prompt && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleResetPrompt}
                    className="h-6 text-[10px] text-muted-foreground hover:text-white"
                  >
                    <RotateCcw size={10} className="mr-1" /> Resetar Padrão
                  </Button>
                )}
              </div>
              <textarea
                className="w-full min-h-[160px] bg-background/50 border border-neon-pink/40 rounded-md p-3 text-sm resize-y focus:ring-1 focus:ring-neon-pink outline-none"
                value={opp.custom_prompt ?? masterPrompt}
                onChange={(e) => handleDebouncedSave("custom_prompt", e.target.value, customPromptRef)}
              />
              <div className="flex justify-between mt-2 text-[10px] text-muted-foreground uppercase font-semibold">
                <span>{opp.custom_prompt ? "🚀 Personalizado" : "🏠 Global"}</span>
                <span>Auto-save: 2s</span>
              </div>
            </div>

            <div className="glass-card rounded-lg p-6">
              <Label className="text-xs uppercase tracking-wider mb-2 block text-muted-foreground">
                Perfil do Cliente
              </Label>
              <textarea
                className="w-full min-h-[100px] bg-background border rounded-md p-3 text-sm outline-none focus:ring-1 focus:ring-ring"
                value={opp.client_profile || ""}
                onChange={(e) => handleDebouncedSave("client_profile", e.target.value, profileRef)}
              />
            </div>

            <div className="glass-card rounded-lg p-6">
              <Label className="text-xs uppercase tracking-wider mb-2 block text-muted-foreground">Histórico</Label>
              <textarea
                className="w-full min-h-[100px] bg-background border rounded-md p-3 text-sm outline-none focus:ring-1 focus:ring-ring"
                value={opp.negotiation_history || ""}
                onChange={(e) => handleDebouncedSave("negotiation_history", e.target.value, negotiationRef)}
              />
            </div>
          </TabsContent>

          <TabsContent value="financeiro" className="space-y-6">
            <div className="glass-card rounded-lg p-6">
              <h2 className="font-bebas text-xl mb-4">Financeiro</h2>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-[10px] text-muted-foreground">RECEITA</p>
                  <p className="text-green-400 font-bold">R$ {totalRevenue.toLocaleString("pt-BR")}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">CUSTO</p>
                  <p className="text-red-400 font-bold">R$ {totalCost.toLocaleString("pt-BR")}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">LUCRO</p>
                  <p className={`font-bold ${profit >= 0 ? "text-green-400" : "text-red-400"}`}>
                    R$ {profit.toLocaleString("pt-BR")}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="repertorio">
            <div className="glass-card rounded-lg p-6">
              <Label className="text-xs uppercase tracking-wider mb-2 block text-muted-foreground">Setlist</Label>
              <textarea
                className="w-full min-h-[200px] bg-background border rounded-md p-3 text-sm outline-none"
                value={opp.requested_repertoire || ""}
                onChange={(e) => handleDebouncedSave("requested_repertoire", e.target.value, repertoireRef)}
              />
            </div>
          </TabsContent>
        </Tabs>

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

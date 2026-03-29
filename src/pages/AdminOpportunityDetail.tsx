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
import { ArrowLeft, Plus, Trash2, Sparkles } from "lucide-react";
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

  // AI generate — uses local custom_prompt, falls back to master prompt
  const handleGenerateAI = async () => {
    if (!opp) return;
    const promptToUse = opp.custom_prompt?.trim() || masterPrompt;
    if (!promptToUse) {
      toast.error("Configure o Prompt Mestre em Configurações ou personalize a estratégia deste lead.");
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

  // Revenue items
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

  // Cost items
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

  if (!opp) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Oportunidade não encontrada.</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>{opp.client_name} | CRM Barbie Kills</title>
      </Helmet>
      <div className="min-h-screen bg-background p-4 md:p-8 max-w-5xl mx-auto">
        {/* Back */}
        <Button variant="ghost" onClick={() => navigate("/admin")} className="mb-6 text-muted-foreground">
          <ArrowLeft size={18} />
          <span className="ml-2">Voltar</span>
        </Button>

        {/* Header */}
        <div className="glass-card rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="font-bebas text-3xl tracking-wider text-foreground">{opp.client_name}</h1>
              <p className="text-muted-foreground text-sm mt-1">
                {opp.event_type || "Tipo não informado"} •{" "}
                {opp.event_date
                  ? new Date(opp.event_date + "T00:00:00").toLocaleDateString("pt-BR")
                  : "Data não informada"}{" "}
                • {opp.location || "Local não informado"}
              </p>
              {opp.phone && (
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-muted-foreground text-sm">📱 {opp.phone}</p>
                  <a
                    href={`https://wa.me/55${opp.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-green-600/20 text-green-400 hover:bg-green-600/30 transition-colors text-xs"
                  >
                    <img src="/icons/whatsapp-white.svg" alt="WhatsApp" className="w-4 h-4" />
                    WhatsApp
                  </a>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleGenerateAI}
                disabled={aiLoading}
                className="bg-neon-pink hover:bg-neon-pink/80 text-white"
              >
                <Sparkles size={16} className="mr-2" />
                {aiLoading ? "Gerando..." : "Gerar Mensagem"}
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
        </div>

        {/* AI Modal */}
        <AiMessageModal
          open={aiModalOpen}
          onOpenChange={setAiModalOpen}
          message={aiMessage}
          opportunityId={opp.id}
          phone={opp.phone}
        />

        {/* Tabs */}
        <Tabs defaultValue="resumo">
          <TabsList className="w-full md:w-auto mb-4">
            <TabsTrigger value="resumo">Resumo</TabsTrigger>
            <TabsTrigger value="financeiro">Calculadora Financeira</TabsTrigger>
            <TabsTrigger value="repertorio">Repertório / Setlist</TabsTrigger>
          </TabsList>

          {/* Resumo */}
          <TabsContent value="resumo" className="space-y-6">
            <div className="glass-card rounded-lg p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground text-xs uppercase tracking-wider">Cliente</Label>
                  <p className="text-foreground">{opp.client_name}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs uppercase tracking-wider">Telefone</Label>
                  <p className="text-foreground">{opp.phone || "—"}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs uppercase tracking-wider">Evento</Label>
                  <p className="text-foreground">{opp.event_type || "—"}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs uppercase tracking-wider">Data</Label>
                  <p className="text-foreground">
                    {opp.event_date ? new Date(opp.event_date + "T00:00:00").toLocaleDateString("pt-BR") : "—"}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs uppercase tracking-wider">Local</Label>
                  <p className="text-foreground">{opp.location || "—"}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs uppercase tracking-wider">Público</Label>
                  <p className="text-foreground">{opp.guests || "—"}</p>
                </div>
              </div>
            </div>

            {/* Custom Prompt */}
            <div className="glass-card rounded-lg p-6 border border-neon-pink/30">
              <Label className="text-neon-pink text-xs uppercase tracking-wider mb-2 block font-bold">
                🎯 Estratégia de Abordagem Personalizada
              </Label>
              <textarea
                className="w-full min-h-[140px] bg-background border border-neon-pink/40 rounded-md p-3 text-sm text-foreground resize-y focus:ring-2 focus:ring-neon-pink focus:outline-none placeholder:text-muted-foreground/50"
                value={opp.custom_prompt || ""}
                onChange={(e) => handleDebouncedSave("custom_prompt", e.target.value, customPromptRef)}
                placeholder={masterPrompt || "Defina a estratégia de abordagem para este lead..."}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {opp.custom_prompt?.trim() ? "Prompt personalizado ativo" : "Usando prompt global como base"} • Salva automaticamente após 2s
              </p>
            </div>

            {/* Client Profile */}
            <div className="glass-card rounded-lg p-6">
              <Label className="text-muted-foreground text-xs uppercase tracking-wider mb-2 block">
                Perfil do Cliente
              </Label>
              <textarea
                className="w-full min-h-[120px] bg-background border border-input rounded-md p-3 text-sm text-foreground resize-y focus:ring-2 focus:ring-ring focus:outline-none"
                value={opp.client_profile || ""}
                onChange={(e) => handleDebouncedSave("client_profile", e.target.value, profileRef)}
                placeholder="Descreva o perfil do cliente, preferências, referências..."
              />
              <p className="text-xs text-muted-foreground mt-1">Salva automaticamente após 2s</p>
            </div>

            {/* Negotiation History */}
            <div className="glass-card rounded-lg p-6">
              <Label className="text-muted-foreground text-xs uppercase tracking-wider mb-2 block">
                Histórico de Negociação
              </Label>
              <textarea
                className="w-full min-h-[120px] bg-background border border-input rounded-md p-3 text-sm text-foreground resize-y focus:ring-2 focus:ring-ring focus:outline-none"
                value={opp.negotiation_history || ""}
                onChange={(e) => handleDebouncedSave("negotiation_history", e.target.value, negotiationRef)}
                placeholder="Registre anotações sobre a negociação..."
              />
              <p className="text-xs text-muted-foreground mt-1">Salva automaticamente após 2s</p>
            </div>
          </TabsContent>

          {/* Financeiro */}
          <TabsContent value="financeiro" className="space-y-6">
            {/* Revenue */}
            <div className="glass-card rounded-lg p-6">
              <h2 className="font-bebas text-xl tracking-wider text-foreground mb-4">Receitas</h2>
              {revenues.length > 0 && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Descrição</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                      <TableHead className="w-12" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {revenues.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell>{r.title}</TableCell>
                        <TableCell className="text-right text-green-400">
                          R$ {(r.sale_value || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </TableCell>
                        <TableCell>
                          <button
                            onClick={() => deleteRevenue(r.id)}
                            className="text-destructive hover:text-red-400 p-1"
                          >
                            <Trash2 size={14} />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
              <div className="flex gap-2 mt-3">
                <Input
                  value={newRevTitle}
                  onChange={(e) => setNewRevTitle(e.target.value)}
                  placeholder="Descrição"
                  className="flex-1"
                />
                <Input
                  value={newRevValue}
                  onChange={(e) => setNewRevValue(e.target.value)}
                  placeholder="Valor"
                  className="w-28"
                  type="number"
                  step="0.01"
                />
                <Button variant="neonPink" size="sm" onClick={addRevenue}>
                  <Plus size={16} />
                </Button>
              </div>
            </div>

            {/* Costs */}
            <div className="glass-card rounded-lg p-6">
              <h2 className="font-bebas text-xl tracking-wider text-foreground mb-4">Custos</h2>
              {costs.length > 0 && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Descrição</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                      <TableHead className="w-12" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {costs.map((c) => (
                      <TableRow key={c.id}>
                        <TableCell>{c.description}</TableCell>
                        <TableCell className="text-right text-red-400">
                          R$ {(c.cost_value || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </TableCell>
                        <TableCell>
                          <button onClick={() => deleteCost(c.id)} className="text-destructive hover:text-red-400 p-1">
                            <Trash2 size={14} />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
              <div className="flex gap-2 mt-3">
                <Input
                  value={newCostDesc}
                  onChange={(e) => setNewCostDesc(e.target.value)}
                  placeholder="Descrição"
                  className="flex-1"
                />
                <Input
                  value={newCostValue}
                  onChange={(e) => setNewCostValue(e.target.value)}
                  placeholder="Valor"
                  className="w-28"
                  type="number"
                  step="0.01"
                />
                <Button variant="neonPink" size="sm" onClick={addCost}>
                  <Plus size={16} />
                </Button>
              </div>
            </div>

            {/* Summary */}
            <div className="glass-card rounded-lg p-6">
              <h2 className="font-bebas text-xl tracking-wider text-foreground mb-4">Resumo Financeiro</h2>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Receita</p>
                  <p className="text-xl font-semibold text-green-400">
                    R$ {totalRevenue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Custos</p>
                  <p className="text-xl font-semibold text-red-400">
                    R$ {totalCost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Lucro</p>
                  <p className={`text-xl font-semibold ${profit >= 0 ? "text-green-400" : "text-red-400"}`}>
                    R$ {profit.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Repertório */}
          <TabsContent value="repertorio">
            <div className="glass-card rounded-lg p-6">
              <Label className="text-muted-foreground text-xs uppercase tracking-wider mb-2 block">
                Repertório Solicitado / Setlist
              </Label>
              <textarea
                className="w-full min-h-[200px] bg-background border border-input rounded-md p-3 text-sm text-foreground resize-y focus:ring-2 focus:ring-ring focus:outline-none"
                value={opp.requested_repertoire || ""}
                onChange={(e) => handleDebouncedSave("requested_repertoire", e.target.value, repertoireRef)}
                placeholder="Liste as músicas solicitadas pelo cliente..."
              />
              <p className="text-xs text-muted-foreground mt-1">Salva automaticamente após 2s</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default AdminOpportunityDetail;

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
  Plus,
  Trash2,
  Sparkles,
  Save,
  RotateCcw,
  AlertTriangle,
  X,
  FileText,
  DollarSign,
} from "lucide-react";
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

  // States de Prompt e IA
  const [aiLoading, setAiLoading] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [masterPrompt, setMasterPrompt] = useState("");
  const [localCustomPrompt, setLocalCustomPrompt] = useState("");
  const [isSavingPrompt, setIsSavingPrompt] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  // Form states Calculadora
  const [newRevTitle, setNewRevTitle] = useState("");
  const [newRevValue, setNewRevValue] = useState("");

  // Refs para Auto-save (Notas)
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

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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

  const handleDebouncedSave = useCallback(
    (field: string, value: string, ref: React.MutableRefObject<ReturnType<typeof setTimeout> | undefined>) => {
      setOpp((prev) => (prev ? { ...prev, [field]: value } : prev));
      if (ref.current) clearTimeout(ref.current);
      ref.current = setTimeout(() => {
        updateField(field, value || null);
        toast.success("Salvo automaticamente", { duration: 1000 });
      }, 2000);
    },
    [updateField],
  );

  const handleStatusChange = async (status: string) => {
    await updateField("status", status);
    toast.success(`Status atualizado para "${statusOptions.find((s) => s.value === status)?.label}"`);
  };

  const handleResetPromptConfirm = async () => {
    setLocalCustomPrompt(masterPrompt);
    await updateField("custom_prompt", null);
    setResetDialogOpen(false);
    toast.success("Prompt resetado para o padrão global.");
  };

  // --- LÓGICA CALCULADORA (MELHORADA PARA HIERARQUIA) ---
  const addRevenue = async () => {
    if (!newRevTitle.trim() || !id) return;
    const { data } = await supabase
      .from("revenue_items")
      .insert([
        {
          title: newRevTitle.trim(),
          sale_value: parseFloat(newRevValue) || 0,
          opportunity_id: id,
        },
      ])
      .select()
      .single();
    if (data) {
      setRevenues((prev) => [...prev, { ...data, cost_items: [] }]);
      setNewRevTitle("");
      setNewRevValue("");
      toast.success("Receita adicionada");
    }
  };

  const addCostToRevenue = async (revId: string, desc: string, val: number) => {
    const { data } = await supabase
      .from("cost_items")
      .insert([
        {
          description: desc,
          cost_value: val,
          opportunity_id: id,
          revenue_item_id: revId,
        },
      ])
      .select()
      .single();
    if (data) {
      setRevenues((prev) =>
        prev.map((r) => (r.id === revId ? { ...r, cost_items: [...(r.cost_items || []), data] } : r)),
      );
      toast.success("Custo vinculado");
    }
  };

  const deleteRevenue = async (revId: string) => {
    if (!confirm("Excluir este serviço e todos os custos dele?")) return;
    await supabase.from("revenue_items").delete().eq("id", revId);
    setRevenues((prev) => prev.filter((r) => r.id !== revId));
  };

  const deleteCost = async (costId: string, revId: string) => {
    await supabase.from("cost_items").delete().eq("id", costId);
    setRevenues((prev) =>
      prev.map((r) => (r.id === revId ? { ...r, cost_items: r.cost_items?.filter((c) => c.id !== costId) } : r)),
    );
  };

  const handleGenerateAI = async () => {
    if (!opp) return;
    setAiLoading(true);
    try {
      const message = await generateAISalesMessage(opp, localCustomPrompt);
      setAiMessage(message);
      setAiModalOpen(true);
    } catch (err: any) {
      toast.error(err.message || "Erro na IA");
    } finally {
      setAiLoading(false);
    }
  };

  const totalRevenue = revenues.reduce((sum, r) => sum + (Number(r.sale_value) || 0), 0);
  const totalCost = revenues.reduce(
    (sum, r) => sum + (r.cost_items?.reduce((s, c) => s + (Number(c.cost_value) || 0), 0) || 0),
    0,
  );
  const profit = totalRevenue - totalCost;

  if (loading)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center font-bebas text-xl text-neon-pink animate-pulse">
        CARREGANDO...
      </div>
    );
  if (!opp)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">Oportunidade não encontrada.</div>
    );

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>{opp.client_name} | CRM Barbie Kills</title>
      </Helmet>
      <div className="min-h-screen bg-background p-4 md:p-8 max-w-5xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/admin")}
          className="mb-6 text-muted-foreground hover:text-white transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="ml-2">Voltar</span>
        </Button>

        {/* --- HEADER ORIGINAL RESTAURADO (EXATAMENTE COMO VOCÊ QUERIA) --- */}
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
                    href={`https://wa.me/55${opp.phone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-green-600/20 text-green-400 hover:bg-green-600/30 transition-colors text-xs font-bold"
                  >
                    <img src="/icons/whatsapp-white.svg" alt="WhatsApp" className="w-4 h-4" /> WhatsApp
                  </a>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleGenerateAI}
                disabled={aiLoading}
                className="bg-neon-pink hover:bg-neon-pink/80 text-white font-bold"
              >
                <Sparkles size={16} className="mr-2" />
                {aiLoading ? "Gerando..." : "Gerar Mensagem"}
              </Button>
              <Select value={opp.status || "new"} onValueChange={handleStatusChange}>
                <SelectTrigger className={`w-40 border-2 font-bold ${statusColors[opp.status || "new"]}`}>
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

        <AiMessageModal
          open={aiModalOpen}
          onOpenChange={setAiModalOpen}
          message={aiMessage}
          opportunityId={opp.id}
          phone={opp.phone}
        />

        <Tabs defaultValue="resumo">
          <TabsList className="w-full md:w-auto mb-4 bg-white/5 border border-white/10 rounded-lg p-1">
            <TabsTrigger value="resumo">Resumo</TabsTrigger>
            <TabsTrigger value="financeiro">Calculadora Financeira</TabsTrigger>
            <TabsTrigger value="repertorio">Repertório / Setlist</TabsTrigger>
          </TabsList>

          {/* --- TAB RESUMO --- */}
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

            {/* ESTRATÉGIA COM SALVAMENTO MANUAL (COMO VOCÊ PEDIU) */}
            <div className="glass-card rounded-lg p-6 border border-neon-pink/30 relative">
              <div className="flex justify-between items-center mb-4">
                <Label className="text-neon-pink text-xs uppercase tracking-wider font-bold">
                  🎯 Estratégia de Abordagem Personalizada
                </Label>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setResetDialogOpen(true)}
                    className="h-7 text-[10px] text-muted-foreground hover:text-white transition-all"
                  >
                    <RotateCcw size={10} className="mr-1" /> Resetar Padrão
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      updateField("custom_prompt", localCustomPrompt);
                      toast.success("Estratégia salva!");
                    }}
                    className="h-7 bg-green-600 hover:bg-green-500 text-white text-xs font-bold px-4"
                  >
                    <Save size={12} className="mr-1" /> Salvar Estratégia
                  </Button>
                </div>
              </div>
              <textarea
                className="w-full min-h-[160px] bg-background border border-neon-pink/40 rounded-md p-4 text-sm text-foreground focus:ring-1 focus:ring-neon-pink outline-none transition-all leading-relaxed"
                value={localCustomPrompt}
                onChange={(e) => setLocalCustomPrompt(e.target.value)}
              />
              <p className="text-[10px] text-muted-foreground mt-2 italic opacity-60">
                Alterações salvam apenas ao clicar no botão verde.
              </p>
            </div>

            <div className="glass-card rounded-lg p-6">
              <Label className="text-muted-foreground text-xs uppercase mb-2 block">
                Perfil do Cliente (Auto-save)
              </Label>
              <textarea
                className="w-full min-h-[120px] bg-background border border-input rounded-md p-3 text-sm focus:ring-1 focus:ring-ring outline-none"
                value={opp.client_profile || ""}
                onChange={(e) => handleDebouncedSave("client_profile", e.target.value, profileRef)}
              />
            </div>

            <div className="glass-card rounded-lg p-6">
              <Label className="text-muted-foreground text-xs uppercase mb-2 block">
                Histórico de Negociação (Auto-save)
              </Label>
              <textarea
                className="w-full min-h-[120px] bg-background border border-input rounded-md p-3 text-sm focus:ring-1 focus:ring-ring outline-none"
                value={opp.negotiation_history || ""}
                onChange={(e) => handleDebouncedSave("negotiation_history", e.target.value, negotiationRef)}
              />
            </div>
          </TabsContent>

          {/* --- ABA FINANCEIRA (ESTRUTURA HIERÁRQUICA TOTALMENTE REFEITA) --- */}
          <TabsContent value="financeiro" className="space-y-6">
            <div className="glass-card rounded-lg p-6 border border-white/10 bg-black/20">
              <h2 className="font-bebas text-xl mb-4 text-foreground tracking-widest uppercase flex items-center gap-2">
                <DollarSign size={18} className="text-green-400" /> Adicionar Novo Serviço
              </h2>
              <div className="flex flex-wrap gap-4 items-end">
                <div className="flex-1 min-w-[200px]">
                  <Input
                    value={newRevTitle}
                    onChange={(e) => setNewRevTitle(e.target.value)}
                    placeholder="Ex: Show Quarteto + Som"
                    className="bg-black/40 border-white/10"
                  />
                </div>
                <div className="w-36">
                  <Input
                    value={newRevValue}
                    onChange={(e) => setNewRevValue(e.target.value)}
                    type="number"
                    placeholder="Valor Venda"
                    className="bg-black/40 border-white/10"
                  />
                </div>
                <Button
                  variant="neonPink"
                  onClick={addRevenue}
                  className="font-bold px-8 h-10 shadow-lg shadow-neon-pink/20"
                >
                  <Plus size={18} className="mr-2" /> ADICIONAR
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              {revenues.map((rev) => (
                <div
                  key={rev.id}
                  className="glass-card rounded-xl border border-white/10 overflow-hidden bg-black/40 shadow-xl"
                >
                  <div className="p-5 bg-white/5 flex justify-between items-center border-b border-white/10">
                    <div className="flex items-center gap-4">
                      <div className="bg-green-600/20 p-2 rounded-lg text-green-400 font-bold text-xs uppercase">
                        Serviço de Venda
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-foreground">{rev.title}</h3>
                        <p className="text-[10px] text-green-400 font-black uppercase tracking-tighter">
                          VENDA: R$ {rev.sale_value?.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteRevenue(rev.id)}
                      className="text-red-500/50 hover:text-red-500 transition-all"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>

                  <div className="p-6 grid md:grid-cols-2 gap-8 bg-gradient-to-br from-transparent to-white/[0.02]">
                    {/* EXPLICAÇÃO E BENEFÍCIOS DO ITEM */}
                    <div className="space-y-3">
                      <Label className="text-[10px] uppercase font-black text-muted-foreground tracking-widest flex items-center gap-2">
                        <FileText size={12} className="text-neon-pink" /> Justificativa Comercial (Pitch IA)
                      </Label>
                      <textarea
                        className="w-full h-[150px] bg-black/40 border border-white/10 rounded-xl p-4 text-xs text-foreground outline-none focus:border-neon-pink/50 transition-all leading-relaxed shadow-inner"
                        value={rev.description || ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          setRevenues((prev) => prev.map((r) => (r.id === rev.id ? { ...r, description: val } : r)));
                          supabase.from("revenue_items").update({ description: val }).eq("id", rev.id).then();
                        }}
                        placeholder="Ex: Formação ideal para festas animadas, inclui saxofonista e setlist personalizado..."
                      />
                    </div>

                    {/* CUSTOS VINCULADOS A ESTE ITEM ESPECÍFICO */}
                    <div className="bg-black/30 rounded-xl p-6 space-y-4 border border-white/5 shadow-lg">
                      <Label className="text-[10px] uppercase font-black text-muted-foreground block border-b border-white/10 pb-2 tracking-widest text-red-300">
                        Custos Detalhados deste Item
                      </Label>
                      <div className="space-y-2 max-h-[160px] overflow-y-auto pr-2 custom-scrollbar">
                        {rev.cost_items?.map((cost) => (
                          <div
                            key={cost.id}
                            className="flex justify-between items-center text-xs p-2 rounded-md bg-white/[0.02] border border-white/5 group hover:bg-white/[0.05] transition-all"
                          >
                            <span className="text-gray-400 font-medium">{cost.description}</span>
                            <div className="flex items-center gap-3">
                              <span className="text-red-400 font-mono font-bold text-sm">
                                R$ {cost.cost_value?.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                              </span>
                              <button
                                onClick={() => deleteCost(cost.id, rev.id)}
                                className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-500 transition-all"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                        {(!rev.cost_items || rev.cost_items.length === 0) && (
                          <p className="text-[10px] text-gray-600 italic py-4 text-center">Nenhum custo vinculado</p>
                        )}
                      </div>

                      <div className="flex gap-2 pt-4 mt-2 border-t border-white/5">
                        <Input
                          id={`cn-${rev.id}`}
                          placeholder="Novo custo"
                          className="h-9 text-[10px] bg-transparent border-white/10 focus:border-white/30"
                        />
                        <Input
                          id={`cv-${rev.id}`}
                          placeholder="R$"
                          type="number"
                          className="h-9 w-24 text-[10px] bg-transparent border-white/10 focus:border-white/30"
                        />
                        <Button
                          size="sm"
                          className="h-9 bg-white/5 hover:bg-red-600 transition-all"
                          onClick={() => {
                            const n = (document.getElementById(`cn-${rev.id}`) as HTMLInputElement).value;
                            const v = (document.getElementById(`cv-${rev.id}`) as HTMLInputElement).value;
                            if (n && v) {
                              addCostToRevenue(rev.id, n, parseFloat(v));
                              (document.getElementById(`cn-${rev.id}`) as HTMLInputElement).value = "";
                              (document.getElementById(`cv-${rev.id}`) as HTMLInputElement).value = "";
                            }
                          }}
                        >
                          <Plus size={16} />
                        </Button>
                      </div>

                      <div className="flex justify-between items-center pt-4 mt-2 border-t-2 border-white/5">
                        <span className="text-[10px] font-black uppercase text-muted-foreground tracking-tighter">
                          Margem do Serviço
                        </span>
                        <span className="text-2xl font-bebas text-green-400">
                          R${" "}
                          {(
                            Number(rev.sale_value) -
                            (rev.cost_items?.reduce((s, c) => s + Number(c.cost_value), 0) || 0)
                          ).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* RESUMO CONSOLIDADO FINAL */}
            <div className="glass-card rounded-lg p-6 bg-neon-pink/5 border border-neon-pink/20 shadow-[0_0_30px_rgba(255,0,128,0.05)]">
              <h2 className="font-bebas text-xl tracking-wider mb-4 uppercase opacity-80">Resumo Consolidado BK</h2>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1 tracking-widest">
                    Receita Total
                  </p>
                  <p className="text-2xl font-bebas text-green-400 tracking-wider">
                    R$ {totalRevenue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1 tracking-widest">
                    Custos Totais
                  </p>
                  <p className="text-2xl font-bebas text-red-400 tracking-wider">
                    R$ {totalCost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1 tracking-widest">
                    Lucro Final
                  </p>
                  <p
                    className={`text-3xl font-bebas tracking-widest ${profit >= 0 ? "text-green-400" : "text-red-400"}`}
                  >
                    R$ {profit.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* --- TAB REPERTORIO --- */}
          <TabsContent value="repertorio">
            <div className="glass-card rounded-lg p-6 bg-black/10">
              <Label className="text-muted-foreground text-xs uppercase mb-4 block tracking-widest">
                Repertório Solicitado / Setlist (Auto-save)
              </Label>
              <textarea
                className="w-full min-h-[400px] bg-background border border-input rounded-md p-6 text-sm text-foreground focus:ring-1 focus:ring-neon-pink outline-none leading-relaxed font-mono"
                value={opp.requested_repertoire || ""}
                onChange={(e) => handleDebouncedSave("requested_repertoire", e.target.value, repertoireRef)}
                placeholder="Liste aqui as músicas pedidas pelo cliente ou observações técnicas..."
              />
            </div>
          </TabsContent>
        </Tabs>

        {/* MODAL RESET BK NEON (SUBSTITUI CONFIRM DO BROWSER) */}
        {resetDialogOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div className="bg-[#111] w-[90%] max-w-sm p-10 rounded-2xl border-2 border-neon-pink shadow-2xl text-center">
              <AlertTriangle className="text-neon-pink mx-auto mb-6" size={48} />
              <h2 className="font-bebas text-4xl mb-4 text-white tracking-[0.1em] uppercase">Resetar?</h2>
              <p className="text-gray-400 text-sm mb-10 leading-relaxed">
                Apagar estratégia personalizada e restaurar o Dossiê Mestre (QI 147)?
              </p>
              <div className="flex flex-col gap-3 font-bold">
                <Button
                  onClick={handleResetPromptConfirm}
                  className="bg-neon-pink hover:bg-neon-pink/80 text-white py-6"
                >
                  SIM, RESETAR
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setResetDialogOpen(false)}
                  className="text-white hover:bg-white/5"
                >
                  CANCELAR
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminOpportunityDetail;

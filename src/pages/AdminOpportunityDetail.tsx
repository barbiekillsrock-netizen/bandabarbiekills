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
import { ArrowLeft, Plus, Trash2, Sparkles, Save, RotateCcw, AlertTriangle, X, BookOpen, Music, Archive } from "lucide-react";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";
import { generateAISalesMessage } from "@/services/aiService";
import AiMessageModal from "@/components/AiMessageModal";
import ImportCatalogModal from "@/components/ImportCatalogModal";
import DjBriefingTab from "@/components/DjBriefingTab";

type Opportunity = Tables<"opportunities">;
type RevenueItem = Tables<"revenue_items"> & { cost_items?: Tables<"cost_items">[] };

const statusOptions = [
  { value: "new", label: "Novo" },
  { value: "contacted", label: "Contatado" },
  { value: "negotiating", label: "Negociando" },
  { value: "won", label: "Fechado" },
  { value: "lost", label: "Perdido" },
  { value: "finished", label: "Finalizado" },
];

const statusColors: Record<string, string> = {
  new: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  contacted: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  negotiating: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  won: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  lost: "bg-red-500/20 text-red-300 border-red-500/30",
  finished: "bg-green-500/20 text-green-300 border-green-500/30",
};

// Classe utilitária para manter TODOS os números financeiros idênticos (compacto)
const financialNumberClass = "font-bebas text-base tracking-wide text-white";

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
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  const [newRevTitle, setNewRevTitle] = useState("");
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [archiveDialogOpen, setArchiveDialogOpen] = useState(false);

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
        .update({ [field]: value } as any)
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
    if (status === "finished") {
      await supabase
        .from("opportunities")
        .update({ status: "finished", archived: true } as any)
        .eq("id", id!);
      setOpp((prev) => (prev ? { ...prev, status: "finished", archived: true } : prev));
      toast.success("Oportunidade finalizada e arquivada!");
    } else {
      await updateField("status", status);
      toast.success(`Status atualizado`);
    }
  };

  const handleResetPromptConfirm = async () => {
    setLocalCustomPrompt(masterPrompt);
    await updateField("custom_prompt", null);
    setResetDialogOpen(false);
    toast.success("Prompt resetado");
  };

  const addRevenue = async () => {
    if (!newRevTitle.trim() || !id) return;
    const { data } = await supabase
      .from("revenue_items")
      .insert([{ title: newRevTitle.trim(), sale_value: 0, opportunity_id: id }])
      .select()
      .single();
    if (data) {
      setRevenues((prev) => [...prev, { ...data, cost_items: [] }]);
      setNewRevTitle("");
      toast.success("Serviço adicionado");
    }
  };

  const addCostToRevenue = async (revId: string, desc: string, val: number) => {
    const { data } = await supabase
      .from("cost_items")
      .insert([{ description: desc, cost_value: val, opportunity_id: id, revenue_item_id: revId }])
      .select()
      .single();
    if (data) {
      setRevenues((prev) =>
        prev.map((r) => (r.id === revId ? { ...r, cost_items: [...(r.cost_items || []), data] } : r)),
      );
    }
  };

  const updateRevenueValue = async (revId: string, newValue: number) => {
    await supabase.from("revenue_items").update({ sale_value: newValue }).eq("id", revId);
    setRevenues((prev) => prev.map((r) => (r.id === revId ? { ...r, sale_value: newValue } : r)));
  };

  const updateRevenueTitle = async (revId: string, newTitle: string) => {
    await supabase.from("revenue_items").update({ title: newTitle }).eq("id", revId);
    setRevenues((prev) => prev.map((r) => (r.id === revId ? { ...r, title: newTitle } : r)));
    toast.success("Título salvo");
  };

  const updateRevenueDescription = async (revId: string, newDesc: string) => {
    await supabase.from("revenue_items").update({ description: newDesc }).eq("id", revId);
    toast.success("Descrição salva");
  };

  const deleteRevenue = async (revId: string) => {
    if (!confirm("Excluir este serviço?")) return;
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
      toast.error("Erro na IA");
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
      <div className="min-h-screen bg-background flex items-center justify-center font-bebas text-xl text-neon-pink">
        SINCRONIZANDO...
      </div>
    );
  if (!opp) return null;

  return (
    <>
      <Helmet>
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

        {/* --- HEADER --- */}
        <div className="glass-card rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="font-bebas text-3xl tracking-wider text-foreground">{opp.client_name}</h1>
              <p className="text-muted-foreground text-sm mt-1 uppercase tracking-tighter">
                {opp.event_type || "Tipo não informado"} •{" "}
                {opp.event_date
                  ? new Date(opp.event_date + "T00:00:00").toLocaleDateString("pt-BR")
                  : "Data não informada"}{" "}
                • {opp.location || "Local não informado"}
              </p>
              {opp.phone && (
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-muted-foreground text-sm font-sans">📱 {opp.phone}</p>
                  <a
                    href={`https://wa.me/55${opp.phone.replace(/\D/g, "")}`}
                    target="_blank"
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
                GERAR MENSAGEM
              </Button>
              <Select value={opp.status || "new"} onValueChange={handleStatusChange}>
                <SelectTrigger className={`w-40 border-2 font-bold ${statusColors[opp.status || "new"]}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label.toUpperCase()}
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

        <ImportCatalogModal
          open={catalogOpen}
          onOpenChange={setCatalogOpen}
          opportunityId={opp.id}
          onImported={fetchData}
        />

        <Tabs defaultValue="resumo">
          <TabsList className="w-full md:w-auto mb-6 bg-white/5 p-1 border border-white/10 rounded-lg flex flex-wrap gap-1 h-auto">
            <TabsTrigger value="resumo" className="px-4 md:px-8 py-2 font-bold data-[state=active]:bg-neon-pink uppercase text-xs whitespace-nowrap">
              Resumo
            </TabsTrigger>
            <TabsTrigger
              value="financeiro"
              className="px-4 md:px-8 py-2 font-bold data-[state=active]:bg-neon-pink uppercase text-xs whitespace-nowrap"
            >
              Financeiro
            </TabsTrigger>
            <TabsTrigger
              value="repertorio"
              className="px-4 md:px-8 py-2 font-bold data-[state=active]:bg-neon-pink uppercase text-xs whitespace-nowrap"
            >
              Repertório
            </TabsTrigger>
            <TabsTrigger
              value="dj-briefing"
              className="px-4 md:px-8 py-2 font-bold data-[state=active]:bg-neon-pink uppercase text-xs whitespace-nowrap"
            >
              DJ Briefing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="resumo" className="space-y-6">
            <div className="glass-card rounded-lg p-6 space-y-4 bg-black/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground text-xs uppercase tracking-wider">Cliente</Label>
                  <p>{opp.client_name}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs uppercase tracking-wider">Telefone</Label>
                  <p className="text-base font-sans text-foreground">{opp.phone || "—"}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs uppercase tracking-wider">Evento</Label>
                  <p>{opp.event_type || "—"}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs uppercase tracking-wider">Data</Label>
                  <p className="text-base font-sans text-foreground">{opp.event_date ? new Date(opp.event_date + "T00:00:00").toLocaleDateString("pt-BR") : "—"}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs uppercase tracking-wider">Local</Label>
                  <p className="text-base font-sans text-foreground">{opp.location || "—"}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs uppercase tracking-wider">Público</Label>
                  <p>{opp.guests || "—"}</p>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-lg p-6 border-2 border-neon-pink/30 relative bg-black/40 shadow-[0_0_20px_rgba(255,0,128,0.1)]">
              <div className="flex justify-between items-center mb-4">
                <Label className="text-neon-pink text-xs uppercase tracking-wider font-bold">
                  Estratégia de Abordagem Personalizada
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
                    className="h-7 bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold px-4"
                  >
                    <Save size={12} className="mr-1" /> Salvar Estratégia
                  </Button>
                </div>
              </div>
              <textarea
                className="w-full min-h-[160px] bg-black/40 border border-neon-pink/40 rounded-md p-4 text-base text-foreground focus:ring-1 focus:ring-neon-pink outline-none font-sans leading-relaxed"
                value={localCustomPrompt}
                onChange={(e) => setLocalCustomPrompt(e.target.value)}
              />
            </div>

            <div className="glass-card rounded-lg p-6 bg-white/[0.02] border border-white/5">
              <Label className="text-muted-foreground text-xs uppercase mb-2 block font-bold">
                Perfil do Cliente (Auto-save)
              </Label>
              <textarea
                className="w-full min-h-[120px] bg-black/40 border border-white/10 rounded-md p-4 text-base text-foreground focus:border-white/30 outline-none font-sans leading-relaxed"
                value={opp.client_profile || ""}
                onChange={(e) => handleDebouncedSave("client_profile", e.target.value, profileRef)}
                placeholder="Descreva preferências, estilo..."
              />
            </div>

            <div className="glass-card rounded-lg p-6 bg-white/[0.02] border border-white/5">
              <Label className="text-muted-foreground text-xs uppercase mb-2 block font-bold">
                Histórico de Negociação (Auto-save)
              </Label>
              <textarea
                className="w-full min-h-[120px] bg-black/40 border border-white/10 rounded-md p-4 text-base text-foreground focus:border-white/30 outline-none font-sans leading-relaxed"
                value={opp.negotiation_history || ""}
                onChange={(e) => handleDebouncedSave("negotiation_history", e.target.value, negotiationRef)}
                placeholder="Registre contatos anteriores..."
              />
            </div>
          </TabsContent>

          {/* --- TAB FINANCEIRA --- */}
          <TabsContent value="financeiro" className="space-y-8 animate-in fade-in duration-300">
            <div className="glass-card rounded-lg p-6 border border-white/10 bg-black/20">
              <h2 className="font-bebas text-xl mb-4 text-foreground tracking-widest uppercase flex items-center gap-2">
                <Plus size={18} className="text-neon-pink" /> Novo Item
              </h2>
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <Input
                    value={newRevTitle}
                    onChange={(e) => setNewRevTitle(e.target.value)}
                    placeholder="Ex: Show Trio Golden Pulse"
                    className="bg-black/40 border-white/10 rounded-md p-4 h-auto text-base font-sans text-foreground"
                  />
                </div>
                <Button variant="neonPink" onClick={addRevenue} className="font-bold px-10 h-11 uppercase text-xs">
                  Adicionar
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setCatalogOpen(true)}
                  className="border-neon-pink text-neon-pink hover:bg-neon-pink/10 font-bold px-6 h-11 uppercase text-xs"
                >
                  <BookOpen size={16} className="mr-2" /> Importar do Catálogo
                </Button>
              </div>
            </div>

            <div className="space-y-8">
              {revenues.map((rev) => {
                const itemTotalCost = rev.cost_items?.reduce((s, c) => s + Number(c.cost_value), 0) || 0;
                const marginAbs = (Number(rev.sale_value) || 0) - itemTotalCost;
                const marginPerc = rev.sale_value ? (marginAbs / Number(rev.sale_value)) * 100 : 0;

                return (
                  <div
                    key={rev.id}
                    className="glass-card rounded-2xl border-2 border-white/5 overflow-hidden bg-black/40 shadow-xl"
                  >
                    <div className="p-6 bg-white/5 flex justify-between items-center border-b border-white/10">
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="bg-neon-pink/20 p-2 rounded text-neon-pink font-bold text-xs uppercase tracking-tighter shrink-0">
                          ITEM BK
                        </div>
                        <Input
                          defaultValue={rev.title}
                          onBlur={(e) => {
                            if (e.target.value !== rev.title) updateRevenueTitle(rev.id, e.target.value);
                          }}
                          className="font-bebas text-2xl tracking-wide text-foreground bg-transparent border-transparent hover:border-white/10 focus:border-neon-pink/40 h-auto p-2"
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteRevenue(rev.id)}
                        className="text-red-500/50 hover:text-red-500 shrink-0"
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>

                    {/* Descrição (abaixo do header, sem IA) */}
                    <div className="px-6 pt-4 pb-2 border-b border-white/5">
                      <Label className="text-[10px] uppercase font-bold text-muted-foreground mb-2 block">
                        Descrição
                      </Label>
                      <textarea
                        className="w-full h-[100px] bg-black/40 border border-white/10 rounded-md p-4 text-base text-foreground outline-none focus:border-neon-pink/50 transition-all leading-relaxed font-sans"
                        value={rev.description || ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          setRevenues((prev) => prev.map((r) => (r.id === rev.id ? { ...r, description: val } : r)));
                        }}
                        placeholder="Descreva o serviço..."
                      />
                      <div className="flex justify-end mt-2">
                        <Button
                          size="sm"
                          onClick={() => updateRevenueDescription(rev.id, rev.description || "")}
                          className="h-7 bg-white/10 hover:bg-neon-pink text-white text-xs font-bold px-4"
                        >
                          <Save size={12} className="mr-1" /> Salvar Descrição
                        </Button>
                      </div>
                    </div>

                    <div className="p-8 grid md:grid-cols-2 gap-12 bg-gradient-to-br from-transparent to-white/[0.01]">
                      {/* 1. CUSTOS */}
                      <div className="space-y-6">
                        <Label className="text-xs uppercase font-black text-muted-foreground tracking-widest block border-b border-white/5 pb-2">
                          1. Definição de Custos
                        </Label>
                        <div className="space-y-3">
                          {rev.cost_items?.map((cost) => (
                            <div
                              key={cost.id}
                              className="flex justify-between items-center bg-white/[0.03] p-4 rounded-lg border border-white/5 group transition-all"
                            >
                              <span className="text-base text-gray-200 font-medium uppercase tracking-tight">
                                {cost.description}
                              </span>
                              <div className="flex items-center gap-4">
                                <span className={financialNumberClass}>
                                  R$ {cost.cost_value?.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                                </span>
                                <button
                                  onClick={() => deleteCost(cost.id, rev.id)}
                                  className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-500"
                                >
                                  <X size={18} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Input
                            id={`cn-${rev.id}`}
                            placeholder="Item..."
                            className="h-11 text-base bg-black/40 border-white/10 font-sans rounded-md p-4"
                            onKeyDown={(e) => {
                              if (e.key === "Tab" && !e.shiftKey) {
                                const valInput = document.getElementById(`cv-${rev.id}`);
                                if (valInput && !(valInput as HTMLInputElement).value) {
                                  // let default tab go to value field
                                } else {
                                  e.preventDefault();
                                  document.getElementById(`add-cost-${rev.id}`)?.focus();
                                }
                              }
                            }}
                          />
                          <Input
                            id={`cv-${rev.id}`}
                            placeholder="R$"
                            type="number"
                            className={`h-11 w-32 bg-black/40 border-white/10 rounded-md p-4 ${financialNumberClass}`}
                            onKeyDown={(e) => {
                              if (e.key === "Tab" && !e.shiftKey) {
                                e.preventDefault();
                                document.getElementById(`add-cost-${rev.id}`)?.focus();
                              }
                            }}
                          />
                          <Button
                            id={`add-cost-${rev.id}`}
                            size="sm"
                            className="h-11 bg-white/5 hover:bg-neon-pink transition-all px-6"
                            onClick={() => {
                              const nEl = document.getElementById(`cn-${rev.id}`) as HTMLInputElement;
                              const vEl = document.getElementById(`cv-${rev.id}`) as HTMLInputElement;
                              if (nEl.value && vEl.value) {
                                addCostToRevenue(rev.id, nEl.value, parseFloat(vEl.value));
                                nEl.value = "";
                                vEl.value = "";
                                nEl.focus();
                              }
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                const nEl = document.getElementById(`cn-${rev.id}`) as HTMLInputElement;
                                const vEl = document.getElementById(`cv-${rev.id}`) as HTMLInputElement;
                                if (nEl.value && vEl.value) {
                                  addCostToRevenue(rev.id, nEl.value, parseFloat(vEl.value));
                                  nEl.value = "";
                                  vEl.value = "";
                                  setTimeout(() => nEl.focus(), 50);
                                }
                              }
                            }}
                          >
                            <Plus size={20} />
                          </Button>
                        </div>
                        <div className="bg-white/5 p-5 rounded-xl flex justify-between items-center border border-white/5">
                          <span className="text-xs uppercase font-bold text-muted-foreground">Total de Custos</span>
                          <span className={financialNumberClass}>
                            R$ {itemTotalCost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      </div>

                      {/* 2. PRECIFICAÇÃO */}
                      <div className="space-y-6">
                        <Label className="text-xs uppercase font-black text-muted-foreground tracking-widest block border-b border-white/5 pb-2">
                          2. Precificação & Margem
                        </Label>

                        <div className="grid grid-cols-1 gap-6 bg-black/20 p-6 rounded-2xl border border-white/5">
                          <div className="space-y-2">
                            <Label className="text-[10px] uppercase text-muted-foreground font-bold">
                              Definir Margem Absoluta (Lucro R$)
                            </Label>
                            <div className="flex gap-2">
                              <Input
                                id={`ma-${rev.id}`}
                                type="number"
                                placeholder="Ex: 2000"
                                className={`bg-black/40 border-white/10 h-11 ${financialNumberClass}`}
                              />
                              <Button
                                size="sm"
                                className="h-11 bg-neon-pink text-white font-bold text-xs px-4"
                                onClick={() => {
                                  const val = (document.getElementById(`ma-${rev.id}`) as HTMLInputElement).value;
                                  if (val) {
                                    updateRevenueValue(rev.id, itemTotalCost + parseFloat(val));
                                    (document.getElementById(`ma-${rev.id}`) as HTMLInputElement).value = "";
                                  }
                                }}
                              >
                                RECALCULAR
                              </Button>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-[10px] uppercase text-muted-foreground font-bold">
                              Definir Margem Desejada (%)
                            </Label>
                            <Input
                              type="number"
                              placeholder="%"
                              className={`bg-black/40 border-white/10 h-11 ${financialNumberClass}`}
                              onChange={(e) => {
                                const m = parseFloat(e.target.value);
                                if (!isNaN(m) && m < 100) {
                                  const calc = itemTotalCost / (1 - m / 100);
                                  updateRevenueValue(rev.id, parseFloat(calc.toFixed(2)));
                                }
                              }}
                            />
                          </div>

                          <div className="space-y-2 pt-2 border-t border-white/5">
                            <Label className="text-[10px] uppercase text-neon-pink font-bold">
                              Valor Final de Venda (R$)
                            </Label>
                            <Input
                              type="number"
                              value={rev.sale_value || ""}
                              onChange={(e) => {
                                const newVal = parseFloat(e.target.value);
                                updateRevenueValue(rev.id, newVal);
                                // Clear margin absolute field when directly editing sale value
                                const maEl = document.getElementById(`ma-${rev.id}`) as HTMLInputElement;
                                if (maEl) maEl.value = "";
                              }}
                              className={`bg-black/40 border-neon-pink/40 h-14 ${financialNumberClass} text-pink-500`}
                            />
                          </div>

                          <div className="flex justify-between items-center bg-white/5 p-4 rounded-lg border border-white/5">
                            <div className="space-y-1">
                              <p className="text-[10px] uppercase text-muted-foreground font-bold">Lucro Líquido</p>
                              <p className={financialNumberClass}>
                                R$ {marginAbs.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                              </p>
                            </div>
                            <div className="text-right space-y-1">
                              <p className="text-[10px] uppercase text-pink-400 font-bold">Margem Atual</p>
                              <p className={`${financialNumberClass} text-pink-400`}>{marginPerc.toFixed(1)}%</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RESULTADO */}
            <div className="glass-card rounded-xl p-6 bg-white/[0.02] border border-white/10">
              <h2 className="font-bebas text-lg tracking-[0.2em] mb-4 text-center text-white uppercase opacity-40">
                Resultado
              </h2>
              <div className="grid grid-cols-3 gap-4 text-center items-center">
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-black tracking-widest">Receita Bruta</p>
                  <p className={financialNumberClass}>
                    R$ {totalRevenue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-black tracking-widest">Custos Totais</p>
                  <p className={financialNumberClass}>
                    R$ {totalCost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="p-4 bg-neon-pink/10 rounded-xl border border-neon-pink/20">
                  <p className="text-xs text-neon-pink uppercase font-black tracking-widest">Lucro BK</p>
                  <p className={financialNumberClass}>
                    R$ {profit.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="repertorio">
            <div className="glass-card rounded-lg p-6 bg-black/10 border border-white/5 shadow-2xl">
              <h2 className="font-bebas text-xl mb-4 text-foreground tracking-widest uppercase flex items-center gap-2">
                <Music size={18} className="text-neon-pink" /> Setlist / Obs Técnicas
              </h2>
              <textarea
                className="w-full min-h-[400px] bg-black/40 border border-white/10 rounded-md p-4 text-base text-foreground focus:ring-1 focus:ring-neon-pink outline-none leading-relaxed font-sans"
                value={opp.requested_repertoire || ""}
                onChange={(e) => updateField("requested_repertoire", e.target.value)}
              />
            </div>
          </TabsContent>

          <TabsContent value="dj-briefing">
            <DjBriefingTab opportunityId={opp.id} phone={opp.phone} />
          </TabsContent>
        </Tabs>

        {/* ARQUIVAR OPORTUNIDADE */}
        <div className="mt-12 border-t border-white/5 pt-8 pb-4 flex justify-center">
          <Button
            variant="ghost"
            onClick={() => setArchiveDialogOpen(true)}
            className="text-red-400/60 hover:text-red-400 hover:bg-red-500/10 text-xs uppercase tracking-widest font-bold"
          >
            <Archive size={14} className="mr-2" />
            Arquivar Oportunidade
          </Button>
        </div>

        {/* MODAL RESET BK */}
        {resetDialogOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md">
            <div className="bg-[#111] w-[90%] max-w-sm p-10 rounded-3xl border-2 border-neon-pink shadow-2xl text-center">
              <AlertTriangle className="text-neon-pink mx-auto mb-6" size={48} />
              <h2 className="font-bebas text-4xl mb-4 text-white tracking-[0.1em] uppercase">Resetar?</h2>
              <p className="text-gray-400 text-sm mb-10 leading-relaxed uppercase font-bold tracking-widest opacity-60">
                Restaurar o prompt mestre (QI 147)?
              </p>
              <div className="flex flex-col gap-3 font-bold">
                <Button
                  onClick={handleResetPromptConfirm}
                  className="bg-neon-pink hover:bg-neon-pink/80 text-white py-8 text-xl font-bebas tracking-[0.2em]"
                >
                  SIM, RESETAR
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setResetDialogOpen(false)}
                  className="text-white opacity-40 hover:opacity-100 uppercase text-xs font-black"
                >
                  CANCELAR
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL ARQUIVAR */}
        {archiveDialogOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md">
            <div className="bg-[#111] w-[90%] max-w-sm p-10 rounded-3xl border-2 border-red-500/50 shadow-2xl text-center">
              <Archive className="text-red-400 mx-auto mb-6" size={48} />
              <h2 className="font-bebas text-4xl mb-4 text-white tracking-[0.1em] uppercase">Arquivar?</h2>
              <p className="text-gray-400 text-sm mb-10 leading-relaxed uppercase font-bold tracking-widest opacity-60">
                A oportunidade será removida da listagem mas permanecerá no banco de dados.
              </p>
              <div className="flex flex-col gap-3 font-bold">
                <Button
                  onClick={async () => {
                    if (!id) return;
                    await supabase.from("opportunities").update({ archived: true } as any).eq("id", id);
                    toast.success("Oportunidade arquivada");
                    navigate("/admin", { replace: true });
                  }}
                  className="bg-red-600 hover:bg-red-500 text-white py-8 text-xl font-bebas tracking-[0.2em]"
                >
                  SIM, ARQUIVAR
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setArchiveDialogOpen(false)}
                  className="text-white opacity-40 hover:opacity-100 uppercase text-xs font-black"
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

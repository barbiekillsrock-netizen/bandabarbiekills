import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ArrowLeft, Sparkles, RotateCcw, Save, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";
import { generateAISalesMessage } from "@/services/aiService";
import AiMessageModal from "@/components/AiMessageModal";

// Importação do Modal Customizado (Shadcn/UI)
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Opportunity = Tables<"opportunities">;

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
  const [loading, setLoading] = useState(true);
  const [masterPrompt, setMasterPrompt] = useState("");

  // Estratégia Local (Manual)
  const [localCustomPrompt, setLocalCustomPrompt] = useState("");
  const [isSavingPrompt, setIsSavingPrompt] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  // Auto-save Refs
  const profileRef = useRef<ReturnType<typeof setTimeout>>();
  const negotiationRef = useRef<ReturnType<typeof setTimeout>>();

  const [aiLoading, setAiLoading] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  const [aiModalOpen, setAiModalOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      const [oppRes, settingsRes] = await Promise.all([
        supabase.from("opportunities").select("*").eq("id", id).single(),
        supabase.from("site_settings").select("value").eq("key", "master_sales_prompt").single(),
      ]);

      if (oppRes.data) {
        setOpp(oppRes.data);
        setLocalCustomPrompt(oppRes.data.custom_prompt || "");
      }
      if (settingsRes.data?.value) setMasterPrompt(settingsRes.data.value);
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
      await updateField("custom_prompt", localCustomPrompt || null);
      toast.success("Estratégia salva com sucesso!");
    } catch (error) {
      toast.error("Erro ao salvar.");
    } finally {
      setIsSavingPrompt(false);
    }
  };

  const handleResetPromptConfirm = async () => {
    setLocalCustomPrompt("");
    await updateField("custom_prompt", null);
    setResetDialogOpen(false);
    toast.success("Estratégia resetada para o padrão global.");
  };

  const handleDebouncedSave = useCallback(
    (field: string, value: string, ref: React.MutableRefObject<ReturnType<typeof setTimeout> | undefined>) => {
      setOpp((prev) => (prev ? { ...prev, [field]: value } : prev));
      if (ref.current) clearTimeout(ref.current);
      ref.current = setTimeout(() => {
        updateField(field, value || null);
        toast.success("Salvo");
      }, 2000);
    },
    [updateField],
  );

  const handleGenerateAI = async () => {
    if (!opp) return;
    const promptToUse = localCustomPrompt.trim() || masterPrompt;
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

  if (loading)
    return (
      <div className="p-8 text-center font-bebas tracking-widest text-muted-foreground animate-pulse">BACKSTAGE...</div>
    );
  if (!opp) return null;

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>{opp.client_name} | CRM BK</title>
      </Helmet>

      <div className="min-h-screen bg-background p-4 md:p-8 max-w-5xl mx-auto animate-in fade-in duration-700">
        <Button variant="ghost" onClick={() => navigate("/admin")} className="mb-6 hover:bg-white/5">
          <ArrowLeft size={18} className="mr-2" /> VOLTAR
        </Button>

        <div className="glass-card rounded-lg p-6 mb-8 flex flex-col md:flex-row justify-between items-center gap-4 border-l-4 border-neon-pink">
          <div>
            <h1 className="font-bebas text-4xl tracking-wider">{opp.client_name}</h1>
            <p className="text-muted-foreground text-xs uppercase tracking-tighter opacity-70">
              {opp.event_type} • {opp.location}
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleGenerateAI}
              disabled={aiLoading}
              className="bg-neon-pink hover:bg-neon-pink/80 text-white font-bold px-6 shadow-[0_0_20px_rgba(255,0,128,0.3)]"
            >
              <Sparkles size={16} className="mr-2" /> {aiLoading ? "PROCESSANDO..." : "GERAR MENSAGEM"}
            </Button>
            <Select value={opp.status || "new"} onValueChange={(val) => updateField("status", val)}>
              <SelectTrigger className={`w-36 border-2 font-bold ${statusColors[opp.status || "new"]}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black border-white/10">
                {statusOptions.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="resumo">
          <TabsList className="mb-8 bg-black/40 border border-white/10 p-1 w-full md:w-auto">
            <TabsTrigger
              value="resumo"
              className="px-8 font-bold data-[state=active]:bg-neon-pink data-[state=active]:text-white"
            >
              RESUMO
            </TabsTrigger>
            <TabsTrigger
              value="financeiro"
              className="px-8 font-bold data-[state=active]:bg-neon-pink data-[state=active]:text-white"
            >
              FINANCEIRO
            </TabsTrigger>
          </TabsList>

          <TabsContent value="resumo" className="space-y-8">
            {/* ESTRATÉGIA COM MODAL SHADCN */}
            <div className="glass-card rounded-xl p-6 border-2 border-neon-pink/30 bg-gradient-to-b from-white/[0.02] to-transparent">
              <div className="flex justify-between items-center mb-4">
                <Label className="text-neon-pink text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2">
                  <Sparkles size={14} /> Estratégia de Abordagem Personalizada
                </Label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setResetDialogOpen(true)}
                    className="h-8 text-[10px] text-muted-foreground hover:text-white"
                  >
                    <RotateCcw size={10} className="mr-1" /> RESETAR PADRÃO
                  </Button>
                  <Button
                    onClick={handleSaveCustomPrompt}
                    disabled={isSavingPrompt}
                    size="sm"
                    className="h-9 bg-green-600 hover:bg-green-500 text-white font-black text-[10px] tracking-widest"
                  >
                    <Save size={14} className="mr-1" /> {isSavingPrompt ? "SALVANDO..." : "SALVAR ESTRATÉGIA"}
                  </Button>
                </div>
              </div>

              <textarea
                className="w-full min-h-[200px] bg-black/40 border border-white/10 rounded-lg p-4 text-sm text-gray-200 resize-y focus:border-neon-pink/60 outline-none transition-all placeholder:italic"
                value={localCustomPrompt || masterPrompt}
                onChange={(e) => setLocalCustomPrompt(e.target.value)}
                placeholder="O texto mestre aparecerá aqui para sua edição..."
              />
              <div className="flex justify-between mt-3 text-[9px] font-bold tracking-widest">
                <span className={localCustomPrompt ? "text-neon-pink" : "text-muted-foreground"}>
                  {localCustomPrompt ? "● ESTRATÉGIA PERSONALIZADA ATIVA" : "○ USANDO CONFIGURAÇÃO GLOBAL"}
                </span>
                <span className="opacity-40">CONTROLE MANUAL DE SALVAMENTO</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card rounded-lg p-6 border border-white/5">
                <Label className="text-[10px] uppercase tracking-widest mb-3 block text-muted-foreground font-bold">
                  Perfil do Lead (Auto-save)
                </Label>
                <textarea
                  className="w-full min-h-[100px] bg-black/20 border border-white/10 rounded-md p-3 text-sm outline-none focus:border-white/20"
                  value={opp.client_profile || ""}
                  onChange={(e) => handleDebouncedSave("client_profile", e.target.value, profileRef)}
                />
              </div>
              <div className="glass-card rounded-lg p-6 border border-white/5">
                <Label className="text-[10px] uppercase tracking-widest mb-3 block text-muted-foreground font-bold">
                  Histórico (Auto-save)
                </Label>
                <textarea
                  className="w-full min-h-[100px] bg-black/20 border border-white/10 rounded-md p-3 text-sm outline-none focus:border-white/20"
                  value={opp.negotiation_history || ""}
                  onChange={(e) => handleDebouncedSave("negotiation_history", e.target.value, negotiationRef)}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="financeiro">
            <div className="p-20 text-center border-2 border-dashed border-white/5 rounded-2xl">
              <p className="font-bebas text-2xl text-muted-foreground opacity-20 tracking-[0.5em]">MÓDULO FINANCEIRO</p>
            </div>
          </TabsContent>
        </Tabs>

        {/* MODAL DE RESET (SHADCN/UI) - ADEUS NATIVO! */}
        <AlertDialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
          <AlertDialogContent className="bg-[#0a0a0a] border border-neon-pink/50 shadow-[0_0_50px_rgba(255,0,128,0.2)]">
            <AlertDialogHeader>
              <AlertDialogTitle className="font-bebas text-3xl tracking-widest text-white flex items-center gap-2">
                <AlertTriangle className="text-neon-pink" size={24} /> RESETAR ESTRATÉGIA?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-400 text-sm leading-relaxed">
                Esta ação irá apagar permanentemente sua personalização para este lead e restaurar o **Prompt Mestre
                Global** (vendedor de QI 147). Tem certeza?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-6">
              <AlertDialogCancel className="bg-transparent border-white/10 text-white hover:bg-white/5">
                CANCELAR
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleResetPromptConfirm}
                className="bg-neon-pink hover:bg-neon-pink/80 text-white font-bold"
              >
                SIM, RESETAR
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

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

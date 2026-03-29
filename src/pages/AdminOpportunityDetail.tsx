import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ArrowLeft, Sparkles, RotateCcw, Save, AlertTriangle, X } from "lucide-react";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";
import { generateAISalesMessage } from "@/services/aiService";
import AiMessageModal from "@/components/AiMessageModal";

type Opportunity = Tables<"opportunities">;

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

  // ESTRATÉGIA: ESTADO LOCAL (MANUAL)
  const [localCustomPrompt, setLocalCustomPrompt] = useState("");
  const [isSavingPrompt, setIsSavingPrompt] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  // AUTO-SAVE REFS (PERFIL E HISTÓRICO)
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
        const mPrompt = settingsRes.data?.value || "";
        setMasterPrompt(mPrompt);
        // Se houver algo no banco, usa. Se não, usa o mestre.
        setLocalCustomPrompt(oppRes.data.custom_prompt || mPrompt);
      }
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

  // SALVAR ESTRATÉGIA MANUALMENTE
  const handleSaveCustomPrompt = async () => {
    setIsSavingPrompt(true);
    try {
      await updateField("custom_prompt", localCustomPrompt);
      toast.success("Estratégia salva para este lead!");
    } catch (error) {
      toast.error("Erro ao salvar estratégia.");
    } finally {
      setIsSavingPrompt(false);
    }
  };

  const handleResetPromptConfirm = async () => {
    setLocalCustomPrompt(masterPrompt);
    await updateField("custom_prompt", null);
    setResetDialogOpen(false);
    toast.success("Resetado para o padrão da banda.");
  };

  const handleDebouncedSave = useCallback(
    (field: string, value: string, ref: React.MutableRefObject<ReturnType<typeof setTimeout> | undefined>) => {
      setOpp((prev) => (prev ? { ...prev, [field]: value } : prev));
      if (ref.current) clearTimeout(ref.current);
      ref.current = setTimeout(() => {
        updateField(field, value || null);
        toast.info(`Informação atualizada.`);
      }, 2000);
    },
    [updateField],
  );

  const handleGenerateAI = async () => {
    if (!opp) return;
    setAiLoading(true);
    try {
      // Usa o que está no campo de texto agora, mesmo se não salvou no banco
      const message = await generateAISalesMessage(opp, localCustomPrompt);
      setAiMessage(message);
      setAiModalOpen(true);
    } catch (err: any) {
      toast.error("IA indisponível. Tente novamente.");
    } finally {
      setAiLoading(false);
    }
  };

  if (loading)
    return <div className="p-20 text-center font-bebas text-xl text-muted-foreground">CARREGANDO BACKSTAGE...</div>;
  if (!opp) return null;

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex" />
        <title>{opp.client_name} | CRM BK</title>
      </Helmet>

      <div className="min-h-screen bg-background p-4 md:p-8 max-w-5xl mx-auto relative">
        <Button variant="ghost" onClick={() => navigate("/admin")} className="mb-6 hover:text-neon-pink">
          <ArrowLeft size={18} className="mr-2" /> VOLTAR
        </Button>

        <div className="glass-card rounded-lg p-6 mb-8 flex flex-col md:flex-row justify-between items-center gap-4 border-l-4 border-neon-pink">
          <div>
            <h1 className="font-bebas text-4xl tracking-wider">{opp.client_name}</h1>
            <p className="text-muted-foreground text-xs uppercase opacity-70">
              {opp.event_type} • {opp.location}
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleGenerateAI}
              disabled={aiLoading}
              className="bg-neon-pink hover:bg-neon-pink/80 text-white font-bold px-6 shadow-lg shadow-neon-pink/20"
            >
              <Sparkles size={16} className="mr-2" /> {aiLoading ? "GERANDO..." : "GERAR MENSAGEM"}
            </Button>
            <Select value={opp.status || "new"} onValueChange={(val) => updateField("status", val)}>
              <SelectTrigger className={`w-36 border-2 font-bold ${statusColors[opp.status || "new"]}`}>
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

        <Tabs defaultValue="resumo">
          <TabsList className="mb-6 bg-white/5 p-1">
            <TabsTrigger value="resumo" className="px-10 font-bold uppercase data-[state=active]:bg-neon-pink">
              RESUMO
            </TabsTrigger>
          </TabsList>

          <TabsContent value="resumo" className="space-y-8 animate-in fade-in duration-500">
            {/* --- ESTRATÉGIA: SALVAMENTO MANUAL --- */}
            <div className="glass-card rounded-xl p-6 border-2 border-neon-pink/40 shadow-[0_0_25px_rgba(255,0,128,0.1)]">
              <div className="flex justify-between items-center mb-4">
                <Label className="text-neon-pink text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2">
                  🎯 Estratégia de Abordagem Personalizada
                </Label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setResetDialogOpen(true)}
                    className="h-8 text-[9px] text-muted-foreground hover:text-white"
                  >
                    <RotateCcw size={10} className="mr-1" /> RESETAR PADRÃO
                  </Button>
                  <Button
                    onClick={handleSaveCustomPrompt}
                    disabled={isSavingPrompt}
                    className="h-9 bg-green-600 hover:bg-green-500 text-white font-black text-[10px] tracking-widest px-4"
                  >
                    <Save size={14} className="mr-1" /> {isSavingPrompt ? "SALVANDO..." : "SALVAR ESTRATÉGIA"}
                  </Button>
                </div>
              </div>

              <textarea
                className="w-full min-h-[200px] bg-black/40 border border-white/10 rounded-lg p-4 text-sm text-gray-200 resize-y focus:border-neon-pink outline-none transition-all"
                value={localCustomPrompt}
                onChange={(e) => setLocalCustomPrompt(e.target.value)} // APENAS ATUALIZA O TEXTO, NÃO SALVA AUTO
              />
              <p className="text-[9px] text-muted-foreground mt-2 uppercase font-bold tracking-tighter opacity-50 italic">
                Atenção: Este campo requer salvamento manual no botão verde.
              </p>
            </div>

            {/* --- OUTROS CAMPOS: AUTO-SAVE --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card rounded-lg p-6 border border-white/5 bg-black/10">
                <Label className="text-[10px] uppercase tracking-widest mb-3 block text-muted-foreground font-bold">
                  Perfil do Lead (Auto-save)
                </Label>
                <textarea
                  className="w-full min-h-[120px] bg-transparent border border-white/10 rounded-md p-3 text-sm outline-none focus:border-white/20"
                  value={opp.client_profile || ""}
                  onChange={(e) => handleDebouncedSave("client_profile", e.target.value, profileRef)}
                />
              </div>
              <div className="glass-card rounded-lg p-6 border border-white/5 bg-black/10">
                <Label className="text-[10px] uppercase tracking-widest mb-3 block text-muted-foreground font-bold">
                  Histórico (Auto-save)
                </Label>
                <textarea
                  className="w-full min-h-[120px] bg-transparent border border-white/10 rounded-md p-3 text-sm outline-none focus:border-white/20"
                  value={opp.negotiation_history || ""}
                  onChange={(e) => handleDebouncedSave("negotiation_history", e.target.value, negotiationRef)}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* MODAL DE RESET (SHADCN REPLACEMENT) */}
        {resetDialogOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="bg-[#111] w-[90%] max-w-sm p-8 rounded-2xl border border-neon-pink shadow-2xl">
              <h2 className="font-bebas text-3xl mb-4 text-white flex items-center gap-3">
                <AlertTriangle className="text-neon-pink" /> RESETAR?
              </h2>
              <p className="text-gray-400 text-sm mb-8">Apagar personalização e voltar ao texto padrão da banda?</p>
              <div className="flex justify-end gap-3 font-bold">
                <Button variant="ghost" onClick={() => setResetDialogOpen(false)} className="text-xs">
                  CANCELAR
                </Button>
                <Button
                  onClick={handleResetPromptConfirm}
                  className="bg-neon-pink hover:bg-neon-pink/80 text-white text-xs"
                >
                  SIM, RESETAR
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

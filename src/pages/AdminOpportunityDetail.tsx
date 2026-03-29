import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ArrowLeft, Sparkles, RotateCcw, Save, AlertTriangle, X, ClipboardList, UserCircle2 } from "lucide-react";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";
import { generateAISalesMessage } from "@/services/aiService";
import AiMessageModal from "@/components/AiMessageModal";

type Opportunity = Tables<"opportunities">;

const AdminOpportunityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [opp, setOpp] = useState<Opportunity | null>(null);
  const [loading, setLoading] = useState(true);
  const [masterPrompt, setMasterPrompt] = useState("");
  
  // ESTRATÉGIA LOCAL
  const [localCustomPrompt, setLocalCustomPrompt] = useState("");
  const [isSavingPrompt, setIsSavingPrompt] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  // REFS AUTO-SAVE
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
        setLocalCustomPrompt(oppRes.data.custom_prompt || mPrompt);
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const updateField = useCallback(async (field: string, value: any) => {
    if (!id) return;
    await supabase.from("opportunities").update({ [field]: value }).eq("id", id);
    setOpp((prev) => (prev ? { ...prev, [field]: value } : prev));
  }, [id]);

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

  const handleResetPromptConfirm = async () => {
    setLocalCustomPrompt(masterPrompt);
    await updateField("custom_prompt", null);
    setResetDialogOpen(false);
    toast.success("Resetado.");
  };

  const handleDebouncedSave = useCallback((field: string, value: string, ref: React.MutableRefObject<ReturnType<typeof setTimeout> | undefined>) => {
    setOpp((prev) => (prev ? { ...prev, [field]: value } : prev));
    if (ref.current) clearTimeout(ref.current);
    ref.current = setTimeout(() => {
      updateField(field, value || null);
      toast.info("Alteração salva", { duration: 1000 });
    }, 2000);
  }, [updateField]);

  const handleGenerateAI = async () => {
    if (!opp) return;
    setAiLoading(true);
    try {
      const message = await generateAISalesMessage(opp, localCustomPrompt);
      setAiMessage(message);
      setAiModalOpen(true);
    } catch (err: any) {
      toast.error("Erro na IA.");
    } finally {
      setAiLoading(false);
    }
  };

  if (loading) return <div className="p-20 text-center font-bebas text-2xl text-neon-pink">SINCRONIZANDO...</div>;
  if (!opp) return null;

  return (
    <>
      <Helmet><meta name="robots" content="noindex" /><title>{opp.client_name} | CRM BK</title></Helmet>
      
      <div className="min-h-screen bg-[#050505] text-white p-4 md:p-8 max-w-6xl mx-auto">
        {/* Top Nav */}
        <Button variant="ghost" onClick={() => navigate("/admin")} className="mb-6 hover:bg-white/5 opacity-60 hover:opacity-100 transition-all">
          <ArrowLeft size={18} className="mr-2" /> VOLTAR PARA LISTAGEM
        </Button>

        {/* Header Hero */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 bg-gradient-to-r from-black to-transparent p-8 rounded-2xl border border-white/5">
          <div className="space-y-1">
            <h1 className="font-bebas text-5xl tracking-widest text-white">{opp.client_name}</h1>
            <p className="text-neon-pink text-sm font-bold tracking-[0.3em] uppercase opacity-80">{opp.event_type} • {opp.location}</p>
          </div>
          <Button onClick={handleGenerateAI} disabled={aiLoading} className="bg-neon-pink hover:bg-neon-pink/80 text-white font-black px-10 py-7 text-lg shadow-[0_0_30px_rgba(255,0,128,0.2)]">
            <Sparkles size={20} className="mr-2" /> {aiLoading ? "ANALISANDO..." : "GERAR MENSAGEM"}
          </Button>
        </div>

        <Tabs defaultValue="resumo" className="space-y-8">
          <TabsList className="bg-white/5 p-1 mb-4 h-14">
            <TabsTrigger value="resumo" className="px-12 h-full font-bold text-lg data-[state=active]:bg-neon-pink">DOSSIÊ DO LEAD</TabsTrigger>
          </TabsList>

          <TabsContent value="resumo" className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* 1. ESTRATÉGIA - O CÉREBRO */}
            <section className="glass-card rounded-3xl p-8 border-2 border-neon-pink/40 bg-black/40">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-neon-pink p-2 rounded-lg shadow-[0_0_15px_rgba(255,0,128,0.5)]">
                    <Sparkles size={20} className="text-white" />
                  </div>
                  <h2 className="font-bebas text-2xl tracking-widest uppercase">Estratégia de Abordagem Personalizada</h2>
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                  <Button variant="ghost" onClick={() => setResetDialogOpen(true)} className="flex-1 md:flex-none text-xs text-muted-foreground"><RotateCcw size={14} className="mr-2" /> RESETAR</Button>
                  <Button onClick={handleSaveCustomPrompt} disabled={isSavingPrompt} className="flex-1 md:flex-none bg-green-600 hover:bg-green-500 text-white font-black px-8">
                    <Save size={18} className="mr-2" /> SALVAR ESTRATÉGIA
                  </Button>
                </div>
              </div>
              
              <textarea
                className="w-full min-h-[250px] bg-black/60 border border-white/10 rounded-2xl p-6 text-base text-gray-100 focus:border-neon-pink outline-none transition-all leading-relaxed font-sans shadow-inner"
                value={localCustomPrompt}
                onChange={(e) => setLocalCustomPrompt(e.target.value)}
                placeholder="Defina o tom da venda aqui..."
              />
            </section>

            {/* 2. PERFIL DO LEAD - ESPAÇOSO */}
            <section className="glass-card rounded-3xl p-8 border border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-3 mb-6 opacity-60">
                <UserCircle2 size={24} />
                <h2 className="font-bebas text-2xl tracking-widest uppercase">Perfil do Lead (Contexto Psicológico)</h2>
              </div>
              <textarea
                className="w-full min-h-[200px] bg-black/30 border border-white/10 rounded-2xl p-6 text-base text-gray-300 outline-none focus:border-white/30 transition-all leading-relaxed"
                value={opp.client_profile || ""}
                onChange={(e) => handleDebouncedSave("client_profile", e.target.value, profileRef)}
                placeholder="Fatos, preferências, inclinações políticas ou musicais..."
              />
              <p className="text-[10px] text-muted-foreground mt-3 uppercase tracking-widest font-bold opacity-40">Salva automaticamente enquanto você digita</p>
            </section>

            {/* 3. HISTÓRICO - ESPAÇOSO */}
            <section className="glass-card rounded-3xl p-8 border border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-3 mb-6 opacity-60">
                <ClipboardList size={24} />
                <h2 className="font-bebas text-2xl tracking-widest uppercase">Histórico de Negociação (O que já rolou)</h2>
              </div>
              <textarea
                className="w-full min-h-[200px] bg-black/30 border border-white/10 rounded-2xl p-6 text-base text-gray-300 outline-none focus:border-white/30 transition-all leading-relaxed"
                value={opp.negotiation_history || ""}
                onChange={(e) => handleDebouncedSave("negotiation_history", e.target.value, negotiationRef)}
                placeholder="Datas, conversas anteriores, motivos de pausas..."
              />
              <p className="text-
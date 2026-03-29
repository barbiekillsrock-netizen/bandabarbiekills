import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  const [localCustomPrompt, setLocalCustomPrompt] = useState("");
  const [isSavingPrompt, setIsSavingPrompt] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

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

  const updateField = useCallback(async (field: string, value: any) => {
    if (!id) return;
    await supabase.from("opportunities").update({ [field]: value }).eq("id", id);
    setOpp((prev) => (prev ? { ...prev, [field]: value } : prev));
  }, [id]);

  const handleSaveCustomPrompt = async () => {
    setIsSavingPrompt(true);
    try {
      await updateField("custom_prompt", localCustomPrompt || null);
      toast.success("Estratégia salva!");
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

  const handleDebouncedSave = useCallback((field: string, value: string, ref: React.MutableRefObject<ReturnType<typeof setTimeout> | undefined>) => {
    setOpp((prev) => (prev ? { ...prev, [field]: value } : prev));
    if (ref.current) clearTimeout(ref.current);
    ref.current = setTimeout(() => {
      updateField(field, value || null);
      toast.success("Salvo");
    }, 2000);
  }, [updateField]);

  const handleGenerateAI = async () => {
    if (!opp) return;
    const promptToUse = localCustomPrompt.trim() || masterPrompt;
    setAiLoading(true);
    try {
      const message = await generateAISalesMessage(opp, promptToUse);
      setAiMessage(message);
      setAiModalOpen(true);
    } catch (err: any) {
      toast.error("IA ocupada. Tente em 30s.");
    } finally {
      setAiLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-center font-bebas tracking-widest text-muted-foreground">BACKSTAGE...</div>;
  if (!opp) return null;

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>{opp.client_name} | CRM BK</title>
      </Helmet>
      
      <div className="min-h-screen bg-background p-4 md:p-8 max-w-5xl mx-auto relative">
        <Button variant="ghost" onClick={() => navigate("/admin")} className="mb-6 hover:text-neon-pink">
          <ArrowLeft size={18} className="mr-2" /> VOLTAR
        </Button>

        <div
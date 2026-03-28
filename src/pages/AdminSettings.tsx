import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";

const AdminSettings = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchPrompt = async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "master_sales_prompt")
        .single();
      if (data) setPrompt(data.value);
      setLoading(false);
    };
    fetchPrompt();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("site_settings")
      .upsert({ key: "master_sales_prompt", value: prompt }, { onConflict: "key" });
    setSaving(false);
    if (error) {
      toast.error("Erro ao salvar prompt");
    } else {
      toast.success("Prompt mestre salvo com sucesso");
    }
  };

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Configurações | CRM Barbie Kills</title>
      </Helmet>
      <div className="min-h-screen bg-background p-4 md:p-8 max-w-4xl mx-auto">
        <Button variant="ghost" onClick={() => navigate("/admin")} className="mb-6 text-muted-foreground">
          <ArrowLeft size={18} />
          <span className="ml-2">Voltar</span>
        </Button>

        <h1 className="font-bebas text-3xl tracking-wider text-foreground mb-6">CONFIGURAÇÕES</h1>

        <div className="glass-card rounded-lg p-6">
          <Label className="text-muted-foreground text-xs uppercase tracking-wider mb-2 block">
            Prompt Mestre de Vendas (IA)
          </Label>
          <p className="text-xs text-muted-foreground mb-3">
            Este prompt é usado como instrução base para a IA gerar mensagens de vendas personalizadas para cada lead.
          </p>
          {loading ? (
            <p className="text-muted-foreground">Carregando...</p>
          ) : (
            <>
              <textarea
                className="w-full min-h-[300px] bg-background border border-input rounded-md p-3 text-sm text-foreground resize-y focus:ring-2 focus:ring-ring focus:outline-none"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ex: Você é a assistente de vendas da Barbie Kills, uma banda de rock premium para eventos..."
              />
              <Button
                onClick={handleSave}
                disabled={saving}
                className="mt-4 bg-neon-pink hover:bg-neon-pink/80 text-white"
              >
                <Save size={16} className="mr-2" />
                {saving ? "Salvando..." : "Salvar Prompt"}
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminSettings;

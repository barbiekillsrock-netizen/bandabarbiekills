import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Package } from "lucide-react";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";

type StandardItem = Tables<"standard_revenue_items">;

interface ImportCatalogModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  opportunityId: string;
  onImported: () => void;
}

const ImportCatalogModal = ({ open, onOpenChange, opportunityId, onImported }: ImportCatalogModalProps) => {
  const [templates, setTemplates] = useState<StandardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const fetch = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("standard_revenue_items")
        .select("*")
        .order("title");
      if (data) setTemplates(data);
      setLoading(false);
    };
    fetch();
  }, [open]);

  const handleImport = async (template: StandardItem) => {
    setImporting(template.id);
    const { error } = await supabase
      .from("revenue_items")
      .insert([{
        title: template.title,
        description: template.default_description,
        sale_value: 0,
        opportunity_id: opportunityId,
      }]);
    if (error) {
      toast.error("Erro ao importar template");
    } else {
      toast.success(`"${template.title}" importado!`);
      onImported();
    }
    setImporting(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#111] border-neon-pink/30 max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-bebas text-2xl tracking-wider text-foreground flex items-center gap-2">
            <Package size={20} className="text-neon-pink" /> Catálogo BK
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <p className="text-muted-foreground py-4">Carregando...</p>
        ) : templates.length === 0 ? (
          <p className="text-muted-foreground py-4 text-center">
            Nenhum template cadastrado. Crie templates em /admin → Templates de Proposta.
          </p>
        ) : (
          <div className="space-y-3 mt-2">
            {templates.map((t) => (
              <div
                key={t.id}
                className="flex items-start justify-between gap-3 p-4 rounded-lg bg-black/40 border border-white/10 hover:border-neon-pink/30 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="font-bebas text-lg tracking-wide text-foreground">{t.title}</h4>
                  {t.default_description && (
                    <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap line-clamp-3">
                      {t.default_description}
                    </p>
                  )}
                </div>
                <Button
                  size="sm"
                  onClick={() => handleImport(t)}
                  disabled={importing === t.id}
                  className="bg-neon-pink hover:bg-neon-pink/80 text-white font-bold text-xs px-4 shrink-0"
                >
                  <Check size={14} className="mr-1" /> Importar
                </Button>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ImportCatalogModal;

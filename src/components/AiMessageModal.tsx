import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Copy, Save, MessageSquare } from "lucide-react";
import { toast } from "sonner";

interface AiMessageModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  message: string;
  opportunityId: string;
  phone?: string | null;
}

const AiMessageModal = ({ open, onOpenChange, message, opportunityId, phone }: AiMessageModalProps) => {
  const [editedMessage, setEditedMessage] = useState(message);

  // Sync when message changes from outside
  if (message !== "" && editedMessage === "" && open) {
    setEditedMessage(message);
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(editedMessage);
    toast.success("Mensagem copiada!");
  };

  const handleSaveCRM = async () => {
    const { error } = await supabase
      .from("opportunities")
      .update({ last_ai_script: editedMessage })
      .eq("id", opportunityId);
    if (error) {
      toast.error("Erro ao salvar no CRM");
    } else {
      toast.success("Mensagem salva no CRM");
    }
  };

  const handleWhatsApp = () => {
    if (!phone) {
      toast.error("Telefone não cadastrado para este lead");
      return;
    }
    const encodedMsg = encodeURIComponent(editedMessage);
    window.open(`https://wa.me/55${phone}?text=${encodedMsg}`, "_blank");
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { onOpenChange(v); if (!v) setEditedMessage(""); }}>
      <DialogContent className="max-w-2xl bg-background border-border">
        <DialogHeader>
          <DialogTitle className="font-bebas text-xl tracking-wider text-foreground">
            Mensagem Gerada por IA
          </DialogTitle>
        </DialogHeader>
        <textarea
          className="w-full min-h-[250px] bg-background border border-input rounded-md p-3 text-sm text-foreground resize-y focus:ring-2 focus:ring-ring focus:outline-none"
          value={editedMessage}
          onChange={(e) => setEditedMessage(e.target.value)}
        />
        <div className="flex flex-col sm:flex-row gap-2 pt-4">
          <Button variant="outline" onClick={handleCopy} className="flex-1">
            <Copy size={16} className="mr-2" />
            Copiar
          </Button>
          <Button variant="outline" onClick={handleSaveCRM} className="flex-1">
            <Save size={16} className="mr-2" />
            Salvar no CRM
          </Button>
          <Button onClick={handleWhatsApp} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
            <img src="/icons/whatsapp-white.svg" alt="" className="w-4 h-4 mr-2" />
            Enviar WhatsApp
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AiMessageModal;

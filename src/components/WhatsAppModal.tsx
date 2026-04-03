import { useState, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { publicSupabase } from "@/integrations/supabase/publicClient";
import { toast } from "sonner";

const WHATSAPP_NUMBER = "5519982846842";

const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

interface WhatsAppModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WhatsAppModal = ({ open, onOpenChange }: WhatsAppModalProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [tipoEvento, setTipoEvento] = useState("");
  const [outroEvento, setOutroEvento] = useState("");
  const [data, setData] = useState<Date | undefined>();
  const [local, setLocal] = useState("");
  const [publico, setPublico] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);

  const resetForm = useCallback(() => {
    setNome("");
    setTelefone("");
    setTipoEvento("");
    setOutroEvento("");
    setData(undefined);
    setLocal("");
    setPublico("");
    setShowCalendar(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !tipoEvento || !data || !local.trim() || submitting) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setSubmitting(true);

    const eventoFinal = tipoEvento === "Outros" ? outroEvento.trim() || "Outros" : tipoEvento;
    const dataFormatada = format(data, "dd/MM/yyyy", { locale: ptBR });
    const dataISO = format(data, "yyyy-MM-dd");
    const phoneDigits = telefone.replace(/\D/g, "");
    const guestsMatch = publico.replace(/\D/g, "");
    const guestsNum = guestsMatch ? parseInt(guestsMatch, 10) : null;

    const opportunityPayload = {
      client_name: nome.trim(),
      phone: phoneDigits || null,
      event_type: eventoFinal,
      event_date: dataISO,
      location: local.trim(),
      guests: guestsNum,
      status: "new",
    };

    const whatsappMessage = `🎸 *NOVO ORÇAMENTO - BARBIE KILLS*

👤 *Cliente:* ${nome.trim()}
📱 *Telefone:* ${telefone || "Não informado"}
🎭 *Evento:* ${eventoFinal}
📅 *Data:* ${dataFormatada}
📍 *Local:* ${local.trim()}
👥 *Público:* ${publico.trim() || "Não informado"}

_Enviado via barbiekills.com.br_`;

    try {
      const { error } = await publicSupabase.from("opportunities").insert([opportunityPayload]);
      if (error) {
        console.error("Erro no Supabase:", error.message);
        toast.warning("Nota: Lead salvo apenas no WhatsApp (Erro de sincronização).");
      } else {
        toast.success("🤘 Orçamento registrado com sucesso!");
      }
    } catch (err) {
      console.error("Erro crítico de rede:", err);
    } finally {
      onOpenChange(false);
      resetForm();
      setSubmitting(false);
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o);
        if (!o) resetForm();
      }}
    >
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto border-border bg-background">
        <DialogHeader>
          <DialogTitle className="font-oswald text-xl uppercase tracking-wider text-foreground">
            Pedir Orçamento
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            Preencha os dados e enviaremos pelo WhatsApp.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          <div className="space-y-1.5">
            <Label htmlFor="nome">Nome</Label>
            <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Seu nome completo" required maxLength={100} />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="telefone">Seu WhatsApp / Telefone</Label>
            <Input id="telefone" value={telefone} onChange={(e) => setTelefone(formatPhone(e.target.value))} placeholder="(00) 00000-0000" maxLength={15} type="tel" />
          </div>

          <div className="space-y-1.5">
            <Label>Tipo de Evento</Label>
            <Select value={tipoEvento} onValueChange={(v) => { setTipoEvento(v); if (v !== "Outros") setOutroEvento(""); }}>
              <SelectTrigger><SelectValue placeholder="Selecione o tipo" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Casamento">Casamento</SelectItem>
                <SelectItem value="Corporativo">Corporativo</SelectItem>
                <SelectItem value="Aniversário">Aniversário</SelectItem>
                <SelectItem value="Outros">Outros</SelectItem>
              </SelectContent>
            </Select>
            {tipoEvento === "Outros" && (
              <Input value={outroEvento} onChange={(e) => setOutroEvento(e.target.value)} placeholder="Especifique o tipo de evento" className="mt-2" maxLength={100} />
            )}
          </div>

          <div className="space-y-1.5">
            <Label>Data do Evento</Label>
            <button
              type="button"
              onClick={() => setShowCalendar(!showCalendar)}
              className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {data ? format(data, "dd/MM/yyyy", { locale: ptBR }) : <span className="text-muted-foreground">Selecione a data</span>}
            </button>
            {showCalendar && (
              <div className="rounded-md border border-border bg-card p-1">
                <Calendar mode="single" selected={data} onSelect={(d) => { setData(d); setShowCalendar(false); }} disabled={(date) => date < new Date()} locale={ptBR} className="pointer-events-auto" />
              </div>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="local">Local e Cidade</Label>
            <Input id="local" value={local} onChange={(e) => setLocal(e.target.value)} placeholder="Ex: Fazenda Vila Rica, Campinas" required maxLength={200} />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="publico">Público Estimado</Label>
            <Input id="publico" value={publico} onChange={(e) => setPublico(e.target.value)} placeholder="Ex: 200 pessoas" maxLength={50} />
          </div>

          <Button type="submit" variant="neonPink" size="lg" className="w-full mt-2" disabled={submitting}>
            {submitting ? "Enviando..." : "Enviar pelo WhatsApp"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WhatsAppModal;

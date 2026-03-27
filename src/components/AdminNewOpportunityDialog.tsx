import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ADMIN_EVENT_TYPES = [
  "Casamento",
  "Corporativo",
  "Aniversário",
  "Formatura",
  "Bar",
  "Outros",
];

const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: () => void;
}

const AdminNewOpportunityDialog = ({ open, onOpenChange, onCreated }: Props) => {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [tipoEvento, setTipoEvento] = useState("");
  const [outroEvento, setOutroEvento] = useState("");
  const [data, setData] = useState<Date | undefined>();
  const [local, setLocal] = useState("");
  const [publico, setPublico] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const resetForm = () => {
    setNome("");
    setTelefone("");
    setTipoEvento("");
    setOutroEvento("");
    setData(undefined);
    setLocal("");
    setPublico("");
    setShowCalendar(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !tipoEvento || submitting) {
      toast.error("Preencha ao menos o nome do cliente e o tipo de evento.");
      return;
    }

    setSubmitting(true);

    const eventoFinal = tipoEvento === "Outros" ? outroEvento.trim() || "Outros" : tipoEvento;
    const dataISO = data ? format(data, "yyyy-MM-dd") : null;
    const phoneDigits = telefone.replace(/\D/g, "");
    const guestsMatch = publico.replace(/\D/g, "");
    const guestsNum = guestsMatch ? parseInt(guestsMatch, 10) : null;

    const { error } = await supabase.from("opportunities").insert([{
      client_name: nome.trim(),
      phone: phoneDigits || null,
      event_type: eventoFinal,
      event_date: dataISO,
      location: local.trim() || null,
      guests: guestsNum,
      status: "new",
    }]);

    setSubmitting(false);

    if (error) {
      console.error("Insert error:", error);
      toast.error("Erro ao salvar oportunidade.");
      return;
    }

    toast.success("🤘 Oportunidade criada!");
    resetForm();
    onOpenChange(false);
    onCreated();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-bebas text-2xl tracking-wider text-foreground">
            Nova Oportunidade
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Cadastre um lead manualmente no CRM.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {/* Nome */}
          <div className="space-y-1.5">
            <Label htmlFor="admin-nome">Nome do Cliente *</Label>
            <Input
              id="admin-nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: João Silva"
            />
          </div>

          {/* Telefone */}
          <div className="space-y-1.5">
            <Label htmlFor="admin-phone">WhatsApp / Telefone</Label>
            <Input
              id="admin-phone"
              value={telefone}
              onChange={(e) => setTelefone(formatPhone(e.target.value))}
              placeholder="(19) 99999-9999"
            />
          </div>

          {/* Tipo de Evento */}
          <div className="space-y-1.5">
            <Label>Tipo do Evento *</Label>
            <Select value={tipoEvento} onValueChange={(v) => { setTipoEvento(v); if (v !== "Outros") setOutroEvento(""); }}>
              <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
              <SelectContent>
                {ADMIN_EVENT_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {tipoEvento === "Outros" && (
              <Input
                value={outroEvento}
                onChange={(e) => setOutroEvento(e.target.value)}
                placeholder="Especifique o evento"
                className="mt-2"
              />
            )}
          </div>

          {/* Data */}
          <div className="space-y-1.5">
            <Label>Data do Evento</Label>
            <Button
              type="button"
              variant="outline"
              className="w-full justify-start text-left font-normal"
              onClick={() => setShowCalendar(!showCalendar)}
            >
              {data ? format(data, "dd/MM/yyyy", { locale: ptBR }) : "Selecione a data"}
            </Button>
            {showCalendar && (
              <div className="border border-border rounded-md p-2 bg-background">
                <Calendar
                  mode="single"
                  selected={data}
                  onSelect={(d) => { setData(d); setShowCalendar(false); }}
                  locale={ptBR}
                  disabled={(d) => d < new Date()}
                />
              </div>
            )}
          </div>

          {/* Local */}
          <div className="space-y-1.5">
            <Label htmlFor="admin-local">Local e Cidade</Label>
            <Input
              id="admin-local"
              value={local}
              onChange={(e) => setLocal(e.target.value)}
              placeholder="Ex: Espaço XYZ, Campinas - SP"
            />
          </div>

          {/* Público */}
          <div className="space-y-1.5">
            <Label htmlFor="admin-guests">Público Estimado</Label>
            <Input
              id="admin-guests"
              value={publico}
              onChange={(e) => setPublico(e.target.value)}
              placeholder="Ex: 200"
            />
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-neon-pink text-white hover:bg-pink-600 font-oswald uppercase tracking-wider"
          >
            {submitting ? "Salvando..." : "Criar Oportunidade"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminNewOpportunityDialog;

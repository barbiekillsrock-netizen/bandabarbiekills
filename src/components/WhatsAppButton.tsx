import { useState, useEffect, useCallback } from "react";
import { MessageCircle, FileText } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
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

const openWhatsAppQuote = (message: string) => {
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
};

const WhatsAppButton = () => {
  const [visible, setVisible] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [tipoEvento, setTipoEvento] = useState("");
  const [outroEvento, setOutroEvento] = useState("");
  const [data, setData] = useState<Date | undefined>();
  const [local, setLocal] = useState("");
  const [publico, setPublico] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    let mounted = true;
    const show = () => {
      if (mounted) setVisible(true);
    };
    const timer = setTimeout(show, 4000);
    const events = ["scroll", "click", "touchstart"] as const;
    const handler = () => {
      show();
      events.forEach((e) => document.removeEventListener(e, handler));
    };
    events.forEach((e) => document.addEventListener(e, handler, { once: true, passive: true }));
    return () => {
      mounted = false;
      clearTimeout(timer);
      events.forEach((e) => document.removeEventListener(e, handler));
    };
  }, []);

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

  const handleFalarAgora = () => {
    setPopoverOpen(false);
    const msg = encodeURIComponent("Olá, Banda Barbie Kills! Entrei em contato pelo site.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank", "noopener,noreferrer");
  };

  const handleOpenForm = () => {
    setPopoverOpen(false);
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica de PM: se não tem o essencial, nem tenta.
    if (!nome.trim() || !tipoEvento || !data || !local.trim() || submitting) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setSubmitting(true);

    // 1. Tratamento de Dados (Sanitização)
    const eventoFinal = tipoEvento === "Outros" ? outroEvento.trim() || "Outros" : tipoEvento;
    const dataFormatada = format(data, "dd/MM/yyyy", { locale: ptBR });
    const dataISO = format(data, "yyyy-MM-dd"); // Formato que o Postgres AMA

    const phoneDigits = telefone.replace(/\D/g, "");

    // Limpeza do Público: Garante que "200 p" vire 200 (Integer)
    const guestsMatch = publico.replace(/\D/g, "");
    const guestsNum = guestsMatch ? parseInt(guestsMatch, 10) : null;

    const opportunityPayload = {
      client_name: nome.trim(),
      phone: phoneDigits || null,
      event_type: eventoFinal,
      event_date: dataISO,
      location: local.trim(),
      guests: guestsNum,
      status: "new", // Garante o status inicial
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
      // Tenta salvar no banco
      const { error } = await publicSupabase.from("opportunities").insert([opportunityPayload]);

      if (error) {
        // Se der erro no banco, logamos mas NÃO travamos o usuário
        console.error("Erro no Supabase:", error.message);
        toast.warning("Nota: Lead salvo apenas no WhatsApp (Erro de sincronização).");
      } else {
        toast.success("🤘 Orçamento registrado com sucesso!");
      }
    } catch (err) {
      console.error("Erro crítico de rede:", err);
    } finally {
      // INDEPENDENTE de erro no banco, abrimos o WhatsApp.
      // O lead é mais importante que o log!
      setDialogOpen(false);
      resetForm();
      setSubmitting(false);
      openWhatsAppQuote(whatsappMessage);
    }
  };

  if (!visible) return null;

  return (
    <>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <button
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 hover:shadow-[0_0_20px_rgba(37,211,102,0.5)]"
            aria-label="Entre em contato pelo WhatsApp"
          >
            <img src="/icons/whatsapp-white.svg" alt="" width={28} height={28} className="w-7 h-7" />
          </button>
        </PopoverTrigger>
        <PopoverContent side="top" align="end" sideOffset={12} className="w-64 p-3 border-border bg-card">
          <div className="flex flex-col gap-2">
            <button
              onClick={handleFalarAgora}
              className="flex items-center gap-3 w-full rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              <MessageCircle size={18} className="text-[#25D366] shrink-0" />
              Falar Agora
            </button>
            <button
              onClick={handleOpenForm}
              className="flex items-center gap-3 w-full rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              <FileText size={18} className="text-neon-pink shrink-0" />
              Pedir Orçamento
            </button>
          </div>
        </PopoverContent>
      </Popover>

      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) resetForm();
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
            {/* Nome */}
            <div className="space-y-1.5">
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome completo"
                required
                maxLength={100}
              />
            </div>

            {/* Telefone */}
            <div className="space-y-1.5">
              <Label htmlFor="telefone">Seu WhatsApp / Telefone</Label>
              <Input
                id="telefone"
                value={telefone}
                onChange={(e) => setTelefone(formatPhone(e.target.value))}
                placeholder="(00) 00000-0000"
                maxLength={15}
                type="tel"
              />
            </div>

            {/* Tipo de Evento */}
            <div className="space-y-1.5">
              <Label>Tipo de Evento</Label>
              <Select
                value={tipoEvento}
                onValueChange={(v) => {
                  setTipoEvento(v);
                  if (v !== "Outros") setOutroEvento("");
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Casamento">Casamento</SelectItem>
                  <SelectItem value="Corporativo">Corporativo</SelectItem>
                  <SelectItem value="Aniversário">Aniversário</SelectItem>
                  <SelectItem value="Outros">Outros</SelectItem>
                </SelectContent>
              </Select>
              {tipoEvento === "Outros" && (
                <Input
                  value={outroEvento}
                  onChange={(e) => setOutroEvento(e.target.value)}
                  placeholder="Especifique o tipo de evento"
                  className="mt-2"
                  maxLength={100}
                />
              )}
            </div>

            {/* Data */}
            <div className="space-y-1.5">
              <Label>Data do Evento</Label>
              <button
                type="button"
                onClick={() => setShowCalendar(!showCalendar)}
                className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {data ? (
                  format(data, "dd/MM/yyyy", { locale: ptBR })
                ) : (
                  <span className="text-muted-foreground">Selecione a data</span>
                )}
              </button>
              {showCalendar && (
                <div className="rounded-md border border-border bg-card p-1">
                  <Calendar
                    mode="single"
                    selected={data}
                    onSelect={(d) => {
                      setData(d);
                      setShowCalendar(false);
                    }}
                    disabled={(date) => date < new Date()}
                    locale={ptBR}
                    className="pointer-events-auto"
                  />
                </div>
              )}
            </div>

            {/* Local e Cidade */}
            <div className="space-y-1.5">
              <Label htmlFor="local">Local e Cidade</Label>
              <Input
                id="local"
                value={local}
                onChange={(e) => setLocal(e.target.value)}
                placeholder="Ex: Fazenda Vila Rica, Campinas"
                required
                maxLength={200}
              />
            </div>

            {/* Público Estimado */}
            <div className="space-y-1.5">
              <Label htmlFor="publico">Público Estimado</Label>
              <Input
                id="publico"
                value={publico}
                onChange={(e) => setPublico(e.target.value)}
                placeholder="Ex: 200 pessoas"
                maxLength={50}
              />
            </div>

            {/* Submit */}
            <Button type="submit" variant="neonPink" size="lg" className="w-full mt-2" disabled={submitting}>
              {submitting ? "Enviando..." : "Enviar pelo WhatsApp"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WhatsAppButton;

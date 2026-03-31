import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link2, Copy, ExternalLink, Music, Clock, CheckCircle, MessageCircle } from "lucide-react";
import { toast } from "sonner";

const STYLES_LIST = [
  "Axé",
  "Black Music",
  "Eletrônica (Dance / House / Psy)",
  "Flash Back anos 60/70/80",
  "Forró",
  "Funk Brasileiro",
  "Lounge e Ambiente (início da festa)",
  "MPB",
  "Pop Rock Nacional e Internacional",
  "Samba",
  "Pagode",
  "Sertanejo",
];

const LEVEL_LABELS: Record<string, string> = {
  nao_tocar: "Não Tocar",
  pouco: "Pouco",
  normal: "Normal",
  muito: "Muito",
};

type WishlistItem = { music: string; artist: string };

interface DjBriefingTabProps {
  opportunityId: string;
  phone?: string | null;
}

const DjBriefingTab = ({ opportunityId, phone }: DjBriefingTabProps) => {
  const [briefing, setBriefing] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const appUrl = typeof window !== "undefined" ? window.location.origin : "";
  const briefingUrl = `${appUrl}/dj-briefing/${opportunityId}`;

  const fetchBriefing = useCallback(async () => {
    const { data } = await supabase
      .from("music_briefings")
      .select("*")
      .eq("opportunity_id", opportunityId)
      .maybeSingle();
    setBriefing(data);
    setLoading(false);
  }, [opportunityId]);

  useEffect(() => {
    fetchBriefing();
  }, [fetchBriefing]);

  const handleGenerate = async () => {
    const { error } = await supabase
      .from("music_briefings")
      .insert([{ opportunity_id: opportunityId, status: "pending" }]);
    if (error) {
      toast.error("Erro ao gerar o link.");
      return;
    }
    toast.success("Link do DJ gerado!");
    fetchBriefing();
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast.success("Link copiado!");
  };

  const sendWhatsApp = () => {
    if (!phone) return;
    const cleanPhone = phone.replace(/\D/g, "");
    const message = encodeURIComponent(
      `Olá! \n\nPara que a trilha sonora do seu evento fique perfeita, preparamos um formulário rápido para você definir suas preferências musicais para o nosso DJ.\n\nÉ só clicar no link abaixo e preencher:\n${briefingUrl}\n\nQualquer dúvida, estamos à disposição! \nEquipe Barbie Kills`,
    );
    window.open(`https://wa.me/55${cleanPhone}?text=${message}`, "_blank");
  };

  if (loading) return <div className="text-center py-12 text-muted-foreground">Carregando...</div>;

  // ─── STATUS: NÃO ENVIADO ────────────────────────
  if (!briefing) {
    return (
      <div className="glass-card rounded-xl p-8 border border-white/10 bg-black/20 text-center">
        <Music className="text-neon-pink mx-auto mb-4" size={48} />
        <h2 className="font-bebas text-2xl text-white tracking-wider mb-2">Checklist do DJ</h2>
        <p className="text-muted-foreground mb-8 text-base">
          Gere um link para que o contratante preencha as preferências musicais do evento.
        </p>
        <Button
          onClick={handleGenerate}
          className="bg-neon-pink hover:bg-pink-600 text-white font-bebas text-lg tracking-wider uppercase px-10 py-6"
        >
          <Link2 size={20} className="mr-2" /> Gerar Formulário
        </Button>
        <div className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground bg-white/5 border border-white/10 rounded-lg px-4 py-2">
          <Clock size={14} /> Status: <span className="text-yellow-400 font-bold uppercase">Não Enviado</span>
        </div>
      </div>
    );
  }

  // ─── STATUS: PENDENTE ────────────────────────────
  if (briefing.status === "pending") {
    const createdDate = briefing.created_at
      ? new Date(briefing.created_at).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";
    return (
      <div className="glass-card rounded-xl p-8 border border-white/10 bg-black/20 space-y-6">
        <div className="flex items-center gap-3">
          <div className="bg-yellow-500/20 p-2 rounded-lg">
            <Clock className="text-yellow-400" size={24} />
          </div>
          <div>
            <h2 className="font-bebas text-2xl text-white tracking-wider">Aguardando Preenchimento</h2>
            <p className="text-muted-foreground text-sm">Link gerado em {createdDate}</p>
          </div>
        </div>

        <div className="bg-black/40 border border-white/10 rounded-lg p-4 flex items-center gap-3">
          <input
            readOnly
            value={briefingUrl}
            className="flex-1 bg-transparent text-sm text-foreground outline-none font-mono truncate"
          />
          <Button
            size="sm"
            onClick={() => copyToClipboard(briefingUrl)}
            className="bg-white/10 hover:bg-white/20 text-white shrink-0"
          >
            <Copy size={14} className="mr-1" /> Copiar
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={() => copyToClipboard(briefingUrl)}
            className="flex-1 bg-neon-pink hover:bg-pink-600 text-white font-bold uppercase text-sm"
          >
            <Copy size={16} className="mr-2" /> Copiar Link para Noivos
          </Button>
          {phone && (
            <Button
              onClick={sendWhatsApp}
              className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold uppercase text-sm"
            >
              <MessageCircle size={16} className="mr-2" /> Enviar via WhatsApp
            </Button>
          )}
          <Button
            variant="outline"
            onClick={() => window.open(briefingUrl, "_blank")}
            className="border-white/20 text-white hover:bg-white/10 uppercase text-sm"
          >
            <ExternalLink size={16} className="mr-2" /> Visualizar
          </Button>
        </div>

        <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-white/5 border border-white/10 rounded-lg px-4 py-2">
          <Clock size={14} /> Status: <span className="text-yellow-400 font-bold uppercase">Enviado (Pendente)</span>
        </div>
      </div>
    );
  }

  // ─── STATUS: FINALIZADO ──────────────────────────
  const sj = (briefing.styles_json || {}) as Record<string, string>;
  const wl = (briefing.wishlist || []) as WishlistItem[];
  const sm = (briefing.special_moments || []) as WishlistItem[];
  const submittedDate = briefing.submitted_at
    ? new Date(briefing.submitted_at).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-xl p-6 border border-green-500/20 bg-black/20">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-green-500/20 p-2 rounded-lg">
              <CheckCircle className="text-green-400" size={24} />
            </div>
            <div>
              <h2 className="font-bebas text-2xl text-white tracking-wider">Briefing Finalizado</h2>
              <p className="text-muted-foreground text-sm">Recebido em {submittedDate}</p>
            </div>
          </div>
          <Button
            size="sm"
            onClick={() => copyToClipboard(briefingUrl)}
            className="bg-white/10 hover:bg-white/20 text-white uppercase text-xs font-bold"
          >
            <Copy size={14} className="mr-1" /> Copiar Link de Visualização (DJ)
          </Button>
        </div>
      </div>

      {/* Estilos */}
      {Object.keys(sj).length > 0 && (
        <div className="glass-card rounded-xl p-6 border border-white/10 bg-black/20">
          <h3 className="font-bebas text-xl text-neon-pink tracking-wider mb-4">Termômetro de Estilos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {STYLES_LIST.map((s) =>
              sj[s] ? (
                <div key={s} className="flex justify-between bg-white/5 rounded-lg px-4 py-2">
                  <span className="text-white text-sm">{s}</span>
                  <span className="text-muted-foreground text-sm font-bold">{LEVEL_LABELS[sj[s]] || sj[s]}</span>
                </div>
              ) : null,
            )}
          </div>
        </div>
      )}

      {/* Wishlist */}
      {wl.length > 0 && (
        <div className="glass-card rounded-xl p-6 border border-white/10 bg-black/20">
          <h3 className="font-bebas text-xl text-neon-pink tracking-wider mb-4">Para Animar Ainda Mais</h3>
          {wl.map((w, i) => (
            <p key={i} className="text-white text-sm py-1">
              {w.music} — <span className="text-muted-foreground">{w.artist}</span>
            </p>
          ))}
        </div>
      )}

      {/* Special Moments */}
      {sm.length > 0 && (
        <div className="glass-card rounded-xl p-6 border border-white/10 bg-black/20">
          <h3 className="font-bebas text-xl text-neon-pink tracking-wider mb-4">Momentos Especiais</h3>
          {sm.map((w, i) => (
            <p key={i} className="text-white text-sm py-1">
              {w.music} — <span className="text-muted-foreground">{w.artist}</span>
            </p>
          ))}
        </div>
      )}

      {/* Governance */}
      {(briefing.authorized_names || briefing.blacklist || briefing.observations) && (
        <div className="glass-card rounded-xl p-6 border border-white/10 bg-black/20 space-y-4">
          {briefing.authorized_names && (
            <div>
              <Label className="text-xs uppercase font-bold text-muted-foreground tracking-wider">
                Autorizados a Pedir
              </Label>
              <p className="text-white text-base mt-1">{briefing.authorized_names}</p>
            </div>
          )}
          {briefing.blacklist && (
            <div>
              <Label className="text-xs uppercase font-bold text-red-400 tracking-wider">Blacklist</Label>
              <p className="text-white text-base mt-1">{briefing.blacklist}</p>
            </div>
          )}
          {briefing.observations && (
            <div>
              <Label className="text-xs uppercase font-bold text-cyan-400 tracking-wider">Observações</Label>
              <p className="text-white text-base mt-1">{briefing.observations}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DjBriefingTab;

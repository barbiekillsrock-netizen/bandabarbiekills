import { useState, useEffect, useCallback, lazy, Suspense } from "react";

const WHATSAPP_NUMBER = "5519982846842";

// Lazy-load the heavy modal (Dialog, Calendar, date-fns, Select, Supabase)
const WhatsAppModal = lazy(() => import("./WhatsAppModal"));

const WhatsAppButton = () => {
  const [visible, setVisible] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

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

  const handleFalarAgora = () => {
    setPopoverOpen(false);
    const msg = encodeURIComponent("Olá, Banda Barbie Kills! Entrei em contato pelo site.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank", "noopener,noreferrer");
  };

  const handleOpenForm = () => {
    setPopoverOpen(false);
    setDialogOpen(true);
  };

  if (!visible) return null;

  return (
    <>
      {/* Lightweight popover - no heavy deps */}
      <div className="fixed bottom-6 right-6 z-50">
        {popoverOpen && (
          <div className="absolute bottom-16 right-0 w-64 p-3 rounded-lg border border-border bg-card shadow-xl mb-2 animate-fade-in">
            <div className="flex flex-col gap-2">
              <button
                onClick={handleFalarAgora}
                className="flex items-center gap-3 w-full rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
                Falar Agora
              </button>
              <button
                onClick={handleOpenForm}
                className="flex items-center gap-3 w-full rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="hsl(330 100% 50%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>
                Pedir Orçamento
              </button>
            </div>
          </div>
        )}

        <button
          onClick={() => setPopoverOpen(!popoverOpen)}
          className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 hover:shadow-[0_0_20px_rgba(37,211,102,0.5)]"
          aria-label="Entre em contato pelo WhatsApp"
        >
          <img src="/icons/whatsapp-white.svg" alt="" width={28} height={28} className="w-7 h-7" />
        </button>
      </div>

      {/* Heavy modal loaded only when needed */}
      {dialogOpen && (
        <Suspense fallback={null}>
          <WhatsAppModal open={dialogOpen} onOpenChange={setDialogOpen} />
        </Suspense>
      )}
    </>
  );
};

export default WhatsAppButton;

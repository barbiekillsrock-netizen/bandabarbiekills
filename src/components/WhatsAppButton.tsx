import { useState, useEffect } from "react";

const WhatsAppButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let mounted = true;
    const show = () => { if (mounted) setVisible(true); };

    const timer = setTimeout(show, 4000);
    const events = ["scroll", "click", "touchstart"] as const;
    const handler = () => { show(); events.forEach(e => document.removeEventListener(e, handler)); };
    events.forEach(e => document.addEventListener(e, handler, { once: true, passive: true }));

    return () => {
      mounted = false;
      clearTimeout(timer);
      events.forEach(e => document.removeEventListener(e, handler));
    };
  }, []);

  if (!visible) return null;

  return (
    <a
      href="https://wa.me/5519981736659"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 hover:shadow-[0_0_20px_rgba(37,211,102,0.5)]"
      aria-label="Entre em contato pelo WhatsApp"
    >
      <img src="/icons/whatsapp-white.svg" alt="" width={28} height={28} className="w-7 h-7" />
    </a>
  );
};

export default WhatsAppButton;
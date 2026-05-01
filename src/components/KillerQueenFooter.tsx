import { Instagram, Youtube, Mail, Phone } from "lucide-react";
import { Link } from "react-router";

const KillerQueenFooter = () => {
  return (
    <footer className="relative py-20 overflow-hidden bg-black">
      <div className="relative z-10 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-10">
          <div className="flex justify-center lg:justify-start">
            <Link to="/" aria-label="Ir para a página inicial da Banda Barbie Kills">
              <img
                src="/logo-banda-casamento-campinas-barbie-kills-hero-footer.webp"
                alt="Banda Barbie Kills em show para casamentos e eventos"
                width={640}
                height={228}
                className="w-48 md:w-56 lg:w-64 object-contain"
                loading="lazy"
              />
            </Link>
          </div>

          <div className="flex items-center justify-center gap-8">
            <a
              href="https://www.instagram.com/barbiekillsrock/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 group"
              aria-label="Siga a Banda Barbie Kills no Instagram"
            >
              <div className="w-14 h-14 rounded-full border-2 border-neon-pink/50 flex items-center justify-center text-neon-pink group-hover:bg-neon-pink group-hover:text-foreground transition-all duration-300 group-hover:neon-pink-glow">
                <Instagram className="w-7 h-7" />
              </div>
              <span className="font-inter text-sm text-muted-foreground group-hover:text-neon-pink transition-colors">
                Instagram
              </span>
            </a>
            <a
              href="https://www.youtube.com/@barbiekills"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 group"
              aria-label="Assista aos vídeos da Barbie Kills no YouTube"
            >
              <div className="w-14 h-14 rounded-full border-2 border-neon-pink/50 flex items-center justify-center text-neon-pink group-hover:bg-neon-pink group-hover:text-foreground transition-all duration-300 group-hover:neon-pink-glow">
                <Youtube className="w-7 h-7" />
              </div>
              <span className="font-inter text-sm text-muted-foreground group-hover:text-neon-pink transition-colors">
                YouTube
              </span>
            </a>
            <a
              href="https://open.spotify.com/intl-pt/artist/2rBN5mr0RzEBrWQoyQ8tLM?si=m5IZiyc5Sse0Gtcv60csLA"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 group"
              aria-label="Ouça a Banda Barbie Kills no Spotify"
            >
              <div className="w-14 h-14 rounded-full border-2 border-neon-pink/50 flex items-center justify-center text-neon-pink group-hover:bg-neon-pink group-hover:text-foreground transition-all duration-300 group-hover:neon-pink-glow">
                <div
                  className="w-7 h-7 bg-current transition-colors"
                  style={{
                    WebkitMask: "url(/icons/spotify.svg) center/contain no-repeat",
                    mask: "url(/icons/spotify.svg) center/contain no-repeat",
                  }}
                  role="img"
                  aria-label="Ícone do Spotify da Banda Barbie Kills"
                />
              </div>
              <span className="font-inter text-sm text-muted-foreground group-hover:text-neon-pink transition-colors">
                Spotify
              </span>
            </a>
          </div>

          <div className="flex flex-col items-center lg:items-end gap-3 text-muted-foreground">
            <a
              href="mailto:barbiekillsrock@gmail.com"
              className="flex items-center gap-2 hover:text-neon-pink transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span className="font-inter text-sm">barbiekillsrock@gmail.com</span>
            </a>

            <a
              href="https://api.whatsapp.com/send/?phone=5519982846842&text&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-neon-pink transition-colors"
              aria-label="Fale com a Banda Barbie Kills pelo WhatsApp"
            >
              <Phone className="w-4 h-4" />
              <span className="font-inter text-sm">(19) 98284-6842</span>
              <img
                src="/icons/whatsapp.svg"
                alt="Ícone do WhatsApp para contato com a banda"
                width={18}
                height={18}
                className="w-[18px] h-[18px] ml-1"
                loading="lazy"
                style={{
                  filter: "invert(56%) sepia(81%) saturate(438%) hue-rotate(93deg) brightness(95%) contrast(92%)",
                }}
              />
            </a>
          </div>
        </div>

        <div className="text-center mt-12 pt-8 border-t border-white/5">
          <p className="font-inter text-sm text-muted-foreground">© 2026 Barbie Kills. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default KillerQueenFooter;

import { Button } from "@/components/ui/button";
import { Instagram, Youtube, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router";
import { cidadesData } from "@/data/cidadesData";

const Footer = () => {
  return (
    <footer className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-neon-pink/20 via-black to-black" />

      <div className="relative z-10 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="heading-display text-5xl md:text-6xl lg:text-7xl text-foreground mb-6">
            PRONTO PARA <span className="neon-pink-text">ELEVAR O NÍVEL</span> <br />
            DO SEU EVENTO?
          </h2>
          <p className="subtitle text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Entre em contato e faça seu orçamento agora mesmo
          </p>
          <Button variant="hero" size="xl" className="animate-glow-pulse" asChild>
            <a href="https://wa.me/5519981736659" target="_blank" rel="noopener noreferrer">
              Contrate Já
            </a>
          </Button>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-neon-pink/50 to-transparent mb-12" />

        <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-8">
          <div className="flex justify-center lg:justify-start">
            <img
              src="/barbie-kills-banda-eventos-casamentos.webp"
              alt="Banda Barbie Kills em show para casamentos e eventos"
              width={200}
              height={80}
              className="w-48 md:w-56 lg:w-64 object-contain"
              loading="lazy"
            />
          </div>

          <div className="flex items-center justify-center gap-8">
            <a
              href="https://www.instagram.com/barbiekillsrock/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 group"
              aria-label="Siga a Barbie Kills no Instagram"
            >
              <div className="w-16 h-16 rounded-full border-2 border-neon-pink/50 flex items-center justify-center text-neon-pink group-hover:bg-neon-pink group-hover:text-foreground transition-all duration-300 group-hover:neon-pink-glow">
                <Instagram className="w-8 h-8" />
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
              <div className="w-16 h-16 rounded-full border-2 border-neon-pink/50 flex items-center justify-center text-neon-pink group-hover:bg-neon-pink group-hover:text-foreground transition-all duration-300 group-hover:neon-pink-glow">
                <Youtube className="w-8 h-8" />
              </div>
              <span className="font-inter text-sm text-muted-foreground group-hover:text-neon-pink transition-colors">
                YouTube
              </span>
            </a>
            <a
              href="https://www.facebook.com/barbiekillsrock"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 group"
              aria-label="Curta a Barbie Kills no Facebook"
            >
              <div className="w-16 h-16 rounded-full border-2 border-neon-pink/50 flex items-center justify-center text-neon-pink group-hover:bg-neon-pink group-hover:text-foreground transition-all duration-300 group-hover:neon-pink-glow">
                <Facebook className="w-8 h-8" />
              </div>
              <span className="font-inter text-sm text-muted-foreground group-hover:text-neon-pink transition-colors">
                Facebook
              </span>
            </a>
            <a
              href="https://open.spotify.com/intl-pt/artist/2rBN5mr0RzEBrWQoyQ8tLM?si=m5IZiyc5Sse0Gtcv60csLA"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 group"
              aria-label="Ouça a Barbie Kills no Spotify"
            >
              <div className="w-16 h-16 rounded-full border-2 border-neon-pink/50 flex items-center justify-center text-neon-pink group-hover:bg-neon-pink group-hover:text-foreground transition-all duration-300 group-hover:neon-pink-glow">
                <div
                  className="w-8 h-8 bg-current transition-colors"
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

            <div className="flex items-center gap-3">
              <a href="tel:+5519981736659" className="flex items-center gap-2 hover:text-neon-pink transition-colors">
                <Phone className="w-4 h-4" />
                <span className="font-inter text-sm">(19) 98173-6659</span>
              </a>
              <a
                href="https://wa.me/5519981736659"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:scale-110 transition-transform ml-1"
                aria-label="Entre em contato pelo WhatsApp"
              >
                <img
                  src="/icons/whatsapp.svg"
                  alt="Ícone do WhatsApp para contato com a banda"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                  loading="lazy"
                  style={{
                    filter: "invert(56%) sepia(81%) saturate(438%) hue-rotate(93deg) brightness(95%) contrast(92%)",
                  }}
                />
              </a>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <a
            href="https://maps.app.goo.gl/R8dSjpVorD3Su4xP7"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-muted-foreground hover:text-neon-pink transition-colors group"
          >
            <MapPin className="w-5 h-5 flex-shrink-0" />
            <div className="font-inter text-sm flex flex-col items-center text-center">
              <p>R. Ferreira Penteado, 1221, Centro, Campinas</p>
              <p className="text-xs opacity-80 mt-1">Atendimento mediante agendamento</p>
            </div>
          </a>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="text-xs text-muted-foreground/90 uppercase tracking-widest mb-4">Áreas Atendidas</p>
          <div className="text-[11px] text-muted-foreground/80 max-w-4xl mx-auto flex flex-wrap justify-center gap-x-4 gap-y-2">
            {cidadesData.map((c, i, arr) => (
              <span key={c.slug}>
                <Link to={`/cidade/${c.slug}`} className="hover:text-neon-pink transition-colors duration-300">
                  {c.cidade}
                </Link>
                {i < arr.length - 1 ? " •" : ""}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 max-w-4xl mx-auto text-center">
          <p className="font-inter text-sm text-muted-foreground leading-relaxed">
            A <strong>Barbie Kills</strong> é a banda premium referência para casamentos de luxo e eventos corporativos
            em <strong>Campinas</strong> e em todo o estado de <strong>São Paulo</strong>. Com um repertório sofisticado
            e infraestrutura completa, entregamos entretenimento musical de alta energia para quem não abre mão de
            qualidade e elegância em seu grande dia.
          </p>
        </div>

        <div className="text-center mt-12 pt-8 border-t border-white/5">
          <p className="font-inter text-sm text-muted-foreground">© 2026 Barbie Kills. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

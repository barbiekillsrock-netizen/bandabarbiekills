import { Button } from "@/components/ui/button";
import { Instagram, Youtube, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router";
import { cidadesData } from "@/data/cidadesData";

const Footer = () => {
  return (
    <footer className="relative py-24 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-neon-pink/20 via-black to-black" />

      <div className="relative z-10 container mx-auto px-6">
        {/* CTA Section */}
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

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-neon-pink/50 to-transparent mb-12" />

        {/* Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-12">
          {/* Logo */}
          <div className="flex justify-center lg:justify-start">
            <img
              src="/logo-barbie-kills.webp"
              alt="Banda Barbie Kills - Banda Premium para Casamentos e Eventos Corporativos em SP"
              width={200}
              height={80}
              className="w-48 md:w-56 lg:w-64 object-contain"
              loading="lazy"
            />
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-8">
            <a
              href="https://instagram.com/barbiekillsrock"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-14 h-14 rounded-full border border-neon-pink/30 flex items-center justify-center text-neon-pink group-hover:bg-neon-pink group-hover:text-foreground transition-all duration-300">
                <Instagram className="w-6 h-6" />
              </div>
              <span className="font-inter text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-neon-pink transition-colors">
                Instagram
              </span>
            </a>
            <a
              href="https://www.youtube.com/@barbiekills"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-14 h-14 rounded-full border border-neon-pink/30 flex items-center justify-center text-neon-pink group-hover:bg-neon-pink group-hover:text-foreground transition-all duration-300">
                <Youtube className="w-6 h-6" />
              </div>
              <span className="font-inter text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-neon-pink transition-colors">
                YouTube
              </span>
            </a>
            <a
              href="https://www.facebook.com/barbiekillsrock"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-14 h-14 rounded-full border border-neon-pink/30 flex items-center justify-center text-neon-pink group-hover:bg-neon-pink group-hover:text-foreground transition-all duration-300">
                <Facebook className="w-6 h-6" />
              </div>
              <span className="font-inter text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-neon-pink transition-colors">
                Facebook
              </span>
            </a>
          </div>

          {/* Contact Info - Clean Grouping */}
          <div className="flex flex-col items-center lg:items-end gap-3 text-muted-foreground">
            <a
              href="mailto:barbiekillsrock@gmail.com"
              className="flex items-center gap-2 hover:text-neon-pink transition-colors group"
            >
              <Mail className="w-4 h-4 text-neon-pink/70" />
              <span className="font-inter text-sm">barbiekillsrock@gmail.com</span>
            </a>
            <div className="flex items-center gap-4">
              <a
                href="tel:+5519981736659"
                className="flex items-center gap-2 hover:text-neon-pink transition-colors group"
              >
                <Phone className="w-4 h-4 text-neon-pink/70" />
                <span className="font-inter text-sm">(19) 98173-6659</span>
              </a>
              <a
                href="https://wa.me/5519981736659"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#25D366] hover:scale-110 transition-transform"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Office Address - Compact Pilled */}
        <div className="flex justify-center mt-12">
          <div className="inline-flex items-center gap-3 text-muted-foreground bg-white/5 px-6 py-3 rounded-full border border-white/10">
            <MapPin className="w-4 h-4 text-neon-pink flex-shrink-0" />
            <div className="font-inter text-sm flex flex-col md:flex-row md:gap-3 items-center">
              <p>R. Ferreira Penteado, 1221, Centro — Campinas</p>
              <span className="hidden md:inline opacity-30">|</span>
              <p className="text-xs opacity-70 italic">Atendimento com agendamento</p>
            </div>
          </div>
        </div>

        {/* SEO Local - Areas */}
        <div className="mt-16 pt-8 border-t border-white/5 text-center">
          <p className="text-[10px] text-muted-foreground/60 uppercase tracking-[0.2em] mb-6">Áreas Atendidas</p>
          <div className="text-[11px] text-muted-foreground/70 max-w-4xl mx-auto flex flex-wrap justify-center gap-x-4 gap-y-2">
            {cidadesData.map((c, i, arr) => (
              <span key={c.slug}>
                <Link to={`/cidade/${c.slug}`} className="hover:text-neon-pink transition-colors">
                  {c.cidade}
                </Link>
                {i < arr.length - 1 ? <span className="ml-4 opacity-20">•</span> : ""}
              </span>
            ))}
          </div>
        </div>

        {/* Bio */}
        <div className="mt-12 max-w-3xl mx-auto text-center">
          <p className="font-inter text-sm text-muted-foreground/80 leading-relaxed">
            A <strong>Barbie Kills</strong> é referência em casamentos de luxo e eventos corporativos em{" "}
            <strong>Campinas</strong> e <strong>São Paulo</strong>. Entretenimento musical de alta energia com
            elegância.
          </p>
        </div>

        {/* Copyright */}
        <div className="text-center mt-12 pt-8 border-t border-white/5">
          <p className="font-inter text-[11px] text-muted-foreground/50">
            © 2026 Barbie Kills. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

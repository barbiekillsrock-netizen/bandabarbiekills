import { Button } from '@/components/ui/button';
import { Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
const Footer = () => {
  return <footer className="relative py-24 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-neon-pink/20 via-black to-black" />

      <div className="relative z-10 container mx-auto px-6">
        {/* CTA Section */}
        <div className="text-center mb-16">
          <h2 className="heading-display text-5xl md:text-6xl lg:text-7xl text-foreground mb-6">PRONTO PARA <span className="neon-pink-text">ELEVAR O NÍVEL</span><br />DO SEU EVENTO?</h2>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-8">
          {/* Logo */}
          <div className="flex justify-center lg:justify-start">
            <img src="/logo-barbie-kills.png" alt="Logo da banda Barbie Kills" width={200} height={80} className="h-16 lg:h-20" loading="lazy" />
          </div>

          {/* Social Links - Centered */}
          <div className="flex items-center justify-center gap-8">
            <a href="https://instagram.com/barbiekillsrock" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
              <div className="w-16 h-16 rounded-full border-2 border-neon-pink/50 flex items-center justify-center text-neon-pink group-hover:bg-neon-pink group-hover:text-foreground transition-all duration-300 group-hover:neon-pink-glow">
                <Instagram className="w-8 h-8" />
              </div>
              <span className="font-inter text-sm text-muted-foreground group-hover:text-neon-pink transition-colors">Instagram</span>
            </a>
            <a href="https://www.youtube.com/c/barbiekillsrock/?sub_confirmation=1" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
              <div className="w-16 h-16 rounded-full border-2 border-neon-pink/50 flex items-center justify-center text-neon-pink group-hover:bg-neon-pink group-hover:text-foreground transition-all duration-300 group-hover:neon-pink-glow">
                <Youtube className="w-8 h-8" />
              </div>
              <span className="font-inter text-sm text-muted-foreground group-hover:text-neon-pink transition-colors">YouTube</span>
            </a>
            <a href="https://open.spotify.com/intl-pt/artist/2rBN5mr0RzEBrWQoyQ8tLM?si=DLoRIhT-SymreqjRdOsBRQ" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
              <div className="w-16 h-16 rounded-full border-2 border-neon-pink/50 flex items-center justify-center text-neon-pink group-hover:bg-neon-pink group-hover:text-foreground transition-all duration-300 group-hover:neon-pink-glow">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 fill-current">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
              </div>
              <span className="font-inter text-sm text-muted-foreground group-hover:text-neon-pink transition-colors">Spotify</span>
            </a>
          </div>

          {/* Contact Info - Stacked */}
          <div className="flex flex-col items-center lg:items-end gap-2 text-muted-foreground">
            <a href="mailto:barbiekillsrock@gmail.com" className="flex items-center gap-2 hover:text-neon-pink transition-colors">
              <Mail className="w-4 h-4" />
              <span className="font-inter text-sm">barbiekillsrock@gmail.com</span>
            </a>
            <div className="flex items-center gap-2">
              <a href="tel:+5519981736659" className="flex items-center gap-2 hover:text-neon-pink transition-colors">
                <Phone className="w-4 h-4" />
                <span className="font-inter text-sm">(19) 98173-6659</span>
              </a>
              <a href="https://wa.me/5519981736659" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" aria-label="WhatsApp">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#25D366" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Office Address */}
        <div className="flex justify-center mt-8">
          <div className="flex items-start gap-2 text-muted-foreground text-center">
            <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
            <div className="font-inter text-sm">
              <p>R. Ferreira Penteado, 1221</p>
              <p>Centro, Campinas</p>
              <p className="text-xs mt-1 opacity-75">Atendimento mediante agendamento</p>
            </div>
          </div>
        </div>

        {/* SEO Local - Áreas Atendidas */}
        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">Áreas Atendidas</p>
          <div className="text-[10px] text-muted-foreground/60 max-w-3xl mx-auto flex flex-wrap justify-center gap-x-4 gap-y-2">
            <span>São Paulo</span>
            <span>•</span>
            <span>Campinas</span>
            <span>•</span>
            <span>Alphaville</span>
            <span>•</span>
            <span>Barueri</span>
            <span>•</span>
            <span>Holambra</span>
            <span>•</span>
            <span>Itu</span>
            <span>•</span>
            <span>Jundiaí</span>
            <span>•</span>
            <span>Indaiatuba</span>
            <span>•</span>
            <span>Vinhedo</span>
            <span>•</span>
            <span>Valinhos</span>
            <span>•</span>
            <span>Sorocaba</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-12 pt-8 border-t border-white/5">
          <p className="font-inter text-sm text-muted-foreground">
            © {new Date().getFullYear()} Barbie Kills. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;

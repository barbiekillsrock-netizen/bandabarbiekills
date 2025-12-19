import { Button } from '@/components/ui/button';
import { Instagram, Youtube, Facebook, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative py-24 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-neon-pink/20 via-black to-black" />

      <div className="relative z-10 container mx-auto px-6">
        {/* CTA Section */}
        <div className="text-center mb-16">
          <h2 className="heading-display text-5xl md:text-6xl lg:text-7xl text-foreground mb-6">
            PRONTO PARA <span className="neon-pink-text">ELEVAR</span>
            <br />
            SEU EVENTO?
          </h2>
          <p className="subtitle text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Entre em contato e faça seu orçamento agora mesmo
          </p>
          <Button variant="hero" size="xl" className="animate-glow-pulse">
            Contrate Já
          </Button>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-neon-pink/50 to-transparent mb-12" />

        {/* Footer Content */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <img
            src="/banda-barbie-kills-casamento-rock.png"
            alt="Barbie Kills"
            className="h-12 logo-glow"
          />

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com/barbiekillsoficial"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-neon-pink/50 flex items-center justify-center text-neon-pink hover:bg-neon-pink hover:text-foreground transition-all duration-300 hover:neon-pink-glow"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://youtube.com/@barbiekillsoficial"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-neon-pink/50 flex items-center justify-center text-neon-pink hover:bg-neon-pink hover:text-foreground transition-all duration-300 hover:neon-pink-glow"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a
              href="https://facebook.com/barbiekillsoficial"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-neon-pink/50 flex items-center justify-center text-neon-pink hover:bg-neon-pink hover:text-foreground transition-all duration-300 hover:neon-pink-glow"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-muted-foreground">
            <a href="mailto:contato@barbiekills.com.br" className="flex items-center gap-2 hover:text-neon-pink transition-colors">
              <Mail className="w-4 h-4" />
              <span className="font-inter text-sm">contato@barbiekills.com.br</span>
            </a>
            <a href="tel:+5519999999999" className="flex items-center gap-2 hover:text-neon-pink transition-colors">
              <Phone className="w-4 h-4" />
              <span className="font-inter text-sm">(19) 99999-9999</span>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-12 pt-8 border-t border-white/5">
          <p className="font-inter text-sm text-muted-foreground">
            © {new Date().getFullYear()} Barbie Kills. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

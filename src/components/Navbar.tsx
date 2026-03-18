import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, Instagram, Youtube } from "lucide-react";

const SpotifyIcon = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={`fill-current ${className}`}
  >
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
);

const socialLinks = [
  { href: "https://instagram.com/barbiekillsrock", icon: Instagram, label: "Instagram da Barbie Kills" },
  {
    href: "https://www.youtube.com/c/barbiekillsrock/?sub_confirmation=1",
    icon: Youtube,
    label: "YouTube da Barbie Kills",
  },
  {
    href: "https://open.spotify.com/intl-pt/artist/2rBN5mr0RzEBrWQoyQ8tLM?si=DLoRIhT-SymreqjRdOsBRQ",
    icon: null,
    label: "Spotify da Barbie Kills",
  },
];

const navLinks = [
  { href: "#historia", label: "História da Banda" },
  { href: "#diferencial", label: "Diferenciais" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#midia", label: "Vídeos e Mídia" },
  { href: "/blog", label: "Blog", isRoute: true },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);
  const toggleMobileMenu = useCallback(() => setIsMobileMenuOpen(prev => !prev), []);

  const handleAnchorClick = (href: string) => {
    if (!isHomePage && href.startsWith("#")) {
      window.location.href = "/" + href;
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-black backdrop-blur-lg border-b border-white/10" : "bg-black"
      }`}
      aria-label="Navegação principal"
    >
      <div className="w-full px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex-shrink-0 flex items-center transition-transform duration-300 hover:scale-105"
            aria-label="Barbie Kills - Página Inicial"
          >
            <img
              src="/logo-barbie-kills.webp"
              alt="Barbie Kills"
              width={160}
              height={56}
              className="h-10 md:h-14 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) =>
              link.isRoute ? (
                <Link
                  key={link.href}
                  to={link.href}
                  className="font-oswald text-sm uppercase tracking-widest text-foreground/80 hover:text-neon-pink transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={isHomePage ? link.href : "/" + link.href}
                  onClick={() => handleAnchorClick(link.href)}
                  className="font-oswald text-sm uppercase tracking-widest text-foreground/80 hover:text-neon-pink transition-colors duration-300"
                >
                  {link.label}
                </a>
              ),
            )}
            <div className="w-px h-5 bg-white/20" />
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/60 hover:text-neon-pink transition-colors duration-300"
                  aria-label={social.label}
                >
                  {social.icon ? <social.icon size={18} /> : <SpotifyIcon size={18} />}
                </a>
              ))}
            </div>
            <div className="w-px h-5 bg-white/20" />
            <a
              href="https://wa.me/5519981736659"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-9 px-4 rounded-md border border-neon-pink text-neon-pink bg-transparent font-oswald text-sm font-medium uppercase tracking-wider hover:bg-neon-pink hover:text-white transition-colors duration-200 !shadow-none !ring-0 !animate-none"
            >
              Contrate
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-foreground p-2"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu - Conditional rendering instead of CSS hidden */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-white/10 pt-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) =>
                link.isRoute ? (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="font-oswald text-sm uppercase tracking-widest text-foreground/80 hover:text-neon-pink transition-colors duration-300"
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={isHomePage ? link.href : "/" + link.href}
                    className="font-oswald text-sm uppercase tracking-widest text-foreground/80 hover:text-neon-pink transition-colors duration-300"
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </a>
                ),
              )}
              <div className="flex items-center gap-5 py-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/60 hover:text-neon-pink transition-colors duration-300"
                    aria-label={social.label}
                  >
                    {social.icon ? <social.icon size={20} /> : <SpotifyIcon size={20} />}
                  </a>
                ))}
              </div>
              <a
                href="https://wa.me/5519981736659"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-fit h-9 px-4 rounded-md border border-neon-pink text-neon-pink bg-transparent font-oswald text-sm font-medium uppercase tracking-wider hover:bg-neon-pink hover:text-white transition-colors duration-200 !shadow-none !ring-0 !animate-none"
              >
                Contrate
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#historia', label: 'História' },
    { href: '#diferencial', label: 'Diferencial' },
    { href: '#depoimentos', label: 'Depoimentos' },
    { href: '#midia', label: 'Mídia' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-black backdrop-blur-lg border-b border-white/10'
          : 'bg-black'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center transition-transform duration-300 hover:scale-105">
            <img
              src="/logo-barbie-kills.png"
              alt="Barbie Kills"
              className="h-12 md:h-14"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-oswald text-sm uppercase tracking-widest text-foreground/80 hover:text-neon-pink transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            <Button variant="nav" size="sm" asChild>
              <a href="https://wa.me/5519981736659" target="_blank" rel="noopener noreferrer">
                Orçamento
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-oswald text-sm uppercase tracking-widest text-foreground/80 hover:text-neon-pink transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button variant="nav" size="sm" className="w-fit" asChild>
                <a href="https://wa.me/5519981736659" target="_blank" rel="noopener noreferrer">
                  Orçamento
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

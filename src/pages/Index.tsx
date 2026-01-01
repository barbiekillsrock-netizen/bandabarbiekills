import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import HistorySection from '@/components/HistorySection';
import ManifestoSection from '@/components/ManifestoSection';
import ElevateSection from '@/components/ElevateSection';
import WhoHiresSection from '@/components/WhoHiresSection';
import UniqueShowSection from '@/components/UniqueShowSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import MediaSection from '@/components/MediaSection';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const structuredData = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  "name": "Barbie Kills",
  "url": "https://www.bandabarbiekills.com.br",
  "description": "Banda premium especializada em Casamentos e Eventos Corporativos. Repertório selecionado de Pop, Rock, Soul e clássicos da Música Brasileira para uma experiência sofisticada.",
  "image": "https://www.bandabarbiekills.com.br/banda-barbie-kills-casamento-rock.png",
  "location": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Campinas",
      "addressRegion": "SP",
      "addressCountry": "BR"
    }
  },
  "areaServed": ["São Paulo", "Campinas", "Barueri", "Alphaville", "Jundiaí", "Indaiatuba", "Sorocaba", "Piracicaba", "Guarulhos", "Holambra", "Itu", "Americana", "Valinhos", "Vinhedo", "Atibaia", "Bragança Paulista", "Limeira"],
  "genre": ["Pop", "Rock", "Soul", "Brazilian Music"],
  "sameAs": [
    "https://www.instagram.com/barbiekillsoficial"
  ]
};

const Index = () => {
  useEffect(() => {
    // Inject JSON-LD structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <HistorySection />
      <ManifestoSection />
      <ElevateSection />
      <WhoHiresSection />
      <UniqueShowSection />
      <TestimonialsSection />
      <MediaSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default Index;

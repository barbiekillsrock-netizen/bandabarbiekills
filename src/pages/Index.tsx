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
  "@graph": [
    {
      "@type": "MusicGroup",
      "@id": "https://www.bandabarbiekills.com.br/#band",
      "name": "Barbie Kills",
      "url": "https://www.bandabarbiekills.com.br",
      "description": "Banda premium especializada em Casamentos e Eventos Corporativos com repertório de Pop, Rock, Soul e Música Brasileira.",
      "genre": ["Pop", "Rock", "Soul", "Brazilian Music"],
      "foundingDate": "2012",
      "location": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Campinas",
          "addressRegion": "SP",
          "addressCountry": "BR"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5",
        "reviewCount": "58"
      },
      "sameAs": [
        "https://www.instagram.com/barbiekillsrock",
        "https://www.youtube.com/@barbiekillsrock"
      ]
    },
    {
      "@type": "Service",
      "serviceType": "Entretenimento Musical para Eventos",
      "provider": { "@id": "https://www.bandabarbiekills.com.br/#band" },
      "description": "Show musical ao vivo para casamentos e eventos corporativos. Repertório sofisticado sem sertanejo.",
      "areaServed": [
        "São Paulo", "Campinas", "Barueri", "Alphaville", "Jundiaí", 
        "Indaiatuba", "Sorocaba", "Piracicaba", "Guarulhos", "Holambra", 
        "Itu", "Americana", "Valinhos", "Vinhedo", "Atibaia", 
        "Bragança Paulista", "Limeira"
      ]
    }
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

import { Helmet } from 'react-helmet-async';
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
  return (
    <>
      <Helmet>
        <title>Banda Barbie Kills | Música ao Vivo para Casamentos e Eventos SP</title>
        <meta name="description" content="Barbie Kills: Experiência musical premium para eventos. O melhor do Pop, Rock, Soul e Música Brasileira com sofisticação. Atendimento em SP, Campinas e região." />
        <meta name="keywords" content="banda para casamento sp, banda de rock para casamento, música ao vivo evento corporativo, banda festa empresa, banda casamento campinas, banda para festa particular, barbie kills, banda de pop soul brasil" />
        <link rel="canonical" href="https://www.bandabarbiekills.com.br" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Banda Barbie Kills | Música ao Vivo para Casamentos e Eventos SP" />
        <meta property="og:description" content="Barbie Kills: Experiência musical premium para eventos. O melhor do Pop, Rock, Soul e Música Brasileira com sofisticação." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.bandabarbiekills.com.br" />
        <meta property="og:image" content="https://www.bandabarbiekills.com.br/banda-barbie-kills-casamento-rock.png" />
        <meta property="og:locale" content="pt_BR" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Banda Barbie Kills | Música ao Vivo para Casamentos e Eventos SP" />
        <meta name="twitter:description" content="Experiência musical premium para eventos. Pop, Rock, Soul e Música Brasileira com sofisticação." />
        <meta name="twitter:image" content="https://www.bandabarbiekills.com.br/banda-barbie-kills-casamento-rock.png" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
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
    </>
  );
};

export default Index;

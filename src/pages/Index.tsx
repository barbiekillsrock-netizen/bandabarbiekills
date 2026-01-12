import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import HistorySection from '@/components/HistorySection';
import ServicesSection from '@/components/ServicesSection';
import ManifestoSection from '@/components/ManifestoSection';
import ElevateSection from '@/components/ElevateSection';
import WhoHiresSection from '@/components/WhoHiresSection';
import UniqueShowSection from '@/components/UniqueShowSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import MediaSection from '@/components/MediaSection';
import BlogPreview from '@/components/BlogPreview';
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
        "reviewCount": "29"
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
    },
    {
      "@type": "Review",
      "itemReviewed": {
        "@type": "MusicGroup",
        "name": "Barbie Kills"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Marcos Mion"
      },
      "reviewBody": "A melhor banda de todas! Energia surreal."
    }
  ]
};

const Index = () => {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Helmet>
        <title>Barbie Kills - Banda Premium para Casamentos e Eventos Corporativos</title>
        <meta 
          name="description" 
          content="Barbie Kills: Banda Premium para Casamentos e Corporativos em SP e Campinas. Show de alta energia com Pop, Rock, Soul, Indie, Jazz e Música Brasileira." 
        />
        <link rel="canonical" href="https://www.bandabarbiekills.com.br" />
        <meta property="og:title" content="Barbie Kills - Banda Premium para Casamentos e Eventos Corporativos" />
        <meta property="og:description" content="Barbie Kills: Banda Premium para Casamentos e Corporativos em SP e Campinas. Show de alta energia com Pop, Rock, Soul, Indie, Jazz e Música Brasileira." />
        <meta property="og:url" content="https://www.bandabarbiekills.com.br" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.bandabarbiekills.com.br/banda-barbie-kills-casamento-rock.png" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <Navbar />
      <HeroSection />
      <HistorySection />
      <ServicesSection />
      <ManifestoSection />
      <ElevateSection />
      <WhoHiresSection />
      <UniqueShowSection />
      <TestimonialsSection />
      <MediaSection />
      <BlogPreview />
      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default Index;

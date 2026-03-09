import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';

// Lazy load below-the-fold sections to reduce TBT
const HistorySection = lazy(() => import('@/components/HistorySection'));
const ServicesSection = lazy(() => import('@/components/ServicesSection'));
const ManifestoSection = lazy(() => import('@/components/ManifestoSection'));
const ElevateSection = lazy(() => import('@/components/ElevateSection'));
const WhoHiresSection = lazy(() => import('@/components/WhoHiresSection'));
const UniqueShowSection = lazy(() => import('@/components/UniqueShowSection'));
const TestimonialsSection = lazy(() => import('@/components/TestimonialsSection'));
const MediaSection = lazy(() => import('@/components/MediaSection'));
const BlogPreview = lazy(() => import('@/components/BlogPreview'));
const Footer = lazy(() => import('@/components/Footer'));
const WhatsAppButton = lazy(() => import('@/components/WhatsAppButton'));

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
        <title>Barbie Kills - Banda Premium para Casamentos e Eventos Corporativos - Campinas e SP</title>
        <meta 
          name="description" 
          content="A trilha sonora que agita seu evento. Com repertório eclético e personalizado, levamos energia única para casamentos e corporativos em Campinas e todo o interior. Assista aos vídeos e peça seu orçamento." 
        />
        <link rel="canonical" href="https://www.bandabarbiekills.com.br" />
        <meta property="og:title" content="Barbie Kills - Banda Premium para Casamentos e Eventos Corporativos - Campinas e SP" />
        <meta property="og:description" content="A trilha sonora que agita seu evento. Com repertório eclético e personalizado, levamos energia única para casamentos e corporativos em Campinas e todo o interior. Assista aos vídeos e peça seu orçamento." />
        <meta property="og:url" content="https://www.bandabarbiekills.com.br" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.bandabarbiekills.com.br/banda-barbie-kills-casamento-rock.png" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <Navbar />
      <HeroSection />
      <Suspense fallback={null}>
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
      </Suspense>
    </main>
  );
};

export default Index;
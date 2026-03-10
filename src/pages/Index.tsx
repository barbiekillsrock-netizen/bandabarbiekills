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

const SITE_URL = 'https://www.bandabarbiekills.com.br';

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MusicGroup",
      "@id": `${SITE_URL}/#band`,
      "name": "Barbie Kills",
      "url": SITE_URL,
      "description": "Banda premium especializada em casamentos de luxo e eventos corporativos premium em Campinas, São Paulo e Interior de SP.",
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
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#business`,
      "name": "Barbie Kills",
      "description": "Banda especializada em casamentos de luxo e eventos corporativos premium.",
      "url": SITE_URL,
      "image": `${SITE_URL}/banda-barbie-kills-casamento-rock.png`,
      "telephone": "+5519981736659",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Campinas",
        "addressRegion": "SP",
        "addressCountry": "BR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "-22.9068",
        "longitude": "-47.0615"
      },
      "areaServed": [
        { "@type": "City", "name": "Campinas" },
        { "@type": "City", "name": "São Paulo" },
        { "@type": "City", "name": "Valinhos" },
        { "@type": "City", "name": "Vinhedo" },
        { "@type": "City", "name": "Indaiatuba" },
        { "@type": "City", "name": "Jundiaí" },
        { "@type": "City", "name": "Sorocaba" },
        { "@type": "City", "name": "Piracicaba" },
        { "@type": "City", "name": "Barueri" },
        { "@type": "City", "name": "Alphaville" },
        { "@type": "City", "name": "Guarulhos" },
        { "@type": "City", "name": "Holambra" },
        { "@type": "City", "name": "Itu" },
        { "@type": "City", "name": "Americana" },
        { "@type": "City", "name": "Atibaia" },
        { "@type": "City", "name": "Bragança Paulista" },
        { "@type": "City", "name": "Limeira" },
        { "@type": "State", "name": "Interior de SP" }
      ],
      "priceRange": "$$$$",
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
      "provider": { "@id": `${SITE_URL}/#band` },
      "description": "Show musical ao vivo para casamentos e eventos corporativos em Campinas, Valinhos, Indaiatuba e todo Interior de SP. Repertório sofisticado sem sertanejo.",
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

const META = {
  title: 'Banda Barbie Kills | Casamentos e Eventos Corporativos em Campinas e SP',
  description: 'A trilha sonora premium para seu evento. Repertório personalizado e energia única para casamentos e corporativos em Campinas, SP e interior.',
  keywords: 'banda para casamento campinas, banda casamento sp, banda evento corporativo campinas, banda casamento valinhos, banda casamento indaiatuba, banda pop rock casamento, música ao vivo casamento interior sp, barbie kills',
  url: SITE_URL,
  image: `${SITE_URL}/banda-barbie-kills-casamento-rock.png`,
};

const Index = () => {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Helmet>
        <title>{META.title}</title>
        <meta name="description" content={META.description} />
        <meta name="keywords" content={META.keywords} />
        <link rel="canonical" href={META.url} />

        <meta property="og:title" content={META.title} />
        <meta property="og:description" content={META.description} />
        <meta property="og:url" content={META.url} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={META.image} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={META.title} />
        <meta name="twitter:description" content={META.description} />
        <meta name="twitter:image" content={META.image} />

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

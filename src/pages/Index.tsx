import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HistorySection from "@/components/HistorySection";
import ServicesSection from "@/components/ServicesSection";
import ManifestoSection from "@/components/ManifestoSection";
import ElevateSection from "@/components/ElevateSection";
import WhoHiresSection from "@/components/WhoHiresSection";
// IMPORTANTE: Importação direta do botão para carregamento instantâneo
import WhatsAppButton from "@/components/WhatsAppButton";

// Componentes pesados (abaixo da dobra) continuam com lazy loading
const UniqueShowSection = lazy(() => import("@/components/UniqueShowSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const MediaSection = lazy(() => import("@/components/MediaSection"));
const BlogPreview = lazy(() => import("@/components/BlogPreview"));
const Footer = lazy(() => import("@/components/Footer"));

const LazySkeleton = () => <div className="min-h-[200px] bg-background" />;

const SITE_URL = "https://www.bandabarbiekills.com.br";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MusicGroup",
      "@id": `${SITE_URL}/#band`,
      name: "Barbie Kills",
      url: SITE_URL,
      logo: `${SITE_URL}/barbie-kills-banda-eventos-casamentos.webp`,
      image: `${SITE_URL}/banda-casamentos-eventos-campinas-barbie-kills.webp`,
      description:
        "Banda premium especializada em casamentos de luxo e eventos corporativos premium em Campinas, São Paulo e Interior de SP.",
      genre: ["Pop", "Rock", "Soul", "Brazilian Music"],
      foundingDate: "2012",
      sameAs: ["https://www.instagram.com/barbiekillsrock/", "https://www.youtube.com/@barbiekills"],
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#business`,
      name: "Barbie Kills - Banda para Eventos",
      url: SITE_URL,
      logo: `${SITE_URL}/barbie-kills-banda-eventos-casamentos.webp`,
      image: `${SITE_URL}/banda-casamentos-eventos-campinas-barbie-kills.webp`,
      telephone: "+5519982846842",
      priceRange: "$$$$",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Campinas",
        addressRegion: "SP",
        addressCountry: "BR",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5",
        bestRating: "5",
        worstRating: "1",
        reviewCount: "29",
      },
    },
  ],
};

const homepageVideos = [
  {
    "@type": "VideoObject",
    name: "Barbie Kills ao Vivo — Show Completo",
    thumbnailUrl: "https://img.youtube.com/vi/rAVb_-U7OAU/maxresdefault.jpg",
    uploadDate: "2024-06-15",
    contentUrl: "https://www.youtube.com/watch?v=rAVb_-U7OAU",
    embedUrl: "https://www.youtube.com/embed/rAVb_-U7OAU",
  },
];

const Index = () => {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Helmet>
        <title>Banda Barbie Kills | Casamentos e Eventos Premium</title>
        <meta
          name="description"
          content="Banda premium para casamentos e eventos corporativos em Campinas e SP. Infraestrutura completa e repertório personalizado de Rock, Pop e Soul."
        />
        <link rel="canonical" href="https://www.bandabarbiekills.com.br" />

        {/* Schema.org injetado de forma segura para o Google ler sem erros */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              ...structuredData,
              "@graph": [...structuredData["@graph"], ...homepageVideos],
            }),
          }}
        />
      </Helmet>

      <Navbar />
      <HeroSection />
      <HistorySection />
      <ServicesSection />
      <ManifestoSection />
      <ElevateSection />
      <WhoHiresSection />

      <Suspense fallback={<LazySkeleton />}>
        <UniqueShowSection />
        <TestimonialsSection />
        <MediaSection />
        <BlogPreview />
        <Footer />
      </Suspense>

      {/* WhatsAppButton FORA do Suspense para garantir conversão no milissegundo zero */}
      <WhatsAppButton />
    </main>
  );
};

export default Index;

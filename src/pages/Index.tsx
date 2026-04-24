import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

// IMPORTANTE:  Importação direta do botão para carregamento instantâneo
import WhatsAppButton from "@/components/WhatsAppButton";

//  Tudo  abaicvho da dobra é lazy-loaded para reduzir o bundle crítico
const HistorySection = lazy(() => import("@/components/HistorySection"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const ManifestoSection = lazy(() => import("@/components/ManifestoSection"));
const ElevateSection = lazy(() => import("@/components/ElevateSection"));
const WhoHiresSection = lazy(() => import("@/components/WhoHiresSection"));
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
      genre: ["Pop", "Soul", "Groove", "MPB", "Rock", "Brazilian Music"],
      foundingDate: "2012",
      sameAs: ["https://www.instagram.com/barbiekillsrock/", "https://www.youtube.com/@barbiekills"],
      member: [
        {
          "@type": "OrganizationRole",
          member: {
            "@type": "Person",
            name: "Mariana",
            // Se tiver o Instagram dela, adicione aqui: sameAs: ["URL"]
          },
          roleName: ["Lead Vocalist", "Vocalista Principal"],
        },
      ],
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
        streetAddress: "R. Ferreira Penteado, 1221", // Reincluído conforme validação anterior
        addressLocality: "Campinas",
        addressRegion: "SP",
        postalCode: "13010-041", // Reincluído conforme validação anterior
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
          content="Banda para casamentos e eventos corporativos em Campinas e SP. Infraestrutura completa e repertório personalizado de Pop, Rock e Música Brasileira."
        />
        <link rel="canonical" href="https://www.bandabarbiekills.com.br" />

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

      <Suspense fallback={<LazySkeleton />}>
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
      </Suspense>

      <WhatsAppButton />
    </main>
  );
};

export default Index;

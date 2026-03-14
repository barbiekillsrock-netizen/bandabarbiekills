import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HistorySection from "@/components/HistorySection";
import ServicesSection from "@/components/ServicesSection";
import ManifestoSection from "@/components/ManifestoSection";
import ElevateSection from "@/components/ElevateSection";
import WhoHiresSection from "@/components/WhoHiresSection";
import UniqueShowSection from "@/components/UniqueShowSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import MediaSection from "@/components/MediaSection";
import BlogPreview from "@/components/BlogPreview";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const SITE_URL = "https://www.bandabarbiekills.com.br";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MusicGroup",
      "@id": `${SITE_URL}/#band`,
      name: "Barbie Kills",
      url: SITE_URL,
      description:
        "Banda premium especializada em casamentos de luxo e eventos corporativos premium em Campinas, São Paulo e Interior de SP.",
      genre: ["Pop", "Rock", "Soul", "Brazilian Music"],
      foundingDate: "2012",
      sameAs: [
        "https://www.instagram.com/barbiekillsrock",
        "https://www.facebook.com/barbiekillsrock",
        "https://www.youtube.com/c/barbiekillsrock/?sub_confirmation=1",
      ],
      location: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Campinas",
          addressRegion: "SP",
          addressCountry: "BR",
        },
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#business`,
      name: "Barbie Kills",
      description: "Banda especializada em casamentos de luxo e eventos corporativos premium.",
      url: SITE_URL,
      image: `${SITE_URL}/banda-barbie-kills-casamento-rock.png`,
      telephone: "+5519981736659",
      email: "barbiekillsrock@gmail.com",
      openingHours: "Mo-Fr 09:00-18:00",
      address: {
        "@type": "PostalAddress",
        streetAddress: "R. Ferreira Penteado, 1221",
        postalCode: "13010-041",
        addressLocality: "Campinas",
        addressRegion: "SP",
        addressCountry: "BR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "-22.9068",
        longitude: "-47.0615",
      },
      areaServed: [
        { "@type": "City", name: "São Paulo" },
        { "@type": "City", name: "Campinas" },
        { "@type": "City", name: "Alphaville" },
        { "@type": "City", name: "Barueri" },
        { "@type": "City", name: "Holambra" },
        { "@type": "City", name: "Itu" },
        { "@type": "City", name: "Jundiaí" },
        { "@type": "City", name: "Indaiatuba" },
        { "@type": "City", name: "Vinhedo" },
        { "@type": "City", name: "Valinhos" },
        { "@type": "City", name: "Sorocaba" },
        { "@type": "City", name: "Paulínia" },
        { "@type": "City", name: "Piracicaba" },
        { "@type": "City", name: "Americana" },
        { "@type": "City", name: "Louveira" },
        { "@type": "City", name: "Jaguariúna" },
        { "@type": "City", name: "Atibaia" },
        { "@type": "City", name: "Bragança Paulista" },
        { "@type": "City", name: "São Caetano do Sul" },
        { "@type": "City", name: "Limeira" },
        { "@type": "City", name: "Santana de Parnaíba" },
        { "@type": "City", name: "Guarulhos" },
        { "@type": "State", name: "Interior de SP" },
      ],
      priceRange: "$$$$",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5",
        reviewCount: "29",
      },
      sameAs: ["https://www.instagram.com/barbiekillsrock", "https://www.youtube.com/@barbiekillsrock"],
    },
    {
      "@type": "Service",
      serviceType: "Entretenimento Musical para Eventos",
      provider: { "@id": `${SITE_URL}/#band` },
      description:
        "Show musical ao vivo para casamentos e eventos corporativos em Campinas, Valinhos, Indaiatuba e todo Interior de SP. Repertório sofisticado sem sertanejo.",
      areaServed: [
        "São Paulo",
        "Campinas",
        "Alphaville",
        "Barueri",
        "Holambra",
        "Itu",
        "Jundiaí",
        "Indaiatuba",
        "Vinhedo",
        "Valinhos",
        "Sorocaba",
        "Paulínia",
        "Piracicaba",
        "Americana",
        "Louveira",
        "Jaguariúna",
        "Atibaia",
        "Bragança Paulista",
        "São Caetano do Sul",
        "Limeira",
        "Santana de Parnaíba",
        "Guarulhos",
      ],
    },
    {
      "@type": "Review",
      itemReviewed: {
        "@type": "MusicGroup",
        name: "Barbie Kills",
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      author: {
        "@type": "Person",
        name: "Marcos Mion",
      },
      reviewBody: "A melhor banda de todas! Energia surreal.",
    },
  ],
};

const homepageVideos = [
  {
    "@type": "VideoObject",
    name: "Barbie Kills ao Vivo — Show Completo de Banda para Casamento e Eventos",
    description:
      "Assista ao show completo da Barbie Kills ao vivo. Banda premium para casamentos e eventos corporativos em Campinas e SP.",
    thumbnailUrl: "https://img.youtube.com/vi/rAVb_-U7OAU/maxresdefault.jpg",
    uploadDate: "2024-06-15T09:00:00-03:00",
    contentUrl: "https://www.youtube.com/watch?v=rAVb_-U7OAU",
    embedUrl: "https://www.youtube.com/embed/rAVb_-U7OAU",
  },
  {
    "@type": "VideoObject",
    name: "Barbie Kills em Casamento — Banda ao Vivo em Campinas",
    description:
      "Performance da Barbie Kills em casamento de luxo. Energia, repertório pop rock e interação com os convidados.",
    thumbnailUrl: "https://img.youtube.com/vi/s0BHAN9Edew/maxresdefault.jpg",
    uploadDate: "2024-08-20T09:00:00-03:00",
    contentUrl: "https://www.youtube.com/watch?v=s0BHAN9Edew",
    embedUrl: "https://www.youtube.com/embed/s0BHAN9Edew",
  },
  {
    "@type": "VideoObject",
    name: "Barbie Kills em Evento Corporativo — Banda para Festas Empresariais",
    description:
      "Show da Barbie Kills em evento corporativo. Entretenimento musical premium para confraternizações e convenções.",
    thumbnailUrl: "https://img.youtube.com/vi/RLIIDCt0MlA/maxresdefault.jpg",
    uploadDate: "2024-10-05T09:00:00-03:00",
    contentUrl: "https://www.youtube.com/watch?v=RLIIDCt0MlA",
    embedUrl: "https://www.youtube.com/embed/RLIIDCt0MlA",
  },
];

const META = {
  title: "Banda Barbie Kills | Banda para Casamentos e Eventos Premium",
  description:
    "Banda premium para casamentos e eventos corporativos em Campinas e SP. Infraestrutura completa e repertório personalizado.",
  keywords:
    "banda para casamento campinas, banda casamento sp, banda evento corporativo campinas, banda casamento valinhos, banda casamento indaiatuba, banda pop rock casamento, música ao vivo casamento interior sp, barbie kills",
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

        {/* ADICIONE ESTA LINHA: É o RG da sua página inicial */}
        <link rel="canonical" key="canonical" href="https://www.bandabarbiekills.com.br" />

        {/* AJUSTE ESTA LINHA: Use o link direto em vez da variável */}
        <link rel="alternate" key="alternate" hrefLang="pt-BR" href="https://www.bandabarbiekills.com.br" />

        <meta property="og:title" content={META.title} />
        <meta property="og:description" content={META.description} />

        {/* AJUSTE ESTA LINHA TAMBÉM */}
        <meta property="og:url" content="https://www.bandabarbiekills.com.br" />

        <meta property="og:type" content="website" />
        <meta property="og:image" content={META.image} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={META.title} />
        <meta name="twitter:description" content={META.description} />
        <meta name="twitter:image" content={META.image} />

        <script type="application/ld+json">
          {JSON.stringify({ ...structuredData, "@graph": [...structuredData["@graph"], ...homepageVideos] })}
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

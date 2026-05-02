import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhatsAppButton from "@/components/WhatsAppButton";
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

const SITE_URL = "https://www.bandabarbiekills.com.br";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MusicGroup",
      "@id": `${SITE_URL}/#band`,
      name: "Banda Barbie Kills",
      url: SITE_URL,
      logo: `${SITE_URL}/barbie-kills-banda-eventos-casamentos.webp`,
      image: `${SITE_URL}/banda-casamentos-eventos-campinas-barbie-kills.webp`,
      description:
        "Banda premium especializada em casamentos de luxo e eventos corporativos premium em Campinas, São Paulo e Interior de SP.",
      genre: ["Pop", "Soul", "Groove", "MPB", "Rock", "Brazilian Music"],
      foundingDate: "2012",
      sameAs: [
        "https://www.instagram.com/barbiekillsrock/",
        "https://www.youtube.com/@barbiekills",
        "https://www.facebook.com/barbiekillsrock",
        "https://open.spotify.com/intl-pt/artist/2rBN5mr0RzEBrWQoyQ8tLM",
      ],
      member: [
        {
          "@type": "OrganizationRole",
          member: {
            "@type": "Person",
            name: "Mariana",
          },
          roleName: ["Lead Vocalist", "Vocalista Principal"],
        },
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#business`,
      name: "Banda Barbie Kills",
      url: SITE_URL,
      logo: `${SITE_URL}/barbie-kills-banda-eventos-casamentos.webp`,
      image: `${SITE_URL}/banda-casamentos-eventos-campinas-barbie-kills.webp`,
      telephone: "+5519982846842",
      priceRange: "$$$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "R. Ferreira Penteado, 1221",
        addressLocality: "Campinas",
        addressRegion: "SP",
        postalCode: "13010-041",
        addressCountry: "BR",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        bestRating: "5",
        worstRating: "1",
        reviewCount: "30",
        url: "https://maps.app.goo.gl/R8dSjpVorD3Su4xP7",
      },
    },
  ],
};

const homepageVideos = [
  {
    "@type": "VideoObject",
    "@id": `${SITE_URL}/#video1`,
    name: "Barbie Kills ao Vivo — Show Completo",
    description: "Show completo da Banda Barbie Kills ao vivo em evento premium.",
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
        <title>Banda Barbie Kills: Casamentos e Eventos em Campinas SP</title>
        <meta
          name="description"
          content="Banda premium para casamentos e eventos corporativos em Campinas e interior de SP. 14 anos de estrada, show de alta energia com Rock, MPB e Pop. Solicite orçamento!"
        />
        <link rel="canonical" key="canonical" href="https://www.bandabarbiekills.com.br" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.bandabarbiekills.com.br" />
        <meta property="og:site_name" content="Banda Barbie Kills" />
        <meta property="og:title" content="Banda Barbie Kills: Casamentos e Eventos em Campinas SP" />
        <meta
          property="og:description"
          content="Banda premium para casamentos e eventos corporativos em Campinas e interior de SP. 14 anos de estrada, show de alta energia com Rock, MPB e Pop. Solicite orçamento!"
        />
        <meta
          property="og:image"
          content="https://www.bandabarbiekills.com.br/banda-casamentos-eventos-campinas-barbie-kills.webp"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Show da Banda Barbie Kills ao vivo — Casamentos e Eventos em Campinas e SP"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
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

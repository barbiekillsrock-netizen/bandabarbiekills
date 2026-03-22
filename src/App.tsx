import { lazy, Suspense, useEffect } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import Index from "./pages/Index";
import ScrollToTop from "./components/ScrollToTop";

// Definição global para o TypeScript não reclamar do Google Analytics
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

// Componente para monitorar a mudança de rotas
const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag === "function") {
      window.gtag("config", "G-FQYT8C0DFG", {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
};

const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const NotFound = lazy(() => import("./pages/NotFound"));
const XR18Manual = lazy(() => import("./pages/XR18Manual"));
const PressKit = lazy(() => import("./pages/PressKit"));
const Rider = lazy(() => import("./pages/Rider"));
const Corporativo = lazy(() => import("./pages/Corporativo"));
const CidadeLanding = lazy(() => import("./pages/CidadeLanding"));

const App = () => (
  <TooltipProvider>
    <BrowserRouter>
      {/* O Tracker deve ficar dentro do BrowserRouter para acessar a localização */}
      <AnalyticsTracker />
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/XR18" element={<XR18Manual />} />
          <Route path="/press-kit" element={<PressKit />} />
          <Route path="/rider" element={<Rider />} />
          <Route path="/corporativo" element={<Corporativo />} />
          <Route path="/cidade/:slug" element={<CidadeLanding />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;

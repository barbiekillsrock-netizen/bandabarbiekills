import { lazy, Suspense } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from "sonner";
import ScrollToTop from "./components/ScrollToTop";
import AdminRoute from "./components/AdminRoute";

// FIX 1: Transformamos a Index em lazy.
// Isso reduz o "Main Bundle" significativamente, atacando o problema de JS não usado.
const Index = lazy(() => import("./pages/Index"));

const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const NotFound = lazy(() => import("./pages/NotFound"));
const XR18Manual = lazy(() => import("./pages/XR18Manual"));
const PressKit = lazy(() => import("./pages/PressKit"));
const Rider = lazy(() => import("./pages/Rider"));
const Corporativo = lazy(() => import("./pages/Corporativo"));
const CidadeLanding = lazy(() => import("./pages/CidadeLanding"));
const DjBriefing = lazy(() => import("./pages/DjBriefing"));

const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminOpportunityDetail = lazy(() => import("./pages/AdminOpportunityDetail"));
const AdminSettings = lazy(() => import("./pages/AdminSettings"));

const App = () => (
  <TooltipProvider>
    <BrowserRouter>
      {/* O Toaster é leve, pode permanecer aqui para feedback global */}
      <Toaster position="top-right" richColors theme="dark" />

      {/* FIX 2: O Suspense agora engloba também a Index. 
        Enquanto a Home carrega, o navegador mostra um fundo preto limpo, 
        evitando "Layout Shift" e melhorando a percepção de velocidade.
      */}
      <Suspense fallback={<div className="min-h-screen bg-black" />}>
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
          <Route path="/dj-briefing/:id" element={<DjBriefing />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/opportunity/:id"
            element={
              <AdminRoute>
                <AdminOpportunityDetail />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <AdminRoute>
                <AdminSettings />
              </AdminRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;

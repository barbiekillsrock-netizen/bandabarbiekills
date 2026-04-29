import { lazy, Suspense } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from "sonner";
import ScrollToTop from "./components/ScrollToTop";
import AdminRoute from "./components/AdminRoute";

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
const KillerQueen = lazy(() => import("./pages/KillerQueen"));
const Proposta = lazy(() => import("./pages/Proposta"));
const ShowPage = lazy(() => import("./pages/ShowPage"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminOpportunityDetail = lazy(() => import("./pages/AdminOpportunityDetail"));
const AdminSettings = lazy(() => import("./pages/AdminSettings"));
const AdminShows = lazy(() => import("./pages/AdminShows"));
const AdminShowDetail = lazy(() => import("./pages/AdminShowDetail"));
const AdminPalco = lazy(() => import("./pages/AdminPalco"));

const App = () => (
  <TooltipProvider>
    <BrowserRouter>
      <Toaster position="top-right" richColors theme="dark" />
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen bg-black" />}>
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
          <Route path="/killer-queen" element={<KillerQueen />} />
          <Route path="/proposta/:id" element={<Proposta />} />
          <Route path="/show" element={<ShowPage />} />
          <Route
            path="/admin/shows"
            element={
              <AdminRoute>
                <AdminShows />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/shows/:showId"
            element={
              <AdminRoute>
                <AdminShowDetail />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/palco/:showId"
            element={
              <AdminRoute>
                <AdminPalco />
              </AdminRoute>
            }
          />
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

import { lazy, Suspense } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from "sonner";
import Index from "./pages/Index";
import ScrollToTop from "./components/ScrollToTop";
import AdminRoute from "./components/AdminRoute";

const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const NotFound = lazy(() => import("./pages/NotFound"));
const XR18Manual = lazy(() => import("./pages/XR18Manual"));
const PressKit = lazy(() => import("./pages/PressKit"));
const Rider = lazy(() => import("./pages/Rider"));
const Corporativo = lazy(() => import("./pages/Corporativo"));
const CidadeLanding = lazy(() => import("./pages/CidadeLanding"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminOpportunityDetail = lazy(() => import("./pages/AdminOpportunityDetail"));
const AdminSettings = lazy(() => import("./pages/AdminSettings"));

const App = () => (
  <TooltipProvider>
    <BrowserRouter>
      <Toaster position="top-right" richColors theme="dark" />
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
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/opportunity/:id" element={<AdminRoute><AdminOpportunityDetail /></AdminRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;

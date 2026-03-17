import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { HelmetProvider, HelmetServerState } from "react-helmet-async";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import PressKit from "./pages/PressKit";
import Rider from "./pages/Rider";
import Corporativo from "./pages/Corporativo";
import CidadeLanding from "./pages/CidadeLanding";

interface HelmetContext {
  helmet?: HelmetServerState;
}

export function render(url: string) {
  const helmetContext: HelmetContext = {};

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <TooltipProvider>
        <StaticRouter location={url}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/press-kit" element={<PressKit />} />
            <Route path="/rider" element={<Rider />} />
            <Route path="/corporativo" element={<Corporativo />} />
            <Route path="/cidade/:slug" element={<CidadeLanding />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </StaticRouter>
      </TooltipProvider>
    </HelmetProvider>
  );

  const { helmet } = helmetContext;

  return {
    html,
    head: helmet
      ? `${helmet.title.toString()}
         ${helmet.meta.toString()}
         ${helmet.link.toString()}
         ${helmet.script.toString()}`
      : "",
  };
}

import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

const container = document.getElementById("root")!;

// Check if the app was pre-rendered (SSR/prerender)
// A comment node (<!--ssr-outlet-->) doesn't count as real SSR content
const hasSSRContent = container.childElementCount > 0;

if (hasSSRContent) {
  hydrateRoot(
    container,
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
} else {
  createRoot(container).render(
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
}

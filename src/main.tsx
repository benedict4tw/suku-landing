import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import i18n from "./i18n";
import App from "./App.tsx";

// Reveal animations only arm once JS is running; without JS everything stays visible.
document.documentElement.classList.remove("no-js");

const container = document.getElementById("root")!;
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// The HTML is prerendered per route and language (the edge picks EN or DE for "/").
// Hydrate when it matches what this visitor resolves to; otherwise render fresh.
const { prerendered, lang } = container.dataset;
if (prerendered === window.location.pathname && lang === (i18n.resolvedLanguage === "de" ? "de" : "en")) hydrateRoot(container, app);
else createRoot(container).render(app);

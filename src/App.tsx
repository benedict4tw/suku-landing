import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { useTranslation } from "react-i18next";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { Landing } from "./pages/Landing";
import { Legal, NotFound, ToApp } from "./pages/Legal";

function DocumentLang() {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    const lng = i18n.resolvedLanguage === "de" ? "de" : "en";
    document.documentElement.lang = lng;
    if (window.location.pathname === "/") document.title = t("meta.title");
    document.querySelector('meta[name="description"]')?.setAttribute("content", t("meta.description"));
  }, [i18n.resolvedLanguage, t]);
  return null;
}

export default function App() {
  const { t } = useTranslation();
  return (
    <BrowserRouter>
      <DocumentLang />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-nav focus:rounded-md focus:bg-paper focus:px-4 focus:py-2 focus:text-paper-on"
      >
        {t("skip")}
      </a>
      <Nav />
      <main id="main">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/impressum" element={<Legal kind="impressum" />} />
          <Route path="/datenschutz" element={<Legal kind="privacy" />} />
          <Route path="/demo" element={<ToApp />} />
          <Route path="/access" element={<ToApp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <Analytics />
    </BrowserRouter>
  );
}

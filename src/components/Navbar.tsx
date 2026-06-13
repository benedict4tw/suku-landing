import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DemoLoginButton } from "./DemoLoginButton";

export function Navbar() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const currentLang = i18n.language.startsWith("de") ? "de" : "en";

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(8, 8, 8, 0.92)" : "rgba(8, 8, 8, 0.6)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: scrolled
          ? "1px solid rgba(5,227,194,0.12)"
          : "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo + wordmark */}
        <a href="#" className="flex items-center gap-2.5 group">
          <img src="/SUKU-Logov1.png" style={{ width: 30, height: 30, objectFit: "contain" }} alt="Suku" />
          <span className="text-white font-bold text-xl tracking-tight" style={{ fontFamily: "Inter, sans-serif" }}>
            Suku
          </span>
        </a>

        {/* Right: lang toggle + CTA */}
        <div className="flex items-center gap-3">
          {/* EN / DE pill toggle */}
          <div
            style={{
              display: "flex", alignItems: "center",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 100, padding: 3, gap: 2,
            }}
          >
            {(["en", "de"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => { i18n.changeLanguage(lang); localStorage.setItem("suku_lang", lang); }}
                style={{
                  padding: "3px 10px", borderRadius: 100, fontSize: 12, fontWeight: 600,
                  border: "none", cursor: "pointer", transition: "all 0.15s",
                  background: currentLang === lang ? "#05e3c2" : "transparent",
                  color: currentLang === lang ? "#080808" : "rgba(255,255,255,0.4)",
                }}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          <DemoLoginButton
            label={t("nav.tryDemo")}
            className="px-5 py-2 rounded-full text-sm font-semibold border-none"
            style={{ background: "#05e3c2", color: "#080808" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#00ccad"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#05e3c2"; }}
          />
        </div>
      </div>
    </nav>
  );
}

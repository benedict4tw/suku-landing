import { useEffect, useState } from "react";

const DEMO_URL = "/demo";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(8, 8, 8, 0.92)"
          : "rgba(8, 8, 8, 0.6)",
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
          <span
            className="text-white font-bold text-xl tracking-tight"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Suku
          </span>
        </a>

        {/* Right */}
        <a
          href={DEMO_URL}
          className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200"
          style={{
            background: "#05e3c2",
            color: "#080808",
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.background = "#00ccad";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.background = "#05e3c2";
          }}
        >
          Try Demo
        </a>
      </div>
    </nav>
  );
}

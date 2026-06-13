import { useEffect, useState } from "react";
import { SukuLogo } from "./SukuLogo";

const DEMO_URL = "https://suku-teal.vercel.app?demo=true";

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
          ? "rgba(4, 4, 74, 0.85)"
          : "rgba(4, 4, 74, 0.5)",
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
          <SukuLogo size={30} />
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
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200"
          style={{
            background: "#05e3c2",
            color: "#04044A",
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

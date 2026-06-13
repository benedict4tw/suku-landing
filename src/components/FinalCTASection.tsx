import { useReveal } from "../hooks/useReveal";
import { ParticleCanvas } from "./ParticleCanvas";

const DEMO_URL = "https://suku-teal.vercel.app?demo=true";

export function FinalCTASection() {
  const ref = useReveal(0.2) as React.RefObject<HTMLDivElement>;

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      <ParticleCanvas />

      {/* Orbs */}
      <div className="absolute pointer-events-none" style={{ width: 600, height: 600, borderRadius: "50%", bottom: -200, right: -150, background: "radial-gradient(circle, rgba(0,98,255,0.12) 0%, transparent 70%)", filter: "blur(80px)" }} />
      <div className="absolute pointer-events-none" style={{ width: 500, height: 500, borderRadius: "50%", top: -100, left: -100, background: "radial-gradient(circle, rgba(5,227,194,0.1) 0%, transparent 70%)", filter: "blur(80px)" }} />

      <div ref={ref} className="reveal relative z-10 flex flex-col items-center text-center px-6 max-w-3xl mx-auto">
        <h2
          className="font-black tracking-tight text-white mb-6"
          style={{ fontSize: "clamp(44px, 7vw, 96px)", lineHeight: 1.05 }}
        >
          Ready to run your life?
        </h2>

        <p className="text-lg mb-12" style={{ color: "rgba(255,255,255,0.45)" }}>
          Try the demo. No account needed.
        </p>

        <a
          href={DEMO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="px-10 py-5 rounded-full font-bold text-lg transition-all duration-200"
          style={{
            background: "#05e3c2",
            color: "#04044A",
            boxShadow: "0 0 40px rgba(5,227,194,0.4), 0 0 80px rgba(5,227,194,0.15)",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#00ccad"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 60px rgba(5,227,194,0.6), 0 0 100px rgba(5,227,194,0.2)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#05e3c2"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(5,227,194,0.4), 0 0 80px rgba(5,227,194,0.15)"; }}
        >
          Try Demo →
        </a>

        <p className="text-sm mt-8" style={{ color: "rgba(255,255,255,0.18)" }}>
          trysuku.live
        </p>
      </div>
    </section>
  );
}

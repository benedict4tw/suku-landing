import { useState } from "react";
import { VideoModal } from "./VideoModal";
import { DemoLoginButton } from "./DemoLoginButton";


export function HeroSection() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ paddingTop: 64 }}
    >

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <div
          className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full mb-10 text-sm font-medium"
          style={{
            border: "1px solid rgba(5,227,194,0.35)",
            background: "rgba(5,227,194,0.07)",
            color: "#05e3c2",
            boxShadow: "0 0 20px rgba(5,227,194,0.12)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#05e3c2", boxShadow: "0 0 6px #05e3c2" }}
          />
          Personal AI Life OS
        </div>

        {/* Headlines */}
        <h1 className="font-black leading-none tracking-tight mb-6" style={{ fontSize: "clamp(52px, 8vw, 110px)" }}>
          <span className="hero-line-1 block text-white">Everything you are.</span>
          <span className="hero-line-2 block text-white">Everything you do.</span>
          <span
            className="hero-line-3 block text-gradient"
          >
            One place.
          </span>
        </h1>

        {/* Subtext */}
        <p
          className="hero-sub text-lg md:text-xl mb-10 max-w-2xl leading-relaxed"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          Suku is your personal AI assistant that manages your tasks, projects, habits, workouts,
          and calendar, thinking ahead so you don't have to.
        </p>

        {/* CTAs */}
        <div className="hero-cta flex flex-col sm:flex-row gap-4 items-center mb-8">
          <DemoLoginButton
            label="Try Demo →"
            className="px-8 py-4 rounded-full font-semibold text-base border-none glow-pulse"
            style={{ background: "#05e3c2", color: "#080808" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#00ccad"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#05e3c2"; }}
          />
          <button
            onClick={() => setShowModal(true)}
            className="px-8 py-4 rounded-full font-semibold text-base transition-all duration-200"
            style={{
              border: "1.5px solid rgba(5,227,194,0.45)",
              color: "#05e3c2",
              background: "rgba(5,227,194,0.05)",
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.background = "rgba(5,227,194,0.12)")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.background = "rgba(5,227,194,0.05)")}
          >
            Watch Video
          </button>
        </div>

        <p className="hero-cta text-sm" style={{ color: "rgba(255,255,255,0.25)" }}>
          Built for one person. Perfectly.
        </p>
      </div>

      {/* Scroll arrow */}
      <div
        className="bounce absolute text-2xl"
        style={{ bottom: 32, left: "50%", color: "rgba(5,227,194,0.5)" }}
      >
        ↓
      </div>

      {showModal && <VideoModal onClose={() => setShowModal(false)} />}
    </section>
  );
}

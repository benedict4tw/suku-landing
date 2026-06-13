import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useReveal } from "../hooks/useReveal";
import { VideoModal } from "./VideoModal";
import { DemoLoginButton } from "./DemoLoginButton";

export function DemoSection() {
  const { t } = useTranslation();
  const titleRef = useReveal(0.2) as React.RefObject<HTMLDivElement>;
  const videoRef = useReveal(0.2) as React.RefObject<HTMLDivElement>;
  const [showModal, setShowModal] = useState(false);

  return (
    <section
      className="py-28 px-6 relative overflow-hidden"
      style={{
        background: "rgba(5,5,5,0.95)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(5,227,194,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(5,227,194,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div ref={titleRef} className="reveal text-center mb-14">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "#05e3c2" }}>
            {t("demoSection.eyebrow")}
          </p>
          <h2 className="font-black tracking-tight text-white" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
            {t("demoSection.title")}
          </h2>
        </div>

        {/* Embedded video */}
        <div
          ref={videoRef}
          className="reveal"
          style={{
            borderRadius: 20,
            overflow: "hidden",
            border: "1px solid rgba(5,227,194,0.2)",
            boxShadow: "0 0 60px rgba(5,227,194,0.1), 0 24px 64px rgba(0,0,0,0.7)",
            background: "#000",
          }}
        >
          {/* Browser chrome */}
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{ background: "rgba(10,10,10,0.95)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
              <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
            ))}
            <div
              className="flex-1 mx-4 h-6 rounded-full flex items-center px-3"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>suku.app</span>
            </div>
          </div>

          {/* Video — click to expand */}
          <div className="relative cursor-pointer group" onClick={() => setShowModal(true)}>
            <video
              src="/SUKU_VID_FIN_EN.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full block"
              style={{ maxHeight: 480, objectFit: "cover" }}
            />
            {/* Hover overlay */}
            <div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ background: "rgba(0,0,0,0.45)" }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(5,227,194,0.2)",
                  border: "2px solid rgba(5,227,194,0.6)",
                  boxShadow: "0 0 30px rgba(5,227,194,0.3)",
                }}
              >
                <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
                  <path d="M8 5L23 14L8 23V5Z" fill="#05e3c2" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <DemoLoginButton
            label={t("demoSection.cta")}
            className="px-8 py-4 rounded-full font-semibold text-base border-none"
            style={{
              border: "1.5px solid rgba(5,227,194,0.4)",
              color: "#05e3c2",
              background: "rgba(5,227,194,0.05)",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(5,227,194,0.12)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(5,227,194,0.05)"; }}
          />
        </div>
      </div>

      {showModal && <VideoModal onClose={() => setShowModal(false)} />}
    </section>
  );
}

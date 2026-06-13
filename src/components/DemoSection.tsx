import { useState } from "react";
import { useReveal } from "../hooks/useReveal";
import { VideoModal } from "./VideoModal";

const DEMO_URL = "https://suku-teal.vercel.app?demo=true";

export function DemoSection() {
  const titleRef = useReveal(0.2) as React.RefObject<HTMLDivElement>;
  const videoRef = useReveal(0.2) as React.RefObject<HTMLDivElement>;
  const [showModal, setShowModal] = useState(false);

  return (
    <section
      className="py-28 px-6 relative overflow-hidden"
      style={{
        background: "rgba(4,4,40,0.8)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Subtle grid bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(5,227,194,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(5,227,194,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div ref={titleRef} className="reveal text-center mb-14">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "#05e3c2" }}>See it live</p>
          <h2 className="font-black tracking-tight text-white" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
            See Suku in action.
          </h2>
        </div>

        {/* Video player mockup */}
        <div
          ref={videoRef}
          className="reveal cursor-pointer group"
          onClick={() => setShowModal(true)}
          style={{
            borderRadius: 20,
            overflow: "hidden",
            border: "1px solid rgba(5,227,194,0.2)",
            boxShadow: "0 0 60px rgba(5,227,194,0.1), 0 24px 64px rgba(0,0,0,0.6)",
            position: "relative",
            paddingTop: "56.25%",
            background: "#020218",
          }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300"
              style={{
                background: "rgba(5,227,194,0.12)",
                border: "2px solid rgba(5,227,194,0.4)",
              }}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M8 5L23 14L8 23V5Z" fill="#05e3c2" />
              </svg>
            </div>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
              Click to watch the demo
            </p>
          </div>

          {/* Top bar */}
          <div
            className="absolute top-0 left-0 right-0 flex items-center gap-2 px-4 py-3"
            style={{ background: "rgba(4,4,74,0.8)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
              <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
            ))}
            <div className="flex-1 mx-4 h-5 rounded-full flex items-center px-3" style={{ background: "rgba(255,255,255,0.06)" }}>
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>suku.app</span>
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex px-8 py-4 rounded-full font-semibold text-base transition-all duration-200"
            style={{
              border: "1.5px solid rgba(5,227,194,0.4)",
              color: "#05e3c2",
              background: "rgba(5,227,194,0.05)",
            }}
          >
            Try it yourself →
          </a>
        </div>
      </div>

      {showModal && <VideoModal onClose={() => setShowModal(false)} />}
    </section>
  );
}

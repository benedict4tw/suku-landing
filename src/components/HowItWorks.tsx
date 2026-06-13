import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useReveal } from "../hooks/useReveal";

const STEP_ICONS = [
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M4 7h20M4 14h12M4 21h8" stroke="#05e3c2" strokeWidth="2" strokeLinecap="round" />
    <circle cx="22" cy="20" r="5" stroke="#05e3c2" strokeWidth="1.5" />
    <circle cx="22" cy="20" r="1.5" fill="#05e3c2" />
  </svg>,
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M14 3L17 11H25L19 16L21 24L14 19L7 24L9 16L3 11H11L14 3Z" stroke="#05e3c2" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>,
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M14 3C9 3 5 7 5 12v6l-2 3h22l-2-3v-6c0-5-4-9-9-9z" stroke="#05e3c2" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M11 21v1a3 3 0 006 0v-1" stroke="#05e3c2" strokeWidth="1.5" />
  </svg>,
];

export function HowItWorks() {
  const { t } = useTranslation();
  const titleRef = useReveal(0.2) as React.RefObject<HTMLDivElement>;
  const lineRef = useRef<HTMLDivElement>(null);
  const [lineDrawn, setLineDrawn] = useState(false);

  const STEPS = [
    { num: "01", icon: STEP_ICONS[0], title: t("how.step1title"), desc: t("how.step1desc") },
    { num: "02", icon: STEP_ICONS[1], title: t("how.step2title"), desc: t("how.step2desc") },
    { num: "03", icon: STEP_ICONS[2], title: t("how.step3title"), desc: t("how.step3desc") },
  ];

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setLineDrawn(true);
    }, { threshold: 0.4 });
    if (lineRef.current) io.observe(lineRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <section className="py-28 px-6 max-w-7xl mx-auto">
      <div ref={titleRef} className="reveal text-center mb-20">
        <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "#05e3c2" }}>{t("how.eyebrow")}</p>
        <h2 className="font-black tracking-tight text-white" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
          {t("how.title")}
        </h2>
      </div>

      <div className="relative">
        {/* Connecting line */}
        <div ref={lineRef} className="hidden md:block absolute top-12 left-0 right-0 px-48">
          <div className="relative h-px" style={{ background: "rgba(255,255,255,0.06)" }}>
            <div
              className="absolute inset-y-0 left-0"
              style={{
                width: lineDrawn ? "100%" : "0%",
                background: "linear-gradient(90deg, #05e3c2, #0062FF)",
                transition: "width 1.2s ease-out 0.3s",
                height: "1px",
              }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {STEPS.map((step, i) => {
            const ref = useReveal(0.3) as React.RefObject<HTMLDivElement>;
            return (
              <div
                key={i}
                ref={ref}
                className="reveal flex flex-col items-center text-center"
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                {/* Icon circle */}
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center mb-6 relative z-10"
                  style={{
                    background: "rgba(8,12,52,0.95)",
                    border: "1.5px solid rgba(5,227,194,0.25)",
                    boxShadow: "0 0 30px rgba(5,227,194,0.1)",
                  }}
                >
                  {step.icon}
                </div>
                <span className="text-xs font-bold tracking-widest mb-3" style={{ color: "rgba(5,227,194,0.5)" }}>
                  {step.num}
                </span>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { useTranslation } from "react-i18next";
import { useReveal } from "../hooks/useReveal";
import { DemoLoginButton } from "./DemoLoginButton";

export function FinalCTASection() {
  const { t } = useTranslation();
  const ref = useReveal(0.2) as React.RefObject<HTMLDivElement>;

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div ref={ref} className="reveal relative z-10 flex flex-col items-center text-center px-6 max-w-3xl mx-auto">
        <h2
          className="font-black tracking-tight text-white mb-6"
          style={{ fontSize: "clamp(44px, 7vw, 96px)", lineHeight: 1.05 }}
        >
          {t("cta.title")}
        </h2>

        <p className="text-lg mb-12" style={{ color: "rgba(255,255,255,0.45)" }}>
          {t("cta.sub")}
        </p>

        <DemoLoginButton
          label={t("cta.button")}
          className="px-10 py-5 rounded-full font-bold text-lg border-none"
          style={{
            background: "#05e3c2",
            color: "#080808",
            boxShadow: "0 0 40px rgba(5,227,194,0.4), 0 0 80px rgba(5,227,194,0.15)",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#00ccad"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 60px rgba(5,227,194,0.6), 0 0 100px rgba(5,227,194,0.2)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#05e3c2"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(5,227,194,0.4), 0 0 80px rgba(5,227,194,0.15)"; }}
        />

        <p className="text-sm mt-8" style={{ color: "rgba(255,255,255,0.18)" }}>
          {t("cta.domain")}
        </p>
      </div>
    </section>
  );
}

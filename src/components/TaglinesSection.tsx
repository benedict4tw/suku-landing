import { useTranslation } from "react-i18next";
import { useReveal } from "../hooks/useReveal";

function TagLine({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useReveal(0.3) as React.RefObject<HTMLDivElement>;
  return (
    <div
      ref={ref}
      className={`reveal text-center font-black leading-none tracking-tight py-16 ${className ?? ""}`}
      style={{ fontSize: "clamp(40px, 6vw, 88px)" }}
    >
      {children}
    </div>
  );
}

export function TaglinesSection() {
  const { t } = useTranslation();

  return (
    <section className="py-8 px-6 max-w-6xl mx-auto">
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <TagLine>
          <span className="text-white">{t("taglines.t1")}</span>
        </TagLine>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <TagLine>
          <span style={{ color: "#05e3c2" }}>{t("taglines.t2")}</span>
        </TagLine>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <TagLine>
          <span className="text-gradient">{t("taglines.t3")}</span>
        </TagLine>
      </div>
    </section>
  );
}

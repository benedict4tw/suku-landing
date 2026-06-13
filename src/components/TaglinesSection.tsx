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
  return (
    <section className="py-8 px-6 max-w-6xl mx-auto">
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <TagLine>
          <span className="text-white">Manage your life like a CEO.</span>
        </TagLine>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <TagLine>
          <span style={{ color: "#05e3c2" }}>Built for one person. Perfectly.</span>
        </TagLine>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <TagLine>
          <span className="text-gradient">Everything you are. Everything you do. One place.</span>
        </TagLine>
      </div>
    </section>
  );
}

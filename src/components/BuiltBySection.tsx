import { useEffect, useRef, useState } from "react";

export function BuiltBySection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section style={{ padding: "72px 24px", textAlign: "center" }}>
      <div ref={ref}>
        <p
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 300,
            fontSize: 11,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.28)",
            margin: "0 0 14px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          A project by
        </p>
        <p
          style={{
            fontFamily: "'Chillax', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(30px, 6vw, 52px)",
            color: "#fff",
            margin: 0,
            letterSpacing: "-0.02em",
            lineHeight: 1,
            textShadow:
              "0 0 24px rgba(5,227,194,0.4), 0 0 60px rgba(5,227,194,0.15)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.8s ease 0.18s, transform 0.8s ease 0.18s",
          }}
        >
          Benedict Donkor
        </p>
      </div>
    </section>
  );
}

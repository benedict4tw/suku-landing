import { useReveal } from "../hooks/useReveal";

export function BuiltBySection() {
  const ref = useReveal(0.2) as React.RefObject<HTMLDivElement>;

  return (
    <section className="py-28 px-6 max-w-4xl mx-auto">
      <div ref={ref} className="reveal text-center">
        <p className="text-sm font-semibold tracking-widest uppercase mb-10" style={{ color: "rgba(255,255,255,0.25)" }}>
          The maker
        </p>

        <div
          className="inline-flex flex-col items-center p-12 rounded-3xl"
          style={{
            background: "rgba(8,12,52,0.7)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {/* Avatar placeholder */}
          <div
            className="w-20 h-20 rounded-full mb-6 flex items-center justify-center text-2xl font-bold"
            style={{
              background: "linear-gradient(135deg, rgba(5,227,194,0.2), rgba(0,98,255,0.2))",
              border: "2px solid rgba(5,227,194,0.3)",
              color: "#05e3c2",
            }}
          >
            BD
          </div>

          <p className="text-sm mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>A project by</p>
          <h3 className="text-2xl font-bold mb-4" style={{ color: "#05e3c2" }}>Benedict Donkor</h3>

          <p className="text-base leading-relaxed mb-8 max-w-md" style={{ color: "rgba(255,255,255,0.5)" }}>
            21 year old entrepreneur and developer based in Düsseldorf, Germany.
            Built Suku as a personal tool that grew into something more.
          </p>

          <a
            href="https://github.com/benedict4tw"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200"
            style={{
              border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.7)",
              background: "rgba(255,255,255,0.04)",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(5,227,194,0.4)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            github.com/benedict4tw
          </a>

          <p className="text-xs mt-6" style={{ color: "rgba(255,255,255,0.2)" }}>
            Built with React, TypeScript, Supabase, and Claude AI
          </p>
        </div>
      </div>
    </section>
  );
}

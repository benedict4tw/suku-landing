import { useState } from "react";

const TEAL = "#05e3c2";
const BG = "#080808";
const SIDEBAR_BG = "#0d0d0d";
const CARD_BG = "#111111";
const BORDER = "rgba(255,255,255,0.07)";

const NAV_ITEMS = [
  { icon: "⌂", label: "Dashboard", active: true },
  { icon: "✦", label: "AI Chat", active: false },
  { icon: "📋", label: "Projects", active: false },
  { icon: "✅", label: "Tasks", active: false },
  { icon: "🔥", label: "Habits", active: false },
  { icon: "💪", label: "Gym", active: false },
  { icon: "📅", label: "Calendar", active: false },
  { icon: "🗺️", label: "Whiteboard", active: false },
  { icon: "📝", label: "Notes", active: false },
];

const PROJECTS = [
  { name: "Launch Suku website", progress: 78, color: TEAL, status: "In progress" },
  { name: "Q3 product roadmap", progress: 45, color: "#0062FF", status: "In progress" },
  { name: "Morning routine v2", progress: 92, color: "#C9A84C", status: "Almost done" },
  { name: "Read 12 books", progress: 58, color: TEAL, status: "In progress" },
  { name: "Fitness goal 2026", progress: 71, color: "#0062FF", status: "In progress" },
];

const TASKS = [
  { text: "Review landing page copy", due: "Today", done: false, color: "#FF5F57" },
  { text: "Reply to Alex about collab", due: "Today", done: false, color: "#FF5F57" },
  { text: "Log morning workout", due: "Today", done: true,  color: TEAL },
  { text: "Prepare Q3 slides", due: "Today", done: false, color: "#FF5F57" },
];

const HABITS = [
  { name: "Morning run", streak: 12, done: true  },
  { name: "Meditate 10min", streak: 7,  done: true  },
  { name: "Read 20 pages", streak: 21, done: false },
  { name: "Cold shower",  streak: 5,  done: true  },
];

const RECENT_AI = [
  { msg: "Remind me to call dentist Friday at 3pm", time: "2h ago" },
  { msg: "What's on my calendar this week?", time: "4h ago" },
  { msg: "Add 'buy protein powder' to shopping tasks", time: "Yesterday" },
];

function StatCard({ icon, label, value, sub, color }: { icon: string; label: string; value: string | number; sub?: string; color?: string }) {
  return (
    <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "20px 24px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <span style={{ fontSize: 18 }}>{icon}</span>
        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>{label}</span>
      </div>
      <div style={{ fontSize: 36, fontWeight: 800, color: color ?? "#fff", letterSpacing: "-0.03em", lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 6 }}>{sub}</div>}
    </div>
  );
}

export function DemoPage() {
  const [activeNav, setActiveNav] = useState("Dashboard");

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: BG, fontFamily: "Inter, sans-serif", color: "#fff" }}>

      {/* ── Sidebar ── */}
      <aside style={{
        width: 240, flexShrink: 0, background: SIDEBAR_BG,
        borderRight: `1px solid ${BORDER}`,
        display: "flex", flexDirection: "column",
        position: "sticky", top: 0, height: "100vh",
      }}>
        {/* Logo */}
        <div style={{ padding: "20px 20px 16px", borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/SUKU-Logov1.png" style={{ width: 28, height: 28, objectFit: "contain" }} alt="Suku" />
          <span style={{ fontWeight: 700, fontSize: 18, color: "#fff" }}>Suku</span>
        </div>

        {/* User */}
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: `linear-gradient(135deg, ${TEAL}33, #0062FF33)`,
            border: `1.5px solid ${TEAL}44`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 700, color: TEAL,
          }}>K</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>Kevin</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>kevin@demo.com</div>
          </div>
        </div>

        {/* Nav items */}
        <nav style={{ flex: 1, padding: "12px 12px", display: "flex", flexDirection: "column", gap: 2 }}>
          {NAV_ITEMS.map((item) => {
            const isActive = activeNav === item.label;
            return (
              <button
                key={item.label}
                onClick={() => setActiveNav(item.label)}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "9px 12px", borderRadius: 10, border: "none", cursor: "pointer",
                  background: isActive ? `${TEAL}15` : "transparent",
                  color: isActive ? TEAL : "rgba(255,255,255,0.55)",
                  fontSize: 14, fontWeight: isActive ? 600 : 400,
                  textAlign: "left", width: "100%",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)"; }}
                onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                <span style={{ fontSize: 15, width: 20, textAlign: "center" }}>{item.icon}</span>
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Back to landing */}
        <div style={{ padding: "16px 12px", borderTop: `1px solid ${BORDER}` }}>
          <a
            href="/"
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "9px 12px", borderRadius: 10,
              color: "rgba(255,255,255,0.3)", fontSize: 13,
              textDecoration: "none", transition: "color 0.15s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)")}
          >
            ← Back to site
          </a>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Demo banner */}
        <div style={{
          background: `${TEAL}12`,
          borderBottom: `1px solid ${TEAL}30`,
          padding: "10px 28px",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
        }}>
          <span style={{ fontSize: 13, color: TEAL, fontWeight: 500, textAlign: "center" }}>
            You are viewing a demo version of Suku. The real app is more powerful.
          </span>
          <a
            href="https://suku-teal.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 12, color: "#fff", background: TEAL,
              padding: "3px 10px", borderRadius: 20, fontWeight: 600,
              textDecoration: "none", whiteSpace: "nowrap",
            }}
          >
            Try real app
          </a>
        </div>

        {/* Scrollable dashboard */}
        <main style={{ flex: 1, overflowY: "auto", padding: "28px 32px" }}>
          {/* Header */}
          <div style={{ marginBottom: 28 }}>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", margin: 0 }}>
              Good morning, Kevin.
            </h1>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginTop: 4, margin: "4px 0 0" }}>
              Here's what's happening today.
            </p>
          </div>

          {/* Stat cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
            <StatCard icon="📋" label="Projects" value={11} sub="3 active this week" color={TEAL} />
            <StatCard icon="✅" label="Tasks due" value={4} sub="Due today" color="#FF5F57" />
            <StatCard icon="🔥" label="Habit score" value="91%" sub="Performance: Great" color="#C9A84C" />
            <StatCard icon="💪" label="Workouts" value={48} sub="This month" color="#0062FF" />
          </div>

          {/* Projects + Tasks row */}
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20, marginBottom: 20 }}>
            {/* Projects */}
            <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "22px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>Projects</span>
                <span style={{ fontSize: 12, color: TEAL, cursor: "pointer" }}>View all →</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {PROJECTS.map((p, i) => (
                  <div key={i}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>{p.name}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{p.status}</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: p.color }}>{p.progress}%</span>
                      </div>
                    </div>
                    <div style={{ height: 4, borderRadius: 2, background: "rgba(255,255,255,0.06)" }}>
                      <div style={{ height: "100%", width: `${p.progress}%`, borderRadius: 2, background: p.color, transition: "width 1s ease" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tasks */}
            <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "22px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>Due Today</span>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
                  {TASKS.filter((t) => t.done).length}/{TASKS.length} done
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {TASKS.map((t, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: 5, flexShrink: 0,
                      border: `1.5px solid ${t.done ? TEAL : "rgba(255,255,255,0.2)"}`,
                      background: t.done ? `${TEAL}22` : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      {t.done && <svg width="9" height="7" viewBox="0 0 9 7"><path d="M1 3.5L3.5 6L8 1" stroke={TEAL} strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg>}
                    </div>
                    <span style={{ fontSize: 13, color: t.done ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.8)", textDecoration: t.done ? "line-through" : "none" }}>
                      {t.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Habits + AI Chat row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {/* Habits */}
            <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "22px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>Habits Today</span>
                <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: `${TEAL}18`, color: TEAL, border: `1px solid ${TEAL}33` }}>
                  91% streak
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {HABITS.map((h, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                      border: `2px solid ${h.done ? TEAL : "rgba(255,255,255,0.15)"}`,
                      background: h.done ? `${TEAL}20` : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 11, color: TEAL,
                    }}>
                      {h.done && "✓"}
                    </div>
                    <span style={{ flex: 1, fontSize: 13, color: h.done ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.45)" }}>{h.name}</span>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>{h.streak}d 🔥</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent AI */}
            <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "22px 24px" }}>
              <div style={{ marginBottom: 18 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>Recent AI Chats</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {RECENT_AI.map((r, i) => (
                  <div key={i} style={{
                    padding: "10px 14px", borderRadius: 10,
                    background: "rgba(5,227,194,0.05)", border: "1px solid rgba(5,227,194,0.1)",
                  }}>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", margin: "0 0 4px 0" }}>{r.msg}</p>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>{r.time}</span>
                  </div>
                ))}
              </div>
              <button style={{
                marginTop: 14, width: "100%", padding: "10px",
                background: "transparent", border: `1px solid ${TEAL}33`,
                borderRadius: 10, color: TEAL, fontSize: 13, fontWeight: 500,
                cursor: "pointer", transition: "background 0.15s",
              }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = `${TEAL}0d`)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
              >
                + Ask Suku something
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

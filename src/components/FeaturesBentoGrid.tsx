import { useEffect, useRef, useState } from "react";

const CARD_BG = "rgba(8, 12, 52, 0.9)";
const CARD_BORDER = "rgba(255,255,255,0.07)";

/* ── Chat card ── */
const CHAT_SEQUENCE = [
  { from: "user", text: "Remind me to call dentist tomorrow" },
  { from: "ai",   text: "Done. Reminder set for 3pm tomorrow ✓" },
  { from: "user", text: "And add it to my calendar" },
  { from: "ai",   text: "Added to your calendar as well 📅" },
];

function ChatCard() {
  const [visible, setVisible] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let i = 0;
        const iv = setInterval(() => {
          i++;
          setVisible(i);
          if (i >= CHAT_SEQUENCE.length) {
            clearInterval(iv);
            setTimeout(() => setVisible(0), 1800);
          }
        }, 1100);
        return () => clearInterval(iv);
      }
    }, { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex flex-col gap-2.5 pt-1 h-40 overflow-hidden">
      {CHAT_SEQUENCE.slice(0, visible).map((m, i) => (
        <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
          <div
            className="px-3 py-2 rounded-xl text-xs font-medium max-w-[80%]"
            style={{
              background: m.from === "user" ? "rgba(0,98,255,0.55)" : "rgba(5,227,194,0.15)",
              border: `1px solid ${m.from === "user" ? "rgba(0,98,255,0.4)" : "rgba(5,227,194,0.3)"}`,
              color: "#fff",
              animation: "chatIn 0.3s ease-out both",
            }}
          >
            {m.text}
          </div>
        </div>
      ))}
      <style>{`@keyframes chatIn { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:none } }`}</style>
    </div>
  );
}

/* ── Tasks card ── */
const TASKS = ["Design new hero", "Write onboarding copy", "Set up analytics"];

function TasksCard() {
  const [checked, setChecked] = useState<boolean[]>([false, false, false]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        [0, 1, 2].forEach((i) =>
          setTimeout(() => setChecked((c) => { const n=[...c]; n[i]=true; return n; }), 600 + i * 500)
        );
      }
    }, { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex flex-col gap-3 pt-1">
      {TASKS.map((t, i) => (
        <div key={i} className="flex items-center gap-3">
          <div
            className="w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center transition-all duration-300"
            style={{
              border: `1.5px solid ${checked[i] ? "#05e3c2" : "rgba(255,255,255,0.2)"}`,
              background: checked[i] ? "rgba(5,227,194,0.2)" : "transparent",
            }}
          >
            {checked[i] && <svg width="10" height="8" viewBox="0 0 10 8"><path d="M1 4L4 7L9 1" stroke="#05e3c2" strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg>}
          </div>
          <span
            className="text-sm transition-all duration-300"
            style={{ color: checked[i] ? "rgba(255,255,255,0.35)" : "#fff", textDecoration: checked[i] ? "line-through" : "none" }}
          >
            {t}
          </span>
        </div>
      ))}
      {/* Progress bar */}
      <div className="mt-2 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${(checked.filter(Boolean).length / 3) * 100}%`, background: "linear-gradient(90deg,#05e3c2,#0062FF)" }}
        />
      </div>
    </div>
  );
}

/* ── Habit ring card ── */
function HabitsCard() {
  const ref = useRef<SVGCircleElement>(null);
  const [count, setCount] = useState(0);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let n = 0;
        const iv = setInterval(() => { n++; setCount(n); if (n >= 91) clearInterval(iv); }, 18);
        return () => clearInterval(iv);
      }
    }, { threshold: 0.4 });
    if (circleRef.current) io.observe(circleRef.current);
    return () => io.disconnect();
  }, []);

  const r = 40, circ = 2 * Math.PI * r;
  const offset = circ * (1 - count / 100);

  return (
    <div ref={circleRef} className="flex items-center gap-5 pt-1">
      <svg width={100} height={100}>
        <circle cx={50} cy={50} r={r} fill="none" stroke="rgba(5,227,194,0.1)" strokeWidth={8} />
        <circle
          ref={ref} cx={50} cy={50} r={r} fill="none"
          stroke="#05e3c2" strokeWidth={8} strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset}
          transform="rotate(-90 50 50)"
          style={{ transition: "stroke-dashoffset 0.05s linear", filter: "drop-shadow(0 0 6px rgba(5,227,194,0.7))" }}
        />
        <text x={50} y={55} textAnchor="middle" fill="#fff" fontSize={16} fontWeight={700} fontFamily="Inter">{count}%</text>
      </svg>
      <div>
        <div className="text-sm font-semibold text-white mb-1">Today's habits</div>
        <div
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
          style={{ background: "rgba(5,227,194,0.15)", border: "1px solid rgba(5,227,194,0.3)", color: "#05e3c2" }}
        >
          ✓ Performance: Great
        </div>
        <div className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.35)" }}>12-day streak 🔥</div>
      </div>
    </div>
  );
}

/* ── Gym chart card ── */
const GYM_PTS = [30, 55, 42, 70, 65, 88, 75, 95];

function GymCard() {
  const pathRef = useRef<SVGPolylineElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setDrawn(true);
    }, { threshold: 0.4 });
    if (wrapRef.current) io.observe(wrapRef.current);
    return () => io.disconnect();
  }, []);

  const W = 180, H = 70;
  const pts = GYM_PTS.map((v, i) => `${(i / (GYM_PTS.length - 1)) * W},${H - (v / 100) * H}`).join(" ");
  const pathLen = 550;

  return (
    <div ref={wrapRef} className="pt-1">
      <svg width={W} height={H + 10}>
        {[0, 0.5, 1].map((t) => (
          <line key={t} x1={0} y1={H * (1-t)} x2={W} y2={H * (1-t)} stroke="rgba(5,227,194,0.07)" strokeWidth={1} />
        ))}
        <polyline
          ref={pathRef}
          points={pts}
          fill="none" stroke="#05e3c2" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray={pathLen}
          strokeDashoffset={drawn ? 0 : pathLen}
          style={{ transition: "stroke-dashoffset 1.6s ease-out", filter: "drop-shadow(0 0 4px rgba(5,227,194,0.7))" }}
        />
        <circle cx={(7/7)*W} cy={H - (GYM_PTS[7]/100)*H} r={4} fill="#05e3c2"
          style={{ opacity: drawn ? 1 : 0, transition: "opacity 0.3s ease 1.6s", filter: "drop-shadow(0 0 6px #05e3c2)" }} />
      </svg>
      <div className="flex items-center gap-2 mt-2">
        <div
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold"
          style={{ background: "rgba(201,168,76,0.2)", border: "1px solid rgba(201,168,76,0.4)", color: "#C9A84C" }}
        >
          🏆 PR
        </div>
        <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Weekly volume +18%</span>
      </div>
    </div>
  );
}

/* ── Whiteboard card ── */
const WB_NODES = [
  { x: 80, y: 55, label: "Goals", r: 28, color: "#05e3c2", delay: 0 },
  { x: 30, y: 20, label: "Fitness", r: 22, color: "#0062FF", delay: 0.3 },
  { x: 140, y: 20, label: "Career", r: 22, color: "#0062FF", delay: 0.5 },
  { x: 20, y: 80, label: "Learn", r: 18, color: "#C9A84C", delay: 0.7 },
  { x: 145, y: 80, label: "Travel", r: 18, color: "#C9A84C", delay: 0.9 },
];

function WhiteboardCard() {
  const [shown, setShown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setTimeout(() => setShown(true), 200);
    }, { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="pt-1">
      <svg width={180} height={110} overflow="visible">
        {WB_NODES.slice(1).map((n, i) => (
          <line key={i} x1={WB_NODES[0].x} y1={WB_NODES[0].y} x2={n.x} y2={n.y}
            stroke={n.color} strokeWidth={1.2} opacity={0.3} strokeDasharray="4 3" />
        ))}
        {WB_NODES.map((n, i) => (
          <g key={i} style={{ animation: shown ? `nodeIn 0.4s ease-out ${n.delay}s both` : "none" }}>
            <circle cx={n.x} cy={n.y} r={n.r} fill="rgba(8,12,52,0.95)"
              stroke={n.color} strokeWidth={i===0 ? 2 : 1.5}
              style={{ filter: `drop-shadow(0 0 ${i===0?8:4}px ${n.color}55)` }} />
            <text x={n.x} y={n.y+1} textAnchor="middle" dominantBaseline="middle"
              fill={i===0 ? n.color : "#fff"} fontSize={i===0 ? 10 : 8} fontWeight={600} fontFamily="Inter">
              {n.label}
            </text>
          </g>
        ))}
      </svg>
      <style>{`@keyframes nodeIn { from{opacity:0;transform:scale(0.3)} to{opacity:1;transform:scale(1)} }`}</style>
    </div>
  );
}

/* ── Notifications card (iPhone) ── */
function NotifCard() {
  return (
    <div className="flex items-center gap-6 pt-1">
      {/* iPhone */}
      <div
        className="relative flex-shrink-0"
        style={{
          width: 120, height: 210, borderRadius: 24,
          background: "linear-gradient(145deg,#0e0e28,#1a1a3e)",
          border: "2px solid rgba(5,227,194,0.2)",
          boxShadow: "0 0 30px rgba(5,227,194,0.1)",
          overflow: "hidden",
        }}
      >
        {/* Notch */}
        <div style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", width: 36, height: 6, borderRadius: 3, background: "#020212" }} />
        {/* Screen content */}
        <div style={{ position: "absolute", inset: 0, top: 24, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "8px 6px" }}>
          {/* Notification banner */}
          <div
            className="notif-drop w-full"
            style={{
              background: "rgba(8,12,52,0.95)",
              border: "1px solid rgba(5,227,194,0.25)",
              borderRadius: 10, padding: "8px 10px",
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <div style={{ width: 14, height: 14, borderRadius: 4, background: "linear-gradient(135deg,#05e3c2,#0062FF)", flexShrink: 0 }} />
              <span style={{ fontSize: 9, fontWeight: 700, color: "#fff", fontFamily: "Inter" }}>Suku</span>
            </div>
            <p style={{ fontSize: 8, color: "rgba(255,255,255,0.8)", fontFamily: "Inter", margin: 0, lineHeight: 1.4 }}>
              Team standup in 10 min ⏰
            </p>
          </div>
        </div>
        {/* Home bar */}
        <div style={{ position: "absolute", bottom: 6, left: "50%", transform: "translateX(-50%)", width: 40, height: 3, borderRadius: 2, background: "rgba(255,255,255,0.2)" }} />
      </div>
      <div className="flex flex-col gap-2">
        {["Standup in 10min ⏰","Morning run logged ✅","2 tasks due today 💡"].map((n, i) => (
          <div key={i} className="text-xs px-2 py-1 rounded-lg" style={{ background: "rgba(5,227,194,0.07)", border: "1px solid rgba(5,227,194,0.15)", color: "rgba(255,255,255,0.7)" }}>
            {n}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main grid ── */
const CARD_STYLE = {
  background: CARD_BG,
  border: `1px solid ${CARD_BORDER}`,
  borderRadius: 20,
  padding: "28px",
};

export function FeaturesBentoGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const [sectionVisible, setSectionVisible] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setSectionVisible(true);
    }, { threshold: 0.1 });
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  const cards = [
    { id: "chat",  span: "col-span-2", delay: 0 },
    { id: "tasks", span: "col-span-1", delay: 0.1 },
    { id: "habit", span: "col-span-1", delay: 0.2 },
    { id: "gym",   span: "col-span-1", delay: 0.3 },
    { id: "wb",    span: "col-span-1", delay: 0.4 },
    { id: "notif", span: "col-span-2", delay: 0.5 },
  ];

  return (
    <section ref={sectionRef as React.RefObject<HTMLElement>} className="py-28 px-6 max-w-7xl mx-auto">
      {/* Title */}
      <div
        className="text-center mb-16 reveal"
        ref={(el) => { if (el) { const io = new IntersectionObserver(([e]) => { if(e.isIntersecting){el.classList.add("visible");io.disconnect();} },{threshold:0.2}); io.observe(el); } }}
      >
        <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "#05e3c2" }}>Features</p>
        <h2 className="font-black tracking-tight" style={{ fontSize: "clamp(36px, 5vw, 64px)", color: "#fff" }}>
          Manage your life like a CEO.
        </h2>
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-4 gap-5">
        {/* Chat — wide */}
        <div
          className={`col-span-4 md:col-span-2 feature-card`}
          style={{
            ...CARD_STYLE,
            opacity: sectionVisible ? 1 : 0, transform: sectionVisible ? "translateY(0)" : "translateY(24px)",
            transition: `opacity 0.6s ease ${cards[0].delay}s, transform 0.6s ease ${cards[0].delay}s`,
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">💬</span>
            <span className="font-semibold text-white text-sm">AI Chat</span>
          </div>
          <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>Talk to Suku in plain language. It acts immediately.</p>
          <ChatCard />
        </div>

        {/* Tasks */}
        <div
          className="col-span-4 md:col-span-1 feature-card"
          style={{
            ...CARD_STYLE,
            opacity: sectionVisible ? 1 : 0, transform: sectionVisible ? "translateY(0)" : "translateY(24px)",
            transition: `opacity 0.6s ease ${cards[1].delay}s, transform 0.6s ease ${cards[1].delay}s`,
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">✅</span>
            <span className="font-semibold text-white text-sm">Tasks & Projects</span>
          </div>
          <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>Everything tracked, nothing forgotten.</p>
          <TasksCard />
        </div>

        {/* Habits */}
        <div
          className="col-span-4 md:col-span-1 feature-card"
          style={{
            ...CARD_STYLE,
            opacity: sectionVisible ? 1 : 0, transform: sectionVisible ? "translateY(0)" : "translateY(24px)",
            transition: `opacity 0.6s ease ${cards[2].delay}s, transform 0.6s ease ${cards[2].delay}s`,
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🔥</span>
            <span className="font-semibold text-white text-sm">Habits Tracker</span>
          </div>
          <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>Build momentum, day by day.</p>
          <HabitsCard />
        </div>

        {/* Gym */}
        <div
          className="col-span-4 md:col-span-1 feature-card"
          style={{
            ...CARD_STYLE,
            opacity: sectionVisible ? 1 : 0, transform: sectionVisible ? "translateY(0)" : "translateY(24px)",
            transition: `opacity 0.6s ease ${cards[3].delay}s, transform 0.6s ease ${cards[3].delay}s`,
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">💪</span>
            <span className="font-semibold text-white text-sm">Gym Tracker</span>
          </div>
          <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>Log sets, track PRs, see progress.</p>
          <GymCard />
        </div>

        {/* Whiteboard */}
        <div
          className="col-span-4 md:col-span-1 feature-card"
          style={{
            ...CARD_STYLE,
            opacity: sectionVisible ? 1 : 0, transform: sectionVisible ? "translateY(0)" : "translateY(24px)",
            transition: `opacity 0.6s ease ${cards[4].delay}s, transform 0.6s ease ${cards[4].delay}s`,
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🗺️</span>
            <span className="font-semibold text-white text-sm">Whiteboards</span>
          </div>
          <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>Map your thinking visually.</p>
          <WhiteboardCard />
        </div>

        {/* Notifications — wide */}
        <div
          className="col-span-4 md:col-span-2 feature-card"
          style={{
            ...CARD_STYLE,
            opacity: sectionVisible ? 1 : 0, transform: sectionVisible ? "translateY(0)" : "translateY(24px)",
            transition: `opacity 0.6s ease ${cards[5].delay}s, transform 0.6s ease ${cards[5].delay}s`,
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🔔</span>
            <span className="font-semibold text-white text-sm">Proactive Notifications</span>
          </div>
          <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>Suku notifies you before you forget.</p>
          <NotifCard />
        </div>
      </div>
    </section>
  );
}

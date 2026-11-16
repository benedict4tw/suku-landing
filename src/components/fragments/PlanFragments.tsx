import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Check, Flag } from "lucide-react";

/* ── Task list you can actually tick (the page's live thing) ── */
export function TaskList() {
  const { t } = useTranslation();
  const [done, setDone] = useState<Record<string, boolean>>({ t3: true });
  const tasks = [
    { id: "t1", due: "10:00", prio: true },
    { id: "t2", due: "14:00" },
    { id: "t3", due: "16:30" },
    { id: "t4", due: "18:00" },
  ];
  return (
    <div data-ui className="ui-panel p-2">
      <p className="px-3 pb-1 pt-2 text-eyebrow uppercase text-ink-subtle">{t("groups.plan.tasks.list")}</p>
      <ul>
        {tasks.map((task, i) => {
          const isDone = !!done[task.id];
          const label = t(`groups.plan.tasks.${task.id}`);
          return (
            <li key={task.id} className={i > 0 ? "border-t border-line-soft" : ""}>
              <label className="group flex min-h-[44px] cursor-pointer items-center gap-3 rounded-md px-3 py-2 transition-colors duration-fast ease-out hover:bg-surface-2">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={isDone}
                  onChange={() => setDone((d) => ({ ...d, [task.id]: !d[task.id] }))}
                />
                <span
                  aria-hidden
                  className={`tick flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-xs border peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent ${
                    isDone ? "border-accent bg-accent" : "border-line-strong group-hover:border-accent"
                  }`}
                >
                  {isDone && <Check size={12} strokeWidth={2.5} className="tick-mark text-accent-on" />}
                </span>
                <span className={`flex-1 truncate text-sm transition-colors duration-fast ${isDone ? "text-ink-subtle line-through" : "text-ink"}`}>
                  {label}
                </span>
                {task.prio && !isDone && <Flag size={14} strokeWidth={1.5} aria-hidden className="text-danger" />}
                <span className="font-mono text-xs tabular-nums text-ink-subtle">{task.due}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ── Project progress ── */
export function ProjectProgress() {
  const { t } = useTranslation();
  const projects = [
    { name: t("groups.plan.tasks.projectName"), meta: t("groups.plan.tasks.projectMeta"), pct: 62, color: "bg-accent" },
    { name: t("groups.plan.tasks.project2"), meta: t("groups.plan.tasks.project2Meta"), pct: 42, color: "bg-progress-week" },
  ];
  return (
    <div data-ui className="ui-panel space-y-4 p-4">
      {projects.map((p) => (
        <div key={p.name}>
          <div className="mb-2 flex items-baseline justify-between gap-3">
            <p className="truncate text-sm font-medium text-ink">{p.name}</p>
            <span className="font-mono text-xs tabular-nums text-ink-muted">{p.pct}%</span>
          </div>
          <div
            role="progressbar"
            aria-label={p.name}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={p.pct}
            className="h-[6px] overflow-hidden rounded-full bg-progress-track"
          >
            <div className={`h-full rounded-full ${p.color}`} style={{ width: `${p.pct}%` }} />
          </div>
          <p className="mt-2 text-xs text-ink-subtle">{p.meta}</p>
        </div>
      ))}
    </div>
  );
}

/* ── Mini week view with Google Calendar events ── */
export function WeekCalendar() {
  const { t, i18n } = useTranslation();
  const days = i18n.resolvedLanguage === "de" ? ["Mo", "Di", "Mi", "Do", "Fr"] : ["Mon", "Tue", "Wed", "Thu", "Fri"];
  // [dayIndex, startRow, span, labelKey, tone]
  const events: [number, number, number, string, "accent" | "month" | "week" | "year"][] = [
    [0, 1, 1, "e1", "month"],
    [1, 2, 2, "e3", "accent"],
    [2, 4, 1, "e2", "week"],
    [3, 1, 1, "e1", "month"],
    [3, 3, 2, "e3", "accent"],
    [4, 4, 2, "e4", "year"],
  ];
  const dot = { accent: "bg-accent", month: "bg-progress-month", week: "bg-progress-week", year: "bg-progress-year" };
  const tone = {
    accent: "bg-accent-soft",
    month: "bg-surface-3",
    week: "bg-surface-3",
    year: "bg-surface-3",
  };
  return (
    <div data-ui className="ui-panel p-3">
      <div className="mb-2 flex items-center justify-between px-1">
        <span className="inline-flex items-center gap-2 text-xs text-ink-muted">
          <span aria-hidden className="h-2 w-2 rounded-full bg-progress-month" />
          {t("groups.plan.calendar.badge")}
        </span>
      </div>
      <div className="grid grid-cols-5 gap-1">
        {days.map((d, i) => (
          <span key={d} className={`pb-1 text-center text-xs ${i === 1 ? "font-semibold text-accent-text" : "text-ink-subtle"}`}>
            {d}
          </span>
        ))}
      </div>
      <div className="relative grid grid-cols-5 grid-rows-[repeat(5,28px)] gap-1">
        {Array.from({ length: 25 }).map((_, i) => (
          <span key={i} aria-hidden className="rounded-xs bg-surface-sunken" />
        ))}
        {events.map(([d, r, s, k, c], i) => (
          <span
            key={i}
            className={`z-[1] flex items-start gap-1 overflow-hidden rounded-xs px-1 py-1 text-2xs text-ink sm:px-2 ${tone[c]}`}
            style={{ gridColumn: d + 1, gridRow: `${r} / span ${s}` }}
          >
            <span aria-hidden className={`mt-1 h-[6px] w-[6px] shrink-0 rounded-full ${dot[c]}`} />
            <span className="min-w-0 break-words">{t(`groups.plan.calendar.${k}`)}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Whiteboard canvas mock: hand-drawn connectors + notes ── */
export function WhiteboardMock() {
  const { t } = useTranslation();
  return (
    <div data-ui className="ui-panel relative h-[220px] overflow-hidden bg-surface-sunken">
      <div
        aria-hidden
        className="absolute inset-0 opacity-60 [background-image:radial-gradient(var(--border)_1px,transparent_1px)] [background-size:16px_16px]"
      />
      <svg aria-hidden viewBox="0 0 320 220" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <path d="M110 78 C 150 70, 170 110, 196 128" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="0" />
        <path d="M100 96 C 110 140, 80 150, 70 160" fill="none" stroke="var(--text-subtle)" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="248" cy="58" r="22" fill="none" stroke="var(--progress-week)" strokeWidth="1.5" strokeDasharray="4 4" />
      </svg>
      <div className="absolute left-[8%] top-[22%] rotate-[-2deg] rounded-md border border-line bg-surface-2 px-3 py-2 text-sm font-medium text-ink">
        {t("groups.plan.whiteboards.n1")}
      </div>
      <div className="absolute right-[8%] top-[52%] rotate-[1.5deg] rounded-md border border-line-strong bg-accent-soft-bg px-3 py-2 text-xs text-ink">
        {t("groups.plan.whiteboards.n2")}
      </div>
      <div className="absolute bottom-[10%] left-[10%] rotate-[-1deg] rounded-md border border-line bg-surface-1 px-3 py-2 text-xs text-ink-muted">
        {t("groups.plan.whiteboards.n3")}
      </div>
    </div>
  );
}

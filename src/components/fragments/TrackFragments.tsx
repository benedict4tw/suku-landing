import { useSyncExternalStore } from "react";
import { useTranslation } from "react-i18next";
import { Trophy } from "lucide-react";

/* ── Year / Month / Week — same math as the app's ProgressBars.tsx, live for today ── */
function elapsed(now: Date) {
  const pct = (s: Date, e: Date) =>
    Math.min(100, Math.max(0, Math.round(((now.getTime() - s.getTime()) / (e.getTime() - s.getTime())) * 100)));
  const y = now.getFullYear();
  const m = now.getMonth();
  const yearStart = new Date(y, 0, 1);
  const yearEnd = new Date(y + 1, 0, 1);
  const monthStart = new Date(y, m, 1);
  const monthEnd = new Date(y, m + 1, 1);
  const dow = (now.getDay() + 6) % 7; // Monday = 0, like the app (weekStartsOn: 1)
  const weekStart = new Date(y, m, now.getDate() - dow);
  const weekEnd = new Date(y, m, now.getDate() - dow + 7);
  return { year: pct(yearStart, yearEnd), month: pct(monthStart, monthEnd), week: pct(weekStart, weekEnd) };
}

// The date only matters at mount time; there's nothing to subscribe to.
const subscribeNever = () => () => {};
const pageLoadedAt = typeof window === "undefined" ? 0 : Date.now();
const getClientNow = () => pageLoadedAt;
const getServerNow = () => null;

export function ProgressBars({ large = false }: { large?: boolean }) {
  const { t, i18n } = useTranslation();
  // Computed after mount: the HTML is prerendered at build time, the bars are live for the visitor's today.
  const nowMs = useSyncExternalStore(subscribeNever, getClientNow, getServerNow);
  const now = nowMs === null ? null : new Date(nowMs);
  const v = now ? elapsed(now) : { year: 0, month: 0, week: 0 };
  const rows = [
    { key: "year", pct: v.year, bar: "bg-progress-year", ink: "text-progress-year-ink" },
    { key: "month", pct: v.month, bar: "bg-progress-month", ink: "text-progress-month" },
    { key: "week", pct: v.week, bar: "bg-progress-week", ink: "text-progress-week" },
  ] as const;
  const date = (now ?? new Date(0)).toLocaleDateString(i18n.resolvedLanguage === "de" ? "de-DE" : "en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div data-ui>
      <div className={`ui-panel ${large ? "space-y-4 px-5 py-5 md:px-6" : "space-y-3 px-4 py-3"}`}>
        {rows.map((r) => {
          const label = t(`groups.track.progress.${r.key}`);
          return (
            <div key={r.key} className="flex items-center gap-3">
              <span className={`shrink-0 text-xs text-ink-subtle ${large ? "w-14" : "w-12"}`}>{label}</span>
              <div
                role="progressbar"
                aria-label={label}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={r.pct}
                aria-valuetext={`${r.pct}%`}
                className={`flex-1 overflow-hidden rounded-full bg-progress-track ${large ? "h-2" : "h-[6px]"}`}
              >
                <div className={`h-full rounded-full ${r.bar} progress-fill`} style={{ width: `${now ? Math.max(r.pct, 1) : 0}%` }} />
              </div>
              <span className={`w-11 shrink-0 text-right font-mono text-xs tabular-nums ${r.ink}`}>{r.pct}%</span>
            </div>
          );
        })}
      </div>
      <p className="mt-3 min-h-[1.45em] text-xs text-ink-subtle">{now ? t("groups.track.progress.caption", { date }) : ""}</p>
    </div>
  );
}

/* ── Habits: streak dots ── */
export function HabitStreaks() {
  const { t } = useTranslation();
  const days = t("groups.track.habits.days").split(",");
  const habits = [
    { name: t("groups.track.habits.h1"), done: [1, 1, 1, 1, 1, 1, 0], streak: 9 },
    { name: t("groups.track.habits.h2"), done: [1, 0, 1, 1, 1, 1, 0], streak: 4 },
    { name: t("groups.track.habits.h3"), done: [1, 1, 0, 1, 1, 0, 0], streak: 0 },
  ];
  return (
    <div data-ui className="ui-panel p-4">
      <div className="mb-3 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3">
        <span />
        <div className="grid grid-cols-7 gap-1 sm:gap-[6px]" aria-hidden>
          {days.map((d) => (
            <span key={d} className="w-[14px] text-center sm:w-[18px] text-xs text-ink-subtle">{d.slice(0, 1)}</span>
          ))}
        </div>
      </div>
      <ul className="space-y-3">
        {habits.map((h) => (
          <li key={h.name} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm text-ink">{h.name}</p>
              {h.streak > 0 && (
                <p className="font-mono text-xs text-ink-subtle">{t("groups.track.habits.streak", { count: h.streak })}</p>
              )}
            </div>
            <div className="grid grid-cols-7 gap-1 sm:gap-[6px]">
              {h.done.map((d, i) => (
                <span
                  key={i}
                  aria-hidden
                  className={`h-[14px] w-[14px] rounded-full sm:h-[18px] sm:w-[18px] ${
                    d ? "bg-accent" : i === 6 ? "border border-dashed border-line-strong" : "border border-line"
                  }`}
                />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Gym: workout log with mono numbers ── */
export function GymLog() {
  const { t } = useTranslation();
  const sets = [
    { n: 1, kg: "70.0", reps: "10" },
    { n: 2, kg: "77.5", reps: "8" },
    { n: 3, kg: "82.5", reps: "6", pr: true },
  ];
  return (
    <div data-ui className="ui-panel p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-medium text-ink">{t("groups.track.gym.exercise")}</p>
        <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2 py-[2px] font-mono text-xs font-medium text-accent-text">
          <Trophy size={12} strokeWidth={1.75} aria-hidden />
          {t("groups.track.gym.pr")} 82.5 {t("groups.track.gym.kg")}
        </span>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="text-xs text-ink-subtle">
            <th scope="col" className="pb-2 font-normal">{t("groups.track.gym.set")}</th>
            <th scope="col" className="pb-2 text-right font-normal">{t("groups.track.gym.kg")}</th>
            <th scope="col" className="pb-2 text-right font-normal">{t("groups.track.gym.reps")}</th>
          </tr>
        </thead>
        <tbody className="font-mono text-sm tabular-nums">
          {sets.map((s) => (
            <tr key={s.n} className="border-t border-line-soft">
              <td className="py-2 text-ink-subtle">{String(s.n).padStart(2, "0")}</td>
              <td className={`py-2 text-right ${s.pr ? "text-accent-text" : "text-ink"}`}>{s.kg}</td>
              <td className="py-2 text-right text-ink">{s.reps}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

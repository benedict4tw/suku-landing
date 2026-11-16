import { useTranslation } from "react-i18next";
import { ArrowRight, Sparkles, Bell, Sun, Moon } from "lucide-react";

/* ── "Ask Suku…" input with the app's soft violet glow beneath ── */
export function AskSukuInput({ filled = false }: { filled?: boolean }) {
  const { t } = useTranslation();
  return (
    <div data-ui className="relative">
      <div aria-hidden className="absolute -inset-px rounded-xl bg-accent opacity-[0.18] blur-[16px]" />
      <div className="relative flex items-center rounded-xl border border-line bg-surface-1">
        <Sparkles size={16} strokeWidth={1.5} aria-hidden className="ml-4 shrink-0 text-accent" />
        <p className={`flex-1 truncate px-3 py-4 text-sm ${filled ? "text-ink" : "text-ink-subtle"}`}>
          {filled ? t("ai.askExample") : t("ai.askPlaceholder")}
        </p>
        <span aria-hidden className="m-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent-soft text-accent">
          <ArrowRight size={15} strokeWidth={1.75} />
        </span>
      </div>
    </div>
  );
}

export function AiReply() {
  const { t } = useTranslation();
  return (
    <div data-ui className="flex gap-3">
      <span aria-hidden className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-soft-bg text-accent">
        <Sparkles size={14} strokeWidth={1.5} />
      </span>
      <p className="rounded-lg rounded-tl-sm border border-line-soft bg-surface-2 px-4 py-3 text-sm text-ink">{t("ai.reply")}</p>
    </div>
  );
}

export function BriefingCard() {
  const { t } = useTranslation();
  return (
    <div data-ui className="ui-panel p-5">
      <div className="mb-3 flex items-center justify-between">
        <p className="flex items-center gap-2 text-sm font-semibold text-ink">
          <Sparkles size={16} strokeWidth={1.5} aria-hidden className="text-accent" />
          {t("ai.briefingTitle")}
        </p>
        <span className="text-xs text-ink-muted">{t("ai.briefingRegenerate")}</span>
      </div>
      <p className="text-sm text-ink-muted">{t("ai.briefingBody")}</p>
    </div>
  );
}

export function TodayRows() {
  const { t } = useTranslation();
  const rows = [
    { k: "task1", meta: "task1meta", mono: true },
    { k: "task2", meta: "task2meta" },
    { k: "task3", meta: "task3meta" },
  ];
  return (
    <div data-ui className="ui-panel p-2">
      <p className="px-3 pb-1 pt-2 text-eyebrow uppercase text-ink-subtle">{t("ai.tasksTitle")}</p>
      <ul>
        {rows.map((r, i) => (
          <li key={r.k} className={`flex items-center gap-3 px-3 py-2 ${i > 0 ? "border-t border-line-soft" : ""}`}>
            <span aria-hidden className="h-[6px] w-[6px] shrink-0 rounded-full bg-accent" />
            <span className="flex-1 truncate text-sm text-ink">{t(`ai.${r.k}`)}</span>
            <span className={`text-xs text-ink-subtle ${r.mono ? "font-mono tabular-nums" : ""}`}>{t(`ai.${r.meta}`)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Focus: dashboard stat tiles (Due today / Projects / In progress / Overdue) ── */
export function StatTiles() {
  const { t } = useTranslation();
  const strip = [
    { label: t("groups.focus.dashboard.projects"), sub: t("groups.focus.dashboard.projectsSub"), value: 6 },
    { label: t("groups.focus.dashboard.inProgress"), sub: t("groups.focus.dashboard.inProgressSub"), value: 0 },
    { label: t("groups.focus.dashboard.overdue"), sub: t("groups.focus.dashboard.overdueSub"), value: 6, danger: true },
  ];
  return (
    <div data-ui className="grid gap-3 md:grid-cols-[1.6fr_1fr]">
      <div className="flex flex-col rounded-lg border border-line bg-surface-2 p-5">
        <div className="mb-4 flex items-baseline justify-between">
          <span className="text-eyebrow uppercase text-ink-subtle">{t("groups.focus.dashboard.due")}</span>
          <span className="font-mono text-[2.75rem] font-medium leading-none tabular-nums text-ink">05</span>
        </div>
        <ul>
          {["d1", "d2"].map((k, i) => (
            <li key={k} className={`flex items-center gap-2 py-2 ${i > 0 ? "border-t border-line-soft" : ""}`}>
              <span aria-hidden className="h-[6px] w-[6px] shrink-0 rounded-full bg-accent" />
              <span className="truncate text-sm text-ink-muted">{t(`groups.focus.dashboard.${k}`)}</span>
            </li>
          ))}
        </ul>
        <p className="pt-1 text-xs text-ink-subtle">{t("groups.focus.dashboard.more")}</p>
      </div>
      <ul className="flex flex-col gap-2">
        {strip.map((row) => (
          <li key={row.label} className="flex flex-1 items-center justify-between rounded-md border border-line-soft bg-surface-sunken px-4 py-3">
            <div>
              <p className="text-sm text-ink-muted">{row.label}</p>
              <p className="text-xs text-ink-subtle">{row.sub}</p>
            </div>
            <span className={`font-mono text-xl font-medium tabular-nums ${row.danger ? "text-danger" : "text-ink"}`}>
              {String(row.value).padStart(2, "0")}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Notifications stack ── */
export function NotificationStack() {
  const { t } = useTranslation();
  const items = [
    { title: t("groups.focus.reminders.n1title"), body: t("groups.focus.reminders.n1"), time: t("groups.focus.reminders.now") },
    { title: t("groups.focus.reminders.n2title"), body: t("groups.focus.reminders.n2"), time: t("groups.focus.reminders.ago") },
  ];
  return (
    <ul data-ui className="space-y-2">
      {items.map((n, i) => (
        <li
          key={n.title}
          className={`flex gap-3 rounded-lg border border-line bg-surface-2 p-3 ${i === 1 ? "mx-3 bg-surface-1" : "shadow-float"}`}
        >
          <span aria-hidden className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent-soft-bg">
            <img src="/img/s-mark.webp" alt="" width={10} height={16} loading="lazy" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-2">
              <p className="flex items-center gap-1 text-sm font-semibold text-ink">
                <Bell size={12} strokeWidth={1.75} aria-hidden className="text-accent" />
                {n.title}
              </p>
              <span className="text-xs text-ink-subtle">{n.time}</span>
            </div>
            <p className="truncate text-sm text-ink-muted">{n.body}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

/* ── Morning briefing / evening summary pair ── */
export function BriefingPair() {
  const { t } = useTranslation();
  return (
    <div data-ui className="space-y-2">
      <div className="ui-panel p-4">
        <p className="mb-1 flex items-center gap-2 text-sm font-semibold text-ink">
          <Sun size={14} strokeWidth={1.5} aria-hidden className="text-progress-week" />
          {t("groups.focus.briefing.morning")}
          <span className="ml-auto font-mono text-xs font-normal text-ink-subtle">07:00</span>
        </p>
        <p className="text-sm text-ink-muted">{t("groups.focus.briefing.line")}</p>
      </div>
      <div className="ui-panel flex items-center gap-2 p-4">
        <Moon size={14} strokeWidth={1.5} aria-hidden className="text-progress-month" />
        <p className="text-sm font-semibold text-ink">{t("groups.focus.briefing.evening")}</p>
        <span className="ml-auto font-mono text-xs text-ink-subtle">21:00</span>
      </div>
    </div>
  );
}

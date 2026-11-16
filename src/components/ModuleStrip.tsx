import { useTranslation } from "react-i18next";
import { CheckSquare, FolderKanban, CalendarDays, CircleCheck, Dumbbell, PenLine, Sparkles, type LucideIcon } from "lucide-react";

const MODULES: { key: string; icon: LucideIcon }[] = [
  { key: "tasks", icon: CheckSquare },
  { key: "projects", icon: FolderKanban },
  { key: "calendar", icon: CalendarDays },
  { key: "habits", icon: CircleCheck },
  { key: "gym", icon: Dumbbell },
  { key: "whiteboards", icon: PenLine },
  { key: "ai", icon: Sparkles },
];

function Item({ k, Icon, hidden }: { k: string; Icon: LucideIcon; hidden?: boolean }) {
  const { t } = useTranslation();
  return (
    <li aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-2 text-ink-muted">
      <Icon size={18} strokeWidth={1.5} aria-hidden className="text-ink-subtle" />
      <span className="text-sm font-medium">{t(`strip.${k}`)}</span>
    </li>
  );
}

export function ModuleStrip() {
  const { t } = useTranslation();
  return (
    <section id="features" aria-label={t("strip.label")} className="pt-11 md:pt-12">
      {/* Desktop: one quiet, evenly spaced row */}
      <div className="container-page reveal hidden md:block">
        <ul className="flex items-center justify-between gap-6 px-4 lg:px-9">
          {MODULES.map(({ key, icon }) => (
            <Item key={key} k={key} Icon={icon} />
          ))}
        </ul>
      </div>

      {/* Mobile: slow marquee (static under reduced motion) */}
      <div className="reveal relative overflow-hidden md:hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
        <ul className="marquee-track flex w-max gap-8 pr-8">
          {[...MODULES, ...MODULES].map(({ key, icon }, i) => (
            <Item key={`${key}-${i}`} k={key} Icon={icon} hidden={i >= MODULES.length} />
          ))}
        </ul>
      </div>

      <p className="reveal container-page mt-8 text-center text-sm text-ink-subtle" style={{ ["--i" as string]: 1 }}>
        {t("strip.line")}
      </p>
    </section>
  );
}

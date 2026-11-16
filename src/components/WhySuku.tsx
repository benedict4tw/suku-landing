import { useTranslation } from "react-i18next";
import { Smartphone, Languages, BellRing, CalendarDays, Sparkles, Zap, type LucideIcon } from "lucide-react";

const ITEMS: { key: string; icon: LucideIcon }[] = [
  { key: "pwa", icon: Smartphone },
  { key: "lang", icon: Languages },
  { key: "remind", icon: BellRing },
  { key: "gcal", icon: CalendarDays },
  { key: "ai", icon: Sparkles },
  { key: "fast", icon: Zap },
];

export function WhySuku() {
  const { t } = useTranslation();
  return (
    <section aria-labelledby="why-title" className="container-page pt-section">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
        <header>
          <h2 id="why-title" className="reveal text-h2 text-ink">
            {t("why.title")}
            <em className="accent-word">{t("why.titleEm")}</em>
          </h2>
          <p className="reveal mt-4 max-w-[32ch] text-lead text-ink-muted" style={{ ["--i" as string]: 1 }}>
            {t("why.sub")}
          </p>
        </header>
        <ul className="grid gap-x-10 gap-y-12 sm:grid-cols-2 md:grid-cols-3">
          {ITEMS.map(({ key, icon: Icon }, i) => (
            <li key={key} className="reveal border-t border-line-soft pt-6" style={{ ["--i" as string]: i % 3 }}>
              <Icon size={20} strokeWidth={1.5} aria-hidden className="text-accent" />
              <h3 className="mt-4 font-sans text-base font-semibold text-ink">{t(`why.${key}.title`)}</h3>
              <p className="mt-2 text-sm text-ink-muted">{t(`why.${key}.body`)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

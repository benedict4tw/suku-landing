import { useTranslation } from "react-i18next";

/** Segmented EN/DE toggle, styled like the one in the app's top bar. */
export function LangToggle({ className = "" }: { className?: string }) {
  const { i18n, t } = useTranslation();
  const current = i18n.resolvedLanguage === "de" ? "de" : "en";
  return (
    <div role="group" aria-label={t("nav.language")} className={`inline-flex rounded-md bg-surface-1 p-1 ${className}`}>
      {(["en", "de"] as const).map((lng) => {
        const active = current === lng;
        return (
          <button
            key={lng}
            type="button"
            lang={lng}
            aria-label={lng === "en" ? "English" : "Deutsch"}
            aria-pressed={active}
            onClick={() => i18n.changeLanguage(lng)}
            className={`min-h-[32px] min-w-[40px] rounded-sm px-2 text-xs font-semibold uppercase tracking-[0.04em] transition-colors duration-fast ease-out ${
              active ? "bg-accent-soft-bg text-accent-text" : "text-ink-subtle hover:text-ink-muted"
            }`}
          >
            {lng}
          </button>
        );
      })}
    </div>
  );
}

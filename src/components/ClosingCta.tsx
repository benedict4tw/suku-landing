import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "../lib/links";

export function ClosingCta() {
  const { t } = useTranslation();
  return (
    <section aria-labelledby="cta-title" className="container-page pt-section">
      <div className="card reveal relative isolate overflow-hidden px-6 pb-12 pt-11 text-center md:px-10 md:pb-13 md:pt-13">
        <div aria-hidden className="hero-grid -z-10 opacity-70" />
        <div aria-hidden className="bloom -z-10" />
        <h2 id="cta-title" className="reveal mx-auto max-w-[16ch] text-display text-ink" style={{ ["--i" as string]: 1 }}>
          {t("cta.titleA")}
          <em className="accent-word">{t("cta.titleEm")}</em>
          {t("cta.titleB")}
        </h2>
        <p className="reveal mx-auto mt-5 max-w-[44ch] text-lead text-ink-muted" style={{ ["--i" as string]: 2 }}>
          {t("cta.sub")}
        </p>
        <a href={APP_URL} className="btn btn-paper reveal mt-8" style={{ ["--i" as string]: 3 }}>
          {t("cta.button")}
          <ArrowRight size={16} strokeWidth={1.75} aria-hidden />
        </a>
      </div>
    </section>
  );
}

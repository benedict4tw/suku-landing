import { useTranslation } from "react-i18next";
import { APP_URL } from "../lib/links";

export function ClosingCta() {
  const { t } = useTranslation();
  return (
    <section aria-labelledby="cta-title" className="container-page pt-section">
      <div className="card reveal relative isolate overflow-hidden px-6 pb-16 pt-16 text-center md:px-10 md:pb-24 md:pt-24">
        <div aria-hidden className="hero-grid -z-10 opacity-70" />
        <div aria-hidden className="bloom bloom-card -z-10" />
        <h2 id="cta-title" className="reveal mx-auto text-display text-ink" style={{ ["--i" as string]: 1 }}>
          <span className="inline-block">{t("cta.titleA").trim()}</span>{" "}
          <span className="inline-block">
            <em className="accent-word">{t("cta.titleEm")}</em>
            {t("cta.titleB")}
          </span>
        </h2>
        <p className="reveal mx-auto mt-6 max-w-[44ch] text-lead text-ink-muted" style={{ ["--i" as string]: 2 }}>
          {t("cta.sub")}
        </p>
        <a href={APP_URL} className="btn btn-paper reveal mt-12" style={{ ["--i" as string]: 3 }}>
          {t("cta.button")}
        </a>
      </div>
    </section>
  );
}

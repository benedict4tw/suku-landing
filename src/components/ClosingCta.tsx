import { useTranslation } from "react-i18next";
import { APP_URL } from "../lib/links";
import { RequestAccessLink } from "./RequestAccess";

export function ClosingCta() {
  const { t } = useTranslation();
  return (
    <section id="access" aria-labelledby="cta-title" className="container-page pt-section">
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
        <div className="reveal mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row" style={{ ["--i" as string]: 3 }}>
          <a href={APP_URL} className="btn btn-paper">
            {t("cta.button")}
          </a>
          <RequestAccessLink className="btn border border-line bg-[color-mix(in_srgb,var(--bg)_72%,transparent)] text-ink hover:border-line-strong">
            {t("cta.access")}
          </RequestAccessLink>
        </div>
        <p className="reveal mt-4 text-xs text-ink" style={{ ["--i" as string]: 4 }}>
          {t("cta.accessNote")}
        </p>
      </div>
    </section>
  );
}

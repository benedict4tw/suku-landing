import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "../lib/links";
import { AskSukuInput, AiReply, BriefingCard, TodayRows } from "./fragments/AiFragments";

export function AiShowcase() {
  const { t } = useTranslation();
  return (
    <section id="ai" aria-labelledby="ai-title" className="container-page pt-section">
      <div className="card card-glow reveal grid grid-cols-1 gap-10 p-6 md:p-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12 lg:p-12">
        <div className="flex min-w-0 flex-col justify-center">
          <p className="eyebrow reveal" style={{ ["--i" as string]: 1 }}>{t("ai.eyebrow")}</p>
          <h2 id="ai-title" className="reveal mt-4 text-h2 text-ink" style={{ ["--i" as string]: 2 }}>
            {t("ai.titleA")}
            <em className="accent-word">{t("ai.titleEm")}</em>
          </h2>
          <p className="reveal mt-8 max-w-[46ch] text-lead text-ink-muted" style={{ ["--i" as string]: 3 }}>{t("ai.body")}</p>
          <p className="reveal mt-4 max-w-[46ch] text-base text-ink-muted" style={{ ["--i" as string]: 4 }}>{t("ai.body2")}</p>
          <a href={APP_URL} className="link-accent reveal mt-12 inline-flex items-center gap-2 self-start text-sm" style={{ ["--i" as string]: 5 }}>
            {t("ai.cta")}
            <ArrowRight size={16} strokeWidth={1.75} aria-hidden />
          </a>
        </div>

        {/* Floating fragments rebuilt in HTML with the app's tokens */}
        <div className="relative flex min-w-0 flex-col gap-4 lg:py-8">
          <div className="reveal" style={{ ["--i" as string]: 2 }}>
            <AskSukuInput filled />
          </div>
          <div className="reveal md:ml-10" style={{ ["--i" as string]: 3 }}>
            <AiReply />
          </div>
          <div className="reveal" style={{ ["--i" as string]: 4 }}>
            <BriefingCard />
          </div>
          <div className="reveal md:ml-10" style={{ ["--i" as string]: 5 }}>
            <TodayRows />
          </div>
        </div>
      </div>
    </section>
  );
}

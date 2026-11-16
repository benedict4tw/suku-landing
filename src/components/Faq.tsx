import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";

export function Faq() {
  const { t } = useTranslation();
  const ids = [1, 2, 3, 4, 5, 6];
  return (
    <section id="faq" aria-labelledby="faq-title" className="container-page pt-section">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
        <h2 id="faq-title" className="reveal text-h2 text-ink lg:sticky lg:top-28 lg:self-start">
          {t("faq.title")} <em className="accent-word">{t("faq.titleEm")}</em>
        </h2>
        <div className="reveal border-b border-line-soft" style={{ ["--i" as string]: 1 }}>
          {ids.map((n) => (
            <details key={n} name="faq" className="faq-item group border-t border-line-soft" open={n === 1}>
              <summary className="flex min-h-[64px] items-center justify-between gap-8 rounded-sm py-6 text-lead font-medium text-ink transition-colors duration-fast ease-out hover:text-accent-text">
                {t(`faq.q${n}`)}
                <span aria-hidden className="faq-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-ink-muted">
                  <Plus size={16} strokeWidth={1.5} />
                </span>
              </summary>
              <p className="faq-answer max-w-[62ch] pb-8 pr-14 text-base text-ink-muted">{t(`faq.a${n}`)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

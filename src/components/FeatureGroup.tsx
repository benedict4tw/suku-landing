import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import type { LucideIcon } from "lucide-react";

export interface BentoCard {
  key: string;
  title: string;
  body: string;
  ui: ReactNode;
}

interface Props {
  id: string;
  ns: string; // i18n namespace, e.g. groups.plan
  wide: BentoCard;
  small: [BentoCard, BentoCard];
  captions: { icon: LucideIcon; key: string }[];
  /** Put the UI to the right of the copy in the wide card (default) or below on mobile */
}

function CardCopy({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="font-sans text-lead font-semibold text-ink">{title}</h3>
      <p className="mt-2 max-w-[40ch] text-sm text-ink-muted">{body}</p>
    </div>
  );
}

export function FeatureGroup({ id, ns, wide, small, captions }: Props) {
  const { t } = useTranslation();
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="container-page pt-section">
      <header className="mx-auto max-w-[720px] text-center">
        <h2 id={`${id}-title`} className="reveal text-h2 text-ink">
          {t(`${ns}.title`)} <em className="accent-word">{t(`${ns}.titleEm`)}</em>
        </h2>
        <p className="reveal mt-4 text-lead text-ink-muted" style={{ ["--i" as string]: 1 }}>
          {t(`${ns}.sub`)}
        </p>
      </header>

      <div className="mt-16 grid grid-cols-1 gap-4 md:mt-20 md:grid-cols-2 md:gap-6">
        {/* Wide glow card */}
        <article className="card card-glow reveal grid min-w-0 grid-cols-1 gap-12 p-8 md:col-span-2 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-center md:p-20">
          <CardCopy title={wide.title} body={wide.body} />
          <div className="min-w-0">{wide.ui}</div>
        </article>

        {small.map((c, i) => (
          <article key={c.key} className="card reveal flex min-w-0 flex-col gap-12 p-8 md:p-12" style={{ ["--i" as string]: i + 1 }}>
            <CardCopy title={c.title} body={c.body} />
            <div className="mt-auto min-w-0">{c.ui}</div>
          </article>
        ))}
      </div>

      <ul className="mt-12 grid gap-6 sm:grid-cols-3 sm:gap-8 md:mt-16">
        {captions.map(({ icon: Icon, key }, i) => (
          <li key={key} className="reveal flex items-start gap-3 text-sm text-ink-muted" style={{ ["--i" as string]: i }}>
            <Icon size={18} strokeWidth={1.5} aria-hidden className="mt-[2px] shrink-0 text-accent" />
            {t(`${ns}.${key}`)}
          </li>
        ))}
      </ul>
    </section>
  );
}

import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "../lib/links";

export function Hero() {
  const { t } = useTranslation();

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-[128px] md:pt-[152px]">
      {/* Background: hairline grid with hollow nodes, faded toward the edges */}
      <div aria-hidden className="hero-grid -z-10" />
      <div aria-hidden className="hero-grid-nodes -z-10" />
      {/* The one loud thing: violet bloom rising from the bottom edge */}
      <div aria-hidden className="bloom -z-10" />
      <div aria-hidden className="bloom-edge -z-10" />

      <div className="container-page flex flex-col items-center text-center">
        <a
          href="#ai"
          className="hero-in group inline-flex items-center gap-2 rounded-full border border-line-soft bg-accent-soft-bg py-1 pl-1 pr-3 text-xs text-ink-muted transition-colors duration-fast ease-out hover:border-line hover:text-ink"
          style={{ ["--i" as string]: 0 }}
        >
          <span className="rounded-full bg-accent-fill px-2 py-[2px] text-xs font-semibold text-accent-on">{t("hero.badgeChip")}</span>
          <span>{t("hero.badge")}</span>
          <ArrowRight size={14} strokeWidth={1.5} aria-hidden className="text-ink-subtle transition-transform duration-fast ease-out group-hover:translate-x-[2px]" />
        </a>

        <h1
          id="hero-title"
          className="hero-in mt-6 max-w-[14ch] text-display font-semibold text-ink md:max-w-none"
          style={{ ["--i" as string]: 1 }}
        >
          <span className="block">{t("hero.titleA")}</span>
          <span className="block">
            {t("hero.titleB1")}
            <em className="accent-word">{t("hero.titleEm")}</em>
            {t("hero.titleB2")}
          </span>
        </h1>

        <p className="hero-in mt-6 max-w-[600px] text-lead text-ink-muted" style={{ ["--i" as string]: 2 }}>
          {t("hero.sub")}
        </p>

        <div className="hero-in mt-12 flex flex-col items-center gap-3 sm:flex-row" style={{ ["--i" as string]: 3 }}>
          <a href={APP_URL} className="btn btn-paper">
            {t("hero.cta")}
            <ArrowRight size={16} strokeWidth={1.75} aria-hidden />
          </a>
          <a href="#features" className="btn btn-ghost">
            {t("hero.secondary")}
          </a>
        </div>
        <p className="hero-in mt-3 text-xs text-ink-subtle" style={{ ["--i" as string]: 4 }}>
          {t("hero.note")}
        </p>
      </div>

      {/* Product shot, cropped by the bottom of the hero */}
      <div className="container-page relative mt-20 md:mt-32">
        {/* Bloom spilling behind the frame */}
        <div aria-hidden className="bloom-frame" />
        <div className="hero-shot-in relative mx-auto h-[clamp(240px,58vw,600px)] max-w-[1120px] overflow-hidden md:h-[clamp(360px,46vw,640px)]">
          <div className="frame rounded-b-none border-b-0 pb-0">
            <div className="frame-inner rounded-b-none border-b-0">
              <picture>
                <source
                  media="(max-width: 767px)"
                  type="image/avif"
                  srcSet="/img/hero-m-640.avif 640w, /img/hero-m-1080.avif 1080w"
                  sizes="calc(100vw - 32px)"
                  width={1080}
                  height={567}
                />
                <source
                  media="(max-width: 767px)"
                  type="image/webp"
                  srcSet="/img/hero-m-640.webp 640w, /img/hero-m-1080.webp 1080w"
                  sizes="calc(100vw - 32px)"
                  width={1080}
                  height={567}
                />
                <source
                  type="image/avif"
                  srcSet="/img/hero-960.avif 960w, /img/hero-1440.avif 1440w, /img/hero-2160.avif 2160w"
                  sizes="(min-width: 1184px) 1104px, calc(100vw - 80px)"
                />
                <source
                  type="image/webp"
                  srcSet="/img/hero-960.webp 960w, /img/hero-1440.webp 1440w, /img/hero-2160.webp 2160w"
                  sizes="(min-width: 1184px) 1104px, calc(100vw - 80px)"
                />
                <img
                  src="/img/hero-1440.webp"
                  alt={t("hero.shotAlt")}
                  width={1440}
                  height={898}
                  fetchPriority="high"
                  decoding="async"
                  className="block h-auto w-full"
                />
              </picture>
            </div>
          </div>
        </div>
      </div>
      {/* Hairline that the shot is cropped against */}
      <div aria-hidden className="relative h-px bg-line-soft" />
    </section>
  );
}

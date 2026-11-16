import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { APP_URL } from "../lib/links";

export function Footer() {
  const { t } = useTranslation();
  const linkCls = "text-sm text-ink-muted transition-colors duration-fast ease-out hover:text-ink";
  return (
    <footer className="container-page mt-section pb-12">
      <div className="grid grid-cols-2 gap-10 pb-16 md:grid-cols-[minmax(0,6fr)_minmax(0,3fr)_minmax(0,3fr)]">
        <div>
          <a href="/" aria-label={t("nav.home")} className="inline-block rounded-sm">
            <Logo />
          </a>
          <p className="mt-4 max-w-[36ch] text-sm text-ink-muted">{t("footer.tagline")}</p>
        </div>
        <nav aria-labelledby="f-product">
          <h2 id="f-product" className="eyebrow">{t("footer.product")}</h2>
          <ul className="mt-4 space-y-3">
            <li><a href="/#features" className={linkCls}>{t("footer.features")}</a></li>
            <li><a href={APP_URL} className={linkCls}>{t("footer.demo")}</a></li>
            <li><a href={APP_URL} className={linkCls}>{t("footer.login")}</a></li>
          </ul>
        </nav>
        <nav aria-labelledby="f-legal">
          <h2 id="f-legal" className="eyebrow">{t("footer.legal")}</h2>
          <ul className="mt-4 space-y-3">
            <li><Link to="/impressum" className={linkCls}>{t("footer.impressum")}</Link></li>
            <li><Link to="/datenschutz" className={linkCls}>{t("footer.privacy")}</Link></li>
          </ul>
        </nav>
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-line-soft pt-8">
        <p className="text-xs text-ink-subtle">{t("footer.copyright")}</p>
        <p className="text-xs text-ink-subtle">
          {t("footer.builtBy")} <span className="text-ink-muted">Benedict Donkor</span>
        </p>
      </div>
    </footer>
  );
}

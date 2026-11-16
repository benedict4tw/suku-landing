import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/*
 * TODO(owner): Impressum and Datenschutz are legally required for a German site.
 * Replace the placeholder text below with the real content (name, address,
 * contact, responsible person per § 5 DDG / Art. 13 DSGVO, hosting: Vercel,
 * analytics: Vercel Analytics).
 */
export function Legal({ kind }: { kind: "impressum" | "privacy" }) {
  const { t } = useTranslation();
  const title = kind === "impressum" ? t("legal.impressumTitle") : t("legal.privacyTitle");
  useEffect(() => {
    document.title = `${title} · Suku`;
    window.scrollTo(0, 0);
  }, [title]);
  return (
    <section aria-labelledby="legal-title" className="container-page min-h-[70vh] pt-40">
      <Link to="/" className="link-accent inline-flex items-center gap-2 text-sm">
        <ArrowLeft size={16} strokeWidth={1.75} aria-hidden />
        {t("legal.back")}
      </Link>
      <h1 id="legal-title" className="mt-12 text-h2 text-ink">{title}</h1>
      <div className="mt-12 max-w-[62ch] space-y-4 text-base text-ink-muted">
        <p>{t("legal.placeholder")}</p>
        <p>{t("legal.contact")}</p>
      </div>
    </section>
  );
}

export function NotFound() {
  const { t } = useTranslation();
  return (
    <section className="container-page min-h-[70vh] pt-40">
      <h1 className="text-h2 text-ink">{t("notFound.title")}</h1>
      <Link to="/" className="link-accent mt-8 inline-flex text-sm">{t("notFound.back")}</Link>
    </section>
  );
}

/** Old routes from the previous site (/demo, /access) now hand off to the app. */
export function ToApp() {
  useEffect(() => {
    window.location.replace("https://suku.ink");
  }, []);
  return null;
}

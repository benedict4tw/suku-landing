import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { LangToggle } from "./LangToggle";
import { APP_URL } from "../lib/links";

export function Nav() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = [
    { href: "/#features", label: t("nav.features") },
    { href: "/#how", label: t("nav.how") },
    { href: "/#faq", label: t("nav.faq") },
  ];

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-nav transition-[background-color,border-color] duration-base ease-out ${
        solid ? "border-b border-line-soft bg-[color-mix(in_srgb,var(--bg)_80%,transparent)] backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Main" className="container-page flex h-[72px] items-center justify-between gap-8">
        <a href="/" aria-label={t("nav.home")} className="rounded-sm">
          <Logo />
        </a>

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="rounded-full px-4 py-2 text-sm text-ink-muted transition-colors duration-fast ease-out hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <LangToggle className="mr-2" />
          <a href={APP_URL} className="btn btn-accent btn-sm">
            {t("nav.demo")}
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
        <a href={APP_URL} className="btn btn-accent btn-sm hidden sm:inline-flex">
          {t("nav.demo")}
        </a>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md text-ink-muted hover:text-ink"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? t("nav.close") : t("nav.menu")}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} strokeWidth={1.5} aria-hidden /> : <Menu size={22} strokeWidth={1.5} aria-hidden />}
        </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="container-page border-t border-line-soft pb-8 pt-4 lg:hidden">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line-soft py-4 text-lead text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-center justify-between gap-4">
            <LangToggle />
            <a href={APP_URL} className="btn btn-accent btn-sm">
              {t("nav.demo")}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

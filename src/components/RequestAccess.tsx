import { useEffect, useRef, type AnchorHTMLAttributes } from "react";
import { useTranslation } from "react-i18next";
import { accessMailto } from "../lib/access";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

/** "Request access": prefilled email in the active language. */
export function RequestAccessLink({ children, onClick, ...rest }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { t, i18n } = useTranslation();
  const build = () => accessMailto(t("access.subject"), t("access.body"));

  // Real mailto href after hydration (works for click, keyboard, copy link).
  useEffect(() => {
    if (ref.current) ref.current.href = accessMailto(t("access.subject"), t("access.body"));
  }, [t, i18n.language]);

  return (
    <a
      ref={ref}
      href="#access"
      onClick={(e) => {
        onClick?.(e);
        const href = build();
        if (ref.current) ref.current.href = href;
        e.preventDefault();
        window.location.href = href;
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

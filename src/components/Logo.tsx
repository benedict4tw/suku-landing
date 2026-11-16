/** The violet "S" mark from the app (s-mark-transparent.png), plus wordmark. */
export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <picture>
      <source srcSet="/img/s-mark.webp" type="image/webp" />
      <img src="/img/s-mark.png" alt="" width={Math.round(size * 0.625)} height={size} decoding="async" />
    </picture>
  );
}

export function Logo() {
  return (
    <span className="inline-flex items-center gap-2">
      <LogoMark />
      <span className="font-display text-wordmark font-semibold text-ink">Suku</span>
    </span>
  );
}

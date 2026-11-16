/** @type {import('tailwindcss').Config} */
// Every value maps to a CSS variable in src/styles/tokens.css. Don't add raw hex here.
const v = (name) => `var(--${name})`;

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      bg: v("bg"),
      surface: {
        1: v("surface-1"),
        2: v("surface-2"),
        3: v("surface-3"),
        sunken: v("surface-sunken"),
      },
      line: {
        DEFAULT: v("border"),
        soft: v("border-soft"),
        strong: v("border-strong"),
      },
      ink: {
        DEFAULT: v("text"),
        muted: v("text-muted"),
        subtle: v("text-subtle"),
      },
      accent: {
        DEFAULT: v("accent"),
        hover: v("accent-hover"),
        text: v("accent-text"),
        fill: v("accent-fill"),
        "fill-hover": v("accent-fill-hover"),
        soft: v("accent-soft"),
        "soft-bg": v("accent-soft-bg"),
        on: v("on-accent"),
      },
      paper: { DEFAULT: v("paper"), hover: v("paper-hover"), on: v("on-paper") },
      progress: {
        year: v("progress-year"),
        "year-ink": v("progress-year-ink"),
        month: v("progress-month"),
        week: v("progress-week"),
        track: v("progress-track"),
      },
      danger: v("danger"),
      success: v("success"),
    },
    fontFamily: {
      display: v("font-display"),
      sans: v("font-sans"),
      mono: v("font-mono"),
    },
    fontSize: {
      eyebrow: [v("text-eyebrow"), { lineHeight: "1.4", letterSpacing: v("tracking-eyebrow") }],
      "2xs": [v("text-2xs"), { lineHeight: "1.3" }],
      xs: [v("text-xs"), { lineHeight: "1.45" }],
      sm: [v("text-sm"), { lineHeight: "1.55" }],
      base: [v("text-body"), { lineHeight: v("leading-body") }],
      lead: [v("text-lead"), { lineHeight: v("leading-body") }],
      h3: [v("text-h3"), { lineHeight: v("leading-heading"), letterSpacing: "-0.02em" }],
      h2: [v("text-h2"), { lineHeight: v("leading-heading"), letterSpacing: v("tracking-display") }],
      stat: [v("text-stat"), { lineHeight: "1" }],
      wordmark: [v("text-wordmark"), { lineHeight: "1", letterSpacing: "-0.02em" }],
      display: [v("text-display"), { lineHeight: v("leading-display"), letterSpacing: v("tracking-display") }],
    },
    borderRadius: {
      none: "0",
      xs: v("radius-xs"),
      sm: v("radius-sm"),
      md: v("radius-md"),
      lg: v("radius-lg"),
      xl: v("radius-xl"),
      "2xl": v("radius-2xl"),
      full: v("radius-full"),
    },
    extend: {
      // Default 4px spacing scale, used in even steps only (8px grid). Semantic extras below.
      spacing: { section: v("section-gap"), gutter: v("gutter") },
      maxWidth: { content: v("content-max") },
      boxShadow: {
        glow: v("glow-accent"),
        "glow-soft": v("glow-soft"),
        inner: v("inner-highlight"),
        float: v("shadow-float"),
      },
      transitionTimingFunction: { out: v("ease-out") },
      transitionDuration: { fast: "160ms", base: "240ms" },
      zIndex: { nav: v("z-nav") },
    },
  },
  plugins: [],
};

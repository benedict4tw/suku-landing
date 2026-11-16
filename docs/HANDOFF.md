# Handoff Spec: suku.live landing

## Overview
The marketing page for Suku. Its single job is to explain the product and send people to the app at **https://suku.ink** with the "Try the demo" CTA. It shares a CI with the app, so the jump from landing to app should not feel like a design break.

Stack: Vite + React 19 + TypeScript + Tailwind 3 + i18next. The pages are prerendered to static HTML at build time and then hydrated. Deployed on Vercel (project `suku-landing`).

## Layout
- Content max width `--content-max` (1200px), centered with `.container-page`, side gutter `--gutter` (16 → 32px fluid).
- Gap between sections: `pt-section` = `--section-gap` (96 → 160px fluid).
- Spacing: Tailwind's 4px scale, used in 8px steps only.
- Breakpoints (Tailwind defaults): `sm` 640, `md` 768, `lg` 1024.

## Design tokens used
All tokens live in `src/styles/tokens.css` and are mapped in `tailwind.config.js`. Never hardcode a color outside `tokens.css` (the audit currently finds zero).

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#100e0c` | Page background (warm, never `#000`) |
| `--surface-1/2/3`, `--surface-sunken` | `#18150f` / `#211d16` / `#2b251c` / `#141210` | Cards and mini-UI steps |
| `--border`, `--border-soft`, `--border-strong` | warm grey at 24 / 14 / 40% | 1px hairlines; `strong` on card hover |
| `--text` / `--text-soft` / `--text-muted` / `--text-subtle` | `#f4efe6` / `#b6a99a` / `#a39686` / `#8f8577` | Headings / text over glow or grid / body / captions (all AA on `--bg`) |
| `--accent` | `#7c6cf0` | Icons, bullets, bars, glow, focus ring |
| `--accent-text` | `#9084f5` | Links |
| `--accent-fill` (+ `-hover`) | `#6a5ae0` | Solid violet button with a white label (5.1:1) |
| `--paper` / `--on-paper` | `#f4efe6` / `#100e0c` | Primary hero and CTA button |
| `--progress-year/month/week` | `#9b6ba8` / `#5c87c4` / `#d79a3c` | Year/Month/Week bars (same as the app) |
| `--danger` | `#e2694b` | Overdue count |
| `--font-display` | Fraunces | `h1`–`h3`; exactly one `em.accent-word` (italic) per headline |
| `--font-sans` | Inter | UI and body |
| `--font-mono` | JetBrains Mono 500 | Every number |
| `text-display` / `text-h2` / `text-lead` | 34→88 / 36→64 / 17→20px | Hero / section titles / sublines |
| Radii | `xs` 5 · `sm` 8 · `md` 12 · `lg` 16 · `xl` 22 · `2xl` 28 · `full` | Mini-UI / chips / rows / app cards / input / section cards / pills |
| `--ease-out` | `cubic-bezier(.23,1,.32,1)` | Every transition |
| Glow recipe | `--accent-rgb` → `--accent-deep-rgb` → `--accent-deeper-rgb` (with a hint of `--mauve-rgb`) | Blooms and glow cards; radial gradients only, **no CSS `filter: blur`** (it cost 4s of mobile blocking time) |

## Components
| Component | File | Notes |
|---|---|---|
| Nav | `components/Nav.tsx` | Fixed header. Below `lg`: menu button plus a sheet (and a "Try the demo" button from `sm`). Escape closes the sheet. |
| Hero | `components/Hero.tsx` | Grid and nodes (`.hero-grid`, `.hero-grid-nodes`), blooms (`.bloom`, `.bloom-edge`, `.bloom-frame`), framed `<picture>` (separate mobile crop below 768px) |
| ModuleStrip | `components/ModuleStrip.tsx` | Static row from `lg`; marquee below (a duplicate set marked `aria-hidden`) |
| AiShowcase | `components/AiShowcase.tsx` | `.card-glow` with the AI fragments |
| FeatureGroup | `components/FeatureGroup.tsx` | Title, sub, bento (wide glow card plus two cards), three captions. Configured in `FeatureGroups.tsx` |
| Fragments | `components/fragments/*` | App-faithful mini-UIs marked `data-ui`; text lives in the locales |
| WhySuku, Faq, ClosingCta, Footer | `components/*` | The FAQ uses `<details name="faq">`, so only one item is open at a time |
| LangToggle | `components/LangToggle.tsx` | Segmented EN/DE with `aria-pressed`; writes localStorage and the `suku_lang` cookie |

## States and interactions
| Element | State | Behavior |
|---|---|---|
| `.btn-paper` | hover / active | Background goes to `--paper-hover` with `--glow-accent`; scale 0.97 on press |
| `.btn-accent` | hover / active | `--accent-fill-hover` plus a soft violet glow; scale 0.97 |
| `.card` | hover | Border moves to `--border-strong` |
| Task row (Plan) | click, Space | Toggles done: box fills with accent, tick scales in, label gets a strikethrough |
| FAQ summary | click, Enter | Opens one item and closes the others; `+` rotates to `×` |
| Any focusable element | focus-visible | 2px `--accent` outline, 3px offset |
| Progress bars | mount | Computed from the visitor's date after mount (the prerendered HTML ships 0%) |

## Responsive behavior
| Breakpoint | Changes |
|---|---|
| ≥1024 (`lg`) | Full nav; bento grid with the wide card split 5/7; Why and FAQ in two columns |
| 768–1023 | Menu button plus demo button; cards stacked full width; module marquee |
| <768 | Hero uses the mobile screenshot crop; hero grid masked away from the copy; footer columns 2-up |
| 320 | Supported; the DE hero headline wraps to 3 lines here only |

## Edge cases
- **Long German strings:** headings measured at ≤2 lines from 375px up, in EN and DE.
- **No JS:** everything is in the prerendered HTML; `.no-js` keeps reveals visible, and there's a `<noscript>` fallback.
- **Reduced motion:** no bloom breathing, reveals, marquee or tick animation; color feedback stays.
- **Unknown route:** a 404 view with `<meta name="robots" content="noindex">`.

## Animation / motion
| Element | Trigger | Animation | Duration | Easing |
|---|---|---|---|---|
| Hero badge, CTAs, note | load | fade plus 16px rise, staggered 90ms | 900ms | `--ease-out` |
| Hero shot | load | fade plus 32px rise | 1200ms, 360ms delay | `--ease-out` |
| Hero h1 and subline | — | **not animated**, so they count as the LCP element | — | — |
| `.reveal` blocks | enter viewport | fade plus 14px rise, `--i` × 80ms stagger | 720ms | `--ease-out` |
| Blooms | ambient | opacity and scale breathing | 8s loop | ease-in-out |
| Progress fills | card revealed | `scaleX(0 → 1)` | 1200ms, 240ms delay | `--ease-out` |

## i18n and prerender architecture
- Copy lives only in `src/locales/{en,de}.json`.
- `npm run build` = `vite build`, then an SSR build of `src/entry-server.tsx`, then `scripts/prerender.mjs`. The script writes:
  - `dist/en/index.html` and `dist/de/index.html` (prerendered `/`)
  - `dist/impressum/index.html` and `dist/datenschutz/index.html`
  - **no `dist/index.html`**, on purpose
- `vercel.json` rewrites pick the language for `/`: the `suku_lang` cookie first, then `Accept-Language: de…`, otherwise EN. They only work because `/` has no file (Vercel serves filesystem matches before rewrites).
- `main.tsx` hydrates when the prerendered route and language (`data-prerendered`, `data-lang`) match the visitor; otherwise it renders fresh.

## Accessibility notes
- Focus order: skip link → logo → nav → EN/DE → Log in → Try the demo → hero badge → hero CTAs → AI link → task checkboxes → FAQ → closing CTA → footer.
- Landmarks: `header`/`nav` (labelled), `main#main`, labelled `section`s, `footer` with labelled navs.
- Progress bars: `role="progressbar"` with value and label. Identity never depends on color alone (the mauve and blue fail colorblind separation, so each bar has its text label).
- Verified: axe 0 violations (EN, DE, mobile); text contrast at least 4.5:1 measured against the rendered glow.

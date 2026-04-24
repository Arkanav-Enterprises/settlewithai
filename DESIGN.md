# Settle — Design system

Living reference for Settle's visual language. Paired with `PRODUCT.md` for
brand positioning. Read before shipping UI work; edit in place when the
system evolves.

## Palette

**Authoritative source:** CSS custom properties in
`src/app/globals.css` (lines 3-14). Hex values below; OKLCH equivalents
are approximate and should be used when the tool or target benefits from a
perceptually uniform color space.

| Token | Hex | OKLCH (approx) | Role |
|---|---|---|---|
| `--bg` | `#e8e6dc` | `oklch(0.925 0.008 92)` | Warm cream base. Every page background. Do not replace with white. |
| `--bg-dark` | `#141413` | `oklch(0.19 0.002 60)` | Footer surface only. Not a "dark mode" — a deliberate inversion at the bottom of the page. |
| `--text` | `#141413` | `oklch(0.19 0.002 60)` | Primary text. Near-black, tinted warm. Never `#000`. |
| `--text-muted` | `rgba(20, 20, 19, 0.5)` | `oklch(0.19 0.002 60 / 0.5)` | Secondary copy, captions, metadata body. |
| `--text-faint` | `rgba(20, 20, 19, 0.3)` | `oklch(0.19 0.002 60 / 0.3)` | Eyebrow labels, timestamps, tertiary metadata. |
| `--accent` | `#d97757` | `oklch(0.69 0.14 40)` | Salmon / burnt sienna. The only brand accent. |
| `--accent-soft` | `rgba(217, 119, 87, 0.12)` | `oklch(0.69 0.14 40 / 0.12)` | Hover tints, subtle accent backgrounds. |
| `--accent-border` | `rgba(217, 119, 87, 0.3)` | `oklch(0.69 0.14 40 / 0.3)` | Accent card borders, selection state. |
| `--border` | `rgba(20, 20, 19, 0.1)` | — | Standard hairline dividers. |
| `--border-light` | `rgba(20, 20, 19, 0.06)` | — | Subtle hairlines between sections or archive cards. |

### Color strategy

**Restrained.** One accent used at ≤10% coverage per view. Tinted neutrals
everywhere else. This is Settle's permanent color strategy — we are a
studio, the accent is restraint, not saturation.

Exceptions:
- **Footer** uses `--bg-dark` as a full inversion with aurora gradients
  (`animate-aurora-1/2/3` in globals.css). This is the one *Drenched*
  moment in the system; it closes the page with volume.
- **Blog cover stories** use the accent more prominently in eyebrow
  labels and the kicker *"Cover Story"*. Still Restrained in total area.

The accent is **always salmon**. Do not introduce greens, blues, or
secondary accents. Adding a second accent kills the discipline.

### Forbidden

- `#000` and `#fff`. Always tint toward the warm-neutral family.
- Pure gray (chroma 0) except for rare utilitarian scrollbar thumbs.
- Gradients in body UI. The three sanctioned gradient surfaces are:
  `.liquid-glass` (frosted), `.cinema-glow` (projector halo behind promo
  loop), `.aurora-1/2/3` (footer). Nowhere else.
- Neon accents (electric green, vivid purple) — reads as SaaS, kills the
  editorial register.

## Typography

Two typefaces, no third.

| Family | CSS var | Role | Use |
|---|---|---|---|
| **Fraunces** | `--font-heading` | Display serif | All `h1`/`h2`/`h3`, blog masthead, decks, italic sell lines, magazine metadata, feature-card ghost numerals. |
| **Manrope** | `--font-sans` | Body sans | Body copy, nav, buttons, captions, data labels. |

### Hierarchy

Scale, weight, and italicization do the work — never color-as-hierarchy.

- **Display (blog wordmark, homepage hero):**
  `text-[clamp(3.5rem,12vw,10rem)]`, `font-medium`, leading `0.92`,
  letter-spacing `-0.055em`. Fraunces.
- **Cover story H2 (blog lead):**
  `text-[clamp(2.25rem,5.5vw,4.5rem)]`, `font-medium`, leading `1.02`,
  letter-spacing `-0.04em`. Fraunces.
- **Article H1 (post headline):**
  `text-[clamp(2.35rem,6vw,4.75rem)]`, `font-medium`, leading `1.04`,
  letter-spacing `-0.035em`. Fraunces (via `MagazineHeader`).
- **Section H2 (in-article):**
  ~1.5rem, `font-medium`, Fraunces, via `.prose-settle`.
- **Deck / italic sell line:**
  `text-[clamp(1.15rem,1.8vw,1.4rem)]`, italic, Fraunces. The magazine
  subtitle register.
- **Body:** 17-19px on article pages, 15-16px on UI surfaces. Manrope.
  Line length capped at **65-75ch** (enforced by `.prose-settle` and
  `max-w-[720px]` on article wrappers).
- **Eyebrow / masthead / metadata:** 10-11px, `uppercase`, tracking
  `0.18-0.20em`, Manrope. The typographic "kicker" pattern.
- **Tabular numbers:** `tabular-nums` on every `time`, percentage, issue
  number, and stat. Aligned columns matter in an editorial register.

### Italic is a feature, not a garnish

Fraunces has one of the most expressive italics in web type. Settle uses
italic for:

1. **Sell lines** under headlines (blog decks, Field Notes dispatches).
2. **One-word accents** inside headlines — *Field **Notes***, *The
   **Archive*** — always combined with `text-accent`.
3. **Feature-card ghost numerals** — giant italic `132px` numbers behind
   cards, opacity ~7% at rest, warming to accent on hover.

Italic in body copy is ordinary emphasis and follows normal prose rules.

## Layout

### Column widths

- **Reading column (articles, long-form prose):** `max-w-[720px]`. Never
  wider. Narrower hurts comfort on 27-inch monitors.
- **Editorial stage (magazine headers, feature sections):**
  `max-w-[1100px]`.
- **Masthead / full-width editorial:** `max-w-[1280px]`.

### Spacing

Vary the rhythm. Uniform padding is the single fastest way to make a page
read as templated.

- **Section vertical:** `py-20 md:py-28` for feature sections. Homepage
  hero uses `pt-28 md:pt-36`. Footer sign-off uses `pb-24 md:pb-36`.
- **Inside cards:** default `28px` (`feature-card`), `36-44px` for dense
  cards (`feature-card--lg`).
- **Between paragraphs in `.prose-settle`:** ~1.5em (inherited).
- **Between H2 and its first paragraph:** tighter than between a paragraph
  and a following H2. `.prose-settle` handles this; don't override.

### Containers

- **Masthead row:** hairline `border-b-2 border-text/80` above and below.
- **Section break inside articles:** `ornament` class (three accent
  dots, centered).
- **Feature rows (archive grid, further reading):** hairline
  `border-t border-border-light` between month groups.

Do not wrap every section in a card. Most things do not need a container.
Hairlines and vertical rhythm do the containment job in Settle's register.

## Components

The editorial stack. Prefer composing these over inventing new wrappers.

### `MagazineHeader` — `src/components/blog/MagazineHeader.tsx`

Top of every article. Masthead rail (publication + category + date) →
serif title → italic deck → byline rule. Breaks out of the 720px reading
column to 1100px so the deck can breathe.

### `MagazineOutro` — `src/components/blog/MagazineOutro.tsx`

Bottom of every article. Ornament → optional "Further reading" cards →
author block (with auto-bio for E-E-A-T) → "The next move" CTA. Handles
the author-bio attribution automatically; do not add a manual bio block.

### `BlogTOC` — `src/components/blog/BlogTOC.tsx`

Auto-discovers `h2` nodes in `.prose-settle` and builds a right-rail table
of contents with scroll-spy. Mobile becomes a bottom-sheet. Drops in with
one import.

### `PullQuote` — `src/components/blog/PullQuote.tsx`

Mid-article feature quote. Renders as `<aside>` with the pull-quote
styling from `globals.css` (`.prose-settle .pull-quote`). One per post
maximum. Use for the single most memorable line.

### `.feature-card` — `globals.css`

The signature card pattern. Paper-gradient surface, cursor-tracked radial
spotlight, oversized italic ghost numeral, animated 2px accent rule
drawing L→R on hover, -3px lift. Four ingredients, one integrated
component. Read the stacking-cake comment in globals.css before
modifying; content vanishes if z-index goes wrong.

Variants:
- `.feature-card--lg` — roomier padding for denser content.
- `.feature-card--accent` — salmon-tinted surface, for "featured"
  resource cards (e.g. the Anthropic link card).

### `.liquid-glass`

Frosted-glass treatment for hero subtitles, secondary CTAs, or floating
UI. **Note:** `backdrop-filter` is declared in a separate rule block
because Tailwind v4's Lightning CSS compiler strips it during
shorthand-merge optimization when combined with `background`. Do not merge
the rules.

### `.ornament`

Three salmon dots, centered on a horizontal rule. Section break inside
articles.

## Motion

All motion runs on `cubic-bezier(0.16, 1, 0.3, 1)` (a slightly sharper
cousin of `ease-out-expo`). This is Settle's house easing — use it by
default unless there's a specific reason not to.

### Catalog

- **Breathing (`animate-breathe`)** — 2.5s scale 1 → 1.25. Used on the
  particle settle mark.
- **Cinema breathe (`cinema-breathe`)** — 4s, 0.55 → 0.85 opacity and
  scale 1 → 1.06. Projector glow behind the promo loop.
- **Aurora (`aurora-1/2/3`)** — 12-18s translate + scale. Footer only.
- **Phase in (`phase-in`)** — 0.4s fade + 16px rise. Process scroll phase
  transitions.
- **Fade up on scroll (`.fade-up` + `.visible`)** — 0.7s opacity +
  translateY(20px). The general-purpose scroll reveal.
- **Stagger (`.stagger > .fade-up:nth-child(n)`)** — 0/80/160/240ms
  delays on children. Use sparingly; monotonous staggers kill the
  effect.
- **Feature-card hover** — border-color 350ms, transform 450ms, shadow
  450ms. The ghost numeral also animates separately at 650ms.
- **Glow pulse (`glow-border`)** — 4s infinite loop for the Ask-Claude
  mark.

### `prefers-reduced-motion`

Honored globally. Every animation above cuts to none or reduced form when
the user has the OS preference set. Do not ship new animations without
the reduced-motion override.

## Imagery

- **Photography:** sparingly. When used, it should feel editorial
  (factory floor, hands on a machine, a proof-of-work artifact), never
  stock.
- **Diagrams / system visuals:** use the existing React components
  (`AgentDiagram`, `CoworkDemo`, `Globe`, `ProcessScroll`,
  `DesignOutputScroll`, `PromoLoop`). Build new diagrams as React, not as
  exported PNGs. Rationale: branded tokens stay consistent, no asset
  rot, no CLS on load.
- **Charts:** inline flex/SVG using the design tokens above (see
  `src/app/blog/claude-user-income-chart/page.tsx` for the pattern —
  `IncomeBarChart` and `DotMatrix` helpers). Never a chart library.
- **Blog figures** live in `public/blog/`. WebP preferred over PNG for
  screenshots. Always with `loading="lazy"` and a real descriptive
  `alt`.
- **OG/social images** live at `public/og-image.png` (default) or
  per-post in `public/blog/`. 1519×1090 is the default aspect; 1200×630
  also acceptable.

## Accessibility

- Color contrast ≥ 4.5:1 for body text, 3:1 for ≥18pt/14pt bold. The
  current palette passes both at the default opacities; check any new
  muted variants you introduce.
- Focus states: every interactive element needs a visible focus ring.
  Default to a 2px salmon outline offset 2px.
- All `img` need meaningful `alt`; decorative shapes use `aria-hidden`.
- All `fade-up` scroll reveals must honor `prefers-reduced-motion`.
- Blog articles must preserve heading hierarchy (h1 once via
  `MagazineHeader`, then h2 only inside the article body — never skip to
  h3).

## Anti-patterns (on sight, rewrite)

- Hard black `#000` or pure white `#fff` anywhere.
- A gradient outside the three sanctioned surfaces.
- A card nested inside another card.
- A hero with a floating CTA button in the corner.
- Sans-serif display headings (use Fraunces).
- All-caps body copy (reserved for eyebrows and metadata, max ~14 chars).
- Three or more cards in a row with the same padding and the same
  animation — monotonous, breaks the rhythm rule.
- Any component with a "Learn more →" that doesn't go somewhere specific.

---

**Last updated:** 2026-04-24

**Single source of truth:** `src/app/globals.css` for tokens and keyframes.
This file documents intent; that file executes it. When they drift, fix
this one, not the other.

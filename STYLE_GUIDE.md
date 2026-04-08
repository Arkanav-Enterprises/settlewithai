# Settle — Visual Style Guide

Everything below is pulled from the live production site (`settlewithai.com`). Use this to style the Settle dashboard so it feels like the same product.

Stack assumption: **Tailwind CSS v4** (with the new `@theme inline` directive) + **Next.js App Router**. If the dashboard uses a different stack, the raw hex/rgba values and CSS below are framework-agnostic.

---

## 1. Design principles

Three rules that govern every visual choice on the marketing site:

1. **Warm, not cold.** The palette is warm paper (`#e8e6dc`) and warm ink (`#141413`), never pure white or pure black. This is the single biggest thing that makes the brand feel "settled" rather than clinical.
2. **Serif headlines, sans body.** A 500-weight serif (Sentient) for every display element. A geometric sans (Geist) for everything else. Never mix within a single heading.
3. **One accent, used sparingly.** Orange `#d97757` is the only accent color. It appears on links, one word in most H1s, small decorative marks (the bullet in front of list items, the left rail on a blockquote), and active states. If a screen has five orange things on it, four of them are wrong.

Keep these principles in the dashboard even if specific components change.

---

## 2. Color tokens

All colors are declared as CSS variables in `:root`, then exposed to Tailwind via `@theme inline`. Copy the whole block into your dashboard's `globals.css`.

```css
:root {
  /* Surfaces */
  --bg:            #e8e6dc;              /* warm paper — primary background */
  --bg-dark:       #141413;              /* warm ink — footer, inverse surfaces, code blocks */

  /* Text */
  --text:          #141413;              /* primary text */
  --text-muted:    rgba(20, 20, 19, 0.5); /* secondary text, body copy on cards */
  --text-faint:    rgba(20, 20, 19, 0.3); /* tertiary text, labels, timestamps */

  /* Accent */
  --accent:        #d97757;              /* brand orange, links, key highlights */
  --accent-soft:   rgba(217, 119, 87, 0.12);  /* accent backgrounds (chips, tags) */
  --accent-border: rgba(217, 119, 87, 0.3);   /* accent borders, focus rings */

  /* Borders */
  --border:        rgba(20, 20, 19, 0.1);   /* standard card borders, dividers */
  --border-light:  rgba(20, 20, 19, 0.06);  /* faint inline dividers, table rows */
}

@theme inline {
  --color-bg:            var(--bg);
  --color-bg-dark:       var(--bg-dark);
  --color-text:          var(--text);
  --color-text-muted:    var(--text-muted);
  --color-text-faint:    var(--text-faint);
  --color-accent:        var(--accent);
  --color-accent-soft:   var(--accent-soft);
  --color-accent-border: var(--accent-border);
  --color-border:        var(--border);
  --color-border-light:  var(--border-light);
}
```

With that in place you get Tailwind classes like `bg-bg`, `text-text`, `text-text-muted`, `text-accent`, `border-border`, etc. **These are the only color classes that should appear in dashboard code.** Avoid hardcoded hex values in JSX.

### Accessibility notes

- `--text-muted` (50% opacity) on `--bg` is ~4.8:1 contrast — passes WCAG AA for body text.
- `--text-faint` (30% opacity) is **not** accessible for body copy. Use only for non-essential labels (timestamps, "optional", "2 min read").
- Selection highlight: `::selection { background: rgba(217, 119, 87, 0.3); }` — the accent at 30%.

### Dark mode

The site does **not** have a dark mode. If the dashboard needs one, invert `--bg` / `--bg-dark` and `--text` / `--text-muted`, keep `--accent` unchanged, and soften it slightly (`#e08870` reads better on dark). Don't use pure black `#000` — use `#141413`.

---

## 3. Typography

### Fonts

Two families only:

| Family                 | Usage                                           | Weights |
| ---------------------- | ----------------------------------------------- | ------- |
| **Sentient** (serif)   | All H1–H3, display numerals, large stat values  | 400, 500, 700 |
| **Geist** (sans-serif) | Body, UI, labels, buttons, tables, form inputs  | 400, 500, 600 |

In the marketing site these are loaded via `next/font`:

```tsx
// layout.tsx
import { Geist } from "next/font/google";
import localFont from "next/font/local";

const geist = Geist({ subsets: ["latin"], weight: ["400","500","600"], display: "swap", variable: "--font-geist" });
const sentient = localFont({
  src: [
    { path: "../fonts/sentient-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/sentient-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/sentient-700.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-sentient",
});
```

Then in `globals.css`:

```css
@theme inline {
  --font-sans:    var(--font-geist), ui-sans-serif, system-ui, sans-serif;
  --font-heading: var(--font-sentient), Georgia, "Times New Roman", serif;
}

body { font-family: var(--font-sans); }
h1, h2, h3 { font-family: var(--font-heading); letter-spacing: -0.03em; }
```

> **Important:** All headings get `letter-spacing: -0.03em` globally. This is what makes Sentient feel tight and confident instead of airy. Don't override it.

Sentient's .woff2 files live in `src/fonts/` in this repo. Copy them to the dashboard or ship them from a shared CDN.

### Type scale

The site uses fluid typography via `clamp()` almost everywhere. Use these exact values for dashboard parity:

| Element              | Class / CSS                                     | Notes |
| -------------------- | ----------------------------------------------- | ----- |
| Hero H1              | `text-[clamp(2.4rem,4.8vw,4.2rem)]` 500 wt      | Line-height 1.08, one word in `text-accent` |
| Page H1 (blog/doc)   | `text-[clamp(2rem,4.5vw,3.2rem)]` 500 wt        | Line-height 1.12 |
| Section H2           | `text-[clamp(1.8rem,3.5vw,3rem)]` 500 wt        | Line-height 1.12 |
| Article H2           | `text-[clamp(1.4rem,2.5vw,1.8rem)]` 500 wt      | Used inside `.prose-settle` |
| Article H3           | `text-[clamp(1.15rem,2vw,1.4rem)]` 500 wt       | |
| Stat / metric value  | `text-[clamp(1.6rem,3.4vw,2.4rem)]` 500 wt      | Always Sentient, tabular-nums friendly |
| Body (default)       | `17px / 1.7` or Tailwind default                | `color: var(--text)` |
| Body (prose article) | `17px (1.0625rem) / 1.8`                        | `color: var(--text-muted)` |
| Body (small/UI)      | `14px / 1.5`                                    | |
| Label / eyebrow      | `11px uppercase tracking-[0.12em]`              | `color: var(--text-faint)` |
| Nano label           | `10.5px uppercase tracking-[0.16em]`            | Used above stats |

### Tracking

| Context                | Letter-spacing |
| ---------------------- | -------------- |
| Serif headings (H1–H3) | `-0.03em`      |
| Stat values            | `-0.03em`      |
| H2 (some article)      | `-0.025em`     |
| Uppercase labels       | `+0.12em` to `+0.18em` |
| Body                   | default (0)    |

### The "accent word" rule

Every H1 on the marketing site has exactly **one** word wrapped in `<span className="text-accent">`. Examples:

- `Your business, made` **`AI-native`** `.`
- `AI,` **`thoughtfully`** `deployed.` (legacy)

Apply this pattern to dashboard empty states and page titles when it feels right. Don't overuse it — if every title has an accent word, none of them do.

---

## 4. Spacing & layout

### Containers

```tsx
<main className="max-w-[1280px] mx-auto px-6 lg:px-10">
```

- Page max-width: **1280px**
- Horizontal padding: **24px** mobile, **40px** desktop
- Article max-width: **720px** (reading column)
- Narrow form max-width: **680px**

### Section vertical rhythm

| Density            | Mobile  | Desktop |
| ------------------ | ------- | ------- |
| Hero               | 96px    | 144px   |
| Standard section   | 64px    | 96px    |
| Compact section    | 40px    | 64px    |

In Tailwind these map to `py-16 md:py-24`, `py-10 md:py-16`, etc. Use them consistently — mixing `py-12` / `py-14` / `py-18` creates visual jitter.

### Card padding

- Large cards (case study, pricing): `p-8 md:p-12 lg:p-16`
- Medium cards: `p-6 md:p-8`
- Pill / chip: `px-3 py-1.5`
- Button: `px-5 py-2.5`

### Grid gaps

- Card grids: `gap-6` to `gap-8`
- Tight UI grids: `gap-4`
- Stat strip: `gap-0` with hairline dividers (see Component Patterns)

---

## 5. Border radii

One ladder — don't invent radii between these:

| Radius | Token    | Usage |
| ------ | -------- | ----- |
| 4px    | `rounded` | Code inline, small tags |
| 8px    | `rounded-lg` | Primary CTA buttons, code blocks |
| 12px   | `rounded-xl` | Standard cards, inputs (oversized) |
| 20–22px | `rounded-[22px]` | Large case study cards, modal sheets |
| 32px   | inline `borderRadius: "32px"` | Process cards (frosted), hero liquid glass |
| Full   | `rounded-full` | Chips, avatars, FABs, dots |

Hero buttons in the nav use `rounded-full`. Bottom-fixed floating CTA uses `rounded-lg`. Don't switch these arbitrarily.

---

## 6. Elevation & surfaces

The site uses four kinds of surfaces. Pick one per component.

### 6.1 Flat (the default)

No border, no shadow. Just `bg-bg` with `text-text`. Use this for the whole page.

### 6.2 Hairline card

A rectangle with a 1px border and no background. Used for blog index rows, related links, tables.

```tsx
<div className="border-t border-border-light py-10">
```

### 6.3 Liquid glass (frosted)

The signature surface for hero copy, the Orient case card, and anything that should float over the warm paper background. Reusable class in `globals.css`:

```css
.liquid-glass {
  background: rgba(0, 0, 0, 0.04);
  background-image: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.04),
    rgba(0, 0, 0, 0.02)
  );
  border-radius: 12px;
  box-shadow:
    inset 1px 1px 1px rgba(0, 0, 0, 0.1),
    inset -1px -1px 1px rgba(255, 255, 255, 0.3),
    0 4px 16px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.liquid-glass {
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
}
```

> **Critical Tailwind v4 gotcha:** The `backdrop-filter` declaration **must** live in its own rule block, separated from the `background` + `background-image` block. Tailwind v4's Lightning CSS compiler will silently strip `backdrop-filter` during its shorthand-merge optimization if they share a rule. This is documented in the comment in `globals.css` — do not collapse the two blocks.

### 6.4 Frosted process card

A softer variant used on the "From zero to settled" section. No hard border; instead a radial-gradient mask feathers the edges:

```tsx
<div
  style={{
    backgroundImage:
      "radial-gradient(ellipse 95% 90% at center, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.3) 55%, rgba(255,255,255,0) 100%)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    borderRadius: "32px",
    WebkitMaskImage:
      "radial-gradient(ellipse 95% 88% at center, #000 55%, transparent 100%)",
    maskImage:
      "radial-gradient(ellipse 95% 88% at center, #000 55%, transparent 100%)",
  }}
>
```

Reserve this for hero-adjacent narrative blocks. Don't use it for everyday dashboard cards.

### Shadows

The site uses exactly three shadow levels:

| Level | CSS                                                  | Usage |
| ----- | ---------------------------------------------------- | ----- |
| Low   | `0 4px 16px rgba(0,0,0,0.1)`                         | Liquid glass cards |
| Mid   | `shadow-lg` (Tailwind default)                       | FABs, dropdowns |
| High  | `shadow-2xl` + `box-shadow: 0 12px 40px rgba(0,0,0,0.25)` | Modals, tooltips, morphing sheets |

Avoid `shadow-md` — it feels middling. Pick low or mid.

---

## 7. Component patterns

### 7.1 Primary button (dark pill CTA)

```tsx
<a
  href="..."
  className="text-[14px] font-medium bg-text text-bg px-5 py-2.5 rounded-lg hover:bg-[#30302e] transition-colors duration-200"
>
  Get Started
</a>
```

- Dark warm ink background, warm paper text
- Hover: slightly lighter ink (`#30302e`)
- Duration: **200ms** (see Motion)
- Same button reused as the nav CTA and the floating scroll-triggered CTA
- For a pill variant change `rounded-lg` → `rounded-full`

### 7.2 Secondary link (arrow CTA)

```tsx
<a
  href="..."
  className="group inline-flex items-center text-[15px] font-medium text-text hover:text-text/70 transition-colors duration-200"
>
  Start a conversation
  <Arrow />
</a>
```

The `<Arrow />` component is a 1-char → 2-char horizontal stretch on hover. Keep secondary CTAs lightweight — no backgrounds, just text + arrow.

### 7.3 Chip / tag

```tsx
<span className="text-xs font-medium px-3 py-1.5 rounded-full bg-[rgba(20,20,19,0.06)] text-text border border-[rgba(20,20,19,0.1)]">
  85% faster docs
</span>
```

- 12px text, 500 weight
- Warm paper with a 6% ink tint background
- Full-round
- Use for example tags, metric pills, status indicators

### 7.4 Stat cell (bordered strip)

The four-stat band from the Orient card uses hairline dividers between cells. This is how metric blocks should look anywhere in the dashboard:

```tsx
<div className="grid grid-cols-2 md:grid-cols-4 items-stretch">
  {stats.map((s, i) => (
    <div
      key={s.label}
      className={[
        "text-center px-3 py-6 md:py-4 flex flex-col justify-center",
        "border-[rgba(20,20,19,0.12)]",
        i % 2 === 1 ? "border-l" : "",
        i >= 2 ? "border-t md:border-t-0" : "",
        i >= 1 ? "md:border-l" : "",
      ].join(" ")}
    >
      <div
        className="text-[clamp(1.6rem,3.4vw,2.4rem)] font-medium leading-none mb-3 text-text whitespace-nowrap"
        style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.03em" }}
      >
        {s.value}
      </div>
      <div className="text-text-muted text-[10.5px] md:text-[11px] uppercase tracking-[0.16em] leading-relaxed">
        {s.label}
      </div>
    </div>
  ))}
</div>
```

The index-driven border math gives a 2×2 cross on mobile and a single row of verticals on desktop. Reuse it verbatim for dashboard KPI rows.

### 7.5 Icon button (expand / close / morph)

```tsx
<button
  type="button"
  aria-label="Close"
  className="absolute top-5 right-5 w-10 h-10 rounded-full border border-[rgba(20,20,19,0.15)] bg-[rgba(255,255,255,0.45)] hover:bg-[rgba(255,255,255,0.75)] flex items-center justify-center transition-colors duration-200 z-10"
>
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
</button>
```

- 40×40, full-round
- Translucent white fill, ink border at 15% opacity
- Icons are always stroke-only, `strokeWidth="1.5"`, `strokeLinecap="round"`

### 7.6 Form input

```tsx
<input
  type="email"
  placeholder="you@company.com"
  className="w-full px-5 py-4 rounded-lg bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.2)] text-bg placeholder:text-[rgba(232,230,220,0.55)] focus:outline-none focus:border-[rgba(255,255,255,0.4)] transition-colors"
/>
```

- Dark context (on warm ink): translucent white fill, 20% white border, paper-colored text
- Light context (on warm paper): swap to `bg-[rgba(20,20,19,0.04)] border-border` with `text-text`
- No `focus:ring`. Use `focus:border-accent` instead.
- 16px minimum on mobile to prevent iOS zoom.

### 7.7 Navigation bar

```tsx
<nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-[#e8e6dc]/80">
  <div className="max-w-[1280px] mx-auto px-6 lg:px-10 h-[4.25rem] flex items-center justify-between">
    ...
  </div>
</nav>
```

- Height: **68px** (`h-[4.25rem]`)
- Background: warm paper at 80% opacity over `backdrop-blur-xl`
- Fixed, always on top (z-50)
- Scroll-padding-top of 5rem is set globally so anchor jumps don't hide behind the nav

### 7.8 Morphing FAB → bottom sheet (mobile TOC)

A signature interaction — a 48px circular FAB that morphs (width, height, border-radius all transitioning together) into a ~320px rounded rectangle sheet. Two `absolute inset-0` siblings cross-fade (icon out first, list in with a delay) so the container shape settles before content appears.

Full implementation in `src/components/blog/BlogTOC.tsx`. Reuse this pattern for any mobile floating menu in the dashboard (filters, notifications, user menu).

---

## 8. Dividers & rails

Hairline separators are a core visual texture. Two kinds:

```tsx
{/* Standard divider */}
<div className="h-px bg-border-light" />

{/* Between-item divider (in a flow) */}
<div className="border-t border-border-light py-10" />
```

### Decorative rails

The process section uses a dotted animated fuse rail:

```tsx
<svg viewBox="0 0 32 1000" preserveAspectRatio="none">
  <path
    d="M 16,20 L 16,980"
    stroke="#d97757"
    strokeWidth="1.5"
    strokeDasharray="6 10"
    strokeLinecap="round"
    opacity="0.2"
    vectorEffect="non-scaling-stroke"
  />
  <path
    d="M 16,20 L 16,980"
    stroke="#d97757"
    strokeWidth="2"
    strokeLinecap="round"
    opacity="0.4"
    pathLength="1"
    strokeDasharray="0.08 0.92"
    className="path-fuse"
  />
</svg>
```

With the animation:

```css
@keyframes fuse-travel {
  0%   { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -1; }
}
.path-fuse { animation: fuse-travel 6s linear infinite; }
```

`pathLength="1"` normalizes the dasharray so the same component works on paths of any length. Use this for progress indicators, step rails, or any "data is flowing" moment in the dashboard.

---

## 9. Iconography

- **Style:** stroke-only, 1.5px strokes, round caps, round joins
- **Size:** 14–24px — 16×16 is the default
- **Source:** hand-written SVG paths inline in the component (no icon library)
- **Color:** `currentColor` so icons inherit from the surrounding text

Example:

```tsx
<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>
```

If the dashboard needs more icons than you want to hand-write, Lucide matches this style almost exactly at `strokeWidth={1.5}`. Use that as the default icon library.

---

## 10. Motion

### Tokens

| Token           | Value                                     | Usage |
| --------------- | ----------------------------------------- | ----- |
| Ease (signature) | `cubic-bezier(0.16, 1, 0.3, 1)`           | All size/position morphs, fade-ups |
| Ease (colors)    | `ease` / `ease-out`                       | Hover color transitions |
| Duration — fast  | `180ms`                                   | Icon fades, small UI |
| Duration — base  | `200ms`                                   | Hover state colors, standard |
| Duration — med   | `300ms`                                   | Drawer / dropdown, list cross-fades |
| Duration — long  | `450–500ms`                               | Morph animations (FAB → sheet, card expand) |
| Duration — hero  | `700ms`                                   | Scroll-triggered fade-ups |

### Patterns

**Fade-up on scroll** (the site's default entrance animation):

```css
.fade-up {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-up.visible {
  opacity: 1;
  transform: translateY(0);
}
.stagger > .fade-up:nth-child(1) { transition-delay: 0ms; }
.stagger > .fade-up:nth-child(2) { transition-delay: 80ms; }
.stagger > .fade-up:nth-child(3) { transition-delay: 160ms; }
.stagger > .fade-up:nth-child(4) { transition-delay: 240ms; }
```

The `.visible` class is added imperatively via an `IntersectionObserver` hook (`useFadeIn()` in `src/hooks/useFadeIn.ts`). Port that hook to the dashboard and use `.fade-up` everywhere content enters.

**Direction-dependent delay** (morph animations):

When cross-fading two states inside a morphing container, the content that is appearing should be delayed until the container has finished morphing. The content that is disappearing should start fading immediately. Use inline style:

```tsx
style={{
  transition: "opacity 220ms ease",
  transitionDelay: isOpen ? "230ms" : "0ms",
}}
```

This is the one trick that makes the TOC morph feel designed rather than janky.

**Shine sweep** (reserved for hero callouts, not for regular UI):

```css
@keyframes shine-sweep {
  0%   { transform: translateX(-100%) rotate(25deg); }
  100% { transform: translateX(200%) rotate(25deg); }
}
```

### Reduced motion

The hero subtitle checks `prefers-reduced-motion` and skips the typing animation. Respect this everywhere:

```ts
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reduced) { /* show final state immediately */ }
```

---

## 11. Article / prose typography

For any long-form content in the dashboard (empty states, onboarding copy, help docs) use the `.prose-settle` ruleset. Full CSS is in `src/app/globals.css` lines 156–284. Key values:

| Element     | Font-size    | Color         | Notes |
| ----------- | ------------ | ------------- | ----- |
| `p`         | `17px/1.8`   | `text-muted`  | |
| `h2`        | `clamp(1.4rem,2.5vw,1.8rem)` 500 wt | `text` | `mt: 3rem; mb: 1rem` |
| `h3`        | `clamp(1.15rem,2vw,1.4rem)` 500 wt  | `text` | `mt: 2.5rem; mb: 0.75rem` |
| `ul li`     | `17px/1.8`   | `text-muted`  | Custom accent-orange dot bullet, not default disc |
| `ol`        | `17px/1.8`   | `text-muted`  | Default decimal |
| `strong`    | inherit      | `text`, 600 wt | |
| `a`         | inherit      | `accent`      | No underline, underline on hover |
| `blockquote`| inherit      | `text-muted`  | 3px left border in accent, italic |
| `code`      | `0.9em`      | inherit       | 6% ink background, 4px radius |
| `pre`       | `14px`       | `bg: bg-dark, fg: bg` | Dark warm ink background |
| `hr`        | 1px          | `border-light`| `my: 2.5rem` |

---

## 12. Voice for UI copy

Microcopy in the dashboard should match the marketing site's tone.

- **Contractions always.** "Can't find that" not "Cannot find that". "We're loading" not "We are loading".
- **Lowercase labels for meta information.** `april 2026`, `7 min read`, `optional`.
- **Uppercase for eyebrows and section labels**, with `tracking-[0.12em]` or tighter.
- **No exclamation marks.** Ever.
- **No emoji.** Ever.
- **No "!" energy.** "Success" not "Success!". "Saved" not "Saved! ✨".
- **Error messages explain the cause, not just the symptom.** "We couldn't reach your ERP — check the API key in Settings" not "Something went wrong. Please try again."
- **Empty states should carry a one-line personality.** "Nothing here yet. Start by mapping a workflow." not "No items to display."

See `docs/socials/voice-guide.md` for the long version (Pranav's writing voice for long-form content). For UI copy, the short list above is enough.

---

## 13. Quick copy-paste starter

A minimal `globals.css` that ports the entire design system to a fresh dashboard project:

```css
@import "tailwindcss";

:root {
  --bg: #e8e6dc;
  --bg-dark: #141413;
  --text: #141413;
  --text-muted: rgba(20, 20, 19, 0.5);
  --text-faint: rgba(20, 20, 19, 0.3);
  --accent: #d97757;
  --accent-soft: rgba(217, 119, 87, 0.12);
  --accent-border: rgba(217, 119, 87, 0.3);
  --border: rgba(20, 20, 19, 0.1);
  --border-light: rgba(20, 20, 19, 0.06);
}

@theme inline {
  --color-bg: var(--bg);
  --color-bg-dark: var(--bg-dark);
  --color-text: var(--text);
  --color-text-muted: var(--text-muted);
  --color-text-faint: var(--text-faint);
  --color-accent: var(--accent);
  --color-accent-soft: var(--accent-soft);
  --color-accent-border: var(--accent-border);
  --color-border: var(--border);
  --color-border-light: var(--border-light);
  --font-sans: var(--font-geist), ui-sans-serif, system-ui, sans-serif;
  --font-heading: var(--font-sentient), Georgia, "Times New Roman", serif;
}

html { scroll-behavior: smooth; scroll-padding-top: 5rem; }
body { background: var(--bg); color: var(--text); font-family: var(--font-sans); -webkit-font-smoothing: antialiased; }
h1, h2, h3 { font-family: var(--font-heading); letter-spacing: -0.03em; }
::selection { background: rgba(217, 119, 87, 0.3); }
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(20, 20, 19, 0.12); border-radius: 3px; }

/* Liquid glass — keep backdrop-filter in its own rule (Tailwind v4 Lightning CSS bug) */
.liquid-glass {
  background: rgba(0, 0, 0, 0.04);
  background-image: linear-gradient(135deg, rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.02));
  border-radius: 12px;
  box-shadow:
    inset 1px 1px 1px rgba(0, 0, 0, 0.1),
    inset -1px -1px 1px rgba(255, 255, 255, 0.3),
    0 4px 16px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.liquid-glass {
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
}

/* Fade-up on scroll */
.fade-up { opacity: 0; transform: translateY(20px); transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1); }
.fade-up.visible { opacity: 1; transform: translateY(0); }
.stagger > .fade-up:nth-child(1) { transition-delay: 0ms; }
.stagger > .fade-up:nth-child(2) { transition-delay: 80ms; }
.stagger > .fade-up:nth-child(3) { transition-delay: 160ms; }
.stagger > .fade-up:nth-child(4) { transition-delay: 240ms; }

/* Fuse rail animation */
@keyframes fuse-travel { 0% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: -1; } }
.path-fuse { animation: fuse-travel 6s linear infinite; }
```

Pair that with `next/font` loading Geist + Sentient as shown in section 3, and the dashboard will feel like a Settle product out of the box.

---

## 14. What *not* to do

Common anti-patterns that would break the brand:

- **Pure white (`#ffffff`) surfaces.** Always use `#e8e6dc` (warm paper).
- **Pure black (`#000000`) text.** Always use `#141413` (warm ink).
- **Hard shadows** (`shadow-xl` on every card). The site stays mostly flat. Shadows are reserved for surfaces that truly float.
- **Multiple accent colors.** One orange. If you need a second semantic color, use `text-text-muted` for "info", `#dc2626` for critical errors only, and keep green out entirely.
- **Gradients everywhere.** The one gradient used on liquid glass is 4% → 2% ink. Avoid colorful gradients.
- **Rounded-2xl / rounded-3xl on everything.** Stay on the 4/8/12/22/32/full ladder.
- **Emoji in UI copy.** Never.
- **Em dash overload.** Use commas. Em dashes are reserved for genuine asides in long-form copy.
- **Animation on every element.** `.fade-up` on entrance is enough. Don't add hover transforms, tilt-on-hover, or parallax scroll.

---

*Questions? Look at `src/app/page.tsx` and `src/components/blog/BlogTOC.tsx` for canonical implementations. When in doubt, copy the marketing site verbatim — that's faster than redesigning.*

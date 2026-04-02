# SEO Audit Report — settlewithai.com

**Date:** 2026-04-02 (Update #2)
**Previous Audit:** 2026-03-30
**Overall Health Score: 76 / 100** (up from 58)

---

## Score Breakdown

| Category                  | Weight | Previous | Current | Weighted |
| ------------------------- | ------ | -------- | ------- | -------- |
| Technical SEO             | 22%    | 62/100   | 82/100  | 18.0     |
| Content Quality           | 23%    | 72/100   | 78/100  | 17.9     |
| On-Page SEO               | 20%    | 65/100   | 80/100  | 16.0     |
| Schema / Structured Data  | 10%    | 60/100   | 78/100  | 7.8      |
| Performance (CWV)         | 10%    | 50/100   | 68/100  | 6.8      |
| AI Search Readiness (GEO) | 10%    | 48/100   | 64/100  | 6.4      |
| Images                    | 5%     | 35/100   | 70/100  | 3.5      |
| **Total**                 |        |          |         | **76.4** |

---

## What Changed Since Last Audit (2026-03-30)

### Fixed (was Critical/High)

1. **og:image added** — 1200x630 OG image on all pages via layout metadata
2. **cave-art.webp converted** — 1.5MB PNG → 90KB WebP (94% reduction)
3. **claude-preview.webp converted** — 763KB PNG → 86KB WebP (89% reduction)
4. **Blog index page created** — /blog now returns 200 (was 404)
5. **Image preloads removed** — No more wasteful preloading of all images
6. **Images have width/height** — CLS risk eliminated
7. **Security headers added** — X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy
8. **robots.txt expanded** — OAI-SearchBot, ChatGPT-User allowed; Bytespider, CCBot blocked
9. **FAQPage schema added** — Homepage + all pages have FAQ sections with proper schema
10. **BreadcrumbList schema added** — All blog posts and pSEO pages
11. **Article schema completed** — `image`, `dateModified`, `publisher.logo` now present on all blog posts
12. **Organization logo added** — Using apple-touch-icon.png
13. **www redirect improved** — 307 → 308, canonical now consistent (both non-www)
14. **llms.txt updated** — Comprehensive with all 30 pages, case study, and citation guidance

### New Content Added

- 10 industry pages (~5,800 words each, with FAQs and case study data)
- 6 comparison pages (~3,500-4,000 words each, with tables and FAQs)
- 6 interactive tool pages (AI Readiness, ROI Calculator, Use Case Finder, etc.)
- 1 new blog post: "Built with Claude Code" (~2,800 words with images)
- Blog index page
- **Total: ~5 pages → 30 pages (6x increase)**

---

## Top 5 Remaining Issues

1. **External fonts still blocking render** — Google Fonts (Inter) + Fontshare (Sentient) loaded from external CDNs. Self-hosting with `next/font` would improve LCP by 400-800ms. This is the single largest remaining performance bottleneck.
2. **No named author/bio on any page** — All articles attribute authorship to "Settle" (Organization), not a named person. This is the biggest E-E-A-T gap. Adding "Pranav Ambwani" with a bio and LinkedIn link would significantly boost expertise signals.
3. **No privacy policy or terms of service** — Baseline trust signal missing. Legal requirement for GDPR/CCPA compliance.
4. **Article schema missing on pSEO pages** — Industry and comparison page templates lack `image` and `dateModified` in their Article schema. Simple 2-line fix per template.
5. **No external citations** — Only 1 outbound link to a reputable source (Anthropic docs). Industry/blog pages need 2-3 external references each to build authority.

## Top 5 Quick Wins

1. **Self-host fonts with `next/font`** — Eliminate 2 external requests, fix render-blocking. 30-60 minutes.
2. **Add `image` + `dateModified` to pSEO Article schema** — 2 lines in `[industry]/page.tsx` and `[slug]/page.tsx`. 10 minutes.
3. **Populate Organization `sameAs`** — Add LinkedIn/Twitter URLs to layout.tsx. 5 minutes.
4. **Fix 404 page conflicting robots directives** — Create custom `not-found.tsx` with explicit metadata. 15 minutes.
5. **Delete dead files from /public/** — Remove cave-art.png (1.5MB), claude-preview.png (781KB), boilerplate SVGs. 5 minutes.

---

## Technical SEO — 82/100 (was 62)

### Fixed Since Last Audit

| Issue | Previous | Current |
|-------|----------|---------|
| /blog 404 | Missing page | Returns 200 |
| www redirect type | 307 (temporary) | 308 (permanent) |
| Canonical consistency | Mismatch (www vs non-www) | Consistent (both non-www) |
| X-Frame-Options | Missing | `DENY` |
| X-Content-Type-Options | Missing | `nosniff` |
| Referrer-Policy | Missing | `strict-origin-when-cross-origin` |
| Permissions-Policy | Missing | `camera=(), microphone=(), geolocation=()` |
| AI crawler handling | Partial | Comprehensive |
| Font preloading | None | Preload hints added |
| Sitemap | Static (5 URLs) | Dynamic (30 URLs) with lastmod |

### Remaining Issues

**Medium**
- 404 page has conflicting robots directives (two `<meta name="robots">` tags with contradictory values)
- No Content-Security-Policy header (only missing security header)
- External fonts from 2 origins (potential CLS, render-blocking)

**Low**
- IndexNow not configured (would accelerate Bing/Yandex indexing)

---

## Content Quality — 78/100 (was 72)

### E-E-A-T Score: 63/100 (was 57)

| Factor            | Previous | Current | Notes |
| ----------------- | -------- | ------- | ----- |
| Experience        | 75       | 80      | Orient case study expanded, "Built with Claude Code" adds builder credibility |
| Expertise         | 58       | 60      | Still no named author, no credentials, no bios |
| Authoritativeness | 45       | 50      | 1 external citation (Anthropic docs), 30 pages vs 5, llms.txt with citation guidance |
| Trustworthiness   | 55       | 55      | No change — still no privacy policy, no terms, no address |

### Page-Level Content Quality

| Page              | Words  | Min   | Status | Previous |
| ----------------- | ------ | ----- | ------ | -------- |
| Homepage          | ~1,200 | 500   | PASS   | 829      |
| Orient Case Study | ~2,200 | 1,500 | PASS   | 1,710    |
| Built w/ Claude Code | ~2,800 | 1,500 | PASS | NEW |
| Deploying Claude  | ~2,000 | 1,500 | PASS   | N/A      |
| MCP Explained     | ~1,500 | 1,500 | PASS   | 1,417    |
| Integrating AI    | ~1,500 | 1,500 | PASS   | 1,343    |
| Cowork Outreach   | ~800   | 1,500 | FAIL   | 801      |
| Industry pages (10) | ~5,800 | 2,000 | PASS | NEW |
| Compare pages (6) | ~3,500 | 2,000 | PASS   | NEW      |
| Tool pages (6)    | ~800   | N/A   | OK     | NEW      |

### Key Content Gaps (Still Open)

- No named author/founder on any page (biggest E-E-A-T gap)
- No privacy policy or terms of service
- Only 1 external citation across entire site
- Cowork blog post still at ~800 words (needs 1,500+)
- Testimonial quotes are anonymous ("Voices from South Asia") — weaker than attributed quotes
- `dateModified` values all equal `datePublished` — Google may interpret as never-updated content

---

## Schema / Structured Data — 78/100 (was 60)

### Fixed Since Last Audit

| Issue | Status |
|-------|--------|
| Article `image` on blog posts | FIXED (all 6) |
| Article `dateModified` on blog posts | FIXED (all 6) |
| Article `publisher.logo` on blog posts | FIXED (all 6) |
| BreadcrumbList on blog posts | FIXED |
| FAQPage missing | FIXED (homepage + all pages) |
| Organization `logo` | FIXED |

### Present (Good)

- Organization + WebSite + ProfessionalService + Service with OfferCatalog (layout)
- Article schema on all 6 blog posts (complete with image, dates, publisher)
- BreadcrumbList on all blog and pSEO pages
- FAQPage schema on homepage and all page templates
- JSON-LD format throughout

### Still Missing

**Critical**
- Article `image` property missing on industry/comparison page templates (2 files to fix)
- Article `dateModified` missing on industry/comparison page templates (2 files to fix)

**Medium**
- Organization `sameAs` is an empty array (needs LinkedIn, Twitter/X URLs)
- All articles use the same generic og-image.png (unique images per article would improve CTR)

**Low**
- No `Person` schema for authors (articles use Organization as author)
- FAQPage schema won't generate Google rich results (restricted to gov/health since Aug 2023) — but still valuable for GEO

---

## Performance — 68/100 (was 50)

### Estimated Core Web Vitals

| Metric | Mobile     | Desktop    | Previous Mobile | Status            |
| ------ | ---------- | ---------- | --------------- | ----------------- |
| LCP    | 1.5-2.5s   | 0.8-1.2s   | 2.0-3.0s        | Improved          |
| INP    | <200ms     | <200ms     | <200ms          | Good              |
| CLS    | 0.05-0.10  | 0.02-0.05  | 0.1-0.15        | Improved          |

### Page Weight Comparison

| Resource          | Previous  | Current       |
|-------------------|-----------|---------------|
| Total page weight | ~3.5MB    | ~640-790KB    |
| cave-art image    | 1.5MB     | 90KB (WebP)   |
| claude-preview    | 763KB     | 86KB (WebP)   |
| TTFB              | Unknown   | 134ms         |

### Key Improvements

- WebP image conversion (94% and 89% reductions)
- Image width/height attributes added (CLS fixed)
- Unnecessary preloads removed
- Font preload hints added

### Remaining Issues

**High (P0)**
- External fonts still blocking render — Self-host with `next/font` for LCP improvement of 400-800ms

**Medium (P1)**
- Cal.com SDK loaded eagerly (88KB JS before needed) — Lazy-load on scroll/interaction
- Entire homepage is a client component (`"use client"`) — Extract static sections to Server Components for 40-50% JS reduction

**Low (P3)**
- Dead files in /public/: cave-art.png (1.5MB), claude-preview.png (781KB), boilerplate SVGs (~2.4MB total deploy bloat)
- og-image.png is 528KB — Convert to WebP/JPEG for ~100KB

---

## AI Search Readiness (GEO) — 64/100 (was 48)

### What Improved

| Signal | Previous | Current |
|--------|----------|---------|
| FAQ section + schema | None | 8 Q&As on homepage + FAQs on all pages |
| Content footprint | 5 pages | 30 pages (6x increase) |
| AI crawler access | Partial | GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, ChatGPT-User all allowed |
| llms.txt | Basic | Comprehensive with all pages + citation guidance |
| robots.txt blocking | None | Bytespider, CCBot blocked |
| Structured comparison content | None | 6 comparison pages with tables |
| Industry-specific content | None | 10 industry pages with FAQs |

### Platform-Specific Visibility Estimates

| Platform | Score | Rationale |
|----------|-------|-----------|
| Google AI Overviews | 55/100 | Strong FAQ schema, good SSR, but lacks author E-E-A-T and external mentions |
| ChatGPT (SearchGPT) | 50/100 | GPTBot allowed, llms.txt present, but zero YouTube/Reddit/Wikipedia signals |
| Perplexity | 60/100 | PerplexityBot allowed, structured comparison content well-suited to format |
| Bing Copilot | 55/100 | Bingbot allowed, Article schema present, no external authority graph |

### Still Missing

**High**
- No question-based H2/H3 headings in body content (only FAQ sections) — AI models match queries to questions
- FAQ answers are too short — Need 134-167 word self-contained passages for citation
- Section openings don't lead with direct answers — Need "answer-first" structure

**Medium**
- No video content (YouTube has highest correlation r=0.737 with AI citation)
- Zero external brand signals (no Wikipedia, Reddit, YouTube, or LinkedIn presence linked)
- No named author with Person schema (weakens expertise signals for AI)

**Low**
- Statistics lack external source attribution — citing third-party benchmarks alongside own data builds authority

---

## Images — 70/100 (was 35)

### Fixed

- cave-art converted to WebP (1.5MB → 90KB)
- claude-preview converted to WebP (763KB → 86KB)
- Width/height attributes on all images
- Unnecessary preloads removed

### Remaining

- og-image.png is 528KB (convert to WebP/JPEG, target <100KB)
- Old .png files still in /public/ (not referenced but bloat deploy)
- Blog post "Built with Claude Code" has 4 images — verify they have width/height and are optimized
- No Next.js `<Image>` component usage (still using raw `<img>` tags)
- orient-logo.png is 26KB (could be smaller as WebP)

---

## Prioritized Action Plan

### This Week (High Impact, Low Effort)

1. **Self-host fonts with `next/font`** — Eliminate external font loading, fix render-blocking LCP issue. Biggest single performance win remaining.
2. **Add `image` + `dateModified` to pSEO Article schema** — 2 lines each in `ai-consulting-for/[industry]/page.tsx` and `compare/[slug]/page.tsx`.
3. **Populate Organization `sameAs`** — Add LinkedIn/Twitter URLs in `layout.tsx`.
4. **Delete dead files** — Remove cave-art.png, claude-preview.png, and boilerplate SVGs from /public/.
5. **Fix 404 robots conflict** — Create custom `not-found.tsx` with single robots directive.

### Next Week (High Impact, Medium Effort)

1. **Add named author with bio** — Replace Organization author with Person schema ("Pranav Ambwani"), add visible byline + LinkedIn link on all blog posts.
2. **Add privacy policy and terms of service pages** — Baseline trust signal and legal requirement.
3. **Expand Cowork blog post to 1,500+ words** — Add results data, open/reply rates, lessons learned.
4. **Add 2-3 external citations per page** — Link to Anthropic docs, industry reports, regulatory standards on industry pages.
5. **Rewrite H2/H3s as questions** — Convert declarative headings to question-based headings across body content (not just FAQs).

### Month 2+ (Growth)

1. **Expand FAQ answers to 134-167 words** — Self-contained citable passages for AI search.
2. **Create YouTube channel** — 3-5 case study/explainer videos (highest correlation with AI citation).
3. **Lazy-load Cal.com SDK** — Load on scroll/interaction instead of eagerly.
4. **Extract static sections to Server Components** — Reduce JS bundle by 40-50%.
5. **Add Content-Security-Policy header** — Last missing security header.
6. **Configure IndexNow** — Accelerate Bing/Yandex/Naver indexing.
7. **Update `dateModified` values** — Ensure posts that have been edited show different dateModified vs datePublished.
8. **Generate unique OG images per article** — Improve CTR in social sharing and search results.

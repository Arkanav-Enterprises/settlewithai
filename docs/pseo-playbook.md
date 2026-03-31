# Programmatic SEO Playbook

Learnings from analyzing Canary (canarychat.app, ~100 impressions/day) and applying them to Settle.

---

## The pSEO Model

Three content categories, each targeting a different search intent:

| Category | URL Pattern | Intent | Example |
|----------|-------------|--------|---------|
| **Comparisons** | `/compare/{slug}` | Commercial — "X vs Y", "alternative to X" | `/compare/diy` |
| **Industry pages** | `/ai-consulting-for/{industry}` | Vertical — "AI for healthcare" | `/ai-consulting-for/manufacturing` |
| **Blog/Guides** | `/blog/{slug}` | Educational — long-tail how-to queries | `/blog/orient-case-study` |

Each category multiplies your keyword surface area without requiring unique design work per page.

---

## Content Infrastructure

### MDX + Dynamic Routes
- Content lives in `src/content/{type}/*.mdx` as markdown with YAML frontmatter
- Dynamic `[slug]` routes use `generateStaticParams` to pre-build all pages at build time
- Content loader (`src/lib/content.ts`) handles frontmatter parsing, reading time, and slug discovery
- `remark-gfm` is required for table rendering in `next-mdx-remote`

### Frontmatter Schema
Every MDX file needs:
```yaml
title: "SEO-optimized title (under 60 chars for SERP display)"
description: "150-160 char meta description with primary keyword"
slug: "url-slug"
date: "YYYY-MM-DD"
keywords: ["primary keyword", "secondary keyword", ...]
faq:
  - question: "..."
    answer: "..."
```

### Per-Page SEO Outputs
Each page automatically gets:
- `<title>` via `generateMetadata` with `%s | Brand` template
- Open Graph + Twitter card meta tags
- Canonical URL
- Article JSON-LD schema
- BreadcrumbList JSON-LD schema
- FAQPage JSON-LD schema (from frontmatter `faq` array)

---

## Content Templates

### Comparison Page (~2,500-3,500 words)
1. **Quick verdict** — blockquote summarizing when to choose each option
2. **Comparison table** — 6-8 dimensions with clear winners per row
3. **Deep dive sections** — H2 per major comparison dimension
4. **Cost comparison** — honest pricing analysis
5. **Who should choose each** — specific recommendations
6. **FAQ** — 6-8 questions targeting "People Also Ask" queries
7. **CTA** — link to contact/demo

### Industry Page (~2,500-3,500 words)
1. **Industry problem hook** — stat + pain point specific to the vertical
2. **Why this industry needs [your service]** — market context
3. **4-6 use cases** — with conversation examples or workflow descriptions
4. **Business case / ROI** — specific metrics (use real case study data)
5. **How we deploy for [industry]** — methodology applied to vertical
6. **FAQ** — 6-8 industry-specific questions
7. **CTA** — link to case study or contact

### Key Content Rules
- Use first person ("we") for your brand, not third person
- Include real data from case studies where possible
- Don't fabricate competitor pricing — use "typically" with ranges
- Be respectful of alternatives — position on strengths, not competitor weaknesses
- No exclamation marks or hype language
- Target 5-8 mentions of primary keyword per page

---

## SEO Infrastructure Checklist

### Technical
- [ ] Dynamic `sitemap.ts` that auto-discovers all content pages
- [ ] `robots.txt` allowing major crawlers (Googlebot, GPTBot, ClaudeBot, PerplexityBot)
- [ ] Canonical URLs on every page
- [ ] `llms.txt` in public/ for AI search engines
- [ ] Security headers (X-Frame-Options, HSTS, Referrer-Policy)
- [ ] Clean URLs (no trailing slashes, no extensions)
- [ ] 301 redirects for any URL changes

### Schema Markup (JSON-LD)
- [ ] Organization schema (root layout)
- [ ] WebSite schema (root layout)
- [ ] Service/SoftwareApplication schema (root layout)
- [ ] FAQPage schema (every page with FAQ section)
- [ ] Article schema (every content page)
- [ ] BreadcrumbList schema (every content page)

### Internal Linking
- [ ] Footer link hub with all pSEO pages (5-column layout)
- [ ] Breadcrumb navigation on all content pages
- [ ] "Further reading" section at bottom of articles
- [ ] Cross-links between comparison and industry pages in body content

### Content
- [ ] Title tags under 60 characters
- [ ] Meta descriptions 150-160 characters
- [ ] One H1 per page, proper H2/H3 hierarchy
- [ ] Alt text on all images
- [ ] Reading time displayed

---

## Page Authority Distribution

The footer is the most important SEO infrastructure component. Every page includes the footer, so every link in it gets crawled from every page on the site. Structure:

```
Company    | Compare       | Industries (1) | Industries (2) | Blog
Home         vs Competitor1  Industry 1       Industry 6       Post 1
Blog         vs Competitor2  Industry 2       Industry 7       Post 2
Contact      vs Competitor3  Industry 3       Industry 8       Post 3
             vs Competitor4  Industry 4       Industry 9       Post 4
             vs Competitor5  Industry 5       Industry 10      Post 5
```

---

## Scaling Playbook

### Adding a new comparison page
1. Create `src/content/comparisons/{slug}.mdx` with frontmatter
2. Add link to `src/components/layout/Footer.tsx`
3. Sitemap and route generation are automatic

### Adding a new industry page
1. Create `src/content/industries/{slug}.mdx` with frontmatter
2. Add link to Footer
3. Sitemap and route generation are automatic

### Content Generation Pipeline (from Canary)
Canary automates content with a 6-stage pipeline:
1. **Research** — web search for competitor data, industry stats
2. **Draft** — AI generates first draft with keyword targets
3. **Validate** — automated checks (word count, keyword density, frontmatter)
4. **Review** — higher-capability model scores across 12 dimensions
5. **Revise** — conditional rewrite of flagged sections
6. **Publish** — move to content directory

Average: ~20 min/page, parallelizable.

---

## Metrics to Track

- **Google Search Console**: impressions, clicks, CTR, average position per page
- **Which pages get impressions first** — double down on that content category
- **Backlink acquisition** — directory submissions (Product Hunt, G2, Capterra, AI directories)
- **Domain authority growth** — target +5-15 DR within 4-12 weeks of launch

---

## Sources
- Canary (canarychat.app) — analyzed March 2026, GitHub: github.com/uambwani/canary
- Anthropic Claude use cases: https://claude.com/resources/use-cases

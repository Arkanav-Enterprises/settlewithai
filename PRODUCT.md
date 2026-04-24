# Settle — Product context

Context file for the `impeccable` design skill and any other context-aware
tooling that lands in this repo. Read before shipping UI. Paired with
`DESIGN.md` for the visual system.

## Register

**brand**

This repo is the marketing site at **settlewithai.com**. Design IS the
product. Every page, loop, scroll interaction, and piece of typography is a
pitch — we are a studio selling craft, so the site itself has to read as
craft. Not a product UI. Not a dashboard. Not an admin panel.

If a future surface in this repo is genuinely a product tool (an in-browser
agent runner, a customer-facing app UI), override this register per-task.
The current repo has none of those — everything is editorial, campaign, or
long-form content.

## Users

Two concentric audiences, in priority order.

**1. Mid-market operators (primary).** CEOs, COOs, founders, and ops leads
at companies between 50 and 500 employees, usually in traditional verticals
— manufacturing, distribution, logistics, professional services, healthcare,
real estate, legal, finance. They are not hostile to AI, but they are tired
of AI hype. They have probably tried ChatGPT's free tier, found it
underwhelming, and are now unsure what to do. They are reading this site on
a laptop, between meetings, and will leave in 12 seconds if it looks like a
SaaS landing page.

Ten-second test for this audience: they should feel that whoever built this
site has actually been inside a factory, not that they are being sold at.

**2. AI-native peers (secondary).** Other founders, engineers, and product
people in the Claude / Anthropic orbit who find us via the blog, social, or
word of mouth. They are reading for craft (how we deploy, how we think, how
we write). If they are impressed, they refer. If they are bored, they close
the tab. Every blog post should pass their taste test before it passes the
primary audience's.

Never write a page that trades off the primary audience to please the
secondary, or vice versa. The overlap is 100% achievable because both
audiences reward the same thing: specificity, honesty, craft.

## Product purpose

Settle is a full-stack AI deployment studio. We install Claude AI — not a
custom model, not a wrapper, not a chatbot — into the actual workflows of
mid-market businesses. The site sells three things, in this order:

1. **The studio** — that it exists, that it is founder-led, that it
   deploys Claude end-to-end (discovery → instructions → agents →
   integrations → optimization).
2. **The proof** — one deep client case study (Orient Printing & Packaging,
   79 years old, 50+ countries, 49 use cases mapped, 11 production systems
   in 60 days), plus a blog archive of field notes from real deployments.
3. **The way in** — one booking link, one contact form, one marketplace of
   pre-built agents at `marketplace.settlewithai.com`.

The site does not try to explain every possible use case. It tries to
convince the right reader, fast, that Settle is the right studio for the
engagement they already know they need.

## Brand positioning

### What we are
- A **studio**, not a SaaS company. We ship working systems, not licenses.
- A **craft operation**, not a scaled consultancy. Every engagement runs
  through Pranav personally; no account managers.
- **Exclusively Claude** — we chose one frontier model and got good at it,
  instead of being mediocre across six.
- **On-site by default.** We visit the factory, the office, the operations
  floor. *"You can't AI-deploy a factory from a Slack channel."*

### What we are not
- Not "AI transformation consultants" — the phrase is a joke to our
  audience.
- Not selling seats or licenses — we sell shipped systems.
- Not a chatbot vendor — the primary output of a Settle engagement is a
  production-grade document generator, RFQ responder, spec builder, or
  operations agent. Chat is the interface, not the product.
- Not a scaled agency — we are deliberately small and deliberately
  selective.

### The one-line
*"We deploy Claude AI inside mid-market operations. Usually in weeks.
Founder-led, on-site, built to survive a factory."*

## Tone and voice

Two surfaces, two voices. Never mix them.

**Voice A — "Pranav personal"** (LinkedIn, X, founder-led blog drafts,
comments). Lowercase, no terminal periods on standalone lines, short
sentences, single-line beats allowed, no hashtags, no emojis. Confident
through specifics, never superlatives. *"11 production claude systems live
in 60 days"* is the flex. Never *"we are the best."*

**Voice B — "Settle business"** (this site's long-form body copy, email,
MOUs, brochures, blog articles, landing body, the marketplace platform).
Sentence case, real periods, warm but professional. Short paragraphs still
— sentence case doesn't mean rambling. No hype words, same ban list as
Voice A.

Full rules in `docs/socials/voice-guide.md`. Read that file before writing
any public-facing copy; it overrides this summary if they conflict.

### Banned words (both voices)
delve / dive deep / leverage / utilize / moreover / furthermore /
additionally / in conclusion / key takeaway / it's important to note /
let's unpack / paradigm / synergy / best-in-class / world-class /
industry-leading / transformative / game-changing / revolutionary /
journey (as in "AI journey") / unlock / at the end of the day / circle
back / touch base.

### Banned constructions
- *"Not just X, but Y"* — AI parallel structure.
- Em dash + word + em dash for emphasis (*"the answer — believe it or not
  — is..."*). Banned.
- Three-item lists with *and* cadence (*"speed, quality, and scale"*).
- Rhetorical questions as rhetorical devices (*"What if I told you...?"*).
- Starting consecutive paragraphs with *"But"*.
- *"Imagine if..."*, *"Picture this..."*, *"The truth is..."*.

### Em dash budget
One or two per long piece. More than that and the writing reads as
machine-generated. Always test: can a period, comma, or parenthesis replace
this em dash?

## Anti-references

Design and copy choices that Settle should read as the **opposite** of.
When a page drifts in any of these directions, it is wrong — rebuild.

- **Generic AI-SaaS landing pages** — animated gradient hero, neon
  callout, three feature cards with icons, *"Join 10,000+ teams
  scaling with AI."* Read as slop. We are the reverse.
- **Big-consultancy slideware** — McKinsey-style 3x2 grids, corporate
  stock photography, *"Unlocking transformation through AI-enabled
  synergies."* Our audience has been pitched this for a decade and resents
  it.
- **Developer-tool minimalism** — black bg, monospaced everything,
  terminal aesthetic. Not wrong as a style, but wrong for Settle's
  audience — it flags "built by engineers for engineers" and our buyer is
  a manufacturing CEO.
- **Y Combinator startup homepage** — centered hero, logo garden, testimonial
  carousel, *"Try it free."* Correct for SaaS, fatal for a studio.

## Reference touchpoints

Design, typography, and editorial surfaces that Settle borrows from.

- **Anthropic.com** — the warm cream bg, restrained salmon accent, serif
  headings, generous whitespace. Settle's visual lineage. We look like we
  belong on a Claude case-study page because we are one.
- **The New Yorker / The Economist** — long-form editorial weight, strong
  serif display, italic sell lines, small-caps metadata, tabular numbers.
  The blog's *Field Notes* treatment is explicit homage.
- **Kinfolk / Monocle** — the quiet-luxury magazine register. Muted,
  confident, unhurried. Not frenetic product marketing.
- **Stripe's early landing pages (2014-2018)** — the last time a tech
  company shipped a site that read like a product, not an ad. The
  typographic discipline is the reference.
- **Brandon Chu's *Black Box of PM*** — for long-form writing cadence.
- **Lenny Rachitsky's newsletter** — for journey-driven, specific,
  personal storytelling.

## Strategic principles

The through-lines that every page, post, and interaction should reinforce.

1. **We go on-site. Always.** Factory visits, in-person discovery,
   knowledge base mapping with the actual operators. Every time it's
   relevant, signal this.
2. **AI deployment is a craft, not a license.** We are against the
   "buy seats, call it transformation" model. Say this directly.
3. **The bottleneck was never the model. It was the instructions.**
   Capability without structure is just a chat window. The structure is
   where the value lives.
4. **Founder-led, by design.** Every engagement runs through Pranav
   personally. No account managers. This is a feature, not a scaling
   problem we haven't solved yet.
5. **One knowledge base, three surfaces, always consistent.** The Orient
   architecture pattern — branded proposal, RFQ response, service manual
   query, all reading from the same living KB.
6. **Show the work, not the pitch.** Every case study ends with an
   artifact (a generated proposal, a screenshot of the agent at work, a
   before/after). Never abstract language when a concrete artifact is
   available.

## Confidence markers (available, never shoehorn)

Drop at most one per surface. Specific, never superlative.

- **USC, BS Electrical Engineering, 4.0 GPA across six consecutive
  semesters.**
- **Nine years in Los Angeles** (product + growth in B2B SaaS and fintech
  before returning to Delhi to start Settle).
- **Bootstrapped two ventures back-to-back** (Long Tail Ventures, Settle).
- **First client: Orient Printing & Packaging** — 79 years old, 50+
  countries, 20,000+ units installed. 49 use cases mapped, 11 production
  systems live in under 60 days. 85% faster document generation. 4hr → 30min
  quotation time.
- **We go on-site. Always. You can't AI-deploy a factory from a Slack
  channel.** — the memorable founder-post line.

Off the table for sales surfaces: crypto background (defiXBT,
voldemortxbt), investment returns, equity positions. Saved for personal
narrative posts only.

## What should not appear on this site

- Pricing in public (post a range only when specifically asked, and say
  *"varies with scope"*).
- Naming clients other than Orient unless they explicitly agreed.
- Naming competitors (Infosys, TCS, Accenture, etc.) — use *"big
  consultancies"* instead.
- Anything that sounds like a SaaS pitch: *"platform", "scalable",
  "automated onboarding"*. We are a studio, not SaaS.

## Current surfaces (repo map)

For the design skill's orientation.

- **Homepage** (`src/app/page.tsx`) — editorial long-scroll. Hero → globe
  → what-we-do → Orient case card → process scroll → promo loop →
  design-output scroll → Ask-Claude chat → contact.
- **Blog index** (`src/app/blog/page.tsx`) — *Field Notes* masthead,
  magazine cover story, secondary spread, archive grouped by month.
- **Blog posts** (`src/app/blog/<slug>/page.tsx`) — `MagazineHeader` +
  `prose-settle` body + optional `PullQuote` + `MagazineOutro`.
- **Marketplace** — lives in a separate repo (`settle-client-brain`) at
  `marketplace.settlewithai.com`. Different register (closer to product
  than brand), different rules.

---

**Last updated:** 2026-04-24

**Keep this file alive.** When a strategic principle evolves, or a new
anti-reference surfaces, edit here first. The design skill reads this file
fresh on every invocation, so the update takes effect immediately.

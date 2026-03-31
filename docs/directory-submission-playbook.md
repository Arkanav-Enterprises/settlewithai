# Directory Submission & Authority Building Playbook

Modeled after Canary's 7-tier strategy. Adapted for Settle (AI deployment studio, not SaaS product).

---

## Search Engine Setup (Do First)

### Google Search Console
- URL: https://search.google.com/search-console
- Add property: `https://settlewithai.com`
- Verify via DNS TXT record or HTML file
- Submit sitemap: `https://settlewithai.com/sitemap.xml`
- **Status:** Likely already set up (GA is configured)

### Bing Webmaster Tools
- URL: https://www.bing.com/webmasters
- Add site: `https://settlewithai.com`
- Verify via meta tag (set `NEXT_PUBLIC_BING_VERIFICATION` env var in Vercel)
- Submit sitemap: `https://settlewithai.com/sitemap.xml`
- **Why it matters for LLM SEO:** Bing powers Microsoft Copilot, ChatGPT web search (via Bing API), and DuckDuckGo. If Bing hasn't indexed your pages, they won't appear in any of these AI search experiences.

### IndexNow Protocol
- Key file deployed at: `/5f7d82d13bf047888b81a97f2a90e955.txt`
- Notify Bing of new/updated pages instantly:
  ```
  curl "https://api.indexnow.org/indexnow?url=https://settlewithai.com/NEW-PAGE-URL&key=5f7d82d13bf047888b81a97f2a90e955"
  ```
- Supported by: Bing, Yandex, Seznam, Naver
- **When to use:** After publishing any new page or significant content update

### Yandex Webmaster
- URL: https://webmaster.yandex.com
- Lower priority but free and feeds into Yandex search (used in parts of Asia/Europe)

---

## Tier 1: High-Impact Launch Platforms (Week 1)

**Goal:** Immediate visibility + high-DR backlinks

### Product Hunt
- URL: https://www.producthunt.com/posts/new
- DR: 91 | Cost: Free
- **Listing copy:**
  - Tagline: "Deploy Claude AI across your team's actual workflows"
  - Description: "Settle is an AI deployment studio that settles Claude (Anthropic's AI) into businesses. We mapped 49 use cases and deployed 11 AI projects for a 79-year-old manufacturer — with 85% faster document generation from month one. No DIY prompting, no six-month consulting engagements. Structured rollouts that ship working projects in weeks."
  - Category: Artificial Intelligence, Productivity
  - Maker comment: Focus on Orient case study results
- **Tip:** Launch on Tuesday-Thursday for best visibility

### Hacker News (Show HN)
- URL: https://news.ycombinator.com/submit
- DR: 91 | Cost: Free
- **Post title:** "Show HN: We deploy Claude AI into businesses — mapped 49 use cases at a 79-year-old manufacturer"
- **Body:** Technical angle — instruction engineering, MCP integration, structured rollouts. HN audience appreciates depth, not marketing.
- **Tip:** Post between 8-10am ET on weekdays

### Crunchbase
- URL: https://www.crunchbase.com/add-new
- DR: 91 | Cost: Free (basic profile)
- **Profile:** Company name, description, founding date, category (AI Consulting), website
- **Tip:** Keep it factual — Crunchbase penalizes marketing language

---

## Tier 2: SaaS Review Platforms (Week 1-2)

**Goal:** Build trust signals + review-based backlinks

### G2
- URL: https://sell.g2.com/create-a-profile
- DR: 91 | Cost: Free (basic listing)
- Category: AI Consulting, AI Development
- **Tip:** Ask Orient (or future clients) to leave a review. Even 1-2 reviews make the listing credible.

### Capterra
- URL: https://www.capterra.com/vendors/sign-up
- DR: 89 | Cost: Free listing
- Category: AI Software, Consulting
- **Tip:** Capterra is owned by Gartner. Listing here feeds into GetApp and Software Advice automatically.

### TrustRadius
- URL: https://www.trustradius.com/vendors
- DR: 82 | Cost: Free
- **Tip:** Strong for B2B — decision-makers use TrustRadius for vendor evaluation.

### Clutch
- URL: https://clutch.co/register
- DR: 78 | Cost: Free
- Category: AI Consulting, IT Consulting
- **Tip:** Clutch is strong for services companies (vs product companies). Good fit for Settle.

---

## Tier 3: AI-Specific Directories (Week 2-3)

**Goal:** Category authority in AI space

### There's An AI For That (TAAFT)
- URL: https://theresanaiforthat.com/submit
- DR: 75 | Cost: ~$347 (featured listing)
- Category: AI Consulting, AI Deployment
- **Consider:** High DR, very targeted audience. Worth the investment.

### Toolify.ai
- URL: https://www.toolify.ai/submit
- DR: 68 | Cost: ~$99
- Category: AI Tools, Business AI

### Futurepedia
- URL: https://www.futurepedia.io/submit-tool
- DR: 65 | Cost: Free (basic), paid for featured
- Category: AI for Business, Productivity AI

### AI Tool Directory
- URL: https://aitoolsdirectory.com/submit
- DR: 50 | Cost: Free

### TopAI.tools
- URL: https://topai.tools/submit
- DR: 55 | Cost: Free

---

## Tier 4: Startup & Indie Platforms (Week 3-4)

**Goal:** Early-stage visibility + community

### BetaList
- URL: https://betalist.com/submit
- DR: 70 | Cost: $129 (skip the queue)
- **Tip:** Position as "just launched" even if live. BetaList audience loves early-stage.

### Indie Hackers
- URL: https://www.indiehackers.com/products/new
- DR: 75 | Cost: Free
- **Profile + launch post.** Write about the journey: "How we deployed Claude AI at a 79-year-old manufacturer"

### MicroLaunch
- URL: https://microlaunch.net/submit
- DR: 45 | Cost: Free

### Launching Next
- URL: https://www.launchingnext.com/submit
- DR: 50 | Cost: Free

---

## Tier 5: Professional & B2B Directories (Week 2-4)

**Goal:** B2B credibility + niche backlinks

### LinkedIn Company Page
- URL: https://www.linkedin.com/company/setup/new
- DR: 98 | Cost: Free
- **Essential.** Post Orient case study, share blog posts, engage with AI deployment content.

### AngelList / Wellfound
- URL: https://wellfound.com/company/new
- DR: 90 | Cost: Free
- Category: AI, Consulting

### F6S
- URL: https://www.f6s.com/company/create
- DR: 72 | Cost: Free
- Category: AI, B2B Services

---

## Tier 6: Comparison & Alternative Directories (Week 4)

**Goal:** Capture "alternative to X" searches

### AlternativeTo
- URL: https://alternativeto.net/suggest/
- DR: 87 | Cost: Free
- **List as alternative to:** Deloitte AI, Accenture AI, generic AI consulting
- **Tip:** This directly supports our `/compare/` pages

### SaaSHub
- URL: https://www.saashub.com/submit
- DR: 76 | Cost: Free
- **List as alternative to:** Big consulting firms, freelance AI consultants

### SourceForge
- URL: https://sourceforge.net/software/product/new
- DR: 92 | Cost: Free
- Category: AI Tools, Business Software

---

## Tier 7: Content & Community Submissions (Ongoing)

### Reddit
- Subreddits: r/artificial, r/ClaudeAI, r/smallbusiness, r/manufacturing, r/consulting
- **Rules:** Never self-promote directly. Share genuine insights, case study learnings, and link naturally.
- **Post ideas:**
  - "We deployed AI at a 79-year-old manufacturer. Here's what actually worked."
  - "Why instruction engineering matters more than prompt engineering for business AI"

### Twitter/X
- Share blog posts, tool launches, case study snippets
- Engage with Anthropic, Claude, AI deployment conversations
- Tag @AnthropicAI when sharing Claude deployment results

### Dev.to / Hashnode
- DR: 85+ | Cost: Free
- Cross-post technical blog content (instruction engineering, MCP, deployment methodology)
- Include canonical URL back to settlewithai.com

---

## Budget Summary

| Item | Cost |
|------|------|
| TAAFT (featured) | $347 |
| Toolify.ai | $99 |
| BetaList (skip queue) | $129 |
| Everything else | Free |
| **Total** | **$575** |

---

## Expected Results

| Timeline | Expected Outcome |
|----------|------------------|
| Week 1 | 5-8 directory listings live, sitemap submitted to Google + Bing |
| Week 2 | 10-15 listings, first G2/Capterra reviews requested |
| Week 4 | 20+ backlinks from DR 50-91 domains |
| Month 2 | Domain authority measurable increase (+5-10 DR) |
| Month 3 | Comparison + industry pages start ranking for long-tail keywords |

---

## Tracking

Create a spreadsheet with columns:
- Directory name
- URL submitted
- Date submitted
- Status (Pending / Live / Rejected)
- Backlink type (Dofollow / Nofollow)
- DR of directory
- Notes

Review weekly and follow up on pending submissions.

---

## Bing + LLM SEO Checklist

Bing is the backbone of AI-powered search. Here's why and what to do:

| AI Product | Search Backend | Why Bing Matters |
|-----------|---------------|------------------|
| Microsoft Copilot | Bing | Direct Bing index |
| ChatGPT web search | Bing API | Bing results feed ChatGPT answers |
| DuckDuckGo | Bing | Bing-powered results |
| Perplexity | Multiple (incl. Bing) | Bing is one of several sources |
| Google AI Overviews | Google | Separate — needs GSC |

**Action items:**
- [x] robots.txt allows Bingbot and msnbot
- [x] IndexNow key deployed for instant Bing notification
- [ ] Set `NEXT_PUBLIC_BING_VERIFICATION` in Vercel env vars after Bing verification
- [ ] Submit sitemap in Bing Webmaster Tools
- [ ] Submit sitemap in Google Search Console (if not already done)
- [x] llms.txt deployed for AI crawler context
- [x] Allow GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, ChatGPT-User in robots.txt

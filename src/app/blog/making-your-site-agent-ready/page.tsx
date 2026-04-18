import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { BlogTOC } from "@/components/blog/BlogTOC";
import { Nav } from "@/components/layout/Nav";
import { MagazineHeader } from "@/components/blog/MagazineHeader";
import { MagazineOutro } from "@/components/blog/MagazineOutro";

export const metadata: Metadata = {
  title:
    "We Took Our Site From 25 to 83 on Cloudflare's Agent Scanner. Here's the Playbook.",
  description:
    "AI agents are a new class of visitor. They read HTTP headers, follow manifests, and hit well-known URLs. Here's the four-pillar checklist we used to make settlewithai.com agent-native — and what we deliberately didn't fake.",
  keywords: [
    "AI agent optimization",
    "agent readiness",
    "isitagentready",
    "llms.txt",
    "well-known URIs",
    "MCP server card",
    "WebMCP",
    "agent skills",
    "Cloudflare content signals",
    "AI SEO",
    "API catalog RFC 9727",
    "robots.txt AI crawlers",
  ],
  alternates: {
    canonical:
      "https://settlewithai.com/blog/making-your-site-agent-ready",
  },
  openGraph: {
    type: "article",
    title:
      "We Took Our Site From 25 to 83 on Cloudflare's Agent Scanner. Here's the Playbook.",
    description:
      "Four pillars, seven fixes, and two manifests we deliberately didn't publish. The high-level walk-through of making a public site legible to AI agents.",
    url: "https://settlewithai.com/blog/making-your-site-agent-ready",
    siteName: "Settle",
    publishedTime: "2026-04-18T00:00:00Z",
    authors: ["Pranav Ambwani"],
    images: [
      {
        url: "/og-image.png",
        width: 1519,
        height: 1090,
        alt: "Making your site agent-ready — Settle",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "We Took Our Site From 25 to 83 on Cloudflare's Agent Scanner. Here's the Playbook.",
    description:
      "The four pillars of AI agent readiness and the high-level fixes that moved us from Level 1 to Level 5.",
  },
};

export default function Article() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "We Took Our Site From 25 to 83 on Cloudflare's Agent Scanner. Here's the Playbook.",
    description:
      "AI agents are a new class of visitor. They read HTTP headers, follow manifests, and hit well-known URLs. Here's the four-pillar checklist we used to make settlewithai.com agent-native — and what we deliberately didn't fake.",
    datePublished: "2026-04-18T00:00:00Z",
    dateModified: "2026-04-18T00:00:00Z",
    image: "https://settlewithai.com/og-image.png",
    author: {
      "@type": "Person",
      name: "Pranav Ambwani",
      jobTitle: "Founder",
      url: "https://settlewithai.com",
      sameAs: ["https://www.linkedin.com/in/pranavambwani/"],
      description:
        "Founder of Settle, a full-stack AI agency for manufacturers and mid-market teams. Deploys Claude AI into operations — structured rollouts, production-grade instructions, real results.",
      worksFor: {
        "@type": "Organization",
        name: "Settle",
        url: "https://settlewithai.com",
      },
    },
    publisher: {
      "@type": "Organization",
      name: "Settle",
      logo: {
        "@type": "ImageObject",
        url: "https://settlewithai.com/apple-touch-icon.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id":
        "https://settlewithai.com/blog/making-your-site-agent-ready",
    },
  };

  return (
    <>
      <BlogTOC />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://settlewithai.com" },
              { "@type": "ListItem", position: 2, name: "Blog", item: "https://settlewithai.com/blog" },
              { "@type": "ListItem", position: 3, name: "Making Your Site Agent-Ready", item: "https://settlewithai.com/blog/making-your-site-agent-ready" },
            ],
          }),
        }}
      />

      <Nav />

      <MagazineHeader
        category="Engineering"
        issue="No. 21"
        title="We Took Our Site From 25 to 83 on Cloudflare's Agent Scanner. Here's the Playbook."
        deck="AI agents are a new class of visitor. They don't scroll, don't scan images, don't click through menus. They read HTTP headers, follow manifests, and hit well-known URLs. Here's what we added to settlewithai.com so agents could actually use it — and what we deliberately left unbuilt."
        author="Pranav Ambwani"
        date="2026-04-18"
        readingTime="9 min read"
      />

      <article className="max-w-[720px] mx-auto px-6 lg:px-10 pb-24 md:pb-36">
        <div className="prose-settle">
          <h2>A new kind of visitor</h2>
          <p>
            Your website was built for humans. It assumes eyes that scan,
            fingers that click, scroll bars that reveal what&apos;s below the
            fold. Most of what makes a site feel polished (the hero video, the
            generous whitespace, the scroll-triggered animations) is invisible
            to the next class of visitor already knocking at the door.
          </p>
          <p>
            AI agents don&apos;t scroll. They fetch. They don&apos;t click
            through menus. They read HTTP headers and follow manifests. They
            don&apos;t scan images. They want plain text they can reason about.
          </p>
          <p>
            Cloudflare recently launched a scanner at{" "}
            <a
              href="https://isitagentready.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              isitagentready.com
            </a>{" "}
            to test exactly this: how readable is your site to a visitor that
            isn&apos;t a human? On our first scan, settlewithai.com scored
            25 out of 100. Level 1 &mdash; Basic Web Presence.
          </p>
          <p>
            A few hours of work later, we scored 83. Level 5 &mdash;
            Agent-Native. The scanner&apos;s top tier.
          </p>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/blog/agent-readiness-scan.png"
            alt="isitagentready.com scan result for settlewithai.com showing a score of 83 out of 100 and a Level 5 Agent-Native classification"
            width={1600}
            height={1340}
            loading="lazy"
            className="rounded-xl border border-[rgba(20,20,19,0.1)] my-10"
          />
          <p className="text-[13px] text-text-muted mt-[-1.5rem] mb-8">
            Scan result via{" "}
            <a
              href="https://isitagentready.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              isitagentready.com
            </a>
            , Cloudflare&apos;s public agent-readiness scanner.
          </p>

          <p>
            This post isn&apos;t a victory lap. It&apos;s a walk-through of
            the four categories the scanner checks, the kind of signals each
            one wants, and what we decided not to fake. If you run a public
            site, you&apos;ll want to do this exercise soon. Agents are
            already crawling.
          </p>

          <h2>What the scanner actually checks</h2>
          <p>
            The scanner tests four categories, each with a handful of
            concrete checks:
          </p>
          <ol>
            <li>
              <strong>Discoverability.</strong> Can an agent find your
              structured content without guessing URLs?
            </li>
            <li>
              <strong>Content accessibility.</strong> Can an agent read your
              page in a format that isn&apos;t styled HTML?
            </li>
            <li>
              <strong>Bot access control.</strong> Have you declared intent
              about what crawlers can and can&apos;t do with your content?
            </li>
            <li>
              <strong>API, auth, MCP, and skills.</strong> Have you advertised
              the tools an agent can actually call?
            </li>
          </ol>
          <p>
            Most public sites fail most of these. Not because they&apos;re
            misconfigured, but because the signals mostly didn&apos;t exist
            three years ago. The category is that new.
          </p>

          <h2>Pillar one: discoverability</h2>
          <p>
            The web evolved around one discovery mechanism: Google. You
            optimised for search, you wrote meta tags, you submitted a
            sitemap. That was mostly enough.
          </p>
          <p>
            Agents don&apos;t use Google. They fetch your homepage and inspect
            the HTTP response headers. Specifically, they look at the{" "}
            <code>Link</code> header, a standards-based mechanism for
            pointing to related resources. It&apos;s been around since{" "}
            <a
              href="https://www.rfc-editor.org/rfc/rfc8288"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              RFC 8288
            </a>
            , but most sites only use it for CDN preload hints.
          </p>
          <p>
            There are four link relations worth advertising on your root
            URL:
          </p>
          <ul>
            <li>
              <code>describedby</code> &mdash; points to a plain-text summary
              of your site (typically an llms.txt file)
            </li>
            <li>
              <code>service-desc</code> &mdash; points to a machine-readable
              API description (OpenAPI, for example)
            </li>
            <li>
              <code>service-doc</code> &mdash; points to human-readable API
              docs
            </li>
            <li>
              <code>api-catalog</code> &mdash; points to a linkset of all
              your APIs, using{" "}
              <a
                href="https://www.rfc-editor.org/rfc/rfc9727"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                RFC 9727
              </a>
            </li>
          </ul>
          <p>
            A well-configured homepage returns a <code>Link</code> header
            that mentions all of these. An agent can hit <code>/</code> with
            a HEAD request and immediately know what else you have. No
            crawl, no URL guessing.
          </p>
          <p>
            The pointer: if you have docs, an API, or structured context,
            advertise it at the HTTP layer. Don&apos;t rely on the agent
            finding the right URL.
          </p>

          <h2>Pillar two: content accessibility</h2>
          <p>Here&apos;s a quick test you can run on your own site:</p>
          <pre><code>curl -H &apos;Accept: text/markdown&apos; https://your-site.com/</code></pre>
          <p>
            If you get back HTML, your site isn&apos;t agent-accessible. You
            gave the agent a representation it explicitly asked not to
            receive.
          </p>
          <p>
            There&apos;s a community proposal called{" "}
            <a
              href="https://llmstxt.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              llms.txt
            </a>{" "}
            that solves part of this: publish a single markdown file at{" "}
            <code>/llms.txt</code> summarising your site, with links to the
            canonical pages. It&apos;s a sitemap for LLMs, written as prose.
          </p>
          <p>
            The stronger pattern is content negotiation. When an agent sends
            an <code>Accept: text/markdown</code> header, return the markdown
            version of the page it actually asked for. Humans still get the
            full styled HTML. Agents get the representation they can reason
            about.
          </p>
          <p>
            One detail that bites everyone: set <code>Vary: Accept</code> on
            the response so shared caches don&apos;t serve the wrong version
            to the wrong visitor. Sites add content negotiation, forget the
            Vary header, and CDN caches start handing markdown to browsers
            and HTML to agents. Debugging that is miserable.
          </p>
          <p>
            The pointer: at minimum, publish an llms.txt. Ideally, negotiate
            content types on every significant page, and remember the Vary
            header.
          </p>

          <h2>Pillar three: bot access control</h2>
          <p>
            Most robots.txt files were written for search engines. They say
            things like &ldquo;Googlebot can crawl everything except
            /admin.&rdquo; That vocabulary isn&apos;t expressive enough for
            what&apos;s happening now.
          </p>
          <p>
            Cloudflare proposed the{" "}
            <a
              href="https://contentsignals.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Content Signals
            </a>{" "}
            policy, which extends robots.txt with three directives that
            declare intent for how crawled content may be used:
          </p>
          <ul>
            <li>
              <code>search=yes|no</code> &mdash; whether your content may
              appear in traditional search indexes
            </li>
            <li>
              <code>ai-input=yes|no</code> &mdash; whether your content may
              be used as input for real-time AI answers
            </li>
            <li>
              <code>ai-train=yes|no</code> &mdash; whether your content may
              be used to train future AI models
            </li>
          </ul>
          <p>
            These signals don&apos;t enforce anything on their own.
            They&apos;re declarations. But well-behaved crawlers respect
            them, and the ecosystem is converging on this vocabulary faster
            than any prior bot-management convention.
          </p>
          <p>
            The pointer: declare intent. Ambiguity is worse than any
            specific answer, because it forces every crawler to guess.
          </p>

          <h2>Pillar four: API, auth, MCP, and skills</h2>
          <p>
            This is the frontier. Most sites have nothing here, and hitting
            even one manifest puts you ahead of 99% of the public web.
          </p>
          <p>
            A quick map of what to consider:
          </p>
          <p>
            <strong>If you have APIs</strong>, publish a{" "}
            <code>/.well-known/api-catalog</code> file using the RFC 9727
            linkset format. It&apos;s a single JSON document listing every
            API you offer, with links to their OpenAPI descriptions. Agents
            discover your full surface area in one request.
          </p>
          <p>
            <strong>If you have an{" "}
            <a
              href="https://modelcontextprotocol.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              MCP server
            </a></strong>{" "}
            (Model Context Protocol, the emerging standard for connecting
            agents to external systems), publish a server card at{" "}
            <code>/.well-known/mcp/server-card.json</code> pointing to the
            server&apos;s URL, protocol version, and transport type. Both
            Anthropic and OpenAI already support MCP discovery via this
            convention.
          </p>
          <p>
            <strong>If you&apos;ve published agent skills</strong> (reusable
            capabilities for Claude or similar models), the Agent Skills
            0.2.0 discovery schema lets you publish an index at{" "}
            <code>/.well-known/agent-skills/index.json</code> with signed
            digests of each skill. Hosts that trust the index can load the
            skills directly, with integrity guarantees.
          </p>
          <p>
            <strong>If your site is interactive</strong>,{" "}
            <a
              href="https://webmcp.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              WebMCP
            </a>{" "}
            lets you register in-browser tools that agents running in the
            user&apos;s browser can call. Useful for things like
            &ldquo;summarise the current state of this page&rdquo; or
            &ldquo;fetch my logged-in context.&rdquo; Client-side, no
            backend.
          </p>
          <p>
            The pointer: advertise the tools an agent can actually call. If
            you don&apos;t have any yet, that&apos;s the next thing to
            build &mdash; not the next manifest to write.
          </p>

          <h2>What we deliberately didn&apos;t ship</h2>
          <p>
            Two scanner checks remain at zero for us. Both involve OAuth
            metadata, and we skipped them intentionally.
          </p>
          <p>The scanner wants you to publish:</p>
          <ul>
            <li>
              <code>/.well-known/oauth-authorization-server</code>{" "}
              (<a
                href="https://www.rfc-editor.org/rfc/rfc8414"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                RFC 8414
              </a>) &mdash; metadata for your OAuth 2.0 authorization server
            </li>
            <li>
              <code>/.well-known/oauth-protected-resource</code>{" "}
              (<a
                href="https://www.rfc-editor.org/rfc/rfc9728"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                RFC 9728
              </a>) &mdash; metadata for a protected resource and the auth
              servers that can issue tokens for it
            </li>
          </ul>
          <p>
            The marketing site doesn&apos;t have a real OAuth 2.0
            authorization server. Publishing the metadata anyway would
            advertise endpoints that don&apos;t exist. An agent host would
            hit <code>/oauth/token</code>, get a 404, and silently fail.
          </p>
          <p>
            That&apos;s worse than not publishing at all.
          </p>
          <p>
            The principle: don&apos;t fake infrastructure. Every manifest you
            publish is a promise that something behind it works. Fake
            promises break trust in the whole ecosystem, not just your site.
          </p>
          <p>
            If you&apos;re tempted to add two JSON files to chase 100 on the
            scanner, stop. Build the auth server first. Then publish the
            metadata. The one-day manifest job is the last ten percent of a
            multi-week project, not a shortcut.
          </p>

          <h2>A 15-minute self-audit</h2>
          <p>
            Before you touch anything, run these against your own domain and
            see where you stand:
          </p>
          <pre><code>{`# Do you return a Link header with structured rels?
curl -I https://your-site.com/ | grep -i link

# Does your site serve markdown when asked?
curl -H 'Accept: text/markdown' https://your-site.com/

# Do you have an llms.txt?
curl -I https://your-site.com/llms.txt

# Do you declare AI intent in robots.txt?
curl -s https://your-site.com/robots.txt | grep -Ei 'ai-train|ai-input|search='

# Do you publish any well-known manifests?
curl -s https://your-site.com/.well-known/api-catalog
curl -s https://your-site.com/.well-known/mcp/server-card.json`}</code></pre>
          <p>
            Five curl commands, fifteen minutes, and a clear picture of what
            your site does and doesn&apos;t signal to agents. You don&apos;t
            need the scanner to do the work &mdash; the scanner just
            summarises what these commands already tell you.
          </p>

          <h2>Why this matters</h2>
          <p>
            The old SEO question was: how do I rank on Google? The new one
            is: can an agent use my site without a human?
          </p>
          <p>
            Both are about legibility to the visitor. Google&apos;s visitor
            was a human scanning SERPs with a cursor. The new visitor is a
            model executing a task on behalf of a human who never sees your
            domain. You win by being easy to parse, easy to verify, and
            honest about what you offer.
          </p>
          <p>
            Most public sites aren&apos;t there yet. Cloudflare built the
            scanner because the signals it measures mostly didn&apos;t
            exist a year ago. The fact that a half-day of work takes a site
            from Level 1 to Level 5 tells you how early we are.
          </p>
          <p>
            If you&apos;ve been thinking about this, or you haven&apos;t
            and that&apos;s why you&apos;re here, the next move is 15
            minutes of curl commands. See what&apos;s there. Fix what
            isn&apos;t. The work isn&apos;t hard. It&apos;s just new.
          </p>
        </div>

        {/* Author bio — required on every post per E-E-A-T SEO */}
        <div className="mt-16 pt-8 border-t border-border-light flex items-start gap-4">
          <div
            className="w-12 h-12 rounded-full bg-[#e8e6dc] flex items-center justify-center shrink-0 text-text font-medium text-lg"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            P
          </div>
          <div>
            <a
              href="/#contact"
              className="font-medium text-text hover:text-accent transition-colors"
            >
              Pranav Ambwani
            </a>
            <p className="text-sm text-text-muted mt-1 leading-relaxed">
              Founder of Settle. Deploys Claude AI into mid-market companies
              and manufacturers &mdash; structured rollouts,
              production-grade instructions, real results.
            </p>
          </div>
        </div>

        <MagazineOutro
          author="Pranav Ambwani"
          related={[
            {
              category: "Guide",
              title:
                "MCP Explained: How to Connect Your ERP, CRM, and Internal Systems to Claude",
              description:
                "Model Context Protocol lets Claude read and write to your business systems. Here's what it is and how any company can build one.",
              href: "/blog/mcp-explained-for-business",
            },
            {
              category: "Engineering",
              title: "How We Built This Entire Site with Claude Code",
              description:
                "Every component on settlewithai.com was built in Claude Code sessions. The CLI workflow, the screenshots-as-feedback loop, the invisible SEO layer.",
              href: "/blog/built-with-claude-code",
            },
          ]}
        />
      </article>

      <Footer />
    </>
  );
}

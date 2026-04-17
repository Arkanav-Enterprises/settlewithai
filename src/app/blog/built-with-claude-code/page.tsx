import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { BlogTOC } from "@/components/blog/BlogTOC";
import { Nav } from "@/components/layout/Nav";
import { MagazineHeader } from "@/components/blog/MagazineHeader";
import { MagazineOutro } from "@/components/blog/MagazineOutro";

export const metadata: Metadata = {
  title:
    "How We Built settlewithai.com Entirely with Claude Code",
  description:
    "Every component on our site — the WebGL globe, D3 mindmap, Cowork demo, SEO infrastructure — was built in Claude Code sessions. Here's how a CLI coding tool shipped an entire Next.js site.",
  keywords: [
    "Claude Code",
    "Anthropic CLI",
    "AI web development",
    "Next.js Claude AI",
    "Claude Code case study",
    "AI built website",
    "D3 force directed graph",
    "WebGL globe",
    "Claude AI development",
    "AI coding tool",
  ],
  alternates: {
    canonical:
      "https://settlewithai.com/blog/built-with-claude-code",
  },
  openGraph: {
    type: "article",
    title:
      "How We Built settlewithai.com Entirely with Claude Code",
    description:
      "Every component — WebGL globe, D3 mindmap, Cowork demo, SEO infrastructure — was built in Claude Code sessions. Here's how.",
    url: "https://settlewithai.com/blog/built-with-claude-code",
    siteName: "Settle",
    publishedTime: "2026-03-30T00:00:00Z",
    authors: ["Pranav Ambwani"],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "How We Built settlewithai.com Entirely with Claude Code",
    description:
      "Every component — WebGL globe, D3 mindmap, Cowork demo, SEO infrastructure — was built in Claude Code sessions. Here's how.",
  },
};

export default function Article() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "How We Built settlewithai.com Entirely with Claude Code",
    description:
      "Every component on our site — the WebGL globe, D3 mindmap, Cowork demo, SEO infrastructure — was built in Claude Code sessions. Here's how a CLI coding tool shipped an entire Next.js site.",
    datePublished: "2026-03-30T00:00:00Z",
    dateModified: "2026-03-30T00:00:00Z",
    image: "https://settlewithai.com/og-image.png",
    author: {
      "@type": "Person",
      name: "Pranav Ambwani",
      jobTitle: "Founder",
      url: "https://settlewithai.com",
      worksFor: {
        "@type": "Organization",
        name: "Settle",
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
        "https://settlewithai.com/blog/built-with-claude-code",
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
              { "@type": "ListItem", position: 3, name: "Built with Claude Code", item: "https://settlewithai.com/blog/built-with-claude-code" },
            ],
          }),
        }}
      />

      {/* Nav */}
      <Nav />

      <MagazineHeader
        category="Technical"
        issue="No. 04"
        title="How We Built This Entire Site with Claude Code"
        deck="Every component on settlewithai.com — the WebGL globe, the Cowork demo, the D3 mindmap, the SEO infrastructure — was built inside Claude Code, Anthropic's CLI coding tool. No web IDE. No copy-pasting. Just terminal sessions, screenshots, and iteration."
        author="Pranav Ambwani"
        date="2026-03-30"
        readingTime="12 min read"
      />

      {/* Article */}
      <article className="max-w-[720px] mx-auto px-6 lg:px-10 pb-24 md:pb-36">
        {/* Body */}
        <div className="prose-settle">
          <h2>Why build a site with a CLI tool?</h2>
          <p>
            I run a full-stack AI agency. I spend my days helping
            manufacturers and mid-market companies integrate Claude AI into
            their operations. So when I needed a website for Settle, the
            question wasn&apos;t really whether to use Claude AI. It was how
            far I could push it.
          </p>
          <p>
            The tool I used was{" "}
            <a
              href="https://docs.anthropic.com/en/docs/claude-code"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Claude Code
            </a>
            , <a href="https://www.anthropic.com" target="_blank" rel="noopener noreferrer">Anthropic</a>&apos;s CLI agent for software development. Not
            the web chat at claude.ai. Claude Code runs in your
            terminal, reads your codebase, writes files, runs commands, and
            commits to git. It operates on your actual project, not in an
            isolated sandbox.
          </p>
          <p>
            My workflow was simple: describe what I wanted, let Claude Code
            write the components, review the output in the browser,
            screenshot anything broken, and paste it back. The entire
            site (Next.js 16, Tailwind CSS v4, D3.js, deployed on Vercel)
            was built this way. Every commit in the git history came from a
            Claude Code session.
          </p>

          <h2>Starting with the hardest thing first</h2>
          <p>
            I wanted an interactive 3D globe on the hero section. Rotating
            slowly, plotting geographic points, smooth 60fps. The kind of
            thing that looks simple on a Dribbble shot but involves sphere
            geometry, projection math, mouse interaction handlers, and
            performance work to keep it smooth on older devices.
          </p>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/blog/site-hero.png"
            alt="Settle homepage hero section showing an interactive WebGL globe with geographic markers"
            width={1512}
            height={782}
            loading="lazy"
            className="rounded-xl border border-[rgba(20,20,19,0.1)] my-10"
          />

          <p>
            I described the visual I wanted: minimal, light-themed,
            country outlines, pin markers. Claude Code generated the
            component, including the WebGL setup, GeoJSON parsing, and the
            animation loop. First try.
          </p>
          <p>
            Except the first try had clipping issues. The globe got cut off
            by its container&apos;s <code>overflow-hidden</code>. I
            screenshotted the problem, described it, and Claude Code
            restructured the container hierarchy. Then the pin labels
            weren&apos;t rendering at the right scale on mobile. Another
            screenshot, another fix. That became the pattern for the entire
            project: describe, generate, review, screenshot, refine. Nothing
            worked perfectly the first time. Everything worked by the third
            or fourth pass.
          </p>

          <h2>The Cowork demo</h2>
          <p>
            This was the section I was most nervous about. I wanted to show
            what Claude AI looks like when it&apos;s actually working inside a
            manufacturing context. Not a generic chat window, but something
            that communicates depth.
          </p>
          <p>
            The result is an interactive replica of Claude AI&apos;s Chat/Cowork
            UI from claude.ai, adapted for Settle&apos;s light theme and
            contextualised for manufacturing. Tab switching between a BOM
            Template, a Vendor RFQ, and an SAP Connector. Each tab has
            its own content. Tooltips on hover. An animated progress panel
            with blur effects showing deployment status.
          </p>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/blog/site-cowork-full.png"
            alt="Interactive Cowork demo showing Claude AI's chat interface adapted for manufacturing with BOM Template, Vendor RFQ, and SAP Connector tabs"
            width={1512}
            height={782}
            loading="lazy"
            className="rounded-xl border border-[rgba(20,20,19,0.1)] my-10"
          />

          <p>
            I started from Anthropic&apos;s actual login page source code.
            I gave Claude Code the reference HTML and asked it to port the
            layout into React components, swap the dark theme for our warm
            parchment palette, and replace the generic content with
            manufacturing-specific artifacts. The tab switching, hover
            states, animated progress bars, and backdrop blur effects all
            came out of a single session.
          </p>
          <p>
            Then the z-index nightmare started.
          </p>
          <p>
            CSS <code>backdrop-filter</code> behaves differently depending
            on stacking context, and the initial output had conflicts that
            made certain panels render on top of the navigation. Have you
            ever debugged a stacking context issue? It&apos;s the kind of
            thing where the fix isn&apos;t tweaking a number. You have to
            understand how the browser composites layers. Claude Code
            resolved it by restructuring the component tree and isolating
            the blur layers into their own stacking contexts. That fix
            alone would have cost me an hour on Stack Overflow.
          </p>

          <h2>A D3 mindmap (and why force layouts are the worst)</h2>
          <p>
            The Services section needed to show four categories, each with
            multiple specific capabilities. A static list would work. But I
            wanted something people would actually interact with.
          </p>
          <p>
            I built a D3 force-directed mindmap: a central node
            with four category branches, each branching into four child
            nodes, for a total of 16 hoverable capabilities. Hovering over
            a child node shows a tooltip. And the detail I&apos;m happiest
            about: hovering over a service card on the left side of the
            page highlights the corresponding category branch on the
            mindmap.
          </p>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/blog/site-services-mindmap.png"
            alt="Services section with service cards on the left and an interactive D3 force-directed mindmap on the right showing all 16 capabilities"
            width={1512}
            height={782}
            loading="lazy"
            className="rounded-xl border border-[rgba(20,20,19,0.1)] my-10"
          />

          <p>
            D3 force simulations involve configuring charge forces, link
            distances, collision radii, and tick handlers that update SVG
            positions on every animation frame. I described the data
            structure (four categories, four children each, with
            descriptions) and the interaction pattern I wanted. Claude Code
            produced the full D3 setup: force simulation, SVG rendering,
            hover handlers, tooltip positioning, and the cross-component
            highlighting that connects the cards to the graph.
          </p>
          <p>
            Force-directed layouts are notoriously finicky. Nodes overlap,
            labels collide, the simulation either converges too fast or
            oscillates forever. I honestly didn&apos;t think Claude Code
            could tune these parameters well, but it surprised me. Getting
            it right took several iterations, sure. But each iteration was
            just a sentence of feedback and a new render. The whole mindmap
            was done in an afternoon.
          </p>

          <h2>The invisible work: SEO</h2>
          <p>
            Nobody notices SEO when it&apos;s done well. But try launching
            a new site without it.
          </p>
          <p>
            I needed structured data, crawler rules, performance
            optimisation. The tedious-but-essential stuff. Claude Code set
            up the entire stack:
          </p>
          <ul>
            <li>
              <strong>JSON-LD schemas</strong> on every page:
              Organization, Service, FAQPage, Article, and BreadcrumbList
              types, each with the correct properties and nesting.
            </li>
            <li>
              <strong>FAQ with FAQPage schema</strong>, built with
              native HTML5 <code>&lt;details&gt;</code>/<code>&lt;summary&gt;</code>{" "}
              elements for the accordion, with structured data that qualifies
              for Google rich results.
            </li>
            <li>
              <strong>robots.txt with AI crawler rules</strong>, including
              standard search engine directives plus explicit rules for AI
              training crawlers.
            </li>
            <li>
              <strong>XML sitemap</strong> with all pages and correct
              priorities.
            </li>
            <li>
              <strong>Open Graph and Twitter card metadata</strong> on every
              page.
            </li>
            <li>
              <strong>Security headers</strong> configured in the Next.js
              middleware.
            </li>
          </ul>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/blog/site-faq.png"
            alt="FAQ section with expandable accordion questions and answers"
            width={1512}
            height={782}
            loading="lazy"
            className="rounded-xl border border-[rgba(20,20,19,0.1)] my-10"
          />

          <p>
            The structured data alone would have taken me hours to write
            by hand and debug against Google&apos;s validator. Claude Code
            generated all of it from a description of the pages and
            services, and updated it whenever I added new content. This
            was one of those moments where the time savings felt absurd.
          </p>

          <h2>The blog system</h2>
          <p>
            This post you&apos;re reading right now? It&apos;s on a blog
            system Claude Code built from scratch. Each post is a standalone
            Next.js page with full Article schema, BreadcrumbList markup,
            Open Graph metadata, and cross-links to related posts.
          </p>
          <p>
            I deliberately chose not to use a CMS or MDX. Each post is a
            TSX file with prose content. No build pipeline for content, no
            API calls, no database. Simple. Claude Code generates each post
            as a component that follows the established pattern, including
            the metadata export, the JSON-LD script tags, and the prose
            styling.
          </p>
          <p>
            Adding a new post means creating a directory, writing the page
            component, adding an entry to the index, and updating the
            sitemap. Claude Code handles all four steps in a single session.
          </p>

          <h2>Performance details that matter</h2>
          <p>
            I didn&apos;t leave performance for the end. Claude Code
            handled optimisation throughout the build:
          </p>
          <ul>
            <li>
              <strong>WebP image conversion.</strong> The original
              assets totalled 3.5MB. After conversion, 1.3MB. Claude Code
              identified the largest files, converted them, and updated all
              references.
            </li>
            <li>
              <strong>Lazy loading.</strong> Images below the fold
              use <code>loading=&quot;lazy&quot;</code> with
              explicit <code>width</code> and <code>height</code> attributes
              to prevent Cumulative Layout Shift.
            </li>
            <li>
              <strong>Explicit image dimensions.</strong> Every{" "}
              <code>&lt;img&gt;</code> tag has width and height set so the
              browser can allocate space before the image loads. A small
              detail that most AI-generated code misses.
            </li>
          </ul>
          <p>
            These details separate a proof-of-concept from a production
            site. I could describe the rule once and Claude Code would
            follow it everywhere, consistently.
          </p>

          <h2>What it actually felt like</h2>
          <p>
            I want to be honest about this. Building a site with Claude Code
            is not &ldquo;type a prompt and get a website.&rdquo; If you go
            in expecting that, you&apos;ll be disappointed.
          </p>
          <p>
            It&apos;s closer to pair programming with a very fast partner
            who has read every documentation page but needs visual feedback
            to get the details right. The cycle was tight: describe a
            feature, review the output, screenshot the issues, get a fix.
            Most features went through three to five iterations. The globe
            needed clipping fixes. The Cowork demo needed z-index
            restructuring. The mindmap needed force parameter tuning.
          </p>
          <p>
            Nothing was a first-try success. But each iteration took
            minutes instead of hours. That adds up fast.
          </p>
          <p>
            Claude Code also handled the operational stuff that usually
            slows projects down: git commits with meaningful messages,
            sitemap updates when new pages were added, metadata consistency
            across all pages, the Vercel deployment configuration. The
            entire git history is Claude Code sessions.
          </p>
          <p>
            The biggest advantage wasn&apos;t speed, though speed was
            significant. It was scope. One person built a site with a WebGL
            globe, D3 force simulations, production-grade SEO, and
            interactive demos. Features that would normally require a
            frontend developer, a data visualisation specialist, and an SEO
            engineer. Claude Code compressed that team into one terminal
            window.
          </p>

          <h2>Why this matters beyond our site</h2>
          <p>
            I built Settle&apos;s site this way because it&apos;s the same
            thing I do for clients, just at a different layer. I deploy
            <a href="https://www.anthropic.com/claude" target="_blank" rel="noopener noreferrer">Claude AI</a> into manufacturing operations, writing instructions,
            structuring knowledge files, mapping workflows. The principle
            is the same: Claude AI is remarkably capable when you give it the
            right structure and context.
          </p>
          <p>
            For my clients, that structure is instruction engineering and
            workflow mapping. For this site, it was a well-configured Claude AI
            Code environment with clear visual feedback. The value isn&apos;t
            in the AI itself. It&apos;s in knowing how to direct it.
          </p>
          <p>
            The site you&apos;re reading this on is the proof. Every pixel,
            every animation, every schema tag. Built in Claude Code.
          </p>

        </div>

        <MagazineOutro
          author="Pranav Ambwani"
          authorBio="Founder of Settle. Deploys Claude AI into mid-market companies and manufacturers — structured rollouts, production-grade instructions, real results."
          related={[
            {
              category: "Case Study",
              title:
                "How a 79-Year-Old Manufacturer Deployed AI Across 7 Departments",
              description:
                "49 use cases mapped. 18 projects structured. 11 deployed. 85% faster document generation.",
              href: "/blog/orient-case-study",
            },
            {
              category: "Playbook",
              title:
                "We Used Claude AI Cowork to Prospect 12 Companies in One Session",
              description:
                "How we used Claude AI's Cowork feature to research prospects, personalise outreach, and build a send calendar.",
              href: "/blog/ai-powered-outreach-with-cowork",
            },
          ]}
        />
      </article>

      <Footer />
    </>
  );
}

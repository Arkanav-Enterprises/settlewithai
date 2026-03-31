import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "How We Built settlewithai.com Entirely with Claude Code",
  description:
    "Every component on our site — the WebGL globe, D3 mindmap, Cowork demo, SEO infrastructure — was built in Claude Code sessions. Here's how a CLI coding tool shipped an entire Next.js site.",
  keywords: [
    "Claude Code",
    "Anthropic CLI",
    "AI web development",
    "Next.js Claude",
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
    authors: ["Settle"],
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
      "@type": "Organization",
      name: "Settle",
      url: "https://settlewithai.com",
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
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-[#e8e6dc]/80">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 h-[4.25rem] flex items-center justify-between">
          <a
            href="/"
            className="text-[1.15rem] font-semibold tracking-[-0.03em] text-text"
            style={{ fontFamily: "Sentient, Georgia, serif" }}
          >
            SETTLE
          </a>
          <a
            href="/#contact"
            className="text-[14px] font-medium bg-text text-bg px-5 py-2.5 rounded-full hover:bg-[#30302e] transition-colors duration-200"
          >
            Get Started
          </a>
        </div>
      </nav>

      {/* Article */}
      <article className="max-w-[720px] mx-auto px-6 lg:px-10 pt-32 pb-24 md:pt-40 md:pb-36">
        {/* Header */}
        <header className="mb-16">
          <a
            href="/"
            className="text-accent text-sm font-medium hover:underline"
          >
            &larr; Back to Settle
          </a>
          <h1
            className="text-[clamp(2rem,4.5vw,3.2rem)] font-medium leading-[1.12] mt-8 mb-6"
            style={{
              fontFamily: "Sentient, Georgia, serif",
              letterSpacing: "-0.03em",
            }}
          >
            How We Built This Entire Site with Claude Code
          </h1>
          <p className="text-text-muted text-[17px] leading-relaxed">
            Every component on settlewithai.com &mdash; the WebGL globe, the
            interactive Cowork demo, the D3 force-directed mindmap, the SEO
            infrastructure &mdash; was built inside Claude Code, Anthropic&apos;s
            CLI coding tool. No web IDE, no copy-pasting from ChatGPT. Just
            terminal sessions, screenshots, and iteration.
          </p>
          <div className="flex items-center gap-3 mt-6 text-sm text-text-faint">
            <span>Settle</span>
            <span>&middot;</span>
            <time dateTime="2026-03-30">March 2026</time>
            <span>&middot;</span>
            <span>12 min read</span>
          </div>
        </header>

        {/* Body */}
        <div className="prose-settle">
          <h2>The premise</h2>
          <p>
            We&apos;re a Claude AI deployment studio. We help manufacturers
            and mid-market companies integrate Claude into their operations.
            So when it came time to build our own website, using Claude to
            build it felt less like a marketing stunt and more like an
            obvious decision.
          </p>
          <p>
            The tool we used was{" "}
            <a
              href="https://docs.anthropic.com/en/docs/claude-code"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Claude Code
            </a>
            &nbsp;&mdash; Anthropic&apos;s CLI agent for software development. Not
            the web chat interface at claude.ai. Claude Code runs in your
            terminal, reads your codebase, writes files, runs commands, and
            commits to git. It operates on your actual project, not in an
            isolated sandbox.
          </p>
          <p>
            The workflow looked like this: we would describe what we wanted,
            Claude Code would write the components, we&apos;d review the
            output in the browser, screenshot anything that needed fixing,
            and Claude Code would iterate. The entire site &mdash; Next.js 16,
            Tailwind CSS v4, D3.js, deployed on Vercel &mdash; was built this
            way. Every commit in the git history was authored through Claude
            Code sessions.
          </p>
          <p>
            This post walks through the major features and what it was
            actually like to build them.
          </p>

          <h2>The hero: a WebGL globe</h2>
          <p>
            The first thing visitors see is an interactive 3D globe rotating
            slowly on the hero section. It&apos;s rendered with WebGL, plots
            geographic points representing global reach, and supports smooth
            60fps rotation.
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
            Building a globe from scratch is a non-trivial task. You need
            sphere geometry, projection math, mouse interaction handlers,
            and performance optimisation to keep frame rates smooth on
            lower-end devices. We described the visual we wanted &mdash; a
            minimal, light-themed globe with country outlines and pin
            markers &mdash; and Claude Code generated the component, including
            the WebGL setup, the GeoJSON parsing, and the animation loop.
          </p>
          <p>
            The first version had clipping issues where the globe would get
            cut off by its container&apos;s <code>overflow-hidden</code>. We
            screenshotted the problem, described it, and Claude Code fixed
            it by restructuring the container hierarchy. The pin labels
            weren&apos;t rendering at the right scale on mobile. Another
            screenshot, another fix. This back-and-forth was the pattern for
            the whole project: describe, generate, review, screenshot, refine.
          </p>

          <h2>The Cowork demo</h2>
          <p>
            This was the most ambitious section. We wanted to show what
            Claude looks like when it&apos;s actually working inside a
            manufacturing context &mdash; not a generic chat window, but
            something that communicates the depth of what&apos;s possible.
          </p>
          <p>
            The result is an interactive replica of Claude&apos;s Chat/Cowork
            UI from claude.ai, adapted for Settle&apos;s light theme and
            contextualised for manufacturing. It features tab switching
            between a BOM Template, a Vendor RFQ, and an SAP Connector.
            Each tab has its own content. Hovering over elements reveals
            tooltips. An animated progress panel shows deployment status with
            blur effects.
          </p>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/blog/site-cowork-full.png"
            alt="Interactive Cowork demo showing Claude's chat interface adapted for manufacturing with BOM Template, Vendor RFQ, and SAP Connector tabs"
            width={1512}
            height={782}
            loading="lazy"
            className="rounded-xl border border-[rgba(20,20,19,0.1)] my-10"
          />

          <p>
            The implementation started from Anthropic&apos;s actual login
            page source code. We gave Claude Code the reference HTML and
            asked it to port the layout into React components, swap the dark
            theme for our warm parchment palette, and replace the generic
            content with manufacturing-specific artifacts. The tab
            switching, hover states, animated progress bars, and backdrop
            blur effects were all generated in a single session.
          </p>
          <p>
            The trickiest part was getting the blur and layering right.
            CSS <code>backdrop-filter</code> behaves differently depending
            on stacking context, and the initial output had z-index
            conflicts that made certain panels render on top of the
            navigation. Claude Code resolved it by restructuring the
            component tree and isolating the blur layers into their own
            stacking contexts. That kind of CSS debugging &mdash; where the
            fix requires understanding how the browser composites layers,
            not just tweaking a number &mdash; is exactly the sort of thing
            you&apos;d normally spend an hour on Stack Overflow for.
          </p>

          <h2>The D3 force-directed mindmap</h2>
          <p>
            The Services section needed to communicate that our offering
            spans four categories, each with multiple specific capabilities.
            A static list would work but wouldn&apos;t be memorable. We
            wanted something interactive.
          </p>
          <p>
            The solution was a D3 force-directed mindmap: a central node
            with four category branches, each branching into four child
            nodes, for a total of 16 hoverable capabilities. Hovering over
            a child node shows a tooltip describing that capability. And
            here&apos;s the detail that ties the section together: hovering
            over a service card on the left side of the page highlights the
            corresponding category branch on the mindmap.
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
            positions on every animation frame. The initial prompt described
            the data structure (four categories, four children each, with
            descriptions) and the desired interaction pattern. Claude Code
            produced the full D3 setup: force simulation configuration, SVG
            rendering, hover handlers, tooltip positioning, and the
            cross-component highlighting that connects the cards to the
            graph.
          </p>
          <p>
            The original design was inspired by Anthropic&apos;s product
            page, which uses a similar graph visualisation. We repurposed
            the concept with Settle&apos;s service categories and let Claude
            Code handle the D3 implementation details. Force-directed
            layouts are notoriously finicky &mdash; nodes overlap, labels
            collide, the simulation either converges too fast or oscillates
            indefinitely. Getting the parameters right took several
            iterations, but each iteration was just a sentence of feedback
            and a new render from Claude Code.
          </p>

          <h2>SEO infrastructure</h2>
          <p>
            SEO is one of those areas where the work is invisible when done
            right. We needed comprehensive structured data, crawler rules,
            and performance optimisation &mdash; the kind of work that&apos;s
            tedious but essential for a new site competing for search
            visibility.
          </p>
          <p>
            Claude Code set up the entire SEO stack:
          </p>
          <ul>
            <li>
              <strong>JSON-LD schemas</strong> on every page &mdash;
              Organization, Service, FAQPage, Article, and BreadcrumbList
              types, each with the correct properties and nesting.
            </li>
            <li>
              <strong>FAQ with FAQPage schema</strong> &mdash; built with
              native HTML5 <code>&lt;details&gt;</code>/<code>&lt;summary&gt;</code>{" "}
              elements for the accordion, with structured data that qualifies
              for Google rich results.
            </li>
            <li>
              <strong>robots.txt with AI crawler rules</strong> &mdash;
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
            The structured data alone would have taken hours to write
            manually and debug against Google&apos;s validator. Claude Code
            generated all of it from a description of our pages and
            services, and updated it whenever we added new content.
          </p>

          <h2>The blog system</h2>
          <p>
            This blog you&apos;re reading is the sixth post on a system
            that Claude Code built from scratch. Each post is a standalone
            Next.js page with full Article schema, BreadcrumbList markup,
            Open Graph metadata, and cross-links to related posts. The blog
            index page pulls from a posts array and renders cards with tags,
            dates, and descriptions.
          </p>
          <p>
            We deliberately chose not to use a CMS or MDX. Each post is a
            TSX file with prose content. This keeps the system simple &mdash;
            no build pipeline for content, no API calls, no database. Claude
            Code generates each post as a component that follows the
            established pattern, including the metadata export, the JSON-LD
            script tags, and the prose styling.
          </p>
          <p>
            Adding a new post means creating a directory, writing the page
            component, adding an entry to the index, and updating the
            sitemap. Claude Code handles all four steps in a single session.
          </p>

          <h2>Performance work</h2>
          <p>
            Performance wasn&apos;t an afterthought. Claude Code handled the
            optimisation passes that make the difference between a site that
            feels fast and one that feels sluggish:
          </p>
          <ul>
            <li>
              <strong>WebP image conversion</strong> &mdash; the original
              assets totalled 3.5MB. After conversion, 1.3MB. Claude Code
              identified the largest files, converted them, and updated all
              references.
            </li>
            <li>
              <strong>Lazy loading</strong> &mdash; images below the fold
              use <code>loading=&quot;lazy&quot;</code> with
              explicit <code>width</code> and <code>height</code> attributes
              to prevent Cumulative Layout Shift.
            </li>
            <li>
              <strong>Explicit image dimensions</strong> &mdash; every{" "}
              <code>&lt;img&gt;</code> tag has width and height set, so the
              browser can allocate space before the image loads. This is a
              small detail that most AI-generated code misses.
            </li>
          </ul>
          <p>
            These are the kinds of details that separate a proof-of-concept
            from a production site. Claude Code applied them consistently
            across every image and component because we could describe the
            rule once and it would follow it everywhere.
          </p>

          <h2>What the workflow actually felt like</h2>
          <p>
            Building a site this way is different from traditional
            development, but not in the way most people assume. It&apos;s
            not &ldquo;type a prompt and get a website.&rdquo; It&apos;s
            closer to pair programming with an extremely fast partner who
            has read every documentation page but needs visual feedback to
            get the details right.
          </p>
          <p>
            The cycle was tight: describe a feature, review the output,
            screenshot the issues, get a fix. Most features went through
            three to five iterations before they were right. The globe
            needed clipping fixes. The Cowork demo needed z-index
            restructuring. The mindmap needed force parameter tuning. None
            of these were first-try successes &mdash; but each iteration
            took minutes, not hours.
          </p>
          <p>
            Claude Code also handled the operational work that usually
            slows projects down: git commits with meaningful messages,
            sitemap updates when new pages were added, metadata consistency
            across all pages, and the Vercel deployment configuration. The
            entire git history of this project is Claude Code sessions.
          </p>
          <p>
            The biggest advantage wasn&apos;t speed, though speed was
            significant. It was scope. A solo designer could build a site
            with a WebGL globe, D3 force simulations, production-grade SEO,
            and interactive demos &mdash; features that would normally
            require a frontend developer, a data visualisation specialist,
            and an SEO engineer. Claude Code compressed that team into one
            terminal window.
          </p>

          <h2>What this means for our clients</h2>
          <p>
            We built Settle&apos;s site this way because it&apos;s what we
            do for our clients, just at a different layer. We deploy Claude
            into manufacturing operations &mdash; writing the instructions,
            structuring the knowledge files, mapping the workflows. The
            principle is the same: Claude is remarkably capable when you
            give it the right structure and context.
          </p>
          <p>
            For our clients, that structure is instruction engineering and
            workflow mapping. For this site, it was a well-configured Claude
            Code environment with clear visual feedback. In both cases, the
            value isn&apos;t in the AI itself &mdash; it&apos;s in knowing
            how to direct it.
          </p>
          <p>
            The site you&apos;re reading this on is the proof. Every pixel,
            every animation, every schema tag. Built in Claude Code.
          </p>

          {/* Related */}
          <div className="mt-16 pt-10 border-t border-[rgba(20,20,19,0.1)]">
            <h3 className="text-lg font-medium mb-6">Related</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <a href="/blog/orient-case-study" className="group">
                <p className="font-medium group-hover:text-[#d97757] transition-colors">How a 79-Year-Old Manufacturer Deployed AI Across 7 Departments</p>
                <p className="text-sm text-[rgba(20,20,19,0.5)] mt-1">49 use cases mapped. 18 projects structured. 11 deployed. 85% faster document generation.</p>
              </a>
              <a href="/blog/ai-powered-outreach-with-cowork" className="group">
                <p className="font-medium group-hover:text-[#d97757] transition-colors">We Used Claude Cowork to Prospect 12 Companies in One Session</p>
                <p className="text-sm text-[rgba(20,20,19,0.5)] mt-1">How we used Claude&apos;s Cowork feature to research prospects, personalise outreach, and build a send calendar.</p>
              </a>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 pt-10 border-t border-border-light">
            <h3>Want Claude deployed across your organisation?</h3>
            <p>
              We help manufacturers and mid-market companies integrate Claude
              into their daily operations &mdash; structured rollouts,
              production-grade instructions, and measurable results.{" "}
              <a
                href="/#contact"
                className="text-accent font-medium hover:underline"
              >
                Start a conversation &rarr;
              </a>
            </p>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="bg-[#141413] text-[#e8e6dc]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-12 flex items-center justify-between">
          <span
            className="text-[1rem] font-medium tracking-[-0.03em]"
            style={{ fontFamily: "Sentient, Georgia, serif" }}
          >
            SETTLE
          </span>
          <span className="text-[rgba(232,230,220,0.4)] text-sm">
            AI, thoughtfully deployed.
          </span>
        </div>
      </footer>
    </>
  );
}

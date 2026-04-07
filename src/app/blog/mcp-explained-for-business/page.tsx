import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { BlogTOC } from "@/components/blog/BlogTOC";

export const metadata: Metadata = {
  title:
    "MCP Explained: How to Connect Your ERP, CRM, and Internal Systems to Claude AI",
  description:
    "Model Context Protocol (MCP) lets Claude AI read and write to your business systems. Here's what it is, why it matters, and how any company can build one — explained without the jargon.",
  keywords: [
    "MCP explained",
    "Model Context Protocol",
    "Claude AI MCP",
    "connect ERP to AI",
    "Claude API integration",
    "MCP for business",
    "AI ERP integration",
    "Claude AI enterprise integration",
    "custom MCP server",
    "AI data connector",
    "MCP tutorial",
    "what is MCP",
  ],
  alternates: {
    canonical:
      "https://settlewithai.com/blog/mcp-explained-for-business",
  },
  openGraph: {
    type: "article",
    title:
      "MCP Explained: How to Connect Your ERP, CRM, and Internal Systems to Claude AI",
    description:
      "Model Context Protocol lets Claude AI read and write to your business systems. Here's what it is and how to build one.",
    url: "https://settlewithai.com/blog/mcp-explained-for-business",
    siteName: "Settle",
    publishedTime: "2026-03-29T00:00:00Z",
    authors: ["Pranav Ambwani"],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "MCP Explained: How to Connect Your ERP, CRM, and Internal Systems to Claude AI",
    description:
      "Model Context Protocol lets Claude AI read and write to your business systems. No jargon. Real examples.",
  },
};

export default function Article() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "MCP Explained: How to Connect Your ERP, CRM, and Internal Systems to Claude AI",
    description:
      "A practical guide to Model Context Protocol for business leaders — what it is, why it matters, and how to build custom connectors for your internal systems.",
    datePublished: "2026-03-29T00:00:00Z",
    dateModified: "2026-03-29T00:00:00Z",
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
        "https://settlewithai.com/blog/mcp-explained-for-business",
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
              { "@type": "ListItem", position: 3, name: "MCP Explained", item: "https://settlewithai.com/blog/mcp-explained-for-business" },
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
            style={{ fontFamily: "var(--font-heading)" }}
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
        <header className="mb-16">
          <a
            href="/"
            className="text-accent text-sm font-medium hover:underline"
          >
            &larr; Back to Settle
          </a>
          <h1
            className="text-[clamp(2rem,4.5vw,3rem)] font-medium leading-[1.12] mt-8 mb-6"
            style={{
              fontFamily: "var(--font-heading)",
              letterSpacing: "-0.03em",
            }}
          >
            MCP Explained: How to Connect Your ERP, CRM, and Internal
            Systems to Claude AI
          </h1>
          <p className="text-text-muted text-[17px] leading-relaxed">
            Model Context Protocol is the bridge between Claude AI and your
            business systems. Here&apos;s what it is, why it matters, and
            how any company can build one &mdash; explained without the
            jargon.
          </p>
          <div className="flex items-center gap-3 mt-6 text-sm text-text-faint">
            <a href="/#contact" className="hover:text-accent transition-colors">Pranav Ambwani</a>
            <span>&middot;</span>
            <time dateTime="2026-03-29">March 2026</time>
            <span>&middot;</span>
            <span>10 min read</span>
          </div>
        </header>

        <div className="prose-settle">
          <h2>The problem: Claude AI is smart but isolated</h2>
          <p>
            Last Tuesday, a procurement manager at one of our client sites
            asked Claude AI to generate a purchase order. Claude AI wrote a
            beautiful PO. Perfect formatting, professional language, all
            the right fields. One problem: every single number in it was
            made up.
          </p>
          <p>
            That&apos;s the core issue. Out of the box, Claude AI can write,
            analyse, summarise, and reason, but it can&apos;t see your
            data. It doesn&apos;t know what&apos;s in your ERP. It
            can&apos;t pull your latest inventory levels or look up a
            customer&apos;s order history. It&apos;s like hiring a
            brilliant new employee and then locking them out of every
            system on their first day.
          </p>
          <p>
            You can copy-paste data into a conversation, sure. But that
            doesn&apos;t scale. You can upload files, but those go stale
            the moment the source data changes. What you actually need is a
            live connection, a way for Claude AI to reach into your systems,
            read what it needs, and write back when appropriate.
          </p>
          <p>
            That&apos;s what <a href="https://www.anthropic.com/news/model-context-protocol" target="_blank" rel="noopener noreferrer">MCP</a> does.
          </p>

          <h2>What MCP is, in plain English</h2>
          <p>
            MCP stands for <a href="https://modelcontextprotocol.io" target="_blank" rel="noopener noreferrer">Model Context Protocol</a>. I know, the name sounds
            intimidating. It&apos;s not. Think of it as a universal adapter
            between Claude AI and any data source your business uses.
          </p>
          <p>
            Your ERP, CRM, database, or spreadsheet has data. That data
            lives behind some kind of access layer (an API, a database
            connection, a file system). MCP is a standardised wrapper that
            translates between that access layer and Claude AI. So when Claude AI
            needs to answer &ldquo;what&apos;s the current price for a
            C-Series 600 press?&rdquo; it actually pulls the real number
            from your real system.
          </p>
          <p>
            Without MCP, Claude AI is guessing or relying on whatever you
            paste in. With MCP, it&apos;s working with live data.
          </p>

          <h2>Three layers, that&apos;s it</h2>
          <p>
            Every MCP integration has three parts:
          </p>
          <ul>
            <li>
              <strong>Your system</strong>, the ERP, CRM, database,
              spreadsheet, or internal tool that holds the data. This is
              what you already have.
            </li>
            <li>
              <strong>The MCP server</strong>, a small piece of software
              that sits between your system and Claude AI. It defines what
              Claude AI can read (queries, lookups, searches) and what it can
              write (create records, update fields, trigger actions). This
              is the piece you build.
            </li>
            <li>
              <strong>Claude AI</strong>, the AI layer your team interacts
              with. Claude AI calls the MCP server when it needs data, and the
              server returns structured results. Your team never sees any
              of this plumbing. They just talk to Claude AI and get accurate,
              live answers.
            </li>
          </ul>
          <p>
            The MCP server is the key piece. It&apos;s essentially a
            contract: here are the things Claude AI is allowed to do with this
            system, here&apos;s the data format for each action, and here
            are the guardrails.
          </p>

          <h2>A real example from a factory floor</h2>
          <p>
            I want to tell you about a deployment that almost didn&apos;t
            work.
          </p>
          <p>
            We were rolling out AI across seven departments of a
            manufacturing company. Everything was going well until we hit
            their ERP. Not SAP, not Odoo, not Tally. A custom-built system,
            assembled over decades, holding everything from inventory
            levels to purchase orders to production schedules. Nobody
            outside the company had ever connected anything to it.
          </p>
          <p>
            I honestly wasn&apos;t sure we could make it work. Their
            documentation was sparse. The API was partially undocumented.
            But without connecting to this system, 14 of their 49
            identified use cases were completely blocked. Claude AI could
            generate offers but not pull live pricing. It could draft
            purchase orders but not assign PO numbers. It could analyse
            financial data, but only from manually exported spreadsheets.
          </p>
          <p>
            So we built the connector. And it unlocked everything.
          </p>
          <p>
            Claude AI could now:
          </p>
          <ul>
            <li>
              <strong>Read inventory levels</strong>, checking current
              stock of any component in real time
            </li>
            <li>
              <strong>Look up pricing</strong>, pulling the correct price
              for any product configuration, including head count
              calculations and margin rules
            </li>
            <li>
              <strong>Generate PO numbers</strong>, creating sequential
              purchase order numbers that match the ERP&apos;s numbering
              system
            </li>
            <li>
              <strong>Query order history</strong>, looking up past orders
              by customer, product, or date range
            </li>
            <li>
              <strong>Trigger reorder alerts</strong>, flagging when
              component inventory drops below minimum thresholds
            </li>
          </ul>
          <p>
            Each of these is a &ldquo;tool&rdquo; defined in the MCP
            server. When a procurement manager asks Claude AI to &ldquo;create
            a purchase order for 500 units of component X,&rdquo; Claude AI
            calls the right tool, gets the next PO number, pulls the
            current price, and assembles the document. All from live data.
            No more made-up numbers.
          </p>

          <h2>So what can you connect?</h2>
          <p>
            Basically anything with a programmable interface. In practice:
          </p>
          <ul>
            <li>
              <strong>ERP systems</strong> like SAP, Odoo, Tally, or
              custom-built. If it has an API or database, it can be
              connected.
            </li>
            <li>
              <strong>CRM platforms</strong> like Salesforce, HubSpot,
              Zoho. Claude AI can read customer data, update deal stages,
              create follow-up tasks.
            </li>
            <li>
              <strong>Databases</strong> like PostgreSQL, MySQL, MongoDB.
              Claude AI can query and write to your database directly (with
              appropriate read/write permissions).
            </li>
            <li>
              <strong>Spreadsheets and file systems</strong> like Google
              Sheets, shared drives, document repositories. Claude AI can read
              the latest data without anyone manually uploading anything.
            </li>
            <li>
              <strong>Communication tools</strong> like Slack, email,
              messaging platforms. Claude AI can send notifications, draft
              messages, or respond to queries in-channel.
            </li>
            <li>
              <strong>Industry-specific tools</strong>, accounting
              software, project management systems, ticketing platforms,
              booking engines. If it has an API, Claude AI can use it.
            </li>
          </ul>

          <h2>Inside an MCP server</h2>
          <p>
            Here&apos;s what surprised me when I first started building
            these: an MCP server is actually simple. It defines three
            things:
          </p>
          <ul>
            <li>
              <strong>Tools</strong>, the actions Claude AI can take. Each
              tool has a name (like &ldquo;get_inventory_level&rdquo;), a
              description so Claude AI knows when to use it, the inputs it
              needs, and the outputs it returns.
            </li>
            <li>
              <strong>Resources</strong>, read-only data that Claude AI can
              access. Think product catalogues, pricing tables, policy
              documents. Claude AI can look these up but not modify them.
            </li>
            <li>
              <strong>Permissions</strong>, guardrails on what Claude AI can
              and cannot do. Read-only access to financial data. Write
              access to create draft purchase orders but not approve them.
              No access to salary information. These rules are enforced at
              the MCP layer, not by politely asking Claude AI to behave.
            </li>
          </ul>
          <p>
            A typical MCP server for a mid-size manufacturer might have
            10&ndash;20 tools, a handful of resources, and clear permission
            boundaries for different user roles. We&apos;re talking a
            2&ndash;4 week development project, not a months-long
            enterprise integration.
          </p>

          <h2>Why should you care?</h2>
          <p>
            Have you noticed how many AI pilots quietly die? I see it
            constantly. A team tries Claude AI, gets generic results because
            it&apos;s working without any context about their business, and
            concludes that AI isn&apos;t ready for their workflows.
          </p>
          <p>
            That&apos;s the wrong conclusion. The AI was ready. It just
            couldn&apos;t see anything.
          </p>
          <p>
            MCP changes that equation. When Claude AI can read your pricing
            rules, query your inventory, and pull from your knowledge base,
            it stops being a generic assistant and starts being a workflow
            participant. The output goes from &ldquo;here&apos;s a template
            you can fill in&rdquo; to &ldquo;here&apos;s the completed
            document with the correct data.&rdquo;
          </p>
          <p>
            In the manufacturing deployment I mentioned earlier, MCP was
            the difference between Tier 1 use cases (instructions and
            knowledge files only) and Tier 3 use cases (live system
            integration). Tier 1 saved time. Tier 3 eliminated entire
            manual processes.
          </p>

          <h2>Where to begin</h2>
          <p>
            You don&apos;t need to connect everything at once. That would
            be overwhelming, and honestly, you&apos;d learn the wrong
            lessons from it. Here&apos;s the path I recommend:
          </p>
          <ul>
            <li>
              <strong>Start with read-only.</strong> Connect Claude AI to your
              most-referenced data sources (pricing, product specs,
              customer history) with read-only access. No risk, immediate
              value.
            </li>
            <li>
              <strong>Add write actions carefully.</strong> Once
              you&apos;re confident in the output quality, add the ability
              to create drafts (purchase orders, invoices, reports) that
              require human approval before finalising.
            </li>
            <li>
              <strong>Automate with guardrails.</strong> For
              high-confidence, repetitive actions (reorder alerts, status
              updates, notification triggers), allow Claude AI to act
              autonomously within defined boundaries.
            </li>
          </ul>
          <p>
            Each step builds trust. By the time you reach automation, your
            team has been using AI-assisted workflows for months and
            understands exactly what it can and can&apos;t do. There are no
            surprises.
          </p>

          <h2>The bottom line</h2>
          <p>
            MCP is what turns <a href="https://www.anthropic.com/claude" target="_blank" rel="noopener noreferrer">Claude AI</a> from a smart chat interface into a
            real business tool. It&apos;s not a product you buy. It&apos;s
            a connector you build, specific to your systems, your data, and
            your workflows.
          </p>
          <p>
            Every business that uses a CRM, ERP, database, or internal
            tool can build one. The real question isn&apos;t whether
            it&apos;s technically possible. It&apos;s whether you have the
            deployment structure to make it useful. And that, in my
            experience, is the part most companies skip.
          </p>

          {/* Related */}
          <div className="mt-16 pt-10 border-t border-[rgba(20,20,19,0.1)]">
            <h3 className="text-lg font-medium mb-6">Related</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <a href="/blog/orient-case-study" className="group">
                <p className="font-medium group-hover:text-[#d97757] transition-colors">How a 79-Year-Old Manufacturer Deployed AI Across 7 Departments</p>
                <p className="text-sm text-[rgba(20,20,19,0.5)] mt-1">49 use cases mapped, 18 projects structured, 11 deployed in the first engagement.</p>
              </a>
              <a href="/blog/integrating-ai-into-your-company" className="group">
                <p className="font-medium group-hover:text-[#d97757] transition-colors">How to Actually Integrate AI Into Your Company</p>
                <p className="text-sm text-[rgba(20,20,19,0.5)] mt-1">A structured, phase-by-phase approach to deploying AI across your team&apos;s real workflows.</p>
              </a>
            </div>
          </div>

          {/* Author */}
          <div className="mt-16 pt-8 border-t border-border-light flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#e8e6dc] flex items-center justify-center shrink-0 text-text font-medium text-lg" style={{ fontFamily: "var(--font-heading)" }}>P</div>
            <div>
              <a href="/#contact" className="font-medium text-text hover:text-accent transition-colors">Pranav Ambwani</a>
              <p className="text-sm text-text-muted mt-1 leading-relaxed">Founder of Settle. Deploys Claude AI into mid-market companies and manufacturers &mdash; structured rollouts, production-grade instructions, real results.</p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 pt-10 border-t border-border-light">
            <h3>
              Ready to connect your systems to Claude AI?
            </h3>
            <p>
              We build custom MCP connectors as part of our deployment
              process &mdash; from discovery to production, with structured
              instructions and guardrails built in.{" "}
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

      <Footer />
    </>
  );
}

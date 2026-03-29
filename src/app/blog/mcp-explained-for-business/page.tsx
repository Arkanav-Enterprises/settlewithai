import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "MCP Explained: How to Connect Your ERP, CRM, and Internal Systems to Claude",
  description:
    "Model Context Protocol (MCP) lets Claude read and write to your business systems. Here's what it is, why it matters, and how any company can build one — explained without the jargon.",
  keywords: [
    "MCP explained",
    "Model Context Protocol",
    "Claude MCP",
    "connect ERP to AI",
    "Claude API integration",
    "MCP for business",
    "AI ERP integration",
    "Claude enterprise integration",
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
      "MCP Explained: How to Connect Your ERP, CRM, and Internal Systems to Claude",
    description:
      "Model Context Protocol lets Claude read and write to your business systems. Here's what it is and how to build one.",
    url: "https://settlewithai.com/blog/mcp-explained-for-business",
    siteName: "Settle",
    publishedTime: "2026-03-29T00:00:00Z",
    authors: ["Settle"],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "MCP Explained: How to Connect Your ERP, CRM, and Internal Systems to Claude",
    description:
      "Model Context Protocol lets Claude read and write to your business systems. No jargon. Real examples.",
  },
};

export default function Article() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "MCP Explained: How to Connect Your ERP, CRM, and Internal Systems to Claude",
    description:
      "A practical guide to Model Context Protocol for business leaders — what it is, why it matters, and how to build custom connectors for your internal systems.",
    datePublished: "2026-03-29T00:00:00Z",
    author: {
      "@type": "Organization",
      name: "Settle",
      url: "https://settlewithai.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Settle",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id":
        "https://settlewithai.com/blog/mcp-explained-for-business",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
              fontFamily: "Sentient, Georgia, serif",
              letterSpacing: "-0.03em",
            }}
          >
            MCP Explained: How to Connect Your ERP, CRM, and Internal
            Systems to Claude
          </h1>
          <p className="text-text-muted text-[17px] leading-relaxed">
            Model Context Protocol is the bridge between Claude and your
            business systems. Here&apos;s what it is, why it matters, and
            how any company can build one &mdash; explained without the
            jargon.
          </p>
          <div className="flex items-center gap-3 mt-6 text-sm text-text-faint">
            <span>Settle</span>
            <span>&middot;</span>
            <time dateTime="2026-03-29">March 2026</time>
            <span>&middot;</span>
            <span>10 min read</span>
          </div>
        </header>

        <div className="prose-settle">
          <h2>The problem: Claude is smart but isolated</h2>
          <p>
            Out of the box, Claude can write, analyse, summarise, and reason
            &mdash; but it can&apos;t see your data. It doesn&apos;t know
            what&apos;s in your ERP. It can&apos;t pull your latest
            inventory levels, look up a customer&apos;s order history, or
            check your pricing spreadsheet. It&apos;s like hiring a
            brilliant new employee and then not giving them access to any of
            your systems.
          </p>
          <p>
            You can copy-paste data into a conversation, but that
            doesn&apos;t scale. You can upload files, but those go stale the
            moment the source data changes. What you actually need is a live
            connection &mdash; a way for Claude to reach into your systems,
            read what it needs, and write back when appropriate.
          </p>
          <p>
            That&apos;s what MCP does.
          </p>

          <h2>What MCP is, in plain English</h2>
          <p>
            MCP stands for Model Context Protocol. Think of it as a
            universal adapter between Claude and any data source your
            business uses.
          </p>
          <p>
            Here&apos;s the simplest way to understand it: your ERP, CRM,
            database, or spreadsheet has data. That data lives behind some
            kind of access layer &mdash; an API, a database connection, a
            file system. MCP is a standardised wrapper that translates
            between that access layer and Claude, so Claude can ask
            questions like &ldquo;what&apos;s the current price for a
            C-Series 600 press?&rdquo; and get a real answer from your real
            system.
          </p>
          <p>
            Without MCP, Claude is guessing or relying on whatever you paste
            in. With MCP, Claude is working with live data.
          </p>

          <h2>How it works: the three layers</h2>
          <p>
            Every MCP integration has three parts:
          </p>
          <ul>
            <li>
              <strong>Your system</strong> &mdash; the ERP, CRM, database,
              spreadsheet, or internal tool that holds the data. This is
              what you already have.
            </li>
            <li>
              <strong>The MCP server</strong> &mdash; a small piece of
              software that sits between your system and Claude. It defines
              what Claude can read (queries, lookups, searches) and what it
              can write (create records, update fields, trigger actions).
              This is what you build.
            </li>
            <li>
              <strong>Claude</strong> &mdash; the AI layer that your team
              interacts with. Claude calls the MCP server when it needs
              data, and the server returns structured results. Your team
              never sees the MCP layer &mdash; they just talk to Claude and
              get accurate, live answers.
            </li>
          </ul>
          <p>
            The MCP server is the key piece. It&apos;s essentially a
            contract that says: &ldquo;here are the things Claude is allowed
            to do with this system, here&apos;s the data format for each
            action, and here are the guardrails.&rdquo;
          </p>

          <h2>What this looks like in practice</h2>
          <p>
            We recently deployed AI across seven departments of a
            manufacturing company. One of the biggest blockers was their
            custom-built ERP &mdash; not SAP, not Odoo, not Tally. A
            bespoke system built over decades, holding everything from
            inventory levels to purchase orders to production schedules.
          </p>
          <p>
            Without an MCP connector, 14 of their 49 identified use cases
            were blocked. Claude could generate offers, but not pull live
            pricing. It could draft purchase orders, but not assign PO
            numbers from the system. It could analyse financial data, but
            only from manually exported spreadsheets.
          </p>
          <p>
            The MCP connector we built gave Claude the ability to:
          </p>
          <ul>
            <li>
              <strong>Read inventory levels</strong> &mdash; check current
              stock of any component in real time
            </li>
            <li>
              <strong>Look up pricing</strong> &mdash; pull the correct
              price for any product configuration, including head count
              calculations and margin rules
            </li>
            <li>
              <strong>Generate PO numbers</strong> &mdash; create sequential
              purchase order numbers that match the ERP&apos;s numbering
              system
            </li>
            <li>
              <strong>Query order history</strong> &mdash; look up past
              orders by customer, product, or date range
            </li>
            <li>
              <strong>Trigger reorder alerts</strong> &mdash; flag when
              component inventory drops below minimum thresholds
            </li>
          </ul>
          <p>
            Each of these is a &ldquo;tool&rdquo; defined in the MCP
            server. Claude knows these tools exist, knows what inputs they
            need, and knows what outputs they return. When a procurement
            manager asks Claude to &ldquo;create a purchase order for 500
            units of component X,&rdquo; Claude calls the right MCP tool,
            gets the next PO number, pulls the current price, and assembles
            the document &mdash; all from live data.
          </p>

          <h2>What you can connect</h2>
          <p>
            MCP works with anything that has a programmable interface. In
            practice, that means:
          </p>
          <ul>
            <li>
              <strong>ERP systems</strong> &mdash; SAP, Odoo, Tally, or
              custom-built. If it has an API or database, it can be
              connected.
            </li>
            <li>
              <strong>CRM platforms</strong> &mdash; Salesforce, HubSpot,
              Zoho. Claude can read customer data, update deal stages,
              create follow-up tasks.
            </li>
            <li>
              <strong>Databases</strong> &mdash; PostgreSQL, MySQL, MongoDB.
              Claude can query and write to your database directly (with
              appropriate read/write permissions).
            </li>
            <li>
              <strong>Spreadsheets and file systems</strong> &mdash; Google
              Sheets, shared drives, document repositories. Claude can read
              the latest data without manual uploads.
            </li>
            <li>
              <strong>Communication tools</strong> &mdash; Slack, email,
              messaging platforms. Claude can send notifications, draft
              messages, or respond to queries in-channel.
            </li>
            <li>
              <strong>Industry-specific tools</strong> &mdash; accounting
              software, project management systems, ticketing platforms,
              booking engines. If it has an API, Claude can use it.
            </li>
          </ul>

          <h2>The anatomy of an MCP server</h2>
          <p>
            An MCP server is surprisingly simple. It defines three things:
          </p>
          <ul>
            <li>
              <strong>Tools</strong> &mdash; the actions Claude can take.
              Each tool has a name (like &ldquo;get_inventory_level&rdquo;),
              a description (so Claude knows when to use it), inputs (what
              parameters it needs), and outputs (what it returns).
            </li>
            <li>
              <strong>Resources</strong> &mdash; read-only data that Claude
              can access. Think of these as reference material &mdash;
              product catalogues, pricing tables, policy documents &mdash;
              that Claude can look up but not modify.
            </li>
            <li>
              <strong>Permissions</strong> &mdash; guardrails on what Claude
              can and cannot do. Read-only access to financial data. Write
              access to create draft purchase orders but not approve them.
              No access to salary information. These rules are enforced at
              the MCP layer, not by asking Claude to behave.
            </li>
          </ul>
          <p>
            A typical MCP server for a mid-size manufacturer might have
            10&ndash;20 tools, a handful of resources, and clear permission
            boundaries for different user roles. It&apos;s a 2&ndash;4 week
            development project, not a months-long enterprise integration.
          </p>

          <h2>Why this matters for your business</h2>
          <p>
            Most AI deployments stall because the AI can&apos;t access the
            data it needs. People try Claude, get generic results because
            it&apos;s working without context, and conclude that AI
            isn&apos;t ready for their workflows.
          </p>
          <p>
            MCP changes that equation. When Claude can read your pricing
            rules, query your inventory, and pull from your knowledge base,
            it stops being a generic assistant and starts being a workflow
            participant. The output goes from &ldquo;here&apos;s a template
            you can fill in&rdquo; to &ldquo;here&apos;s the completed
            document with the correct data.&rdquo;
          </p>
          <p>
            In the manufacturing deployment we referenced earlier, MCP
            unlocked the difference between Tier 1 use cases (instructions
            and knowledge files only) and Tier 3 use cases (live system
            integration). Tier 1 saved time. Tier 3 eliminated entire
            manual processes.
          </p>

          <h2>Getting started</h2>
          <p>
            You don&apos;t need to connect everything at once. The practical
            approach:
          </p>
          <ul>
            <li>
              <strong>Start with read-only</strong> &mdash; connect Claude
              to your most-referenced data sources (pricing, product specs,
              customer history) with read-only access. No risk, immediate
              value.
            </li>
            <li>
              <strong>Add write actions carefully</strong> &mdash; once
              you&apos;re confident in the output quality, add the ability
              to create drafts (purchase orders, invoices, reports) that
              require human approval before finalising.
            </li>
            <li>
              <strong>Automate with guardrails</strong> &mdash; for
              high-confidence, repetitive actions (reorder alerts, status
              updates, notification triggers), allow Claude to act
              autonomously within defined boundaries.
            </li>
          </ul>
          <p>
            Each step builds trust in the system. By the time you&apos;re
            automating, your team has been using AI-assisted workflows for
            months and understands exactly what it can and can&apos;t do.
          </p>

          <h2>The bottom line</h2>
          <p>
            MCP is the infrastructure layer that turns Claude from a smart
            chat interface into a real business tool. It&apos;s not a
            product you buy &mdash; it&apos;s a connector you build,
            specific to your systems, your data, and your workflows.
          </p>
          <p>
            Every business that uses a CRM, ERP, database, or internal tool
            can build an MCP server. The question isn&apos;t whether
            it&apos;s technically possible &mdash; it&apos;s whether you
            have the deployment structure to make it useful. That&apos;s the
            part most companies skip.
          </p>

          {/* CTA */}
          <div className="mt-16 pt-10 border-t border-border-light">
            <h3>
              Ready to connect your systems to Claude?
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

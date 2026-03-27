import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "How a 79-Year-Old Manufacturer Deployed AI Across 7 Departments in 6 Months",
  description:
    "Orient Printing & Packaging mapped 49 AI use cases, structured 18 projects, and deployed 11 in the first engagement — saving hundreds of hours per month and cutting document generation time by 85%.",
  keywords: [
    "AI case study",
    "AI for manufacturing",
    "AI deployment case study",
    "Orient Printing AI",
    "enterprise AI implementation",
    "AI workflow automation results",
    "AI ROI manufacturing",
    "Claude AI enterprise",
    "instruction engineering case study",
  ],
  alternates: {
    canonical: "https://settlewithai.com/blog/orient-case-study",
  },
  openGraph: {
    type: "article",
    title:
      "How a 79-Year-Old Manufacturer Deployed AI Across 7 Departments in 6 Months",
    description:
      "49 use cases mapped. 18 projects structured. 11 deployed. 85% faster document generation. Here's exactly how it happened.",
    url: "https://settlewithai.com/blog/orient-case-study",
    siteName: "Settle",
    publishedTime: "2026-03-27T00:00:00Z",
    authors: ["Settle"],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "How a 79-Year-Old Manufacturer Deployed AI Across 7 Departments in 6 Months",
    description:
      "49 use cases mapped. 18 projects structured. 11 deployed. 85% faster document generation.",
  },
};

export default function Article() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "How a 79-Year-Old Manufacturer Deployed AI Across 7 Departments in 6 Months",
    description:
      "A detailed case study of AI deployment at Orient Printing & Packaging — 49 use cases, 18 projects, real production results.",
    datePublished: "2026-03-27T00:00:00Z",
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
      "@id": "https://settlewithai.com/blog/orient-case-study",
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
            How a 79-Year-Old Manufacturer Deployed AI Across 7 Departments
            in 6 Months
          </h1>
          <p className="text-text-muted text-[17px] leading-relaxed">
            Orient Printing &amp; Packaging has been manufacturing printing
            presses since 1946. With 20,000+ units installed across 50
            countries, they&apos;re one of the world&apos;s largest suppliers
            in their field. This is the story of how they went from zero AI
            to 11 deployed projects &mdash; and what the numbers actually
            looked like.
          </p>
          <div className="flex items-center gap-3 mt-6 text-sm text-text-faint">
            <span>Settle</span>
            <span>&middot;</span>
            <time dateTime="2026-03-27">March 2026</time>
            <span>&middot;</span>
            <span>15 min read</span>
          </div>
        </header>

        {/* Stats banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 py-8 border-y border-border-light">
          {[
            { v: "49", l: "Use cases mapped" },
            { v: "18", l: "Projects structured" },
            { v: "11", l: "Deployed in phase 1" },
            { v: "85%", l: "Faster doc generation" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div
                className="text-accent text-[clamp(1.5rem,3vw,2rem)] font-medium leading-none mb-1"
                style={{
                  fontFamily: "Sentient, Georgia, serif",
                  letterSpacing: "-0.03em",
                }}
              >
                {s.v}
              </div>
              <div className="text-text-faint text-xs uppercase tracking-[0.1em]">
                {s.l}
              </div>
            </div>
          ))}
        </div>

        {/* Body */}
        <div className="prose-settle">
          <h2>The starting point</h2>
          <p>
            When we first sat down with Orient&apos;s director, Rishab Kohli,
            the picture was familiar. A company with deep domain expertise,
            decades of operational knowledge, and a growing sense that AI
            could help &mdash; but no clear path from interest to
            implementation.
          </p>
          <p>
            Orient isn&apos;t a startup. They have seven departments:
            Marketing &amp; Sales, Design, Supply Chain, Production &amp;
            Maintenance, Accounts, HR &amp; IT, and Servicing. They run a
            custom-built ERP. Their product catalogue spans offset printing
            presses, flexographic presses, inkjet digital presses, folder
            gluers, and converting machines. The complexity is real.
          </p>
          <p>
            The question wasn&apos;t &ldquo;can AI help?&rdquo; &mdash; it
            was &ldquo;where do we start, and how do we avoid the pilot that
            goes nowhere?&rdquo;
          </p>

          <h2>Discovery: 49 use cases in 7 departments</h2>
          <p>
            We started where we always start: mapping workflows. Not at a
            strategy level &mdash; at the task level. What does someone in
            procurement actually do when they need to source a component?
            What does a sales engineer do when a customer asks for a quote on
            a C-Series digital press? Where do errors happen? Where does work
            pile up?
          </p>
          <p>
            Over two weeks, we documented every repeatable workflow across
            all seven departments. The result was a use-case matrix of 49
            distinct opportunities, each scored by impact, feasibility, and
            dependencies.
          </p>
          <p>
            Some examples of what we found:
          </p>
          <ul>
            <li>
              <strong>Sales was spending 3&ndash;4 hours per offer
              document</strong> &mdash; manually pulling pricing from
              spreadsheets, formatting specifications, attaching the right
              terms and conditions (different for domestic vs.
              international), and assembling an 8-page branded PDF. They were
              producing dozens of these per month.
            </li>
            <li>
              <strong>Supply Chain was writing RFQs from scratch</strong>{" "}
              every time, despite 80% of the content being templatable.
              Vendor comparison reports were manual Excel exercises that took
              a full day.
            </li>
            <li>
              <strong>Service engineers were troubleshooting from
              memory</strong>, calling senior colleagues, or digging through
              physical manuals. There was no searchable knowledge base.
            </li>
            <li>
              <strong>HR was writing job descriptions ad hoc</strong>,
              producing inconsistent postings across recruitment portals.
              Payroll processing involved manual PF, ESI, and TDS
              calculations every cycle.
            </li>
            <li>
              <strong>Production reviews relied on manually assembled
              presentations</strong> that took hours to compile from
              scattered data sources.
            </li>
          </ul>
          <p>
            None of these were unsolvable problems. But collectively, they
            represented hundreds of hours per month of work that could be
            structured, accelerated, or eliminated entirely.
          </p>

          <h2>Architecture: 18 projects, not 7</h2>
          <p>
            The instinct in most AI deployments is to organise by department:
            one AI project for Sales, one for HR, one for Production. We
            tried this initially and quickly found it didn&apos;t work.
          </p>
          <p>
            The problem is that use cases within the same department often
            need fundamentally different context. Marketing&apos;s &ldquo;Offer
            Creation&rdquo; needs a pricing database and terms and conditions
            files. Marketing&apos;s &ldquo;SEO Workflow&rdquo; needs web
            search access and keyword data. Cramming both into the same
            project meant bloated context windows, confused instructions, and
            unreliable output.
          </p>
          <p>
            So we split the rollout into 18 functional projects grouped by
            workflow cluster:
          </p>
          <ul>
            <li>
              <strong>Sales Proposals &amp; Pricing</strong> &mdash; offer
              creation, instant price generation, configuration
              recommendations
            </li>
            <li>
              <strong>Sales Communications</strong> &mdash; CRM updates,
              automated follow-ups, outreach drafting
            </li>
            <li>
              <strong>Vendor Management &amp; Procurement</strong> &mdash;
              vendor discovery, RFQ generation, purchase orders, cost analysis
            </li>
            <li>
              <strong>Service &amp; Troubleshooting</strong> &mdash; AI
              troubleshooting assistant backed by technical manual knowledge
              base
            </li>
            <li>
              <strong>Financial Operations</strong> &mdash; invoice
              generation, MIS reports, Excel analysis
            </li>
            <li>
              <strong>Recruitment &amp; Talent</strong> &mdash; job
              descriptions, KRA/KPI generation
            </li>
            <li>
              <strong>Payroll &amp; HR Operations</strong> &mdash; salary
              sheet generation with Indian statutory compliance (PF, ESI,
              TDS)
            </li>
            <li>
              <strong>ERP Development Assistant</strong> &mdash; coding
              assistant for their custom-built ERP system
            </li>
          </ul>
          <p>
            Each project got its own instructions, its own knowledge files,
            and its own set of rules. This meant every project could be
            optimised independently, tested independently, and deployed
            independently.
          </p>

          <h2>The four-tier phased rollout</h2>
          <p>
            Not all 49 use cases could ship at once. Some needed nothing
            more than well-written instructions. Others required integration
            with Orient&apos;s custom ERP. A few depended on external systems
            that didn&apos;t exist yet.
          </p>
          <p>
            We designed a four-tier rollout:
          </p>
          <ul>
            <li>
              <strong>Tier 1: Quick Wins (Weeks 1&ndash;4)</strong> &mdash;
              14 use cases that needed only project instructions and
              knowledge files. No integrations, no custom development. Email
              writing across all departments, instant price calculations, job
              description generation, Excel analysis, ERP coding assistance.
            </li>
            <li>
              <strong>Tier 2: Structured Documents (Months
              2&ndash;3)</strong> &mdash; 14 use cases requiring document
              generation capabilities. Offer creation with branded PDFs, BOM
              generation, RFQ templates, vendor reports, production review
              presentations, payroll processing.
            </li>
            <li>
              <strong>Tier 3: ERP Integration (Months 3&ndash;6)</strong>{" "}
              &mdash; 14 use cases that needed a custom connector to
              Orient&apos;s ERP system. Purchase order creation, inventory
              tracking, invoice generation, sales forecasting, automated
              reorder alerts.
            </li>
            <li>
              <strong>Tier 4: Advanced AI (Month 6+)</strong> &mdash; 7 use
              cases requiring external system integration. AutoCAD script
              generation, predictive maintenance from IoT sensors, AI travel
              desk with booking APIs, image and video generation.
            </li>
          </ul>
          <p>
            This tiering was critical. It meant Orient could start seeing
            results in the first month while the more complex integrations
            were being developed. By the time Tier 3 rolled out, the team
            had already been using AI daily for three months. Adoption
            wasn&apos;t a problem &mdash; it was a habit.
          </p>

          <h2>Instruction engineering: the offer generator</h2>
          <p>
            The offer generator became our flagship deployment &mdash; and
            the best example of what instruction engineering actually looks
            like in practice.
          </p>
          <p>
            Before AI, creating a customer offer for a digital press took
            3&ndash;4 hours. A sales engineer would pull pricing from a
            master spreadsheet (five sheets covering C-Series 600/1200 and
            L&amp;P 600/1200 configurations plus extra colour options),
            manually calculate head counts based on print width and colour
            configuration, apply the 20% gross margin, format the
            specification, select the right terms and conditions (domestic
            vs. international), and assemble everything into a branded
            8-page document.
          </p>
          <p>
            After deployment, the same process takes 30 minutes.
          </p>
          <p>
            The system works in two steps. First, the sales engineer enters
            the machine specification into a Claude project configured with
            Orient&apos;s pricing logic, product knowledge base, and full
            terms and conditions. Claude calculates the correct pricing
            &mdash; including head count formulas, add-on components (unwind
            systems, IR drying, coating units, RIP software, sheeters), and
            installation costs &mdash; and outputs structured data across
            five sections: cover data, machine specification, equipment
            pricing, T&amp;C reference, and delivery terms.
          </p>
          <p>
            Second, that structured output feeds into a dashboard tool that
            generates a branded 8-page DOCX with Orient&apos;s boilerplate
            pages (company overview, product introduction, client logos,
            press configuration diagrams) and the calculated pricing pages.
          </p>
          <p>
            The instructions include safety rules: never reveal internal
            costs or partner margins to the customer. Review gates require
            confirmation before finalising pricing on non-standard
            configurations. The output format is locked to Orient&apos;s
            brand standards.
          </p>
          <p>
            This is what we mean by instruction engineering. It&apos;s not a
            prompt. It&apos;s a production system.
          </p>

          <h2>What shipped in the first engagement</h2>
          <p>
            Eleven projects went live in the first phase:
          </p>
          <ul>
            <li>
              <strong>Offer Generator</strong> &mdash; 85% reduction in
              document creation time. Previously 3&ndash;4 hours, now 30
              minutes. Dozens of offers generated per month.
            </li>
            <li>
              <strong>Instant Price Calculator</strong> &mdash; real-time
              pricing from natural language input. Sales engineers get
              accurate quotes in seconds instead of manually navigating
              pricing spreadsheets.
            </li>
            <li>
              <strong>Configuration Suggestor</strong> &mdash; customers
              describe their printing requirements, the system recommends the
              optimal machine configuration. Reduced back-and-forth between
              sales and engineering.
            </li>
            <li>
              <strong>Email Writer (all departments)</strong> &mdash;
              context-aware email drafting tuned to Orient&apos;s tone and
              terminology. Deployed across Marketing, Supply Chain,
              Production, Accounts, HR, and Servicing.
            </li>
            <li>
              <strong>RFQ Generator</strong> &mdash; templated request-for-quote
              documents generated from component specifications. Cut
              procurement preparation time by 60%.
            </li>
            <li>
              <strong>Vendor Analysis Reports</strong> &mdash; automated
              vendor comparison reports from uploaded cost data. What used to
              take a full day now takes under an hour.
            </li>
            <li>
              <strong>Service Troubleshooting Assistant</strong> &mdash;
              AI-powered diagnostics backed by Orient&apos;s technical
              manuals. Engineers describe symptoms, get ranked root causes
              and diagnostic steps. Reduced average troubleshooting time and
              dependence on senior staff for routine issues.
            </li>
            <li>
              <strong>BOM Generator</strong> &mdash; structured bills of
              materials from order specifications. Automated what was
              previously a manual, error-prone process.
            </li>
            <li>
              <strong>Job Description Generator</strong> &mdash;
              manufacturing-context job descriptions with consistent
              formatting across all recruitment portals.
            </li>
            <li>
              <strong>Excel AI Assistant</strong> &mdash; natural language
              analysis of financial and operational spreadsheets. Accounts
              team uses it daily for data analysis without writing formulas.
            </li>
            <li>
              <strong>ERP Coding Assistant</strong> &mdash; development
              support for Orient&apos;s custom ERP system. The IT team loaded
              the ERP schema into the project&apos;s knowledge base, giving
              Claude full context on their codebase.
            </li>
          </ul>

          <h2>The numbers</h2>
          <p>
            After 90 days of production use:
          </p>
          <ul>
            <li>
              <strong>Document generation time: 85% reduction</strong>{" "}
              &mdash; offers, RFQs, BOMs, reports, and presentations that
              previously took hours are now produced in minutes.
            </li>
            <li>
              <strong>Estimated $200,000+ in annual labour savings</strong>{" "}
              &mdash; calculated across all deployed use cases based on hours
              saved per task multiplied by frequency and fully-loaded
              employee cost.
            </li>
            <li>
              <strong>400+ hours saved per month</strong> across all
              departments &mdash; from eliminated manual document assembly,
              reduced troubleshooting time, automated procurement prep, and
              streamlined communications.
            </li>
            <li>
              <strong>Task-level time reduction: 4 hours &rarr; 30
              minutes</strong> on the highest-impact use case (offer
              generation), with similar ratios across RFQ creation, vendor
              analysis, and production reporting.
            </li>
            <li>
              <strong>Error reduction in pricing</strong> &mdash;
              instruction-enforced calculation logic eliminated the manual
              errors that previously occurred when sales engineers navigated
              complex pricing spreadsheets by hand.
            </li>
            <li>
              <strong>11 custom skills built</strong>, including a pricing
              calculator, configuration suggestor, BOM generator, Indian
              payroll processor with statutory compliance, and a
              troubleshooting assistant.
            </li>
          </ul>

          <h2>What&apos;s next</h2>
          <p>
            Orient is now in Tier 3 &mdash; building a custom connector to
            their ERP system. This will unlock the remaining 14 use cases
            that require live data: automated purchase orders, inventory
            tracking, invoice generation, sales forecasting, and reorder
            alerts.
          </p>
          <p>
            Tier 4 is on the horizon: AutoCAD script generation for the
            Design team, predictive maintenance from machine sensor data, and
            an AI-powered travel desk for the Service team&apos;s field
            visits.
          </p>
          <p>
            The longer-term vision is productisation. Orient plans to take
            the use cases that delivered the strongest ROI internally and
            rebuild them using the Claude API and Agent SDK &mdash; offering
            them as AI-powered tools to other printing and packaging
            companies worldwide.
          </p>
          <p>
            From a 79-year-old manufacturer that had never used AI to a
            company deploying it across every department, with a roadmap to
            productise it for their industry. That&apos;s what structured
            deployment looks like.
          </p>

          {/* CTA */}
          <div className="mt-16 pt-10 border-t border-border-light">
            <h3>Want results like these?</h3>
            <p>
              We help companies go from zero to deployed &mdash; structured
              rollouts, production-grade instructions, and measurable
              results.{" "}
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

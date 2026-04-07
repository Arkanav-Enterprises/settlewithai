import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { BlogTOC } from "@/components/blog/BlogTOC";

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
    authors: ["Pranav Ambwani"],
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
    dateModified: "2026-03-27T00:00:00Z",
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
      "@id": "https://settlewithai.com/blog/orient-case-study",
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
              { "@type": "ListItem", position: 3, name: "Orient Case Study", item: "https://settlewithai.com/blog/orient-case-study" },
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
              fontFamily: "var(--font-heading)",
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
            <a href="/#contact" className="hover:text-accent transition-colors">Pranav Ambwani</a>
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
                  fontFamily: "var(--font-heading)",
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
            I remember the first call with Rishab Kohli, Orient&apos;s
            director. He pulled up a spreadsheet with about forty things his
            team wanted AI to do. Marketing emails. Pricing calculators.
            Troubleshooting guides. The list went on.
          </p>
          <p>
            I asked him a simple question: &ldquo;Which of these does
            someone on your team spend the most time on every single
            week?&rdquo; He paused. That pause told me everything I needed
            to know. They had ideas. What they didn&apos;t have was a
            starting point.
          </p>
          <p>
            Orient isn&apos;t a startup. They&apos;ve been manufacturing
            printing presses since 1946. Seven departments: Marketing &amp;
            Sales, Design, Supply Chain, Production &amp; Maintenance,
            Accounts, HR &amp; IT, and Servicing. A custom-built ERP. A
            product catalogue that spans offset printing presses,
            flexographic presses, inkjet digital presses, folder gluers, and
            converting machines. Over 20,000 units installed in 50+
            countries.
          </p>
          <p>
            The complexity is real. And honestly, that&apos;s what made it
            exciting.
          </p>

          <h2>Two weeks on the factory floor</h2>
          <p>
            I didn&apos;t start with a strategy deck. I started by watching
            people work.
          </p>
          <p>
            What does someone in procurement actually do when they need to
            source a component? What happens when a sales engineer gets a
            call asking for a quote on a C-Series digital press? Where do
            mistakes happen? Where does work pile up and sit there for days?
          </p>
          <p>
            Over two weeks, I documented every repeatable workflow across
            all seven departments. I talked to the people doing the work,
            not just their managers. By the end, I had a matrix of 49
            distinct use cases, each scored by impact, feasibility, and
            dependencies.
          </p>
          <p>
            Some of what I found genuinely surprised me:
          </p>
          <ul>
            <li>
              <strong>Sales was spending 3&ndash;4 hours per offer
              document.</strong> They were manually pulling pricing from
              spreadsheets, formatting specifications, attaching the right
              terms and conditions (different for domestic vs.
              international), and assembling an 8-page branded PDF. Dozens
              of these per month. Every single one built from scratch.
            </li>
            <li>
              <strong>Supply Chain was writing RFQs from scratch</strong>{" "}
              every time, even though 80% of the content was templatable.
              Vendor comparison reports? Manual Excel exercises that ate up
              a full day.
            </li>
            <li>
              <strong>Service engineers were troubleshooting from
              memory.</strong> Calling senior colleagues, flipping through
              physical manuals. No searchable knowledge base existed.
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
            None of these were unsolvable problems. But collectively? They
            represented hundreds of hours per month of work that could be
            structured, accelerated, or eliminated entirely.
          </p>

          <h2>Why I split it into 18 projects instead of 7</h2>
          <p>
            My first instinct was to organise by department. One AI project
            for Sales, one for HR, one for Production. Clean and simple.
          </p>
          <p>
            It didn&apos;t work.
          </p>
          <p>
            I honestly didn&apos;t expect this to be a problem, but the use
            cases within the same department often need fundamentally
            different context. Marketing&apos;s &ldquo;Offer
            Creation&rdquo; needs a pricing database and terms and conditions
            files. Marketing&apos;s &ldquo;SEO Workflow&rdquo; needs web
            search access and keyword data. When I crammed both into the
            same project, the context window got bloated, instructions got
            confused, and the output became unreliable. Sound familiar?
          </p>
          <p>
            So I restructured. 18 functional projects grouped by
            workflow cluster:
          </p>
          <ul>
            <li>
              <strong>Sales Proposals &amp; Pricing</strong>, covering offer
              creation, instant price generation, configuration
              recommendations
            </li>
            <li>
              <strong>Sales Communications</strong>, covering CRM updates,
              automated follow-ups, outreach drafting
            </li>
            <li>
              <strong>Vendor Management &amp; Procurement</strong>, covering
              vendor discovery, RFQ generation, purchase orders, cost analysis
            </li>
            <li>
              <strong>Service &amp; Troubleshooting</strong>, an AI
              troubleshooting assistant backed by technical manual knowledge
              base
            </li>
            <li>
              <strong>Financial Operations</strong>, covering invoice
              generation, MIS reports, Excel analysis
            </li>
            <li>
              <strong>Recruitment &amp; Talent</strong>, covering job
              descriptions, KRA/KPI generation
            </li>
            <li>
              <strong>Payroll &amp; HR Operations</strong>, handling salary
              sheet generation with Indian statutory compliance (PF, ESI,
              TDS)
            </li>
            <li>
              <strong>ERP Development Assistant</strong>, a coding
              assistant for their custom-built ERP system
            </li>
          </ul>
          <p>
            Each project got its own instructions, its own knowledge files,
            and its own rules. That separation was the whole game. It meant
            I could optimise, test, and deploy each one independently.
          </p>

          <h2>Rolling it out in tiers</h2>
          <p>
            49 use cases can&apos;t ship at once. Some needed nothing
            more than well-written instructions. Others required integration
            with Orient&apos;s custom ERP. A few depended on external systems
            that didn&apos;t exist yet.
          </p>
          <p>
            I designed a four-tier rollout, and the tiering turned out to
            be one of the most important decisions of the whole engagement:
          </p>
          <ul>
            <li>
              <strong>Tier 1: Quick Wins (Weeks 1&ndash;4).</strong> 14 use
              cases that needed only project instructions and
              knowledge files. No integrations, no custom development. Email
              writing across all departments, instant price calculations, job
              description generation, Excel analysis, ERP coding assistance.
            </li>
            <li>
              <strong>Tier 2: Structured Documents (Months
              2&ndash;3).</strong> 14 use cases requiring document
              generation capabilities. Offer creation with branded PDFs, BOM
              generation, RFQ templates, vendor reports, production review
              presentations, payroll processing.
            </li>
            <li>
              <strong>Tier 3: ERP Integration (Months 3&ndash;6).</strong>{" "}
              14 use cases that needed a custom connector to
              Orient&apos;s ERP system. Purchase order creation, inventory
              tracking, invoice generation, sales forecasting, automated
              reorder alerts.
            </li>
            <li>
              <strong>Tier 4: Advanced AI (Month 6+).</strong> 7 use
              cases requiring external system integration. AutoCAD script
              generation, predictive maintenance from IoT sensors, AI travel
              desk with booking APIs, image and video generation.
            </li>
          </ul>
          <p>
            Here&apos;s why the tiers mattered so much: Orient started
            seeing results in the first month while the more complex
            integrations were still being built. By the time Tier 3 rolled
            out, the team had already been using AI daily for three months.
            Adoption wasn&apos;t something I had to push. It was already a
            habit.
          </p>

          <h2>The offer generator (where it got personal)</h2>
          <p>
            This became the flagship deployment, and it&apos;s the one I&apos;m
            most proud of.
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
            After deployment? 30 minutes.
          </p>
          <p>
            I built it in two steps. First, the sales engineer enters
            the machine specification into a <a href="https://www.anthropic.com/claude" target="_blank" rel="noopener noreferrer">Claude AI</a> project I configured with
            Orient&apos;s pricing logic, product knowledge base, and full
            terms and conditions. Claude AI calculates the correct pricing,
            including head count formulas, add-on components (unwind
            systems, IR drying, coating units, RIP software, sheeters), and
            installation costs. It outputs structured data across
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
            I also baked in safety rules: the system will never reveal
            internal costs or partner margins to the customer. Review gates
            require confirmation before finalising pricing on non-standard
            configurations. The output format is locked to Orient&apos;s
            brand standards.
          </p>
          <p>
            This isn&apos;t a prompt. It&apos;s a production system. That
            distinction matters more than anything else I could tell you
            about <a href="https://docs.anthropic.com/en/docs/about-claude/models" target="_blank" rel="noopener noreferrer">instruction engineering</a>.
          </p>

          <h2>Eleven projects live</h2>
          <p>
            By the end of the first engagement, eleven projects were in
            production:
          </p>
          <ul>
            <li>
              <strong>Offer Generator.</strong> 85% reduction in
              document creation time. Previously 3&ndash;4 hours, now 30
              minutes. Dozens of offers generated per month.
            </li>
            <li>
              <strong>Instant Price Calculator.</strong> Real-time
              pricing from natural language input. Sales engineers get
              accurate quotes in seconds instead of manually navigating
              pricing spreadsheets.
            </li>
            <li>
              <strong>Configuration Suggestor.</strong> Customers
              describe their printing requirements, the system recommends the
              optimal machine configuration. Reduced back-and-forth between
              sales and engineering.
            </li>
            <li>
              <strong>Email Writer (all departments).</strong>
              Context-aware email drafting tuned to Orient&apos;s tone and
              terminology. Deployed across Marketing, Supply Chain,
              Production, Accounts, HR, and Servicing.
            </li>
            <li>
              <strong>RFQ Generator.</strong> Templated request-for-quote
              documents generated from component specifications. Cut
              procurement preparation time by 60%.
            </li>
            <li>
              <strong>Vendor Analysis Reports.</strong> Automated
              vendor comparison reports from uploaded cost data. What used to
              take a full day now takes under an hour.
            </li>
            <li>
              <strong>Service Troubleshooting Assistant.</strong>
              AI-powered diagnostics backed by Orient&apos;s technical
              manuals. Engineers describe symptoms, get ranked root causes
              and diagnostic steps. Reduced average troubleshooting time and
              dependence on senior staff for routine issues.
            </li>
            <li>
              <strong>BOM Generator.</strong> Structured bills of
              materials from order specifications. Automated what was
              previously a manual, error-prone process.
            </li>
            <li>
              <strong>Job Description Generator.</strong>
              Manufacturing-context job descriptions with consistent
              formatting across all recruitment portals.
            </li>
            <li>
              <strong>Excel AI Assistant.</strong> Natural language
              analysis of financial and operational spreadsheets. The Accounts
              team uses it daily for data analysis without writing formulas.
            </li>
            <li>
              <strong>ERP Coding Assistant.</strong> Development
              support for Orient&apos;s custom ERP system. The IT team loaded
              the ERP schema into the project&apos;s knowledge base, giving
              Claude AI full context on their codebase.
            </li>
          </ul>

          <h2>The numbers (after 90 days)</h2>
          <p>
            I want to be straightforward about the results. These aren&apos;t
            projections. This is what happened after 90 days of production
            use:
          </p>
          <ul>
            <li>
              <strong>Document generation time: 85% reduction.</strong>{" "}
              Offers, RFQs, BOMs, reports, and presentations that
              previously took hours are now produced in minutes.
            </li>
            <li>
              <strong>Estimated $200,000+ in annual labour savings</strong>,
              calculated across all deployed use cases based on hours
              saved per task multiplied by frequency and fully-loaded
              employee cost.
            </li>
            <li>
              <strong>400+ hours saved per month</strong> across all
              departments, from eliminated manual document assembly,
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
              <strong>Error reduction in pricing.</strong>
              Instruction-enforced calculation logic eliminated the manual
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
            Orient is now in Tier 3, building a custom connector to
            their ERP system. This will unlock the remaining 14 use cases
            that require live data: automated purchase orders, inventory
            tracking, invoice generation, sales forecasting, and reorder
            alerts.
          </p>
          <p>
            Tier 4 is on the horizon. AutoCAD script generation for the
            Design team, predictive maintenance from machine sensor data, and
            an AI-powered travel desk for the Service team&apos;s field
            visits.
          </p>
          <p>
            But the part I find most interesting is the longer-term vision.
            Orient plans to take the use cases that delivered the strongest
            ROI internally and rebuild them using the Claude API and <a href="https://www.anthropic.com/research/building-effective-agents" target="_blank" rel="noopener noreferrer">Agent
            SDK</a>, offering them as AI-powered tools to other printing and
            packaging companies worldwide. They want to go from buyer of AI
            to seller of it.
          </p>
          <p>
            When I started this engagement, I wasn&apos;t sure a 79-year-old
            manufacturer could move this fast. I was wrong. They went from
            zero AI to deploying it across every department in six months.
            And they&apos;re not slowing down.
          </p>

          {/* Related */}
          <div className="mt-16 pt-10 border-t border-[rgba(20,20,19,0.1)]">
            <h3 className="text-lg font-medium mb-6">Related</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <a href="/blog/integrating-ai-into-your-company" className="group">
                <p className="font-medium group-hover:text-[#d97757] transition-colors">How to Actually Integrate AI Into Your Company</p>
                <p className="text-sm text-[rgba(20,20,19,0.5)] mt-1">A structured, phase-by-phase approach to deploying AI across your team&apos;s real workflows.</p>
              </a>
              <a href="/blog/mcp-explained-for-business" className="group">
                <p className="font-medium group-hover:text-[#d97757] transition-colors">MCP Explained: Connect Your ERP, CRM, and Systems to Claude AI</p>
                <p className="text-sm text-[rgba(20,20,19,0.5)] mt-1">How Model Context Protocol lets Claude AI read and write to your business systems.</p>
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

      <Footer />
    </>
  );
}

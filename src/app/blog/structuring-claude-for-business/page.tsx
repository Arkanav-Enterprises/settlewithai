import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { BlogTOC } from "@/components/blog/BlogTOC";

export const metadata: Metadata = {
  title:
    "How to Structure Claude AI for Your Business: Skills, MCP, and the Instruction Architecture That Actually Scales",
  description:
    "Most companies dump everything into one Claude AI project and wonder why results are inconsistent. Here's the layered architecture we use to deploy Claude AI across departments — and why it works at scale.",
  keywords: [
    "Claude AI project structure",
    "Claude AI skills architecture",
    "instruction engineering",
    "Claude AI for business",
    "MCP for business",
    "Claude AI deployment architecture",
    "Claude Code skills",
    "AI project organization",
    "Claude AI instructions best practices",
    "production Claude AI setup",
    "Claude AI knowledge management",
    "enterprise Claude AI deployment",
  ],
  alternates: {
    canonical:
      "https://settlewithai.com/blog/structuring-claude-for-business",
  },
  openGraph: {
    type: "article",
    title:
      "How to Structure Claude AI for Your Business: Skills, MCP, and Instruction Architecture",
    description:
      "The layered architecture we use to deploy Claude AI across departments — and why it works at scale.",
    url: "https://settlewithai.com/blog/structuring-claude-for-business",
    siteName: "Settle",
    publishedTime: "2026-04-02T00:00:00Z",
    authors: ["Pranav Ambwani"],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "How to Structure Claude AI for Your Business: Skills, MCP, and Instruction Architecture",
    description:
      "Most companies dump everything into one Claude AI project. Here's why that doesn't scale — and what to do instead.",
  },
};

export default function Article() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "How to Structure Claude AI for Your Business: Skills, MCP, and the Instruction Architecture That Actually Scales",
    description:
      "Most companies dump everything into one Claude AI project and wonder why results are inconsistent. Here's the layered architecture we use to deploy Claude AI across departments.",
    datePublished: "2026-04-02T00:00:00Z",
    dateModified: "2026-04-02T00:00:00Z",
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
        "https://settlewithai.com/blog/structuring-claude-for-business",
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
              { "@type": "ListItem", position: 3, name: "Structuring Claude AI for Business", item: "https://settlewithai.com/blog/structuring-claude-for-business" },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is instruction engineering for Claude AI?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Instruction engineering is the practice of writing production-grade Claude AI instructions that go beyond simple prompts. It involves creating layered architectures of knowledge files, workflow specifications, safety rules, and review gates that produce consistent, reliable results across hundreds or thousands of runs — not just one good demo.",
                },
              },
              {
                "@type": "Question",
                name: "How should I organise Claude AI projects for a company with multiple departments?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Use a three-layer architecture. Layer 1 (Reference) holds shared company knowledge — brand voice, product specs, compliance rules. Layer 2 (Capabilities) contains department-specific workflows that reference Layer 1. Layer 3 (Connectors) handles MCP integrations with your business systems. This way, updating a company policy in Layer 1 automatically cascades through every department's workflows.",
                },
              },
              {
                "@type": "Question",
                name: "What's the difference between a Claude AI prompt and a Claude AI skill?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A prompt is a one-off instruction you type into a conversation. A skill is a reusable, versioned specification that defines how Claude AI should handle a specific type of work — including what knowledge to reference, what tools to use, what edge cases to handle, and what output format to produce. Prompts are ephemeral; skills are infrastructure.",
                },
              },
              {
                "@type": "Question",
                name: "How many Claude AI projects does a typical business need?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "It depends on the company size, but we typically deploy 8-15 projects for a mid-market company. Each project maps to a distinct workflow cluster — not a department. A sales team might have separate projects for offer generation, prospect research, and CRM reporting, because each workflow requires different instructions, knowledge files, and tool access.",
                },
              },
              {
                "@type": "Question",
                name: "What is MCP and how does it fit into Claude AI's architecture?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Model Context Protocol (MCP) is the connector layer that gives Claude AI access to your business systems — ERPs, CRMs, databases, file systems, and APIs. In our three-layer architecture, MCP sits in Layer 3 as the mechanical hands that execute what the knowledge and workflow layers define. Without MCP, Claude AI can only work with information pasted into the conversation.",
                },
              },
              {
                "@type": "Question",
                name: "How do you prevent Claude AI's instructions from becoming outdated?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The layered architecture solves this. Company-wide knowledge lives in shared reference files that every project imports. When a pricing model changes or a compliance rule updates, you change it in one place and every workflow that references it inherits the update. Without this architecture, you end up with 15 projects containing 15 slightly different versions of the same information.",
                },
              },
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
            How to Structure Claude AI for Your Business: Skills, MCP, and the
            Instruction Architecture That Actually Scales
          </h1>
          <p className="text-text-muted text-[17px] leading-relaxed">
            A designer named Katherine Yeh recently published a{" "}
            <a
              href="https://medium.com/design-bootcamp/a-designers-guide-to-organizing-ai-skills-and-tools-in-claude-code-f87477c35b82"
              target="_blank"
              rel="noopener noreferrer"
            >
              guide to organising Claude Code for design work
            </a>
            . Her three-layer architecture &mdash; reference knowledge,
            capability workflows, and tool connectors &mdash; is exactly
            the pattern we use for deploying Claude AI across entire companies.
            But most businesses never get there. They dump everything into
            one Claude AI project and wonder why the results are inconsistent.
          </p>
          <div className="flex items-center gap-3 mt-6 text-sm text-text-faint">
            <a href="/#contact" className="hover:text-accent transition-colors">Pranav Ambwani</a>
            <span>&middot;</span>
            <time dateTime="2026-04-02">April 2026</time>
            <span>&middot;</span>
            <span>14 min read</span>
          </div>
        </header>

        {/* Body */}
        <div className="prose-settle">
          <h2>The one-project trap</h2>
          <p>
            I watched it happen again last month. A company creates a <a href="https://www.anthropic.com/claude" target="_blank" rel="noopener noreferrer">Claude AI</a>
            project called &ldquo;Company AI&rdquo; or &ldquo;Marketing
            Assistant.&rdquo; They paste in their website, a few product
            descriptions, maybe a brand guide PDF. The system prompt says
            something like &ldquo;You are a helpful assistant for [Company
            Name]. Use a professional tone.&rdquo;
          </p>
          <p>
            And it works. Sort of. Claude AI knows the basics, drafts emails
            that sound vaguely on-brand. But by week three? The cracks show:
          </p>
          <ul>
            <li>Sales uses the same project for proposals, cold emails, and CRM summaries, and the instructions that help with one hurt the others</li>
            <li>Someone updates the pricing sheet but forgets to update the knowledge file, so Claude AI quotes last quarter&apos;s rates</li>
            <li>The project instructions are now 3,000 words of accumulated patches, and nobody remembers which rules are still relevant</li>
            <li>Two departments have created their own projects with conflicting versions of the company description</li>
          </ul>
          <p>
            Have you noticed this at your company? I call it the one-project
            trap. It&apos;s why most teams plateau at &ldquo;Claude AI is useful
            for drafts&rdquo; and never reach &ldquo;Claude AI runs our
            workflows.&rdquo;
          </p>

          <h2>The three-layer architecture</h2>
          <p>
            The fix is the same pattern Katherine Yeh describes for
            design work, adapted for business operations. Three layers, each
            with a clear job.
          </p>

          <h3>Layer 1: Reference knowledge</h3>
          <p>
            This is everything Claude AI needs to <em>know</em> about your
            business. Not what to <em>do</em>, just what to know. It&apos;s
            the foundation every workflow builds on.
          </p>
          <p>
            I split reference knowledge into two buckets:
          </p>
          <p>
            <strong>Company-wide references</strong> get shared across every
            project and department:
          </p>
          <ul>
            <li><strong>Brand voice and tone</strong> &mdash; Not just &ldquo;professional,&rdquo; but specific patterns. Do you use contractions? Do you address the reader as &ldquo;you&rdquo; or by role? What words do you avoid? What&apos;s the difference between how you write to customers vs. partners?</li>
            <li><strong>Product and service specs</strong> &mdash; What you sell, how it works, pricing tiers, technical capabilities. This is the &ldquo;source of truth&rdquo; that every project references.</li>
            <li><strong>Compliance and legal rails</strong> &mdash; What Claude AI must never say. What claims require disclaimers. What data can be shared externally. What regulatory language is mandatory in certain contexts.</li>
          </ul>
          <p>
            <strong>Domain-specific references</strong> stay within a
            department or function:
          </p>
          <ul>
            <li><strong>Sales</strong>: competitor positioning, objection handling playbook, pricing negotiation boundaries</li>
            <li><strong>Procurement</strong>: vendor evaluation criteria, approved supplier list, RFQ templates</li>
            <li><strong>Customer service</strong>: escalation policies, SLA definitions, common issue resolution scripts</li>
            <li><strong>HR</strong>: job description standards, compensation bands, interview scoring rubrics</li>
          </ul>
          <p>
            Here&apos;s the principle that makes it all work: <strong>separate
            knowledge from instructions.</strong> Yeh puts it well. Specs
            answer definitional questions (&ldquo;what is our return
            policy?&rdquo;) while workflow instructions handle judgment
            calls (&ldquo;how should we respond to this
            complaint?&rdquo;). Most companies mash these together.
            Separating them means you can update a policy without touching
            every workflow that references it.
          </p>

          <h3>Layer 2: Capability workflows</h3>
          <p>
            This is where Claude AI learns what to <em>do</em>. Each capability
            is a specific, repeatable workflow, not a vague description of a
            role.
          </p>
          <p>
            Bad: &ldquo;You are a helpful sales assistant.&rdquo;
          </p>
          <p>
            Good: &ldquo;Generate an offer document. Pull the customer&apos;s
            history from the CRM connector. Reference the current pricing
            sheet. Use the formal proposal template. Include delivery
            timelines based on current production capacity. Flag any line
            items that exceed the customer&apos;s credit limit.&rdquo;
          </p>
          <p>
            See the difference? The second version tells Claude AI exactly what
            &ldquo;done&rdquo; looks like. A well-structured capability
            specifies:
          </p>
          <ul>
            <li><strong>Trigger</strong> &mdash; What initiates this workflow? A user request, a scheduled event, a data change?</li>
            <li><strong>Inputs</strong> &mdash; What information does Claude AI need? Where does it come from?</li>
            <li><strong>References</strong> &mdash; Which Layer 1 knowledge files should Claude AI consult?</li>
            <li><strong>Steps</strong> &mdash; The specific sequence of actions, in order</li>
            <li><strong>Tools</strong> &mdash; Which MCP connectors or external tools are needed?</li>
            <li><strong>Output format</strong> &mdash; What does the finished product look like?</li>
            <li><strong>Review gates</strong> &mdash; Where does a human check the work before it goes further?</li>
            <li><strong>Edge cases</strong> &mdash; What happens when data is missing, conflicting, or outside normal ranges?</li>
          </ul>
          <p>
            At{" "}
            <a href="/blog/orient-case-study">Orient Printing &amp; Packaging</a>
            , I deployed 11 capabilities in the first engagement. Each one is a
            distinct workflow with its own instructions. There&apos;s no
            monolithic &ldquo;Orient AI&rdquo; project. The offer generator
            references the pricing knowledge file, the product spec sheet, and
            the proposal template, but it doesn&apos;t know anything about HR
            policies. It doesn&apos;t need to.
          </p>

          <h3>Layer 3: Connectors (MCP)</h3>
          <p>
            This is the integration layer. <a href="https://modelcontextprotocol.io" target="_blank" rel="noopener noreferrer">Model Context Protocol</a> servers
            that connect Claude AI to your actual business systems.
          </p>
          <p>
            Common connectors I build:
          </p>
          <ul>
            <li><strong>ERP connectors</strong> &mdash; Read inventory levels, production schedules, cost data. Write back order updates.</li>
            <li><strong>CRM connectors</strong> &mdash; Pull customer history, deal stage, contact information. Log interactions.</li>
            <li><strong>Document systems</strong> &mdash; Access templates, past proposals, knowledge bases from SharePoint, Google Drive, or Notion.</li>
            <li><strong>Email and calendar</strong> &mdash; Read incoming requests, draft responses, schedule follow-ups.</li>
            <li><strong>Custom databases</strong> &mdash; Any system with an API can become an MCP server.</li>
          </ul>
          <p>
            The key insight about MCP is that it creates clean boundaries
            between <em>what Claude AI knows</em> (Layer 1), <em>what Claude AI
            does</em> (Layer 2), and <em>what Claude AI can reach</em>
            (Layer 3). Changing your CRM from Salesforce to HubSpot? Rebuild
            one connector. Every workflow that touches customer data keeps
            working without a single edit.
          </p>
          <p>
            For a deeper dive on MCP, read my{" "}
            <a href="/blog/mcp-explained-for-business">
              plain-English explainer
            </a>.
          </p>

          <h2>Why the layers matter</h2>
          <p>
            I know. This might feel like overkill if you just want Claude AI to
            help with emails. But the layers solve three problems that kill
            every single-project deployment I&apos;ve seen:
          </p>
          <p>
            <strong>Drift.</strong> Without shared reference files, every
            project slowly develops its own version of reality. Sales says
            the product does X. Marketing says it does Y. Customer service
            says something else entirely. A single reference layer forces one
            source of truth.
          </p>
          <p>
            <strong>Maintenance.</strong> When your pricing changes, do you
            want to update one knowledge file, or hunt through 15 projects
            to find every place the old price appears?
          </p>
          <p>
            <strong>Quality at scale.</strong> A prompt that works for one
            use case breaks when you stretch it across five. Separate
            capabilities with explicit specifications produce consistent
            results on the 500th run, not just the first. I learned this the
            hard way, after watching a &ldquo;catch-all&rdquo; project
            produce increasingly bizarre outputs as more teams piled their
            needs into it.
          </p>

          <h2>What this looks like in practice</h2>
          <p>
            Here&apos;s a simplified version of the architecture I deployed
            at a 200-person manufacturer:
          </p>

          <div className="table-scroll-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Layer</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Shared with</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>L1</td>
                  <td>Brand voice guide</td>
                  <td>Reference</td>
                  <td>All projects</td>
                </tr>
                <tr>
                  <td>L1</td>
                  <td>Product catalogue &amp; specs</td>
                  <td>Reference</td>
                  <td>All projects</td>
                </tr>
                <tr>
                  <td>L1</td>
                  <td>Pricing &amp; margin rules</td>
                  <td>Reference</td>
                  <td>Sales, Procurement</td>
                </tr>
                <tr>
                  <td>L1</td>
                  <td>Compliance requirements</td>
                  <td>Reference</td>
                  <td>All projects</td>
                </tr>
                <tr>
                  <td>L2</td>
                  <td>Offer generator</td>
                  <td>Capability</td>
                  <td>Sales</td>
                </tr>
                <tr>
                  <td>L2</td>
                  <td>RFQ drafter</td>
                  <td>Capability</td>
                  <td>Procurement</td>
                </tr>
                <tr>
                  <td>L2</td>
                  <td>Troubleshooting assistant</td>
                  <td>Capability</td>
                  <td>Service</td>
                </tr>
                <tr>
                  <td>L2</td>
                  <td>Email writer</td>
                  <td>Capability</td>
                  <td>All departments</td>
                </tr>
                <tr>
                  <td>L3</td>
                  <td>ERP connector (SAP)</td>
                  <td>MCP</td>
                  <td>Sales, Procurement, Service</td>
                </tr>
                <tr>
                  <td>L3</td>
                  <td>Email connector (Outlook)</td>
                  <td>MCP</td>
                  <td>All departments</td>
                </tr>
                <tr>
                  <td>L3</td>
                  <td>Document store (SharePoint)</td>
                  <td>MCP</td>
                  <td>All departments</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            Notice how it flows: the offer generator (L2) references
            the pricing rules and product catalogue (L1) and uses the ERP
            connector (L3) to pull real-time data. If the pricing rules
            change, the offer generator automatically uses the new numbers.
            If you swap SAP for Oracle, you rebuild the connector but the
            workflow stays identical.
          </p>

          <h2>Getting started (without boiling the ocean)</h2>
          <p>
            You don&apos;t need to build all three layers at once. That would
            be overwhelming, and honestly, counterproductive. Here&apos;s the
            progression I recommend:
          </p>
          <p>
            <strong>Week 1: Start with Layer 1.</strong> Gather your core
            reference materials: brand guide, product information,
            compliance rules. Upload them to a Claude AI project as knowledge
            files. Even without workflows or connectors, this immediately
            makes every conversation better because Claude AI has accurate
            context instead of guessing.
          </p>
          <p>
            <strong>Week 2: Build your first capability.</strong> Pick the
            workflow that eats the most time. Write explicit instructions
            following the trigger &rarr; inputs &rarr; references &rarr;
            steps &rarr; output &rarr; review pattern. Test it 20 times.
            Find the edge cases. Refine. This part is more tedious than it
            sounds, but it&apos;s where the real value lives.
          </p>
          <p>
            <strong>Week 3+: Add connectors.</strong> Once a workflow is
            reliable with manually provided data, add MCP connectors so
            Claude AI can pull the data itself. This is the step that turns
            Claude AI from an assistant into an agent.
          </p>
          <p>
            <strong>Month 2: Scale.</strong> Add more capabilities, one at a
            time. Each new workflow builds on the reference knowledge you
            already have. The cost of each new capability drops because the
            foundation is in place. This is where the compounding kicks in
            and things start feeling almost unfair.
          </p>

          <h2>Why instruction engineering matters more than you think</h2>
          <p>
            Something in Katherine Yeh&apos;s article struck me. She&apos;s a
            designer, no coding experience, and she built a scalable Claude AI
            architecture in four weeks. The core skill wasn&apos;t technical.
            It was architectural thinking: deciding what goes where, what
            references what, and how pieces compose.
          </p>
          <p>
            That&apos;s what I call <a href="https://www.anthropic.com/research/building-effective-agents" target="_blank" rel="noopener noreferrer">instruction engineering</a>. It&apos;s not
            prompt writing. It&apos;s not software engineering. It&apos;s
            something new that sits between the two: understanding your
            business deeply enough to decompose workflows into structured
            specs, and understanding Claude AI well enough to write instructions
            that produce reliable results at scale.
          </p>
          <p>
            The companies that figure this out build a compounding advantage.
            Every workflow they deploy makes the next one cheaper to build,
            because the reference layer grows and the connectors multiply.
          </p>
          <p>
            The companies that don&apos;t? They end up with 20 disconnected
            Claude AI projects and a team that says &ldquo;AI is useful but not
            transformative.&rdquo;
          </p>
          <p>
            The difference is architecture. And it&apos;s a gap I&apos;d love
            to help you close.{" "}
            <a
              href="/#contact"
              className="text-accent font-medium hover:underline"
            >
              Start a conversation &rarr;
            </a>
          </p>

          {/* Related */}
          <div className="mt-16 pt-10 border-t border-[rgba(20,20,19,0.1)]">
            <h3 className="text-lg font-medium mb-6">Related</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <a href="/blog/claude-agent-mode-business-automation" className="group">
                <p className="font-medium group-hover:text-[#d97757] transition-colors">Claude AI&apos;s Agent Mode Is Here &mdash; What It Means for Business Automation</p>
                <p className="text-sm text-[rgba(20,20,19,0.5)] mt-1">Tool use, MCP, computer use, and agent teams. What agentic AI actually looks like in production.</p>
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
            <h3>Need help structuring Claude AI for your organisation?</h3>
            <p>
              We build the reference knowledge, capability workflows, and MCP
              connectors that turn Claude AI from a chatbot into business
              infrastructure.{" "}
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

import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title:
    "Why Your Enterprise Doesn't Need a Custom AI Model — It Needs Claude",
  description:
    "Most companies think they need fine-tuned models, custom LLMs, or expensive AI infrastructure. After deploying Claude across dozens of workflows, I've found that 95% of enterprise use cases work better with a well-structured Claude deployment than with any custom solution.",
  keywords: [
    "Claude vs custom AI",
    "enterprise AI deployment",
    "Claude for enterprise",
    "custom LLM vs Claude",
    "AI build vs buy",
    "Claude AI business",
    "enterprise LLM strategy",
    "fine-tuning vs prompting",
    "AI implementation strategy",
    "Claude vs GPT enterprise",
    "instruction engineering vs fine-tuning",
  ],
  alternates: {
    canonical:
      "https://settlewithai.com/blog/why-claude-over-custom-ai",
  },
  openGraph: {
    type: "article",
    title:
      "Why Your Enterprise Doesn't Need a Custom AI Model — It Needs Claude",
    description:
      "95% of enterprise use cases work better with well-structured Claude than with any custom AI solution.",
    url: "https://settlewithai.com/blog/why-claude-over-custom-ai",
    siteName: "Settle",
    publishedTime: "2026-04-02T00:00:00Z",
    authors: ["Pranav Ambwani"],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Why Your Enterprise Doesn't Need a Custom AI Model — It Needs Claude",
    description:
      "95% of enterprise use cases work better with well-structured Claude than with any custom AI solution.",
  },
};

export default function Article() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "Why Your Enterprise Doesn't Need a Custom AI Model — It Needs Claude",
    description:
      "Most companies think they need fine-tuned models, custom LLMs, or expensive AI infrastructure. After deploying Claude across dozens of workflows, I've found that 95% of enterprise use cases work better with a well-structured Claude deployment.",
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
        "https://settlewithai.com/blog/why-claude-over-custom-ai",
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
              { "@type": "ListItem", position: 3, name: "Why Claude Over Custom AI", item: "https://settlewithai.com/blog/why-claude-over-custom-ai" },
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
                name: "Should my company build a custom AI model or use Claude?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "For the vast majority of enterprise use cases, Claude with well-structured instructions will outperform a custom model. Custom models make sense only when you have truly unique data patterns that a general model can't handle, you need sub-50ms latency at massive scale, or you're in a heavily regulated industry that requires on-premise inference. For document generation, analysis, customer communication, data extraction, and workflow automation, Claude is faster to deploy, cheaper to maintain, and produces better results.",
                },
              },
              {
                "@type": "Question",
                name: "Is Claude secure enough for enterprise use?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Anthropic offers SOC 2 Type II compliance, HIPAA eligibility, and data that is not used for training by default on their API and business plans. Enterprise deployments can use the API with data residency controls, or deploy through cloud providers like AWS Bedrock and Google Cloud Vertex AI for additional isolation. With proper instruction engineering, you can also build compliance guardrails directly into Claude's workflow specifications.",
                },
              },
              {
                "@type": "Question",
                name: "What about fine-tuning? Doesn't that make AI more accurate?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Fine-tuning can improve performance on narrow, specific tasks, but it comes with significant trade-offs: you need clean training data (thousands of examples), the model loses general reasoning ability, and every time you update your processes you need to retrain. In practice, well-structured Claude instructions with knowledge files achieve comparable or better results for most business tasks, at a fraction of the cost and maintenance burden.",
                },
              },
              {
                "@type": "Question",
                name: "How does Claude compare to GPT-4 and Gemini for enterprise use?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Claude consistently outperforms on tasks requiring careful instruction following, long document analysis (with its 200K-1M token context window), and nuanced business writing. It's also the only major model with a native connector protocol (MCP) designed for enterprise system integration. The safety-first design means fewer hallucinations and better adherence to compliance boundaries, which matters when you're deploying AI into production workflows that touch real customers and real money.",
                },
              },
              {
                "@type": "Question",
                name: "What enterprise use cases can Claude handle without custom development?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "With proper instruction engineering and MCP connectors, Claude can handle document generation (proposals, reports, contracts), data extraction and analysis, customer communication drafting, internal knowledge base Q&A, procurement workflows (RFQs, vendor comparison), HR operations (job descriptions, policy Q&A), financial reporting and analysis, code assistance and review, troubleshooting guides, and translation. These cover roughly 95% of the AI use cases enterprises typically pursue.",
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
            Why Your Enterprise Doesn&apos;t Need a Custom AI
            Model &mdash; It Needs Claude
          </h1>
          <p className="text-text-muted text-[17px] leading-relaxed">
            A few months ago, a CTO told me his company had spent $400,000
            building a custom language model for generating sales proposals.
            Eight months of development. A team of three ML engineers. The
            model worked, technically. But it could only do one thing, and
            every time their proposal template changed, they had to retrain
            it. I set up a Claude project with structured instructions and
            their existing templates in about two weeks. It handled the same
            task, plus six others they hadn&apos;t even asked for.
          </p>
          <div className="flex items-center gap-3 mt-6 text-sm text-text-faint">
            <a href="/#contact" className="hover:text-accent transition-colors">Pranav Ambwani</a>
            <span>&middot;</span>
            <time dateTime="2026-04-02">April 2026</time>
            <span>&middot;</span>
            <span>11 min read</span>
          </div>
        </header>

        {/* Body */}
        <div className="prose-settle">
          <h2>The custom model trap</h2>
          <p>
            I keep having the same conversation. A company decides they need
            AI. Someone (usually from engineering, sometimes a consultant)
            recommends building a custom solution. Fine-tune a model on your
            data. Train it on your documents. Build something proprietary.
          </p>
          <p>
            It sounds right. Your business is unique, so your AI should be
            unique too. Right?
          </p>
          <p>
            Here&apos;s what actually happens. The project takes six to
            twelve months. It costs $200K-$500K when you factor in ML
            engineers, data labeling, infrastructure, and the opportunity
            cost of everyone involved. The resulting model does one thing
            well. Maybe two. And the moment your business process changes
            (new pricing, new compliance requirement, new product line),
            someone has to retrain the model. More data. More engineering
            time. More money.
          </p>
          <p>
            Meanwhile, <a href="https://www.anthropic.com" target="_blank" rel="noopener noreferrer">Anthropic</a> ships Claude updates every few months that make the
            base model better at everything, for free.
          </p>
          <p>
            I&apos;m not saying custom models are never the right call. But
            after deploying Claude into real business workflows for the past
            year, I can tell you the bar for &ldquo;you actually need a
            custom model&rdquo; is much higher than most companies think.
          </p>

          <figure className="my-10">
            <img
              src="https://cdn.sanity.io/images/4zrzovbb/website/5b3eb6e1368dfeeaa206fd0bee001f58d9e2ea36-1920x1080.png"
              alt="Claude as a thinking partner, Anthropic's vision for AI that reasons alongside you"
              className="rounded-lg w-full"
              loading="lazy"
            />
            <figcaption className="text-sm text-text-faint mt-3 text-center">
              Anthropic built Claude to reason alongside you, not just generate text. Image: Anthropic
            </figcaption>
          </figure>

          <h2>What I&apos;ve learned from actual deployments</h2>
          <p>
            At{" "}
            <a href="/blog/orient-case-study">Orient Printing &amp; Packaging</a>,
            I mapped 49 use cases across seven departments. Not hypotheticals.
            Real workflows that real people do every day: writing sales
            proposals, generating RFQs, troubleshooting machinery, drafting
            job descriptions, calculating payroll with Indian statutory
            compliance, analyzing vendor pricing, writing customer emails.
          </p>
          <p>
            Every single one of those 49 use cases works with Claude. No
            fine-tuning. No custom model. No ML engineers. Just well-written
            instructions and the right knowledge files.
          </p>
          <p>
            I was honestly surprised by some of them. The payroll
            calculations, for instance. PF, ESI, TDS, all the statutory
            deductions specific to Indian labor law. I assumed that would
            need something specialized. It didn&apos;t. Claude handles the
            math correctly when you give it the rules and the salary data.
            The key was structuring the instructions precisely, not training
            a new model.
          </p>
          <p>
            That pattern held across all 49 use cases. The bottleneck was
            never the model. It was the instructions.
          </p>

          <h2>The 95% rule</h2>
          <p>
            After a year of doing this work, I&apos;ve arrived at a rough
            heuristic. About 95% of the AI use cases that enterprises
            actually pursue can be handled by Claude with proper instruction
            engineering. The remaining 5% typically involve either real-time
            inference at massive scale (think millions of API calls per
            minute), highly specialized pattern recognition on proprietary
            data (like detecting manufacturing defects from images), or
            strict on-premise requirements where no data can leave the
            building.
          </p>
          <p>
            Everything else? Claude can do it. And usually better than a
            custom solution, because Claude gets smarter every quarter while
            your custom model sits frozen at the moment you trained it.
          </p>
          <p>
            Here&apos;s a quick breakdown of the use cases I&apos;ve deployed:
          </p>

          <div className="table-scroll-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Use case</th>
                  <th>Custom model needed?</th>
                  <th>What Claude needs instead</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Sales proposals and offers</td>
                  <td>No</td>
                  <td>Product specs + pricing rules + template</td>
                </tr>
                <tr>
                  <td>RFQ generation</td>
                  <td>No</td>
                  <td>Vendor list + requirements format + past RFQs</td>
                </tr>
                <tr>
                  <td>Customer email drafting</td>
                  <td>No</td>
                  <td>Brand voice guide + CRM context via MCP</td>
                </tr>
                <tr>
                  <td>Document summarization</td>
                  <td>No</td>
                  <td>Output format specification</td>
                </tr>
                <tr>
                  <td>Internal knowledge Q&amp;A</td>
                  <td>No</td>
                  <td>Knowledge files + search via MCP</td>
                </tr>
                <tr>
                  <td>Troubleshooting guides</td>
                  <td>No</td>
                  <td>Technical manual as knowledge + decision tree</td>
                </tr>
                <tr>
                  <td>Job description writing</td>
                  <td>No</td>
                  <td>Role templates + company standards</td>
                </tr>
                <tr>
                  <td>Financial reporting</td>
                  <td>No</td>
                  <td>Report format + data access via MCP</td>
                </tr>
                <tr>
                  <td>Code review and assistance</td>
                  <td>No</td>
                  <td>Codebase context + style guide</td>
                </tr>
                <tr>
                  <td>Payroll calculations</td>
                  <td>No</td>
                  <td>Statutory rules + salary data</td>
                </tr>
                <tr>
                  <td>Translation and localization</td>
                  <td>No</td>
                  <td>Glossary + style preferences</td>
                </tr>
                <tr>
                  <td>Manufacturing defect detection</td>
                  <td>Yes</td>
                  <td>Specialized vision model needed</td>
                </tr>
                <tr>
                  <td>Real-time pricing at &gt;1M req/min</td>
                  <td>Yes</td>
                  <td>Latency requirements too strict</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            See the pattern? The &ldquo;yes&rdquo; cases are edge cases. The
            everyday work that actually consumes your team&apos;s hours? All
            Claude.
          </p>

          <h2>Why Claude specifically (and not just any LLM)</h2>
          <p>
            I get this question a lot. &ldquo;Why not GPT-4? Why not
            Gemini? They can do the same things.&rdquo;
          </p>
          <p>
            They can do similar things. But after working with all three in
            production, I keep coming back to Claude for a few reasons that
            only show up when you&apos;re deploying at scale, not just
            playing around in a chat window.
          </p>
          <p>
            <strong>Instruction following.</strong> This is the big one.
            When you give Claude a 2,000-word specification with edge cases,
            fallback behavior, and output formatting requirements, it
            follows them. Consistently. On the 500th run. I&apos;ve tested
            the same complex instructions on GPT-4 and Gemini, and both
            drift more over long conversations and complex workflows.
            Claude stays on the rails.
          </p>
          <p>
            <strong>Context window.</strong> <a href="https://www.anthropic.com/news/claude-opus-4-6" target="_blank" rel="noopener noreferrer">Opus 4.6</a> supports up to 1
            million tokens. That&apos;s not a spec-sheet number. It means I
            can feed Claude an entire product catalogue, an entire
            compliance manual, and an entire customer history in a single
            conversation. Try doing that with a model that tops out at 128K
            tokens. You end up chunking, summarizing, and losing nuance.
          </p>
          <p>
            <strong>MCP.</strong> This is the killer feature that nobody
            talks about enough. <a href="https://modelcontextprotocol.io" target="_blank" rel="noopener noreferrer">Model Context Protocol</a> gives Claude a
            standardized way to connect to your business systems. Your ERP,
            your CRM, your databases, your file storage. No other major
            model has a native integration protocol at this level. With
            GPT-4, you&apos;re building custom API bridges. With Claude, you
            build an MCP server once and it works everywhere.
          </p>
          <p>
            <strong>Safety by default.</strong> When I deploy AI into a
            manufacturing company&apos;s procurement workflow, I need to
            know the model won&apos;t hallucinate a vendor that doesn&apos;t
            exist or fabricate a price quote. Claude&apos;s training
            prioritizes honesty over helpfulness. It says &ldquo;I don&apos;t
            know&rdquo; instead of making something up. In a chatbot, that
            might feel unhelpful. In a production workflow handling real
            money? It&apos;s essential.
          </p>

          <figure className="my-10">
            <img
              src="https://cdn.sanity.io/images/4zrzovbb/website/01d06528567e4bd22c3ddedc87f609ee5716a009-2400x1260.png"
              alt="Claude Opus 4.6 announcement from Anthropic, the most capable model for enterprise AI"
              className="rounded-lg w-full"
              loading="lazy"
            />
            <figcaption className="text-sm text-text-faint mt-3 text-center">
              Claude Opus 4.6 with its 1M token context window changed what&apos;s possible for enterprise deployment. Image: Anthropic
            </figcaption>
          </figure>

          <h2>The real cost comparison</h2>
          <p>
            People fixate on API pricing when they compare AI options. That&apos;s
            the wrong number to look at. The real costs are development
            time, maintenance, and opportunity cost.
          </p>

          <div className="table-scroll-wrapper">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Custom model</th>
                  <th>Claude deployment</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Time to first value</strong></td>
                  <td>6-12 months</td>
                  <td>2-4 weeks</td>
                </tr>
                <tr>
                  <td><strong>Upfront cost</strong></td>
                  <td>$200K-$500K</td>
                  <td>$15K-$50K</td>
                </tr>
                <tr>
                  <td><strong>Ongoing maintenance</strong></td>
                  <td>ML engineer ($150K+/yr)</td>
                  <td>Instruction updates (hours/month)</td>
                </tr>
                <tr>
                  <td><strong>Scope</strong></td>
                  <td>1-2 use cases</td>
                  <td>10-20+ use cases</td>
                </tr>
                <tr>
                  <td><strong>When process changes</strong></td>
                  <td>Retrain the model (weeks)</td>
                  <td>Update instructions (hours)</td>
                </tr>
                <tr>
                  <td><strong>Model improvements</strong></td>
                  <td>You build them</td>
                  <td>Anthropic ships them free</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            That last row is the one that matters most long-term. When
            Anthropic released Opus 4.6, every Claude deployment I&apos;d
            ever built instantly got better. Better reasoning, longer
            context, more reliable tool use. My clients didn&apos;t have to
            do anything. They just woke up one morning with a smarter AI.
          </p>
          <p>
            Try getting that with a custom model.
          </p>

          <h2>When you actually do need something custom</h2>
          <p>
            I want to be honest about the limits. There are cases where
            Claude isn&apos;t the answer.
          </p>
          <p>
            <strong>Computer vision at scale.</strong> If you&apos;re
            running quality inspection on a manufacturing line and need to
            classify defects from camera images at thousands of frames per
            second, you need a specialized vision model trained on your
            specific product. Claude can analyze individual images, but it
            can&apos;t match the speed or accuracy of a purpose-built
            classifier for this kind of task.
          </p>
          <p>
            <strong>Ultra-low latency.</strong> If your use case requires
            sub-50ms responses at millions of requests per minute (like
            real-time ad bidding or fraud detection), you need something
            smaller and faster than a large language model. Claude is fast,
            but it&apos;s not microsecond-fast.
          </p>
          <p>
            <strong>Truly proprietary data patterns.</strong> If your
            competitive advantage is a pattern in your data that no general
            model could ever learn from public information (think drug
            discovery, genomics, or materials science), fine-tuning or
            training a custom model might be justified. But be honest with
            yourself about whether your data is actually that unique.
            Most business data isn&apos;t.
          </p>
          <p>
            For everything else, the question isn&apos;t &ldquo;can Claude
            do this?&rdquo; It&apos;s &ldquo;have I given Claude the right
            instructions and context to do this well?&rdquo;
          </p>

          <figure className="my-10">
            <img
              src="https://cdn.sanity.io/images/4zrzovbb/website/8c2855afe51fc0980596b5369b01b0b87eea7eaf-3840x2160.png"
              alt="Claude model family product visual showing Anthropic's AI platform"
              className="rounded-lg w-full"
              loading="lazy"
            />
            <figcaption className="text-sm text-text-faint mt-3 text-center">
              The Claude model family: different tiers for different tasks, all using the same instruction architecture. Image: Anthropic
            </figcaption>
          </figure>

          <h2>The instruction engineering gap</h2>
          <p>
            Here&apos;s the part that trips people up. They try Claude for
            a business task, get mediocre results, and conclude they need
            something more specialized. But the problem wasn&apos;t Claude.
            The problem was a two-sentence prompt trying to do the job of a
            two-page specification.
          </p>
          <p>
            I&apos;ve seen this dozens of times. A company tests Claude by
            typing &ldquo;write me a sales proposal&rdquo; into the chat.
            Claude writes something generic. They say &ldquo;see, it
            doesn&apos;t know our products.&rdquo; Of course it doesn&apos;t.
            You didn&apos;t tell it your products.
          </p>
          <p>
            The same company, with structured instructions that specify the
            product catalogue, the pricing rules, the proposal format, the
            compliance requirements, and the customer&apos;s history? Claude
            produces proposals that their sales team actually uses. No
            fine-tuning required.
          </p>
          <p>
            I wrote about this in detail in my{" "}
            <a href="/blog/structuring-claude-for-business">
              guide to structuring Claude for business
            </a>
            . The short version: it&apos;s a three-layer architecture.
            Reference knowledge (what Claude should know), capability
            workflows (what Claude should do), and MCP connectors (what
            Claude can reach). Get those three right and you don&apos;t
            need a custom model. You need a well-deployed one.
          </p>

          <h2>What I&apos;d tell a CTO considering their options</h2>
          <p>
            If you&apos;re weighing custom AI versus Claude, here&apos;s
            how I&apos;d think about it.
          </p>
          <p>
            First, list your use cases. All of them. Not the flashy moonshot
            ones, but the boring everyday workflows that eat your team&apos;s
            hours. Document generation. Email drafting. Data analysis.
            Report compilation. Knowledge retrieval. That&apos;s where 80%
            of the value lives.
          </p>
          <p>
            Second, try deploying Claude on your highest-volume use case
            with real instructions and real data. Not a quick chat test. A
            proper deployment with a knowledge file, structured
            instructions, and an output specification. Give it two weeks.
          </p>
          <p>
            Third, measure the result. If Claude handles it well (and in
            my experience, it will), you just saved yourself $300K and six
            months. Scale to the next use case. And the next. And the next.
          </p>
          <p>
            The custom model conversation should only start when you hit
            one of the genuine exceptions I listed above. Until then,
            you&apos;re not bottlenecked on model capability. You&apos;re
            bottlenecked on deployment.
          </p>
          <p>
            And that&apos;s a much easier problem to solve.
          </p>
          <p>
            If you want help figuring out where Claude fits in your
            organization, I&apos;m happy to talk.{" "}
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
              <a href="/blog/structuring-claude-for-business" className="group">
                <p className="font-medium group-hover:text-[#d97757] transition-colors">How to Structure Claude for Your Business</p>
                <p className="text-sm text-[rgba(20,20,19,0.5)] mt-1">The three-layer architecture that turns Claude from a chatbot into business infrastructure.</p>
              </a>
              <a href="/blog/claude-agent-mode-business-automation" className="group">
                <p className="font-medium group-hover:text-[#d97757] transition-colors">Claude&apos;s Agent Mode Is Here</p>
                <p className="text-sm text-[rgba(20,20,19,0.5)] mt-1">Tool use, MCP, computer use, and agent teams. What agentic AI looks like in production.</p>
              </a>
            </div>
          </div>

          {/* Author */}
          <div className="mt-16 pt-8 border-t border-border-light flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#e8e6dc] flex items-center justify-center shrink-0 text-text font-medium text-lg" style={{ fontFamily: "var(--font-heading)" }}>P</div>
            <div>
              <a href="/#contact" className="font-medium text-text hover:text-accent transition-colors">Pranav Ambwani</a>
              <p className="text-sm text-text-muted mt-1 leading-relaxed">Founder of Settle. Deploys Claude AI into mid-market companies and manufacturers. Structured rollouts, production-grade instructions, real results.</p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 pt-10 border-t border-border-light">
            <h3>Wondering if Claude can handle your use case?</h3>
            <p>
              Odds are it can. I&apos;ve deployed Claude across
              manufacturing, procurement, HR, sales, and finance workflows.
              Happy to look at yours.{" "}
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

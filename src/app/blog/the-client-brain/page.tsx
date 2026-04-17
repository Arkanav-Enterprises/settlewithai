import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { BlogTOC } from "@/components/blog/BlogTOC";
import { Nav } from "@/components/layout/Nav";
import { MagazineHeader } from "@/components/blog/MagazineHeader";
import { MagazineOutro } from "@/components/blog/MagazineOutro";

export const metadata: Metadata = {
  title:
    "The Client Brain: An LLM Wiki System Inspired by Andrej Karpathy",
  description:
    "When you're running 18 Claude projects for one client, facts can't live in twelve places. We built a wiki that gives every project one source of truth — and tells us when something drifts.",
  keywords: [
    "LLM knowledge management",
    "Claude AI knowledge base",
    "client knowledge wiki",
    "AI context management",
    "multi-tenant AI deployment",
    "structured AI instructions",
    "AI drift detection",
    "Claude projects architecture",
    "enterprise AI consistency",
    "Karpathy LLM context",
  ],
  alternates: {
    canonical:
      "https://settlewithai.com/blog/the-client-brain",
  },
  openGraph: {
    type: "article",
    title:
      "The Client Brain: An LLM Wiki System Inspired by Andrej Karpathy",
    description:
      "74 nodes. 120 edges. One source of truth. Inside the wiki system we built to keep 18 Claude projects consistent for a single client.",
    url: "https://settlewithai.com/blog/the-client-brain",
    siteName: "Settle",
    publishedTime: "2026-04-09T00:00:00Z",
    authors: ["Pranav Ambwani"],
    images: [
      {
        url: "/og-image.png",
        width: 1519,
        height: 1090,
        alt: "The Client Brain: An LLM Wiki System Inspired by Andrej Karpathy — Settle",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "The Client Brain: An LLM Wiki System Inspired by Andrej Karpathy",
    description:
      "74 nodes. 120 edges. One source of truth. Inside the wiki system we built to keep 18 Claude projects consistent.",
  },
};

export default function Article() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "The Client Brain: An LLM Wiki System Inspired by Andrej Karpathy",
    description:
      "When you're running 18 Claude projects for one client, facts can't live in twelve places. We built a wiki that gives every project one source of truth — and tells us when something drifts.",
    datePublished: "2026-04-09T00:00:00Z",
    dateModified: "2026-04-09T00:00:00Z",
    image: "https://settlewithai.com/og-image.png",
    author: {
      "@type": "Person",
      name: "Pranav Ambwani",
      jobTitle: "Founder",
      url: "https://settlewithai.com",
      sameAs: ["https://www.linkedin.com/in/pranavambwani/"],
      description: "Founder of Settle, a full-stack AI agency for manufacturers and mid-market teams. USC Electrical Engineering. Based between Los Angeles and New Delhi. Deploys Claude AI for operations — structured rollouts, production-grade instructions, real results.",
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
        "https://settlewithai.com/blog/the-client-brain",
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
              { "@type": "ListItem", position: 3, name: "The Client Brain", item: "https://settlewithai.com/blog/the-client-brain" },
            ],
          }),
        }}
      />

      {/* Nav */}
      <Nav />

      <MagazineHeader
        category="Engineering"
        issue="No. 05"
        title="The Client Brain: An LLM Wiki System Inspired by Andrej Karpathy"
        deck="When you're running 18 Claude projects across 7 departments for one client, facts can't live in twelve places. We built a wiki that gives every project one source of truth — and tells us the moment something drifts."
        author="Pranav Ambwani"
        date="2026-04-09"
        readingTime="10 min read"
      />

      {/* Article */}
      <article className="max-w-[720px] mx-auto px-6 lg:px-10 pb-24 md:pb-36">
        {/* Body */}
        <div className="prose-settle">
          <p>
            Andrej Karpathy published a gist a while back about how LLMs
            process and retrieve information. The core idea is simple: an
            LLM&apos;s output quality is bounded by the quality of its
            context. Structure your context well and the model performs.
            Feed it a mess and you get a mess back, just faster.
          </p>
          <p>
            That idea has been rattling around my head for months, because
            it describes a problem I was living with every day.
          </p>

          <h2>The problem with twelve files</h2>
          <p>
            Orient is our first client. A 79-year-old B2B industrial
            printing manufacturer. We built them 18 Claude projects spanning
            seven departments: sales proposals, digital marketing, vendor
            procurement, financial operations, ERP development, recruitment,
            and servicing.
          </p>
          <p>
            Each of those projects has its own set of instruction files,
            guides, and skills. And each of those files needs to know
            things about Orient. The correct company name. The brand
            colour ratio. The tone for a collections email versus a cold
            outreach versus an internal HR memo. The exact tagline. The
            exact font.
          </p>
          <p>
            For a while, we handled this the obvious way: copy the relevant
            facts into each project&apos;s instruction files. The company
            name went into twelve documents. The brand system went into
            eight. The voice rules went into fourteen.
          </p>
          <p>
            Then Orient corrected their company name. It wasn&apos;t
            &ldquo;TPH Orient Group.&rdquo; It was &ldquo;The Printers
            House Orient.&rdquo; One correction. Twelve files to update.
            And the worst part: I only found eleven of them. The twelfth
            kept generating documents with the wrong name for two weeks
            before anyone noticed.
          </p>
          <p>
            That&apos;s when I stopped thinking of client knowledge as
            a pile of text files and started thinking of it as a data
            problem.
          </p>

          <h2>One fact, one home</h2>
          <p>
            The fix was a wiki. Not a Notion wiki or a Confluence space.
            A purpose-built markdown wiki with a strict rule: every fact
            about a client lives in exactly one file, and every other
            file that needs that fact points to the source rather than
            restating it.
          </p>
          <p>
            The company name lives in <code>identity.md</code>. The colour
            system lives in <code>brand-system.md</code>. Voice rules live
            in <code>tone-and-voice.md</code>. If you want to know something
            about Orient, there&apos;s one file to check.
          </p>
          <p>
            This is database thinking applied to LLM context. Normalisation.
            Single source of truth. Foreign keys instead of duplicated rows.
            The same principles that make a relational database reliable
            make an LLM knowledge base reliable, for exactly the same
            reasons.
          </p>

          <h2>Three layers</h2>
          <p>
            The wiki has three layers, and the direction of data flow
            between them matters.
          </p>
          <p>
            <strong>Layer 1: Sources.</strong> The messy real world. Brand
            guidelines in a PDF, pricing in a spreadsheet, corrections from
            a WhatsApp message, product specs from an internal doc. These
            get ingested into the wiki but are never served directly to
            a Claude project.
          </p>
          <p>
            <strong>Layer 2: The wiki.</strong> The canonical truth. Six
            fact pages for Orient: identity, brand system, tone and voice,
            products and machines, channels and integrations, and a project
            catalog. Every fact has one home. Every page has schema-versioned
            frontmatter: title, status, owner, last updated, source
            references, tags.
          </p>
          <p>
            <strong>Layer 3: Downstream files.</strong> The instruction
            files, guides, and skills that are actually loaded into Claude
            projects. These are generated from the wiki through a
            distillation process. They are not hand-written. When a wiki
            fact changes, the downstream files get regenerated to match.
          </p>
          <p>
            The flow is always one-directional. Sources feed the wiki.
            The wiki feeds downstream. Downstream never writes back to
            the wiki, and the wiki never serves raw source material. This
            is what keeps the system clean.
          </p>

          <h2>The prime directive</h2>
          <p>
            The wiki&apos;s convention file opens with a rule that governs
            every operation:
          </p>
          <blockquote>
            Do not infer. Do not summarise creatively. Quote source
            spans verbatim.
          </blockquote>
          <p>
            This is the difference between a wiki and a chatbot. The wiki
            doesn&apos;t interpret. It records. When a source says the
            company tagline is &ldquo;From Offset to Inkjet, books to
            labels and everything packaging,&rdquo; the wiki stores that
            exact string. Downstream files can paraphrase for their
            audience, but the wiki preserves ground truth.
          </p>
          <p>
            I can&apos;t overstate how much this matters. The moment you
            let an LLM paraphrase facts at the storage layer, you&apos;ve
            introduced drift at the source. Every downstream file inherits
            that drift, and now you&apos;re back to playing whack-a-mole
            with twelve documents that all say slightly different things.
          </p>

          <h2>Drift detection</h2>
          <p>
            The most valuable feature in the system is automated drift
            detection. Every project page in the wiki declares which fact
            pages it depends on. Orient&apos;s sales comms project, for
            example, depends on:
          </p>
          <ul>
            <li><code>tone-and-voice.md</code> for voice rules and email signatures</li>
            <li><code>brand-system.md</code> for presentation styling and Poppins typography</li>
            <li><code>identity.md</code> for the company name and heritage</li>
            <li><code>channels.md</code> for Apollo and M365 contracts</li>
            <li><code>products-and-machines.md</code> for machine names</li>
          </ul>
          <p>
            When <code>identity.md</code> gets updated &mdash; say, the
            company name correction from &ldquo;TPH Orient Group&rdquo;
            to &ldquo;The Printers House Orient&rdquo; &mdash; a single
            command scans every project that depends on identity and flags
            which downstream files now contain stale claims.
          </p>
          <p>
            No manual memory required. The system tells you exactly
            what&apos;s out of date and why. That company name correction
            that took me two weeks to fully propagate by hand? The wiki
            catches it in seconds.
          </p>

          <h2>Five commands, strict boundaries</h2>
          <p>
            Five purpose-built slash commands operate on the wiki:
          </p>
          <p>
            <strong><code>/ingest</code></strong> routes new source material
            into the wiki. A brand guideline PDF, a pricing correction from
            the client, a product spec from their internal docs. It writes
            to a staging directory, never directly to live pages.
          </p>
          <p>
            <strong><code>/distill</code></strong> regenerates a downstream
            file from wiki facts. When the wiki changes, this is how the
            change reaches the instruction files that Claude actually reads.
            Again, staging only.
          </p>
          <p>
            <strong><code>/distill-check</code></strong> is read-only. It
            compares a downstream file against the current wiki state and
            reports any drift. This is the command I run most often.
          </p>
          <p>
            <strong><code>/recap</code></strong> synthesises a focused brief
            from wiki pages on a specific topic. Useful when you need to
            quickly pull together everything the wiki knows about, say,
            Orient&apos;s digital printing lineup without reading six files.
            Output goes to stdout, nothing is written.
          </p>
          <p>
            <strong><code>/lint</code></strong> is a weekly health check.
            It scans for contradictions between pages, stale content that
            hasn&apos;t been reviewed, orphaned pages that nothing depends
            on, and missing cross-references.
          </p>
          <p>
            The critical design decision: mutating commands only write to
            staging. Nothing goes live without human review. The wiki
            enforces a &ldquo;propose, review, apply&rdquo; workflow. I
            could have automated the full loop, but the cost of a wrong
            fact propagating to 18 projects is high enough that the review
            step earns its keep.
          </p>

          <h2>The knowledge graph</h2>
          <p>
            To visualise how all these pieces connect, I built an interactive
            knowledge graph. It renders the entire system in the browser:
            the organisation at the centre, departments radiating outward,
            fact pages forming a ring of canonical truth, projects orbiting
            further out, and downstream instruction, guide, and skill files
            at the edges.
          </p>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/blog/client-brain-graph-overview.png"
            alt="The settle-client-brain knowledge graph showing The Printers House Orient at the centre with 74 nodes and 120 edges. Legend shows node types: Organization, Department, Fact Page, Project, Deferred, Instruction, Guide, and Skill. Filter toggles for Departments, Downstream, and Deferred visible in the top-right corner."
            width={1600}
            height={900}
            loading="lazy"
            className="rounded-xl border border-[rgba(20,20,19,0.1)] my-10"
          />

          <p>
            Animated particles flow along the edges showing the direction
            of data: facts flow from the wiki into projects, projects
            distill into instruction files. Hover over any node and the
            graph lights up only its direct connections. Everything else
            fades.
          </p>
          <p>
            This is the part that changed how I think about the problem.
            When you can see the graph, you can see the blast radius. Click
            on <code>identity.md</code> and you immediately see every
            project, every instruction file, every guide that would need
            to update if a fact in that page changed. The graph turns an
            abstract dependency problem into something spatial and obvious.
          </p>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/blog/client-brain-graph-detail.png"
            alt="Zoomed-in view of the knowledge graph showing The Printers House Orient at centre with labeled edges connecting to department nodes (Servicing, Accounts), downstream files (Email-Guide.md, Apollo-Guide.md, Offers-Guide.md, Tally-Guide.md, Production-Guide.md, IT-Setup-Guide.md, Asst-Guide.md), and project nodes (orient-brand.md, orient-docs.md, projects-catalog.md). 74 nodes, 120 edges."
            width={1600}
            height={900}
            loading="lazy"
            className="rounded-xl border border-[rgba(20,20,19,0.1)] my-10"
          />

          <h2>Multi-tenant from day one</h2>
          <p>
            The wiki is namespaced by client organisation. Orient is the
            first tenant. Their namespace contains six fact pages, 18
            project pages, and a sync tracker: a three-layer status board
            showing which projects are in sync with the wiki, which have
            been distilled, and which have been deployed to live Claude
            instances.
          </p>
          <p>
            When a second client onboards, they get their own namespace
            with the same structure. The shared infrastructure &mdash;
            schema, conventions, slash commands, templates &mdash; stays
            at the root. The per-client data is isolated. This is the same
            pattern you&apos;d use in any multi-tenant SaaS, applied to
            a knowledge management system.
          </p>
          <p>
            Orient&apos;s numbers: 74 nodes, 120 edges, six fact pages
            feeding 18 projects feeding dozens of downstream instruction
            files. For a company with seven departments and a decade of
            accumulated product knowledge, those numbers will grow. The
            wiki is built to handle that growth without the kind of
            inconsistency that made me build it in the first place.
          </p>

          <h2>The append-only log</h2>
          <p>
            Every change to the wiki gets a one-line entry in{" "}
            <code>log.md</code>: timestamp, actor, affected paths, and a
            summary. Seeds, ingestions, distillations, drift findings. The
            log is append-only. Nothing gets edited or deleted from it.
          </p>
          <p>
            This matters more than it sounds like it should. When a client
            asks &ldquo;why does my proposal generator use this phrasing?&rdquo;
            I can trace the answer backward: the instruction file was
            distilled from <code>tone-and-voice.md</code> on a specific
            date, which was last updated from a source PDF the client sent
            on another specific date. The full provenance chain is there
            in the log.
          </p>
          <p>
            It also catches a subtle class of problems. If someone runs{" "}
            <code>/ingest</code> on the same source document twice by
            mistake, the log shows it. If a distillation didn&apos;t
            propagate a change, the log shows that too. An audit trail
            isn&apos;t glamorous, but when you&apos;re managing knowledge
            for someone else&apos;s business, accountability is the
            foundation everything else rests on.
          </p>

          <h2>Why this matters</h2>
          <p>
            For a company like Orient with 18 Claude projects spanning
            seven departments, the cost of inconsistency is enormous. One
            project saying the company is &ldquo;TPH Orient Group&rdquo;
            while another says &ldquo;The Printers House Orient&rdquo;
            erodes trust. One project using Montserrat while the brand
            system mandates Poppins creates visual dissonance. These aren&apos;t
            hypothetical examples. Both happened before the wiki existed.
          </p>
          <p>
            The wiki eliminates this class of error entirely. Not by being
            careful, but by making it structurally impossible. Facts have
            one home. Downstream files are generated, not hand-written.
            Drift is detected automatically. The system doesn&apos;t rely
            on human memory. It enforces consistency through architecture.
          </p>
          <p>
            That&apos;s what Karpathy&apos;s insight looks like when you
            apply it to a consulting practice. Treat client knowledge as
            a first-class data system &mdash; not as a pile of text
            files &mdash; and the quality of everything downstream
            improves automatically. The bottleneck was never the model.
            It was the instructions.
          </p>
          <p>
            74 nodes. 120 edges. One source of truth.{" "}
            <a
              href="/#contact"
              className="text-accent font-medium hover:underline"
            >
              Start a conversation &rarr;
            </a>
          </p>

        </div>

        <MagazineOutro
          author="Pranav Ambwani"
          related={[
            {
              category: "Playbook",
              title: "Structuring Claude for Business",
              description:
                "Skills, MCP, and the instruction architecture that actually scales across departments.",
              href: "/blog/structuring-claude-for-business",
            },
            {
              category: "Case Study",
              title: "Orient Case Study",
              description:
                "49 use cases mapped. 18 projects structured. 11 deployed. 85% faster document generation.",
              href: "/blog/orient-case-study",
            },
          ]}
        />
      </article>

      <Footer />
    </>
  );
}

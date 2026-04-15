import type { Metadata } from "next";
import { Planner } from "./planner";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ToolProse } from "@/components/tools/ToolProse";

const SITE_URL = "https://settlewithai.com";

export const metadata: Metadata = {
  title:
    "Claude AI Project Planner — Design Your First AI Project in 5 Minutes",
  description:
    "Use this guided wizard to plan your first Claude AI Project. Define the workflow, knowledge files, safety rules, and get a ready-to-build blueprint with complexity rating and setup estimate.",
  keywords: [
    "claude ai project template",
    "ai project planning",
    "claude project setup",
    "ai deployment plan",
    "first ai project",
  ],
  alternates: {
    canonical: `${SITE_URL}/tools/claude-project-planner`,
  },
  openGraph: {
    type: "website",
    title: "Claude AI Project Planner | Settle",
    description:
      "Design your first Claude AI project in 5 minutes. Guided wizard with blueprint output.",
    url: `${SITE_URL}/tools/claude-project-planner`,
    siteName: "Settle",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claude AI Project Planner | Settle",
    description:
      "Design your first Claude AI project in 5 minutes. Guided wizard with blueprint output.",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a Claude AI Project?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Claude AI Project is a persistent workspace in Anthropic's Claude AI that bundles custom instructions, knowledge files, and safety rules together. Instead of re-explaining context every conversation, the project remembers your setup — so Claude AI produces consistent, on-brand output every time.",
      },
    },
    {
      "@type": "Question",
      name: "How many Claude AI Projects does a typical company need?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Settle typically maps 15 to 49 use cases per company during a discovery engagement. Each distinct workflow — proposal generation, customer email drafts, compliance checks — becomes its own project with tailored instructions and knowledge files.",
      },
    },
    {
      "@type": "Question",
      name: "What knowledge files should I upload to a Claude AI Project?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Upload any reference material Claude AI needs to produce accurate output: company policies, product catalogs, pricing sheets, SOPs, templates, and style guides. The planner helps you identify which files your specific workflow requires.",
      },
    },
    {
      "@type": "Question",
      name: "Can Settle build these projects for my team?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Settle's core service is mapping your workflows, building Claude AI Projects with proper instructions and knowledge files, and training your team to use them. The planner gives you a preview of what one project looks like — Settle builds the full system.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Claude AI Project Planner",
      item: `${SITE_URL}/tools/claude-project-planner`,
    },
  ],
};

export default function ClaudeProjectPlannerPage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <Nav />
      <main className="max-w-[720px] mx-auto px-6 lg:px-10 pt-32 pb-24 md:pt-40 md:pb-36">
        <Breadcrumbs
          items={[
            { label: "Tools", href: "/tools/ai-readiness" },
            {
              label: "Claude AI Project Planner",
              href: "/tools/claude-project-planner",
            },
          ]}
        />

        <header className="mb-12">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.1em] text-accent mb-4">
            Free Tool
          </span>
          <h1 className="text-[clamp(1.8rem,4vw,2.8rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-text mb-4 font-heading">
            Claude AI Project Planner
          </h1>
          <p className="text-text-muted text-[1.05rem] leading-relaxed">
            Design your first Claude AI Project in about 5 minutes. Answer a few
            questions about your workflow and get a ready-to-build blueprint
            with instructions, knowledge file list, and complexity estimate.
          </p>
        </header>

        <ToolProse title="Why one-off prompting fails for business workflows">
          <p>
            Most teams start their AI journey with open-ended chat — type a
            question, get an answer, copy the output somewhere, move on. It
            works fine for ad-hoc curiosity, but it collapses the moment a
            workflow repeats. The second time you need to generate the same
            kind of output, you&rsquo;re re-explaining the context, re-pasting
            the same templates, re-correcting the same errors. Every session
            is from scratch.
          </p>
          <p>
            A Claude AI Project changes the pattern. It&rsquo;s a persistent
            workspace with instructions, knowledge files, and safety rules
            that stay in place across every conversation. Once engineered,
            the project produces consistent output regardless of who on your
            team triggers it, because the context is in the project — not
            in the person using it. That consistency is the unlock. It&rsquo;s
            also what distinguishes &ldquo;using AI&rdquo; from
            &ldquo;deploying AI.&rdquo;
          </p>
          <p>
            This planner walks you through designing one. You&rsquo;ll
            describe a specific workflow, define what Claude needs to know
            to execute it reliably, and set the boundaries for what it
            should and shouldn&rsquo;t do. The output is a blueprint — a
            starting spec for a real project you can build in your
            Anthropic workspace.
          </p>
        </ToolProse>

        <Planner />

        <ToolProse title="From blueprint to deployed project">
          <p>
            Building the project in Claude is the easy part. Getting it to
            reliably produce the output your team trusts takes four steps
            that most first-time builders underweight.
          </p>
          <p>
            <strong>1. Curate knowledge files aggressively.</strong> The
            single biggest lever on output quality is what you put in the
            knowledge base. More isn&rsquo;t better. Specific, curated,
            authoritative reference material beats large dumps of vaguely
            relevant documentation every time. If a file contradicts
            another file in your knowledge base, Claude will occasionally
            pick the wrong one.
          </p>
          <p>
            <strong>2. Write instructions for the junior case, not the
            obvious case.</strong> Your instructions should specify what to
            do when the input is ambiguous or incomplete, not just what to
            do when everything is ideal. That&rsquo;s where projects fail in
            production, and it&rsquo;s where generic prompts also fail.
          </p>
          <p>
            <strong>3. Build review gates into the workflow.</strong> The
            human reviewing the output needs to know what to check, not
            just read the full output. Flag fields, confidence scores, or
            source citations all work — the point is that review time
            becomes bounded and focused.
          </p>
          <p>
            <strong>4. Iterate on real output, not imagined output.</strong>
            Ship the project to one user, watch them use it on real work
            for two weeks, then fix the gaps you find. Three or four
            iterations usually land you at the quality bar where the
            project stops being &ldquo;helpful&rdquo; and becomes
            &ldquo;trusted.&rdquo;
          </p>
        </ToolProse>

        <section className="mt-20">
          <h2 className="text-xl font-semibold tracking-[-0.02em] text-text mb-6 font-heading">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "What is a Claude AI Project?",
                a: "A persistent workspace in Anthropic's Claude AI that bundles custom instructions, knowledge files, and safety rules. Instead of re-explaining context every conversation, the project remembers your setup for consistent output.",
              },
              {
                q: "How many projects does a typical company need?",
                a: "Settle typically maps 15 to 49 use cases per company. Each distinct workflow — proposal generation, email drafts, compliance checks — becomes its own project with tailored instructions and knowledge files.",
              },
              {
                q: "What knowledge files should I upload?",
                a: "Any reference material Claude AI needs for accurate output: company policies, product catalogs, pricing sheets, SOPs, templates, and style guides. This planner helps you identify which files your workflow requires.",
              },
              {
                q: "Can Settle build these projects for my team?",
                a: "Yes. Settle maps your workflows, builds Claude AI Projects with proper instructions and knowledge files, and trains your team. This planner previews one project — Settle builds the full system.",
              },
            ].map((faq) => (
              <details
                key={faq.q}
                className="group border border-border-light rounded-lg"
              >
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-[0.95rem] font-medium text-text">
                  {faq.q}
                  <svg
                    className="w-4 h-4 text-text-faint shrink-0 ml-4 transition-transform duration-200 group-open:rotate-45"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </summary>
                <div className="px-5 pb-4 text-text-muted text-[0.9375rem] leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

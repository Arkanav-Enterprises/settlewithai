import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on deploying Claude AI in manufacturing, mid-market companies, and traditional businesses. Case studies, guides, and deployment strategies.",
  alternates: {
    canonical: "https://settlewithai.com/blog",
  },
  openGraph: {
    title: "Blog — Settle",
    description:
      "Insights on deploying Claude AI in manufacturing, mid-market companies, and traditional businesses.",
    url: "https://settlewithai.com/blog",
  },
};

const posts = [
  {
    slug: "claude-best-invention-2026",
    title:
      "Why Claude Is the Best Invention of the 21st Century (And Why 2026 Changes Everything)",
    description:
      "The iPhone redefined how we interact with information. Claude is redefining how we think. Here's why 2026 is the year AI stops being a tool and starts being a partner.",
    date: "2026-04-03",
    tag: "Opinion",
  },
  {
    slug: "why-claude-over-custom-ai",
    title:
      "Why Your Enterprise Doesn't Need a Custom AI Model — It Needs Claude",
    description:
      "Most companies think they need fine-tuned models or custom LLMs. After deploying Claude across 49 use cases, I've found that 95% of enterprise workflows work better with structured Claude than with any custom solution.",
    date: "2026-04-02",
    tag: "Strategy",
  },
  {
    slug: "structuring-claude-for-business",
    title:
      "How to Structure Claude for Your Business: Skills, MCP, and the Instruction Architecture That Actually Scales",
    description:
      "Most companies dump everything into one Claude project and wonder why results are inconsistent. Here's the layered architecture that works at scale.",
    date: "2026-04-02",
    tag: "Guide",
  },
  {
    slug: "claude-agent-mode-business-automation",
    title:
      "Claude's Agent Mode Is Here — What It Means for Business Automation",
    description:
      "Claude isn't just a chatbot anymore. With agent teams, tool use, MCP connectors, and computer use, it can now execute multi-step business workflows autonomously.",
    date: "2026-04-02",
    tag: "Guide",
  },
  {
    slug: "built-with-claude-code",
    title:
      "How We Built This Entire Site with Claude Code",
    description:
      "Every component — the WebGL globe, D3 mindmap, Cowork demo, SEO infrastructure — was built in Claude Code sessions. Here's how a CLI coding tool shipped a full Next.js site.",
    date: "2026-03-30",
    tag: "Engineering",
  },
  {
    slug: "claude-team-deployment-beyond-diy",
    title:
      "Beyond the 7-Day Playbook: Deploying Claude AI Across a Real Organization",
    description:
      "Ruben Hassid's Claude team setup guide is great for small teams. Here's what changes when you deploy across 7 departments at a 200-person manufacturer.",
    date: "2026-03-30",
    tag: "Deployment",
  },
  {
    slug: "orient-case-study",
    title:
      "How a 79-Year-Old Manufacturer Deployed AI Across 7 Departments in 6 Months",
    description:
      "Orient Printing & Packaging mapped 49 AI use cases, structured 18 projects, and deployed 11 in the first engagement.",
    date: "2026-03-27",
    tag: "Case Study",
  },
  {
    slug: "mcp-explained-for-business",
    title:
      "MCP Explained: How to Connect Your ERP, CRM, and Internal Systems to Claude",
    description:
      "Model Context Protocol lets Claude read and write to your business systems. Here's what it is and how any company can build one.",
    date: "2026-03-29",
    tag: "Guide",
  },
  {
    slug: "integrating-ai-into-your-company",
    title: "How to Actually Integrate AI Into Your Company",
    description:
      "Most AI adoption stalls at the demo. Here's a structured, phase-by-phase approach to deploying AI across your team's real workflows.",
    date: "2026-03-27",
    tag: "Guide",
  },
  {
    slug: "ai-powered-outreach-with-cowork",
    title:
      "We Used Claude Cowork to Prospect 12 Companies and Draft 48 Emails in One Session",
    description:
      "How we used Claude's Cowork feature to research prospects, personalise outreach, and build a 3-week send calendar.",
    date: "2026-03-29",
    tag: "Workflow",
  },
];

export default function BlogIndex() {
  return (
    <main className="min-h-screen">
      <div className="max-w-[860px] mx-auto px-6 lg:px-10 pt-24 md:pt-36 pb-24 md:pb-36">
        <h1
          className="text-[clamp(2.2rem,4.5vw,3.5rem)] font-medium leading-[1.08] mb-20"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Blog
        </h1>

        <div>
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`group block py-10 ${
                i > 0 ? "border-t border-border-light" : ""
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-accent">
                  {post.tag}
                </span>
                <span className="text-text-faint text-[13px]">
                  {new Date(post.date + "T00:00:00").toLocaleDateString(
                    "en-US",
                    {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }
                  )}
                </span>
              </div>
              <h2
                className="text-[clamp(1.25rem,2.2vw,1.65rem)] font-medium leading-[1.3] mb-3 group-hover:text-accent transition-colors duration-200"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {post.title}
              </h2>
              <p className="text-text-muted text-[15px] leading-[1.7] max-w-2xl">
                {post.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

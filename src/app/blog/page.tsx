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
          style={{ fontFamily: "Sentient, Georgia, serif" }}
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
                style={{ fontFamily: "Sentient, Georgia, serif" }}
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

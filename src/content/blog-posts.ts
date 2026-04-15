export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tag: string;
  priority?: number;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "settle-marketplace-launch",
    title: "Settle Marketplace: The Agents We Built for Clients, Now for Sale",
    description:
      "Six production-tested AI agents from real enterprise deployments. Pre-paid credits, no subscriptions, ninety seconds from email verification to a running agent.",
    date: "2026-04-14",
    tag: "Product",
  },
  {
    slug: "claude-printing-press",
    title: "We're Teaching AI to Run a Printing Press",
    description:
      "One of the first production deployments of AI controlling physical industrial machinery. Not a chatbot. Not a copilot. An agent that starts, stops, and tunes a digital printing press through natural language.",
    date: "2026-04-13",
    tag: "Case Study",
  },
  {
    slug: "the-ai-gap",
    title: "The AI You Dismissed Isn't the AI That's Here Now",
    description:
      "Most people tried ChatGPT once and formed an opinion. Meanwhile, frontier models like Claude are restructuring entire business workflows. The gap between perception and reality is growing fast.",
    date: "2026-04-10",
    tag: "Perspective",
  },
  {
    slug: "ai-chat-on-your-website",
    title: "We Added a Custom AI Chat to Our Website in One Afternoon",
    description:
      "Every business has the same FAQ problem. Visitors have questions, the answers exist, but nobody reads a FAQ page. We built an AI that answers them live — and we can do it for any business.",
    date: "2026-04-10",
    tag: "Product",
  },
  {
    slug: "the-client-brain",
    title: "The Client Brain: An LLM Wiki System Inspired by Andrej Karpathy",
    description:
      "When you're running 18 Claude projects for one client, facts can't live in twelve places. We built a wiki that gives every project one source of truth — and tells us when something drifts.",
    date: "2026-04-09",
    tag: "Engineering",
  },
  {
    slug: "the-handover-plan",
    title: "The Handover Plan: Anatomy of an AI Rollout Working Session",
    description:
      "Every Settle Claude rollout ends with a single-page document. Eight rows, four modes, a progress bar at the bottom, and one line at the top that does more work than the rest of the page combined.",
    date: "2026-04-08",
    tag: "Deployment",
  },
  {
    slug: "orient-product-experience",
    title: "How We Engineered an AI Product Expert for The Printers House Orient",
    description:
      "Orient had decades of product knowledge locked in internal docs. We turned it into a public specs section and an AI chat widget — all from the same source of truth.",
    date: "2026-04-07",
    tag: "Case Study",
  },
  {
    slug: "erp-crm-claude-connectors-2026",
    title: "Which ERPs and CRMs Best Connect with Claude in 2026?",
    description:
      "HubSpot, Salesforce, NetSuite, Sage Intacct, and more. A practical breakdown of every ERP and CRM that connects to Claude via native connectors, MCP servers, and middleware.",
    date: "2026-04-04",
    tag: "Guide",
  },
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
    title: "How We Built This Entire Site with Claude Code",
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
    slug: "mcp-explained-for-business",
    title:
      "MCP Explained: How to Connect Your ERP, CRM, and Internal Systems to Claude",
    description:
      "Model Context Protocol lets Claude read and write to your business systems. Here's what it is and how any company can build one.",
    date: "2026-03-29",
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
  {
    slug: "orient-case-study",
    title:
      "How a 79-Year-Old Manufacturer Deployed AI Across 7 Departments in 6 Months",
    description:
      "Orient Printing & Packaging mapped 49 AI use cases, structured 18 projects, and deployed 11 in the first engagement.",
    date: "2026-03-27",
    tag: "Case Study",
    priority: 0.9,
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
    slug: "orient-old-vs-new-site",
    title: "Orient's Old Site vs the New One: A Side-by-Side Walkthrough",
    description:
      "We rebuilt The Printers House Orient's website from a one-screen brochure into an AI-powered product experience. Here's the side-by-side, screenshot for screenshot.",
    date: "2026-03-26",
    tag: "Case Study",
  },
];

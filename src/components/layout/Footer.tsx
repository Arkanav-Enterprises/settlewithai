const COMPARE_LINKS = [
  { label: "Settle vs DIY", href: "/compare/diy" },
  { label: "Settle vs Big Consulting", href: "/compare/big-consulting" },
  { label: "Settle vs Freelancers", href: "/compare/freelance-consultants" },
  { label: "Settle vs ChatGPT", href: "/compare/chatgpt-generic-ai" },
  { label: "Settle vs Offshore Dev", href: "/compare/offshore-development" },
  { label: "Settle vs Internal IT", href: "/compare/internal-it-team" },
];

const INDUSTRY_LINKS = [
  { label: "Manufacturing", href: "/ai-consulting-for/manufacturing" },
  { label: "Healthcare", href: "/ai-consulting-for/healthcare" },
  { label: "Legal", href: "/ai-consulting-for/legal" },
  { label: "Finance", href: "/ai-consulting-for/finance-accounting" },
  { label: "Real Estate", href: "/ai-consulting-for/real-estate" },
  { label: "Professional Services", href: "/ai-consulting-for/professional-services" },
  { label: "Logistics", href: "/ai-consulting-for/logistics-supply-chain" },
  { label: "Education", href: "/ai-consulting-for/education" },
  { label: "Retail", href: "/ai-consulting-for/retail-ecommerce" },
  { label: "Construction", href: "/ai-consulting-for/construction" },
];

const BLOG_LINKS = [
  { label: "Orient Case Study", href: "/blog/orient-case-study" },
  { label: "Deploying Claude for Teams", href: "/blog/claude-team-deployment-beyond-diy" },
  { label: "MCP Explained for Business", href: "/blog/mcp-explained-for-business" },
  { label: "Integrating AI Into Your Company", href: "/blog/integrating-ai-into-your-company" },
  { label: "AI-Powered Outreach with Cowork", href: "/blog/ai-powered-outreach-with-cowork" },
  { label: "Built with Claude Code", href: "/blog/built-with-claude-code" },
  { label: "Claude's Agent Mode", href: "/blog/claude-agent-mode-business-automation" },
];

const TOOL_LINKS = [
  { label: "AI Readiness Assessment", href: "/tools/ai-readiness" },
  { label: "AI ROI Calculator", href: "/tools/ai-roi-calculator" },
  { label: "Use Case Finder", href: "/tools/use-case-finder" },
  { label: "Workflow Automation Quiz", href: "/tools/workflow-automation-quiz" },
  { label: "AI vs Manual Calculator", href: "/tools/ai-vs-manual-calculator" },
  { label: "Claude Project Planner", href: "/tools/claude-project-planner" },
];

const COMPANY_LINKS = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Get Started", href: "/#contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
];

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3
        className="text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-text mb-4"
        style={{ fontFamily: "Sentient, Georgia, serif" }}
      >
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="text-[0.875rem] text-text-muted hover:text-accent transition-colors duration-200"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border-light">
      {/* Link columns */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-12 lg:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6">
          <FooterColumn title="Company" links={COMPANY_LINKS} />
          <FooterColumn title="Free Tools" links={TOOL_LINKS} />
          <FooterColumn title="Compare" links={COMPARE_LINKS} />
          <FooterColumn title="Industries" links={INDUSTRY_LINKS.slice(0, 5)} />
          <FooterColumn title="More Industries" links={INDUSTRY_LINKS.slice(5)} />
          <FooterColumn title="Blog" links={BLOG_LINKS} />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border-light">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 min-h-16 py-4 sm:py-0 sm:h-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
          <span
            className="text-[0.95rem] font-medium tracking-[-0.03em] text-text"
            style={{ fontFamily: "Sentient, Georgia, serif" }}
          >
            SETTLE
          </span>
          <span className="text-text-faint text-sm">
            AI, thoughtfully deployed. Built on Claude by Anthropic.
          </span>
        </div>
      </div>
    </footer>
  );
}

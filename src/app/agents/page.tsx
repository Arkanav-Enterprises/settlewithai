import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { AGENTS } from "@/content/agents";

const SITE_URL = "https://settlewithai.com";

export const metadata: Metadata = {
  title: "Settle Marketplace — Production AI Agents for Mid-Market Businesses",
  description:
    "Six production-tested AI agents from real enterprise deployments — Offer Generator, MIS Reporter, Support Desk, Recruitment Hunter, Service Report Writer, BOM Generator. Pre-paid credits, no subscriptions.",
  keywords: [
    "AI agents marketplace",
    "Claude AI agents",
    "enterprise AI agents",
    "AI automation agents",
    "production AI agents",
    "Settle Marketplace",
  ],
  alternates: { canonical: `${SITE_URL}/agents` },
  openGraph: {
    type: "website",
    title: "Settle Marketplace — Production AI Agents",
    description:
      "Six production-tested AI agents from real enterprise deployments. Pre-paid credits, 90 seconds from sign-up to a running agent.",
    url: `${SITE_URL}/agents`,
    siteName: "Settle",
  },
};

export default function AgentsIndexPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/agents#list`,
    name: "Settle Marketplace Agents",
    description:
      "Production-grade Claude AI agents deployed across sales, operations, customer support, HR, field service, and procurement.",
    numberOfItems: AGENTS.length,
    itemListElement: AGENTS.map((agent, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/agents/${agent.slug}`,
      name: agent.name,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Agents", item: `${SITE_URL}/agents` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Nav />

      <main className="max-w-[1040px] mx-auto px-6 lg:px-10 pt-32 pb-24 md:pt-40 md:pb-36">
        {/* Header */}
        <header className="mb-16 max-w-[720px]">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.14em] text-accent mb-4">
            Settle Marketplace
          </span>
          <h1
            className="text-[clamp(2.2rem,4.4vw,3.2rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-text mb-5"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Production AI agents, not demos.
          </h1>
          <p className="text-[17px] leading-[1.65] text-text-muted mb-4">
            Six agents that started life inside real Settle client deployments —
            packaged, priced, and available as a service. Pre-paid credits. No
            subscriptions. Ninety seconds from verification to a running agent.
          </p>
          <p className="text-[14.5px] leading-[1.65] text-text-faint">
            Every agent is built on Anthropic&apos;s Claude AI with the same
            production-grade instruction engineering Settle uses for
            custom engagements — versioned instructions, knowledge files, safety
            rules, and review gates.
          </p>
        </header>

        {/* Agent grid */}
        <section className="grid md:grid-cols-2 gap-6">
          {AGENTS.map((agent) => (
            <Link
              key={agent.slug}
              href={`/agents/${agent.slug}`}
              className="group block p-7 rounded-xl border border-[rgba(20,20,19,0.08)] hover:border-accent/40 transition-colors"
            >
              <div className="text-[10px] uppercase tracking-[0.14em] text-text-faint mb-3 font-semibold">
                {agent.category}
              </div>
              <h2
                className="text-[1.35rem] font-semibold tracking-[-0.02em] text-text group-hover:text-accent transition-colors mb-3"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {agent.name}
              </h2>
              <p className="text-[14.5px] leading-[1.6] text-text-muted mb-5">
                {agent.tagline}
              </p>
              <div className="flex items-center gap-4 text-[12px] text-text-faint">
                <span>
                  <span className="text-accent font-semibold">
                    {agent.pricing.estimatedUsdPerRun}
                  </span>{" "}
                  per run
                </span>
                <span aria-hidden="true">·</span>
                <span>Deploys in {agent.deploymentTime}</span>
              </div>
              {agent.provenAt && (
                <div className="mt-4 pt-4 border-t border-[rgba(20,20,19,0.06)] text-[12px] text-text-faint">
                  <span className="font-semibold text-accent">Proven at:</span>{" "}
                  {agent.provenAt}
                </div>
              )}
            </Link>
          ))}
        </section>

        {/* Bottom CTA */}
        <section className="mt-20 py-14 bg-accent rounded-2xl text-center px-6">
          <h2
            className="text-[clamp(1.4rem,3vw,2rem)] font-semibold leading-tight tracking-[-0.02em] text-white mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Not seeing the agent you need?
          </h2>
          <p className="text-white/80 text-[1rem] mb-6 max-w-lg mx-auto">
            Every marketplace agent started as a custom Settle deployment. Tell
            us what workflow is eating your team&apos;s time — we&apos;ll scope
            a 2–3 week first build.
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 bg-white text-accent font-medium text-[0.95rem] px-6 py-3 rounded-full hover:bg-white/90 transition-colors"
          >
            Start a conversation
            <span aria-hidden="true">→</span>
          </a>
        </section>
      </main>

      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { AGENTS, getAgentBySlug, getAllAgentSlugs } from "@/content/agents";

const SITE_URL = "https://settlewithai.com";

export async function generateStaticParams() {
  return getAllAgentSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const agent = getAgentBySlug(slug);
  if (!agent) return {};

  const url = `${SITE_URL}/agents/${agent.slug}`;
  const title = `${agent.name} — ${agent.tagline}`;
  return {
    title,
    description: agent.heroDescription,
    keywords: agent.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title: `${agent.name} | Settle Marketplace`,
      description: agent.heroDescription,
      url,
      siteName: "Settle",
    },
    twitter: {
      card: "summary_large_image",
      title: `${agent.name} | Settle Marketplace`,
      description: agent.tagline,
    },
  };
}

export default async function AgentPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const agent = getAgentBySlug(slug);
  if (!agent) notFound();

  const url = `${SITE_URL}/agents/${agent.slug}`;
  const orgId = `${SITE_URL}/#organization`;

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${url}#software`,
    name: `${agent.name} — Settle Marketplace`,
    alternateName: agent.name,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: agent.category,
    operatingSystem: "Web-based (any browser); integrations via Claude, Slack, Teams, email",
    description: agent.heroDescription,
    url,
    provider: { "@id": orgId },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: agent.pricing.estimatedUsdPerRun,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        priceType: "https://schema.org/ListPrice",
        unitText: "per run",
        description: agent.pricing.billing,
      },
      availability: "https://schema.org/InStock",
    },
    featureList: [
      ...agent.outputs,
      `Typical time saved: ${agent.timeSavedPerRun}`,
      `Deployment time: ${agent.deploymentTime}`,
    ],
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Mid-market companies (50–500 employees), manufacturers, professional services",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: agent.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Agents", item: `${SITE_URL}/agents` },
      { "@type": "ListItem", position: 3, name: agent.name, item: url },
    ],
  };

  const relatedAgents = AGENTS.filter((a) => a.slug !== agent.slug).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Nav />

      <article className="max-w-[860px] mx-auto px-6 lg:px-10 pt-32 pb-24 md:pt-40 md:pb-36">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="text-[12px] text-text-faint mb-10 flex items-center gap-2"
        >
          <Link href="/" className="hover:text-accent transition-colors">
            Home
          </Link>
          <span aria-hidden="true">›</span>
          <Link href="/agents" className="hover:text-accent transition-colors">
            Agents
          </Link>
          <span aria-hidden="true">›</span>
          <span className="text-text">{agent.name}</span>
        </nav>

        {/* Header */}
        <header className="mb-14">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.14em] text-accent mb-4">
            {agent.category}
          </span>
          <h1
            className="text-[clamp(2rem,4.2vw,3rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-text mb-5"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {agent.name}
          </h1>
          <p
            className="text-[clamp(1.1rem,1.5vw,1.25rem)] leading-[1.5] text-text-muted mb-8 max-w-[640px]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {agent.tagline}
          </p>

          {/* Passage-citable definitional paragraph */}
          <p className="agent-definition text-[15.5px] leading-[1.7] text-text mb-10">
            {agent.heroDescription}
          </p>

          {/* At-a-glance stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-xl border border-[rgba(20,20,19,0.08)] bg-[rgba(20,20,19,0.02)]">
            <Stat label="Time saved" value={agent.timeSavedPerRun} />
            <Stat label="Deployment" value={agent.deploymentTime} />
            <Stat label="Cost per run" value={agent.pricing.estimatedUsdPerRun} />
            <Stat label="Department" value={agent.department} />
          </div>

          {agent.provenAt && (
            <p className="mt-6 text-[13px] text-text-faint">
              <span className="font-semibold text-accent">Proven at:</span>{" "}
              {agent.provenAt}
            </p>
          )}
        </header>

        {/* Longform description */}
        <section className="mb-16">
          <h2
            className="text-[clamp(1.3rem,2vw,1.7rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-text mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            What it does
          </h2>
          <p className="text-[15.5px] leading-[1.75] text-text-muted">
            {agent.longDescription}
          </p>
        </section>

        {/* Inputs / Outputs */}
        <section className="mb-16 grid md:grid-cols-2 gap-10">
          <div>
            <h2
              className="text-[1.1rem] font-semibold tracking-[-0.02em] text-text mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Inputs
            </h2>
            <ul className="space-y-2.5">
              {agent.inputs.map((input) => (
                <li
                  key={input}
                  className="text-[14.5px] leading-[1.55] text-text-muted pl-4 relative before:content-['→'] before:absolute before:left-0 before:text-accent before:text-[13px]"
                >
                  {input}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2
              className="text-[1.1rem] font-semibold tracking-[-0.02em] text-text mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Outputs
            </h2>
            <ul className="space-y-2.5">
              {agent.outputs.map((output) => (
                <li
                  key={output}
                  className="text-[14.5px] leading-[1.55] text-text-muted pl-4 relative before:content-['✓'] before:absolute before:left-0 before:text-accent before:text-[13px]"
                >
                  {output}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Use cases */}
        <section className="mb-16">
          <h2
            className="text-[clamp(1.3rem,2vw,1.7rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-text mb-8"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Where it fits
          </h2>
          <div className="space-y-6">
            {agent.useCases.map((uc) => (
              <div
                key={uc.title}
                className="border-l-2 border-accent/40 pl-5 py-1"
              >
                <h3
                  className="text-[1.02rem] font-semibold text-text mb-1.5"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {uc.title}
                </h3>
                <p className="text-[14.5px] leading-[1.65] text-text-muted">
                  {uc.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Sample run */}
        <section className="mb-16">
          <h2
            className="text-[clamp(1.3rem,2vw,1.7rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-text mb-8"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            A sample run
          </h2>
          <div className="rounded-xl border border-[rgba(20,20,19,0.08)] overflow-hidden">
            <div className="p-5 border-b border-[rgba(20,20,19,0.06)] bg-[rgba(20,20,19,0.02)]">
              <div className="text-[10px] uppercase tracking-[0.14em] text-text-faint mb-2 font-semibold">
                Input
              </div>
              <p className="text-[14px] leading-[1.6] text-text-muted font-mono">
                {agent.sampleRun.input}
              </p>
            </div>
            <div className="p-5">
              <div className="text-[10px] uppercase tracking-[0.14em] text-accent mb-2 font-semibold">
                Output
              </div>
              <p className="text-[14px] leading-[1.65] text-text">
                {agent.sampleRun.output}
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-16">
          <h2
            className="text-[clamp(1.3rem,2vw,1.7rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-text mb-8"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Common questions
          </h2>
          <div className="space-y-6">
            {agent.faqs.map((f) => (
              <div
                key={f.question}
                className="pb-6 border-b border-[rgba(20,20,19,0.06)] last:border-b-0"
              >
                <h3
                  className="text-[1rem] font-semibold text-text mb-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {f.question}
                </h3>
                <p className="text-[14.5px] leading-[1.7] text-text-muted">
                  {f.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 lg:-mx-10 lg:px-10 py-14 bg-accent rounded-2xl text-center">
          <h2
            className="text-[clamp(1.4rem,3vw,2rem)] font-semibold leading-tight tracking-[-0.02em] text-white mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Deploy {agent.name} for your team
          </h2>
          <p className="text-white/80 text-[1rem] mb-6 max-w-md mx-auto">
            Book a 15-minute discovery call and we&apos;ll map how {agent.name}{" "}
            fits your specific workflows.
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 bg-white text-accent font-medium text-[0.95rem] px-6 py-3 rounded-full hover:bg-white/90 transition-colors"
          >
            Get started
            <span aria-hidden="true">→</span>
          </a>
        </section>

        {/* Related agents */}
        <section className="mt-20">
          <h2
            className="text-[1.1rem] font-semibold tracking-[-0.02em] text-text mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Other agents in the Settle Marketplace
          </h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {relatedAgents.map((a) => (
              <Link
                key={a.slug}
                href={`/agents/${a.slug}`}
                className="group block p-5 rounded-xl border border-[rgba(20,20,19,0.08)] hover:border-accent/40 transition-colors"
              >
                <div className="text-[10px] uppercase tracking-[0.14em] text-text-faint mb-2">
                  {a.category}
                </div>
                <h3 className="text-[1rem] font-semibold text-text group-hover:text-accent transition-colors mb-2">
                  {a.name}
                </h3>
                <p className="text-[13.5px] text-text-muted line-clamp-2 leading-[1.5]">
                  {a.tagline}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </article>

      <Footer />
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.14em] text-text-faint mb-1.5 font-semibold">
        {label}
      </div>
      <div
        className="text-[14px] font-semibold text-text leading-[1.3]"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {value}
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllContent } from "@/lib/content";

const SITE_URL = "https://settlewithai.com";

export const metadata: Metadata = {
  title: "AI Consulting by Industry — Claude AI Deployment for Mid-Market Companies",
  description:
    "Settle AI deploys Claude AI across thirteen industries — manufacturing, healthcare, legal, finance, logistics, real estate, professional services, construction, education, retail, SaaS, hospitality, and nonprofit. Production-grade agents, not strategy decks.",
  keywords: [
    "AI consulting",
    "industry AI consulting",
    "Claude AI deployment",
    "AI for business",
    "enterprise AI consulting",
    "vertical AI",
  ],
  alternates: { canonical: `${SITE_URL}/ai-consulting` },
  openGraph: {
    type: "website",
    title: "AI Consulting by Industry | Settle AI",
    description:
      "Claude AI deployment across thirteen industries. Discovery, instruction engineering, agent deployment, and ongoing optimization.",
    url: `${SITE_URL}/ai-consulting`,
    siteName: "Settle",
  },
};

export default function AIConsultingHub() {
  const industries = getAllContent("industries");

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/ai-consulting#list`,
    name: "Settle AI Industry Consulting Pages",
    description:
      "Industry-specific AI consulting pages covering the workflows, use cases, and deployment patterns Settle has engineered for each vertical.",
    numberOfItems: industries.length,
    itemListElement: industries.map((entry, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/ai-consulting-for/${entry.slug}`,
      name: entry.title,
    })),
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/ai-consulting#collection`,
    name: "AI Consulting by Industry",
    url: `${SITE_URL}/ai-consulting`,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    description:
      "Industry-specific AI consulting and Claude AI deployment services by Settle AI.",
    mainEntity: { "@id": `${SITE_URL}/ai-consulting#list` },
  };

  return (
    <>
      <JsonLd data={itemListSchema} />
      <JsonLd data={collectionSchema} />

      <Nav />

      <main className="max-w-[1080px] mx-auto px-6 lg:px-10 pt-32 pb-24 md:pt-40 md:pb-36">
        <Breadcrumbs
          items={[{ label: "AI Consulting", href: "/ai-consulting" }]}
        />

        <header className="mb-16 max-w-[760px]">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.1em] text-accent mb-4">
            Industries
          </span>
          <h1
            className="text-[clamp(2rem,4.4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-text mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            AI consulting, engineered for your industry.
          </h1>
          <p className="text-text-muted text-[1.1rem] leading-[1.7]">
            Settle AI deploys Claude AI across mid-market companies — the firms
            too complex for a DIY tutorial and too lean for a Big Four
            engagement. Pick your industry below to see the workflows, use
            cases, and deployment patterns we&rsquo;ve engineered for your
            vertical.
          </p>
        </header>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {industries.map((entry) => (
            <li key={entry.slug}>
              <Link
                href={`/ai-consulting-for/${entry.slug}`}
                className="group block rounded-xl p-6 md:p-7 border border-[rgba(20,20,19,0.1)] bg-[rgba(0,0,0,0.02)] hover:bg-[rgba(0,0,0,0.04)] hover:border-[rgba(20,20,19,0.18)] transition-colors duration-200"
              >
                <div className="text-[11px] uppercase tracking-[0.14em] text-text-faint mb-3">
                  {(entry.industry as string) || "Industry"}
                </div>
                <h2
                  className="text-[1.2rem] md:text-[1.3rem] font-medium leading-[1.25] text-text mb-2 group-hover:text-accent transition-colors duration-200"
                  style={{
                    fontFamily: "var(--font-heading)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {entry.title}
                </h2>
                <p className="text-text-muted text-[0.95rem] leading-[1.65]">
                  {entry.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <section className="mt-20 border-t border-[rgba(20,20,19,0.08)] pt-12 max-w-[760px]">
          <h2
            className="text-[1.5rem] md:text-[1.75rem] font-medium leading-[1.2] text-text mb-4"
            style={{
              fontFamily: "var(--font-heading)",
              letterSpacing: "-0.025em",
            }}
          >
            Don&rsquo;t see your industry?
          </h2>
          <p className="text-text-muted text-[1rem] leading-[1.7] mb-6">
            Settle AI engagements start with a workflow audit, not a template.
            If your industry isn&rsquo;t listed above, the discovery process is
            the same — department-by-department workflow mapping, tier-based
            use case selection, production-grade instruction engineering. Tell
            us where you&rsquo;re stuck.
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center text-[14px] font-medium bg-text text-bg px-5 py-2.5 rounded-lg hover:bg-[#30302e] transition-colors duration-200"
          >
            Start an engagement
          </a>
        </section>
      </main>

      <Footer />
    </>
  );
}

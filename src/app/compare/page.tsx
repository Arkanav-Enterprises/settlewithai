import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllContent } from "@/lib/content";

const SITE_URL = "https://settlewithai.com";

export const metadata: Metadata = {
  title: "Settle AI vs Alternatives — How Settle Compares to DIY, Consulting Firms, and ChatGPT",
  description:
    "Honest side-by-side comparisons of Settle AI against the common alternatives for deploying AI in a mid-market business — DIY, Big Four consulting, ERP vendor AI, freelancers, ChatGPT, offshore dev, and internal IT teams.",
  keywords: [
    "Settle vs",
    "AI consulting comparison",
    "Claude deployment alternatives",
    "AI agency comparison",
    "DIY vs AI consulting",
  ],
  alternates: { canonical: `${SITE_URL}/compare` },
  openGraph: {
    type: "website",
    title: "Settle AI vs Alternatives | Settle",
    description:
      "Side-by-side comparisons of how Settle AI stacks up against DIY, Big Four, ERP vendors, freelancers, and generic AI tools.",
    url: `${SITE_URL}/compare`,
    siteName: "Settle",
  },
};

export default function CompareHub() {
  const comparisons = getAllContent("comparisons");

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/compare#list`,
    name: "Settle AI Comparison Pages",
    description:
      "Detailed comparisons of Settle AI against the common alternatives for deploying AI in a mid-market business.",
    numberOfItems: comparisons.length,
    itemListElement: comparisons.map((entry, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/compare/${entry.slug}`,
      name: entry.title,
    })),
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/compare#collection`,
    name: "Settle AI vs Alternatives",
    url: `${SITE_URL}/compare`,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    description:
      "Comparison pages evaluating Settle AI against DIY, consulting firms, ERP vendors, freelancers, and generic AI tools.",
    mainEntity: { "@id": `${SITE_URL}/compare#list` },
  };

  return (
    <>
      <JsonLd data={itemListSchema} />
      <JsonLd data={collectionSchema} />

      <Nav />

      <main className="max-w-[1080px] mx-auto px-6 lg:px-10 pt-32 pb-24 md:pt-40 md:pb-36">
        <Breadcrumbs items={[{ label: "Compare", href: "/compare" }]} />

        <header className="mb-16 max-w-[760px]">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.1em] text-accent mb-4">
            Comparisons
          </span>
          <h1
            className="text-[clamp(2rem,4.4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-text mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            How Settle AI compares.
          </h1>
          <p className="text-text-muted text-[1.1rem] leading-[1.7]">
            Most AI deployment decisions come down to a handful of real
            alternatives. Build it yourself. Hire a Big Four consultancy. Wait
            for your ERP vendor to ship AI features. Contract freelancers.
            Stitch together ChatGPT prompts. Push the work offshore. Lean on
            internal IT. Each has specific trade-offs — and each is the right
            call in some situations. Here&rsquo;s an honest look at when
            Settle AI fits, and when it doesn&rsquo;t.
          </p>
        </header>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {comparisons.map((entry) => (
            <li key={entry.slug}>
              <Link
                href={`/compare/${entry.slug}`}
                className="group block rounded-xl p-6 md:p-7 border border-[rgba(20,20,19,0.1)] bg-[rgba(0,0,0,0.02)] hover:bg-[rgba(0,0,0,0.04)] hover:border-[rgba(20,20,19,0.18)] transition-colors duration-200"
              >
                <div className="text-[11px] uppercase tracking-[0.14em] text-text-faint mb-3">
                  Comparison
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
            Not sure which option is right?
          </h2>
          <p className="text-text-muted text-[1rem] leading-[1.7] mb-6">
            Every comparison above is written to help you decide without
            needing to talk to us first. If after reading them you&rsquo;re
            still unsure, a 30-minute conversation usually surfaces the
            answer — including the cases where Settle AI isn&rsquo;t the right
            fit.
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center text-[14px] font-medium bg-text text-bg px-5 py-2.5 rounded-lg hover:bg-[#30302e] transition-colors duration-200"
          >
            Start the conversation
          </a>
        </section>
      </main>

      <Footer />
    </>
  );
}

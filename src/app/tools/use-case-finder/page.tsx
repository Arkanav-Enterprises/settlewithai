import type { Metadata } from "next";
import { UseCaseFinder } from "./finder";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";

const SITE_URL = "https://settlewithai.com";

export const metadata: Metadata = {
  title: "AI Use Case Finder — Discover Claude AI Opportunities in Your Business",
  description:
    "Identify high-impact AI use cases across every department in your business. Select your industry and departments to get specific Claude AI opportunities with estimated time savings.",
  keywords: [
    "ai use cases for business",
    "find ai use cases",
    "ai opportunities",
    "claude ai use cases",
    "ai workflow opportunities",
  ],
  alternates: {
    canonical: `${SITE_URL}/tools/use-case-finder`,
  },
  openGraph: {
    type: "website",
    title: "AI Use Case Finder | Settle",
    description:
      "Discover specific Claude AI opportunities across every department in your business.",
    url: `${SITE_URL}/tools/use-case-finder`,
    siteName: "Settle",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Use Case Finder | Settle",
    description:
      "Discover specific Claude AI opportunities across every department in your business.",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does the AI Use Case Finder work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The tool guides you through three steps: selecting your industry, choosing which departments exist in your company, and identifying the biggest time drains in each department. Based on your selections, it generates specific Claude AI use cases with estimated time savings for each department.",
      },
    },
    {
      "@type": "Question",
      name: "How many AI use cases can the tool identify?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The tool identifies 4-7 specific AI use cases per department. For a company with 7 departments, that typically means 30-50 actionable use cases. Settle mapped 49 use cases across 7 departments at Orient Printing & Packaging in a single discovery session.",
      },
    },
    {
      "@type": "Question",
      name: "Are the time savings estimates accurate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The estimates are based on real-world Claude AI deployments across mid-market companies. Actual savings depend on your workflow volume, team size, and current processes. A discovery call with Settle can refine these estimates for your specific situation.",
      },
    },
    {
      "@type": "Question",
      name: "What happens after I find my AI use cases?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can use the results to prioritize which workflows to automate first. Quick Wins are typically deployable within days. For a complete use case map tailored to your business, Settle offers discovery sessions that go deeper than this tool, including workflow audits and ROI modeling.",
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
      name: "AI Use Case Finder",
      item: `${SITE_URL}/tools/use-case-finder`,
    },
  ],
};

export default function UseCaseFinderPage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <Nav />
      <main className="max-w-[720px] mx-auto px-6 lg:px-10 pt-32 pb-24 md:pt-40 md:pb-36">
        <Breadcrumbs
          items={[
            { label: "Tools", href: "/tools/use-case-finder" },
            { label: "AI Use Case Finder", href: "/tools/use-case-finder" },
          ]}
        />

        <header className="mb-12">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.1em] text-accent mb-4">
            Free Tool
          </span>
          <h1 className="text-[clamp(1.8rem,4vw,2.8rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-text mb-4 font-heading">
            AI Use Case Finder
          </h1>
          <p className="text-text-muted text-[1.05rem] leading-relaxed">
            Select your industry and departments to discover specific Claude AI
            use cases with estimated time savings. Takes about 3 minutes.
          </p>
        </header>

        <UseCaseFinder />

        <section className="mt-20">
          <h2 className="text-xl font-semibold tracking-[-0.02em] text-text mb-6 font-heading">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "How does the Use Case Finder work?",
                a: "Three steps: select your industry, choose your departments, and identify each department's biggest time drain. The tool generates specific Claude AI use cases with estimated time savings based on your selections.",
              },
              {
                q: "How many use cases can it find?",
                a: "Typically 4-7 per department. A company with 7 departments usually sees 30-50 actionable use cases. Settle mapped 49 across 7 departments at Orient Printing & Packaging in one session.",
              },
              {
                q: "Are the time savings realistic?",
                a: "Estimates are based on real Claude AI deployments at mid-market companies. Actual savings depend on your workflow volume, team size, and current processes.",
              },
              {
                q: "What should I do with the results?",
                a: "Start with the Quick Wins -- they are typically deployable within days. For a complete use case map tailored to your business, book a discovery call with Settle.",
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

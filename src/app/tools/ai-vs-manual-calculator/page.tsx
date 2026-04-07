import type { Metadata } from "next";
import { Calculator } from "./calculator";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";

const SITE_URL = "https://settlewithai.com";

export const metadata: Metadata = {
  title: "AI vs Manual Calculator — Compare Task Time With and Without Claude AI",
  description:
    "Compare how long business tasks take manually vs. with Claude AI. See time saved per task, per month, and per year with a side-by-side breakdown.",
  keywords: [
    "ai time savings calculator",
    "ai vs manual comparison",
    "claude ai time savings",
    "ai productivity calculator",
    "task automation calculator",
  ],
  alternates: {
    canonical: `${SITE_URL}/tools/ai-vs-manual-calculator`,
  },
  openGraph: {
    type: "website",
    title: "AI vs Manual Calculator | Settle",
    description:
      "Side-by-side comparison of manual vs. Claude AI task time. See hours saved per year.",
    url: `${SITE_URL}/tools/ai-vs-manual-calculator`,
    siteName: "Settle",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI vs Manual Calculator | Settle",
    description:
      "Side-by-side comparison of manual vs. Claude AI task time. See hours saved per year.",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much time does AI save on typical business tasks?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It varies by task type. Document generation and templated workflows typically see 75-85% time reductions. For example, a sales proposal that takes 3 hours manually can be completed in about 45 minutes with Claude AI. Complex tasks like contract review or financial reporting often see 60-80% reductions.",
      },
    },
    {
      "@type": "Question",
      name: "Are the preset task times in this calculator accurate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The preset times are based on industry averages and real deployment data. Your actual times may differ depending on task complexity, team experience, and how well AI is integrated into your workflow. Use the custom task option to enter your own baseline times for a personalized estimate.",
      },
    },
    {
      "@type": "Question",
      name: "How does Claude AI reduce task time so significantly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Claude AI handles the repetitive, structured portions of tasks — drafting documents, summarizing information, comparing data, and generating first versions. Humans then review and refine, which is faster than creating from scratch. The time savings compound when tasks are performed frequently across a team.",
      },
    },
    {
      "@type": "Question",
      name: "What real-world results have businesses seen with AI deployment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "At Orient Printing, document generation went from 4 hours to 30 minutes — an 87.5% reduction. Across 49 mapped use cases, the average time savings was 85%. Results depend on the type of work, data accessibility, and deployment quality.",
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
      name: "AI vs Manual Calculator",
      item: `${SITE_URL}/tools/ai-vs-manual-calculator`,
    },
  ],
};

export default function AiVsManualCalculatorPage() {
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
              label: "AI vs Manual Calculator",
              href: "/tools/ai-vs-manual-calculator",
            },
          ]}
        />

        <header className="mb-12">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.1em] text-accent mb-4">
            Free Tool
          </span>
          <h1 className="text-[clamp(1.8rem,4vw,2.8rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-text mb-4 font-heading">
            AI vs Manual Calculator
          </h1>
          <p className="text-text-muted text-[1.05rem] leading-relaxed">
            Select a business task and see how much time your team saves with
            Claude AI — per task, per month, and per year.
          </p>
        </header>

        <Calculator />

        <section className="mt-20">
          <h2 className="text-xl font-semibold tracking-[-0.02em] text-text mb-6 font-heading">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "How much time does AI save on typical business tasks?",
                a: "It varies by task type. Document generation and templated workflows typically see 75-85% time reductions. Complex tasks like contract review or financial reporting often see 60-80% reductions.",
              },
              {
                q: "Are the preset task times accurate?",
                a: "They're based on industry averages and real deployment data. Your actual times may differ — use the custom task option to enter your own baseline for a personalized estimate.",
              },
              {
                q: "How does Claude AI reduce task time so significantly?",
                a: "Claude AI handles the repetitive, structured portions — drafting, summarizing, comparing data, generating first versions. Humans review and refine, which is faster than creating from scratch.",
              },
              {
                q: "What real-world results have businesses seen?",
                a: "At Orient Printing, document generation went from 4 hours to 30 minutes — an 87.5% reduction. Across 49 mapped use cases, the average time savings was 85%.",
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

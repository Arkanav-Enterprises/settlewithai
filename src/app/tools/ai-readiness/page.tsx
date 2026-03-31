import type { Metadata } from "next";
import { AiReadinessGrader } from "./grader";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";

const SITE_URL = "https://settlewithai.com";

export const metadata: Metadata = {
  title: "AI Readiness Assessment — Is Your Company Ready for Claude AI?",
  description:
    "Take this 2-minute assessment to evaluate your company's readiness for AI deployment. Get a personalized score and actionable recommendations for deploying Claude AI across your workflows.",
  keywords: [
    "ai readiness assessment",
    "is my company ready for ai",
    "ai readiness quiz",
    "ai deployment readiness",
    "enterprise ai assessment",
    "claude ai readiness",
    "ai maturity assessment",
  ],
  alternates: {
    canonical: `${SITE_URL}/tools/ai-readiness`,
  },
  openGraph: {
    type: "website",
    title: "AI Readiness Assessment | Settle",
    description:
      "2-minute assessment to evaluate your company's readiness for Claude AI deployment.",
    url: `${SITE_URL}/tools/ai-readiness`,
    siteName: "Settle",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Readiness Assessment | Settle",
    description:
      "2-minute assessment to evaluate your company's readiness for Claude AI deployment.",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does the AI Readiness Assessment measure?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The assessment evaluates eight dimensions of AI readiness: company size and complexity, workflow volume, current AI usage, documentation maturity, process standardization, leadership buy-in, data accessibility, and team capacity. Your score indicates how prepared your organization is for structured Claude AI deployment.",
      },
    },
    {
      "@type": "Question",
      name: "How long does the assessment take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "About 2 minutes. There are 8 multiple-choice questions, each with clear options. You get your score and recommendations immediately — no email required.",
      },
    },
    {
      "@type": "Question",
      name: "What do the readiness scores mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Scores range from 8 to 32. 'Ready to Deploy' (25-32) means your organization has the structure and volume for immediate AI deployment. 'High Potential' (17-24) means strong foundations with some gaps to address. 'Building Foundations' (8-16) means you'd benefit from process standardization before full AI deployment.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to provide my email to see results?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Results are shown immediately after completing the assessment. You can optionally book a discovery call to discuss your results with Settle.",
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
      name: "AI Readiness Assessment",
      item: `${SITE_URL}/tools/ai-readiness`,
    },
  ],
};

export default function AiReadinessPage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <Nav />
      <main className="max-w-[720px] mx-auto px-6 lg:px-10 pt-32 pb-24 md:pt-40 md:pb-36">
        <Breadcrumbs
          items={[
            { label: "Tools", href: "/tools/ai-readiness" },
            { label: "AI Readiness Assessment", href: "/tools/ai-readiness" },
          ]}
        />

        <header className="mb-12">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.1em] text-accent mb-4">
            Free Tool
          </span>
          <h1 className="text-[clamp(1.8rem,4vw,2.8rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-text mb-4 font-heading">
            AI Readiness Assessment
          </h1>
          <p className="text-text-muted text-[1.05rem] leading-relaxed">
            Answer 8 questions about your business to find out how ready you are
            for structured Claude AI deployment. Takes about 2 minutes.
          </p>
        </header>

        <AiReadinessGrader />

        <section className="mt-20">
          <h2 className="text-xl font-semibold tracking-[-0.02em] text-text mb-6 font-heading">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "What does this assessment measure?",
                a: "Eight dimensions of AI readiness: company size, workflow volume, current AI usage, documentation maturity, process standardization, leadership buy-in, data accessibility, and team capacity.",
              },
              {
                q: "How long does it take?",
                a: "About 2 minutes. Eight multiple-choice questions with immediate results — no email required.",
              },
              {
                q: "What do the scores mean?",
                a: 'Scores range from 8 to 32. "Ready to Deploy" (25-32) means immediate AI deployment is viable. "High Potential" (17-24) means strong foundations with some gaps. "Building Foundations" (8-16) means process standardization would help first.',
              },
              {
                q: "Is this specific to Claude AI?",
                a: "The assessment measures general AI deployment readiness, but recommendations are tailored to Claude (Anthropic) since that's what Settle deploys. The readiness factors apply to any enterprise AI initiative.",
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

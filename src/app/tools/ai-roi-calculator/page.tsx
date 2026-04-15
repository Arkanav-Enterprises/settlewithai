import type { Metadata } from "next";
import { RoiCalculator } from "./calculator";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ToolProse } from "@/components/tools/ToolProse";

const SITE_URL = "https://settlewithai.com";

export const metadata: Metadata = {
  title: "AI ROI Calculator — Estimate Your Claude AI Savings",
  description:
    "Calculate the time and cost savings of deploying Claude AI across your team. Estimate weekly hours saved, annual cost reduction, and equivalent FTEs freed up.",
  keywords: [
    "ai roi calculator",
    "ai savings calculator",
    "ai deployment roi",
    "claude ai roi",
    "ai cost savings",
    "ai time savings",
  ],
  alternates: {
    canonical: `${SITE_URL}/tools/ai-roi-calculator`,
  },
  openGraph: {
    type: "website",
    title: "AI ROI Calculator | Settle",
    description:
      "Estimate your team's time and cost savings from structured Claude AI deployment.",
    url: `${SITE_URL}/tools/ai-roi-calculator`,
    siteName: "Settle",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI ROI Calculator | Settle",
    description:
      "Estimate your team's time and cost savings from structured Claude AI deployment.",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does the AI ROI Calculator estimate savings?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The calculator multiplies the number of employees using AI by the hours they spend on repeatable tasks, then applies the estimated AI time reduction percentage. Cost savings are derived from the hours saved multiplied by the fully loaded hourly rate across 52 weeks.",
      },
    },
    {
      "@type": "Question",
      name: "What is a realistic AI time reduction percentage?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on the task type. Simple document generation and templated workflows often see 70-85% reduction. Complex analysis and decision-making tasks typically see 30-50%. Settle's first engagement with Orient Printing achieved 85% faster document generation, reducing task time from 4 hours to 30 minutes.",
      },
    },
    {
      "@type": "Question",
      name: "What does 'fully loaded hourly cost' mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Fully loaded cost includes salary, benefits, taxes, overhead, and workspace costs — not just base pay. A common rule of thumb is 1.3x to 1.5x the base hourly rate. For example, a $50/hour base salary might have a fully loaded cost of $65-$75/hour.",
      },
    },
    {
      "@type": "Question",
      name: "Are these savings guaranteed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The calculator provides estimates based on your inputs. Actual results depend on workflow complexity, data accessibility, team adoption, and deployment quality. A discovery call with Settle can help validate which estimates are realistic for your specific situation.",
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
      name: "AI ROI Calculator",
      item: `${SITE_URL}/tools/ai-roi-calculator`,
    },
  ],
};

export default function AiRoiCalculatorPage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <Nav />
      <main className="max-w-[720px] mx-auto px-6 lg:px-10 pt-32 pb-24 md:pt-40 md:pb-36">
        <Breadcrumbs
          items={[
            { label: "Tools", href: "/tools/ai-readiness" },
            { label: "AI ROI Calculator", href: "/tools/ai-roi-calculator" },
          ]}
        />

        <header className="mb-12">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.1em] text-accent mb-4">
            Free Tool
          </span>
          <h1 className="text-[clamp(1.8rem,4vw,2.8rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-text mb-4 font-heading">
            AI ROI Calculator
          </h1>
          <p className="text-text-muted text-[1.05rem] leading-relaxed">
            Estimate how much time and money your team could save with structured
            Claude AI deployment. Adjust the sliders to match your situation.
          </p>
        </header>

        <ToolProse title="How AI ROI actually compounds">
          <p>
            AI savings look unimpressive at the single-task level. Forty-five
            minutes saved on a quote. Twenty minutes on a report. A few hours a
            week on onboarding emails. These are the numbers people quote to
            dismiss AI deployment as not worth the investment — and they&rsquo;re
            wrong, because they&rsquo;re measuring the wrong unit.
          </p>
          <p>
            What actually matters is the same task, performed by the same team,
            compounded over a year. A quoting workflow that runs twenty times a
            week, saving forty-five minutes each time, is the equivalent of
            thirty-five full working days per year — for one workflow, in one
            department. Stack that across five or six deployed projects, and
            you&rsquo;re measuring in FTE equivalents rather than hours.
          </p>
          <p>
            The calculator below handles the math, but the inputs matter more
            than the arithmetic. Be honest about how many employees will
            actually use AI daily (usually less than you think), how structured
            those tasks are (more structured = higher reduction), and what your
            fully loaded cost per hour really is (usually 1.3-1.5x base pay
            after benefits and overhead).
          </p>
        </ToolProse>

        <RoiCalculator />

        <ToolProse title="Reading your estimate">
          <p>
            The output is a floor, not a ceiling — assuming the deployment
            quality is strong. Orient Printing&rsquo;s actual numbers beat our
            early ROI estimates because structured Claude AI projects, with
            properly engineered instructions and knowledge files, outperform
            generic prompt-based AI usage by a large margin. The difference
            between 40% and 85% time reduction almost always comes down to
            instruction quality and knowledge curation, not the AI model.
          </p>
          <p>
            The two inputs that produce the most variance in your estimate are
            (1) the percentage of your team that will actually adopt the AI
            daily and (2) the AI time reduction rate. Adoption is an
            organizational problem, not a technical one, and it&rsquo;s the
            single biggest reason ROI estimates miss. Reduction rate is a
            workflow property — templated, repeatable, rule-based work lands
            toward the top of the range; analytical or relational work lands
            toward the bottom.
          </p>
          <p>
            Treat the annual number as a planning input, not a promise. If the
            estimate justifies a deployment, the discovery session does the
            second-order work of validating which workflows are actually in
            each bucket.
          </p>
        </ToolProse>

        <section className="mt-20">
          <h2 className="text-xl font-semibold tracking-[-0.02em] text-text mb-6 font-heading">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "How does this calculator estimate savings?",
                a: "It multiplies the number of employees using AI by the hours they spend on repeatable tasks, then applies the AI time reduction percentage. Cost savings are derived from hours saved multiplied by the fully loaded hourly rate across 52 weeks.",
              },
              {
                q: "What is a realistic AI time reduction percentage?",
                a: "It depends on the task. Simple document generation and templated workflows often see 70-85% reduction. Complex analysis tasks typically see 30-50%. Settle's first engagement achieved 85% faster document generation.",
              },
              {
                q: "What does 'fully loaded hourly cost' mean?",
                a: "It includes salary, benefits, taxes, overhead, and workspace costs — not just base pay. A common rule of thumb is 1.3x to 1.5x the base hourly rate.",
              },
              {
                q: "Are these savings guaranteed?",
                a: "No. The calculator provides estimates based on your inputs. Actual results depend on workflow complexity, data accessibility, team adoption, and deployment quality. A discovery call can help validate what's realistic for your situation.",
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

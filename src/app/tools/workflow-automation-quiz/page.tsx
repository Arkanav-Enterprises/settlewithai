import type { Metadata } from "next";
import { WorkflowAutomationQuiz } from "./quiz";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ToolProse } from "@/components/tools/ToolProse";

const SITE_URL = "https://settlewithai.com";

export const metadata: Metadata = {
  title:
    "Workflow Automation Quiz — Which Tasks Should You Automate with AI?",
  description:
    "Score up to 5 workflows on AI automation potential. Get ranked results, estimated hours saved, and recommendations for deploying Claude AI to your highest-impact tasks.",
  keywords: [
    "workflow automation quiz",
    "which tasks to automate with ai",
    "ai automation assessment",
    "workflow ai scoring",
    "automate with claude ai",
  ],
  alternates: {
    canonical: `${SITE_URL}/tools/workflow-automation-quiz`,
  },
  openGraph: {
    type: "website",
    title: "Workflow Automation Quiz | Settle",
    description:
      "Score your workflows on AI automation potential. Ranked results with estimated hours saved.",
    url: `${SITE_URL}/tools/workflow-automation-quiz`,
    siteName: "Settle",
  },
  twitter: {
    card: "summary_large_image",
    title: "Workflow Automation Quiz | Settle",
    description:
      "Score your workflows on AI automation potential. Ranked results with estimated hours saved.",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does the Workflow Automation Quiz measure?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The quiz evaluates each workflow across five dimensions — frequency, duration, structure level, output type, and team involvement — to produce a composite automation potential score out of 20. Higher scores indicate workflows that benefit most from Claude AI automation.",
      },
    },
    {
      "@type": "Question",
      name: "How many workflows can I score at once?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can score between 1 and 5 workflows per session. Each workflow is scored independently and then ranked by automation potential so you can prioritize deployment.",
      },
    },
    {
      "@type": "Question",
      name: "How is the estimated hours saved calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Estimated hours saved is based on how often the workflow runs, how long it takes, and how structured it is. Highly structured workflows see the greatest reduction because Claude AI can handle templated, rule-based tasks with minimal human oversight.",
      },
    },
    {
      "@type": "Question",
      name: "What should I do after seeing my results?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Start with your highest-scoring workflows — those are the best candidates for immediate automation. Settle can map all your automatable workflows across departments and build a prioritized deployment plan during a discovery call.",
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
      name: "Workflow Automation Quiz",
      item: `${SITE_URL}/tools/workflow-automation-quiz`,
    },
  ],
};

export default function WorkflowAutomationQuizPage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <Nav />
      <main className="max-w-[720px] mx-auto px-6 lg:px-10 pt-32 pb-24 md:pt-40 md:pb-36">
        <Breadcrumbs
          items={[
            { label: "Tools", href: "/tools/workflow-automation-quiz" },
            {
              label: "Workflow Automation Quiz",
              href: "/tools/workflow-automation-quiz",
            },
          ]}
        />

        <header className="mb-12">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.1em] text-accent mb-4">
            Free Tool
          </span>
          <h1 className="text-[clamp(1.8rem,4vw,2.8rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-text mb-4 font-heading">
            Workflow Automation Quiz
          </h1>
          <p className="text-text-muted text-[1.05rem] leading-relaxed">
            Describe up to 5 workflows and see which ones are the best
            candidates for AI automation. Each workflow is scored on frequency,
            duration, structure, output type, and team involvement.
          </p>
        </header>

        <ToolProse title="Not every workflow should be automated">
          <p>
            The most underrated skill in AI deployment is knowing what
            <em> not </em>to automate. Some workflows look like obvious
            candidates — they&rsquo;re repetitive, take a lot of time, and
            happen often — but they rely on tacit human judgment that&rsquo;s
            hard to specify in instructions. Others look unpromising but turn
            out to be ideal because they&rsquo;re structured, rule-governed,
            and easy to review.
          </p>
          <p>
            The four patterns that usually get incorrectly flagged for
            automation: workflows that require physical presence, workflows
            where errors cost more than the human review would, workflows that
            happen rarely (less than once a week), and workflows where the
            real bottleneck is a decision, not a task. Each of these looks
            automatable on paper and produces AI initiatives that either
            stall or generate work rather than remove it.
          </p>
          <p>
            The five dimensions this quiz scores — frequency, duration,
            structure, output type, and team involvement — are designed
            together to separate real automation candidates from
            look-alikes. A workflow that runs often but has unstructured
            output will score lower than a workflow that runs less often with
            highly structured output, and that&rsquo;s usually the correct
            call.
          </p>
        </ToolProse>

        <WorkflowAutomationQuiz />

        <ToolProse title="How to read your scores">
          <p>
            <strong>15-20:</strong> strong automation candidate. The workflow
            is structured enough that a Claude AI project with proper
            instructions will produce reliable output, and it runs often
            enough to justify the engineering work. Examples from past
            engagements: proposal generation, compliance checklists, status
            report drafts, onboarding email sequences, weekly performance
            summaries.
          </p>
          <p>
            <strong>10-14:</strong> deployable, but needs more design
            up-front. These workflows usually have one or two dimensions that
            pull down the score — output is semi-structured, or team
            involvement is high. They still work, but they require more
            instruction engineering and a clearer human-in-the-loop pattern
            to avoid surfacing garbage outputs. Expect a slightly longer
            build phase.
          </p>
          <p>
            <strong>Below 10:</strong> skip this workflow for now. Trying to
            automate it produces more friction than value, and the time
            spent would be better invested in a higher-scoring candidate.
            Revisit it once three or four other projects are running
            cleanly — by then, you&rsquo;ll have internal pattern library
            that may unlock it.
          </p>
        </ToolProse>

        <section className="mt-20">
          <h2 className="text-xl font-semibold tracking-[-0.02em] text-text mb-6 font-heading">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "What does this quiz measure?",
                a: "Five dimensions of automation potential: frequency, duration, structure level, output type, and team involvement. The composite score (out of 20) indicates how well-suited a workflow is for Claude AI automation.",
              },
              {
                q: "How many workflows can I score?",
                a: "Between 1 and 5 per session. Each is scored independently and ranked by automation potential so you can prioritize which to deploy first.",
              },
              {
                q: "How are estimated hours saved calculated?",
                a: "Based on frequency, duration, and structure level. Highly structured workflows see the greatest reduction because Claude AI handles templated, rule-based tasks with minimal human oversight.",
              },
              {
                q: "What should I do after seeing my results?",
                a: "Start with your highest-scoring workflows. Settle can map all your automatable workflows across departments and build a prioritized deployment plan during a discovery call.",
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

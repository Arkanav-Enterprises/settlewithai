import type { Metadata } from "next";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";

const SITE_URL = "https://settlewithai.com";

export const metadata: Metadata = {
  title: "About Settle AI — Founder, Mission, and How We Deploy Claude AI",
  description:
    "Settle AI is a full-stack AI agency founded by Pranav Ambwani. We deploy Claude AI (Anthropic) across manufacturers, professional services firms, and mid-market companies — structured rollouts, production-grade instructions, and working agents in weeks.",
  keywords: [
    "Settle AI",
    "Settle with AI",
    "Pranav Ambwani",
    "AI agency founder",
    "Claude AI deployment agency",
    "about Settle",
  ],
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    type: "profile",
    title: "About Settle AI | Founded by Pranav Ambwani",
    description:
      "Settle AI is a full-stack AI agency that deploys Claude AI into the actual workflows of mid-market companies. Founded 2025 by Pranav Ambwani.",
    url: `${SITE_URL}/about`,
    siteName: "Settle",
  },
};

export default function AboutPage() {
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${SITE_URL}/about#webpage`,
    url: `${SITE_URL}/about`,
    name: "About Settle AI",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    mainEntity: { "@id": `${SITE_URL}/#pranav` },
    description:
      "About Settle AI — a full-stack AI agency deploying Claude AI (Anthropic) across mid-market companies.",
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#pranav`,
    name: "Pranav Ambwani",
    givenName: "Pranav",
    familyName: "Ambwani",
    jobTitle: "Founder",
    description:
      "Founder of Settle AI. Deploys production-grade Claude AI agents across mid-market businesses. 49 use cases mapped and 11 agents shipped in the first engagement with Orient Printing & Packaging — a 79-year-old manufacturer with installations in 50+ countries.",
    worksFor: { "@id": `${SITE_URL}/#organization` },
    url: SITE_URL,
    sameAs: [
      "https://www.linkedin.com/in/pranavambwani/",
      "https://medium.com/@pranavambwani",
    ],
    knowsAbout: [
      "Claude AI Deployment",
      "AI Integration for Business",
      "Instruction Engineering",
      "Workflow Automation",
      "AI Agent Architecture",
      "Model Context Protocol (MCP)",
      "Enterprise AI Strategy",
    ],
  };

  return (
    <>
      <JsonLd data={aboutPageSchema} />
      <JsonLd data={personSchema} />

      <Nav />

      <main className="max-w-[720px] mx-auto px-6 lg:px-10 pt-32 pb-24 md:pt-40 md:pb-36">
        <Breadcrumbs items={[{ label: "About", href: "/about" }]} />

        <header className="mb-12">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.1em] text-accent mb-4">
            About
          </span>
          <h1
            className="text-[clamp(2rem,4.4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-text mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Settle AI is a full-stack AI agency for traditional businesses.
          </h1>
          <p className="text-text-muted text-[1.1rem] leading-[1.75]">
            We deploy Claude AI &mdash; Anthropic&rsquo;s frontier model
            &mdash; into the real workflows of manufacturers, professional
            services firms, and mid-market companies. Discovery. Instruction
            engineering. Agent deployment. Ongoing optimization. Working tools
            in weeks, not strategy decks in months.
          </p>
        </header>

        <section className="mb-16 prose-settle">
          <h2
            className="text-[1.5rem] md:text-[1.75rem] font-medium leading-[1.2] text-text mt-12 mb-5"
            style={{
              fontFamily: "var(--font-heading)",
              letterSpacing: "-0.025em",
            }}
          >
            Why Settle AI exists
          </h2>
          <p className="text-text-muted text-[1.02rem] leading-[1.8] mb-5">
            Most mid-market companies are stuck between two bad options for
            AI. Big Four consultants charge enterprise rates, take months to
            deliver strategy, and hand over a PDF. Doing it yourself means
            watching tutorials, cobbling together ChatGPT workflows, and
            hoping the pieces hold. Neither ships working tools.
          </p>
          <p className="text-text-muted text-[1.02rem] leading-[1.8] mb-5">
            Settle AI is built for the gap. A 50&ndash;500 person company is
            too complex for a DIY tutorial but too lean to justify a
            consulting engagement. The right answer is a small agency that
            does the actual deployment work &mdash; and keeps doing it, as
            the tools meet real usage.
          </p>

          <h2
            className="text-[1.5rem] md:text-[1.75rem] font-medium leading-[1.2] text-text mt-14 mb-5"
            style={{
              fontFamily: "var(--font-heading)",
              letterSpacing: "-0.025em",
            }}
          >
            How we work
          </h2>
          <p className="text-text-muted text-[1.02rem] leading-[1.8] mb-5">
            Four phases. Discovery audits every department&rsquo;s workflows
            to find the highest-leverage AI use cases. Architecture groups
            those use cases into a tier-based rollout plan. Instruction
            engineering writes production-grade Claude AI projects with
            safety rules, review gates, edge-case handling, and knowledge
            file specifications. Then we deploy, train, and iterate.
          </p>
          <p className="text-text-muted text-[1.02rem] leading-[1.8] mb-5">
            Our first engagement with Orient Printing & Packaging &mdash; a
            79-year-old manufacturer with installations in 50+ countries
            &mdash; mapped 49 use cases across seven departments, structured
            eighteen agents, and deployed eleven in the first phase. Offer
            generation dropped from four hours to thirty minutes. Document
            generation got 85% faster.
          </p>

          <h2
            className="text-[1.5rem] md:text-[1.75rem] font-medium leading-[1.2] text-text mt-14 mb-5"
            style={{
              fontFamily: "var(--font-heading)",
              letterSpacing: "-0.025em",
            }}
          >
            Who founded Settle AI
          </h2>
          <p className="text-text-muted text-[1.02rem] leading-[1.8] mb-5">
            Settle AI was founded by{" "}
            <a
              href="https://www.linkedin.com/in/pranavambwani/"
              className="text-accent hover:underline"
              target="_blank"
              rel="noopener"
            >
              Pranav Ambwani
            </a>{" "}
            in 2025. Pranav built Settle after seeing a repeating pattern
            across mid-market companies &mdash; real interest in AI, no
            working deployment, and no partner that would do the engineering
            work end-to-end. The agency was structured around that gap.
          </p>
          <p className="text-text-muted text-[1.02rem] leading-[1.8] mb-5">
            Before Settle AI, Pranav worked in product and growth across B2B
            SaaS and fintech. He writes about AI deployment, instruction
            engineering, and the mechanics of running Claude AI in
            production on{" "}
            <a
              href="/blog"
              className="text-accent hover:underline"
            >
              the Settle blog
            </a>{" "}
            and Medium.
          </p>

          <h2
            className="text-[1.5rem] md:text-[1.75rem] font-medium leading-[1.2] text-text mt-14 mb-5"
            style={{
              fontFamily: "var(--font-heading)",
              letterSpacing: "-0.025em",
            }}
          >
            Where we are
          </h2>
          <p className="text-text-muted text-[1.02rem] leading-[1.8] mb-5">
            Settle AI operates globally. Engagements have been delivered
            across India, the United States, the United Kingdom, and
            continental Europe. We work asynchronously by default, with
            synchronous working sessions at deployment checkpoints.
          </p>
        </section>

        <section className="mt-20 border-t border-[rgba(20,20,19,0.08)] pt-12">
          <h2
            className="text-[1.5rem] md:text-[1.75rem] font-medium leading-[1.2] text-text mb-4"
            style={{
              fontFamily: "var(--font-heading)",
              letterSpacing: "-0.025em",
            }}
          >
            Want to work with us?
          </h2>
          <p className="text-text-muted text-[1rem] leading-[1.7] mb-6">
            Engagements start with a discovery call. No pitch deck, no
            pressure &mdash; we map your current workflows, identify where
            Claude AI will have the highest leverage, and share a rollout
            plan within a week.
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center text-[14px] font-medium bg-text text-bg px-5 py-2.5 rounded-lg hover:bg-[#30302e] transition-colors duration-200"
          >
            Start a conversation
          </a>
        </section>
      </main>

      <Footer />
    </>
  );
}

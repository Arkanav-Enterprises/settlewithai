import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { BlogTOC } from "@/components/blog/BlogTOC";

export const metadata: Metadata = {
  title: "We Used Claude AI Cowork to Prospect 12 Companies and Draft 48 Emails in One Session",
  description:
    "How we used Claude AI's Cowork feature to research prospects, personalise outreach, create Gmail drafts, and build a 3-week send calendar — without leaving the conversation.",
  keywords: [
    "Claude AI Cowork",
    "AI sales outreach",
    "AI prospecting",
    "automated email outreach",
    "Claude AI for sales",
    "AI business development",
    "sales automation AI",
    "Claude AI Gmail integration",
  ],
  alternates: {
    canonical:
      "https://settlewithai.com/blog/ai-powered-outreach-with-cowork",
  },
  openGraph: {
    type: "article",
    title: "We Used Claude AI Cowork to Prospect 12 Companies and Draft 48 Emails in One Session",
    description:
      "Research, personalise, draft, schedule — all in one Claude AI Cowork session.",
    url: "https://settlewithai.com/blog/ai-powered-outreach-with-cowork",
    siteName: "Settle",
    publishedTime: "2026-03-29T00:00:00Z",
    authors: ["Pranav Ambwani"],
  },
  twitter: {
    card: "summary_large_image",
    title: "We Used Claude AI Cowork to Prospect 12 Companies and Draft 48 Emails in One Session",
    description:
      "Research, personalise, draft, schedule — all in one Claude AI Cowork session.",
  },
};

export default function Article() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "We Used Claude AI Cowork to Prospect 12 Companies and Draft 48 Emails in One Session",
    description:
      "How we used Claude AI Cowork to automate prospect research, personalised outreach, Gmail draft creation, and send scheduling.",
    datePublished: "2026-03-29T00:00:00Z",
    dateModified: "2026-03-29T00:00:00Z",
    image: "https://settlewithai.com/og-image.png",
    author: {
      "@type": "Person",
      name: "Pranav Ambwani",
      jobTitle: "Founder",
      url: "https://settlewithai.com",
      worksFor: {
        "@type": "Organization",
        name: "Settle",
      },
    },
    publisher: {
      "@type": "Organization",
      name: "Settle",
      logo: {
        "@type": "ImageObject",
        url: "https://settlewithai.com/apple-touch-icon.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id":
        "https://settlewithai.com/blog/ai-powered-outreach-with-cowork",
    },
  };

  return (
    <>
      <BlogTOC />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://settlewithai.com" },
              { "@type": "ListItem", position: 2, name: "Blog", item: "https://settlewithai.com/blog" },
              { "@type": "ListItem", position: 3, name: "AI-Powered Outreach", item: "https://settlewithai.com/blog/ai-powered-outreach-with-cowork" },
            ],
          }),
        }}
      />

      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-[#e8e6dc]/80">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 h-[4.25rem] flex items-center justify-between">
          <a
            href="/"
            className="text-[1.15rem] font-semibold tracking-[-0.03em] text-text"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            SETTLE
          </a>
          <a
            href="/#contact"
            className="text-[14px] font-medium bg-text text-bg px-5 py-2.5 rounded-full hover:bg-[#30302e] transition-colors duration-200"
          >
            Get Started
          </a>
        </div>
      </nav>

      {/* Article */}
      <article className="max-w-[720px] mx-auto px-6 lg:px-10 pt-32 pb-24 md:pt-40 md:pb-36">
        <header className="mb-16">
          <a
            href="/"
            className="text-accent text-sm font-medium hover:underline"
          >
            &larr; Back to Settle
          </a>
          <h1
            className="text-[clamp(2rem,4.5vw,3rem)] font-medium leading-[1.12] mt-8 mb-6"
            style={{
              fontFamily: "var(--font-heading)",
              letterSpacing: "-0.03em",
            }}
          >
            We Used Claude AI Cowork to Prospect 12 Companies and Draft 48
            Emails in One Session
          </h1>
          <p className="text-text-muted text-[17px] leading-relaxed">
            Research, personalise, draft, and schedule &mdash; without
            leaving the conversation. Here&apos;s what that actually looked
            like.
          </p>
          <div className="flex items-center gap-3 mt-6 text-sm text-text-faint">
            <a href="/#contact" className="hover:text-accent transition-colors">Pranav Ambwani</a>
            <span>&middot;</span>
            <time dateTime="2026-03-29">March 2026</time>
            <span>&middot;</span>
            <span>6 min read</span>
          </div>
        </header>

        <div className="prose-settle">
          <p>
            I had a Friday afternoon with nothing on the calendar. We&apos;d
            just finished the Orient Printing &amp; Packaging deployment, had
            a case study with real numbers (49 use cases mapped, 11 projects
            deployed, 85% faster document generation), and I needed to get
            it in front of similar companies. Printing and packaging
            manufacturers, specifically.
          </p>
          <p>
            Normally this would eat an entire week. A day researching
            companies, another day finding contacts, another day writing
            personalised emails, then manually scheduling follow-ups. I
            decided to try doing the whole thing inside one <a href="https://www.anthropic.com/claude" target="_blank" rel="noopener noreferrer">Claude AI</a> Cowork
            session instead.
          </p>
          <p>
            I honestly didn&apos;t think it would work end to end. It did.
          </p>

          <h2>Finding the right companies</h2>
          <p>
            I gave <a href="https://www.anthropic.com" target="_blank" rel="noopener noreferrer">Cowork</a> a simple brief: find companies similar to
            Orient. Indian printing and packaging machinery manufacturers,
            100&ndash;500+ employees, established, multiple departments,
            not yet AI-adopted. The kind of companies where the same use
            cases we deployed for Orient would immediately resonate.
          </p>
          <p>
            Cowork searched the web, cross-referenced trade show exhibitor
            lists (Pamex, Printpack India, Labelexpo), pulled company data
            from corporate registries, and came back with 12 qualified
            prospects. Each one had a company profile, key decision-maker
            names, contact emails, and a rationale for why they fit.
          </p>
          <p>
            Wait, did that actually work? I spot-checked three of them.
            The company details were accurate. The contact names matched
            LinkedIn. The rationale for each one made sense.
          </p>
          <p>
            It also tiered them by conversion probability. Tier 1 were
            companies with nearly identical DNA to Orient, same products,
            same scale, same operational patterns. Tier 2 were larger
            companies in the broader packaging ecosystem. Tier 3 were
            adjacent industries with the same complexity profile.
          </p>

          <h2>Writing emails that don&apos;t sound like spam</h2>
          <p>
            This is where outreach usually falls apart. Generic emails get
            ignored. But writing truly personalised emails for 12 companies
            takes hours of research per prospect.
          </p>
          <p>
            Cowork drafted personalised initial emails for all 12 prospects.
            Each one referenced something specific about the company (a
            recent trade show, their product range, their global footprint)
            and bridged it to the Orient case study. The hook wasn&apos;t
            &ldquo;do you want AI?&rdquo; It was &ldquo;I did this for a
            company in your exact industry, here&apos;s what it looked
            like, want me to map your use cases?&rdquo;
          </p>
          <p>
            The first drafts were too salesy though. Words like
            &ldquo;incredible pace&rdquo; and &ldquo;results were wild.&rdquo;
            Have you noticed how AI defaults to that breathless marketing
            tone? I told Cowork to pull it back: understated, warm, let the
            numbers speak. It redrafted the entire batch with the corrected
            tone. Much better.
          </p>

          <h2>Building the full sequences</h2>
          <p>
            One email isn&apos;t a campaign. I had Cowork build a 4-touch
            sequence for each prospect:
          </p>
          <ul>
            <li>
              <strong>Day 1</strong> &mdash; Initial outreach with the
              Orient case study hook
            </li>
            <li>
              <strong>Day 3</strong> &mdash; Follow-up highlighting a
              specific deployed project (Offer Generator, BOM Generator,
              Troubleshooting Assistant) relevant to that prospect
            </li>
            <li>
              <strong>Day 7</strong> &mdash; New angle with a link to our
              blog article on AI deployment methodology
            </li>
            <li>
              <strong>Day 14</strong> &mdash; Graceful break-up email with
              the case study link, leaving the door open
            </li>
          </ul>
          <p>
            That&apos;s 48 emails total. Each one different. Each one
            referencing something real about the prospect. I kept waiting
            for the quality to drop off as the volume went up. It
            didn&apos;t.
          </p>

          <h2>Straight into Gmail</h2>
          <p>
            This is the part that surprised me most. Cowork connected to
            Gmail and created all 48 emails as drafts, organised by
            prospect and sequence stage. I labelled them for visual clarity:
            <em>Settle/1-Initial</em>,{" "}
            <em>Settle/2-Day 3</em>, <em>Settle/3-Day 7</em>,{" "}
            <em>Settle/4-Day 14</em>.
          </p>
          <p>
            Then Cowork built a send calendar. Tier 1 goes first on Monday,
            Tier 2 on Wednesday, Tier 3 on Friday, with follow-ups
            staggered across three weeks. It created scheduled reminders at
            9 AM IST for each send date, so I get a notification, open
            Gmail, filter by label, and hit send.
          </p>
          <p>
            Twelve prospects, 48 emails, a 3-week send calendar. One
            conversation. On a Friday afternoon.
          </p>

          <h2>Why this matters beyond outreach</h2>
          <p>
            This is exactly the kind of workflow I deploy for clients. Not
            a chatbot answering questions, but a structured system where AI
            does real operational work. The same approach that built this
            outreach campaign is what I use to build offer generators, RFQ
            systems, and troubleshooting assistants.
          </p>
          <p>
            The pattern is the same every time: give the AI structured
            context (company brief, case study, prospect list), clear
            <a href="https://www.anthropic.com/research/building-effective-agents" target="_blank" rel="noopener noreferrer">instructions</a> (tone, sequence structure, personalisation
            requirements), and the right tools (web search, Gmail
            integration). The output is production-quality work that would
            have taken days to produce manually.
          </p>
          <p>
            That&apos;s what settling AI into a business actually looks
            like.
          </p>

          {/* Related */}
          <div className="mt-16 pt-10 border-t border-[rgba(20,20,19,0.1)]">
            <h3 className="text-lg font-medium mb-6">Related</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <a href="/blog/orient-case-study" className="group">
                <p className="font-medium group-hover:text-[#d97757] transition-colors">How a 79-Year-Old Manufacturer Deployed AI Across 7 Departments</p>
                <p className="text-sm text-[rgba(20,20,19,0.5)] mt-1">49 use cases mapped, 18 projects structured, 11 deployed in the first engagement.</p>
              </a>
              <a href="/blog/integrating-ai-into-your-company" className="group">
                <p className="font-medium group-hover:text-[#d97757] transition-colors">How to Actually Integrate AI Into Your Company</p>
                <p className="text-sm text-[rgba(20,20,19,0.5)] mt-1">A structured, phase-by-phase approach to deploying AI across your team&apos;s real workflows.</p>
              </a>
            </div>
          </div>

          {/* Author */}
          <div className="mt-16 pt-8 border-t border-border-light flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#e8e6dc] flex items-center justify-center shrink-0 text-text font-medium text-lg" style={{ fontFamily: "var(--font-heading)" }}>P</div>
            <div>
              <a href="/#contact" className="font-medium text-text hover:text-accent transition-colors">Pranav Ambwani</a>
              <p className="text-sm text-text-muted mt-1 leading-relaxed">Founder of Settle. Deploys Claude AI into mid-market companies and manufacturers &mdash; structured rollouts, production-grade instructions, real results.</p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 pt-10 border-t border-border-light">
            <h3>Want to see what AI can do for your workflows?</h3>
            <p>
              We help companies go from zero to deployed &mdash; structured
              rollouts, production-grade instructions, and measurable
              results.{" "}
              <a
                href="/#contact"
                className="text-accent font-medium hover:underline"
              >
                Start a conversation &rarr;
              </a>
            </p>
          </div>
        </div>
      </article>

      <Footer />
    </>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "We Used Claude Cowork to Prospect 12 Companies and Draft 48 Emails in One Session",
  description:
    "How we used Claude's Cowork feature to research prospects, personalise outreach, create Gmail drafts, and build a 3-week send calendar — without leaving the conversation.",
  keywords: [
    "Claude Cowork",
    "AI sales outreach",
    "AI prospecting",
    "automated email outreach",
    "Claude AI for sales",
    "AI business development",
    "sales automation AI",
    "Claude Gmail integration",
  ],
  alternates: {
    canonical:
      "https://settlewithai.com/blog/ai-powered-outreach-with-cowork",
  },
  openGraph: {
    type: "article",
    title: "We Used Claude Cowork to Prospect 12 Companies and Draft 48 Emails in One Session",
    description:
      "Research, personalise, draft, schedule — all in one Claude Cowork session.",
    url: "https://settlewithai.com/blog/ai-powered-outreach-with-cowork",
    siteName: "Settle",
    publishedTime: "2026-03-29T00:00:00Z",
    authors: ["Settle"],
  },
  twitter: {
    card: "summary_large_image",
    title: "We Used Claude Cowork to Prospect 12 Companies and Draft 48 Emails in One Session",
    description:
      "Research, personalise, draft, schedule — all in one Claude Cowork session.",
  },
};

export default function Article() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "We Used Claude Cowork to Prospect 12 Companies and Draft 48 Emails in One Session",
    description:
      "How we used Claude Cowork to automate prospect research, personalised outreach, Gmail draft creation, and send scheduling.",
    datePublished: "2026-03-29T00:00:00Z",
    author: {
      "@type": "Organization",
      name: "Settle",
      url: "https://settlewithai.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Settle",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id":
        "https://settlewithai.com/blog/ai-powered-outreach-with-cowork",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-[#e8e6dc]/80">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 h-[4.25rem] flex items-center justify-between">
          <a
            href="/"
            className="text-[1.15rem] font-semibold tracking-[-0.03em] text-text"
            style={{ fontFamily: "Sentient, Georgia, serif" }}
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
              fontFamily: "Sentient, Georgia, serif",
              letterSpacing: "-0.03em",
            }}
          >
            We Used Claude Cowork to Prospect 12 Companies and Draft 48
            Emails in One Session
          </h1>
          <p className="text-text-muted text-[17px] leading-relaxed">
            Research, personalise, draft, and schedule &mdash; without
            leaving the conversation. Here&apos;s what that actually looked
            like.
          </p>
          <div className="flex items-center gap-3 mt-6 text-sm text-text-faint">
            <span>Settle</span>
            <span>&middot;</span>
            <time dateTime="2026-03-29">March 2026</time>
            <span>&middot;</span>
            <span>6 min read</span>
          </div>
        </header>

        <div className="prose-settle">
          <p>
            We needed to reach companies in the printing and packaging
            manufacturing space &mdash; the same industry as our first
            client, Orient Printing &amp; Packaging. We had a case study
            with hard numbers (49 use cases mapped, 11 projects deployed,
            85% faster document generation) and wanted to put it in front of
            the right people.
          </p>
          <p>
            The traditional approach would be: spend a day researching
            companies, another day finding contacts, another day writing
            personalised emails, and then manually scheduling follow-ups
            over three weeks. We did all of it in a single Claude Cowork
            session.
          </p>

          <h2>Step 1: Prospect research</h2>
          <p>
            We gave Cowork a simple brief: find companies similar to Orient
            &mdash; Indian printing and packaging machinery manufacturers,
            100&ndash;500+ employees, established, multiple departments, not
            yet AI-adopted. The kind of companies where the same use cases
            we deployed for Orient would immediately resonate.
          </p>
          <p>
            Cowork searched the web, cross-referenced trade show exhibitor
            lists (Pamex, Printpack India, Labelexpo), pulled company data
            from corporate registries, and came back with 12 qualified
            prospects. Each one had a company profile, key decision-maker
            names, contact emails, and a rationale for why they fit.
          </p>
          <p>
            It also tiered them by conversion probability. Tier 1 were
            companies with nearly identical DNA to Orient &mdash; same
            products, same scale, same operational patterns. Tier 2 were
            larger companies in the broader packaging ecosystem. Tier 3 were
            adjacent industries with the same complexity profile.
          </p>

          <h2>Step 2: Personalised outreach</h2>
          <p>
            This is where most outreach breaks down. Generic emails get
            ignored. But writing truly personalised emails for 12 companies
            takes hours of research per prospect.
          </p>
          <p>
            Cowork drafted personalised initial emails for all 12 prospects.
            Each one referenced something specific about the company &mdash;
            a recent trade show, their product range, their global footprint
            &mdash; and bridged it to the Orient case study. The hook
            wasn&apos;t &ldquo;do you want AI?&rdquo; &mdash; it was
            &ldquo;we did this for a company in your exact industry,
            here&apos;s what it looked like, want us to map your use
            cases?&rdquo;
          </p>
          <p>
            We also had Cowork recalibrate the tone. The first drafts were
            too salesy &mdash; words like &ldquo;incredible pace&rdquo; and
            &ldquo;results were wild.&rdquo; We pulled those back to match
            our brand voice: understated, warm, let the numbers speak.
            Cowork redrafted the entire batch with the corrected tone.
          </p>

          <h2>Step 3: Full email sequences</h2>
          <p>
            One email isn&apos;t a campaign. We had Cowork build a 4-touch
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
            referencing something real about the prospect.
          </p>

          <h2>Step 4: Gmail drafts and scheduling</h2>
          <p>
            Cowork connected to Gmail and created all 48 emails as drafts,
            organised by prospect and sequence stage. We labelled them in
            Gmail for visual clarity: <em>Settle/1-Initial</em>,{" "}
            <em>Settle/2-Day 3</em>, <em>Settle/3-Day 7</em>,{" "}
            <em>Settle/4-Day 14</em>.
          </p>
          <p>
            Then Cowork built a send calendar &mdash; Tier 1 goes first on
            Monday, Tier 2 on Wednesday, Tier 3 on Friday &mdash; with
            follow-ups staggered across three weeks. It created scheduled
            reminders at 9 AM IST for each send date, so we get a
            notification, open Gmail, filter by label, and hit send.
          </p>
          <p>
            The entire outreach infrastructure &mdash; 12 prospects, 48
            emails, a 3-week send calendar &mdash; was built in a single
            conversation.
          </p>

          <h2>What this means for deployment</h2>
          <p>
            This is exactly the kind of workflow we deploy for our clients.
            Not a chatbot answering questions &mdash; a structured system
            where AI does real operational work. The same approach that
            built this outreach campaign is what we use to build offer
            generators, RFQ systems, and troubleshooting assistants.
          </p>
          <p>
            The pattern is always the same: give the AI structured context
            (our company brief, the Orient case study, the prospect list),
            clear instructions (tone, sequence structure, personalisation
            requirements), and the right tools (web search, Gmail
            integration). The output is production-quality work that would
            have taken a team days to produce manually.
          </p>
          <p>
            That&apos;s what settling AI into a business actually looks
            like.
          </p>

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

      {/* Footer */}
      <footer className="bg-[#141413] text-[#e8e6dc]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-12 flex items-center justify-between">
          <span
            className="text-[1rem] font-medium tracking-[-0.03em]"
            style={{ fontFamily: "Sentient, Georgia, serif" }}
          >
            SETTLE
          </span>
          <span className="text-[rgba(232,230,220,0.4)] text-sm">
            AI, thoughtfully deployed.
          </span>
        </div>
      </footer>
    </>
  );
}

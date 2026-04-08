import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { BlogTOC } from "@/components/blog/BlogTOC";

export const metadata: Metadata = {
  title:
    "The Handover Plan: Anatomy of an AI Rollout Working Session",
  description:
    "Every Settle Claude rollout ends with a single-page handover document. Eight rows, four modes, a progress bar at the bottom, and one line at the top that does more work than the rest of the page combined.",
  keywords: [
    "AI rollout handover",
    "Claude AI deployment meeting",
    "AI delivery session",
    "AI change management",
    "AI adoption meeting",
    "Claude AI team training",
    "AI rollout methodology",
    "Settle handover plan",
    "structured AI deployment",
    "working session AI",
  ],
  alternates: {
    canonical:
      "https://settlewithai.com/blog/the-handover-plan",
  },
  openGraph: {
    type: "article",
    title:
      "The Handover Plan: Anatomy of an AI Rollout Working Session",
    description:
      "Eight rows, four modes, a progress bar at the bottom. Inside the single-page document we print for every Claude rollout — and why the page itself is the deliverable.",
    url: "https://settlewithai.com/blog/the-handover-plan",
    siteName: "Settle",
    publishedTime: "2026-04-08T00:00:00Z",
    authors: ["Pranav Ambwani"],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "The Handover Plan: Anatomy of an AI Rollout Working Session",
    description:
      "Eight rows, four modes, a progress bar at the bottom. Inside the single-page document we print for every Claude rollout.",
  },
};

export default function Article() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "The Handover Plan: Anatomy of an AI Rollout Working Session",
    description:
      "Every Settle Claude rollout ends with a single-page handover document. Eight rows, four modes, a progress bar at the bottom. Here's what it looks like and why every detail matters.",
    datePublished: "2026-04-08T00:00:00Z",
    dateModified: "2026-04-08T00:00:00Z",
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
        "https://settlewithai.com/blog/the-handover-plan",
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
              { "@type": "ListItem", position: 3, name: "The Handover Plan", item: "https://settlewithai.com/blog/the-handover-plan" },
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
        {/* Header */}
        <header className="mb-16">
          <a
            href="/blog"
            className="text-accent text-sm font-medium hover:underline"
          >
            &larr; Back to Blog
          </a>
          <h1
            className="text-[clamp(2rem,4.5vw,3.2rem)] font-medium leading-[1.12] mt-8 mb-6"
            style={{
              fontFamily: "var(--font-heading)",
              letterSpacing: "-0.03em",
            }}
          >
            The Handover Plan: Anatomy of an AI Rollout Working Session
          </h1>
          <p className="text-text-muted text-[17px] leading-relaxed">
            Every Settle Claude rollout ends with a single-page document.
            Eight rows, four modes, a progress bar at the bottom, and one
            line at the top that does more work than the rest of the page
            combined.
          </p>
          <div className="flex items-center gap-3 mt-6 text-sm text-text-faint">
            <a href="/#contact" className="hover:text-accent transition-colors">Pranav Ambwani</a>
            <span>&middot;</span>
            <time dateTime="2026-04-08">April 2026</time>
            <span>&middot;</span>
            <span>7 min read</span>
          </div>
        </header>

        {/* Body */}
        <div className="prose-settle">
          <p>
            Before every Claude rollout handover, we prepare a single page.
            Not a deck. Not a Notion doc. A thoughtfully typeset page with
            the client&apos;s logo at the top, a headline in serif italic,
            a two-sentence lede, and eight rows representing the eight tools
            we&apos;re about to put in front of the team.
          </p>
          <p>
            At the top of that page, above everything else, is the line
            that does more work than the rest of the document combined:
          </p>
          <blockquote>
            A working session &mdash; not a demo reel. We&apos;ll move
            through the stack the way your team would actually use it, on
            real work, in real time.
          </blockquote>
          <p>
            Everything else on the page is an argument for that sentence.
            Here&apos;s what the rest of the page looks like, and why every
            detail matters.
          </p>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/blog/handover-plan.webp"
            alt="The single-page handover plan Settle prepares for every Claude rollout: eight numbered rows with a title, one-line note, and mode tag (PPT, LIVE, VIDEO + LIVE, DISCUSSION), plus a progress-bar footer."
            width={1440}
            height={2635}
            loading="lazy"
            className="rounded-xl border border-[rgba(20,20,19,0.1)] my-10"
          />

          <h2>A page, not a deck</h2>
          <p>
            The first thing people notice when I pull up the handover plan
            on the projector is that it doesn&apos;t look like a slide.
            It&apos;s a typeset page. Wide reading column, serif display
            type for the headline and row titles, hairline rules between
            sections, the client&apos;s logo centered at the top in their
            actual brand colour. It looks the way a magazine article looks,
            not the way a sales deck looks.
          </p>
          <p>
            That&apos;s intentional. A deck tells a story to an audience.
            A page invites you to read, pause, and come back. We want the
            second reaction, not the first. The meeting isn&apos;t a
            presentation to sit through. It&apos;s a working document to
            lean into.
          </p>
          <p>
            The other thing that matters about the format: it fits on one
            screen. I&apos;ve run handovers where the agenda was a ten-slide
            deck and the team lost the thread by slide four. A single page
            keeps everything in view. At any moment, you can glance up and
            see where we are, what&apos;s done, and what&apos;s still
            coming.
          </p>

          <h2>Why the first row is labelled 00</h2>
          <p>
            The walkthrough is numbered 01 through 08. The opener is
            numbered 00. That&apos;s on purpose.
          </p>
          <p>
            Row 00 is titled &ldquo;Open.&rdquo; The body reads,
            roughly: the founder opens with how to think about AI, then
            walks through a tour of our Claude. Two things, in order,
            both required, neither involving a specific tool.
          </p>
          <p>
            The first half is framing. Fifteen minutes, no screens, no
            demos. Just a conversation about how to think about AI at all.
            Claude isn&apos;t a search engine, it&apos;s a colleague. It has
            context you give it, memory you structure, and rules you write.
            The quality of what you get out is proportional to the quality
            of what you put in.
          </p>
          <p>
            I used to skip this. I thought people would find it
            condescending, or that they&apos;d want to see the tools
            immediately. I was wrong on both counts. A rollout without
            framing fails in a specific way: the team sees the demo, goes
            back to their desks, and within a week they&apos;re using
            Claude the way they&apos;d use Google. Type a question, copy
            the answer, move on. Nothing has shifted in how they think about
            the thing.
          </p>
          <p>
            The second half of row 00 is a tour of the Claude setup itself.
            Not the tools yet. The environment. This is where their
            projects live. These are the instructions we wrote. This is the
            knowledge file that encodes their pricing logic. These are the
            safety rules that prevent internal cost data from leaking into
            customer-facing documents. Fifteen more minutes, still no
            specific tool, and by the end of it everyone in the room has a
            mental model of the substrate before they see anything built on
            top of it.
          </p>
          <p>
            Zero-indexing matters. The opener is not step one. It&apos;s
            everything you need before step one makes sense.
          </p>

          <h2>Eight rows in the order you actually reach for them</h2>
          <p>
            Below the opener, a section divider labels the next block as
            the walkthrough and names a role split: one of us drives,
            the other adds context live. That role split is the same on
            every handover. The engineer on our team opens the Claude
            project, types the sample input, walks through the output.
            I jump in every few minutes to name what we&apos;re seeing,
            why it was built that way, and what to watch out for.
          </p>
          <p>
            Neither of us could run the session alone. If the engineer
            did it solo, the tools would look like magic tricks. If I
            did it solo, I&apos;d skip the mechanics because I wrote
            them and I&apos;d get bored. Together we make it feel like
            what it actually is: something a small team built carefully,
            now being handed off a piece at a time.
          </p>
          <p>
            Then the eight rows. Each one has a number, a title, a one-line
            note, and a mode on the right. For a sales team handover they
            look like this:
          </p>
          <ol>
            <li>Sales Comms Tool &mdash; walk through the deck</li>
            <li>Email check and draft &mdash; live in the team&apos;s actual email client</li>
            <li>Sales Excel to Word and PPT generation &mdash; report generation from their sales sheet</li>
            <li>Performance recommendations &mdash; how to improve after this session</li>
            <li>Prospecting &mdash; overview of how it works</li>
            <li>Prospecting &mdash; run one live while explaining</li>
            <li>Sales Proposal &mdash; walk through the deck</li>
            <li>Configurator to Price to ROI to DI Creation &mdash; show video, run live in background</li>
          </ol>
          <p>
            Read that list the way a salesperson would. It&apos;s literally
            what they do in a week. Check the inbox, draft replies to
            customers, turn the sales sheet into a report, figure out what
            to improve, prospect new leads, write proposals, configure
            machines and price them out. Every tool shows up in the order
            they&apos;d naturally reach for it.
          </p>
          <p>
            I got this wrong for a while. I used to sequence handovers by
            tool complexity &mdash; start with the easy ones, work up to
            the impressive ones, so the team builds confidence as they go.
            The problem is that &ldquo;tool complexity&rdquo; is a
            Settle-internal metric. Nobody on the client side cares. What
            they care about is the order they&apos;d actually use these
            things on a Tuesday morning. Sequencing by workflow instead of
            by complexity reframed the whole meeting. The session stopped
            being &ldquo;here are the eight things we built&rdquo; and
            started being &ldquo;here&apos;s what Monday morning looks like
            when you have these tools.&rdquo;
          </p>

          <h2>Four modes, chosen on purpose</h2>
          <p>
            On the far right of every row is a status tag. There are only
            four values it can take:{" "}
            <strong>PPT</strong>, <strong>LIVE</strong>,{" "}
            <strong>VIDEO + LIVE</strong>, or <strong>DISCUSSION</strong>.
            I used to think mixing modes was messy. Now I think it&apos;s
            the single biggest thing that makes these sessions work.
          </p>
          <p>
            <strong>PPT</strong>
            {" "}earns its spot when a tool has moving parts that matter
            more than the output. Prospecting is a good example. The
            actual output is an email draft, which is genuinely boring
            to watch get typed. But the thing that makes it useful
            &mdash; how Claude pulls the prospect&apos;s company profile,
            finds the decision-maker, drafts in the client&apos;s tone,
            references the right case study &mdash; is all hidden under
            the hood. Four slides up front make it visible before we run
            anything live.
          </p>
          <p>
            <strong>LIVE</strong>
            {" "}earns its spot when the output is the point. Email
            drafting is the opposite of prospecting: there&apos;s no
            interesting backend, but watching Claude read a
            customer&apos;s actual enquiry and draft a reply in about
            eight seconds is the part that lands. Nobody in the room has
            ever done that before. You can feel it change the air.
          </p>
          <p>
            <strong>VIDEO + LIVE</strong>
            {" "}is for the tools where a pure live run would take too
            long. The configurator chains four steps: configure the
            machine, price it out, calculate ROI, generate a deal
            intelligence doc. Running all four end-to-end live is a
            twenty-minute commitment, and the middle ten minutes are
            quiet. So we play a tight two-minute video that shows the
            full arc, then kick off a live run in the background and
            come back to it at the end of the session when it&apos;s
            done.
          </p>
          <p>
            <strong>DISCUSSION</strong>
            {" "}is the most important mode and the one I had to learn to
            take seriously. It&apos;s the mode where we close the
            laptop. On our handover plans it&apos;s reserved for row 04:
            performance recommendations &mdash; how to improve after
            this session. More on that in a second.
          </p>
          <p>
            No mode is better than the others. The trick is matching the
            mode to what the tool is trying to prove.
          </p>

          <h2>The progress bar is the deliverable</h2>
          <p>
            At the bottom of the page there&apos;s a thin horizontal line,
            a small counter that starts at &ldquo;0 / 8 complete,&rdquo; and
            one instruction in muted grey: &ldquo;Click a row to mark
            complete.&rdquo;
          </p>
          <p>
            The page is interactive. As we finish each tool, we click the
            row. A line strikes through the title, the counter ticks up,
            the progress bar at the bottom fills in. By the end of the
            meeting the document isn&apos;t a plan anymore. It&apos;s a
            log. Eight rows with lines through them, a full progress bar,
            a timestamp we don&apos;t need to write down because the page
            itself is now the record.
          </p>
          <p>
            This sounds small. I think it&apos;s the thing that makes
            handover meetings feel like real work instead of a
            presentation. Every click is a moment the room agrees that
            something happened. The tool was demonstrated. The team saw
            it on their own data. It&apos;s now part of their workflow,
            not a pitch.
          </p>
          <p>
            When I started doing handovers I ended them with &ldquo;any
            questions?&rdquo; and got polite silence. Now I end them with
            a page full of strikethroughs and a conversation about what
            comes next. That change was almost entirely about the footer
            of a single document.
          </p>

          <h2>The handover is the product</h2>
          <p>
            One last detail. The handover plan isn&apos;t a one-off Google
            Doc. It lives inside our internal dashboard, and the dashboard
            has a few zoom levels worth showing. Bear with me &mdash; this
            is the only place in the post I&apos;ll talk about the
            machinery behind the meeting.
          </p>
          <p>
            Zoom level one. Every client we run a handover for has their
            own page that lists every meeting we&apos;ve had with them, in
            order. Each row is its own working document. The headline at
            the top is the closest thing we have to a mission statement:{" "}
            <em>Sessions, in sequence.</em>
          </p>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/blog/rollout-meetings.webp"
            alt="A client's Rollout Meetings index page inside the Settle dashboard. Headline: 'Sessions, in sequence.' One row listed: '01 — AI, thoughtfully deployed.' dated 8 April 2026."
            width={1600}
            height={816}
            loading="lazy"
            className="rounded-xl border border-[rgba(20,20,19,0.1)] my-10"
          />

          <p>
            Zoom level two. Each of those clients has a full rollout
            dashboard underneath the meetings list. This is where we
            track every use case, every project, every skill, every
            blocker, every gap. The meeting plan I&apos;ve been describing
            for the last 1,500 words is one tab in this thing. Everything
            else &mdash; all the architecture and instruction work that
            happens before handover day &mdash; lives here.
          </p>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/blog/dashboard-detail.webp"
            alt="The Settle rollout dashboard for a client. Headline: 'AI Integration Rollout — Claude Enterprise deployment across 7 departments with 49 use cases.' Three large stat cards (20 Ready to Deploy, 23 Needs Work, 7 Blockers and Risks) above a Skill Readiness by Tier chart with four tier rows."
            width={1600}
            height={816}
            loading="lazy"
            className="rounded-xl border border-[rgba(20,20,19,0.1)] my-10"
          />

          <p>
            Zoom level three. And those rollouts all live inside one
            top-level index. New rollouts get added here. Old ones get
            archived here. It&apos;s the &ldquo;all clients&rdquo; view I
            open first thing in the morning to see what&apos;s in flight.
          </p>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/blog/dashboards-landing.webp"
            alt="The Settle dashboards index. Headline: 'Dashboards, settled.' One client rollout listed below."
            width={1600}
            height={816}
            loading="lazy"
            className="rounded-xl border border-[rgba(20,20,19,0.1)] my-10"
          />

          <p>
            I&apos;m showing you all of this so the next paragraph lands
            properly.
          </p>

          <p>
            For a long time I thought the product was the instructions.
            Then I thought it was the architecture. I now think it&apos;s
            the handover &mdash; and more specifically, the single page we
            put on the projector when it&apos;s time to go live.
          </p>
          <p>
            The instructions are scaffolding. The architecture is the
            frame. The thing that actually ships &mdash; the thing that
            determines whether the client is still using Claude in month
            six &mdash; is the two-hour meeting where real people see
            their real workflows run on their real data for the first
            time. And the page we run that meeting from is the closest
            thing we have to a physical deliverable.
          </p>
          <p>
            That&apos;s why we put so much weight on it. That&apos;s why
            the layout is what it is. That&apos;s why row 00 exists. That&apos;s
            why the status column has four values and not five. That&apos;s
            why there&apos;s a progress bar at the bottom instead of a
            &ldquo;thanks for watching&rdquo; slide.
          </p>
          <p>
            If you&apos;re thinking about deploying AI across your team,
            the thing to optimise for isn&apos;t the number of use cases
            you map or the number of tools you build. It&apos;s the day
            someone on your team walks out of a meeting and thinks,
            &ldquo;I can actually use this tomorrow.&rdquo;
          </p>
          <p>
            Everything else is scaffolding for that moment.{" "}
            <a
              href="/#contact"
              className="text-accent font-medium hover:underline"
            >
              Start a conversation &rarr;
            </a>
          </p>

          {/* Related */}
          <div className="mt-16 pt-10 border-t border-[rgba(20,20,19,0.1)]">
            <h3 className="text-lg font-medium mb-6">Related</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <a href="/blog/claude-team-deployment-beyond-diy" className="group">
                <p className="font-medium group-hover:text-[#d97757] transition-colors">Beyond the 7-Day Playbook</p>
                <p className="text-sm text-[rgba(20,20,19,0.5)] mt-1">Why DIY Claude setup guides break down once you&apos;re deploying across departments.</p>
              </a>
              <a href="/blog/orient-case-study" className="group">
                <p className="font-medium group-hover:text-[#d97757] transition-colors">Orient Case Study</p>
                <p className="text-sm text-[rgba(20,20,19,0.5)] mt-1">49 use cases mapped. 18 projects structured. 11 deployed. 85% faster document generation.</p>
              </a>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </>
  );
}

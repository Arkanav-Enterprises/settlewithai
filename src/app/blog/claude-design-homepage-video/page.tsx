import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { BlogTOC } from "@/components/blog/BlogTOC";
import { Nav } from "@/components/layout/Nav";
import { MagazineHeader } from "@/components/blog/MagazineHeader";
import { MagazineOutro } from "@/components/blog/MagazineOutro";
import { PullQuote } from "@/components/blog/PullQuote";
import { LazyVideo } from "@/components/LazyVideo";

export const metadata: Metadata = {
  title:
    "How I made Settle's homepage hero in Claude Design, in under an hour",
  description:
    "The exact workflow we ran: the prompt that worked, what broke on the first try, and an honest frame on what Claude Design is and isn't good for.",
  keywords: [
    "Claude Design",
    "Anthropic Claude Design",
    "AI marketing video",
    "homepage hero video",
    "Claude Design workflow",
    "AI video generation",
    "prompt engineering marketing",
    "Settle AI",
  ],
  alternates: {
    canonical:
      "https://settlewithai.com/blog/claude-design-homepage-video",
  },
  openGraph: {
    type: "article",
    title:
      "How I made Settle's homepage hero in Claude Design, in under an hour",
    description:
      "The exact workflow, the prompt that worked, what broke on the first try, and the line between what Claude Design is good at and what it isn't.",
    url: "https://settlewithai.com/blog/claude-design-homepage-video",
    siteName: "Settle",
    publishedTime: "2026-04-22T00:00:00Z",
    authors: ["Pranav Ambwani"],
    images: [
      {
        url: "/og-image.png",
        width: 1519,
        height: 1090,
        alt: "How I made Settle's homepage hero in Claude Design — Settle",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "How I made Settle's homepage hero in Claude Design, in under an hour",
    description:
      "The exact workflow, the prompt that worked, what broke on the first try, and the line between what Claude Design is good at and what it isn't.",
  },
};

export default function Article() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "How I made Settle's homepage hero in Claude Design, in under an hour",
    description:
      "The exact workflow we ran using Claude Design (Anthropic Labs, April 2026) to ship a homepage hero video end-to-end. Includes the working prompt, the failed first pass, and an honest frame on when this workflow fits.",
    datePublished: "2026-04-22T00:00:00Z",
    dateModified: "2026-04-22T00:00:00Z",
    image: "https://settlewithai.com/og-image.png",
    author: {
      "@type": "Person",
      name: "Pranav Ambwani",
      jobTitle: "Founder",
      url: "https://settlewithai.com",
      sameAs: ["https://www.linkedin.com/in/pranavambwani/"],
      description:
        "Founder of Settle, a full-stack AI agency for manufacturers and mid-market teams. USC Electrical Engineering. Based between Los Angeles and New Delhi. Deploys Claude AI for operations.",
      worksFor: {
        "@type": "Organization",
        name: "Settle",
        url: "https://settlewithai.com",
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
        "https://settlewithai.com/blog/claude-design-homepage-video",
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
              { "@type": "ListItem", position: 3, name: "Claude Design homepage video", item: "https://settlewithai.com/blog/claude-design-homepage-video" },
            ],
          }),
        }}
      />

      <Nav />

      <MagazineHeader
        category="Essay"
        issue="No. 22"
        title="How I made Settle's homepage hero in Claude Design, in under an hour"
        deck="The exact workflow: the prompt that worked, what broke on the first try, and an honest frame on what this tool is and isn't good for."
        author="Pranav Ambwani"
        date="2026-04-22"
        readingTime="7 min read"
      />

      <article className="max-w-[720px] mx-auto px-6 lg:px-10 pb-24 md:pb-36">
        <div className="prose-settle">
          <p>
            Last week I made Settle&apos;s homepage hero video in Claude
            Design in under an hour. No Figma, no After Effects, no editor
            beyond CapCut for the final trim. Two prompt iterations in the
            canvas. One screen recording in QuickTime. One clean loop cut.
            Published.
          </p>

          <p>
            This is the exact workflow. The prompt I used, what was wrong
            on attempt one, and the honest frame on what this tool is
            actually good for, and what it isn&apos;t.
          </p>

          <h2>What Claude Design is</h2>
          <p>
            <a
              href="https://www.anthropic.com/news/claude-design"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Claude Design
            </a>{" "}
            is Anthropic&apos;s new canvas for generating HTML-rendered
            marketing content end-to-end from a prompt. It shipped in April
            2026 as a research preview for Pro, Max, Team, and Enterprise
            plans, and usage counts against your existing Claude limits. I
            burned through half my weekly quota on bad early prompts before
            I understood what the tool wanted from me. The cap is real.
          </p>

          <h2>Why a video, not a deck</h2>
          <p>
            Our homepage had a problem I&apos;d been avoiding for a month.
            Above the fold, we were saying what we do: &ldquo;we deploy
            Claude AI for mid-market businesses.&rdquo; Which is accurate,
            and exactly the kind of sentence every AI consultancy on the
            internet leads with. The deck equivalent of standing in the
            lobby of a building and reading the directory out loud.
          </p>

          <p>
            What the page needed was something that showed the work. A
            loop. Soundless. Twelve to twenty seconds. The visual artifact
            of Claude doing the thing we charge clients to do: generating a
            branded proposal, structuring a BOM, writing an RFQ reply in
            the voice of an eighty-year-old printing company.
          </p>

          <p>
            That framing matters because it shapes every prompt decision
            that follows. Anthropic&apos;s own launch video for Claude
            Design is eighty seconds of story arc: opener, demo, founder
            testimonial, tagline. A hero loop is not that. A hero loop is
            one moment of a product in motion, cut to breathe. I needed
            that distinction clear in my head before I opened the canvas.
            I did not have it clear the first time.
          </p>

          <h2>The setup</h2>
          <p>
            I opened a new project in Claude Design, attached our design
            system (Fraunces display, Manrope body, the warm cream and
            salmon palette we use across the site), and attached
            Anthropic&apos;s own Claude Design launch video as a pacing
            reference. That last part turned out to matter more than the
            design system. Claude Design ingests video as a cadence
            reference in ways I didn&apos;t expect. It picked up the
            editorial kicker treatment, the type-in caret, the slow pans
            between scenes.
          </p>

          {/* Screenshot slot — add /public/blog/claude-design-canvas.png
             (1512x782, Claude Design canvas mid-generation) and restore:
             <img src="/blog/claude-design-canvas.png"
                  alt="Claude Design canvas view mid-generation..."
                  width={1512} height={782} loading="lazy"
                  className="rounded-xl border border-[rgba(20,20,19,0.1)] my-10" /> */}

          <h2>Attempt one, and why it failed</h2>
          <p>
            My first prompt was bad. I&apos;ll show it because I want the
            post to be useful, not the polished version.
          </p>

          <pre className="bg-[rgba(20,20,19,0.04)] border border-[rgba(20,20,19,0.08)] rounded-lg p-5 text-[13px] leading-[1.6] overflow-x-auto font-mono whitespace-pre-wrap">{`Create a 7-second marketing video for Settle AI.

Tell our story: we deploy Claude AI for mid-market
companies. Include:
- Opening title card with logo
- Three proof points (use cases, stats)
- A product shot
- Client testimonial card
- Closing tagline with CTA

Match the style of the attached Anthropic Claude Design
launch video. Use our design system (attached).`}</pre>

          <p>
            I asked for a full product tour in seven seconds. Opener,
            three use-case proofs, testimonial, CTA. The output rendered,
            technically. It was unwatchable. Every beat lasted 900
            milliseconds, the type-in animation never finished before the
            next cut, and the whole thing read as a trailer for something
            that didn&apos;t exist. Claude Design did exactly what I asked
            for. The ask was wrong.
          </p>

          <p>
            Copying the format of a reference video is the amateur move.
            Copying its breathing is the useful one. I had copied the
            format. An eighty-second story arc does not compress to seven
            seconds. It just gets loud.
          </p>

          <h2>The prompt that worked</h2>
          <p>
            I threw out the product-tour framing and rewrote the prompt as
            a six-beat shot list with deliberate breathing room. One
            moment per beat, two and a half to three seconds each. A
            proposal card tilting onto the canvas. A type-in filling out
            the client name. The branded cover page resolving. A subtle
            hand-off to the Settle wordmark. The whole thing pinned to our
            site&apos;s voice and stripped of any external references.
          </p>

          <pre className="bg-[rgba(20,20,19,0.04)] border border-[rgba(20,20,19,0.08)] rounded-lg p-5 text-[13px] leading-[1.6] overflow-x-auto font-mono whitespace-pre-wrap">{`Six-beat hero loop. 16 seconds. 2.5-3s per beat.
For settlewithai.com homepage, below the Orient case
card. No story arc. No narrative compression. Loopable.

Voice and look: attached design system. Fraunces display
+ Manrope body. Cream #e8e6dc base, #141413 text,
#D97757 salmon accent. Generous whitespace.

Pacing reference: attached Anthropic Claude Design launch
video. Use its breathing (slow pans, type-in caret,
editorial kickers). Do NOT copy its three-act story arc.

Beats:
1. Blank canvas → proposal card slides in from
   bottom-right, tilted 6deg.
2. Type-in caret fills the client field:
   "Orient Printing Systems, est. 1946."
3. Card straightens to 0deg. Pagination dots below
   read "1 of 12."
4. Hard cut to a full-frame branded cover resolving.
   Filename in the top bar: "Orient_Proposal_v3.pdf"
5. Three-pane shot. Instructions left, output center
   (the PDF), review panel right. Subtle pulse on the
   review panel's active state.
6. Hand-off to Settle wordmark. Under it, one line:
   "AI deployment, production-grade."

Don't include: chat UI, testimonial cards, mic icons,
stock footage. Don't use "transforming," "unlocking,"
"leveraging," or any hype verb.

Export: standalone HTML, 1920x1080, for QuickTime
screen recording at 24fps.`}</pre>

          <p>
            The second render took two minutes in Claude Design. The first
            frame was correct. The pacing matched the reference
            video&apos;s breathing, not its story structure. The
            typography followed our design system without me needing to
            correct it. I stopped there.
          </p>

          <PullQuote>
            A founder who opens Claude Design and prompts &ldquo;make me a
            marketing video&rdquo; gets slop. A founder who prompts with a
            six-beat shot list, a design system, a reference video, and a
            clear thesis about what job the video has to do gets a hero
            in an hour.
          </PullQuote>

          <h2>Screen record, trim, embed</h2>
          <p>
            Claude Design outputs a standalone HTML file. I opened it at
            1920×1080 in Chrome, QuickTime screen-recorded at 24fps, and
            saved the raw capture. Four minutes.
          </p>

          <p>
            The raw capture had a two-second pre-roll before the animation
            started and a hanging end frame. I trimmed both in CapCut,
            added a four-frame crossfade at the loop point so the cycle
            is seamless, and exported as MP4 at the same resolution.
            Eight minutes.
          </p>

          <p>
            Dropped into the homepage section below the Orient case study
            card with{" "}
            <code>autoplay muted loop playsInline</code>. Adjusted the
            surrounding section to 100vh on desktop so the video reads
            full-frame. Published.
          </p>

          <LazyVideo
            src="/videos/settle-promo-cinema.mp4"
            poster="/videos/settle-promo-cinema-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            className="rounded-xl border border-[rgba(20,20,19,0.1)] my-10 w-full block"
            aria-label="The final homepage hero loop generated in Claude Design"
          />

          <p>
            Two iterations, twelve minutes in the canvas. Four minutes of
            screen recording. Eight minutes in CapCut. The homepage was
            live at the forty-five minute mark.
          </p>

          <h2>What I&apos;d do differently</h2>
          <p>
            The first prompt tried to do too much. I compressed an
            eighty-second narrative into seven seconds because the
            reference video felt &ldquo;correct&rdquo; and I didn&apos;t
            stop to ask what job the video actually had on the page. A
            reference video is a cadence reference, not a format template.
            Homepage loops and launch videos have different jobs. The
            sooner you separate those two, the better your first render
            gets.
          </p>

          <p>
            The placeholder copy in attempt one was generic. &ldquo;Your
            stack. Your constraints.&rdquo; That kind of text gestures at
            positioning without committing to it. The second prompt named
            specific Settle outputs (proposal cover, client name, branded
            PDF) because the hero needed to show Claude producing
            something real, not a mood board of what AI might feel like.
          </p>

          <p>
            I started with a chat-thread visual. A typing indicator, a
            Claude-style response, a user message. Then I remembered
            Settle&apos;s page already has an interactive chat widget
            three scrolls down. The hero was restating a thing the page
            already says better. Chat-thread mockups are a reflex for AI
            content. They&apos;re almost never the right choice when your
            own page has a real chat.
          </p>

          <p>
            Quota burn. Claude Design runs against your plan&apos;s
            existing Claude usage limit. I worked through eight drafts
            before I understood that the first two or three had eaten the
            rest. If I&apos;d written the six-beat shot list before
            opening the tool, I&apos;d have spent two renders instead of
            eight. The canvas is not a place to think. It&apos;s a place
            to execute a thought you already had.
          </p>

          <h2>When this workflow fits</h2>
          <p>
            Good for hero loops, one-shot product explainers, scenic
            mockups, anything where the final artifact is HTML that you
            can screen-record at full resolution. Good for founders who
            can&apos;t justify a Musicbed license, a Figma seat, and an
            After Effects freelancer for a single hero video. Good for
            services firms with specific positioning that need to show
            work, not describe it.
          </p>

          <p>
            Not good for anything needing real audio beyond ambient music.
            Not good for videos longer than about sixty seconds. The HTML
            canvas struggles to hold attention past that. Not good when
            the brand is a founder on camera. Not good for 3D work, shot
            photography, or anything resembling production footage. If
            you need a cinematographer, you need a cinematographer.
          </p>

          <h2>The point</h2>
          <p>
            Claude Design is a tool. The tool is not the value. The value
            is in knowing which video to make for which slot on which
            page. A hero loop has a different job than a LinkedIn post
            has a different job than a landing page explainer, and the
            prompt structure is different for each. The value is in
            knowing which prompt gets good output on the first render,
            versus which one will eat half your weekly quota on drafts
            that miss the brief. The value is in knowing when to stop.
          </p>

          <p>
            A founder who opens Claude Design and prompts &ldquo;make me a
            marketing video&rdquo; gets slop. A founder who prompts with
            a six-beat shot list, a design system, a reference video, and
            a clear thesis about what the video has to do &mdash; that
            founder gets a hero in an hour.
          </p>

          <p>
            That&apos;s the discipline{" "}
            <a
              href="https://settlewithai.com"
              className="text-accent hover:underline"
            >
              we bring to every Claude deployment at Settle
            </a>
            , and it&apos;s the same reason the{" "}
            <a
              href="/blog/orient-case-study"
              className="text-accent hover:underline"
            >
              Orient engagement
            </a>{" "}
            shipped eleven production systems in under sixty days. The
            tool is the easy part. The brief is the work.
          </p>
        </div>

        <MagazineOutro
          author="Pranav Ambwani"
          related={[
            {
              category: "Case Study",
              title:
                "How a 79-Year-Old Manufacturer Deployed AI Across 7 Departments",
              description:
                "49 use cases mapped. 18 projects structured. 11 deployed. 85% faster document generation.",
              href: "/blog/orient-case-study",
            },
            {
              category: "Technical",
              title:
                "How We Built settlewithai.com Entirely with Claude Code",
              description:
                "Every component on our site — the WebGL globe, D3 mindmap, Cowork demo, SEO infrastructure — was built in Claude Code sessions.",
              href: "/blog/built-with-claude-code",
            },
          ]}
        />
      </article>

      <Footer />
    </>
  );
}

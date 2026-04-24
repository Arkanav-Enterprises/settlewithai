import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { BlogTOC } from "@/components/blog/BlogTOC";
import { Nav } from "@/components/layout/Nav";
import { MagazineHeader } from "@/components/blog/MagazineHeader";
import { MagazineOutro } from "@/components/blog/MagazineOutro";
import { PullQuote } from "@/components/blog/PullQuote";

/**
 * Horizontal bar chart comparing $100K+ household share across major AI
 * providers. Pure flex + divs, no chart library. Responsive: label column
 * narrows on mobile, values always tabular-nums.
 */
function IncomeBarChart() {
  const bars = [
    { label: "Claude", value: 80, display: "80%", accent: true },
    {
      label: "ChatGPT, Gemini, Copilot",
      value: 60,
      display: "56–64%",
      range: [56, 64] as [number, number],
    },
    { label: "Meta AI", value: 37, display: "37%" },
  ];
  const baseline = 37; // US population baseline, ~37% of households earn $100K+

  return (
    <div className="border-t border-b border-text/80 py-8 md:py-10 px-1">
      <div className="text-[10.5px] md:text-[11px] uppercase tracking-[0.2em] text-text-faint mb-8 md:mb-10 font-medium">
        Share of each AI&apos;s US user base in $100K+ households
      </div>

      <div className="space-y-5 md:space-y-7">
        {bars.map((bar) => (
          <div
            key={bar.label}
            className="grid grid-cols-[110px_1fr_60px] md:grid-cols-[180px_1fr_72px] items-center gap-3 md:gap-5"
          >
            <span className="text-[12px] md:text-[13.5px] font-medium text-text leading-tight">
              {bar.label}
            </span>
            <div className="relative h-9 md:h-10 bg-[rgba(20,20,19,0.05)]">
              {/* Range band (for middle band only) */}
              {bar.range && (
                <div
                  className="absolute top-0 bottom-0 bg-text/20"
                  style={{
                    left: `${bar.range[0]}%`,
                    width: `${bar.range[1] - bar.range[0]}%`,
                  }}
                  aria-hidden="true"
                />
              )}
              {/* Solid bar up to the point value */}
              <div
                className={`absolute top-0 bottom-0 left-0 ${
                  bar.accent ? "bg-accent" : "bg-text/40"
                }`}
                style={{
                  width: `${bar.range ? bar.range[0] : bar.value}%`,
                }}
                aria-hidden="true"
              />
              {/* Baseline tick — US population reference */}
              <div
                className="absolute top-0 bottom-0 border-l border-dashed border-text/35"
                style={{ left: `${baseline}%` }}
                aria-hidden="true"
              />
            </div>
            <span
              className="text-[14px] md:text-[17px] font-medium tabular-nums text-text text-right leading-none"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {bar.display}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 md:mt-8 pt-4 border-t border-border-light flex items-center gap-2 text-[10.5px] md:text-[11px] text-text-faint">
        <span className="inline-block w-3 h-px border-t border-dashed border-text/40" aria-hidden="true" />
        <span className="italic">US population baseline: roughly 37% of households earn $100K+</span>
      </div>
    </div>
  );
}

/**
 * 100-dot matrix. Shows each provider's share as a 10x10 grid where filled
 * dots = users in $100K+ households. A concrete, tactile view of the same
 * data the bar chart summarizes.
 */
function DotMatrix({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-4">
        <span className="text-[11.5px] md:text-[12.5px] font-medium text-text uppercase tracking-[0.14em]">
          {label}
        </span>
        <span
          className="text-[22px] md:text-[28px] font-medium tabular-nums text-text leading-none"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
        >
          {value}
        </span>
      </div>
      <div className="grid grid-cols-10 gap-[2px] md:gap-[3px]" aria-hidden="true">
        {Array.from({ length: 100 }, (_, i) => (
          <div
            key={i}
            className={`aspect-square rounded-full ${
              i < value ? (accent ? "bg-accent" : "bg-text/60") : "bg-text/[0.08]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title:
    "80% of US Claude users earn six figures. It's not a price story, it's a work story.",
  description:
    "Epoch AI just published the income distribution of every major AI's user base. Claude's is wildly skewed toward $100K+ households — 80% vs. Meta AI's 37%. Why that chart is a stronger buy signal for mid-market businesses than any benchmark.",
  keywords: [
    "Claude AI user demographics",
    "Claude vs Meta AI",
    "Claude income distribution",
    "Epoch AI Research",
    "Claude AI for business",
    "best AI for mid-market",
    "Claude AI adoption 2026",
    "AI tool selection for business",
    "Claude Anthropic user base",
    "enterprise AI comparison",
    "why businesses choose Claude",
    "Claude operator class",
  ],
  alternates: {
    canonical: "https://settlewithai.com/blog/claude-user-income-chart",
  },
  openGraph: {
    type: "article",
    title:
      "80% of US Claude users earn six figures. It's not a price story, it's a work story.",
    description:
      "Epoch AI just published the income distribution of every major AI's user base. Claude's is unlike any consumer product's — and it explains more about the tool than any benchmark does.",
    url: "https://settlewithai.com/blog/claude-user-income-chart",
    siteName: "Settle",
    publishedTime: "2026-04-24T00:00:00Z",
    authors: ["Pranav Ambwani"],
    images: [
      {
        url: "/og-image.png",
        width: 1519,
        height: 1090,
        alt: "80% of US Claude users earn six figures — Settle Field Notes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "80% of US Claude users earn six figures. It's not a price story, it's a work story.",
    description:
      "Epoch AI just published the income distribution of every major AI's user base. Claude's is unlike any consumer product's, and it explains more about the tool than any benchmark.",
  },
};

export default function Article() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "80% of US Claude users earn six figures. It's not a price story, it's a work story.",
    description:
      "Epoch AI just published the income distribution of every major AI's user base. Claude's is wildly skewed toward $100K+ households, at 80% vs. Meta AI's 37%. Why that chart is a stronger buy signal for mid-market businesses than any benchmark.",
    datePublished: "2026-04-24T00:00:00Z",
    dateModified: "2026-04-24T00:00:00Z",
    image: "https://settlewithai.com/og-image.png",
    author: {
      "@type": "Person",
      name: "Pranav Ambwani",
      jobTitle: "Founder",
      url: "https://settlewithai.com",
      sameAs: ["https://www.linkedin.com/in/pranavambwani/"],
      description:
        "Founder of Settle, a full-stack AI agency for manufacturers and mid-market teams. USC Electrical Engineering. Based between Los Angeles and New Delhi. Deploys Claude AI for operations — structured rollouts, production-grade instructions, real results.",
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
        "https://settlewithai.com/blog/claude-user-income-chart",
    },
    citation: {
      "@type": "CreativeWork",
      name: "Epoch AI Research on Claude user income distribution",
      author: {
        "@type": "Organization",
        name: "Epoch AI",
        url: "https://epoch.ai",
      },
      url: "https://x.com/EpochAIResearch/status/2047056309535801605",
      datePublished: "2026-04-22",
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
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://settlewithai.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: "https://settlewithai.com/blog",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Claude user income chart",
                item: "https://settlewithai.com/blog/claude-user-income-chart",
              },
            ],
          }),
        }}
      />

      <Nav />

      <MagazineHeader
        category="Perspective"
        issue="No. 23"
        title="80% of US Claude users earn six figures. It's not a price story, it's a work story."
        deck="Epoch AI just published the income distribution of every major AI user base. Claude's is unlike any consumer product I've ever seen, and it explains more about the tool than any benchmark does."
        author="Pranav Ambwani"
        date="2026-04-24"
        readingTime="8 min read"
      />

      <article className="max-w-[720px] mx-auto px-6 lg:px-10 pb-24 md:pb-36">
        <div className="prose-settle">
          <p>
            Last Tuesday, a mid-market CEO I was onboarding asked me a
            question I&apos;ve heard dozens of times over the last year.
          </p>
          <p>
            &ldquo;My IT team set us up on Copilot through the Microsoft
            licenses we already had. The seats are basically free. Why are
            you pushing us toward Claude?&rdquo;
          </p>
          <p>
            It&apos;s a fair question. I&apos;ve given a fair answer for a
            year. I talk about model quality, about tool use, about the
            managed-agent architecture. I pull up benchmark comparisons.
            I show him Claude Code running across his own repos. By the end
            of the call he says something like, &ldquo;okay, that&apos;s
            interesting,&rdquo; and I leave the meeting feeling like
            I&apos;ve done maybe 60% of the work of convincing him.
          </p>
          <p>
            The next day,{" "}
            <a
              href="https://x.com/EpochAIResearch/status/2047056309535801605"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Epoch AI published a chart
            </a>{" "}
            that did the remaining 40% in a single image.
          </p>

          <h2>The chart</h2>
          <p>
            <a
              href="https://epoch.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Epoch AI Research
            </a>{" "}
            is one of the most credible independent AI research
            organizations working today. On April 22 they posted a clean
            piece of data about US consumer AI usage. It&apos;s the kind of
            data point that reframes a whole conversation.
          </p>
          <p>Their summary, in one sentence:</p>
          <blockquote>
            80% of US adults who report using Claude in the previous week
            live in households earning $100,000 or more a year, compared to
            37% of Meta AI users. Other major providers cluster in a
            relatively narrow band, with 56&ndash;64% of users in $100,000+
            households.
          </blockquote>

          <figure className="my-10 md:my-12 not-prose">
            <IncomeBarChart />
            <figcaption className="text-[11px] md:text-[12px] text-text-faint mt-4 leading-[1.6]">
              Source:{" "}
              <a
                href="https://x.com/EpochAIResearch/status/2047056309535801605"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-accent"
              >
                Epoch AI Research
              </a>
              , April 22 2026. Share of US adults who reported using each AI
              in the previous week who live in households earning $100,000
              or more per year.
            </figcaption>
          </figure>

          <p>Two things jump out.</p>
          <p>
            The first is that Claude&apos;s user base is strangely
            concentrated at the top of the income distribution. Four in
            five US Claude users live in $100K+ households. That&apos;s
            radically top-heavy for any consumer tech product.
          </p>
          <p>
            The second is that Meta AI&apos;s distribution looks almost
            exactly like the general US population. That makes sense the
            moment you think about it. Meta AI is embedded in Facebook,
            Instagram, WhatsApp, and Messenger. Hundreds of millions of
            Americans use at least one of those every day, and Meta AI has
            slid into the interface next to the search bar whether they
            asked for it or not. Its user base is whoever uses Meta&apos;s
            apps, which is basically a cross-section of the country.
          </p>
          <p>
            The middle band is the interesting one. 56&ndash;64% of
            ChatGPT, Gemini, and Copilot users are in $100K+ households.
            Well above the population average, well below Claude&apos;s
            80%. Those products all have some consumer gravity (free tiers,
            browser integration, Google Workspace embeds) along with real
            professional adoption. Claude stands alone at the top.
          </p>

          <h2>Meta AI&apos;s chart is the inverse of Claude&apos;s, and that&apos;s the story</h2>
          <p>
            I want to linger on this for a second, because it&apos;s where
            the data gets most interesting.
          </p>
          <p>
            Meta AI is one of the most heavily distributed AI products on
            earth. If you count total impressions, it&apos;s probably ahead
            of Claude by an order of magnitude. Zero friction. No signup.
            No new app. No subscription. You open Instagram and it&apos;s
            just there.
          </p>
          <p>
            And yet: only 37% of its users are in $100K+ households. Which
            means 63% are below that line. The product&apos;s distribution
            mirrors the distribution of the country.
          </p>
          <p>
            That&apos;s what a consumer AI looks like when it wins consumer
            distribution.
          </p>
          <p>
            Now look at Claude. Claude has no consumer distribution
            surface. There&apos;s no Facebook-for-Claude, no Gmail plugin
            by default, no WhatsApp bot, no pre-loaded Instagram
            integration. You don&apos;t stumble into Claude. You open a
            browser, go to claude.ai, create an account, and start a
            conversation. Or you subscribe at $20 a month for Pro. Or you
            wire the API into a product you&apos;re already building.
          </p>
          <p>
            Every Claude user is a user who went looking for Claude.
            That&apos;s the self-selection you don&apos;t get with Meta AI.
            And when you let a user base self-select, the distribution
            tells you who needed the thing badly enough to go find it.
          </p>

          <h2>What &ldquo;$100K+ household&rdquo; actually means</h2>
          <p>
            I want to be careful here, because income-bucket demographics
            are easy to misread.
          </p>
          <p>
            A $100K+ household in the US doesn&apos;t mean rich. It means
            roughly the upper third of the income distribution. It&apos;s a
            single professional making $110K a year. It&apos;s a two-earner
            household with each partner pulling $60K. It&apos;s a plumbing
            contractor doing good work in a metro area. It&apos;s a senior
            engineer, a mid-level lawyer, a high school principal in an
            expensive district.
          </p>
          <p>
            What it correlates with, and this is the part that matters for
            a business conversation, is knowledge work. Jobs where the main
            output is written decisions, documents, code, analysis,
            spreadsheets, and judgment. Jobs where an AI that&apos;s
            actually good at those things can double your throughput on a
            Tuesday afternoon.
          </p>
          <p>
            It also correlates with decision authority over your own tools.
            People in that income band are more likely to pay the $20 a
            month for Pro themselves, without waiting for IT to approve a
            license. They&apos;re more likely to evaluate three AIs and
            pick one. They&apos;re more likely to care that the one they
            pick is any good.
          </p>
          <p>
            Claude&apos;s user base looks more like the Wall Street
            Journal&apos;s subscriber base than like Facebook&apos;s user
            base. Meta AI&apos;s looks like Facebook&apos;s. That&apos;s
            the shape of the signal.
          </p>

          <h2>The operator class has already picked</h2>

          <figure className="my-10 md:my-12 not-prose">
            <div className="border-t border-b border-text/80 py-8 md:py-10">
              <div className="text-[10.5px] md:text-[11px] uppercase tracking-[0.2em] text-text-faint mb-8 md:mb-10 font-medium">
                Out of every 100 users, this many live in $100K+ households
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
                <DotMatrix label="Claude" value={80} accent />
                <DotMatrix label="Major providers" value={60} />
                <DotMatrix label="Meta AI" value={37} />
              </div>
            </div>
            <figcaption className="text-[11px] md:text-[12px] text-text-faint mt-4 leading-[1.6]">
              The middle value (60) is the midpoint of the 56&ndash;64% range
              Epoch reports for ChatGPT, Gemini, and Copilot. Each dot is one
              of 100 users. Filled dots live in $100K+ households.
            </figcaption>
          </figure>

          <p>Here&apos;s what I keep seeing at Settle.</p>
          <p>
            We deploy Claude into traditional mid-market businesses.
            Manufacturers, distributors, ops-heavy service companies. My
            job usually starts with a CEO or a COO who is somewhere between
            skeptical and curious about AI. And almost every single
            engagement, there&apos;s one pattern I can predict before I
            walk in.
          </p>
          <p>
            The people at the company who &ldquo;get&rdquo; AI the
            fastest, the ones who see the demo and immediately start
            connecting it to workflows I haven&apos;t even pitched yet,
            are almost always already using Claude. Personally. On their
            own subscription. For their own work.
          </p>
          <p>
            The people who are still skeptical after the demo, or who tell
            me &ldquo;we tried AI and it wasn&apos;t impressive,&rdquo;
            are almost always running either ChatGPT&apos;s free tier from
            a year ago, or a Copilot license IT set up and nobody really
            uses.
          </p>
          <p>I didn&apos;t design it this way. It just keeps happening.</p>
          <p>
            It&apos;s not that Claude users are smarter or better.
            It&apos;s that they&apos;re the people who already went through
            the work of finding a serious AI tool. They already know what
            the good version feels like. So when I show them a production
            system, their brain has a reference point. The skeptics
            don&apos;t. They&apos;re still comparing what I&apos;m building
            to a chatbot from 2023.
          </p>

          <PullQuote>
            The operator class has already picked. Quietly, individually,
            one $20-a-month subscription at a time. The Epoch chart is the
            first public map of what they picked.
          </PullQuote>

          <p>
            The Epoch chart is the first time I&apos;ve seen that pattern
            show up in aggregate data.
          </p>

          <h2>The honest counter</h2>
          <p>I should be honest about what this chart isn&apos;t.</p>
          <p>
            Income skew can mean a couple of things, and &ldquo;this tool
            is better for serious work&rdquo; is only one of them. The
            other obvious story is &ldquo;this tool has access friction
            that keeps lower-income users out.&rdquo;
          </p>
          <p>
            That explanation is partially true. Claude Pro costs the same
            $20 a month as ChatGPT Plus, so it isn&apos;t really about
            subscription price. But Claude&apos;s free tier is thinner, its
            rate limits are tighter, its surface area is narrower. You
            don&apos;t bump into Claude by accident the way you bump into
            Meta AI. To become a Claude user, you have to care enough to
            go find it.
          </p>
          <p>
            So yes, some of the 80% is self-selection driven by access
            friction, not pure preference. If Anthropic shipped a Gmail
            plug-in tomorrow and a Facebook integration next week, the
            distribution would slide toward the middle. I&apos;m reasonably
            sure of that.
          </p>
          <p>
            But here&apos;s the thing. That self-selection isn&apos;t a bug
            for a business conversation. It&apos;s the whole point.
          </p>
          <p>
            If I&apos;m a mid-market CEO trying to figure out which AI to
            deploy across my operations team, I don&apos;t care much what
            the average US consumer picks when the AI is handed to them for
            free. I care what the people doing serious knowledge work pick
            when they have to go find it themselves. The Epoch data is
            exactly that filter. It isn&apos;t a popularity contest.
            It&apos;s a revealed-preference signal from the subset of the
            population that most looks like my future operators.
          </p>

          <h2>So what does this mean if you&apos;re picking an AI for your business?</h2>
          <p>Here&apos;s the part I&apos;d want a mid-market CEO to hear.</p>
          <p>
            Benchmarks are useful. Model quality matters. Tool use matters.
            Managed-agent architecture matters. All of that is real, and
            you should push any vendor, including me, on it.
          </p>
          <p>
            But there&apos;s another kind of signal that matters too, and
            it&apos;s usually the one missing from AI buying decisions.
            The question of who else is using this tool, and why.
          </p>
          <p>
            When 80% of a major AI&apos;s user base is the slice of the
            country that does knowledge work and chooses its own tools,
            that&apos;s telling you something benchmarks can&apos;t.
            It&apos;s telling you the model is being trained, refined, and
            prioritized around the use cases that population cares about.
            Long-form reasoning, writing, coding, analysis, structured
            business workflows. The feedback loops between the users and
            the model are dense in exactly the work your operations team
            is going to do.
          </p>
          <p>
            The opposite is also true. A tool with a consumer-mirror user
            base is probably being tuned for mass consumer chat. Which is
            fine, if that&apos;s your use case. It&apos;s just not the use
            case most mid-market businesses actually have.
          </p>
          <p>
            So when I sit across from a CEO and he asks why we use Claude,
            I point to the benchmarks, the architecture, the deployment
            track record. Increasingly I also point to the chart.
          </p>
          <p>
            If you&apos;re still running a Copilot license IT set up a year
            ago because the seats were free, the chart is a cheap second
            opinion. You don&apos;t have to trust me that Claude is the
            right tool for operators. You can trust the operators
            themselves.
          </p>
        </div>

        <MagazineOutro
          author="Pranav Ambwani"
          related={[
            {
              title: "The AI You Dismissed Isn't the AI That's Here Now",
              description:
                "Most people tried ChatGPT once and formed an opinion. Meanwhile, frontier models like Claude are restructuring entire business workflows.",
              href: "/blog/the-ai-gap",
              category: "Perspective",
            },
            {
              title:
                "Why Your Enterprise Doesn't Need a Custom AI Model. It Needs Claude.",
              description:
                "Most companies think they need fine-tuned models or custom LLMs. After deploying Claude across 49 use cases, I've found that 95% of enterprise workflows work better with structured Claude than with any custom solution.",
              href: "/blog/why-claude-over-custom-ai",
              category: "Strategy",
            },
            {
              title:
                "Beyond the 7-Day Playbook: Deploying Claude AI Across a Real Organization",
              description:
                "What changes when you deploy Claude across 7 departments at a 200-person manufacturer, versus the 7-day small-team setup guide everyone reads.",
              href: "/blog/claude-team-deployment-beyond-diy",
              category: "Deployment",
            },
          ]}
        />
      </article>

      <Footer />
    </>
  );
}

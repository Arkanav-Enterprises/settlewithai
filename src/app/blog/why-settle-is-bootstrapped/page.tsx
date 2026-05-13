import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { BlogTOC } from "@/components/blog/BlogTOC";
import { Nav } from "@/components/layout/Nav";

export const metadata: Metadata = {
  title:
    "I ate frozen pizzas so I could buy bitcoin. That's why Settle is bootstrapped.",
  description:
    "The actual story behind Settle's runway. Paychecks, frozen pizza in LA, an on-chain Crypto Twitter account, Long Tail Ventures, BharatNiti.ai, and a few Indian micro-caps. None of it is a flex. It's the receipt for the freedom to walk away.",
  keywords: [
    "bootstrapped startup",
    "founder essay",
    "Settle AI",
    "Pranav Ambwani",
    "why bootstrapped",
    "bootstrap vs venture capital",
    "AI consultancy bootstrap",
    "Long Tail Ventures",
    "BharatNiti.ai",
    "holographic problem",
    "no product market fit",
    "killed a startup",
    "crypto founder runway",
    "Indian micro-caps",
    "deliberately small company",
  ],
  alternates: {
    canonical: "https://settlewithai.com/blog/why-settle-is-bootstrapped",
  },
  openGraph: {
    type: "article",
    title:
      "I ate frozen pizzas so I could buy bitcoin. That's why Settle is bootstrapped.",
    description:
      "Paychecks, on-chain mistakes, a fund I retired, and a startup I killed for no PMF. The receipt for the freedom to walk away. That's why Settle is bootstrapped.",
    url: "https://settlewithai.com/blog/why-settle-is-bootstrapped",
    siteName: "Settle",
    publishedTime: "2026-05-13T00:00:00Z",
    authors: ["Pranav Ambwani"],
    images: [
      {
        url: "/og-image.png",
        width: 1519,
        height: 1090,
        alt: "Why Settle is bootstrapped. Founder essay by Pranav Ambwani.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "I ate frozen pizzas so I could buy bitcoin. That's why Settle is bootstrapped.",
    description:
      "Paychecks, on-chain mistakes, a fund I retired, and a startup I killed for no PMF. The receipt for the freedom to walk away. That's why Settle is bootstrapped.",
  },
};

export default function Article() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "I ate frozen pizzas so I could buy bitcoin. That's why Settle is bootstrapped.",
    description:
      "The actual story behind Settle's runway. Paychecks, frozen pizza in LA, an on-chain Crypto Twitter account, Long Tail Ventures, BharatNiti.ai, and a few Indian micro-caps. None of it is a flex. It's the receipt for the freedom to walk away.",
    datePublished: "2026-05-13T00:00:00Z",
    dateModified: "2026-05-13T00:00:00Z",
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
      "@id": "https://settlewithai.com/blog/why-settle-is-bootstrapped",
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
              { "@type": "ListItem", position: 3, name: "Why Settle is bootstrapped", item: "https://settlewithai.com/blog/why-settle-is-bootstrapped" },
            ],
          }),
        }}
      />

      {/* Nav */}
      <Nav />

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
            I ate frozen pizzas so I could buy bitcoin. That&apos;s why Settle is bootstrapped.
          </h1>
          <p className="text-text-muted text-[17px] leading-relaxed">
            The actual story behind Settle&apos;s runway. Paychecks, frozen pizza
            in LA, an on-chain Crypto Twitter account, Long Tail Ventures,
            BharatNiti.ai, and a few Indian micro-caps. None of it is a flex.
            It&apos;s the receipt for the freedom to walk away.
          </p>
          <div className="flex items-center gap-3 mt-6 text-sm text-text-faint">
            <a href="/#contact" className="hover:text-accent transition-colors">Pranav Ambwani</a>
            <span>&middot;</span>
            <time dateTime="2026-05-13">May 2026</time>
            <span>&middot;</span>
            <span>9 min read</span>
          </div>
        </header>

        {/* Body */}
        <div className="prose-settle">

          <p>
            I lived in Los Angeles for most of my twenties. The pay was American,
            the rent was American, and so was the cost of pretty much everything
            else. But I had a habit nobody at work knew about. Most weeks I&apos;d
            skip dinner two or three times and eat a frozen pizza when I got
            home. Not because I couldn&apos;t afford food. Because I&apos;d
            already decided the money was going somewhere else.
          </p>
          <p>
            The money went into bitcoin.
          </p>
          <p>
            That sounds dramatic in hindsight. At the time it was just arithmetic.
            A close friend, one of the sharpest people I know, had been pulling
            me into a long conversation about money for weeks. The dollar
            wasn&apos;t unique, he said. It was one of many ways societies had
            agreed to count things, and there were better ones now. Then COVID
            hit, the printing presses opened, my paychecks felt smaller every
            month, and the arithmetic suddenly looked obvious.
          </p>
          <p>
            I started buying.
          </p>

          <h2>The first one</h2>
          <p>
            My dream was specific and small. I wanted to own one bitcoin. One
            whole coin, full stop. Not because I had a price target or a
            thesis-deck. Because owning one whole bitcoin felt like a marker.
            A line in the sand that said I noticed what was happening and I
            did something.
          </p>
          <p>
            It took longer than I thought. Months stretched into a year, then
            more. Some weeks I&apos;d put in a few hundred. Other weeks I&apos;d
            put in everything left after rent. The frozen pizza weeks are the
            ones I remember the most, not because I was suffering, but because
            they felt like the cheapest possible price for a kind of conviction
            I hadn&apos;t known I was capable of.
          </p>
          <p>
            Eventually I got there. One coin. Then, slowly, more.
          </p>

          <h2>On-chain, in public</h2>
          <p>
            My friend kept pulling me deeper. Ethereum next, then DeFi: pools,
            vaults, the strange and beautiful arithmetic of money that moves
            itself. I started writing about it. Not in a thoughtful long-form
            way. In threads, mostly. Half-baked observations. Trades I&apos;d
            just made. Ideas I&apos;d just lost money on.
          </p>
          <p>
            The account grew. I won&apos;t share the handles here, but they got
            reasonably big in a particular corner of Crypto Twitter. The thing
            that worked, I think, wasn&apos;t that I was right more often than
            other people. It was that everything I posted was on-chain. The good
            trades, the dumb ones, the times I bought a top, the times I caught
            a bottom. Every position was visible, and there was nowhere to hide.
            I didn&apos;t try to.
          </p>
          <p>
            That kind of transparency, when you&apos;re losing money in public,
            teaches you a different relationship with being wrong.
          </p>

          <h2>Twenty years in months</h2>
          <p>
            Somewhere in the middle of that run, I made my twenty-year salary
            in a few months. I want to be careful about how I phrase that,
            because saying it like that makes it sound inevitable, and it
            wasn&apos;t. The market was generous, my friend was generous with
            what he knew, and I was young enough that I could afford to put
            nearly everything I had at risk. None of that is replicable advice.
            It was a moment in time, and I happened to be standing in it.
          </p>
          <p>
            The money mattered for one specific reason. It bought me the receipt
            I needed to leave my job.
          </p>

          <h2>Long Tail Ventures, and what I learned by trying to raise</h2>
          <p>
            After I quit, I started a small fund. I called it Long Tail Ventures.
            The thesis was straightforward. Early-stage cheques, founders working
            on weird and specific things, hold longer than most funds want to
            hold. I&apos;d done enough investing on my own that the muscle was
            there. The discipline of a fund was new.
          </p>
          <p>
            I tried to raise a small first close. It went the way most
            first-time-fund raises go without an existing institutional track
            record. People were polite. The meetings were warm. The cheques were
            small. I learned, somewhat painfully, that being a good investor
            and being good at raising a fund are two completely different jobs.
          </p>
          <p>
            I&apos;m still proud of the deals. Twenty-five companies, around
            $1.3M of my own capital deployed, a handful that look like real
            outliers now. But I converted the fund into a passive vehicle within
            a year and stopped trying to raise it. Forcing it would have been
            a worse use of my time than building, and I was a builder at heart.
            The fund had been a detour.
          </p>

          <h2>Before Settle: BharatNiti, and the holographic problem</h2>
          <p>
            Settle isn&apos;t the first thing I&apos;ve bootstrapped. Before
            this, there was BharatNiti.ai.
          </p>
          <p>
            Same playbook. My capital, no outside money, full ownership, a
            small team I trusted. The idea sat at the intersection of civic
            technology and Indian policy. I cared about the problem space.
            I had the time and the reserves to chase it. We built. We shipped.
          </p>
          <p>
            It didn&apos;t work.
          </p>
          <p>
            Not because the team was wrong, not because the build was wrong,
            not because the timing was wrong. It didn&apos;t work because I
            was the wrong person looking at the wrong thing from the wrong
            angle. I&apos;d come at it from the markets. I&apos;d been
            spending all day reading capital flows, watching policy ripple
            through prices, thinking about how the country actually clears.
            From there, it looked like a gap was sitting in plain sight. But
            sitting closer to it, the gap dissolved. There was no specific
            user dragging me toward a specific pain. We were trying to force
            ourselves into a market.
          </p>
          <p>
            I have a word for that kind of problem now. Holographic. A problem
            that looks solid from a distance, that you can describe in a slide
            and nod about over coffee, but the closer you walk to it, the
            more you realise nobody is standing on the other side of it asking
            you to solve it.
          </p>
          <p>
            So we killed it. Cleanly. No long farewell post. No pretending the
            metrics were better than they were. The reserves had bought me the
            option to walk away, and the right move was to use the option.
          </p>
          <p>
            Settle is the first thing I&apos;ve built where the opposite
            happened. An operator walked us through a workflow and asked us
            to fix it. The work pulled us forward instead of us pushing it.
            That contrast is most of why I&apos;m sure about this one, and
            most of why the bootstrapped structure is the only one that fits.
          </p>

          <h2>What the desk looks like now</h2>
          <p>
            The public-markets side of my life looks pretty boring from the
            outside, which is how I like it. I&apos;m one of the larger
            individual holders in a few Indian micro-caps. Names like Shree
            Refrigerations, Yash High Voltage, and Techera Engineering. Names
            you&apos;ve probably never seen on a CNBC ticker. The pattern
            is the same one I&apos;ve used my whole adult life. Read everything,
            talk to operators, take a concentrated position in something I
            understand, hold longer than is comfortable.
          </p>
          <p>
            I trade a smaller book on the side, mostly for the love of the game.
            It isn&apos;t active income and I don&apos;t pretend it is. The
            next year looks good from where I&apos;m sitting, but the only
            honest version of that sentence ends with &ldquo;we&apos;ll see.&rdquo;
            Zerodha&apos;s verified-profile link is the closest thing Indian
            retail has to an audited statement, so I&apos;d rather show the
            page than describe the numbers:{" "}
            <a
              href="https://console.zerodha.com/verified/036658fe"
              className="text-accent hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              console.zerodha.com/verified/036658fe
            </a>
            .
          </p>
          <p>
            The same way I ran the Crypto Twitter account, on-chain and
            uncurated, I run my balance sheet now. If a position goes sideways,
            you&apos;ll see it.
          </p>

          <h2>Why this matters for Settle</h2>
          <p>
            I&apos;m telling you all of this for one reason. Settle, the
            company I&apos;m building right now, is bootstrapped. We&apos;ve
            taken no outside capital and I don&apos;t plan to.
          </p>
          <p>
            People sometimes assume that means we&apos;re too small to raise,
            or that we tried and couldn&apos;t, or that we&apos;re being
            precious about ownership. None of that is true. The reserves I
            built over the last nine years bought me one specific thing, and
            I think it&apos;s the only thing actually worth buying as a
            founder. The freedom to refuse money I don&apos;t need.
          </p>
          <p>
            A funded company has to scale. It has timelines that aren&apos;t
            its own. It has to make problems bigger than they are because the
            cap table needs the upside. Bootstrapped looks like a smaller
            version of the same game from the outside, but it&apos;s a
            different game entirely. The questions are different.{" "}
            <em>Is this worth doing?</em> replaces{" "}
            <em>Is this venture-scale?</em> The bar for shipping is different.
            The bar for <em>not</em> shipping is much higher, because the only
            reason to keep working on something is that it&apos;s still worth
            solving.
          </p>
          <p>
            I&apos;d rather work on a real problem at small scale than a fake
            problem at big scale.
          </p>

          <h2>The clearest version of the thesis</h2>
          <p>
            I&apos;m not settling for money. I don&apos;t need it. I want to
            solve a problem.
          </p>
          <p>
            If the problem I&apos;m working on right now stops being worth
            solving, if the market changes, if a bigger team does it better,
            if I look at it one Tuesday morning and realise the math
            doesn&apos;t compound anymore, I will retire it and move on to
            the next one. That option is the whole point. The reserves exist
            so that the option stays open.
          </p>
          <p>
            I&apos;m aware that sounds privileged. It is. The frozen-pizza
            weeks bought a privilege I didn&apos;t have at twenty-three, and
            I&apos;m honest about that. But the privilege isn&apos;t lifestyle.
            The privilege is being able to say <em>no</em> to capital,{" "}
            <em>no</em> to scope I don&apos;t believe in, and <em>no</em> to
            growth that would make the work worse. Most founders I know would
            take that trade if they could see it on offer.
          </p>
          <p>
            That&apos;s the part of the story I think is actually useful for
            other people to hear. Not the bitcoin lottery. The boring version.
            Save in something you believe in for long enough, take real risk
            while you&apos;re young enough to absorb it, and convert it
            eventually into the only asset that compounds for a builder: the
            freedom to walk away from work that isn&apos;t yours to do.
          </p>

          <h2>And about Settle, specifically</h2>
          <p>
            We work with manufacturers and mid-market operators who have real
            workflows that don&apos;t get solved by a ChatGPT seat. We deploy
            Claude AI into the parts of their business where the work actually
            happens. We go on-site. We deliver in weeks. I run every engagement
            personally.
          </p>
          <p>
            That model only works at small scale. It would be a worse business
            with thirty people in it. It would be an even worse business with a
            board demanding growth into a market we don&apos;t believe in. So
            we won&apos;t do that.
          </p>
          <p>
            We&apos;re deliberately small. We&apos;re deliberately selective.
            And we&apos;re bootstrapped because being bootstrapped is the only
            structure where we can mean what we say.
          </p>
          <p>
            The frozen pizzas, the on-chain account, the fund that didn&apos;t
            fundraise, the micro-caps. None of it is a flex. It&apos;s the
            receipt for the freedom to build the version of Settle I actually
            want to build, for as long as it&apos;s still worth building.
          </p>
          <p>
            If that stops being true, I&apos;ll tell you. Same way I told you
            everything else.
          </p>

          {/* Related */}
          <div className="mt-16 pt-10 border-t border-[rgba(20,20,19,0.1)]">
            <h3 className="text-lg font-medium mb-6">Related</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <a href="/blog/claude-design-homepage-video" className="group">
                <p className="font-medium group-hover:text-[#d97757] transition-colors">How I made Settle&apos;s homepage hero in Claude Design, in under an hour</p>
                <p className="text-sm text-[rgba(20,20,19,0.5)] mt-1">The exact workflow, what broke on the first try, and an honest frame on what Claude Design is and isn&apos;t good for.</p>
              </a>
              <a href="/blog/the-handover-plan" className="group">
                <p className="font-medium group-hover:text-[#d97757] transition-colors">The Handover Plan: anatomy of an AI rollout working session</p>
                <p className="text-sm text-[rgba(20,20,19,0.5)] mt-1">Every Settle Claude rollout ends with a single-page document. Eight rows, four modes, one line at the top that does most of the work.</p>
              </a>
            </div>
          </div>

          {/* Author */}
          <div className="mt-16 pt-8 border-t border-border-light flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#e8e6dc] flex items-center justify-center shrink-0 text-text font-medium text-lg" style={{ fontFamily: "var(--font-heading)" }}>P</div>
            <div>
              <a href="/#contact" className="font-medium text-text hover:text-accent transition-colors">Pranav Ambwani</a>
              <p className="text-sm text-text-muted mt-1 leading-relaxed">Founder of Settle. Deploys Claude AI into mid-market companies and manufacturers, on-site, in weeks. Previously bootstrapped Long Tail Ventures (25+ deals, $1.3M of personal capital). USC Electrical Engineering, 4.0 GPA across six consecutive semesters. Based between Los Angeles and New Delhi.</p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 pt-10 border-t border-border-light">
            <h3>Working on a real problem we can deploy AI into?</h3>
            <p>
              We work with manufacturers and mid-market operators who have
              workflows a ChatGPT seat doesn&apos;t solve. Production-grade
              Claude AI systems, on-site, in weeks.{" "}
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

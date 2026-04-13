import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { BlogTOC } from "@/components/blog/BlogTOC";
import { Nav } from "@/components/layout/Nav";

export const metadata: Metadata = {
  title: "We're Teaching Claude to Run a Printing Press",
  description:
    "Settle AI is building one of the first production deployments of Claude controlling physical industrial machinery. Not a chatbot. Not a copilot. An AI agent that starts, stops, and tunes a digital printing press through natural language.",
  keywords: [
    "AI manufacturing",
    "Claude AI industrial",
    "AI printing press",
    "MCP industrial automation",
    "AI factory floor",
    "Claude machine control",
    "AI agent manufacturing",
    "Orient printing AI",
    "industrial AI safety",
    "AI press operator",
  ],
  alternates: {
    canonical: "https://settlewithai.com/blog/claude-printing-press",
  },
  openGraph: {
    type: "article",
    title: "We're Teaching Claude to Run a Printing Press",
    description:
      "One of the first production deployments of Claude controlling physical industrial machinery. Here's how we built it — and why it's safe.",
    url: "https://settlewithai.com/blog/claude-printing-press",
    siteName: "Settle",
    publishedTime: "2026-04-13T00:00:00Z",
    authors: ["Pranav Ambwani"],
  },
  twitter: {
    card: "summary_large_image",
    title: "We're Teaching Claude to Run a Printing Press",
    description:
      "One of the first production deployments of Claude controlling physical industrial machinery.",
  },
};

export default function Article() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "We're Teaching Claude to Run a Printing Press",
    description:
      "Settle AI is building one of the first production deployments of Claude controlling physical industrial machinery — not a chatbot, not a copilot, but an AI agent that starts, stops, and tunes a digital printing press through natural language.",
    datePublished: "2026-04-13T00:00:00Z",
    dateModified: "2026-04-13T00:00:00Z",
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
      "@id": "https://settlewithai.com/blog/claude-printing-press",
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
                name: "We're Teaching Claude to Run a Printing Press",
                item: "https://settlewithai.com/blog/claude-printing-press",
              },
            ],
          }),
        }}
      />

      <Nav />

      {/* ── Video Hero (Path Robotics style) ── */}
      <section className="relative h-[85vh] min-h-[600px] flex items-end overflow-hidden">
        {/* Background video */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/blog/machine-control-dashboard.png"
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover"
          >
            {/* TODO: Replace with actual factory/press video */}
            <source src="/videos/orient-press.mp4" type="video/mp4" />
          </video>
          {/* Dark overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </div>

        {/* Hero text */}
        <div className="relative z-10 max-w-[900px] mx-auto px-6 lg:px-10 pb-16 md:pb-24">
          <a
            href="/blog"
            className="text-white/60 text-sm font-medium hover:text-white/90 transition-colors"
          >
            &larr; Blog
          </a>
          <h1
            className="text-[clamp(2.2rem,5vw,3.8rem)] font-medium leading-[1.08] mt-6 mb-5 text-white"
            style={{
              fontFamily: "var(--font-heading)",
              letterSpacing: "-0.03em",
            }}
          >
            We&apos;re Teaching Claude to Run a Printing Press
          </h1>
          <p className="text-white/70 text-[18px] leading-relaxed max-w-[600px]">
            One of the first production deployments of AI controlling physical
            industrial machinery. Not a chatbot. Not a copilot. An agent that
            operates.
          </p>
          <div className="flex items-center gap-3 mt-6 text-sm text-white/50">
            <span>Pranav Ambwani</span>
            <span>&middot;</span>
            <time dateTime="2026-04-13">April 2026</time>
            <span>&middot;</span>
            <span>7 min read</span>
          </div>
        </div>
      </section>

      {/* ── Article ── */}
      <article className="max-w-[720px] mx-auto px-6 lg:px-10 pt-16 pb-24 md:pt-24 md:pb-36">
        <div className="prose-settle">
          <p>
            Last month, I stood on a factory floor watching an operator juggle two laptops to start a single print job.
          </p>
          <p>
            One runs the printhead software &mdash; color calibration, nozzle health, job files. The other controls the physical transport: substrate tension, web speed, the mechanics of moving material through the press. Starting a job means bouncing between both systems, checking parameters on one screen, confirming settings on the other, then going back to the first to actually start printing.
          </p>
          <p>
            The operator has been doing this for years. He&apos;s fast. But &ldquo;fast at something unnecessarily complicated&rdquo; isn&apos;t the same as simple. And when something drifts mid-run &mdash; a nozzle dropping, tension reading off &mdash; he&apos;s diagnosing across two interfaces that don&apos;t talk to each other.
          </p>
          <p>
            I kept thinking: this is exactly the kind of problem AI should solve. Not because the operator can&apos;t do it. Because he shouldn&apos;t have to hold two separate mental models in his head just to run one machine.
          </p>

          <h2>So we built it</h2>
          <p>
            We gave Claude direct access to both machine systems. Ten purpose-built tools spanning printhead diagnostics, ink channel control, job management, web transport, speed, tension. The operator just talks.
          </p>
          <p>
            &ldquo;What&apos;s the nozzle health on the C-Series?&rdquo; Claude pulls the live data and responds in plain English: &ldquo;99.2%. All heads are clean.&rdquo; No dashboard. No login. No switching screens.
          </p>
          <p>
            &ldquo;Start the C-Series on job BRO-2204 at 28 m/min.&rdquo; Claude knows the right startup sequence &mdash; engage the transport system first, then start the print job. It shows the operator exactly what it&apos;s about to do, waits for a &ldquo;yes,&rdquo; and executes.
          </p>
          <p>
            One conversation instead of two systems.
          </p>

          {/* Command flow storyboard */}
          <figure className="my-10 lg:-mx-10">
            <img
              src="/blog/machine-control-command-flow.png"
              alt="Command flow diagram showing how a natural language command travels through Claude to machine APIs — read path for questions and write path for actions, each with operator confirmation"
              loading="lazy"
              width={1880}
              height={940}
              className="rounded-xl border border-border-light w-full"
            />
            <figcaption className="text-center text-sm text-text-faint mt-3">
              How a command travels. The read path (top) returns live machine data instantly. The write path (bottom) previews every action and waits for the operator&apos;s confirmation before executing.
            </figcaption>
          </figure>

          <p>
            I want to be careful about calling things &ldquo;first.&rdquo; The AI space moves fast and I&apos;m sure someone will correct me. But I genuinely don&apos;t know of another production deployment where Claude is controlling physical industrial machinery through natural language. Not a simulation. Not a demo. A real digital printing press, on a real factory floor, printing real jobs for real customers.
          </p>
          <p>
            This is Orient &mdash; The Printers House. Eight decades of printing and packaging machinery. Installations in 60+ countries. They&apos;re not a startup experimenting with AI for the press release. They&apos;re a manufacturer who needed their operators to move faster without adding complexity.
          </p>

          <h2>The read path alone is worth it</h2>
          <p>
            Before we even got to controlling the press, the read side changed how operators work.
          </p>
          <p>
            Every question an operator used to answer by opening a dashboard, logging into a system, navigating to the right screen, and reading a value &mdash; that entire workflow collapses into a sentence. Nozzle health across all machines. Ink density on a specific channel. Job progress, web tension, speed. All of it comes back in plain English, instantly.
          </p>
          <p>
            And it carries context. An operator asks about the C-Series, gets an answer, then says &ldquo;what about the L&amp;P?&rdquo; Claude knows they&apos;re asking the same question about the second machine. No re-explaining. No starting over.
          </p>

          {/* Machine fleet dashboard */}
          <figure className="my-10 lg:-mx-10">
            <img
              src="/blog/machine-control-dashboard.png"
              alt="Machine control dashboard showing two OrientJet presses — C-Series running at 30 m/min with 99.2% nozzle health and L&P Series on standby, each displaying live speed, job, web tension, ink channel density, and system connectivity status"
              loading="lazy"
              width={1880}
              height={940}
              className="rounded-xl border border-border-light w-full"
            />
            <figcaption className="text-center text-sm text-text-faint mt-3">
              The machine fleet dashboard. C-Series running job LABEL-0099 at 30 m/min, L&amp;P Series on standby. Live nozzle health, ink density, web tension, job progress &mdash; all visible at a glance.
            </figcaption>
          </figure>

          <p>
            This sounds small until you watch someone do it. The cognitive load difference between &ldquo;navigate to Meteor, find the nozzle diagnostics panel, check each head group&rdquo; and &ldquo;what&apos;s the nozzle health?&rdquo; is enormous when you&apos;re doing it dozens of times a day.
          </p>

          <h2>The safety question</h2>
          <p>
            This is the part everyone asks about, and honestly it&apos;s the part I&apos;m proudest of.
          </p>
          <p>
            We designed the safety architecture before we wrote a single line of integration code. The philosophy was simple: assume every layer will fail, and make sure the next one catches it.
          </p>
          <p>
            <strong>The operator is always in control.</strong> Every action Claude takes on the press is previewed first &mdash; exact parameters, exact sequence. The operator sees what&apos;s about to happen and confirms it. Nothing executes without a human &ldquo;yes.&rdquo; This isn&apos;t a checkbox people click through on autopilot. It&apos;s a structured preview showing real values they can verify against what they expect.
          </p>
          <p>
            <strong>The software enforces hard limits.</strong> Speed, ink density, every controllable parameter has bounds enforced in code. Even if something unexpected happens upstream, out-of-range values get rejected before they reach the machine. These aren&apos;t suggestions. They&apos;re walls.
          </p>
          <p>
            <strong>The machine protects itself.</strong> This is the layer most people forget about, and it&apos;s the one that matters most. Industrial presses have hardware interlocks &mdash; emergency stops, head height sensors, substrate guards. Physical safety systems that no software can override. They existed long before we showed up, and they don&apos;t care what Claude thinks. If a physical condition isn&apos;t met, the machine doesn&apos;t move. Period.
          </p>
          <p>
            Three layers. Each independent. Each sufficient on its own. Defense in depth &mdash; the same principle behind aircraft and nuclear safety systems.
          </p>
          <p>
            We thought about what could go wrong before we thought about what could go right. I think that&apos;s the only responsible way to put AI on a factory floor.
          </p>

          {/* Write path detail */}
          <figure className="my-10 lg:-mx-10">
            <img
              src="/blog/machine-control-write-path.png"
              alt="Detailed write path storyboard showing four steps: operator types a plain-language command, Claude previews the action with exact parameters, operator confirms, then Claude sequences the API calls and reports the machine is running"
              loading="lazy"
              width={1880}
              height={940}
              className="rounded-xl border border-border-light w-full"
            />
            <figcaption className="text-center text-sm text-text-faint mt-3">
              The write path in detail. Step 1: plain-language command. Step 2: Claude previews exact parameters. Step 3: operator confirms. Step 4: Claude sequences the APIs and confirms execution.
            </figcaption>
          </figure>

          <h2>What this changes</h2>
          <p>
            The printing industry has been digitizing for decades &mdash; digital presses, digital workflows, digital prepress. But the operator interface hasn&apos;t kept up. You still need specialized training to run each system. You still context-switch between software packages that were never designed to work together. The knowledge of how to operate these machines lives in the heads of experienced operators, and when they&apos;re not on shift, newer operators are slower and less confident.
          </p>
          <p>
            What we&apos;re building changes that equation. The machine&apos;s complexity doesn&apos;t go away &mdash; but it moves behind a conversational layer that any operator can use. Experienced operators get faster. Newer operators get more capable. And the institutional knowledge about how to run these machines stops being trapped in people&apos;s heads.
          </p>
          <p>
            Phase 1 is the OrientJet C-Series &mdash; CMYK digital press, the workhorse of the fleet. Phase 2 extends to the L&amp;P Series with its 8-channel extended color system. Same architecture, bigger surface area.
          </p>

          <h2>The bigger picture</h2>
          <p>
            Settle is an Anthropic Claude Partner. We work almost exclusively with manufacturers and operators running complex workflows &mdash; the kind of businesses where AI that lives in a browser tab isn&apos;t enough. We go on-site. We understand the machines. We build systems that work in the real world.
          </p>
          <p>
            If you&apos;re running a manufacturing operation and wondering whether AI can actually help on the factory floor &mdash; not in the back office, not in a dashboard, but on the floor where the work happens &mdash; I&apos;d like to talk.
          </p>
          <p>
            We&apos;re not selling a platform. We&apos;re not handing your team a chatbot and calling it transformation. We&apos;re building something specific, something that works, and something that&apos;s safe.
          </p>
          <p>
            That&apos;s the job.
          </p>

          {/* Related */}
          <div className="mt-16 pt-10 border-t border-[rgba(20,20,19,0.1)]">
            <h3 className="text-lg font-medium mb-6">Related</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <a href="/blog/orient-case-study" className="group">
                <p className="font-medium group-hover:text-[#d97757] transition-colors">
                  How a 79-Year-Old Manufacturer Deployed AI Across 7 Departments
                </p>
                <p className="text-sm text-[rgba(20,20,19,0.5)] mt-1">
                  49 use cases mapped, 18 projects structured, 11 deployed. The full story of Orient&apos;s AI transformation.
                </p>
              </a>
              <a href="/blog/orient-product-experience" className="group">
                <p className="font-medium group-hover:text-[#d97757] transition-colors">
                  How We Engineered an AI Product Expert for Orient
                </p>
                <p className="text-sm text-[rgba(20,20,19,0.5)] mt-1">
                  One knowledge base. Three surfaces. All consistent. From internal docs to customer-facing AI.
                </p>
              </a>
            </div>
          </div>

          {/* Author bio */}
          <div className="mt-16 pt-8 border-t border-border-light flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-full bg-[#e8e6dc] flex items-center justify-center shrink-0 text-text font-medium text-lg"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              P
            </div>
            <div>
              <a
                href="/#contact"
                className="font-medium text-text hover:text-accent transition-colors"
              >
                Pranav Ambwani
              </a>
              <p className="text-sm text-text-muted mt-1 leading-relaxed">
                Founder of Settle, an AI deployment studio for manufacturers. Works on-site with factory teams to build production-grade Claude systems. USC Electrical Engineering. Based between Los Angeles and New Delhi.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 pt-10 border-t border-border-light">
            <h3>Want AI that works on the factory floor?</h3>
            <p>
              We build Claude systems for manufacturers &mdash; on-site, production-grade, safe. Not chatbots. Systems that do the work.{" "}
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

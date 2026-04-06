import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { BlogTOC } from "@/components/blog/BlogTOC";

export const metadata: Metadata = {
  title:
    "How We Engineered an AI Product Expert for The Printers House Orient",
  description:
    "Orient had decades of product knowledge locked in internal docs. We didn't create new content — we unlocked what was already there and gave customers conversational access to it.",
  keywords: [
    "AI product experience",
    "AI chat widget",
    "knowledge base AI",
    "Claude AI product page",
    "AI-powered specifications",
    "B2B manufacturer AI",
    "Orient Printing AI",
    "conversational AI for manufacturing",
    "AI customer experience",
  ],
  alternates: {
    canonical: "https://settlewithai.com/blog/orient-product-experience",
  },
  openGraph: {
    type: "article",
    title:
      "How We Built Orient's AI-Powered Product Experience Using Their Existing Knowledge Base",
    description:
      "One knowledge base. Three interfaces. All consistent. Here's how we turned Orient's internal docs into a customer-facing AI product experience.",
    url: "https://settlewithai.com/blog/orient-product-experience",
    siteName: "Settle",
    publishedTime: "2026-04-07T00:00:00Z",
    authors: ["Pranav Ambwani"],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "How We Built Orient's AI-Powered Product Experience Using Their Existing Knowledge Base",
    description:
      "One knowledge base. Three interfaces. All consistent.",
  },
};

export default function Article() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "How We Built Orient's AI-Powered Product Experience Using Their Existing Knowledge Base",
    description:
      "Orient had decades of product knowledge locked in internal docs. We turned it into a public specs section and an AI chat widget, all from the same source of truth.",
    datePublished: "2026-04-07T00:00:00Z",
    dateModified: "2026-04-07T00:00:00Z",
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
      "@id": "https://settlewithai.com/blog/orient-product-experience",
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
              { "@type": "ListItem", position: 3, name: "Orient Product Experience", item: "https://settlewithai.com/blog/orient-product-experience" },
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
            &larr; Blog
          </a>
          <h1
            className="text-[clamp(2rem,4.5vw,3.2rem)] font-medium leading-[1.12] mt-8 mb-6"
            style={{
              fontFamily: "var(--font-heading)",
              letterSpacing: "-0.03em",
            }}
          >
            How We Engineered an AI Product Expert for The Printers House Orient
          </h1>
          <p className="text-text-muted text-[17px] leading-relaxed">
            Orient had decades of product knowledge locked inside internal documents. Pricing logic files, machine spec templates, offer generation instructions. Their sales team used these daily, but customers had zero self-serve access. We didn&apos;t need to create new content. We needed to unlock what was already there.
          </p>
          <div className="flex items-center gap-3 mt-6 text-sm text-text-faint">
            <a href="/#contact" className="hover:text-accent transition-colors">Pranav Ambwani</a>
            <span>&middot;</span>
            <time dateTime="2026-04-07">April 2026</time>
            <span>&middot;</span>
            <span>8 min read</span>
          </div>
        </header>

        {/* Body */}
        <div className="prose-settle">
          <h2>The knowledge was already there</h2>
          <p>
            This project started with a realisation I keep having. Companies think they need to <em>create</em> content for their website. Write product descriptions from scratch, hire a copywriter, spend weeks going back and forth on messaging.
          </p>
          <p>
            Orient didn&apos;t need any of that.
          </p>
          <p>
            During the <a href="/blog/orient-case-study">earlier AI deployment engagement</a>, I&apos;d already structured their internal knowledge base across 49 use cases. The sales team was using Claude daily to generate customer offers from machine specification templates, pricing logic documentation, and structured terms and conditions files. That knowledge base was clean, accurate, and maintained because the team relied on it every single day.
          </p>
          <p>
            The question was simple: what if we took that same knowledge and pointed it at the customer?
          </p>

          <h2>What we had to work with</h2>
          <p>
            Orient&apos;s internal knowledge base included:
          </p>
          <ul>
            <li>
              <strong>Machine specification templates</strong> with detailed component breakdowns for every Orient Jet digital press configuration (print heads, speeds, widths, electronics, finishing options)
            </li>
            <li>
              <strong>Pricing logic documentation</strong> covering how different configurations (C-Series vs L&amp;P, 600 dpi vs 1200 dpi, Kyocera vs Epson heads) map to capabilities
            </li>
            <li>
              <strong>Offer generation instructions</strong> that their team already used with Claude to produce customer-facing quotations
            </li>
            <li>
              <strong>Brand guidelines</strong> covering colours, typography, tone of voice, and visual identity
            </li>
          </ul>
          <p>
            All of this was already structured. Already verified. Already in daily use. The hard work was done.
          </p>

          <h2>The old site</h2>
          <p>
            Orient&apos;s existing website was a typical B2B machinery site. Dark backgrounds, stock imagery, a &ldquo;Request a Quote&rdquo; button, and a products dropdown that led to static pages with PDF downloads. If you wanted to know the max print width on a C-Series press, you&apos;d download a catalogue, open it, and search.
          </p>
          <figure className="my-10">
            <img
              src="/blog/orient-old-site-hero.png"
              alt="Orient's old website homepage showing dark industrial design with 'Request a Quote' button"
              loading="lazy"
              width={1440}
              height={720}
              className="rounded-lg border border-border-light"
            />
            <figcaption className="text-sm text-text-faint mt-3 text-center">
              The old tphorient.com. Functional, but no self-serve product information.
            </figcaption>
          </figure>
          <p>
            There&apos;s nothing wrong with this approach. It&apos;s how most industrial manufacturers present themselves online. But it means every product question requires human interaction. A prospect at 11pm in a different timezone? They wait.
          </p>

          <h2>Step 1: From internal docs to public specifications</h2>
          <p>
            I extracted the four core machine lines from Orient&apos;s internal spec sheets and surfaced them in a tabbed specifications section on the new landing page:
          </p>
          <ul>
            <li><strong>Orient Jet C-Series</strong> (high-speed duplex digital press)</li>
            <li><strong>Orient Jet L&amp;P Series</strong> (label and packaging press)</li>
            <li><strong>Orient X-Press Flex</strong> (flexographic printing)</li>
            <li><strong>Orient Offset Series</strong> (web offset printing)</li>
          </ul>
          <figure className="my-10">
            <img
              src="/blog/orient-new-site-specs-full.png"
              alt="New Orient site showing product cards and technical specifications section with tabbed interface"
              loading="lazy"
              width={1440}
              height={720}
              className="rounded-lg border border-border-light"
            />
            <figcaption className="text-sm text-text-faint mt-3 text-center">
              Product cards and the Technical Specifications section. Data pulled directly from Orient&apos;s internal knowledge base.
            </figcaption>
          </figure>
          <p>
            Each machine shows its key specs (print technology, resolution, max width, speed, media support, ink system) in a clean comparison layout. The data came directly from the same knowledge files their team uses to generate customer offers, so it&apos;s guaranteed accurate and consistent with what sales quotes.
          </p>
          <figure className="my-10">
            <img
              src="/blog/orient-ai-chat-response.png"
              alt="Orient AI chat showing a detailed comparison between C-Series and L&P Series presses, with differences in duplex capability, print heads, speed, and finishing"
              loading="lazy"
              width={1540}
              height={760}
              className="rounded-lg border border-border-light"
            />
            <figcaption className="text-sm text-text-faint mt-3 text-center">
              The AI chat in action. A customer asks about C-Series vs L&amp;P differences and gets a structured, accurate comparison drawn from Orient&apos;s spec data.
            </figcaption>
          </figure>
          <p>
            No new content was written. We structured what already existed.
          </p>

          <h2>Step 2: The AI chat widget</h2>
          <p>
            This is where it got interesting.
          </p>
          <p>
            I took the same machine specification knowledge and fed it into a scoped <a href="https://www.anthropic.com/claude" target="_blank" rel="noopener noreferrer">Claude</a> system prompt. Now, instead of browsing a table and guessing which machine fits their needs, a customer can just ask:
          </p>
          <ul>
            <li>&ldquo;What&apos;s the max print width on the C-Series?&rdquo;</li>
            <li>&ldquo;Can the L&amp;P Series do duplex?&rdquo;</li>
            <li>&ldquo;Which print head is fastest?&rdquo;</li>
            <li>&ldquo;What paper weights do your machines support?&rdquo;</li>
          </ul>
          <figure className="my-10">
            <img
              src="/blog/orient-ai-chat-widget.png"
              alt="Orient AI chat widget showing conversation interface with suggested questions about printing specifications"
              loading="lazy"
              width={1440}
              height={720}
              className="rounded-lg border border-border-light"
            />
            <figcaption className="text-sm text-text-faint mt-3 text-center">
              The AI chat widget. Suggested questions give visitors a starting point. Responses draw from the same spec data as the tables.
            </figcaption>
          </figure>
          <p>
            The AI responds in 2-4 factual sentences, drawing from the exact same spec data. If someone asks about pricing, it redirects to the sales team. Helpful without exposing internal numbers.
          </p>
          <p>
            Technical details: the chat uses Claude&apos;s Haiku model for sub-second response times, streams tokens in real-time so the user sees the answer being typed out, and runs stateless. No database, no session storage. Just the conversation in the current browser tab.
          </p>
          <p>
            I genuinely didn&apos;t expect how natural this would feel. You land on a product page, see the spec table, and if anything&apos;s unclear, you just... ask. It sounds simple, but I&apos;ve never seen a B2B machinery site do this before.
          </p>

          <h2>The pattern: one knowledge base, three surfaces</h2>
          <p>
            The key insight is that Orient&apos;s knowledge base now serves three surfaces:
          </p>
          <ol>
            <li><strong>Internal team</strong> uses Claude project instructions for offer generation, BOM creation, and troubleshooting</li>
            <li><strong>Website</strong> shows static spec tables pulled from the same source of truth</li>
            <li><strong>AI chat</strong> gives conversational access to the same knowledge, scoped for customer-appropriate responses</li>
          </ol>
          <p>
            One knowledge base. Three interfaces. All consistent.
          </p>
          <p>
            When Orient updates a spec (say, a new print head option), it flows through to all three. The offer generator, the spec table, and the chat responses all stay in sync. This is the part that makes the architecture worth talking about. It&apos;s not three separate content management problems. It&apos;s one.
          </p>

          <h2>What&apos;s possible next</h2>
          <p>
            The chat widget is a scoped AI agent, and the scope is adjustable. Here&apos;s what we can dial up:
          </p>
          <p>
            <strong>For lead qualification:</strong> Add a soft CTA after spec answers. &ldquo;Would you like a configured quote for this setup? I can connect you with our sales team.&rdquo; Capture the customer&apos;s use case from the conversation (what they&apos;re printing, volumes, substrate) and pass it to sales as a pre-qualified lead.
          </p>
          <p>
            <strong>For deeper product consultation:</strong> Expand the knowledge base to include application guides. &ldquo;Best configuration for flexible packaging&rdquo; or &ldquo;recommended setup for book printing.&rdquo; Add competitive comparison context so the AI can explain Orient&apos;s advantages without the customer needing to ask the right questions.
          </p>
          <p>
            <strong>For international prospects:</strong> The chat already knows Orient ships to 60+ countries and delivery is typically 4 months ex-works from Ballabhgarh. Could be extended with region-specific information like local partners, service centres, and installation support.
          </p>
          <p>
            <strong>For reducing sales cycle friction:</strong> A prospect landing on the site at 11pm in a different timezone gets immediate, accurate answers instead of waiting for a callback. The conversation history gives the sales team context before the first human interaction. They know what the prospect cares about before they even pick up the phone.
          </p>

          <h2>From brochure to experience</h2>
          <p>
            Traditional B2B machinery websites give you a PDF download and a &ldquo;Contact Us&rdquo; form. Orient&apos;s site now lets a potential customer:
          </p>
          <ol>
            <li>Browse machine specs visually (tabbed comparison)</li>
            <li>Ask specific questions in natural language (AI chat)</li>
            <li>Get answers in real-time, 24/7, in any language Claude supports</li>
            <li>Reach sales when they&apos;re ready, not before</li>
          </ol>
          <p>
            That&apos;s the difference between a brochure and an experience. And it was built entirely from knowledge that already existed inside the company.
          </p>
          <p>
            The lesson I keep coming back to: most companies don&apos;t have a content problem. They have a distribution problem. The knowledge exists. It&apos;s just locked in internal documents, tribal knowledge, and filing cabinets. The job isn&apos;t to create, it&apos;s to surface.
          </p>

          {/* Related */}
          <div className="mt-16 pt-10 border-t border-[rgba(20,20,19,0.1)]">
            <h3 className="text-lg font-medium mb-6">Related</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <a href="/blog/orient-case-study" className="group">
                <p className="font-medium group-hover:text-[#d97757] transition-colors">How a 79-Year-Old Manufacturer Deployed AI Across 7 Departments</p>
                <p className="text-sm text-[rgba(20,20,19,0.5)] mt-1">49 use cases mapped, 18 projects structured, 11 deployed. The full story of Orient&apos;s AI transformation.</p>
              </a>
              <a href="/blog/built-with-claude-code" className="group">
                <p className="font-medium group-hover:text-[#d97757] transition-colors">How We Built This Entire Site with Claude Code</p>
                <p className="text-sm text-[rgba(20,20,19,0.5)] mt-1">Every component was built in Claude Code sessions. Here&apos;s how a CLI tool shipped a full Next.js site.</p>
              </a>
            </div>
          </div>

          {/* Author */}
          <div className="mt-16 pt-8 border-t border-border-light flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#e8e6dc] flex items-center justify-center shrink-0 text-text font-medium text-lg" style={{ fontFamily: "var(--font-heading)" }}>P</div>
            <div>
              <a href="/#contact" className="font-medium text-text hover:text-accent transition-colors">Pranav Ambwani</a>
              <p className="text-sm text-text-muted mt-1 leading-relaxed">Founder of Settle. Deploys Claude AI into mid-market companies and manufacturers. Structured rollouts, production-grade instructions, real results.</p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 pt-10 border-t border-border-light">
            <h3>Want to unlock your team&apos;s knowledge base?</h3>
            <p>
              We help companies turn internal knowledge into customer-facing AI experiences. Same source of truth, multiple surfaces.{" "}
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

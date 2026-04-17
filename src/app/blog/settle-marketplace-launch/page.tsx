import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { BlogTOC } from "@/components/blog/BlogTOC";
import { Nav } from "@/components/layout/Nav";
import { MagazineHeader } from "@/components/blog/MagazineHeader";
import { MagazineOutro } from "@/components/blog/MagazineOutro";

export const metadata: Metadata = {
  title:
    "Settle Marketplace: The Agents We Built for Clients, Now for Sale",
  description:
    "Six production-tested AI agents from real enterprise deployments, billed by use, no contracts. Here's what we packaged, why, and how the 90-second buy-and-run flow actually works.",
  keywords: [
    "Settle Marketplace",
    "enterprise AI agents",
    "AI agent marketplace",
    "Claude agents for sale",
    "manufacturing AI agents",
    "Site Assistant chat widget",
    "Offer Generator AI",
    "BOM Generator AI",
    "pre-paid AI credits",
    "embeddable AI chat",
  ],
  alternates: {
    canonical:
      "https://settlewithai.com/blog/settle-marketplace-launch",
  },
  openGraph: {
    type: "article",
    title:
      "Settle Marketplace: The Agents We Built for Clients, Now for Sale",
    description:
      "Six production-tested AI agents from real enterprise deployments. Pre-paid credits, no subscriptions, 90 seconds from email to running an agent.",
    url: "https://settlewithai.com/blog/settle-marketplace-launch",
    siteName: "Settle",
    publishedTime: "2026-04-14T00:00:00Z",
    authors: ["Pranav Ambwani"],
    images: [
      {
        url: "/og-image.png",
        width: 1519,
        height: 1090,
        alt: "Settle Marketplace: The Agents We Built for Clients, Now for Sale — Settle",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Settle Marketplace: The Agents We Built for Clients, Now for Sale",
    description:
      "Six production-tested AI agents from real enterprise deployments. Pay per use, no contracts.",
  },
};

export default function Article() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "Settle Marketplace: The Agents We Built for Clients, Now for Sale",
    description:
      "Six production-tested AI agents from real enterprise deployments, billed by use, no contracts. Here's what we packaged, why, and how the 90-second buy-and-run flow actually works.",
    datePublished: "2026-04-14T00:00:00Z",
    dateModified: "2026-04-14T00:00:00Z",
    image: "https://settlewithai.com/og-image.png",
    author: {
      "@type": "Person",
      name: "Pranav Ambwani",
      jobTitle: "Founder",
      url: "https://settlewithai.com",
      sameAs: ["https://www.linkedin.com/in/pranavambwani/"],
      description: "Founder of Settle, a full-stack AI agency for manufacturers and mid-market teams. USC Electrical Engineering. Based between Los Angeles and New Delhi. Deploys Claude AI for operations — structured rollouts, production-grade instructions, real results.",
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
        "https://settlewithai.com/blog/settle-marketplace-launch",
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
                name: "Settle Marketplace",
                item: "https://settlewithai.com/blog/settle-marketplace-launch",
              },
            ],
          }),
        }}
      />

      <Nav />

      <MagazineHeader
        category="Product"
        issue="No. 01"
        title="Settle Marketplace: The Agents We Built for Clients, Now for Sale"
        deck="Six production-tested AI agents from real enterprise deployments. Pre-paid credits, no subscriptions, ninety seconds from email verification to a running agent."
        author="Pranav Ambwani"
        date="2026-04-14"
        readingTime="6 min read"
      />

      <article className="max-w-[720px] mx-auto px-6 lg:px-10 pb-24 md:pb-36">
        <div className="prose-settle">
          <p>
            A few weeks ago a manufacturer in Pune emailed asking if we could just build them an offer generator. Not a 49-use-case rollout. Not a six-month engagement. One agent. The thing they actually needed.
          </p>
          <p>
            We&apos;d already built that exact agent for another client. It was sitting in a Claude project, tested, tuned, in production. The honest answer was &ldquo;yes, in about an hour, but our smallest engagement is bigger than that.&rdquo;
          </p>
          <p>
            That email is the reason this post exists.
          </p>

          <h2>What we just shipped</h2>
          <p>
            <a href="https://marketplace.settlewithai.com" target="_blank" rel="noopener">marketplace.settlewithai.com</a> is live. Six production-tested agents, available individually, billed by use. No contracts, no subscriptions, no implementation calls.
          </p>
          <p>
            Five of the agents come straight from our deployment with The Printers House Orient, the manufacturer we&apos;ve written about a few times now. The sixth is a Site Assistant you can drop into any website with one line of code. It&apos;s the same pattern running on settlewithai.com right now, answering visitor questions about us.
          </p>
          <p>
            The point isn&apos;t that we built six new agents. It&apos;s that we packaged the ones we&apos;d already built and tested in a real factory into something a buyer can use in ninety seconds.
          </p>

          <figure className="my-10 lg:-mx-10">
            <img
              src="/blog/marketplace-catalog.png"
              alt="The Settle Marketplace catalog page showing six featured agents — Site Assistant, BOM Generator, Offer Generator, RFQ Template Builder, Configuration Suggestor, and Pricing Calculator — with category filters across the top"
              loading="lazy"
              width={3024}
              height={1472}
              className="rounded-xl border border-border-light w-full"
            />
            <figcaption className="text-center text-sm text-text-faint mt-3">
              The catalog at marketplace.settlewithai.com. Browse without an account, filter by category, click any agent for details.
            </figcaption>
          </figure>

          <h2>The catalog</h2>
          <p>
            <strong>Manufacturing (5).</strong> All built from the Orient deployment, all working in production today.
          </p>
          <ul>
            <li><strong>Offer Generator</strong>. Turns order specs into branded sales offers with pricing, terms, and timelines. The original cut offer-creation time at Orient from 4 hours to 30 minutes.</li>
            <li><strong>BOM Generator</strong>. Converts order details into structured bills of materials.</li>
            <li><strong>Pricing Calculator</strong>. Quotes complex machine configurations with margin analysis.</li>
            <li><strong>Configuration Suggestor</strong>. Recommends optimal machine setups from customer requirements.</li>
            <li><strong>RFQ Template Builder</strong>. Generates vendor-ready RFQ documents.</li>
          </ul>
          <p>
            <strong>Site Assistant (1).</strong> A custom ChatGPT for any website. Embed it in one line, train it on your business context, restrict it to your own domains, customize the brand colors. It&apos;s deflecting an estimated 40 to 60% of common visitor questions on the marketing sites that have deployed it so far.
          </p>

          <h2>The obvious objection, addressed</h2>
          <p>
            Most of these tasks Claude can do natively in a single shot. I know. You know. Anyone reading this knows.
          </p>
          <p>
            The reason these agents exist as products is that &ldquo;Claude can do this&rdquo; and &ldquo;Claude does this correctly with your pricing rules, your terminology, your brand voice, your output format, and your guardrails&rdquo; are not the same sentence. The gap between those two is where every real deployment lives. It&apos;s the part that takes iteration, testing against edge cases, and the kind of feedback you only get from running an agent against actual customer orders.
          </p>
          <p>
            That work is already done. We&apos;re selling the result.
          </p>

          <h2>Two ways to run an agent</h2>
          <p>
            Most agents in the marketplace ship in two delivery modes, and customers pick the one that fits how they work.
          </p>
          <p>
            <strong>Hosted.</strong> You get an API key and a web runner. Settle hosts the agent, manages the model calls, and bills per use against your credit balance. This is the &ldquo;just give me an endpoint&rdquo; option. Use it in your own product, run it from the dashboard, hit the REST API from a script.
          </p>
          <p>
            <strong>Template.</strong> You get the full Claude Project package: the system prompt, the structured instructions, the example outputs, the guardrails. You paste it into your own Claude workspace and own it from there. Customize the prompt, change the brand voice, modify the output format. Settle isn&apos;t in the loop after the download.
          </p>
          <p>
            Hosted is what you want when you don&apos;t want to think about prompts. Template is what you want when you do.
          </p>

          <figure className="my-10 lg:-mx-10">
            <img
              src="/blog/marketplace-agent-runner.png"
              alt="The BOM Generator agent runner page — left side has a Run Agent form with machine model, configuration, quantity, and special requirements fields. Right side shows the API Key, This Month usage stats, and delivery details panels"
              loading="lazy"
              width={3024}
              height={1472}
              className="rounded-xl border border-border-light w-full"
            />
            <figcaption className="text-center text-sm text-text-faint mt-3">
              The hosted runner for the BOM Generator. Same page exposes the API key for programmatic use and live usage stats for the month.
            </figcaption>
          </figure>

          <h2>Pricing that doesn&apos;t need a sales call</h2>
          <p>
            Credits, pre-paid, no subscriptions. Three top-up packages: $10 with no bonus, $25 with a 10% bonus, $50 with a 15% bonus. Credits never expire.
          </p>
          <p>
            Each agent debits between $0.05 and $0.35 per use depending on what it does. The Site Assistant is at the cheap end. The Pricing Calculator, which does heavier reasoning over machine configurations, is at the higher end. You see the per-use cost on the agent page before you add it.
          </p>
          <p>
            Behind the credit balance is the kind of plumbing buyers expect from Stripe or Twilio. Atomic debits with refund-on-failure, monthly spending caps, low-balance alerts, full transaction history. If a model call fails halfway through, your credits come back. If you set a $50 monthly cap, the system stops you at $50.
          </p>

          <figure className="my-10 lg:-mx-10">
            <img
              src="/blog/marketplace-dashboard.png"
              alt="The My Agents dashboard showing account credits at $0.00 with a Top up now button, a transaction history panel, the monthly spending cap controls, a low-balance alert, and the same BOM Generator agent listed twice — once as HOSTED and once as TEMPLATE"
              loading="lazy"
              width={3024}
              height={1472}
              className="rounded-xl border border-border-light w-full"
            />
            <figcaption className="text-center text-sm text-text-faint mt-3">
              The customer dashboard. Credit balance, monthly cap, transaction history, and active agents in one view. The same agent can run as both Hosted and Template, billed independently.
            </figcaption>
          </figure>

          <h2>The 90-second flow</h2>
          <p>
            I want to explain why this matters before I list the steps.
          </p>
          <p>
            Every enterprise software flow I&apos;ve sat through in the last year has assumed the buyer is willing to do twenty minutes of work to try a thing. Account creation, profile fields, SSO integration, a sales call, a sandbox environment, a quote. By the time you&apos;ve seen the product, you&apos;ve already invested enough that you feel obligated to use it.
          </p>
          <p>
            We pushed hard against that. The full path:
          </p>
          <ol>
            <li>Browse the marketplace. No login required to look.</li>
            <li>Enter your email. Get a six-digit code from Resend. Type it in.</li>
            <li>Top up credits with Razorpay. $10 minimum.</li>
            <li>Add an agent to your account. (Adding is free. The credits debit when you actually run it.)</li>
            <li>Run it from the web UI, hit the REST API with your unique key, or paste the template into a Claude Project.</li>
          </ol>
          <p>
            No password. No profile. No SSO setup. Email plus a six-digit code is your session. The whole thing is under a minute and a half.
          </p>

          <h2>Why the Site Assistant is its own thing</h2>
          <p>
            The five manufacturing agents are sector-specific. The Site Assistant is the one that fits almost any business with a website.
          </p>
          <p>
            You drop a single iframe tag into your site. It loads a branded chat widget. You feed it the context you want it to know about, which can be anything from a product catalog to a service FAQ to a company background doc. It answers visitor questions live, in your tone, scoped to your business.
          </p>
          <p>
            Two details that mattered to us when we built it. First, the domain whitelist. You list which domains your widget is allowed to load on. If your key leaks, it&apos;s useless on someone else&apos;s site. Second, the streaming. Responses appear word by word as the model generates them, which is the difference between a chat that feels alive and a chat that feels like a form submission.
          </p>
          <p>
            If you want to see it without buying anything, scroll down on this site. The widget at the bottom is the same product.
          </p>

          <h2>Who this is for, and who it isn&apos;t</h2>
          <p>
            If you&apos;re a manufacturer with the same shape of problem Orient had, you can grab the BOM Generator and the Pricing Calculator today, plug them into your sales workflow, and skip the engagement entirely. That&apos;s the easiest case.
          </p>
          <p>
            If you&apos;re a marketing or product team that wants a smart chat on your site this week, the Site Assistant is genuinely a one-afternoon job. We&apos;re using it ourselves.
          </p>
          <p>
            If you&apos;re a larger company with workflows that don&apos;t look like any of these six agents, the marketplace isn&apos;t the right entry point and we won&apos;t pretend it is. That&apos;s still a conversation. The custom-agent CTA on the marketplace page exists for that reason.
          </p>

          <h2>What I&apos;m going to learn from this</h2>
          <p>
            Honestly I don&apos;t know which agents are going to sell. My guess is the Site Assistant outsells the manufacturing agents by a wide margin because the addressable market is everyone with a website. But the manufacturing agents are the ones with the deepest production lineage, and I think a few sector buyers will recognize that and grab the whole bundle.
          </p>
          <p>
            What I&apos;m more interested in is which ones get used after they&apos;re bought. The credit balance gives us a clean signal. If an agent gets added but never debited, the agent is wrong, the docs are wrong, or the buyer didn&apos;t need it in the first place. Any of those is useful information.
          </p>
          <p>
            More agents will land in the catalog over the next few weeks. The pattern is the same one we&apos;re using now: an agent earns a slot in the marketplace by surviving a real client deployment first.
          </p>

          <h2>Try it</h2>
          <p>
            Browse the catalog at <a href="https://marketplace.settlewithai.com" target="_blank" rel="noopener">marketplace.settlewithai.com</a>. You don&apos;t need an account to look. If something fits, the path from email to a running agent is shorter than this paragraph took to read.
          </p>
        </div>

        <MagazineOutro
          author="Pranav Ambwani"
          related={[
            {
              category: "Case Study",
              title: "The Orient Case Study",
              description:
                "The 79-year-old manufacturer behind five of the agents in the marketplace. 49 use cases mapped, 11 deployed.",
              href: "/blog/orient-case-study",
            },
            {
              category: "Technical",
              title:
                "We Added a Custom AI Chat to Our Website in One Afternoon",
              description:
                "The architecture behind the Site Assistant, written before it was a product.",
              href: "/blog/ai-chat-on-your-website",
            },
          ]}
          ctaHeading="Browse the marketplace"
          ctaBody={
            <>
              Six production-tested agents, pre-paid credits, no contracts.
              Ninety seconds from email to running.{" "}
              <a
                href="https://marketplace.settlewithai.com"
                target="_blank"
                rel="noopener"
                className="text-accent font-medium hover:underline"
              >
                Open Marketplace →
              </a>
            </>
          }
        />
      </article>

      <Footer />
    </>
  );
}

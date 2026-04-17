import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { BlogTOC } from "@/components/blog/BlogTOC";
import { Nav } from "@/components/layout/Nav";

export const metadata: Metadata = {
  title:
    "We Added a Custom AI Chat to Our Website in One Afternoon",
  description:
    "Every business has the same FAQ problem. Visitors have questions, the answers exist, but nobody reads a FAQ page. We built an AI that answers them live — and we can do it for any business.",
  keywords: [
    "AI chat widget",
    "Claude AI website chat",
    "custom AI chatbot",
    "business AI assistant",
    "AI customer support",
    "Claude Haiku chatbot",
    "enterprise AI chat",
    "AI FAQ replacement",
    "website AI integration",
    "Settle AI deployment",
  ],
  alternates: {
    canonical:
      "https://settlewithai.com/blog/ai-chat-on-your-website",
  },
  openGraph: {
    type: "article",
    title:
      "We Added a Custom AI Chat to Our Website in One Afternoon",
    description:
      "Every business has the same FAQ problem. We replaced ours with a live AI that knows everything about our services. Here's why — and how we do it for clients.",
    url: "https://settlewithai.com/blog/ai-chat-on-your-website",
    siteName: "Settle",
    publishedTime: "2026-04-10T00:00:00Z",
    authors: ["Pranav Ambwani"],
    images: [
      {
        url: "/og-image.png",
        width: 1519,
        height: 1090,
        alt: "We Added a Custom AI Chat to Our Website in One Afternoon — Settle",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "We Added a Custom AI Chat to Our Website in One Afternoon",
    description:
      "Every business has the same FAQ problem. We replaced ours with a live AI that knows everything about our services.",
  },
};

export default function Article() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "We Added a Custom AI Chat to Our Website in One Afternoon",
    description:
      "Every business has the same FAQ problem. Visitors have questions, the answers exist, but nobody reads a FAQ page. We built an AI that answers them live.",
    datePublished: "2026-04-10T00:00:00Z",
    dateModified: "2026-04-10T00:00:00Z",
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
        "https://settlewithai.com/blog/ai-chat-on-your-website",
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
              { "@type": "ListItem", position: 3, name: "AI Chat on Your Website", item: "https://settlewithai.com/blog/ai-chat-on-your-website" },
            ],
          }),
        }}
      />

      <Nav />

      <article className="max-w-[720px] mx-auto px-6 lg:px-10 pt-32 pb-24 md:pt-40 md:pb-36">
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
            We Added a Custom AI Chat to Our Website in One Afternoon
          </h1>
          <p className="text-text-muted text-[17px] leading-relaxed">
            Every business has the same FAQ problem. Visitors have questions,
            the answers exist somewhere, but nobody reads a FAQ page. So we
            replaced ours with an AI that answers them live.
          </p>
          <div className="flex items-center gap-3 mt-6 text-sm text-text-faint">
            <a href="/#contact" className="hover:text-accent transition-colors">Pranav Ambwani</a>
            <span>&middot;</span>
            <time dateTime="2026-04-10">April 2026</time>
            <span>&middot;</span>
            <span>5 min read</span>
          </div>
        </header>

        <div className="prose-settle">
          <h2>The problem with FAQ pages</h2>
          <p>
            We had a perfectly good FAQ section on our site. Seven questions,
            clear answers, covers the most common objections. Nobody read it.
          </p>
          <p>
            The people who needed it most &mdash; the ones still unsure whether
            AI deployment is realistic for their business &mdash; were bouncing
            before they scrolled that far. And the ones who did scroll past it
            wanted answers to questions we hadn&apos;t thought to list.
          </p>
          <p>
            So we built something better. If you scroll down on{" "}
            <a href="https://settlewithai.com">settlewithai.com</a>, there&apos;s
            now an AI you can talk to. Ask it anything about how we work, what
            we deploy, whether your data is safe, what the first month looks
            like. It answers in real time, with actual knowledge about our
            business.
          </p>

          <figure className="my-10">
            <img
              src="/blog/ai-chat-empty.png"
              alt="The Ask Claude section on settlewithai.com with suggestion pills and an empty input"
              className="rounded-xl border border-border-light w-full"
            />
            <figcaption className="text-center text-sm text-text-faint mt-3">
              The chat section on our homepage, ready for questions.
            </figcaption>
          </figure>

          <h2>Why this works better than static content</h2>
          <p>
            A FAQ page is a guess. You write down the questions you think people
            will ask, and hope the phrasing matches what they actually want to
            know. If someone asks &ldquo;do I need a technical team?&rdquo; and
            your FAQ says &ldquo;do employees need AI skills?&rdquo; &mdash;
            they might not make the connection.
          </p>
          <p>
            An AI trained on your business doesn&apos;t have that problem. It
            understands the question regardless of how it&apos;s phrased, pulls
            the relevant context, and gives a clear answer. No scanning, no
            ctrl+F, no hoping the exact phrase is on the page.
          </p>
          <p>
            The other advantage: it handles follow-ups. A FAQ is one-directional.
            A conversation builds on itself. Someone asks about your process,
            then asks how it works for their specific industry, then asks about
            data security. The AI handles the thread naturally because it holds
            the full context of the conversation.
          </p>

          <figure className="my-10">
            <img
              src="/blog/ai-chat-response.png"
              alt="The Ask Claude section streaming a live response about Settle's deployment process"
              className="rounded-xl border border-border-light w-full"
            />
            <figcaption className="text-center text-sm text-text-faint mt-3">
              A live response streaming in real time. The green dot confirms the system is online.
            </figcaption>
          </figure>

          <h2>What&apos;s behind it</h2>
          <p>
            The AI on our site runs on Claude, the same model family we deploy
            for every client engagement. The site uses a lighter variant for
            speed &mdash; our clients get the most capable models tuned to their
            specific business.
          </p>
          <p>
            The knowledge base is baked directly into the system. Everything
            the AI knows about Settle &mdash; our services, our four-phase
            process, our deployment tiers, security practices, the Orient case
            study &mdash; lives in a structured prompt. No vector database, no
            retrieval pipeline, no external search. Just well-organized
            information that the model can reference when answering.
          </p>
          <p>
            It streams responses in real time so you see the answer forming as
            it&apos;s generated. It refuses to discuss pricing (that&apos;s a
            conversation for a real call). It stays on topic. And it redirects
            off-topic questions back to what it actually knows.
          </p>

          <h2>We do this for every client</h2>
          <p>
            The version on our site is a demonstration, but the pattern is
            identical to what we deploy for businesses. The only differences
            are scale and depth.
          </p>
          <p>
            For a client, the knowledge base contains their entire product
            catalog, pricing logic, brand guidelines, technical specifications,
            service procedures, and internal policies. The AI doesn&apos;t just
            answer generic questions &mdash; it generates sales proposals,
            drafts vendor communications, troubleshoots technical issues, and
            handles customer inquiries with their actual data.
          </p>
          <p>
            One of our clients, a printing machinery manufacturer with
            installations across 50+ countries, uses this exact architecture
            for their customer-facing product assistant. A visitor asks about
            a specific press model, the AI pulls specs, suggests configurations,
            and explains capabilities &mdash; all scoped to that product, all
            in the company&apos;s voice.
          </p>
          <p>
            The setup is fast. If you have your business information
            documented &mdash; product specs, FAQs, service docs, pricing
            rules &mdash; the core system takes days to build, not months. The
            depth comes from the knowledge you feed it, not from infrastructure
            complexity.
          </p>

          <h2>What this means for your business</h2>
          <p>
            Every company has domain knowledge trapped in documents, wikis,
            email threads, and the heads of senior employees. An AI chat
            trained on that knowledge makes it accessible to anyone &mdash;
            customers, new hires, sales teams, support staff &mdash; without
            them needing to know where to look.
          </p>
          <p>
            The technology is mature enough that this isn&apos;t experimental.
            It&apos;s production infrastructure. The question isn&apos;t
            whether it works &mdash; it&apos;s whether your competitors will
            deploy it before you do.
          </p>
          <p>
            If you want to see what this looks like for your business,{" "}
            <a href="/#contact">start a conversation</a>. Or just try the
            AI on our homepage first. It&apos;s right there, ready to answer.
          </p>
        </div>

        {/* CTA */}
        <section className="mt-20 lg:-mx-10 lg:px-10 py-14 bg-accent rounded-2xl text-center">
          <h2
            className="text-[clamp(1.4rem,3vw,2rem)] font-semibold leading-tight tracking-[-0.02em] text-white mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Want an AI chat for your business?
          </h2>
          <p className="text-white/80 text-[1rem] mb-6 max-w-md mx-auto">
            We build custom AI assistants trained on your business in days,
            not months. Same architecture, your data.
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 bg-white text-accent font-medium text-[0.95rem] px-6 py-3 rounded-full hover:bg-white/90 transition-colors"
          >
            Get Started
            <span aria-hidden="true">&rarr;</span>
          </a>
        </section>

        {/* Further reading */}
        <section className="mt-16">
          <h2
            className="text-xl font-semibold tracking-[-0.02em] text-text mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Further reading
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <a href="/blog/orient-case-study" className="group block">
              <h3 className="text-[1rem] font-medium text-text group-hover:text-accent transition-colors mb-1">
                Orient Case Study
              </h3>
              <p className="text-sm text-text-muted line-clamp-2">
                How we deployed 11 production AI systems for a 79-year-old
                manufacturer in under 60 days.
              </p>
            </a>
            <a href="/blog/the-client-brain" className="group block">
              <h3 className="text-[1rem] font-medium text-text group-hover:text-accent transition-colors mb-1">
                The Client Brain
              </h3>
              <p className="text-sm text-text-muted line-clamp-2">
                The knowledge wiki system that keeps 18 Claude projects
                consistent for a single client.
              </p>
            </a>
          </div>
        </section>

        {/* Author */}
        <div className="mt-16 pt-8 border-t border-border-light flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-[#e8e6dc] flex items-center justify-center shrink-0 text-text font-medium text-lg" style={{ fontFamily: "var(--font-heading)" }}>P</div>
          <div>
            <a href="/#contact" className="font-medium text-text hover:text-accent transition-colors">Pranav Ambwani</a>
            <p className="text-sm text-text-muted mt-1 leading-relaxed">Founder of Settle. Deploys Claude AI into mid-market companies and manufacturers — structured rollouts, production-grade instructions, real results.</p>
          </div>
        </div>
      </article>

      <Footer />
    </>
  );
}

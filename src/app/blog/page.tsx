import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { BLOG_POSTS } from "@/content/blog-posts";

export const metadata: Metadata = {
  title: { absolute: "Field Notes — Settle" },
  description:
    "Case studies, playbooks, and field notes on deploying Claude AI inside manufacturers, mid-market companies, and traditional businesses.",
  alternates: {
    canonical: "https://settlewithai.com/blog",
  },
  openGraph: {
    title: "Field Notes — Settle",
    description:
      "Case studies, playbooks, and field notes on deploying Claude AI inside real businesses.",
    url: "https://settlewithai.com/blog",
    images: [
      {
        url: "/og-image.png",
        width: 1519,
        height: 1090,
        alt: "Field Notes — Settle",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Field Notes — Settle",
    description:
      "Case studies, playbooks, and field notes on deploying Claude AI inside real businesses.",
    images: ["/og-image.png"],
  },
};

const posts = BLOG_POSTS;

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function monthYear(iso: string) {
  return new Date(iso + "T00:00:00")
    .toLocaleDateString("en-US", { month: "long", year: "numeric" })
    .toUpperCase();
}

export default function BlogIndex() {
  const [lead, secondaryA, secondaryB, ...rest] = posts;
  const latestMonth = monthYear(lead.date);
  const issueNumber = `No. ${String(posts.length).padStart(2, "0")}`;

  // Group the archive by month for newspaper-style section rules.
  const grouped = rest.reduce<Record<string, typeof rest>>((acc, post) => {
    const key = monthYear(post.date);
    (acc[key] = acc[key] ?? []).push(post);
    return acc;
  }, {});
  const archiveSections = Object.entries(grouped);

  return (
    <main className="min-h-screen bg-bg">
      <Nav />

      {/* ── Masthead ──────────────────────────────
         Full-width rule up top carrying the publication name, issue, and
         month. This is the single most important "you're reading something
         curated" signal on the page. */}
      <section className="pt-28 md:pt-36">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between pb-6 border-b-2 border-text/80 text-[10.5px] md:text-[11px] uppercase tracking-[0.18em] text-text-faint">
            <span className="text-text font-medium">Settle Field Notes</span>
            <div className="hidden sm:flex items-center gap-4 md:gap-6">
              <span>{issueNumber}</span>
              <span className="text-text-faint/50">·</span>
              <span>{latestMonth}</span>
              <span className="text-text-faint/50">·</span>
              <span>New Delhi</span>
            </div>
            <span className="sm:hidden">{latestMonth}</span>
          </div>

          {/* Wordmark — huge serif, one accent word, hairline below */}
          <div className="pt-10 md:pt-14 pb-8 md:pb-12">
            <h1
              className="text-[clamp(3.5rem,12vw,10rem)] font-medium leading-[0.92] text-text"
              style={{
                fontFamily: "var(--font-heading)",
                letterSpacing: "-0.055em",
              }}
            >
              Field <span className="text-accent italic">Notes</span>
            </h1>
            <p className="mt-6 md:mt-8 max-w-[620px] text-[17px] md:text-[19px] leading-[1.55] text-text-muted italic" style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.015em" }}>
              Dispatches from the factory floor, the service desk, and the sales
              pipeline — where Claude AI is quietly doing the work the rest of
              the industry is still pitching decks about.
            </p>
          </div>
          <div className="h-px bg-text/80" />
        </div>
      </section>

      {/* ── Lead piece ────────────────────────────
         Two-column spread on desktop, stacked on mobile. Huge serif title
         takes roughly 2/3 of the width, meta + excerpt + CTA live in the
         remaining third. Modelled on a magazine cover story. */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-10 pt-12 md:pt-20">
        <Link
          href={`/blog/${lead.slug}`}
          className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
        >
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-5 md:mb-7 text-[10.5px] uppercase tracking-[0.18em]">
              <span className="text-accent font-medium">Cover Story</span>
              <span className="text-text-faint/50">·</span>
              <span className="text-text-faint">{lead.tag}</span>
              <span className="text-text-faint/50">·</span>
              <span className="text-text-faint">{formatDate(lead.date)}</span>
            </div>
            <h2
              className="text-[clamp(2.25rem,5.5vw,4.5rem)] font-medium leading-[1.02] text-text group-hover:text-accent transition-colors duration-300"
              style={{
                fontFamily: "var(--font-heading)",
                letterSpacing: "-0.04em",
              }}
            >
              {lead.title}
            </h2>
          </div>
          <aside className="lg:col-span-4 lg:pl-8 lg:border-l lg:border-border-light flex flex-col justify-end">
            <p
              className="text-[clamp(1.05rem,1.4vw,1.2rem)] leading-[1.55] text-text-muted italic mb-5"
              style={{
                fontFamily: "var(--font-heading)",
                letterSpacing: "-0.01em",
              }}
            >
              {lead.description}
            </p>
            <span className="inline-flex items-center gap-2 text-[13px] font-medium text-text group-hover:text-accent transition-colors">
              Read the piece
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </span>
          </aside>
        </Link>
      </section>

      {/* ── Secondary spread ──────────────────────
         The two next-most-recent posts, side-by-side on desktop, divided by
         a vertical hairline. On mobile they stack with a horizontal rule. */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-10 pt-16 md:pt-24">
        <div className="h-px bg-text/80 mb-12 md:mb-16" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-0">
          {[secondaryA, secondaryB].map((post, i) =>
            post ? (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`group block ${
                  i === 0
                    ? "md:pr-10 lg:pr-14"
                    : "md:pl-10 lg:pl-14 md:border-l md:border-border-light"
                }`}
              >
                <div className="flex items-center gap-3 mb-4 text-[10.5px] uppercase tracking-[0.16em] text-text-faint">
                  <span className="tabular-nums">
                    {String(i + 2).padStart(2, "0")}
                  </span>
                  <span className="text-text-faint/50">·</span>
                  <span className="text-accent">{post.tag}</span>
                  <span className="text-text-faint/50">·</span>
                  <span>{formatDate(post.date)}</span>
                </div>
                <h3
                  className="text-[clamp(1.5rem,2.8vw,2.15rem)] font-medium leading-[1.12] text-text group-hover:text-accent transition-colors duration-200 mb-4"
                  style={{
                    fontFamily: "var(--font-heading)",
                    letterSpacing: "-0.035em",
                  }}
                >
                  {post.title}
                </h3>
                <p className="text-[15.5px] leading-[1.65] text-text-muted max-w-[520px]">
                  {post.description}
                </p>
              </Link>
            ) : null
          )}
        </div>
      </section>

      {/* ── Archive ───────────────────────────────
         Grouped-by-month list. Each group has a kicker rule with the month
         name, followed by a 3-col grid of cards on desktop. Posts use a
         folio number for a print-run feel. */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-10 pt-20 md:pt-28 pb-24 md:pb-36">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-accent">
            The Archive
          </span>
          <span className="flex-1 h-px bg-border-light" aria-hidden="true" />
        </div>
        <p
          className="mb-14 md:mb-20 text-[clamp(1.35rem,2.4vw,1.75rem)] italic font-normal leading-[1.35] text-text-muted max-w-[640px]"
          style={{
            fontFamily: "var(--font-heading)",
            letterSpacing: "-0.02em",
          }}
        >
          Everything we&apos;ve filed so far, in reverse chronological order.
        </p>

        {archiveSections.map(([month, items], sectionIdx) => (
          <div key={month} className={sectionIdx > 0 ? "mt-16 md:mt-24" : ""}>
            <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
              <span className="text-[10.5px] md:text-[11px] font-medium uppercase tracking-[0.22em] text-text-faint">
                {month}
              </span>
              <span
                className="flex-1 h-px bg-border-light"
                aria-hidden="true"
              />
              <span className="text-[10.5px] uppercase tracking-[0.18em] text-text-faint tabular-nums">
                {items.length} {items.length === 1 ? "piece" : "pieces"}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 md:gap-y-14">
              {items.map((post, i) => {
                const folio = posts.indexOf(post) + 1;
                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group block"
                  >
                    <div className="flex items-center gap-3 mb-3 text-[10px] uppercase tracking-[0.2em] text-text-faint">
                      <span className="tabular-nums text-accent">
                        No. {String(folio).padStart(2, "0")}
                      </span>
                      <span className="text-text-faint/60">·</span>
                      <span>{post.tag}</span>
                    </div>
                    <h3
                      className="text-[clamp(1.15rem,1.8vw,1.4rem)] font-medium leading-[1.2] text-text group-hover:text-accent transition-colors duration-200 mb-2.5"
                      style={{
                        fontFamily: "var(--font-heading)",
                        letterSpacing: "-0.028em",
                      }}
                    >
                      {post.title}
                    </h3>
                    <p className="text-[14px] leading-[1.65] text-text-muted line-clamp-3 mb-3">
                      {post.description}
                    </p>
                    <span className="text-[10.5px] uppercase tracking-[0.18em] text-text-faint">
                      {formatDate(post.date)}
                    </span>
                    {/* suppress unused-var when a card is the last in a row */}
                    <span className="sr-only">{i}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      <Footer />
    </main>
  );
}

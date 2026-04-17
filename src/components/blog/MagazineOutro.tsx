interface RelatedPost {
  title: string;
  description: string;
  href: string;
  /** Optional tag shown as kicker above the title. */
  category?: string;
}

interface MagazineOutroProps {
  /** Author display name. */
  author: string;
  /** Author bio paragraph. */
  authorBio: string;
  /** Link attached to author name (defaults to /#contact). */
  authorHref?: string;
  /** Two or three related-reading cards. */
  related?: RelatedPost[];
  /** Optional CTA override — defaults to the standard "deploy Claude" prompt. */
  ctaHeading?: string;
  ctaBody?: React.ReactNode;
}

/**
 * MagazineOutro — end-of-piece footer for blog posts.
 *
 * Replaces the ad-hoc stack of "Related / Author / CTA" blocks with a
 * consistent editorial end plate: ornament break, section header, further
 * reading cards, author block, sign-off CTA.
 *
 * Lives inside the 720px reading column so it aligns with the article body.
 */
export function MagazineOutro({
  author,
  authorBio,
  authorHref = "/#contact",
  related,
  ctaHeading = "Want Claude AI deployed across your organisation?",
  ctaBody,
}: MagazineOutroProps) {
  return (
    <footer className="mt-20 md:mt-28">
      {/* Ornament section break */}
      <div className="ornament" aria-hidden="true">
        <span />
      </div>

      {/* Further reading */}
      {related && related.length > 0 && (
        <section className="mt-12">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
              Further reading
            </span>
            <span className="flex-1 h-px bg-border-light" aria-hidden="true" />
          </div>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-10">
            {related.map((post, i) => (
              <a
                key={post.href}
                href={post.href}
                className="group block"
              >
                <div className="flex items-center gap-3 mb-3 text-[10.5px] uppercase tracking-[0.16em] text-text-faint">
                  <span className="tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {post.category && (
                    <>
                      <span className="text-text-faint/60">·</span>
                      <span className="text-accent">{post.category}</span>
                    </>
                  )}
                </div>
                <h3
                  className="text-[1.15rem] md:text-[1.25rem] font-medium leading-[1.25] text-text group-hover:text-accent transition-colors duration-200 mb-2"
                  style={{
                    fontFamily: "var(--font-heading)",
                    letterSpacing: "-0.025em",
                  }}
                >
                  {post.title}
                </h3>
                <p className="text-[14px] leading-[1.6] text-text-muted">
                  {post.description}
                </p>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Author block */}
      <section className="mt-16 pt-10 border-t border-border-light flex items-start gap-5">
        <div
          className="w-12 h-12 rounded-full bg-[#d4d0be] flex items-center justify-center shrink-0 text-text font-medium text-lg"
          style={{ fontFamily: "var(--font-heading)" }}
          aria-hidden="true"
        >
          {author.charAt(0)}
        </div>
        <div>
          <span className="block text-[10.5px] uppercase tracking-[0.18em] text-text-faint mb-1">
            Written by
          </span>
          <a
            href={authorHref}
            className="inline-block font-medium text-[15px] text-text hover:text-accent transition-colors"
          >
            {author}
          </a>
          <p className="text-[14px] text-text-muted mt-1.5 leading-[1.65] max-w-[500px]">
            {authorBio}
          </p>
        </div>
      </section>

      {/* Sign-off CTA — flat, typographic, no button card */}
      <section className="mt-14 pt-10 border-t border-border-light">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
            The next move
          </span>
          <span className="flex-1 h-px bg-border-light" aria-hidden="true" />
        </div>
        <h3
          className="text-[clamp(1.35rem,2.4vw,1.75rem)] font-medium leading-[1.2] text-text mb-4"
          style={{
            fontFamily: "var(--font-heading)",
            letterSpacing: "-0.03em",
          }}
        >
          {ctaHeading}
        </h3>
        <p className="text-[15.5px] leading-[1.7] text-text-muted max-w-[560px]">
          {ctaBody ?? (
            <>
              We help manufacturers and mid-market companies integrate Claude AI
              into their daily operations — structured rollouts,
              production-grade instructions, and measurable results.{" "}
              <a
                href="/#contact"
                className="text-accent font-medium hover:underline"
              >
                Start a conversation →
              </a>
            </>
          )}
        </p>
      </section>
    </footer>
  );
}

import Link from "next/link";

interface MagazineHeaderProps {
  /** Category / tag, shown as small-caps eyebrow. */
  category: string;
  /** Large serif display headline. */
  title: string;
  /** Italic serif deck / subtitle — magazine-style sell. */
  deck: string;
  /** Author display name. */
  author: string;
  /** Author profile / contact link. */
  authorHref?: string;
  /** ISO date string (YYYY-MM-DD). */
  date: string;
  /** e.g. "7 min read". */
  readingTime?: string;
  /** Optional issue number — "No. 14" etc. */
  issue?: string;
}

/**
 * MagazineHeader — editorial article header.
 *
 * Breaks out of the 720px reading column to use the full 1100px stage. The
 * headline sits under a masthead row (Settle · Category · Issue · Date), and
 * a serif italic deck introduces the piece before the reading column resumes.
 *
 * Pair with `<article className="max-w-[720px] mx-auto ...">` for the body —
 * this component provides its own wider container so the deck and byline can
 * breathe on wide screens.
 */
export function MagazineHeader({
  category,
  title,
  deck,
  author,
  authorHref = "/#contact",
  date,
  readingTime,
  issue,
}: MagazineHeaderProps) {
  const d = new Date(date + "T00:00:00");
  const formattedDate = d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="relative mx-auto max-w-[1100px] px-6 lg:px-10 pt-28 md:pt-36 pb-10 md:pb-16">
      {/* Masthead rail — tiny caps, full width, hairline below */}
      <div className="flex items-center justify-between gap-4 pb-5 border-b border-border-light text-[10.5px] md:text-[11px] uppercase tracking-[0.18em] text-text-faint">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 hover:text-text transition-colors"
        >
          <span aria-hidden="true">←</span>
          <span>Settle Field Notes</span>
        </Link>
        <div className="flex items-center gap-3 md:gap-5">
          <span className="text-accent">{category}</span>
          {issue && (
            <>
              <span className="hidden sm:inline text-text-faint/60">·</span>
              <span className="hidden sm:inline">{issue}</span>
            </>
          )}
          <span className="hidden md:inline text-text-faint/60">·</span>
          <span className="hidden md:inline">{formattedDate}</span>
        </div>
      </div>

      {/* Title block — huge serif display, left aligned, negative tracking */}
      <h1
        className="mt-10 md:mt-14 text-[clamp(2.35rem,6vw,4.75rem)] font-medium leading-[1.04] text-text"
        style={{
          fontFamily: "var(--font-heading)",
          letterSpacing: "-0.035em",
        }}
      >
        {title}
      </h1>

      {/* Deck — italic serif sell line. Scoped max width so it doesn't
         stretch past a comfortable reading measure even on wide screens. */}
      <p
        className="mt-7 md:mt-9 max-w-[680px] text-[clamp(1.15rem,1.8vw,1.4rem)] italic font-normal leading-[1.45] text-text/80"
        style={{
          fontFamily: "var(--font-heading)",
          letterSpacing: "-0.015em",
        }}
      >
        {deck}
      </p>

      {/* Byline rail — author · date · minutes. Thin rule + small caps. */}
      <div className="mt-10 md:mt-14 pt-5 border-t border-border-light flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] uppercase tracking-[0.14em] text-text-faint">
        <span>
          By{" "}
          <a
            href={authorHref}
            className="text-text hover:text-accent transition-colors"
          >
            {author}
          </a>
        </span>
        <span aria-hidden="true" className="text-text-faint/50">·</span>
        <time dateTime={date} className="lowercase tracking-[0.14em]">
          {formattedDate}
        </time>
        {readingTime && (
          <>
            <span aria-hidden="true" className="text-text-faint/50">·</span>
            <span className="lowercase tracking-[0.14em]">{readingTime}</span>
          </>
        )}
      </div>
    </header>
  );
}

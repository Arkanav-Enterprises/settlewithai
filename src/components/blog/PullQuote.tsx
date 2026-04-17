interface PullQuoteProps {
  /** The quote body. */
  children: React.ReactNode;
  /** Optional attribution shown small-caps below the quote. */
  cite?: string;
}

/**
 * PullQuote — mid-article feature quote.
 *
 * Renders as an <aside> so screen readers understand it's tangential to the
 * reading flow (the same text usually appears nearby in the body). The visual
 * rules (top/bottom hairline, accent stub, oversized serif) live in
 * `.prose-settle .pull-quote` in globals.css — this component only provides
 * the markup.
 */
export function PullQuote({ children, cite }: PullQuoteProps) {
  return (
    <aside className="pull-quote" role="complementary">
      <span className="sr-only">Pull quote: </span>
      <span aria-hidden="true">“</span>
      {children}
      <span aria-hidden="true">”</span>
      {cite && <span className="cite">— {cite}</span>}
    </aside>
  );
}

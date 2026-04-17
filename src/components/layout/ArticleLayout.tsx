import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { BlogTOC } from "@/components/blog/BlogTOC";

interface FaqItem {
  question: string;
  answer: string;
}

interface FurtherReadingItem {
  title: string;
  href: string;
  description: string;
}

interface ArticleLayoutProps {
  title: string;
  description: string;
  date?: string;
  readingTime?: string;
  tag?: string;
  breadcrumbs: { label: string; href: string }[];
  faqItems?: FaqItem[];
  furtherReading?: FurtherReadingItem[];
  children: React.ReactNode;
}

export function ArticleLayout({
  title,
  description,
  date,
  readingTime,
  tag,
  breadcrumbs,
  faqItems,
  furtherReading,
  children,
}: ArticleLayoutProps) {
  const faqSchema = faqItems?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }
    : null;

  return (
    <>
      {faqSchema && <JsonLd data={faqSchema} />}

      <Nav />
      <BlogTOC />

      <article className="max-w-[720px] mx-auto px-6 lg:px-10 pt-32 pb-24 md:pt-40 md:pb-36">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbs} />

        {/* Header */}
        <header className="mb-12">
          {tag && (
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.1em] text-accent mb-4">
              {tag}
            </span>
          )}
          <h1
            className="text-[clamp(1.8rem,4vw,2.8rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-text mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {title}
          </h1>
          <p className="text-text-muted text-[1.05rem] leading-relaxed mb-6">
            {description}
          </p>
          {(date || readingTime) && (
            <div className="flex items-center gap-3 text-sm text-text-faint">
              <span>Settle</span>
              {date && (
                <>
                  <span>·</span>
                  <time>
                    {new Date(date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                </>
              )}
              {readingTime && (
                <>
                  <span>·</span>
                  <span>{readingTime}</span>
                </>
              )}
            </div>
          )}
        </header>

        {/* Prose content */}
        <div className="prose-settle">{children}</div>

        {/* CTA */}
        <section className="mt-20 lg:-mx-10 lg:px-10 py-14 bg-accent rounded-2xl text-center">
          <h2
            className="text-[clamp(1.4rem,3vw,2rem)] font-semibold leading-tight tracking-[-0.02em] text-white mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Ready to deploy Claude AI?
          </h2>
          <p className="text-white/80 text-[1rem] mb-6 max-w-md mx-auto">
            Book a discovery call and we&apos;ll map your highest-impact AI use
            cases in 15 minutes.
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
        {furtherReading && furtherReading.length > 0 && (
          <section className="mt-16">
            <h2
              className="text-xl font-semibold tracking-[-0.02em] text-text mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Further reading
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {furtherReading.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="group block"
                >
                  <h3 className="text-[1rem] font-medium text-text group-hover:text-accent transition-colors mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-muted line-clamp-2">
                    {item.description}
                  </p>
                </a>
              ))}
            </div>
          </section>
        )}
      </article>

      <Footer />
    </>
  );
}

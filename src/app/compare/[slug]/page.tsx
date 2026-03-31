import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllSlugs, getContentBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/layout/ArticleLayout";
import { JsonLd } from "@/components/seo/JsonLd";

const SITE_URL = "https://settlewithai.com";

export async function generateStaticParams() {
  return getAllSlugs("comparisons").map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  if (!slug) return {};

  let entry;
  try {
    entry = getContentBySlug("comparisons", slug);
  } catch {
    return {};
  }

  const url = `${SITE_URL}/compare/${slug}`;
  return {
    title: entry.title,
    description: entry.description,
    keywords: entry.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: `${entry.title} | Settle`,
      description: entry.description,
      url,
      siteName: "Settle",
      publishedTime: entry.date,
      authors: ["Settle"],
    },
    twitter: {
      card: "summary_large_image",
      title: entry.title,
      description: entry.description,
    },
  };
}

const FURTHER_READING = [
  {
    title: "How a 79-Year-Old Manufacturer Deployed AI",
    href: "/blog/orient-case-study",
    description:
      "49 use cases mapped, 11 projects deployed, 85% faster document generation.",
  },
  {
    title: "How to Actually Integrate AI Into Your Company",
    href: "/blog/integrating-ai-into-your-company",
    description:
      "A practical guide to moving from AI interest to real deployment.",
  },
];

export default async function ComparePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  let entry;
  try {
    entry = getContentBySlug("comparisons", slug);
  } catch {
    notFound();
  }

  const { content } = await compileMDX({
    source: entry.content,
    options: {
      parseFrontmatter: false,
      mdxOptions: { remarkPlugins: [remarkGfm] },
    },
    components: {
      table: (props: React.ComponentProps<"table">) => (
        <div className="table-scroll-wrapper">
          <table {...props} />
        </div>
      ),
    },
  });

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: entry.title,
    description: entry.description,
    datePublished: entry.date,
    author: { "@type": "Organization", name: "Settle", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "Settle",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/apple-touch-icon.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/compare/${slug}` },
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <ArticleLayout
        title={entry.title}
        description={entry.description}
        date={entry.date}
        readingTime={entry.readingTime}
        tag="Compare"
        breadcrumbs={[
          { label: "Compare", href: "/compare" },
          { label: entry.competitor as string || entry.title, href: `/compare/${slug}` },
        ]}
        faqItems={entry.faq}
        furtherReading={FURTHER_READING}
      >
        {content}
      </ArticleLayout>
    </>
  );
}

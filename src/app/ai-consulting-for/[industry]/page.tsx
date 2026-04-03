import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllSlugs, getContentBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/layout/ArticleLayout";
import { JsonLd } from "@/components/seo/JsonLd";

const SITE_URL = "https://settlewithai.com";

export async function generateStaticParams() {
  return getAllSlugs("industries").map((industry) => ({ industry }));
}

export const dynamicParams = false;

export async function generateMetadata(props: {
  params: Promise<{ industry: string }>;
}): Promise<Metadata> {
  const { industry } = await props.params;
  if (!industry) return {};

  let entry;
  try {
    entry = getContentBySlug("industries", industry);
  } catch {
    return {};
  }

  const url = `${SITE_URL}/ai-consulting-for/${industry}`;
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
    title: "MCP Explained: Connect Your ERP, CRM, and Tools to Claude",
    href: "/blog/mcp-explained-for-business",
    description:
      "How Model Context Protocol lets Claude read and write to your existing systems.",
  },
];

export default async function IndustryPage(props: {
  params: Promise<{ industry: string }>;
}) {
  const { industry } = await props.params;

  let entry;
  try {
    entry = getContentBySlug("industries", industry);
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
    dateModified: entry.date,
    image: `${SITE_URL}/og-image.png`,
    author: {
      "@type": "Person",
      name: "Pranav Ambwani",
      jobTitle: "Founder",
      url: SITE_URL,
      worksFor: { "@type": "Organization", name: "Settle" },
    },
    publisher: {
      "@type": "Organization",
      name: "Settle",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/apple-touch-icon.png` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/ai-consulting-for/${industry}`,
    },
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <ArticleLayout
        title={entry.title}
        description={entry.description}
        date={entry.date}
        readingTime={entry.readingTime}
        tag={entry.industry as string}
        breadcrumbs={[
          {
            label: `AI Consulting for ${entry.industry as string}`,
            href: `/ai-consulting-for/${industry}`,
          },
        ]}
        faqItems={entry.faq}
        furtherReading={FURTHER_READING}
      >
        {content}
      </ArticleLayout>
    </>
  );
}

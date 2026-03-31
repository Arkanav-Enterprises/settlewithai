import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/content";

const SITE_URL = "https://settlewithai.com";

const BLOG_SLUGS = [
  "orient-case-study",
  "claude-team-deployment-beyond-diy",
  "built-with-claude-code",
  "mcp-explained-for-business",
  "integrating-ai-into-your-company",
  "ai-powered-outreach-with-cowork",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const comparisonSlugs = getAllSlugs("comparisons");
  const industrySlugs = getAllSlugs("industries");

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const blogPages: MetadataRoute.Sitemap = BLOG_SLUGS.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: slug === "orient-case-study" ? 0.9 : 0.6,
  }));

  const comparisonPages: MetadataRoute.Sitemap = comparisonSlugs.map(
    (slug) => ({
      url: `${SITE_URL}/compare/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }),
  );

  const industryPages: MetadataRoute.Sitemap = industrySlugs.map((slug) => ({
    url: `${SITE_URL}/ai-consulting-for/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...blogPages,
    ...comparisonPages,
    ...industryPages,
  ];
}

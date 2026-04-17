import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/content";
import { BLOG_POSTS } from "@/content/blog-posts";
import { AGENTS } from "@/content/agents";

const SITE_URL = "https://settlewithai.com";

// Freeze lastModified to actual content dates, not request time.
// Google treats every-URL-modified-today as noise and degrades crawl budget.
// Static pages use the most recent repositioning date; blog posts use their
// publish date from the content registry.
const HOMEPAGE_LAST_UPDATED = "2026-04-14"; // Full-stack repositioning + marketplace launch
const TOOLS_LAST_UPDATED = "2026-03-01";
const COMPARISONS_LAST_UPDATED = "2026-03-27";
const INDUSTRIES_LAST_UPDATED = "2026-03-27";
const AGENTS_LAST_UPDATED = "2026-04-14";
const POLICIES_LAST_UPDATED = "2025-11-01";

const toDate = (iso: string) => new Date(`${iso}T00:00:00Z`);

export default function sitemap(): MetadataRoute.Sitemap {
  const comparisonSlugs = getAllSlugs("comparisons");
  const industrySlugs = getAllSlugs("industries");

  // Blog index + homepage move with the latest post (by modified date if present).
  const latestBlogDate = BLOG_POSTS.reduce(
    (max, post) => {
      const d = post.dateModified ?? post.date;
      return d > max ? d : max;
    },
    BLOG_POSTS[0]?.dateModified ?? BLOG_POSTS[0]?.date ?? HOMEPAGE_LAST_UPDATED,
  );

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: toDate(latestBlogDate) },
    { url: `${SITE_URL}/blog`, lastModified: toDate(latestBlogDate) },
    { url: `${SITE_URL}/privacy-policy`, lastModified: toDate(POLICIES_LAST_UPDATED) },
    { url: `${SITE_URL}/terms-of-service`, lastModified: toDate(POLICIES_LAST_UPDATED) },
    { url: `${SITE_URL}/tools/ai-readiness`, lastModified: toDate(TOOLS_LAST_UPDATED) },
    { url: `${SITE_URL}/tools/ai-roi-calculator`, lastModified: toDate(TOOLS_LAST_UPDATED) },
    { url: `${SITE_URL}/tools/use-case-finder`, lastModified: toDate(TOOLS_LAST_UPDATED) },
    { url: `${SITE_URL}/tools/workflow-automation-quiz`, lastModified: toDate(TOOLS_LAST_UPDATED) },
    { url: `${SITE_URL}/tools/ai-vs-manual-calculator`, lastModified: toDate(TOOLS_LAST_UPDATED) },
    { url: `${SITE_URL}/tools/claude-project-planner`, lastModified: toDate(TOOLS_LAST_UPDATED) },
  ];

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: toDate(post.dateModified ?? post.date),
  }));

  const comparisonPages: MetadataRoute.Sitemap = comparisonSlugs.map((slug) => ({
    url: `${SITE_URL}/compare/${slug}`,
    lastModified: toDate(COMPARISONS_LAST_UPDATED),
  }));

  const industryPages: MetadataRoute.Sitemap = industrySlugs.map((slug) => ({
    url: `${SITE_URL}/ai-consulting-for/${slug}`,
    lastModified: toDate(INDUSTRIES_LAST_UPDATED),
  }));

  const agentsIndex: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/agents`, lastModified: toDate(AGENTS_LAST_UPDATED) },
  ];

  const agentPages: MetadataRoute.Sitemap = AGENTS.map((agent) => ({
    url: `${SITE_URL}/agents/${agent.slug}`,
    lastModified: toDate(AGENTS_LAST_UPDATED),
  }));

  return [
    ...staticPages,
    ...agentsIndex,
    ...agentPages,
    ...blogPages,
    ...comparisonPages,
    ...industryPages,
  ];
}

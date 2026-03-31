import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const CONTENT_DIR = path.join(process.cwd(), "src/content");

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ContentEntry {
  slug: string;
  title: string;
  description: string;
  date: string;
  keywords: string[];
  readingTime: string;
  content: string;
  faq: FaqItem[];
  [key: string]: unknown;
}

type ContentType = "comparisons" | "industries";

export function getAllSlugs(type: ContentType): string[] {
  const dir = path.join(CONTENT_DIR, type);
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getContentBySlug(
  type: ContentType,
  slug: string,
): ContentEntry {
  const filePath = path.join(CONTENT_DIR, type, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    slug: data.slug || slug,
    title: data.title || slug,
    description: data.description || "",
    date: data.date || "",
    keywords: data.keywords || [],
    readingTime: `${Math.ceil(stats.minutes)} min read`,
    content,
    faq: data.faq || [],
    ...data,
  };
}

export function getAllContent(type: ContentType): ContentEntry[] {
  return getAllSlugs(type)
    .map((slug) => getContentBySlug(type, slug))
    .sort((a, b) => a.title.localeCompare(b.title));
}

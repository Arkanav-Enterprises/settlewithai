import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { BLOG_POSTS } from "@/content/blog-posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on deploying Claude AI in manufacturing, mid-market companies, and traditional businesses. Case studies, guides, and deployment strategies.",
  alternates: {
    canonical: "https://settlewithai.com/blog",
  },
  openGraph: {
    title: "Blog — Settle",
    description:
      "Insights on deploying Claude AI in manufacturing, mid-market companies, and traditional businesses.",
    url: "https://settlewithai.com/blog",
  },
};

const posts = BLOG_POSTS;

export default function BlogIndex() {
  return (
    <main className="min-h-screen">
      {/* Nav */}
      <Nav />

      <div className="max-w-[860px] mx-auto px-6 lg:px-10 pt-32 md:pt-40 pb-24 md:pb-36">
        <h1
          className="text-[clamp(2.2rem,4.5vw,3.5rem)] font-medium leading-[1.08] mb-20"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Blog
        </h1>

        <div>
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`group block py-10 ${
                i > 0 ? "border-t border-border-light" : ""
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-accent">
                  {post.tag}
                </span>
                <span className="text-text-faint text-[13px]">
                  {new Date(post.date + "T00:00:00").toLocaleDateString(
                    "en-US",
                    {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }
                  )}
                </span>
              </div>
              <h2
                className="text-[clamp(1.25rem,2.2vw,1.65rem)] font-medium leading-[1.3] mb-3 group-hover:text-accent transition-colors duration-200"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {post.title}
              </h2>
              <p className="text-text-muted text-[15px] leading-[1.7] max-w-2xl">
                {post.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import type { BlogPost } from "@/lib/marketing-content";

type Props = {
  posts: BlogPost[];
};

const categories = [
  "All",
  "Product Updates",
  "Library Operations",
  "Security",
  "Implementation Guides",
] as const;

export function BlogListClient({ posts }: Props) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] =
    useState<(typeof categories)[number]>("All");

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        activeCategory === "All" || post.category === activeCategory;
      const normalized =
        `${post.title} ${post.excerpt} ${post.category}`.toLowerCase();
      const matchesQuery = normalized.includes(query.trim().toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [posts, activeCategory, query]);

  const featured = filteredPosts[0];
  const list = filteredPosts.slice(1);

  return (
    <div className="mt-10 space-y-8">
      <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts by title, topic, or category"
            className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm text-foreground outline-none focus-visible:border-ring"
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-3 py-1 text-xs ${
                activeCategory === category
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-muted text-muted-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {featured ? (
        <article className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <p className="text-xs font-medium uppercase tracking-wide text-primary">
            Featured · {featured.category}
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
            {featured.title}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            {featured.excerpt}
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
            <span>{featured.date}</span>
            <span>•</span>
            <span>{featured.readTime}</span>
            <span>•</span>
            <span>By {featured.author}</span>
          </div>
          <Link
            href={`/blog/${featured.slug}`}
            className="mt-5 inline-flex text-sm font-medium text-primary hover:underline"
          >
            Read full article
          </Link>
        </article>
      ) : (
        <div className="rounded-xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
          No posts matched your filter. Try a different keyword or category.
        </div>
      )}

      {list.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {list.map((post) => (
            <article
              key={post.slug}
              className="rounded-xl border border-border bg-card p-5"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-primary">
                {post.category}
              </p>
              <h3 className="mt-2 text-lg font-semibold">{post.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {post.excerpt}
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-4 inline-flex text-sm font-medium text-primary hover:underline"
              >
                Read details
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

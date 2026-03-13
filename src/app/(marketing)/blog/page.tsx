import type { Metadata } from "next";
import { BlogListClient } from "@/components/marketing/blog-list-client";
import { blogPosts } from "@/lib/marketing-content";

export const metadata: Metadata = {
  title: "Blog",
  description: "Latest updates and product notes from LibraryMS.",
};

const METRICS = [
  { label: "Articles", value: "40+" },
  { label: "Topics", value: "12" },
  { label: "Guides", value: "18" },
  { label: "Contributors", value: "9" },
];

export default function BlogPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
          Company
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Blog
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Real implementation stories, product updates, and operational
          strategies from the LibraryMS team.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {METRICS.map((item) => (
            <article
              key={item.label}
              className="rounded-xl border border-border bg-card p-4 text-center"
            >
              <p className="text-2xl font-bold text-primary">{item.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{item.label}</p>
            </article>
          ))}
        </div>

        <BlogListClient posts={blogPosts} />
      </div>
    </section>
  );
}

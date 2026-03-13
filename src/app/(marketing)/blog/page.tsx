import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Latest updates and product notes from LibraryMS.",
};

const POSTS = [
  {
    title: "Launching a modern library workflow",
    excerpt:
      "How digital-first circulation, reservations, and reminders improve library operations.",
    date: "March 2026",
  },
  {
    title: "Designing better overdue recovery",
    excerpt:
      "Practical strategies for balancing member experience with policy enforcement.",
    date: "February 2026",
  },
  {
    title: "What to track in library analytics",
    excerpt:
      "The core metrics that reveal usage trends, inventory pressure, and service quality.",
    date: "January 2026",
  },
];

const CATEGORIES = [
  "Product Updates",
  "Library Operations",
  "Security",
  "Implementation Guides",
];

export default function BlogPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
          Company
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Blog
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Product updates, best practices, and implementation notes from the
          LibraryMS team.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <span
              key={category}
              className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground"
            >
              {category}
            </span>
          ))}
        </div>

        <div className="mt-12 space-y-4">
          {POSTS.map((post) => (
            <article
              key={post.title}
              className="rounded-xl border border-border bg-card p-6"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-primary">
                {post.date}
              </p>
              <h2 className="mt-2 text-xl font-semibold">{post.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {post.excerpt}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

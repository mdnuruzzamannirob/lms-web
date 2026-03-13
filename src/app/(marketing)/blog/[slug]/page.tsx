import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/marketing-content";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) {
    return { title: "Blog" };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogDetailsPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3);

  return (
    <section className="app-container py-10 md:py-16">
      <Link href="/blog" className="text-sm text-primary hover:underline">
        ← Back to blog
      </Link>

      <article className="mt-6 rounded-2xl border border-border bg-card p-6 sm:p-8">
        <p className="text-xs font-medium uppercase tracking-wide text-primary">
          {post.category}
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">{post.excerpt}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
          <span>•</span>
          <span>By {post.author}</span>
        </div>

        <div className="mt-8 space-y-6">
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-semibold">{section.heading}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {section.body}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-border bg-muted/40 p-5">
          <h3 className="text-base font-semibold">Key takeaways</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {post.keyTakeaways.map((point) => (
              <li key={point}>• {point}</li>
            ))}
          </ul>
        </div>
      </article>

      <section className="mt-8 rounded-xl border border-border bg-card p-6">
        <h3 className="text-lg font-semibold">Related reads</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {relatedPosts.map((item) => (
            <Link
              key={item.slug}
              href={`/blog/${item.slug}`}
              className="rounded-lg border border-border bg-background p-4"
            >
              <p className="text-xs text-primary">{item.category}</p>
              <p className="mt-1 text-sm font-medium">{item.title}</p>
            </Link>
          ))}
        </div>
      </section>
    </section>
  );
}

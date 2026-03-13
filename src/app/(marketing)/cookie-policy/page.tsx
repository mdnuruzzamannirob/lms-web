import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie policy for LibraryMS.",
};

const COOKIE_TYPES = [
  {
    title: "Essential Cookies",
    body: "Required for login, session continuity, and core platform security features.",
  },
  {
    title: "Functional Cookies",
    body: "Help remember preferences such as theme settings and interface behavior.",
  },
  {
    title: "Analytics Cookies",
    body: "Used to understand product usage patterns and improve service performance.",
  },
  {
    title: "Cookie Management",
    body: "You can manage browser cookie preferences; disabling essential cookies may affect authentication and key features.",
  },
  {
    title: "Third-Party Cookies",
    body: "Integrated providers may set cookies for payment, anti-fraud, and communication workflows according to their policies.",
  },
];

export default function CookiePolicyPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
          Legal
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Cookie Policy
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Last updated: March 13, 2026
        </p>

        <div className="mt-6 rounded-xl border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
          You can control cookies through your browser settings. Blocking
          essential cookies may affect sign-in and session continuity.
        </div>

        <div className="mt-10 space-y-5">
          {COOKIE_TYPES.map((section) => (
            <article
              key={section.title}
              className="rounded-xl border border-border bg-card p-6"
            >
              <h2 className="text-lg font-semibold">{section.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {section.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

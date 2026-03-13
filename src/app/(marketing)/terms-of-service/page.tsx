import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for LibraryMS.",
};

const TERMS = [
  {
    title: "Service Access",
    body: "Use of LibraryMS requires valid account credentials and compliance with organizational access policies.",
  },
  {
    title: "Acceptable Use",
    body: "Users must not abuse system resources, attempt unauthorized access, or compromise platform security.",
  },
  {
    title: "Data Responsibility",
    body: "Institutions are responsible for ensuring the legality and accuracy of data entered into the platform.",
  },
  {
    title: "Limitations",
    body: "LibraryMS is provided according to the active service plan and availability commitments described in your agreement.",
  },
  {
    title: "Account Security",
    body: "Customers are responsible for credential security, role assignment hygiene, and timely offboarding of inactive users.",
  },
  {
    title: "Changes to Service",
    body: "We may improve, update, or deprecate features with reasonable notice and migration guidance where relevant.",
  },
];

export default function TermsOfServicePage() {
  return (
    <section className="app-container py-10 md:py-16">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
        Legal
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
        Terms of Service
      </h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Last updated: March 13, 2026
      </p>

      <div className="mt-6 rounded-xl border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
        These terms summarize service expectations and responsibilities.
        Specific commercial and compliance obligations are defined in your
        signed agreement where applicable.
      </div>

      <div className="mt-10 space-y-5">
        {TERMS.map((section) => (
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
    </section>
  );
}

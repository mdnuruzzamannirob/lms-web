import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Recent improvements and releases in LibraryMS.",
};

const RELEASES = [
  {
    version: "v2.4.0",
    date: "March 2026",
    items: [
      "Improved reservation queue handling with clearer status transitions",
      "Added richer dashboard metrics for active members and overdue distribution",
      "Faster search for large book catalogs",
    ],
  },
  {
    version: "v2.3.0",
    date: "February 2026",
    items: [
      "Enhanced fine management flow with clearer payment state tracking",
      "Membership expiry reminder reliability improvements",
      "Performance updates for borrow history pagination",
    ],
  },
  {
    version: "v2.2.0",
    date: "January 2026",
    items: [
      "New report modules for category distribution and borrow trends",
      "Improved admin user management UX and filtering",
      "Stability fixes for auth OTP workflows",
    ],
  },
];

const UPCOMING = [
  "Deeper branch-level analytics and comparative dashboards",
  "Extended reservation lifecycle notifications",
  "Expanded import tooling for legacy library datasets",
];

export default function ChangelogPage() {
  return (
    <section className="app-container py-10 md:py-16">
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
          Product
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Changelog
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Track platform improvements, fixes, and feature releases across
          LibraryMS modules.
        </p>
      </div>

      <div className="mt-12 space-y-5">
        {RELEASES.map((release) => (
          <article
            key={release.version}
            className="rounded-xl border border-border bg-card p-6"
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold">{release.version}</h2>
              <span className="text-xs font-medium text-primary">
                {release.date}
              </span>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {release.items.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-border bg-muted/40 p-6">
        <h3 className="text-xl font-semibold">Coming next</h3>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          {UPCOMING.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

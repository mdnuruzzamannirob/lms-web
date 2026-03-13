import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Implementation and usage guides for LibraryMS.",
};

const DOC_SECTIONS = [
  {
    title: "Getting Started",
    description:
      "Project setup, environment configuration, and initial data seeding for a fresh deployment.",
  },
  {
    title: "Authentication Flows",
    description:
      "Register, email verification OTP, login, refresh token, and password reset implementation details.",
  },
  {
    title: "API Modules",
    description:
      "Reference for users, books, members, borrowing, fines, reservations, payments, and reports endpoints.",
  },
  {
    title: "Operations & Jobs",
    description:
      "Cron schedules for overdue detection, fine updates, membership expiry, and reservation lifecycle tasks.",
  },
  {
    title: "Security Practices",
    description:
      "Rate limits, JWT handling, validation strategy, and secure middleware patterns.",
  },
  {
    title: "Deployment",
    description:
      "Build, environment provisioning, production startup, and observability recommendations.",
  },
];

export default function DocumentationPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
            Product
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Documentation
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Practical guides and technical references to implement, maintain,
            and scale LibraryMS.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DOC_SECTIONS.map((section) => (
            <article
              key={section.title}
              className="rounded-xl border border-border bg-card p-6"
            >
              <h2 className="text-lg font-semibold">{section.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {section.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-border bg-muted/40 p-8 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            Need implementation help?
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Reach out for onboarding support or custom integration planning.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/contact">
              <Button>Contact team</Button>
            </Link>
            <Link href="/features">
              <Button variant="outline">Explore features</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

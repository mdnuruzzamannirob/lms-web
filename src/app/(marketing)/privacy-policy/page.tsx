import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for LibraryMS.",
};

const SECTIONS = [
  {
    title: "Information We Collect",
    body: "We collect account information, usage events, and operational data needed to provide and improve LibraryMS services.",
  },
  {
    title: "How We Use Information",
    body: "Data is used for authentication, system security, service analytics, communication, and support operations.",
  },
  {
    title: "Data Protection",
    body: "We apply role-based access controls, encryption in transit, and security monitoring to protect your data.",
  },
  {
    title: "Your Rights",
    body: "You may request data access, correction, or deletion based on applicable laws and service agreements.",
  },
  {
    title: "Retention",
    body: "We retain service data only for operational, legal, and security requirements, then safely archive or delete it.",
  },
  {
    title: "Third-Party Services",
    body: "Certain workflows may use vetted processors (for example, payment and email providers) under strict contractual safeguards.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
          Legal
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">Last updated: March 13, 2026</p>

        <div className="mt-10 space-y-5">
          {SECTIONS.map((section) => (
            <article key={section.title} className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold">{section.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{section.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

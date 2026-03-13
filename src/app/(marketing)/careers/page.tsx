import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join the team building LibraryMS.",
};

const ROLES = [
  {
    title: "Frontend Engineer (Next.js)",
    location: "Remote",
    type: "Full-time",
  },
  {
    title: "Backend Engineer (Node.js)",
    location: "Remote",
    type: "Full-time",
  },
  {
    title: "Product Designer",
    location: "Hybrid",
    type: "Full-time",
  },
];

const BENEFITS = [
  "Remote-friendly culture with async-first collaboration",
  "Competitive compensation and growth plans",
  "Direct impact on education and community services",
  "Learning budget and modern engineering tools",
];

export default function CareersPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
          Company
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Careers
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          We’re building software that powers modern libraries. Come build with
          us.
        </p>

        <div className="mt-12 space-y-4">
          {ROLES.map((role) => (
            <article
              key={role.title}
              className="rounded-xl border border-border bg-card p-6"
            >
              <h2 className="text-lg font-semibold">{role.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {role.location} · {role.type}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-border bg-muted/40 p-6">
          <h2 className="text-xl font-semibold">Why join us</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {BENEFITS.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

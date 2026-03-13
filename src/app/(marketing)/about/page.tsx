import type { Metadata } from "next";
import {
  BookOpen,
  Users,
  ShieldCheck,
  BarChart3,
  Goal,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about LibraryMS and our mission.",
};

const VALUES = [
  {
    icon: BookOpen,
    title: "Library-first",
    description:
      "Every feature is designed around real library workflows and daily staff operations.",
  },
  {
    icon: Users,
    title: "Member-centric",
    description:
      "We help institutions deliver a smooth borrowing experience for every member.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by default",
    description:
      "Authentication, validation, and strict role-based access are built into the core.",
  },
  {
    icon: BarChart3,
    title: "Insight-driven",
    description:
      "Actionable reports and analytics help teams make better operational decisions.",
  },
];

const MILESTONES = [
  {
    year: "2024",
    title: "Foundation",
    description: "Started with a focused mission: simplify library operations.",
  },
  {
    year: "2025",
    title: "Core Platform",
    description:
      "Launched core circulation, member, and fine management modules.",
  },
  {
    year: "2026",
    title: "Scale & Insights",
    description:
      "Expanded analytics, automation, and payment workflows for larger institutions.",
  },
];

export default function AboutPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
            Company
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            About LibraryMS
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            LibraryMS helps institutions modernize book circulation, member
            management, and reporting in one unified platform.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="size-5 text-primary" />
              </div>
              <h2 className="mt-4 text-lg font-semibold">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </article>
          ))}

          <article className="rounded-xl border border-border bg-card p-6">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <Goal className="size-5 text-primary" />
            </div>
            <h2 className="mt-4 text-lg font-semibold">Our mission</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Empower libraries with reliable software so staff can focus more
              on learners, readers, and communities.
            </p>
          </article>

          <article className="rounded-xl border border-border bg-card p-6">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <Sparkles className="size-5 text-primary" />
            </div>
            <h2 className="mt-4 text-lg font-semibold">What we value</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Clarity, reliability, and measurable impact across day-to-day
              library workflows.
            </p>
          </article>
        </div>

        <div className="mt-14 rounded-2xl border border-border bg-muted/40 p-8">
          <h3 className="text-2xl font-bold tracking-tight">Our journey</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {MILESTONES.map((milestone) => (
              <article
                key={milestone.year}
                className="rounded-xl border border-border bg-card p-5"
              >
                <p className="text-xs font-medium text-primary">
                  {milestone.year}
                </p>
                <h4 className="mt-1 text-base font-semibold">
                  {milestone.title}
                </h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  {milestone.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

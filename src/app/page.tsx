import { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  Users,
  RefreshCw,
  DollarSign,
  Calendar,
  BarChart3,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "LibraryMS — Modern Library Management System",
  description:
    "Manage books, members, borrowings, fines, and reservations with a modern, feature-rich library management platform.",
};

const FEATURES = [
  {
    icon: BookOpen,
    title: "Book Management",
    description:
      "Full inventory control with ISBN tracking, search, filtering, and cover image uploads via Cloudinary.",
  },
  {
    icon: Users,
    title: "Member Management",
    description:
      "Track student, standard, and premium memberships with automatic expiry notifications.",
  },
  {
    icon: RefreshCw,
    title: "Borrowing System",
    description:
      "Transactional borrow/return with renewals, overdue detection, and lost book handling.",
  },
  {
    icon: DollarSign,
    title: "Fine Management",
    description:
      "Auto-calculated overdue fines at $1/day with Stripe online payment and cash/card support.",
  },
  {
    icon: Calendar,
    title: "Reservations",
    description:
      "Queue-based book reservations with automatic email notifications when a copy becomes available.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reports",
    description:
      "Dashboard stats, popular books, borrow trends, revenue over time, and category distribution.",
  },
];

const STATS = [
  { label: "Books Managed", value: "10,000+" },
  { label: "Active Members", value: "5,000+" },
  { label: "Borrows Processed", value: "50,000+" },
  { label: "System Uptime", value: "99.9%" },
];

const STEPS = [
  {
    step: "01",
    title: "Register & Verify",
    description:
      "Create your account and verify your email via OTP to get started instantly.",
  },
  {
    step: "02",
    title: "Browse Books",
    description:
      "Search and explore the library catalog by title, author, or ISBN.",
  },
  {
    step: "03",
    title: "Borrow & Reserve",
    description:
      "Borrow available books or join the reservation queue for checked-out titles.",
  },
  {
    step: "04",
    title: "Return & Repeat",
    description:
      "Return books on time, pay any fines online, and borrow again seamlessly.",
  },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* ── Hero ── */}
        <section className="relative overflow-hidden py-24 md:py-36">
          {/* Soft background glow */}
          <div
            className="pointer-events-none absolute inset-0 -z-10"
            aria-hidden
          >
            <div className="absolute left-1/2 top-0 h-150 w-225 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/8 blur-3xl" />
          </div>

          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="size-1.5 rounded-full bg-primary" aria-hidden />
              library management system
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-[3.5rem] md:leading-[1.1]">
              Your complete <span className="text-primary">library</span>
              <br className="hidden sm:block" />
              management platform
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Manage books, members, borrowings, fines, and reservations with a
              modern, feature-rich system built for libraries of all sizes.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/register">
                <Button className="h-11 gap-2 px-6">
                  Get Started
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" className="h-11 px-6">
                  Explore features
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="border-y border-border bg-muted/40 py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <dl className="grid grid-cols-2 gap-y-8 gap-x-6 sm:grid-cols-4">
              {STATS.map(({ label, value }) => (
                <div key={label} className="text-center">
                  <dd className="text-3xl font-bold text-primary">{value}</dd>
                  <dt className="mt-1 text-sm text-muted-foreground">
                    {label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Features ── */}
        <section id="features" className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Everything your library needs
              </h2>
              <p className="mt-4 text-muted-foreground">
                A comprehensive suite of tools built to handle every aspect of
                library management — from day-one onboarding to advanced
                analytics.
              </p>
            </div>

            <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="rounded-xl border border-border bg-card p-6"
                >
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <h3 className="mt-4 font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section id="how-it-works" className="bg-muted/40 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                How it works
              </h2>
              <p className="mt-4 text-muted-foreground">
                Get up and running in minutes and streamline your entire library
                workflow from day one.
              </p>
            </div>

            <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map(({ step, title, description }, i) => (
                <div key={step} className="relative">
                  {/* Connector line (desktop) */}
                  {i < STEPS.length - 1 && (
                    <div
                      className="absolute left-full top-5 hidden h-px w-10 -translate-y-px bg-border lg:block"
                      aria-hidden
                    />
                  )}
                  <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-base font-bold text-primary">
                    {step}
                  </div>
                  <h3 className="mt-4 font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section id="about" className="py-20 md:py-28">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to modernize your library?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Join thousands of libraries already using LibraryMS to streamline
              their operations.
            </p>
            <div className="mt-8">
              <Link href="/register">
                <Button className="h-11 gap-2 px-8">
                  Start for free
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>

            <ul className="mt-6 flex flex-wrap items-center justify-center gap-5 text-sm text-muted-foreground">
              {[
                "No credit card required",
                "Free to get started",
                "99.9% uptime SLA",
              ].map((item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

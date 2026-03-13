import type { Metadata } from "next";
import {
  BookOpen,
  Users,
  RefreshCw,
  DollarSign,
  Calendar,
  BarChart3,
  ShieldCheck,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Features",
  description: "Explore all LibraryMS platform features.",
};

const CORE_FEATURES = [
  {
    icon: BookOpen,
    title: "Books & Inventory",
    description:
      "ISBN-based cataloging, advanced search, stock visibility, category management, and cover uploads.",
  },
  {
    icon: Users,
    title: "Members & Access",
    description:
      "Member profiles, membership tiers, expiry tracking, and role-based user administration.",
  },
  {
    icon: RefreshCw,
    title: "Borrowing Lifecycle",
    description:
      "Issue, return, renew, overdue detection, and lost-book processing backed by transactions.",
  },
  {
    icon: DollarSign,
    title: "Fines & Payments",
    description:
      "Auto-generated overdue fines, manual payment records, and Stripe-based online settlement.",
  },
  {
    icon: Calendar,
    title: "Reservations",
    description:
      "Queue-based reservations with availability notifications and automatic reservation expiry rules.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reports",
    description:
      "Dashboard metrics, active member insights, popular books, borrow trends, and revenue reports.",
  },
  {
    icon: ShieldCheck,
    title: "Security",
    description:
      "JWT auth, request validation, rate limiting, secure cookies, and centralized error handling.",
  },
  {
    icon: Mail,
    title: "Email Automation",
    description:
      "OTP verification, reminders, payment confirmations, and membership expiry notifications.",
  },
];

export default function FeaturesPage() {
  return (
    <section className="app-container py-10 md:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
          Product
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Powerful features for modern libraries
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          LibraryMS covers circulation, members, fines, reservations, reports,
          and operational automation in a single system.
        </p>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {CORE_FEATURES.map(({ icon: Icon, title, description }) => (
          <article
            key={title}
            className="rounded-xl border border-border bg-card p-6"
          >
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <Icon className="size-5 text-primary" />
            </div>
            <h2 className="mt-4 text-base font-semibold">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-14 rounded-2xl border border-border bg-muted/40 p-8 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          Need a tailored walkthrough?
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          See how each module maps to your library operations and policies.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/contact">
            <Button>Book a demo</Button>
          </Link>
          <Link href="/pricing">
            <Button variant="outline">View pricing</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

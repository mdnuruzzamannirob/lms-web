import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PricingPlansClient } from "@/components/marketing/pricing-plans-client";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple and transparent pricing for LibraryMS.",
};

export default function PricingPage() {
  return (
    <section className="app-container py-10 md:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
          Product
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Simple pricing for every library size
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Start small, scale without friction, and pay for the capacity your
          institution needs.
        </p>
      </div>

      <PricingPlansClient />

      <div className="mt-14 rounded-2xl border border-border bg-muted/40 p-8 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          Need help choosing the right plan?
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          We can recommend plan size based on your catalog, member volume, and
          operational goals.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/contact">
            <Button>Talk to sales</Button>
          </Link>
          <Link href="/faq">
            <Button variant="outline">Read FAQ</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

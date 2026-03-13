import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PricingPlansClient } from "@/components/marketing/pricing-plans-client";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple and transparent pricing for LibraryMS.",
};

const COMPARISON = [
  {
    feature: "Books limit",
    starter: "3,000",
    growth: "30,000",
    enterprise: "Unlimited",
  },
  {
    feature: "Members",
    starter: "800",
    growth: "8,000",
    enterprise: "Unlimited",
  },
  {
    feature: "Reservations & fines",
    starter: "Basic",
    growth: "Advanced",
    enterprise: "Advanced + custom policies",
  },
  {
    feature: "Support SLA",
    starter: "Standard",
    growth: "Priority",
    enterprise: "Dedicated",
  },
];

export default function PricingPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
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

        <div className="mt-14 rounded-xl border border-border bg-card p-6">
          <h2 className="text-xl font-semibold">Plan comparison</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="py-2 pr-4 font-medium">Feature</th>
                  <th className="py-2 pr-4 font-medium">Starter</th>
                  <th className="py-2 pr-4 font-medium">Growth</th>
                  <th className="py-2 font-medium">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.feature} className="border-b border-border/60">
                    <td className="py-2 pr-4 text-foreground">{row.feature}</td>
                    <td className="py-2 pr-4 text-muted-foreground">
                      {row.starter}
                    </td>
                    <td className="py-2 pr-4 text-muted-foreground">
                      {row.growth}
                    </td>
                    <td className="py-2 text-muted-foreground">
                      {row.enterprise}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-muted/40 p-8 text-center">
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
      </div>
    </section>
  );
}

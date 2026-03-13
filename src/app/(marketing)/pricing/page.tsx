import type { Metadata } from "next";
import { Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple and transparent pricing for LibraryMS.",
};

const PLANS = [
  {
    name: "Starter",
    price: "$29",
    description: "For small libraries starting digital operations.",
    features: [
      "Up to 2,000 books",
      "Up to 500 members",
      "Borrow/return workflows",
      "Basic reports",
      "Email support",
    ],
  },
  {
    name: "Growth",
    price: "$79",
    description: "For growing institutions with higher daily volume.",
    features: [
      "Up to 20,000 books",
      "Up to 5,000 members",
      "Reservations and fines",
      "Advanced analytics",
      "Priority support",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For networks, campuses, and large organizations.",
    features: [
      "Unlimited catalog scale",
      "Multi-branch support",
      "Dedicated onboarding",
      "SLA and security review",
      "Custom integration support",
    ],
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

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <article
              key={plan.name}
              className={`rounded-xl border bg-card p-6 ${
                plan.highlighted
                  ? "border-primary shadow-[0_0_0_1px_var(--color-primary)]"
                  : "border-border"
              }`}
            >
              <h2 className="text-xl font-semibold">{plan.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {plan.description}
              </p>
              <p className="mt-5 text-3xl font-bold tracking-tight">
                {plan.price}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">per month</p>

              <ul className="mt-6 space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 size-4 text-primary" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/contact" className="mt-6 block">
                <Button
                  className="w-full"
                  variant={plan.highlighted ? "default" : "outline"}
                >
                  {plan.highlighted ? "Start Growth" : "Contact sales"}
                </Button>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

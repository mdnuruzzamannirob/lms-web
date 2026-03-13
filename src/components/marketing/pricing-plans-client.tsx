"use client";

import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { pricingPlans } from "@/lib/marketing-content";

export function PricingPlansClient() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  const subtitle = useMemo(() => {
    if (billing === "annual") {
      return "Annual billing includes ~20% effective savings on fixed plans.";
    }
    return "Monthly billing with flexibility for growing institutions.";
  }, [billing]);

  return (
    <div className="mt-10">
      <div className="mx-auto mb-8 flex w-fit items-center gap-2 rounded-full border border-border bg-card p-1">
        <button
          type="button"
          onClick={() => setBilling("monthly")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium ${
            billing === "monthly"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground"
          }`}
        >
          Monthly
        </button>
        <button
          type="button"
          onClick={() => setBilling("annual")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium ${
            billing === "annual"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground"
          }`}
        >
          Annual
        </button>
      </div>

      <p className="mb-8 text-center text-sm text-muted-foreground">
        {subtitle}
      </p>

      <div className="grid gap-5 lg:grid-cols-3">
        {pricingPlans.map((plan) => {
          const amount = billing === "monthly" ? plan.monthly : plan.yearly;

          return (
            <article
              key={plan.name}
              className={`rounded-xl border bg-card p-6 ${
                plan.highlighted
                  ? "border-primary shadow-[0_0_0_1px_var(--color-primary)]"
                  : "border-border"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-semibold">{plan.name}</h2>
                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                  {plan.badge}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {plan.description}
              </p>

              <p className="mt-5 text-3xl font-bold tracking-tight">
                {amount ? `$${amount}` : "Custom"}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {amount
                  ? billing === "monthly"
                    ? "per month"
                    : "per month, billed annually"
                  : "contact for quote"}
              </p>

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
                  {plan.cta}
                </Button>
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}

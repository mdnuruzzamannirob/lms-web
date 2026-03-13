import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { faqItems } from "@/lib/marketing-content";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about LibraryMS",
};

export default function FaqPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
            Support
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Frequently asked questions
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Answers to common questions about onboarding, pricing, data
            migration, security, and support.
          </p>
        </div>

        <div className="mt-12">
          <FaqAccordion items={faqItems} />
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-muted/40 p-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight">
            Didn’t find your answer?
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Share your use case and we’ll help you with a direct response.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/contact">
              <Button>Contact support</Button>
            </Link>
            <Link href="/documentation">
              <Button variant="outline">Read documentation</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

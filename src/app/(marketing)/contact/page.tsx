import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { ContactForm } from "@/components/marketing/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact the LibraryMS team.",
};

const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: "Email",
    value: "support@libraryms.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "123 Library Street, Knowledge City",
  },
];

const INQUIRIES = [
  "Product demo requests",
  "Sales and pricing consultation",
  "Technical support and implementation",
  "Partnership and integration opportunities",
];

const RESPONSE_STEPS = [
  "Initial response within one business day",
  "Requirement discovery and current process review",
  "Recommended rollout plan and timeline",
  "Demo, onboarding, and implementation handoff",
];

export default function ContactPage() {
  return (
    <section className="app-container py-10 md:py-16">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
        Company
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
        Contact
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Questions, demos, or partnership requests — we’d love to hear from you.
      </p>

      <div className="flex mt-12 gap-10">
        <div className="flex-1  space-y-5">
          {CONTACT_ITEMS.map(({ icon: Icon, label, value }) => (
            <article
              key={label}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="size-5 text-primary" />
              </div>
              <h2 className="mt-4 font-semibold">{label}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{value}</p>
            </article>
          ))}
        </div>

        <ContactForm />
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <article className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-lg font-semibold">Inquiry types</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {INQUIRIES.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </article>
        <article className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-lg font-semibold">Support hours</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Monday to Friday, 9:00 AM – 6:00 PM (UTC).
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Critical incident responses are prioritized for active enterprise
            customers.
          </p>
          <h4 className="mt-5 text-sm font-semibold text-foreground">
            What happens next
          </h4>
          <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
            {RESPONSE_STEPS.map((step) => (
              <li key={step}>• {step}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  organization: z.string().min(2, "Organization is required"),
  inquiryType: z.string().min(1, "Select inquiry type"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [submitState, setSubmitState] = useState<"idle" | "success">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      organization: "",
      inquiryType: "",
      message: "",
    },
  });

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 700));
    setSubmitState("success");
    reset();
  };

  return (
    <article className="rounded-xl border border-border bg-card p-6">
      <h3 className="text-xl font-semibold">Send us a message</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Tell us your goals and we’ll suggest the best rollout approach.
      </p>

      {submitState === "success" && (
        <div className="mt-4 rounded-lg bg-primary/10 px-4 py-3 text-sm text-primary">
          Thanks! Your message has been received. Our team will contact you
          soon.
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-5 space-y-4"
        noValidate
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              {...register("name")}
              error={errors.name?.message}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              error={errors.email?.message}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="organization">Organization</Label>
            <Input
              id="organization"
              {...register("organization")}
              error={errors.organization?.message}
            />
            {errors.organization && (
              <p className="text-xs text-destructive">
                {errors.organization.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="inquiryType">Inquiry type</Label>
            <select
              id="inquiryType"
              {...register("inquiryType")}
              className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring"
            >
              <option value="">Select one</option>
              <option value="demo">Product demo</option>
              <option value="pricing">Pricing consultation</option>
              <option value="support">Technical support</option>
              <option value="partnership">Partnership</option>
            </select>
            {errors.inquiryType && (
              <p className="text-xs text-destructive">
                {errors.inquiryType.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="message">Message</Label>
          <textarea
            id="message"
            rows={5}
            {...register("message")}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:border-ring"
            placeholder="Share your current setup, goals, and timeline..."
          />
          {errors.message && (
            <p className="text-xs text-destructive">{errors.message.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full sm:w-auto"
          disabled={isSubmitting}
        >
          {isSubmitting && <Loader2 className="animate-spin" />}
          Submit inquiry
        </Button>
      </form>
    </article>
  );
}

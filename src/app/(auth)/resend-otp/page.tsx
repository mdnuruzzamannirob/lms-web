"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResendOtpMutation } from "@/store/api/authApi";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
});

type FormValues = z.infer<typeof schema>;
type OtpType = "email_verification" | "password_reset";

const TYPE_LABELS: Record<OtpType, string> = {
  email_verification: "email verification",
  password_reset: "password reset",
};

export default function ResendOtpPage() {
  const searchParams = useSearchParams();
  const rawType = searchParams.get("type") as OtpType | null;
  const type: OtpType =
    rawType === "password_reset" ? "password_reset" : "email_verification";
  const emailParam = searchParams.get("email") ?? "";

  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [resendOtp, { isLoading }] = useResendOtpMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: emailParam },
  });

  const onSubmit = async (data: FormValues) => {
    setServerError(null);
    try {
      await resendOtp({ email: data.email, type }).unwrap();
      setSuccess(true);
    } catch (err: unknown) {
      const apiErr = err as { data?: { message?: string } };
      setServerError(apiErr.data?.message ?? "Failed to resend code.");
    }
  };

  const backHref =
    type === "password_reset" ? "/auth/verify-reset-otp" : "/auth/verify-email";

  if (success) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <CheckCircle2 className="size-12 text-primary" />
          <h1 className="text-2xl font-semibold tracking-tight">Code sent!</h1>
          <p className="text-sm text-muted-foreground">
            A new {TYPE_LABELS[type]} code has been sent. Check your inbox.
          </p>
        </div>
        <Link href={backHref}>
          <Button className="w-full" style={{ height: "2.625rem" }}>
            Enter code
          </Button>
        </Link>
        <div className="text-center">
          <Link
            href="/auth/login"
            className="flex items-center justify-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            Back to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Resend code</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Enter your email to receive a new {TYPE_LABELS[type]} code.
        </p>
      </div>

      {serverError && (
        <div
          role="alert"
          className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            error={errors.email?.message}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full"
          style={{ height: "2.625rem" }}
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="animate-spin" />}
          Resend code
        </Button>
      </form>

      <div className="text-center">
        <Link
          href="/auth/login"
          className="flex items-center justify-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Back to login
        </Link>
      </div>
    </div>
  );
}

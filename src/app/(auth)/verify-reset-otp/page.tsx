"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OtpInput } from "@/components/ui/otp-input";
import {
  useVerifyResetOtpMutation,
  useResendOtpMutation,
} from "@/store/api/authApi";

const schema = z.object({
  otp: z
    .string()
    .length(6, "Enter the 6-digit code")
    .regex(/^\d{6}$/, "Code must be 6 digits"),
});

type FormValues = z.infer<typeof schema>;

export default function VerifyResetOtpPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const router = useRouter();

  const [serverError, setServerError] = useState<string | null>(null);
  const [resendMsg, setResendMsg] = useState<string | null>(null);

  const [verifyResetOtp, { isLoading }] = useVerifyResetOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { otp: "" },
  });

  const onSubmit = async ({ otp }: FormValues) => {
    setServerError(null);
    try {
      const res = await verifyResetOtp({ email, otp }).unwrap();
      const encoded = encodeURIComponent(res.data.resetToken);
      router.push(`/reset-password?token=${encoded}`);
    } catch (err: unknown) {
      const apiErr = err as { data?: { message?: string } };
      setServerError(apiErr.data?.message ?? "Invalid or expired code.");
    }
  };

  const handleResend = async () => {
    if (!email) return;
    setServerError(null);
    setResendMsg(null);
    try {
      await resendOtp({ email, type: "password_reset" }).unwrap();
      setResendMsg("A new code has been sent to your inbox.");
    } catch (err: unknown) {
      const apiErr = err as { data?: { message?: string } };
      setServerError(apiErr.data?.message ?? "Failed to resend code.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Enter reset code
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          We sent a 6-digit code to{" "}
          <span className="font-medium text-foreground">
            {email || "your email"}
          </span>
          . Enter it below.
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

      {resendMsg && (
        <div className="rounded-lg bg-primary/10 px-4 py-3 text-sm text-primary">
          {resendMsg}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <Controller
          name="otp"
          control={control}
          render={({ field }) => (
            <OtpInput
              value={field.value}
              onChange={field.onChange}
              error={!!errors.otp}
            />
          )}
        />
        {errors.otp && (
          <p className="text-center text-xs text-destructive">
            {errors.otp.message}
          </p>
        )}

        <Button
          type="submit"
          className="w-full"
          style={{ height: "2.625rem" }}
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="animate-spin" />}
          Verify code
        </Button>
      </form>

      <div className="flex flex-col items-center gap-3 text-sm">
        <button
          type="button"
          onClick={handleResend}
          disabled={isResending || !email}
          className="text-primary hover:underline disabled:opacity-50"
        >
          {isResending ? "Sending…" : "Didn't receive a code? Resend"}
        </button>
        <Link
          href="/forgot-password"
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Back
        </Link>
      </div>
    </div>
  );
}

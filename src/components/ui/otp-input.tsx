"use client";

import {
  useRef,
  type KeyboardEvent,
  type ClipboardEvent,
  type InputHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

interface OtpInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
> {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  error?: boolean;
}

export function OtpInput({
  value,
  onChange,
  length = 6,
  error,
  className,
  ...props
}: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, newChar: string) => {
    const cleaned = newChar.replace(/\D/g, "");
    if (!cleaned) return;

    const chars = value.split("");
    while (chars.length < length) chars.push("");
    chars[index] = cleaned[0];

    const joined = chars.join("");
    onChange(joined);

    if (index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const chars = value.split("");
      while (chars.length < length) chars.push("");

      if (chars[index]) {
        chars[index] = "";
        onChange(chars.join(""));
      } else if (index > 0) {
        chars[index - 1] = "";
        onChange(chars.join(""));
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);
    const padded = pasted.padEnd(length, "").slice(0, length);
    onChange(padded);
    const focusIndex = Math.min(pasted.length, length - 1);
    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <div className="flex justify-center gap-2.5">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={value[index] ?? ""}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          aria-label={`Digit ${index + 1}`}
          className={cn(
            "size-12 rounded-lg border border-input bg-background text-center text-lg font-semibold",
            "focus-visible:outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/20",
            error &&
              "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",
            className,
          )}
          {...props}
        />
      ))}
    </div>
  );
}

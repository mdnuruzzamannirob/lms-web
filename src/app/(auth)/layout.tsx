import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Suspense } from "react";

const HIGHLIGHTS = [
  "Smart book borrowing & return system",
  "Member management with expiry tracking",
  "Auto fine calculation & online payments",
  "Real-time analytics & reports",
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2">
      {/* ── Left branding panel (desktop only) ── */}
      <div className="hidden flex-col justify-between bg-primary p-10 text-primary-foreground lg:flex xl:p-14">
        <Link href="/" className="flex items-center gap-2.5">
          <BookOpen className="size-6" />
          <span className="text-xl font-bold">LibraryMS</span>
        </Link>

        <div className="space-y-8">
          <div>
            <h2 className="text-[2rem] font-bold leading-tight">
              Your modern library,
              <br />
              fully organized.
            </h2>
            <p className="mt-3 text-primary-foreground/70">
              Join thousands of libraries managing their collections, members,
              and operations efficiently.
            </p>
          </div>

          <ul className="space-y-3">
            {HIGHLIGHTS.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary-foreground/25">
                  <svg
                    className="size-3"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M2 6l3 3 5-5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-primary-foreground/50">
          © {new Date().getFullYear()} LibraryMS. All rights reserved.
        </p>
      </div>

      {/* ── Right form area ── */}
      <div className="flex flex-col bg-background">
        {/* Mobile logo */}
        <div className="flex items-center px-6 pt-6 lg:hidden">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="size-5 text-primary" />
            <span className="font-bold">LibraryMS</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center px-6 py-10 sm:px-10">
          <div className="w-full max-w-sm">
            {/* Suspense required for pages that use useSearchParams */}
            <Suspense>{children}</Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { BookOpen, Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/features", label: "Features" },
  { href: "/documentation", label: "Documentation" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const toggleTheme = () => {
    if (mounted) setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="app-container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <BookOpen className="size-5 text-primary" />
          <span className="text-base font-bold tracking-tight">LibraryMS</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className="hover:text-foreground">
              {label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            {/* CSS-controlled icon swap — smooth only for theme change */}
            <Sun
              className={cn(
                "size-4 [transition:opacity_0.2s,transform_0.2s]",
                mounted && resolvedTheme === "dark"
                  ? "rotate-0 scale-100 opacity-100"
                  : "rotate-90 scale-0 opacity-0",
              )}
              aria-hidden
            />
            <Moon
              className={cn(
                "absolute size-4 [transition:opacity_0.2s,transform_0.2s]",
                mounted && resolvedTheme !== "dark"
                  ? "rotate-0 scale-100 opacity-100"
                  : "rotate-90 scale-0 opacity-0",
              )}
              aria-hidden
            />
          </button>

          <div className="hidden sm:flex sm:items-center sm:gap-1.5">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground md:hidden"
          >
            {mobileOpen ? (
              <X className="size-4" />
            ) : (
              <Menu className="size-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="border-t border-border bg-background px-4 pb-4 pt-2 md:hidden">
          <ul className="space-y-1">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  {label}
                </Link>
              </li>
            ))}
            <li className="pt-2 flex gap-2 border-t border-border">
              <Link href="/login" className="flex-1">
                <Button variant="outline" size="sm" className="w-full">
                  Sign in
                </Button>
              </Link>
              <Link href="/register" className="flex-1">
                <Button size="sm" className="w-full">
                  Get Started
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

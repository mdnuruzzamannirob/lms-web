"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Moon,
  Sun,
  Menu,
  X,
  LogOut,
  User,
  Settings,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectCurrentUser,
  selectIsAuthenticated,
  clearCredentials,
} from "@/features/auth/authSlice";
import { useLogoutMutation } from "@/store/api/authApi";

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
  const [showUserMenu, setShowUserMenu] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [logout] = useLogoutMutation();

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const toggleTheme = () => {
    if (mounted) setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      dispatch(clearCredentials());
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      setShowUserMenu(false);
      router.push("/");
    }
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

          {!isAuthenticated ? (
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
          ) : (
            <div className="relative hidden sm:flex sm:items-center sm:gap-2">
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-muted"
                >
                  <div className="size-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
                    {user?.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium">{user?.name}</span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-background shadow-lg py-1 z-50">
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted"
                    >
                      <User className="size-4" />
                      Dashboard
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted"
                    >
                      <Settings className="size-4" />
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted text-destructive"
                    >
                      <LogOut className="size-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

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
            {!isAuthenticated ? (
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
            ) : (
              <>
                <li className="pt-2 border-t border-border">
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    <User className="size-4" />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/settings"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    <Settings className="size-4" />
                    Settings
                  </Link>
                </li>
                <li>
                  <div className="flex items-center gap-2 px-3 py-2">
                    <div className="size-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
                      {user?.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium">{user?.name}</span>
                  </div>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileOpen(false);
                    }}
                    className="w-full text-left flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-destructive hover:bg-muted"
                  >
                    <LogOut className="size-4" />
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}

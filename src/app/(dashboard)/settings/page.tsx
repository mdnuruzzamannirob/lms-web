"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Mail, Shield, Bell, Trash2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectCurrentUser, clearCredentials } from "@/features/auth/authSlice";
import { useLogoutMutation } from "@/store/api/authApi";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const [logout] = useLogoutMutation();
  const [displayUser, setDisplayUser] = useState<{
    name?: string;
    email?: string;
    role?: string;
    createdAt?: string;
  } | null>(null);

  useEffect(() => {
    // Get user from Redux first, then fallback to localStorage
    if (user) {
      setDisplayUser(user);
    } else {
      try {
        const stored = localStorage.getItem("user");
        if (stored) {
          setDisplayUser(JSON.parse(stored));
        }
      } catch (err) {
        console.error("Failed to parse user from localStorage:", err);
      }
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      dispatch(clearCredentials());
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      router.push("/");
    }
  };

  if (!displayUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Loading settings...</p>
        </div>
      </div>
    );
  }

  const settingsSections: Array<{
    icon: typeof Mail | typeof Shield | typeof Bell | typeof Trash2;
    title: string;
    description: string;
    items: Array<{
      label: string;
      value: string;
      action?: string;
    }>;
  }> = [
    {
      icon: Mail,
      title: "Email & Notifications",
      description: "Manage your email address and notification preferences",
      items: [
        { label: "Email Address", value: displayUser.email || "N/A" },
        { label: "Email Notifications", value: "Enabled" },
        { label: "Digest Frequency", value: "Weekly" },
      ],
    },
    {
      icon: Shield,
      title: "Security",
      description: "Manage your password and security settings",
      items: [
        { label: "Password", value: "••••••••", action: "Change" },
        {
          label: "Two-Factor Authentication",
          value: "Disabled",
          action: "Enable",
        },
        { label: "Login History", value: "View", action: "View" },
      ],
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Control how you receive updates",
      items: [
        { label: "In-app Notifications", value: "On" },
        { label: "Email Alerts", value: "On" },
        { label: "SMS Alerts", value: "Off" },
        { label: "Book Reservations", value: "On" },
        { label: "Overdue Reminders", value: "On" },
      ],
    },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Header with Back Button */}
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="mt-1 text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => router.back()}
            variant="outline"
            size="sm"
            className="bg-card"
          >
            <ArrowLeft className="mr-2 size-4" />
            Back
          </Button>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 bg-card"
          >
            <LogOut className="mr-2 size-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* User Profile Section */}
      <section className="rounded-lg border border-border bg-card p-6">
        <h2 className="mb-4 text-base font-semibold">Profile Information</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="flex flex-col items-center justify-center">
            <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
              {(displayUser.name || "User")[0].toUpperCase()}
            </div>
            <p className="font-semibold">{displayUser.name}</p>
            <p className="text-sm capitalize text-muted-foreground">
              {displayUser.role || "user"}
            </p>
          </div>
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Email
                </p>
                <p className="mt-1 font-medium">{displayUser.email}</p>
              </div>
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Role
                </p>
                <p className="mt-1 font-medium capitalize">
                  {displayUser.role}
                </p>
              </div>
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Account Status
                </p>
                <p className="mt-1 font-medium flex items-center">
                  <span className="mr-2 inline-block size-2 rounded-full bg-emerald-500"></span>
                  Active
                </p>
              </div>
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Member Since
                </p>
                <p className="mt-1 font-medium">
                  {displayUser.createdAt
                    ? new Date(displayUser.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {settingsSections.map((section) => {
          const Icon = section.icon;
          return (
            <div
              key={section.title}
              className="rounded-lg border border-border bg-card"
            >
              <div className="flex items-start gap-3 border-b border-border p-6">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <Icon className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{section.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {section.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="divide-y divide-border pt-4">
                  {section.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                    >
                      <p className="text-sm font-medium">{item.label}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">
                          {item.value}
                        </span>
                        {item.action && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-xs font-medium text-primary hover:text-primary hover:bg-primary/5"
                          >
                            {item.action}
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Danger Zone */}
      <section className="rounded-lg border border-red-200 bg-red-50/50 p-6 dark:border-red-900/50 dark:bg-red-900/10">
        <div className="flex items-start gap-4">
          <div className="rounded-lg bg-red-100 p-2 text-red-600 dark:bg-red-900/30 dark:text-red-500">
            <Trash2 className="size-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-red-600 dark:text-red-500">
              Danger Zone
            </h3>
            <p className="mt-1 text-sm text-red-600/80 dark:text-red-500/80">
              Actions in this section are irreversible. Please proceed with
              caution.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4 border-red-200 bg-card text-red-600 hover:bg-red-100 hover:text-red-700 dark:border-red-900/50 dark:text-red-500 dark:hover:bg-red-900/50"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </section>

      {/* Info Box */}
      <section className="rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-900/50 dark:bg-blue-900/10">
        <h3 className="font-semibold text-blue-900 dark:text-blue-400">
          ℹ️ Settings Information
        </h3>
        <p className="mt-2 text-sm text-blue-800 dark:text-blue-300">
          This is a demo settings page. Some features like changing password,
          enabling 2FA, and deleting account are placeholders. In a production
          environment, these would be connected to real backend APIs.
        </p>
      </section>
    </div>
  );
}

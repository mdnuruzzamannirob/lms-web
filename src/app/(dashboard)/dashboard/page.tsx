"use client";

import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  BookOpen,
  CalendarCheck2,
  Clock,
  FileText,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/features/auth/authSlice";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const user = useAppSelector(selectCurrentUser);
  const [storedUser, setStoredUser] = useState<{
    name?: string;
    email?: string;
    role?: string;
    createdAt?: string;
  } | null>(null);

  useEffect(() => {
    // Check local storage only on mount if user is missing
    if (!user && !storedUser) {
      try {
        const stored = localStorage.getItem("user");
        if (stored) {
          setStoredUser(JSON.parse(stored));
        }
      } catch (err) {
        console.error("Failed to parse user from localStorage:", err);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const displayUser = user || storedUser;

  if (!displayUser) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const dashboardStats = [
    {
      icon: BookOpen,
      label: "Currently Borrowed",
      value: "2",
      change: "Out of 5 limit",
      color: "bg-sky-500/10 text-sky-700 dark:text-sky-400",
    },
    {
      icon: Clock,
      label: "Due Soon",
      value: "1",
      change: "In next 3 days",
      color: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
    },
    {
      icon: FileText,
      label: "Books Read",
      value: "14",
      change: "+2 this month",
      color: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
    },
    {
      icon: TrendingUp,
      label: "Reading Streak",
      value: "4",
      change: "Weeks in a row",
      color: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400",
    },
  ];

  const timeline = [
    { title: "Borrowed 'The Great Gatsby'", time: "2 days ago" },
    { title: "Returned 'Clean Code'", time: "1 week ago" },
    { title: "Reserved 'Dune'", time: "1 week ago" },
    { title: "Added '1984' to Wishlist", time: "2 weeks ago" },
  ];

  const borrowedBooks = [
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      borrowed: "Jan 20",
      due: "Feb 03",
      status: "On Time",
    },
    {
      title: "Clean Code",
      author: "Robert C. Martin",
      borrowed: "Jan 25",
      due: "Feb 08",
      status: "On Time",
    },
    {
      title: "Design Patterns",
      author: "Gang of Four",
      borrowed: "Feb 01",
      due: "Feb 15",
      status: "Due Soon",
    },
  ];

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {displayUser.name || "Reader"}. Here&apos;s
            what&apos;s happening.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-card">
            <CalendarCheck2 className="mr-2 size-4" /> View Schedule
          </Button>
          <Button onClick={() => router.push("/dashboard/catalog")}>
            <BookOpen className="mr-2 size-4" /> Browse Catalog
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-lg border border-border bg-card p-6"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
                <div className={`rounded-md p-2 ${stat.color}`}>
                  <Icon className="size-4" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="mt-1 flex items-center text-sm text-muted-foreground">
                  <TrendingUp className="mr-1 size-3 text-emerald-500" />
                  {stat.change}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section className="col-span-1 lg:col-span-2 rounded-lg border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-6 py-5">
            <h2 className="text-base font-semibold">Recent Activity</h2>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              View All <ArrowUpRight className="ml-1 size-4" />
            </Button>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {timeline.map((activity, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="relative flex flex-col items-center">
                    {i !== timeline.length - 1 && (
                      <div className="absolute top-6 -bottom-6 w-px bg-border" />
                    )}
                    <div className="z-10 flex size-2.5 items-center justify-center rounded-full bg-primary mt-1.5 ring-4 ring-card" />
                  </div>
                  <div className="flex flex-1 flex-col pb-6 last:pb-0">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="col-span-1 rounded-lg border border-border bg-card">
          <div className="border-b border-border px-6 py-5">
            <h2 className="text-base font-semibold">Account Summary</h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Role</p>
                  <p className="text-sm text-muted-foreground capitalize mt-0.5">
                    {displayUser.role || "user"}
                  </p>
                </div>
                <Users className="size-5 text-muted-foreground" />
              </div>
              <div className="h-px bg-border" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Member Since</p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {displayUser.createdAt
                      ? new Date(displayUser.createdAt).toLocaleDateString()
                      : "Jan 15, 2024"}
                  </p>
                </div>
                <CalendarCheck2 className="size-5 text-muted-foreground" />
              </div>
              <div className="h-px bg-border" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <div className="mt-1 flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                    <ShieldCheck className="size-4" /> Active
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Your Books Section */}
      <section className="rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="text-base font-semibold">Your Borrowed Books</h2>
          <Button variant="outline" size="sm" className="h-8">
            Manage
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr className="border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider text-left">
                <th className="px-6 py-4">Book Title</th>
                <th className="px-6 py-4">Author</th>
                <th className="px-6 py-4">Borrowed</th>
                <th className="px-6 py-4">Due Date</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {borrowedBooks.map((book, i) => (
                <tr key={i} className="transition-colors hover:bg-muted/50">
                  <td className="px-6 py-4 font-medium">{book.title}</td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {book.author}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {book.borrowed}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {book.due}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        book.status === "On Time"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-500"
                          : "bg-amber-100 text-amber-800 dark:bg-amber-500/10 dark:text-amber-500"
                      }`}
                    >
                      {book.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

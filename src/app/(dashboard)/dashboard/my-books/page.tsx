"use client";

import { useState } from "react";
import {
  BookOpen,
  Clock,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const currentLoans = [
  {
    id: 1,
    title: "The Pragmatic Programmer",
    author: "Robert C. Martin",
    dueDate: "Tomorrow",
    status: "Due Soon",
    progress: 65,
  },
  {
    id: 2,
    title: "Dune",
    author: "Frank Herbert",
    dueDate: "In 14 days",
    status: "Reading",
    progress: 20,
  },
];

const loanHistory = [
  {
    id: 3,
    title: "Clean Code",
    author: "Robert C. Martin",
    returnedDate: "10 Feb 2024",
    rating: 5,
  },
  {
    id: 4,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    returnedDate: "15 Jan 2024",
    rating: 4,
  },
];

export default function MyBooksPage() {
  const [activeTab, setActiveTab] = useState("current");

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Books</h1>
          <p className="mt-1 text-muted-foreground">
            Manage your current loans, renewals, and reading history.
          </p>
        </div>
      </div>

      <div className="flex space-x-2 border-b border-border pb-px overflow-x-auto">
        {["current", "history", "holds"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors capitalize ${
              activeTab === tab
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "current" && (
        <div className="grid gap-4">
          {currentLoans.map((loan) => (
            <div
              key={loan.id}
              className="flex flex-col sm:flex-row gap-4 p-5 rounded-lg border border-border bg-card"
            >
              <div className="h-24 w-16 bg-primary/10 rounded border-l-2 border-primary shrink-0 flex items-center justify-center">
                <BookOpen className="size-6 text-primary/40" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-base">{loan.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {loan.author}
                      </p>
                    </div>
                    <span
                      className={`px-2.5 py-1 text-xs font-semibold rounded-full flex items-center gap-1 ${
                        loan.status === "Due Soon"
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                          : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                      }`}
                    >
                      {loan.status === "Due Soon" ? (
                        <AlertTriangle className="size-3" />
                      ) : (
                        <Clock className="size-3" />
                      )}
                      {loan.status}
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div className="w-full sm:max-w-xs space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">
                        Reading Progress
                      </span>
                      <span className="font-medium">{loan.progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${loan.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground font-medium flex items-center gap-1 mt-1">
                      <Clock className="size-3" /> Due: {loan.dueDate}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button variant="outline" size="sm" className="h-8 bg-card">
                      <RefreshCw className="mr-2 size-3.5" /> Renew
                    </Button>
                    <Button size="sm" className="h-8 group">
                      <CheckCircle2 className="mr-2 size-3.5 group-hover:text-emerald-400 transition-colors" />{" "}
                      Return
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "history" && (
        <section className="rounded-lg border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr className="border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider text-left">
                  <th className="px-6 py-4">Book Details</th>
                  <th className="px-6 py-4">Returned On</th>
                  <th className="px-6 py-4">My Rating</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {loanHistory.map((book) => (
                  <tr
                    key={book.id}
                    className="transition-colors hover:bg-muted/50"
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium text-foreground">
                        {book.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {book.author}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {book.returnedDate}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`size-3.5 ${i < book.rating ? "text-amber-500 fill-amber-500" : "text-muted stroke-muted"}`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                          </svg>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm" className="h-8 text-xs">
                        Borrow Again
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {activeTab === "holds" && (
        <div className="grid gap-4">
          <div className="flex flex-col items-center justify-center py-12 text-center rounded-lg border border-dashed border-border bg-card">
            <Clock className="size-12 text-muted-foreground/30 mb-3" />
            <h3 className="text-lg font-medium">No active holds</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
              You haven&apos;t placed any books on hold. Browse the catalog to
              find books you want to join the waitlist for.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

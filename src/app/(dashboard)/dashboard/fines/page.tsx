"use client";

import { useState } from "react";
import {
  CreditCard,
  History,
  Clock,
  FileText,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FinesPage() {
  const [activeTab, setActiveTab] = useState<"pending" | "history">("pending");

  // Mock data for the UI
  const pendingFines = [
    {
      id: "FIN-001",
      book: "The Great Gatsby",
      overdueDays: 5,
      amount: 5.0,
      dateIssued: "2024-03-01",
      status: "pending",
    },
    {
      id: "FIN-002",
      book: "Dune",
      overdueDays: 2,
      amount: 2.0,
      dateIssued: "2024-03-10",
      status: "pending",
    },
  ];

  const paymentHistory = [
    {
      id: "PAY-1042",
      fineId: "FIN-000",
      book: "1984",
      amount: 3.0,
      method: "Stripe",
      datePaid: "2024-02-15",
      status: "completed",
    },
    {
      id: "PAY-0921",
      fineId: "FIN-B92",
      book: "Brave New World",
      amount: 1.0,
      method: "Stripe",
      datePaid: "2024-01-20",
      status: "completed",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Fines & Payments
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your library fines and view payment history. Rate: $1.00 per
            overdue day.
          </p>
        </div>
        <div className="flex gap-2">
          {activeTab === "pending" && pendingFines.length > 0 && (
            <Button className="border border-border">
              <CreditCard className="mr-2 size-4" />
              Pay All Pending ($7.00)
            </Button>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/10 text-red-600">
              <AlertCircle size={20} />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Unpaid Fines
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                $7.00
              </h2>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-600">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Paid
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                $4.00
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-border">
        <button
          onClick={() => setActiveTab("pending")}
          className={`flex items-center gap-2 border-b-2 pb-3 pt-1 text-sm font-medium transition-colors ${
            activeTab === "pending"
              ? "border-primary text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Clock size={16} />
          Pending Fines
          <span className="ml-1 rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-600 dark:bg-red-500/20">
            {pendingFines.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`flex items-center gap-2 border-b-2 pb-3 pt-1 text-sm font-medium transition-colors ${
            activeTab === "history"
              ? "border-primary text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <History size={16} />
          Payment History
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "pending" && (
        <section>
          {pendingFines.length > 0 ? (
            <div className="overflow-x-auto rounded-xl border border-border bg-card">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50 text-muted-foreground">
                    <th className="px-6 py-4 font-medium">Fine ID</th>
                    <th className="px-6 py-4 font-medium">Book</th>
                    <th className="px-6 py-4 font-medium">Overdue Days</th>
                    <th className="px-6 py-4 font-medium">Date Issued</th>
                    <th className="px-6 py-4 font-medium text-right">Amount</th>
                    <th className="px-6 py-4 font-medium text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {pendingFines.map((fine) => (
                    <tr
                      key={fine.id}
                      className="transition-colors hover:bg-muted/20"
                    >
                      <td className="px-6 py-4 font-medium text-foreground">
                        {fine.id}
                      </td>
                      <td className="px-6 py-4 text-foreground">{fine.book}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 dark:bg-red-500/10 dark:text-red-400">
                          {fine.overdueDays} days
                        </span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {new Date(fine.dateIssued).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right font-medium text-foreground">
                        ${fine.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="outline" size="sm" className="h-8">
                          Pay Now
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center rounded-lg border border-dashed border-border bg-card">
              <CheckCircle2 className="size-12 text-emerald-500/50 mb-3" />
              <h3 className="text-lg font-medium">All caught up!</h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
                You have no pending fines. Excellent job returning your books on
                time.
              </p>
            </div>
          )}
        </section>
      )}

      {activeTab === "history" && (
        <section>
          {paymentHistory.length > 0 ? (
            <div className="overflow-x-auto rounded-xl border border-border bg-card">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50 text-muted-foreground">
                    <th className="px-6 py-4 font-medium">Payment ID</th>
                    <th className="px-6 py-4 font-medium">Fine ID</th>
                    <th className="px-6 py-4 font-medium">Book</th>
                    <th className="px-6 py-4 font-medium">Method</th>
                    <th className="px-6 py-4 font-medium">Date Paid</th>
                    <th className="px-6 py-4 font-medium text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {paymentHistory.map((payment) => (
                    <tr
                      key={payment.id}
                      className="transition-colors hover:bg-muted/20"
                    >
                      <td className="px-6 py-4 font-medium text-foreground flex items-center gap-2">
                        <FileText size={14} className="text-muted-foreground" />
                        {payment.id}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {payment.fineId}
                      </td>
                      <td className="px-6 py-4 text-foreground">
                        {payment.book}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-500/10 dark:text-blue-400">
                          {payment.method}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {new Date(payment.datePaid).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right font-medium text-foreground">
                        ${payment.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center rounded-lg border border-dashed border-border bg-card">
              <History className="size-12 text-muted-foreground/30 mb-3" />
              <h3 className="text-lg font-medium">No payment history</h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
                You haven&apos;t made any fine payments yet.
              </p>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

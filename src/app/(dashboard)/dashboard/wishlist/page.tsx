"use client";

import { Heart, BookOpen, Trash2, Library } from "lucide-react";
import { Button } from "@/components/ui/button";

const wishlistItems = [
  {
    id: 1,
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    addedOn: "Feb 10, 2024",
    available: true,
  },
  {
    id: 2,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    addedOn: "Jan 28, 2024",
    available: false,
  },
  {
    id: 3,
    title: "Brave New World",
    author: "Aldous Huxley",
    addedOn: "Jan 15, 2024",
    available: true,
  },
];

export default function WishlistPage() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Your Wishlist</h1>
          <p className="mt-1 text-muted-foreground">
            Books you&apos;ve saved to read later.
          </p>
        </div>
        <Button variant="outline" className="bg-card w-fit">
          <Library className="mr-2 size-4" /> Browse More Books
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishlistItems.map((item) => (
          <div
            key={item.id}
            className="flex p-4 rounded-lg border border-border bg-card gap-4 group"
          >
            <div className="h-24 w-16 bg-primary/5 rounded border border-border shrink-0 flex items-center justify-center relative overflow-hidden group-hover:bg-primary/10 transition-colors">
              <Heart className="size-6 text-primary/30" />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-sm line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground">{item.author}</p>
                <div className="mt-2">
                  <span
                    className={`text-[10px] font-medium px-2 py-0.5 rounded flex w-fit ${
                      item.available
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {item.available ? "Available Now" : "Currently Checked Out"}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-[10px] text-muted-foreground">
                  Added {item.addedOn}
                </span>
                <div className="flex gap-1 border-t border-transparent pt-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                    title="Remove"
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                  <Button
                    size="icon"
                    className="h-7 w-7"
                    disabled={!item.available}
                    title="Borrow"
                  >
                    <BookOpen className="size-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {wishlistItems.length === 0 && (
          <div className="col-span-full py-12 flex flex-col items-center justify-center text-center rounded-lg border border-dashed border-border">
            <Heart className="size-12 text-muted-foreground/30 mb-3" />
            <h3 className="text-lg font-medium">Your wishlist is empty</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
              You haven&apos;t saved any books yet. Browse the catalog and click
              the heart icon to add books here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

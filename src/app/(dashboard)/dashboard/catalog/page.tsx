"use client";

import { useState } from "react";
import { Search, Filter, BookOpen, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const mockBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Fiction",
    status: "Available",
    rating: 4.5,
    cover: "G",
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    category: "Dystopian",
    status: "Waitlist",
    rating: 4.8,
    cover: "1",
  },
  {
    id: 3,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Classic",
    status: "Available",
    rating: 4.9,
    cover: "T",
  },
  {
    id: 4,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    category: "Non-Fiction",
    status: "Available",
    rating: 4.7,
    cover: "S",
  },
  {
    id: 5,
    title: "Dune",
    author: "Frank Herbert",
    category: "Science Fiction",
    status: "Waitlist",
    rating: 4.6,
    cover: "D",
  },
  {
    id: 6,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self-Help",
    status: "Available",
    rating: 4.9,
    cover: "A",
  },
  {
    id: 7,
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    category: "Psychology",
    status: "Available",
    rating: 4.5,
    cover: "T",
  },
  {
    id: 8,
    title: "Brave New World",
    author: "Aldous Huxley",
    category: "Dystopian",
    status: "Available",
    rating: 4.4,
    cover: "B",
  },
];

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Library Catalog</h1>
          <p className="mt-1 text-muted-foreground">
            Explore thousands of books, audiobooks, and digital resources.
          </p>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-lg border border-border bg-card p-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search titles, authors, topics..."
            className="pl-9 bg-muted/30 border-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-card">
            <Filter className="mr-2 size-4" /> Filters
          </Button>
        </div>
      </div>

      {/* Categories / Tabs */}
      <div className="flex space-x-2 border-b border-border pb-px overflow-x-auto">
        {["all", "fiction", "non-fiction", "science", "history"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1).replace("-", " ")}
          </button>
        ))}
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mockBooks.map((book) => (
          <div
            key={book.id}
            className="group rounded-lg border border-border bg-card transition-all hover:shadow-sm hover:border-primary/50 flex flex-col overflow-hidden"
          >
            <div className="aspect-2/3 w-full bg-muted/30 flex items-center justify-center border-b border-border p-6 relative">
              <div className="absolute top-2 right-2 bg-background/90 backdrop-blur border border-border text-xs px-2 py-1 rounded-md font-medium flex items-center gap-1">
                <Star className="size-3 text-amber-500 fill-amber-500" />{" "}
                {book.rating}
              </div>
              <div className="h-full w-3/4 bg-primary/10 rounded border-l-4 border-primary flex items-center justify-center shadow-sm">
                <span className="text-4xl font-serif font-bold text-primary/30">
                  {book.cover}
                </span>
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                  {book.category}
                </span>
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    book.status === "Available"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                      : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                  }`}
                >
                  {book.status}
                </span>
              </div>
              <h3 className="font-semibold text-foreground line-clamp-1">
                {book.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {book.author}
              </p>

              <div className="mt-auto flex items-center gap-2 pt-4">
                {book.status === "Available" ? (
                  <Button className="w-full h-9 text-xs" size="sm">
                    <BookOpen className="mr-2 size-3.5" /> Borrow
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full h-9 text-xs bg-card"
                    size="sm"
                  >
                    <Clock className="mr-2 size-3.5" /> Join Waitlist
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

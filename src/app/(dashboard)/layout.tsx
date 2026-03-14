"use client";

import { useState } from "react";
import {
  Menu,
  X,
  LogOut,
  Settings,
  Home,
  BookOpen,
  Library,
  Heart,
  Clock,
  Bell,
  Search,
  ChevronDown,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectCurrentUser, clearCredentials } from "@/features/auth/authSlice";
import { useLogoutMutation } from "@/store/api/authApi";
import { Input } from "@/components/ui/input";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const [logout] = useLogoutMutation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: Library, label: "Catalog", href: "/dashboard/catalog" },
    { icon: BookOpen, label: "My Books", href: "/dashboard/my-books" },
    { icon: Heart, label: "Wishlist", href: "/dashboard/wishlist" },
    { icon: Clock, label: "Fines & Payments", href: "/dashboard/fines" },
  ];

  const mockNotifications = [
    {
      id: 1,
      title: "Book Due Soon",
      message: "&apos;1984&apos; is due in 3 days.",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      title: "Hold Available",
      message: "&apos;Dune&apos; is ready for pickup.",
      time: "1 day ago",
      unread: true,
    },
    {
      id: 3,
      title: "Welcome!",
      message: "Thanks for joining LibraryMS.",
      time: "1 week ago",
      unread: false,
    },
  ];

  const isActive = (href: string) => pathname === href;

  const firstName = (user?.name || "User").split(" ")[0];

  return (
    <div className="flex h-screen bg-muted/10">
      {/* Mobile Header */}
      <div className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-card px-4 lg:hidden">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <BookOpen size={16} />
          </div>
          <div className="text-sm font-semibold tracking-wide">LibraryMS</div>
        </div>
        <div className="flex items-center gap-1">
          <button className="relative rounded-md p-2 text-muted-foreground hover:bg-accent">
            <Bell size={18} />
            <span className="absolute right-2 top-2 size-2 rounded-full bg-red-600 ring-2 ring-card"></span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-md p-2 hover:bg-accent"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute inset-x-0 top-14 z-20 border-b border-border bg-card px-4 py-3 shadow-sm lg:hidden">
          {" "}
          <div className="mb-3 relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              aria-label="Search"
              placeholder="Search catalog, authors..."
              className="h-10 w-full rounded-md border-border bg-muted/30 pl-9 text-sm focus-visible:ring-1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>{" "}
          <div className="mb-3 rounded-md border border-border bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
            Signed in as{" "}
            <span className="font-medium text-foreground">
              {user?.email || "user@library.com"}
            </span>
          </div>
          <div className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  router.push(item.href);
                  setMobileMenuOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent"
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
            <div className="my-2 border-t border-border"></div>
            <button
              onClick={() => {
                router.push("/settings");
                setMobileMenuOpen(false);
              }}
              className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive("/settings")
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent"
              }`}
            >
              <Settings size={18} />
              Settings
            </button>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-500/10"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Sidebar - Desktop */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-card lg:flex">
        <div className="flex h-16 items-center border-b border-border px-6">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <BookOpen size={18} />
            </div>
            <h1 className="text-base font-bold tracking-tight">LibraryMS</h1>
          </div>
        </div>

        {/* Sidebar Menu */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          <div className="mb-2 px-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Navigation
          </div>
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => router.push(item.href)}
              className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
              }`}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-border p-4">
          <div className="flex w-full items-center gap-3 rounded-md px-3 py-2">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              {(user?.name || "U")[0].toUpperCase()}
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-sm font-medium text-foreground">
                {user?.name || "User Name"}
              </span>
              <span className="truncate text-xs text-muted-foreground">
                {user?.email || "user@library.com"}
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top Bar - Desktop */}
        <header className="hidden h-16 shrink-0 items-center justify-between border-b border-border bg-card px-8 lg:flex relative z-30">
          <div className="relative w-full max-w-md">
            <div
              className={`relative flex items-center w-full rounded-md border ${searchFocused ? "border-primary ring-1 ring-primary/20" : "border-border"} bg-muted/30 transition-shadow`}
            >
              <Search
                size={18}
                className="absolute left-3 text-muted-foreground"
              />
              <Input
                aria-label="Search"
                placeholder="Search catalog, authors, or ISBN..."
                className="h-10 w-full border-none bg-transparent pl-10 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
              />
            </div>

            {/* Search Dropdown Mock */}
            {searchFocused && searchQuery && (
              <div className="absolute left-0 mt-1 w-full rounded-md border border-border bg-card shadow-lg p-2 z-50">
                <p className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Results for &quot;{searchQuery}&quot;
                </p>
                <button className="w-full text-left px-2 py-2 text-sm hover:bg-accent rounded-sm flex items-center gap-2">
                  <Library size={14} className="text-muted-foreground" />
                  Search in Catalog
                </button>
                <button className="w-full text-left px-2 py-2 text-sm hover:bg-accent rounded-sm flex items-center gap-2">
                  <BookOpen size={14} className="text-muted-foreground" />
                  Search in My Books
                </button>
              </div>
            )}
          </div>
          <div className="ml-4 flex items-center gap-4">
            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative flex items-center justify-center rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <Bell size={20} />
                <span className="absolute right-2 top-2 size-2 rounded-full bg-red-600 ring-2 ring-card"></span>
              </button>

              {notificationsOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setNotificationsOpen(false)}
                  ></div>
                  <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-lg border border-border bg-card shadow-lg animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center justify-between border-b border-border px-4 py-3">
                      <p className="text-sm font-semibold text-foreground">
                        Notifications
                      </p>
                      <button className="text-xs text-primary hover:underline">
                        Mark all as read
                      </button>
                    </div>
                    <div className="max-h-80 overflow-y-auto p-2">
                      {mockNotifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`mb-1 flex flex-col gap-1 rounded-md p-3 text-left transition-colors hover:bg-accent ${notif.unread ? "bg-muted/50" : ""}`}
                        >
                          <div className="flex justify-between items-start gap-2">
                            <p className="text-sm font-medium">{notif.title}</p>
                            {notif.unread && (
                              <span className="mt-1 size-2 rounded-full bg-primary shrink-0"></span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {notif.message}
                          </p>
                          <p className="text-[10px] text-muted-foreground/80 mt-1">
                            {notif.time}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-border p-2">
                      <button className="w-full rounded-md py-1.5 text-center text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground">
                        View All
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="h-6 w-px bg-border"></div>

            {/* User Menu Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 rounded-full border border-border p-1 pr-3 transition-colors hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <div className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                  {(user?.name || "U")[0].toUpperCase()}
                </div>
                <div className="hidden text-left sm:block">
                  <p className="text-sm font-medium leading-none">
                    {firstName}
                  </p>
                </div>
                <ChevronDown
                  size={14}
                  className="ml-1 hidden text-muted-foreground sm:block"
                />
              </button>

              {userMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setUserMenuOpen(false)}
                  ></div>
                  <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-lg border border-border bg-card shadow-lg animate-in fade-in slide-in-from-top-2">
                    <div className="border-b border-border px-4 py-3">
                      <p className="text-sm font-medium text-foreground">
                        {user?.name || "User"}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user?.email || "user@library.com"}
                      </p>
                    </div>
                    <div className="p-1">
                      <button
                        onClick={() => {
                          router.push("/dashboard");
                          setUserMenuOpen(false);
                        }}
                        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                      >
                        <Home size={16} />
                        Dashboard
                      </button>
                      <button
                        onClick={() => {
                          router.push("/settings");
                          setUserMenuOpen(false);
                        }}
                        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                      >
                        <Settings size={16} />
                        Settings
                      </button>
                    </div>
                    <div className="border-t border-border p-1">
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/30"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 lg:p-8 w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}

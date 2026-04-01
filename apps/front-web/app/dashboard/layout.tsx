"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@repo/ui";
import { Avatar, AvatarFallback } from "@repo/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui";
import { cn } from "@repo/ui";
import {
  Home,
  Gamepad2,
  Users,
  MessageSquare,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  MessageCircle,
  Zap,
} from "lucide-react";

const sidebarItems = [
  { icon: Home, label: "Home", href: "/dashboard" },
  { icon: Gamepad2, label: "Play Chess", href: "/dashboard/games" },
  { icon: Users, label: "Games", href: "/dashboard/all-games" },
  { icon: Heart, label: "Matches", href: "/dashboard/matches" },
  { icon: MessageSquare, label: "Messages", href: "/dashboard/messages" },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

import { Heart } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full w-64 flex-col border-r border-border/40 bg-gradient-to-b from-card/60 to-card/40 backdrop-blur-md transition-transform duration-200 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-border/30 px-4">
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary/30 to-primary/10 group-hover:shadow-lg group-hover:shadow-primary/20 transition-shadow">
              <Zap className="size-5 text-primary" />
            </div>
            <span className="font-display text-base font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              frontXO
            </span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="size-5" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-0.5 p-4">
          {sidebarItems.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-primary/20 to-primary/10 text-primary shadow-lg shadow-primary/20"
                    : "text-foreground/60 hover:bg-background/50 hover:text-foreground/90",
                )}
              >
                <item.icon className="size-5 flex-shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="border-t border-border/30 p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-all duration-200 hover:bg-background/50 group">
                <Avatar className="size-9 border border-primary/30 shadow-sm shadow-primary/20 group-hover:shadow-primary/40 transition-shadow">
                  <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/5 text-primary font-bold">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 truncate">
                  <p className="text-xs font-bold">John Doe</p>
                  <p className="truncate text-xs text-muted-foreground">
                    Level 8
                  </p>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile">
                  <User className="mr-2 size-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">
                  <Settings className="mr-2 size-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/" className="text-destructive">
                  <LogOut className="mr-2 size-4" />
                  Log Out
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex flex-1 flex-col lg:pl-64">
        {/* Top navbar - sticky with clear separation */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border/40 bg-gradient-to-r from-background/80 to-background/70 backdrop-blur-xl px-4 lg:px-6 shadow-sm">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-foreground/70 hover:text-foreground hover:bg-background/50"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="size-5" />
            <span className="sr-only">Open sidebar</span>
          </Button>

          <div className="flex-1" />

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              className="relative text-foreground/60 hover:text-foreground hover:bg-background/50 transition-all"
            >
              <Bell className="size-5" />
              <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-primary shadow-lg shadow-primary/60" />
            </Button>

            {/* Messages */}
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground/60 hover:text-foreground hover:bg-background/50 transition-all"
            >
              <MessageCircle className="size-5" />
            </Button>

            {/* XP/Level */}
            <div className="hidden items-center gap-2 rounded-lg bg-gradient-to-r from-primary/15 to-primary/5 px-3 py-1.5 sm:flex border border-primary/20 shadow-lg shadow-primary/10">
              <Zap className="size-4 text-primary" />
              <span className="text-xs font-bold text-primary">Level 8</span>
            </div>

            {/* User Avatar */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-background/50 transition-all"
                >
                  <Avatar className="size-8 border border-primary/30 shadow-sm shadow-primary/20 hover:shadow-primary/40 transition-shadow">
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/5 text-primary font-bold text-xs">
                      JD
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">
                    <User className="mr-2 size-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings">
                    <Settings className="mr-2 size-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/" className="text-destructive">
                    <LogOut className="mr-2 size-4" />
                    Log Out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content with proper container and spacing */}
        <main className="flex-1 overflow-auto bg-background">
          <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
            <div className="flex gap-8">
              {/* Center column - dominates the layout */}
              <div className="flex-1 min-w-0">{children}</div>

              {/* Right social panel - fixed width, hidden on smaller screens */}
              <div className="hidden xl:block w-80 flex-shrink-0">
                <div className="sticky top-24">
                  {/* This will be populated by child pages */}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-primary"
    >
      <rect
        width="32"
        height="32"
        rx="8"
        fill="currentColor"
        fillOpacity="0.15"
      />
      <path
        d="M10 10L22 22M22 10L10 22"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle
        cx="16"
        cy="16"
        r="6"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
      />
    </svg>
  );
}

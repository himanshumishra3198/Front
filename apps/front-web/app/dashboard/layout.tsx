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
          "fixed left-0 top-0 z-50 flex h-full w-64 flex-col border-r border-border/50 bg-card/50 backdrop-blur transition-transform duration-200 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-border/30 px-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary/20">
              <Zap className="size-5 text-primary" />
            </div>
            <span className="font-display text-lg font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
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
        <nav className="flex-1 space-y-1 p-4">
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
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/15 text-primary"
                    : "text-foreground/70 hover:bg-primary/10 hover:text-foreground",
                )}
              >
                <item.icon className="size-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="border-t border-border/30 p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-primary/10">
                <Avatar className="size-9 border border-primary/20">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 truncate">
                  <p className="text-sm font-medium">John Doe</p>
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
        {/* Top navbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border/30 bg-card/50 backdrop-blur px-4 lg:px-8">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="size-5" />
            <span className="sr-only">Open sidebar</span>
          </Button>

          <div className="flex-1" />

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="size-5" />
              <span className="absolute top-1 right-1 size-2 rounded-full bg-primary" />
            </Button>

            {/* Messages */}
            <Button variant="ghost" size="icon">
              <MessageCircle className="size-5" />
            </Button>

            {/* XP/Level */}
            <div className="hidden items-center gap-2 rounded-lg bg-primary/10 px-3 py-1.5 sm:flex">
              <Zap className="size-4 text-primary" />
              <span className="text-sm font-semibold text-primary">
                Level 8
              </span>
            </div>

            {/* User Avatar */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="size-8 border border-primary/20">
                    <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
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

        {/* Page content with 3-column layout */}
        <main className="flex-1 overflow-auto">
          <div className="flex h-full gap-6 p-4 lg:p-8">
            {/* Center column */}
            <div className="flex-1 min-w-0">{children}</div>

            {/* Right social panel - hidden on mobile/tablet */}
            <div className="hidden xl:block w-72 flex-shrink-0">
              <div className="sticky top-24">
                <div className="space-y-4">
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

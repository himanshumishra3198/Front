"use client";

import Link from "next/link";
import { Button } from "@repo/ui";
import { cn } from "@repo/ui";

interface NavbarProps {
  className?: string;
  showAuthButtons?: boolean;
}

export function Navbar({ className, showAuthButtons = true }: NavbarProps) {
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg",
        className,
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="font-display text-xl font-bold tracking-tight">
            FrontXO
          </span>
        </Link>

        {showAuthButtons && (
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
}

function Logo() {
  return (
    <svg
      width="32"
      height="32"
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

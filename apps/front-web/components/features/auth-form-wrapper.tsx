"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@repo/ui";
import { cn } from "@repo/ui";

interface AuthFormWrapperProps {
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function AuthFormWrapper({
  title,
  description,
  children,
  footer,
  className,
}: AuthFormWrapperProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 size-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 size-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <Card
        className={cn(
          "relative w-full max-w-md border-border/50 bg-card/80 backdrop-blur-lg",
          className,
        )}
      >
        <CardHeader className="text-center">
          <Link href="/" className="mx-auto mb-4 flex items-center gap-2">
            <Logo />
            <span className="font-display text-xl font-bold">FrontXO</span>
          </Link>
          <CardTitle className="font-display text-2xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {children}
          {footer && (
            <div className="pt-4 text-center text-sm text-muted-foreground">
              {footer}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
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

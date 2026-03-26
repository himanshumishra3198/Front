"use client";

import { useState } from "react";
import { Button } from "@repo/ui";
import { Input } from "@repo/ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui";
import { Field, FieldGroup, FieldLabel } from "@repo/ui";

interface AuthModalProps {
  mode: "login" | "signup";
  trigger: React.ReactNode;
}

export function AuthModal({ mode, trigger }: AuthModalProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentMode, setCurrentMode] = useState(mode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate auth - in production, this would call an auth API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsLoading(false);
    setOpen(false);
    // In production, redirect to dashboard or update auth state
  };

  const toggleMode = () => {
    setCurrentMode(currentMode === "login" ? "signup" : "login");
    setEmail("");
    setPassword("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {currentMode === "login" ? "Welcome back" : "Create an account"}
          </DialogTitle>
          <DialogDescription>
            {currentMode === "login"
              ? "Enter your credentials to continue"
              : "Start your journey to meaningful connections"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="modal-email">Email</FieldLabel>
              <Input
                id="modal-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="modal-password">Password</FieldLabel>
              <Input
                id="modal-password"
                type="password"
                placeholder={
                  currentMode === "login"
                    ? "Enter your password"
                    : "Create a password"
                }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete={
                  currentMode === "login" ? "current-password" : "new-password"
                }
              />
            </Field>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading
                ? currentMode === "login"
                  ? "Signing in..."
                  : "Creating account..."
                : currentMode === "login"
                  ? "Sign In"
                  : "Create Account"}
            </Button>
          </FieldGroup>
        </form>

        <div className="text-center text-sm text-muted-foreground">
          {currentMode === "login" ? (
            <>
              {"Don't have an account? "}
              <button
                type="button"
                onClick={toggleMode}
                className="font-medium text-primary hover:underline"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={toggleMode}
                className="font-medium text-primary hover:underline"
              >
                Sign in
              </button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

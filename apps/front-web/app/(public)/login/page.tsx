"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui";
import { Input } from "@repo/ui";
import { AuthFormWrapper } from "../../../components/features/auth-form-wrapper";
import { Field, FieldGroup, FieldLabel } from "@repo/ui";
import { X } from "lucide-react";
import { useAuthStore } from "../../../stores/auth.store";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isEmailValid = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const canSubmit = email && isEmailValid(email) && password.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!canSubmit) {
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Login failed. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Close Button */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => router.push("/")}
        className="absolute right-4 top-4 z-50"
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </Button>
      <AuthFormWrapper
        title="Welcome back"
        description="Enter your credentials to access your account"
        footer={
          <>
            {"Don't have an account? "}
            <Link
              href="/signup"
              className="font-medium text-primary hover:underline"
            >
              Sign up
            </Link>
          </>
        }
      >
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </Field>

            <div className="flex items-center justify-end">
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Forgot password?
              </Link>
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 p-3 rounded">
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || !canSubmit}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </FieldGroup>
        </form>
      </AuthFormWrapper>
    </div>
  );
}

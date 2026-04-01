"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui";
import { Input } from "@repo/ui";
import { AuthFormWrapper } from "../../components/features/auth-form-wrapper";
import { Field, FieldGroup, FieldLabel } from "@repo/ui";
import { X } from "lucide-react";
import { useAuthStore } from "../../stores/auth.store";
import { UsernameOnboardingModal } from "../onboarding/username-onboarding-modal";

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState<
    "unknown" | "checking" | "available" | "taken" | "error"
  >("unknown");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showUsernameModal, setShowUsernameModal] = useState(false);

  const isEmailValid = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const checkEmailAvailability = async (value: string) => {
    if (!value || !isEmailValid(value)) {
      setEmailStatus("unknown");
      return;
    }

    setEmailStatus("checking");

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
      const url = `${backendUrl}/auth/check-email?email=${encodeURIComponent(value)}`;
      const response = await axios.get<{ available: boolean }>(url);
      setEmailStatus(response.data.available ? "available" : "taken");
    } catch (error) {
      console.error("Email check error", error);
      setEmailStatus("error");
    }
  };

  const debounceTimer = useRef<number | null>(null);

  useEffect(() => {
    if (debounceTimer.current) {
      window.clearTimeout(debounceTimer.current);
      debounceTimer.current = null;
    }

    if (!email || !isEmailValid(email)) {
      setEmailStatus("unknown");
      return;
    }

    debounceTimer.current = window.setTimeout(() => {
      checkEmailAvailability(email);
    }, 500);

    return () => {
      if (debounceTimer.current) {
        window.clearTimeout(debounceTimer.current);
      }
    };
  }, [email]);

  const passwordsMatch =
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password === confirmPassword;
  const canSubmit =
    !isLoading &&
    isEmailValid(email) &&
    emailStatus === "available" &&
    password.length >= 8 &&
    passwordsMatch;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!canSubmit) {
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await signup(email, password);
      setShowUsernameModal(true);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Signup failed. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      {showUsernameModal && <UsernameOnboardingModal email={email} />}

      {!showUsernameModal && (
        <>
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
            title="Create an account"
            description="Start your journey to meaningful connections"
            footer={
              <>
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-primary hover:underline"
                >
                  Sign in
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
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailStatus("unknown");
                    }}
                    onBlur={(e) => checkEmailAvailability(e.target.value)}
                    required
                    autoComplete="email"
                  />

                  <p className="mt-1 text-xs">
                    {emailStatus === "checking" && (
                      <span className="text-muted-foreground">
                        Checking email availability...
                      </span>
                    )}
                    {emailStatus === "available" && (
                      <span className="text-green-500">
                        ✔️ Email is available
                      </span>
                    )}
                    {emailStatus === "taken" && (
                      <span className="text-red-500">
                        ❌ Email is already in use
                      </span>
                    )}
                    {emailStatus === "error" && (
                      <span className="text-red-500">
                        ❌ Unable to verify email right now
                      </span>
                    )}
                    {email && !isEmailValid(email) && (
                      <span className="text-red-500">
                        ❌ Enter a valid email address
                      </span>
                    )}
                  </p>
                </Field>

                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                    minLength={8}
                  />

                  <p className="mt-1 text-xs">
                    {password && password.length < 8 && (
                      <span className="text-red-500">
                        ❌ Password must be at least 8 characters
                      </span>
                    )}
                    {password && password.length >= 8 && (
                      <span className="text-green-500">
                        ✔️ Password is strong enough
                      </span>
                    )}
                  </p>
                </Field>

                <Field>
                  <FieldLabel htmlFor="confirmPassword">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                  />

                  <p className="mt-1 text-xs">
                    {confirmPassword && !passwordsMatch && (
                      <span className="text-red-500">
                        ❌ Passwords do not match
                      </span>
                    )}
                    {confirmPassword && passwordsMatch && (
                      <span className="text-green-500">✔️ Passwords match</span>
                    )}
                  </p>
                </Field>

                <p className="text-xs text-muted-foreground">
                  By signing up, you agree to our{" "}
                  <Link href="#" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </p>

                {error && (
                  <p className="text-sm text-red-500 bg-red-50 p-3 rounded">
                    {error}
                  </p>
                )}

                <Button type="submit" className="w-full" disabled={!canSubmit}>
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </FieldGroup>
            </form>
          </AuthFormWrapper>
        </>
      )}
    </div>
  );
}

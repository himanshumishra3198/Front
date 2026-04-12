"use client";

import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@repo/ui";
import { Input } from "@repo/ui";
import { Button } from "@repo/ui";
import { Badge } from "@repo/ui";
import { Check, AlertCircle } from "lucide-react";
import { useDebounceUsername } from "../../../hooks";
import { useAuthStore } from "../../../stores/auth.store";

type ValidationState = "idle" | "error" | "success" | "checking" | "taken";

interface UsernameOnboardingModalProps {
  email: string;
}

interface SuggestedUsername {
  username: string;
  available: boolean;
}

export function UsernameOnboardingModal({
  email,
}: UsernameOnboardingModalProps) {
  const router = useRouter();
  const { token } = useAuthStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedUsernames, setSuggestedUsernames] = useState<
    SuggestedUsername[]
  >([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(true);
  const [validationState, setValidationState] =
    useState<ValidationState>("idle");

  // Use the debounce hook to check username availability
  const { isUsernameAvailable, isCheckingUsername, isCheckError } =
    useDebounceUsername(username);

  // Fetch suggested usernames on mount
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        setIsLoadingSuggestions(true);
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
        const response = await axios.get<{ usernames: SuggestedUsername[] }>(
          `${backendUrl}/onboarding/suggest-username?email=${encodeURIComponent(email)}`,
        );
        setSuggestedUsernames(response.data.usernames);
      } catch (error) {
        console.error("Error fetching username suggestions:", error);
        setSuggestedUsernames([]);
      } finally {
        setIsLoadingSuggestions(false);
      }
    };

    fetchSuggestions();
  }, [email]);

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Validate username
  const isValidUsername = username.length >= 3 && username.length <= 20;
  const isLowercaseOnly = /^[a-z0-9_]*$/.test(username);

  // Determine validation state
  useEffect(() => {
    if (!username) {
      setValidationState("idle");
    } else if (!isLowercaseOnly) {
      setValidationState("error");
    } else if (isCheckingUsername) {
      setValidationState("checking");
    } else if (isCheckError) {
      setValidationState("error");
    } else if (
      isValidUsername &&
      isLowercaseOnly &&
      isUsernameAvailable === false
    ) {
      setValidationState("taken");
    } else if (
      isValidUsername &&
      isLowercaseOnly &&
      isUsernameAvailable === true
    ) {
      setValidationState("success");
    } else if (username.length > 0) {
      setValidationState("error");
    }
  }, [
    username,
    isValidUsername,
    isLowercaseOnly,
    isCheckingUsername,
    isCheckError,
    isUsernameAvailable,
  ]);

  const handleSuggestionClick = (suggestion: string) => {
    setUsername(suggestion);
    inputRef.current?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidUsername || !isLowercaseOnly) {
      setValidationState("error");
      return;
    }

    setIsLoading(true);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
      const res = await axios.post(
        `${backendUrl}/me/create-userprofile`,
        { username },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const user = res.data;
      console.log("User profile created:", user);
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, username: user.username }),
      );
      router.push("/dashboard");
    } catch (error) {
      console.error("Error updating username:", error);
      setValidationState("error");
    } finally {
      setValidationState("error");
      setIsLoading(false);
    }
  };

  const getValidationMessage = () => {
    if (!username) {
      return {
        text: "Username must be 3–20 characters",
        color: "text-muted-foreground",
      };
    }
    if (!isLowercaseOnly) {
      return {
        text: "Username must be lowercase letters, numbers, and underscores only",
        color: "text-destructive",
      };
    }
    if (username.length < 3 || username.length > 20) {
      return {
        text: "Username must be 3–20 characters",
        color: "text-destructive",
      };
    }
    if (isCheckingUsername) {
      return {
        text: "Checking availability...",
        color: "text-muted-foreground",
      };
    }
    if (isCheckError) {
      return {
        text: "Error checking username availability",
        color: "text-destructive",
      };
    }
    if (isUsernameAvailable === false) {
      return {
        text: "Username is already taken",
        color: "text-destructive",
      };
    }
    if (isValidUsername && isLowercaseOnly && isUsernameAvailable === true) {
      return { text: "Username is available!", color: "text-emerald-500" };
    }
    return {
      text: "Username must be 3–20 characters",
      color: "text-muted-foreground",
    };
  };

  const validation = getValidationMessage();

  return (
    <Dialog open={true} onOpenChange={() => {}}>
      <DialogContent
        showCloseButton={false}
        className="border border-border/40 bg-gradient-to-br from-card/60 to-card/40 backdrop-blur-md shadow-2xl shadow-black/20 sm:max-w-md"
      >
        <DialogHeader className="space-y-3 text-center">
          <DialogTitle className="text-2xl font-bold tracking-tight">
            Choose your username
          </DialogTitle>
          <DialogDescription className="text-sm font-medium text-muted-foreground">
            This is how other people will find you.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Input */}
          <div className="space-y-2">
            <Input
              ref={inputRef}
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase())}
              className={`text-sm placeholder:text-muted-foreground/50 ${
                validationState === "error" || validationState === "taken"
                  ? "border-destructive focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40"
                  : validationState === "success"
                    ? "border-emerald-500/50 focus-visible:ring-emerald-500/20"
                    : ""
              }`}
              disabled={isLoading}
              aria-invalid={
                validationState === "error" || validationState === "taken"
              }
            />

            {/* Validation Message */}
            <div className="flex items-center gap-2">
              {(validationState === "error" || validationState === "taken") && (
                <AlertCircle className="size-4 text-destructive flex-shrink-0" />
              )}
              {validationState === "checking" && (
                <span className="size-4 text-muted-foreground flex-shrink-0 animate-spin">
                  ⏳
                </span>
              )}
              {validationState === "success" && (
                <Check className="size-4 text-emerald-500 flex-shrink-0" />
              )}
              <p className={`text-xs font-medium ${validation.color}`}>
                {validation.text}
              </p>
            </div>
          </div>
          {/* Username Suggestions */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-foreground/80">
              Try one of these:
            </p>
            <div className="flex flex-wrap gap-2">
              {isLoadingSuggestions ? (
                <p className="text-xs text-muted-foreground">
                  Loading suggestions...
                </p>
              ) : suggestedUsernames.length === 0 ? (
                <p className="text-xs text-muted-foreground">
                  No suggestions available
                </p>
              ) : (
                suggestedUsernames.map((suggestion) => (
                  <button
                    key={suggestion.username}
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion.username)}
                    disabled={isLoading}
                    className="group"
                    title={suggestion.available ? "" : "Username unavailable"}
                  >
                    <Badge
                      variant="outline"
                      className={`cursor-pointer transition-all duration-200 ${
                        suggestion.available
                          ? "border-primary/30 bg-primary/5 text-primary/80 hover:border-primary/60 hover:bg-primary/15 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed group-disabled:hover:border-primary/30 group-disabled:hover:bg-primary/5 group-disabled:hover:text-primary/80"
                          : "border-destructive/30 bg-destructive/5 text-destructive/80 opacity-50 cursor-not-allowed"
                      }`}
                    >
                      {suggestion.username}
                      {!suggestion.available && " (taken)"}
                    </Badge>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Continue Button */}
          <Button
            type="submit"
            size="lg"
            disabled={
              !isValidUsername ||
              !isLowercaseOnly ||
              isLoading ||
              isCheckingUsername ||
              isUsernameAvailable === false ||
              isUsernameAvailable === null
            }
            className="w-full font-semibold shadow-lg shadow-primary/40 transition-all duration-200 disabled:shadow-none"
          >
            {isLoading ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Creating account...
              </>
            ) : (
              "Continue"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

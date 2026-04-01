import { useEffect, useRef, useState } from "react";
import axios from "axios";

interface UseDebounceUsernameReturn {
  isUsernameAvailable: boolean | null;
  isCheckingUsername: boolean;
  isCheckError: boolean;
}

export function useDebounceUsername(
  username: string,
  delay: number = 500,
): UseDebounceUsernameReturn {
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<
    boolean | null
  >(null);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isCheckError, setIsCheckError] = useState(false);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Reset state if username is empty
    if (!username || username.length === 0) {
      setIsUsernameAvailable(null);
      setIsCheckingUsername(false);
      setIsCheckError(false);
      return;
    }

    // Set up new debounce timer
    debounceTimer.current = setTimeout(async () => {
      setIsCheckingUsername(true);
      setIsCheckError(false);

      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
        const response = await axios.get<{
          username: string;
          available: boolean;
        }>(
          `${backendUrl}/onboarding/check-username?username=${encodeURIComponent(username)}`,
        );
        setIsUsernameAvailable(response.data.available);
      } catch (error) {
        console.error("Error checking username availability:", error);
        setIsCheckError(true);
        setIsUsernameAvailable(null);
      } finally {
        setIsCheckingUsername(false);
      }
    }, delay);

    // Cleanup function
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [username, delay]);

  return {
    isUsernameAvailable,
    isCheckingUsername,
    isCheckError,
  };
}

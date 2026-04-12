import { create } from "zustand";
import { useAuthStore } from "./auth.store";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

type MatchState = "IDLE" | "SEARCHING" | "MATCH_FOUND" | "ERROR";

interface GameSessionData {
  gameId: string;
  gameType: string;
  opponent?: {
    userId: string;
    username?: string;
  };
}

interface GameStoreState {
  // State
  matchState: MatchState;
  gameSession: GameSessionData | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  startMatchmaking: (gameType: string) => Promise<void>;
  leaveQueue: (gameType: string) => Promise<void>;
  reset: () => void;
  clearError: () => void;
}

export const useGameStore = create<GameStoreState>((set, get) => ({
  // Initial state
  matchState: "IDLE",
  gameSession: null,
  isLoading: false,
  error: null,

  // ✅ Start matchmaking
  startMatchmaking: async (gameType: string) => {
    set({ isLoading: true, error: null, matchState: "SEARCHING" });

    try {
      const { token } = useAuthStore.getState();

      if (!token) {
        throw new Error("Not authenticated");
      }

      const res = await fetch(`${API_URL}/matchmaking/create-game`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ gameType }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to start matchmaking");
      }

      if (data.status === "MATCH_FOUND") {
        set({
          matchState: "MATCH_FOUND",
          gameSession: {
            gameId: data.gameId,
            gameType: data.gameType,
          },
          isLoading: false,
        });
      } else if (data.status === "WAITING") {
        set({
          matchState: "SEARCHING",
          isLoading: false,
        });
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Matchmaking failed";
      set({
        error: errorMessage,
        matchState: "ERROR",
        isLoading: false,
      });
      throw err;
    }
  },

  // ✅ Leave queue
  leaveQueue: async (gameType: string) => {
    set({ isLoading: true, error: null });

    try {
      const { token } = useAuthStore.getState();

      if (!token) {
        throw new Error("Not authenticated");
      }

      const res = await fetch(`${API_URL}/matchmaking/leave`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ gameType }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to leave queue");
      }

      set({
        matchState: "IDLE",
        gameSession: null,
        isLoading: false,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to leave queue";
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw err;
    }
  },

  // ✅ Reset state
  reset: () => {
    set({
      matchState: "IDLE",
      gameSession: null,
      isLoading: false,
      error: null,
    });
  },

  // ✅ Clear error
  clearError: () => {
    set({ error: null });
  },
}));

// Legacy alias for backwards compatibility
export const useMatchStore = useGameStore;

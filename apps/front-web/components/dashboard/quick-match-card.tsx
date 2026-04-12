"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui";
import { Card, CardContent } from "@repo/ui";
import { Gamepad2, ArrowRight } from "lucide-react";
import { useGameStore } from "../../stores/game.store";

interface QuickMatchCardProps {
  gameType: string;
}

export default function QuickMatchCard({ gameType }: QuickMatchCardProps) {
  const router = useRouter();
  const {
    matchState,
    gameSession,
    isLoading,
    error,
    startMatchmaking,
    leaveQueue,
    reset,
    clearError,
  } = useGameStore();

  // Auto-navigate to game when match is found
  useEffect(() => {
    if (matchState === "MATCH_FOUND" && gameSession?.gameId) {
      // Navigate to the game board
      router.push(`/game/${gameSession.gameId}`);
      reset();
    }
  }, [matchState, gameSession, router, reset]);

  const handleFindMatch = async () => {
    try {
      await startMatchmaking(gameType);
    } catch (err) {
      console.error("Failed to start matchmaking:", err);
    }
  };

  const handleLeaveQueue = async () => {
    try {
      await leaveQueue(gameType);
    } catch (err) {
      console.error("Failed to leave queue:", err);
    }
  };

  return (
    <Card className="border-primary/30 bg-gradient-to-br from-primary/15 via-card to-card">
      <CardContent className="pt-8">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/20">
                <Gamepad2 className="size-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold font-display">Play Chess</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Find a player and start connecting through an exciting game
            </p>

            {/* Error State */}
            {error && (
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 mb-4">
                <p className="text-sm text-destructive font-medium">{error}</p>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={clearError}
                  className="mt-2 h-auto p-0 text-destructive hover:text-destructive/80"
                >
                  Dismiss
                </Button>
              </div>
            )}

            {/* Idle State */}
            {matchState === "IDLE" && (
              <Button
                size="lg"
                onClick={handleFindMatch}
                disabled={isLoading}
                className="w-full sm:w-auto"
              >
                {isLoading ? "Finding Match..." : "Find Match"}
                {!isLoading && <ArrowRight className="ml-2 size-4" />}
              </Button>
            )}

            {/* Searching State */}
            {matchState === "SEARCHING" && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Button size="lg" disabled className="w-full sm:w-auto">
                    <span className="flex items-center gap-2">
                      <span className="animate-spin inline-block size-4 border-2 border-background border-t-foreground rounded-full" />
                      Searching…
                    </span>
                  </Button>
                </div>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleLeaveQueue}
                  disabled={isLoading}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
              </div>
            )}

            {/* Match Found State */}
            {matchState === "MATCH_FOUND" && gameSession && (
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <p className="text-sm font-medium text-primary mb-1">
                    ✓ Match Found!
                  </p>
                  <p className="text-sm text-foreground">
                    Game ID:{" "}
                    <span className="font-mono text-xs">
                      {gameSession.gameId}
                    </span>
                  </p>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Redirecting to game board...
                  </span>
                  <span className="animate-spin inline-block size-4 border-2 border-primary border-t-transparent rounded-full" />
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

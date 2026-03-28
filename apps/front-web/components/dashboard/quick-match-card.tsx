import { useState } from "react";
import { Button } from "@repo/ui";
import { Card, CardContent } from "@repo/ui";
import { Gamepad2, ArrowRight } from "lucide-react";

type MatchStatus = "idle" | "searching" | "found";

export default function QuickMatchCard() {
  const [status, setStatus] = useState<MatchStatus>("idle");

  const handleFindMatch = () => {
    setStatus("searching");
    // Simulate finding a match after 3 seconds
    setTimeout(() => {
      setStatus("found");
    }, 3000);
  };

  const handleResetStatus = () => {
    setStatus("idle");
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

            {status === "idle" && (
              <Button
                size="lg"
                onClick={handleFindMatch}
                className="w-full sm:w-auto"
              >
                Find Match
                <ArrowRight className="ml-2 size-4" />
              </Button>
            )}

            {status === "searching" && (
              <div className="flex items-center gap-2">
                <Button size="lg" disabled className="w-full sm:w-auto">
                  <span className="flex items-center gap-2">
                    <span className="animate-spin inline-block size-4 border-2 border-background border-t-foreground rounded-full" />
                    Searching…
                  </span>
                </Button>
              </div>
            )}

            {status === "found" && (
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <p className="text-sm font-medium text-primary mb-1">
                    Match Found!
                  </p>
                  <p className="text-sm text-foreground">
                    You're matched with{" "}
                    <span className="font-semibold">Emma Rodriguez</span> •
                    Rating: 1450
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button size="lg" className="flex-1">
                    Accept & Play
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={handleResetStatus}
                  >
                    Search Again
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

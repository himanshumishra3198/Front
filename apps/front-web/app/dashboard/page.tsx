"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui";
import { Button } from "@repo/ui";
import { Avatar, AvatarFallback } from "@repo/ui";
import { Gamepad2, Heart, Zap, MessageSquare, Play } from "lucide-react";

const mockActiveGames = [
  {
    id: 1,
    opponent: "Sarah Chen",
    initials: "SC",
    status: "Your Move",
    timeRemaining: "2h",
    rating: 1650,
  },
  {
    id: 2,
    opponent: "Alex Rivera",
    initials: "AR",
    status: "Waiting",
    timeRemaining: "5h",
    rating: 1480,
  },
];

const mockSuggestedPlayers = [
  {
    id: 1,
    name: "Emma Watson",
    initials: "EW",
    rating: 1620,
    online: true,
  },
  {
    id: 2,
    name: "Jordan Park",
    initials: "JP",
    rating: 1550,
    online: true,
  },
  {
    id: 3,
    name: "Casey Morgan",
    initials: "CM",
    rating: 1480,
    online: false,
  },
];

const mockActivity = [
  {
    id: 1,
    type: "compliment",
    message: "Alex sent you a compliment",
    time: "2h ago",
  },
  {
    id: 2,
    type: "unlock",
    message: "You unlocked chat with Maya",
    time: "5h ago",
  },
  {
    id: 3,
    type: "match",
    message: "New match with Jordan!",
    time: "1d ago",
  },
];

const mockOnlineUsers = [
  { id: 1, name: "Sarah Chen", initials: "SC" },
  { id: 2, name: "Emma Watson", initials: "EW" },
  { id: 3, name: "Jordan Park", initials: "JP" },
  { id: 4, name: "Casey Morgan", initials: "CM" },
];

export default function DashboardPage() {
  const [matchState, setMatchState] = useState<"idle" | "searching" | "found">(
    "idle",
  );

  const handleFindMatch = () => {
    setMatchState("searching");
    setTimeout(() => setMatchState("found"), 2000);
  };

  return (
    <div className="grid gap-6 xl:grid-cols-3">
      {/* Main Content - CENTER */}
      <div className="xl:col-span-2 space-y-6">
        {/* A) Quick Match Card */}
        <Card className="border-0 bg-gradient-to-br from-primary/20 to-primary/5 overflow-hidden">
          <CardHeader>
            <CardTitle className="font-display text-2xl flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/30">
                <Gamepad2 className="size-6 text-primary" />
              </div>
              Play Chess
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Find a match and start connecting through gameplay
            </p>

            {matchState === "idle" && (
              <Button size="lg" className="w-full" onClick={handleFindMatch}>
                Find Match
              </Button>
            )}

            {matchState === "searching" && (
              <Button size="lg" disabled className="w-full">
                <span className="animate-spin mr-2">⌛</span>
                Searching…
              </Button>
            )}

            {matchState === "found" && (
              <div className="space-y-3 bg-background/50 p-4 rounded-lg border border-primary/20">
                <p className="font-medium text-primary">Match Found!</p>
                <div className="flex items-center gap-3">
                  <Avatar className="size-12 border-2 border-primary/30">
                    <AvatarFallback className="bg-primary/20 text-primary font-bold">
                      EW
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Emma Watson</p>
                    <p className="text-sm text-muted-foreground">
                      Rating: 1620
                    </p>
                  </div>
                </div>
                <Button className="w-full" variant="default">
                  <Play className="size-4 mr-2" />
                  Start Game
                </Button>
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => setMatchState("idle")}
                >
                  Skip
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* B) Active Games Section */}
        <Card className="border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-display text-xl">Active Games</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockActiveGames.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No active games. Find a match to get started!
              </p>
            ) : (
              mockActiveGames.map((game) => (
                <div
                  key={game.id}
                  className="flex items-center gap-3 p-4 rounded-lg bg-background/50 border border-border/30 hover:border-primary/30 transition-colors"
                >
                  <Avatar className="size-10 border border-primary/20">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-bold">
                      {game.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{game.opponent}</p>
                    <p className="text-xs text-muted-foreground">
                      {game.status} • {game.timeRemaining}
                    </p>
                  </div>
                  <Button size="sm" variant="ghost">
                    Resume
                  </Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* C) Connection Progress Card */}
        <Card className="border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-display text-xl">
              Connection Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium">Connection Level</p>
                <p className="text-lg font-bold text-primary">Level 2</p>
              </div>
              <div className="w-full bg-background/50 rounded-full h-2.5">
                <div
                  className="bg-gradient-to-r from-primary to-primary/60 h-2.5 rounded-full transition-all"
                  style={{ width: "65%" }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                1,300 XP to Level 3
              </p>
            </div>

            <div>
              <p className="text-sm font-medium mb-3">Unlockable Features</p>
              <div className="space-y-2">
                <FeatureItem
                  icon={MessageSquare}
                  label="Compliments"
                  unlocked
                />
                <FeatureItem icon={Zap} label="Voice Notes" unlocked={false} />
                <FeatureItem
                  icon={Heart}
                  label="Photo Exchange"
                  unlocked={false}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* D) Suggested Players Section */}
        <Card className="border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-display text-xl">
              Suggested Players
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockSuggestedPlayers.map((player) => (
              <div
                key={player.id}
                className="flex items-center gap-3 p-4 rounded-lg bg-background/50 border border-border/30 hover:border-primary/30 transition-colors"
              >
                <div className="relative">
                  <Avatar className="size-10 border border-primary/20">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-bold">
                      {player.initials}
                    </AvatarFallback>
                  </Avatar>
                  {player.online && (
                    <div className="absolute bottom-0 right-0 size-2.5 bg-green-500 rounded-full border border-background" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{player.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Rating: {player.rating}
                  </p>
                </div>
                <Button size="sm" variant="outline">
                  Challenge
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* RIGHT SOCIAL PANEL */}
      <div className="hidden xl:flex xl:flex-col gap-6">
        {/* A) Online Users List */}
        <Card className="border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-display text-lg">Online Users</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockOnlineUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-background/50 transition-colors"
              >
                <div className="relative">
                  <Avatar className="size-8">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                      {user.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-0 right-0 size-2 bg-green-500 rounded-full border border-background" />
                </div>
                <p className="text-sm font-medium flex-1">{user.name}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* B) Activity Feed */}
        <Card className="border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-display text-lg">
              Activity Feed
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex gap-3 p-3 rounded-lg hover:bg-background/50 transition-colors border-l-2 border-primary/30"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function FeatureItem({
  icon: Icon,
  label,
  unlocked,
}: {
  icon: React.ElementType;
  label: string;
  unlocked: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
        unlocked
          ? "bg-primary/10 border-primary/30"
          : "bg-muted/30 border-border/30"
      }`}
    >
      <Icon
        className={`size-5 ${
          unlocked ? "text-primary" : "text-muted-foreground"
        }`}
      />
      <span className="text-sm font-medium">{label}</span>
      <span className="ml-auto text-xs font-semibold">
        {unlocked ? "✓ Unlocked" : "Locked"}
      </span>
    </div>
  );
}

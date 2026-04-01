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
    <div className="grid gap-8 xl:grid-cols-3">
      {/* Main Content - CENTER */}
      <div className="xl:col-span-2 space-y-8">
        {/* Welcome section with proper spacing */}
        <div className="mb-6">
          <h1 className="font-display text-4xl font-bold tracking-tight">
            Welcome back, John
          </h1>
          <p className="mt-2 text-sm text-muted-foreground font-medium">
            Ready to level up your connections?
          </p>
        </div>

        {/* A) Quick Match Card */}
        <Card className="border border-primary/20 bg-gradient-to-br from-primary/15 via-card to-card/80 overflow-hidden shadow-lg shadow-primary/5 hover:shadow-primary/10 transition-shadow">
          <CardHeader className="pb-5">
            <CardTitle className="font-display text-2xl font-bold tracking-tight flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-lg bg-gradient-to-br from-primary/30 to-primary/10 shadow-lg shadow-primary/20">
                <Gamepad2 className="size-6 text-primary" />
              </div>
              Play Chess
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <p className="text-sm text-muted-foreground font-medium">
              Find a match and start connecting through gameplay
            </p>

            {matchState === "idle" && (
              <Button
                size="lg"
                className="w-full font-semibold shadow-lg shadow-primary/40 hover:shadow-primary/60 transition-all duration-300 bg-gradient-to-r from-primary to-primary/90"
                onClick={handleFindMatch}
              >
                Find Match
              </Button>
            )}

            {matchState === "searching" && (
              <Button size="lg" disabled className="w-full font-semibold">
                <span className="animate-spin mr-2">⌛</span>
                Searching…
              </Button>
            )}

            {matchState === "found" && (
              <div className="space-y-3 bg-background/60 backdrop-blur-sm p-5 rounded-xl border border-primary/20 shadow-lg shadow-primary/10">
                <p className="text-sm font-semibold text-primary">
                  Match Found!
                </p>
                <div className="flex items-center gap-3 bg-background/50 p-3 rounded-lg">
                  <Avatar className="size-12 border-2 border-primary/40 shadow-lg shadow-primary/20">
                    <AvatarFallback className="bg-gradient-to-br from-primary/30 to-primary/10 text-primary font-bold">
                      EW
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">Emma Watson</p>
                    <p className="text-xs text-muted-foreground">
                      Rating: 1620
                    </p>
                  </div>
                </div>
                <Button className="w-full font-semibold shadow-lg shadow-primary/40 hover:shadow-primary/60 transition-all bg-gradient-to-r from-primary to-primary/90">
                  <Play className="size-4 mr-2" />
                  Start Game
                </Button>
                <Button
                  className="w-full font-medium text-foreground/80 hover:text-foreground"
                  variant="ghost"
                  onClick={() => setMatchState("idle")}
                >
                  Skip
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* B) Active Games Section */}
        <Card className="border border-border/40 bg-gradient-to-br from-card/60 to-card/40 backdrop-blur-md shadow-lg shadow-black/10">
          <CardHeader className="pb-5">
            <CardTitle className="font-display text-lg font-bold tracking-tight">
              Active Games
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockActiveGames.length === 0 ? (
              <p className="text-muted-foreground text-center py-8 text-sm">
                No active games. Find a match to get started!
              </p>
            ) : (
              mockActiveGames.map((game) => (
                <div
                  key={game.id}
                  className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-background/80 to-background/40 border border-border/50 hover:border-primary/40 transition-all duration-200 shadow-sm hover:shadow-primary/10"
                >
                  <Avatar className="size-10 border border-primary/30 shadow-sm shadow-primary/20">
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/5 text-primary text-sm font-bold">
                      {game.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm">{game.opponent}</p>
                    <p className="text-xs text-muted-foreground">
                      {game.status} • {game.timeRemaining}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-primary hover:text-primary hover:bg-primary/10 font-medium"
                  >
                    Resume
                  </Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* C) Connection Progress Card */}
        <Card className="border border-border/40 bg-gradient-to-br from-card/60 to-card/40 backdrop-blur-md shadow-lg shadow-black/10">
          <CardHeader className="pb-5">
            <CardTitle className="font-display text-lg font-bold tracking-tight">
              Connection Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">Connection Level</p>
                <p className="text-base font-bold text-primary">Level 2</p>
              </div>
              <div className="w-full bg-background/50 rounded-full h-3 overflow-hidden shadow-inner">
                <div
                  className="bg-gradient-to-r from-primary via-primary to-primary/70 h-3 rounded-full transition-all duration-500 shadow-lg shadow-primary/40"
                  style={{ width: "65%" }}
                />
              </div>
              <p className="text-xs text-muted-foreground font-medium">
                1,300 XP to Level 3
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold mb-4">Unlockable Features</p>
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
        <Card className="border border-border/40 bg-gradient-to-br from-card/60 to-card/40 backdrop-blur-md shadow-lg shadow-black/10">
          <CardHeader className="pb-5">
            <CardTitle className="font-display text-lg font-bold tracking-tight">
              Suggested Players
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockSuggestedPlayers.map((player) => (
              <div
                key={player.id}
                className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-background/80 to-background/40 border border-border/50 hover:border-primary/40 transition-all duration-200 shadow-sm hover:shadow-primary/10"
              >
                <div className="relative">
                  <Avatar className="size-10 border border-primary/30 shadow-sm shadow-primary/20">
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/5 text-primary text-sm font-bold">
                      {player.initials}
                    </AvatarFallback>
                  </Avatar>
                  {player.online && (
                    <div className="absolute bottom-0 right-0 size-2.5 bg-emerald-500 rounded-full border-2 border-background shadow-lg shadow-emerald-500/50" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{player.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Rating: {player.rating}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-primary hover:text-primary hover:bg-primary/10 border-primary/30 font-medium"
                >
                  Challenge
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* RIGHT SOCIAL PANEL */}
      <div className="hidden xl:flex xl:flex-col gap-8">
        {/* A) Online Users List */}
        <Card className="border border-border/40 bg-gradient-to-br from-card/60 to-card/40 backdrop-blur-md shadow-lg shadow-black/10">
          <CardHeader className="pb-5">
            <CardTitle className="font-display text-base font-bold tracking-tight">
              Online Users
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {mockOnlineUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-background/40 transition-colors duration-200"
              >
                <div className="relative">
                  <Avatar className="size-8 border border-primary/20">
                    <AvatarFallback className="bg-gradient-to-br from-primary/15 to-primary/5 text-primary text-xs font-bold">
                      {user.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-0 right-0 size-2 bg-emerald-500 rounded-full border border-background shadow-lg shadow-emerald-500/40" />
                </div>
                <p className="text-xs font-semibold flex-1 truncate">
                  {user.name}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* B) Activity Feed */}
        <Card className="border border-border/40 bg-gradient-to-br from-card/60 to-card/40 backdrop-blur-md shadow-lg shadow-black/10">
          <CardHeader className="pb-5">
            <CardTitle className="font-display text-base font-bold tracking-tight">
              Activity Feed
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {mockActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex gap-2 p-3 rounded-lg hover:bg-background/40 transition-colors duration-200 border-l-2 border-primary/25"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold line-clamp-2">
                    {activity.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
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
      className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 ${
        unlocked
          ? "bg-gradient-to-r from-primary/15 to-primary/5 border-primary/30 shadow-sm shadow-primary/10"
          : "bg-background/40 border-border/30"
      }`}
    >
      <Icon
        className={`size-5 flex-shrink-0 ${
          unlocked ? "text-primary" : "text-muted-foreground/60"
        }`}
      />
      <span
        className={`text-xs font-semibold ${
          unlocked ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        {label}
      </span>
      <span
        className={`ml-auto text-xs font-bold ${
          unlocked ? "text-primary" : "text-muted-foreground/50"
        }`}
      >
        {unlocked ? "✓" : "—"}
      </span>
    </div>
  );
}

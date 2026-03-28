import { Button } from "@repo/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui";
import { Avatar, AvatarFallback } from "@repo/ui";
import { Clock, Swords } from "lucide-react";

interface ActiveGame {
  id: string;
  opponent: {
    name: string;
    initials: string;
    rating: number;
  };
  status: "your_move" | "waiting" | "spectating";
  timeLeft: string;
}

const activeGames: ActiveGame[] = [
  {
    id: "1",
    opponent: {
      name: "Maya Patel",
      initials: "MP",
      rating: 1520,
    },
    status: "your_move",
    timeLeft: "5:23",
  },
  {
    id: "2",
    opponent: {
      name: "Lucas Chen",
      initials: "LC",
      rating: 1480,
    },
    status: "waiting",
    timeLeft: "2:15",
  },
];

export default function ActiveGamesCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-display flex items-center gap-2">
          <Swords className="size-5 text-primary" />
          Active Games
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activeGames.map((game) => (
            <div
              key={game.id}
              className="flex items-center justify-between gap-4 rounded-lg border border-border/50 bg-card/50 p-4 hover:bg-card/80 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1">
                <Avatar className="size-10 border border-primary/20">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {game.opponent.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-sm">{game.opponent.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Rating: {game.opponent.rating}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="flex items-center gap-1 text-xs font-medium">
                    <Clock className="size-3" />
                    {game.timeLeft}
                  </div>
                  <p
                    className={`text-xs font-semibold ${
                      game.status === "your_move"
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {game.status === "your_move" && "Your Move"}
                    {game.status === "waiting" && "Waiting"}
                    {game.status === "spectating" && "Spectating"}
                  </p>
                </div>
                <Button size="sm" variant="ghost">
                  Resume
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

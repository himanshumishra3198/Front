import { Button } from "@repo/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui";
import { Avatar, AvatarFallback } from "@repo/ui";
import { Zap } from "lucide-react";

interface Player {
  id: string;
  name: string;
  initials: string;
  rating: number;
  online: boolean;
}

const suggestedPlayers: Player[] = [
  {
    id: "1",
    name: "Emma Rodriguez",
    initials: "ER",
    rating: 1450,
    online: true,
  },
  {
    id: "2",
    name: "James Wilson",
    initials: "JW",
    rating: 1520,
    online: true,
  },
  {
    id: "3",
    name: "Sophie Turner",
    initials: "ST",
    rating: 1480,
    online: false,
  },
  {
    id: "4",
    name: "Marcus Johnson",
    initials: "MJ",
    rating: 1550,
    online: true,
  },
];

export default function SuggestedPlayersCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-display flex items-center gap-2">
          <Zap className="size-5 text-primary" />
          Suggested Players
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {suggestedPlayers.map((player) => (
            <div
              key={player.id}
              className="flex items-center justify-between gap-3 rounded-lg border border-border/50 bg-card/50 p-3 hover:bg-card/80 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="relative">
                  <Avatar className="size-9 border border-primary/20">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                      {player.initials}
                    </AvatarFallback>
                  </Avatar>
                  {player.online && (
                    <div className="absolute bottom-0 right-0 size-2.5 rounded-full bg-green-500 border border-card" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{player.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Rating: {player.rating}
                  </p>
                </div>
              </div>
              <Button size="sm" variant="default">
                Challenge
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

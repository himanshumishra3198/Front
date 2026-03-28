import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui";
import { Heart, Lock, Unlock } from "lucide-react";

interface UnlockableFeature {
  name: string;
  icon: React.ReactNode;
  unlocked: boolean;
  description: string;
}

const features: UnlockableFeature[] = [
  {
    name: "Compliments",
    icon: <Heart className="size-4" />,
    unlocked: true,
    description: "Send kind words",
  },
  {
    name: "Voice Notes",
    icon: <Unlock className="size-4" />,
    unlocked: false,
    description: "Unlock at Level 2",
  },
  {
    name: "Photo Exchange",
    icon: <Unlock className="size-4" />,
    unlocked: false,
    description: "Unlock at Level 3",
  },
  {
    name: "Video Chat",
    icon: <Lock className="size-4" />,
    unlocked: false,
    description: "Unlock at Level 4",
  },
];

export default function ConnectionProgressCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-display text-lg">
          Connection Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Level indicator */}
        <div>
          <div className="flex items-baseline justify-between mb-2">
            <p className="text-sm font-medium">Current Level</p>
            <p className="text-2xl font-bold text-primary">Level 1</p>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="h-2 rounded-full bg-primary"
              style={{ width: "33%" }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            180 XP to Level 2
          </p>
        </div>

        {/* Features grid */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Unlockable Features</p>
          <div className="grid grid-cols-2 gap-2">
            {features.map((feature) => (
              <div
                key={feature.name}
                className={`p-3 rounded-lg border transition-colors ${
                  feature.unlocked
                    ? "border-primary/20 bg-primary/5"
                    : "border-border/50 bg-muted/30"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className={
                      feature.unlocked
                        ? "text-primary"
                        : "text-muted-foreground"
                    }
                  >
                    {feature.icon}
                  </div>
                  <p className="text-xs font-semibold">{feature.name}</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

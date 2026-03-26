import Link from "next/link";
import { Button } from "@repo/ui";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@repo/ui";
import { Avatar, AvatarFallback } from "@repo/ui";
import { Gamepad2, Users, Trophy, ArrowRight, Clock } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <div>
        <h1 className="font-display text-2xl font-bold md:text-3xl">
          Welcome back, John
        </h1>
        <p className="mt-1 text-muted-foreground">Ready to make some moves?</p>
      </div>

      {/* Stats row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Gamepad2} label="Games Played" value="24" />
        <StatCard icon={Users} label="Matches" value="8" />
        <StatCard icon={Trophy} label="Win Rate" value="67%" />
        <StatCard icon={Clock} label="Avg. Game Time" value="12m" />
      </div>

      {/* Main content grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Play Chess card */}
        <Card className="lg:col-span-2 border-primary/20 bg-gradient-to-br from-primary/10 via-card to-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 font-display text-xl">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/20">
                <ChessIcon className="size-6 text-primary" />
              </div>
              Start Playing Chess
            </CardTitle>
            <CardDescription>
              Find a match and start connecting through gameplay
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button className="flex-1" asChild>
                <Link href="/dashboard/games">
                  Find a Match
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button variant="outline" className="flex-1">
                Practice Mode
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick actions */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/dashboard/matches">
                <Users className="mr-3 size-4" />
                View Matches
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/dashboard/messages">
                <MessageIcon className="mr-3 size-4" />
                Messages
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/dashboard/profile">
                <UserIcon className="mr-3 size-4" />
                Edit Profile
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent matches */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-display text-lg">
              Recent Matches
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/matches">View All</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentMatches.map((match) => (
              <div
                key={match.id}
                className="flex items-center gap-4 rounded-lg border border-border/50 bg-muted/30 p-4 transition-colors hover:bg-muted/50"
              >
                <Avatar className="size-12">
                  <AvatarFallback className="bg-primary/20 text-primary">
                    {match.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">{match.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {match.status}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-primary">
                    {match.connectionLevel}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {match.lastActive}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <Card className="border-border/50">
      <CardContent className="flex items-center gap-4 p-6">
        <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="size-6 text-primary" />
        </div>
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

const recentMatches = [
  {
    id: 1,
    name: "Sarah Chen",
    initials: "SC",
    status: "3 games played together",
    connectionLevel: "Level 2",
    lastActive: "2h ago",
  },
  {
    id: 2,
    name: "Alex Rivera",
    initials: "AR",
    status: "Waiting for your move",
    connectionLevel: "Level 1",
    lastActive: "5h ago",
  },
  {
    id: 3,
    name: "Jordan Kim",
    initials: "JK",
    status: "New match!",
    connectionLevel: "Level 1",
    lastActive: "1d ago",
  },
];

function ChessIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 16l-1.447.724a1 1 0 0 0-.553.894V20h12v-2.382a1 1 0 0 0-.553-.894L16 16" />
      <path d="M8.5 14h7" />
      <path d="M9 10h6" />
      <path d="M12 4v2" />
      <path d="M10 6h4" />
      <path d="M10 6a4 4 0 0 0 0 8h4a4 4 0 0 0 0-8" />
    </svg>
  );
}

function MessageIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui";
import { Avatar, AvatarFallback } from "@repo/ui";
import { Bell, Users, TrendingUp } from "lucide-react";

interface OnlineUser {
  id: string;
  name: string;
  initials: string;
  status: string;
}

interface ActivityFeed {
  id: string;
  type: "compliment" | "match" | "level_up";
  user: string;
  description: string;
  timestamp: string;
}

interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
}

const onlineUsers: OnlineUser[] = [
  { id: "1", name: "Emma Rodriguez", initials: "ER", status: "Playing" },
  { id: "2", name: "James Wilson", initials: "JW", status: "Online" },
  { id: "3", name: "Marcus Johnson", initials: "MJ", status: "Playing" },
  { id: "4", name: "Sophie Turner", initials: "ST", status: "Online" },
];

const activityFeed: ActivityFeed[] = [
  {
    id: "1",
    type: "compliment",
    user: "Alex sent you a compliment",
    description: '"You have an excellent strategy!"',
    timestamp: "2m ago",
  },
  {
    id: "2",
    type: "match",
    user: "You unlocked chat with Maya",
    description: "After reaching Level 2 connection",
    timestamp: "15m ago",
  },
  {
    id: "3",
    type: "level_up",
    user: "Connection Level 2 Unlocked",
    description: "Voice notes now available",
    timestamp: "1h ago",
  },
];

const notifications: Notification[] = [
  {
    id: "1",
    title: "New Match!",
    description: "You matched with Sophie",
    timestamp: "5m ago",
    read: false,
  },
  {
    id: "2",
    title: "Game Invite",
    description: "James invited you to play",
    timestamp: "23m ago",
    read: false,
  },
  {
    id: "3",
    title: "You leveled up!",
    description: "Reached Level 2",
    timestamp: "1h ago",
    read: true,
  },
];

export default function RightSocialPanel() {
  return (
    <div className="space-y-4">
      {/* Online Users */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Users className="size-4 text-primary" />
            Online ({onlineUsers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {onlineUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-2 rounded-lg p-2 hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="relative">
                  <Avatar className="size-7 border border-primary/20">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {user.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-0 right-0 size-1.5 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.status}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activity Feed */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <TrendingUp className="size-4 text-primary" />
            Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activityFeed.map((activity) => (
              <div
                key={activity.id}
                className="rounded-lg p-2 border border-border/30 bg-card/50 hover:bg-card/80 transition-colors"
              >
                <p className="text-xs font-medium text-foreground">
                  {activity.user}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {activity.description}
                </p>
                <p className="text-xs text-muted-foreground/60 mt-1">
                  {activity.timestamp}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notifications Preview */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Bell className="size-4 text-primary" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`rounded-lg p-2 transition-colors ${
                  notif.read
                    ? "bg-card/50 hover:bg-card/80"
                    : "bg-primary/5 border border-primary/20 hover:bg-primary/10"
                }`}
              >
                <div className="flex items-start gap-2">
                  {!notif.read && (
                    <div className="mt-1 size-1.5 rounded-full bg-primary flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium">{notif.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {notif.description}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground/60 mt-1">
                  {notif.timestamp}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

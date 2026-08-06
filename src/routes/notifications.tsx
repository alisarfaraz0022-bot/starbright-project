import { createFileRoute } from "@tanstack/react-router";
import { Bell, CalendarClock, Layers, Settings2, TrendingUp, Wallet } from "lucide-react";
import { useState } from "react";

import { AppShell } from "@/components/app-shell";
import { Switch } from "@/components/ui/switch";
import { notifications, type Notification } from "@/lib/keep-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — Keep Tutors" },
      {
        name: "description",
        content:
          "New tuition matches, interview and demo updates, payout alerts and verification reminders, with per-channel controls.",
      },
      { property: "og:title", content: "Notifications — Keep Tutors" },
      {
        property: "og:description",
        content: "Match alerts, stage updates and payout notices in one inbox.",
      },
    ],
  }),
  component: NotificationsPage,
});

const kindMeta: Record<Notification["kind"], { icon: React.ReactNode; tone: string }> = {
  match: { icon: <Layers className="h-4.5 w-4.5" />, tone: "bg-primary-soft text-primary" },
  stage: { icon: <TrendingUp className="h-4.5 w-4.5" />, tone: "bg-info-soft text-info" },
  payout: { icon: <Wallet className="h-4.5 w-4.5" />, tone: "bg-success-soft text-success" },
  session: {
    icon: <CalendarClock className="h-4.5 w-4.5" />,
    tone: "bg-accent-soft text-accent-foreground",
  },
  system: { icon: <Bell className="h-4.5 w-4.5" />, tone: "bg-warning-soft text-warning" },
};

function NotificationsPage() {
  const [read, setRead] = useState<string[]>(
    notifications.filter((n) => !n.unread).map((n) => n.id),
  );
  const [prefs, setPrefs] = useState({ matches: true, stages: true, payouts: true, digest: false });

  return (
    <AppShell title="Notifications" subtitle="Everything that moved since you last checked">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {notifications.length - read.length} unread
        </p>
        <button
          onClick={() => setRead(notifications.map((n) => n.id))}
          className="press text-xs font-bold text-primary"
        >
          Mark all read
        </button>
      </div>

      <ul className="mb-6 space-y-2">
        {notifications.map((n) => {
          const isRead = read.includes(n.id);
          const meta = kindMeta[n.kind];
          return (
            <li key={n.id}>
              <button
                onClick={() => setRead(isRead ? read.filter((i) => i !== n.id) : [...read, n.id])}
                className={cn(
                  "press surface flex w-full items-start gap-3 p-4 text-left",
                  !isRead && "border-primary/25",
                )}
              >
                <span className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-xl", meta.tone)}>
                  {meta.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="truncate text-sm font-extrabold">{n.title}</span>
                    {!isRead && <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />}
                  </span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                    {n.body}
                  </span>
                  <span className="mt-1.5 block text-[11px] font-bold text-muted-foreground/80">
                    {n.time}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <section className="surface p-5">
        <div className="mb-4 flex items-center gap-2">
          <Settings2 className="h-4.5 w-4.5 text-primary" />
          <h2 className="text-base font-bold">Alert preferences</h2>
        </div>
        <ul className="divide-y divide-border">
          {(
            [
              ["matches", "New tuition matches", "Instant alert when an opening fits your profile"],
              ["stages", "Application updates", "Shortlist, interview and demo changes"],
              ["payouts", "Payout alerts", "When money is processed or released"],
              ["digest", "Weekly digest", "One summary email every Sunday"],
            ] as const
          ).map(([key, label, desc]) => (
            <li key={key} className="flex items-center gap-4 py-3.5">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
              <Switch
                checked={prefs[key]}
                onCheckedChange={(v) => setPrefs({ ...prefs, [key]: v })}
              />
            </li>
          ))}
        </ul>
      </section>
    </AppShell>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, CheckCircle2, MessageSquare, Video } from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/app-shell";
import { currency, hired } from "@/lib/keep-data";

export const Route = createFileRoute("/hired")({
  head: () => ({
    meta: [
      { title: "My Hired Tuitions — Keep Tutors" },
      {
        name: "description",
        content:
          "Manage your confirmed students: session progress, attendance rate, monthly fee and the next scheduled class.",
      },
      { property: "og:title", content: "My Hired Tuitions — Keep Tutors" },
      {
        property: "og:description",
        content: "Confirmed students, session progress and attendance in one view.",
      },
    ],
  }),
  component: HiredPage,
});

function HiredPage() {
  return (
    <AppShell title="My Hired Tuitions" subtitle="Your confirmed students and their progress">
      <ul className="space-y-3 pb-4">
        {hired.map((h) => {
          const pct = Math.round((h.sessionsDone / h.sessionsPlanned) * 100);
          return (
            <li key={h.id} className="surface rise p-5">
              <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
                <span className="gradient-plum grid h-11 w-11 shrink-0 place-items-center rounded-2xl font-display text-base font-extrabold text-primary-foreground">
                  {h.student.charAt(0)}
                </span>
                <div className="min-w-0">
                  <h2 className="truncate text-base font-extrabold">{h.student}</h2>
                  <p className="truncate text-xs font-semibold text-muted-foreground">
                    {h.grade} · {h.subjects} · {h.city}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                <Metric label="Monthly fee" value={currency(h.fee).replace("PKR ", "")} />
                <Metric label="Attendance" value={`${h.attendanceRate}%`} />
                <Metric label="Sessions" value={`${h.sessionsDone}/${h.sessionsPlanned}`} />
              </div>

              <div className="mt-4">
                <div className="mb-1.5 flex items-center justify-between text-[11px] font-bold text-muted-foreground">
                  <span>Term progress</span>
                  <span>{pct}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div className="gradient-plum h-full rounded-full" style={{ width: `${pct}%` }} />
                </div>
              </div>

              <p className="mt-4 flex items-center gap-2 rounded-2xl bg-secondary/60 px-3 py-2.5 text-xs font-bold text-primary">
                <CalendarDays className="h-4 w-4 shrink-0" />
                Next session: {h.nextSession}
              </p>

              <div className="mt-3 grid grid-cols-3 gap-2">
                <Action
                  icon={<CheckCircle2 className="h-4 w-4" />}
                  label="Mark done"
                  onClick={() =>
                    toast.success("Session marked complete", {
                      description: `${h.student} — attendance recorded.`,
                    })
                  }
                />
                <Action
                  icon={<Video className="h-4 w-4" />}
                  label="Join"
                  onClick={() => toast("Opening session room…")}
                />
                <Action
                  icon={<MessageSquare className="h-4 w-4" />}
                  label="Message"
                  onClick={() => toast("Coordinator chat opening…")}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </AppShell>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-secondary/50 p-3 text-center">
      <p className="font-display text-sm font-extrabold leading-none">{value}</p>
      <p className="mt-1 text-[10.5px] font-bold text-muted-foreground">{label}</p>
    </div>
  );
}

function Action({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="press flex items-center justify-center gap-1.5 rounded-full border border-border bg-card py-2.5 text-xs font-bold text-foreground/80 hover:bg-muted"
    >
      {icon}
      {label}
    </button>
  );
}

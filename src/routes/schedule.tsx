import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, CheckCircle2, Clock, MapPin, Video } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/app-shell";
import { hired, sessions } from "@/lib/keep-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/schedule")({
  head: () => ({
    meta: [
      { title: "Schedule & Attendance — Keep Tutors" },
      {
        name: "description",
        content:
          "Your weekly tuition timetable with session reminders, attendance marking and completion streaks for every student.",
      },
      { property: "og:title", content: "Schedule & Attendance — Keep Tutors" },
      {
        property: "og:description",
        content: "Weekly timetable, reminders and attendance for all your tuitions.",
      },
    ],
  }),
  component: SchedulePage,
});

const DAYS = ["Today", "Tomorrow", "Friday", "Saturday"];

function SchedulePage() {
  const [day, setDay] = useState<string>("Today");
  const [done, setDone] = useState<string[]>(
    sessions.filter((s) => s.status === "Completed").map((s) => s.id),
  );
  const list = sessions.filter((s) => s.day === day);
  const weekTotal = sessions.length;
  const completed = done.length;

  return (
    <AppShell title="Schedule & Attendance" subtitle="Your week, session by session">
      <section className="rise mb-4 grid grid-cols-3 gap-3">
        <Stat value={String(weekTotal)} label="Sessions this week" />
        <Stat value={String(completed)} label="Completed" />
        <Stat value={String(hired.length)} label="Students" />
      </section>

      <div className="no-scrollbar -mx-4 mb-5 flex gap-2 overflow-x-auto px-4">
        {DAYS.map((d) => (
          <button
            key={d}
            onClick={() => setDay(d)}
            className={cn(
              "press shrink-0 rounded-2xl border px-4 py-3 text-xs font-bold",
              day === d
                ? "border-transparent bg-primary text-primary-foreground shadow-glow"
                : "border-border bg-card text-foreground/80",
            )}
          >
            {d}
            <span className="mt-0.5 block text-[10px] font-semibold opacity-70">
              {sessions.filter((s) => s.day === d).length} sessions
            </span>
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <div className="surface p-8 text-center">
          <p className="text-sm font-bold">No sessions on {day.toLowerCase()}</p>
        </div>
      ) : (
        <ul className="relative space-y-3 pb-4 pl-6">
          <span className="absolute bottom-6 left-2 top-4 w-px bg-border" />
          {list.map((s) => {
            const isDone = done.includes(s.id);
            return (
              <li key={s.id} className="relative">
                <span
                  className={cn(
                    "absolute -left-6 top-6 h-3 w-3 rounded-full border-2 border-background",
                    isDone ? "bg-success" : "bg-primary",
                  )}
                />
                <div className="surface rise p-5">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                    <div className="min-w-0">
                      <h2 className="truncate text-base font-extrabold">{s.student}</h2>
                      <p className="truncate text-xs font-semibold text-muted-foreground">
                        {s.subject}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-primary-soft px-2.5 py-1 text-[11px] font-bold text-primary">
                      {s.time}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      {s.mode === "Online Tuition" ? (
                        <Video className="h-3.5 w-3.5" />
                      ) : (
                        <MapPin className="h-3.5 w-3.5" />
                      )}
                      {s.mode}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      90 min
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {s.day}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      if (isDone) {
                        setDone(done.filter((id) => id !== s.id));
                        return;
                      }
                      setDone([...done, s.id]);
                      toast.success("Attendance recorded", {
                        description: `${s.student} — ${s.subject}, ${s.time}.`,
                      });
                    }}
                    className={cn(
                      "press mt-4 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-bold",
                      isDone
                        ? "bg-success-soft text-success"
                        : "gradient-plum shadow-glow text-primary-foreground",
                    )}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    {isDone ? "Attendance recorded" : "Mark attendance"}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </AppShell>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="surface p-4 text-center">
      <p className="font-display text-xl font-extrabold leading-none">{value}</p>
      <p className="mt-1 text-[10.5px] font-bold text-muted-foreground">{label}</p>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, Clock3, MapPin } from "lucide-react";
import { useState } from "react";

import { AppShell } from "@/components/app-shell";
import { applications, currency, STAGES, type Stage } from "@/lib/keep-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pipeline")({
  head: () => ({
    meta: [
      { title: "My Applications — Keep Tutors" },
      {
        name: "description",
        content:
          "Follow every tuition application through screening, shortlisting, interview, demo session and hiring with live status updates.",
      },
      { property: "og:title", content: "My Applications — Keep Tutors" },
      {
        property: "og:description",
        content: "Track your tuition applications across every hiring stage.",
      },
    ],
  }),
  component: PipelinePage,
});

const stageTone: Record<Stage, string> = {
  Screening: "bg-info-soft text-info",
  "Short Listed": "bg-accent-soft text-accent-foreground",
  Interview: "bg-warning-soft text-warning",
  "Demo Session": "bg-primary-soft text-primary",
  Hired: "bg-success-soft text-success",
  "Not Selected": "bg-muted text-muted-foreground",
};

function PipelinePage() {
  const [open, setOpen] = useState<Stage | null>("Interview");

  return (
    <AppShell title="My Applications" subtitle="Track your progress across every hiring stage">
      <div className="mb-5 flex gap-2 overflow-x-auto no-scrollbar">
        {STAGES.map(({ key }) => {
          const count = applications.filter((a) => a.stage === key).length;
          return (
            <div
              key={key}
              className="surface flex shrink-0 flex-col items-center gap-1 px-4 py-3 text-center"
            >
              <span className="font-display text-lg font-extrabold leading-none">{count}</span>
              <span className="text-[10.5px] font-bold text-muted-foreground">{key}</span>
            </div>
          );
        })}
      </div>

      <ul className="space-y-3 pb-4">
        {STAGES.map(({ key, hint }) => {
          const items = applications.filter((a) => a.stage === key);
          const expanded = open === key;
          return (
            <li key={key} className="surface overflow-hidden">
              <button
                onClick={() => setOpen(expanded ? null : key)}
                className="press flex w-full items-center gap-3 p-5 text-left"
              >
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300",
                    expanded && "rotate-180",
                  )}
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-base font-extrabold">{key}</span>
                  <span className="block truncate text-xs text-muted-foreground">{hint}</span>
                </span>
                <span
                  className={cn(
                    "grid h-7 min-w-7 shrink-0 place-items-center rounded-full px-2 text-xs font-bold",
                    stageTone[key],
                  )}
                >
                  {items.length}
                </span>
              </button>

              <div
                className="grid transition-all duration-400 ease-out"
                style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <div className="space-y-2 px-5 pb-5">
                    {items.length === 0 ? (
                      <p className="rounded-2xl bg-secondary/60 p-4 text-xs font-semibold text-muted-foreground">
                        Nothing at this stage right now.
                      </p>
                    ) : (
                      items.map((a) => (
                        <div
                          key={a.id}
                          className="rounded-2xl border border-border bg-secondary/50 p-4"
                        >
                          <p className="text-sm font-extrabold leading-snug">{a.title}</p>
                          <p className="mt-0.5 text-xs font-semibold text-muted-foreground">
                            {a.code}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5" />
                              {a.city}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock3 className="h-3.5 w-3.5" />
                              {new Date(a.updatedAt).toLocaleDateString("en-PK", {
                                day: "numeric",
                                month: "short",
                              })}
                            </span>
                            <span className="font-bold text-foreground">{currency(a.fee)}</span>
                          </div>
                          {a.next && (
                            <p className="mt-3 rounded-xl bg-card px-3 py-2 text-xs font-semibold text-primary">
                              Next: {a.next}
                            </p>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </AppShell>
  );
}

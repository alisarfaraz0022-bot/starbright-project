import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { AppShell } from "@/components/app-shell";
import { Input } from "@/components/ui/input";
import { currency, tuitions, type Tuition } from "@/lib/keep-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/status")({
  head: () => ({
    meta: [
      { title: "All Tuitions Status — Keep Tutors" },
      {
        name: "description",
        content:
          "See the live status of every tuition listing: approved, under review, on hold or closed and hired, with fees and locations.",
      },
      { property: "og:title", content: "All Tuitions Status — Keep Tutors" },
      {
        property: "og:description",
        content: "Live status for every Keep Tutors listing in one searchable list.",
      },
    ],
  }),
  component: StatusPage,
});

const tone: Record<Tuition["status"], string> = {
  Approved: "bg-success-soft text-success",
  "Under Review": "bg-warning-soft text-warning",
  "On Hold": "bg-muted text-muted-foreground",
  "Closed and Hired": "bg-primary-soft text-primary",
};

const FILTERS = ["All", "Approved", "Under Review", "Closed and Hired"] as const;

function StatusPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tuitions
      .filter((t) => (filter === "All" ? true : t.status === filter))
      .filter((t) =>
        q ? [t.code, t.grade, t.subjects, t.city].join(" ").toLowerCase().includes(q) : true,
      );
  }, [query, filter]);

  return (
    <AppShell title="All Tuitions Status" subtitle="Every listing and where it currently stands">
      <div className="relative mb-3">
        <Search className="absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by code, grade or city"
          className="h-12 rounded-2xl border-border bg-card pl-11 text-sm font-medium shadow-card"
        />
      </div>

      <div className="no-scrollbar -mx-4 mb-5 flex gap-2 overflow-x-auto px-4">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "press shrink-0 rounded-full border px-3.5 py-2 text-xs font-bold",
              filter === f
                ? "border-transparent bg-primary text-primary-foreground shadow-glow"
                : "border-border bg-card text-foreground/80",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <ul className="space-y-3 pb-4">
        {list.map((t) => (
          <li key={t.id} className="surface rise p-5">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
              <div className="min-w-0">
                <h2 className="text-base font-extrabold leading-snug">
                  {t.grade} — {t.subjects}
                </h2>
                <p className="mt-1 text-xs font-semibold text-muted-foreground">{t.code}</p>
              </div>
              <span
                className={cn(
                  "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold",
                  tone[t.status],
                )}
              >
                {t.status}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold text-muted-foreground">
              <span>
                {t.area}, {t.city}
              </span>
              <span>{t.mode}</span>
              <span className="text-foreground">{currency(t.budget)}</span>
            </div>
          </li>
        ))}
        {list.length === 0 && (
          <li className="surface p-8 text-center text-sm font-bold">No listings found</li>
        )}
      </ul>
    </AppShell>
  );
}

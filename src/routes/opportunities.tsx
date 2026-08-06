import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Banknote,
  CalendarClock,
  Clock,
  Eye,
  MapPin,
  Search,
  SlidersHorizontal,
  Users,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/app-shell";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { CITIES, currency, tuitions, type GenderPref, type Tuition } from "@/lib/keep-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/opportunities")({
  head: () => ({
    meta: [
      { title: "Tuition Opportunities — Keep Tutors" },
      {
        name: "description",
        content:
          "Browse live home and online tuition openings across Pakistan, filter by city, mode, gender preference and budget, then apply in one tap.",
      },
      { property: "og:title", content: "Tuition Opportunities — Keep Tutors" },
      {
        property: "og:description",
        content: "Live home and online tuition openings, filtered to match how you teach.",
      },
    ],
  }),
  component: OpportunitiesPage,
});

type SortKey = "newest" | "budget" | "nearest";

function OpportunitiesPage() {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState<string | null>(null);
  const [mode, setMode] = useState<string | null>(null);
  const [gender, setGender] = useState<GenderPref | null>(null);
  const [sort, setSort] = useState<SortKey>("newest");
  const [selected, setSelected] = useState<Tuition | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = tuitions
      .filter((t) => t.status === "Approved" || t.status === "Under Review")
      .filter((t) =>
        q
          ? [t.grade, t.subjects, t.code, t.city, t.area, t.board]
              .join(" ")
              .toLowerCase()
              .includes(q)
          : true,
      )
      .filter((t) => (city ? t.city === city : true))
      .filter((t) => (mode ? t.mode === mode : true))
      .filter((t) => (gender ? t.gender === gender : true));

    return [...list].sort((a, b) => {
      if (sort === "budget") return b.budget - a.budget;
      if (sort === "nearest") return a.distanceKm - b.distanceKm;
      return +new Date(b.postedAt) - +new Date(a.postedAt);
    });
  }, [query, city, mode, gender, sort]);

  const activeFilters = [city, mode, gender].filter(Boolean).length;

  return (
    <AppShell
      title="Tuition Opportunities"
      subtitle="Live openings matched to your subjects and city"
    >
      <div className="sticky top-[68px] z-30 -mx-4 mb-4 bg-background/85 px-4 pb-3 pt-1 backdrop-blur-xl">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search grade, subject or code"
            className="h-12 rounded-2xl border-border bg-card pl-11 text-sm font-medium shadow-card"
          />
        </div>

        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
          <Chip label="Newest" active={sort === "newest"} onClick={() => setSort("newest")} />
          <Chip
            label="Highest fee"
            active={sort === "budget"}
            onClick={() => setSort("budget")}
            icon={<Banknote className="h-3.5 w-3.5" />}
          />
          <Chip
            label="Nearest"
            active={sort === "nearest"}
            onClick={() => setSort("nearest")}
            icon={<MapPin className="h-3.5 w-3.5" />}
          />
          {activeFilters > 0 && (
            <button
              onClick={() => {
                setCity(null);
                setMode(null);
                setGender(null);
              }}
              className="press flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-2 text-xs font-bold text-destructive"
            >
              <X className="h-3.5 w-3.5" />
              Clear {activeFilters}
            </button>
          )}
        </div>
      </div>

      <FilterRow label="City">
        {CITIES.map((c) => (
          <Chip key={c} label={c} active={city === c} onClick={() => setCity(city === c ? null : c)} />
        ))}
      </FilterRow>

      <FilterRow label="Mode">
        {["Home Tuition", "Online Tuition"].map((m) => (
          <Chip key={m} label={m} active={mode === m} onClick={() => setMode(mode === m ? null : m)} />
        ))}
      </FilterRow>

      <FilterRow label="Gender preference">
        {(["Any", "Female", "Male"] as GenderPref[]).map((g) => (
          <Chip
            key={g}
            label={g}
            active={gender === g}
            onClick={() => setGender(gender === g ? null : g)}
          />
        ))}
      </FilterRow>

      <p className="mb-3 mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
        <SlidersHorizontal className="h-3.5 w-3.5" />
        {results.length} {results.length === 1 ? "opening" : "openings"}
      </p>

      {results.length === 0 ? (
        <div className="surface p-8 text-center">
          <p className="text-sm font-bold">No openings match these filters</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Try widening the city or clearing the gender preference.
          </p>
        </div>
      ) : (
        <ul className="space-y-3 pb-4">
          {results.map((t) => (
            <li key={t.id} className="surface rise overflow-hidden p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 text-[11px] font-bold",
                    t.mode === "Home Tuition"
                      ? "bg-info-soft text-info"
                      : "bg-success-soft text-success",
                  )}
                >
                  {t.mode}
                </span>
                {t.applicants < 5 && (
                  <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-bold text-accent-foreground">
                    Low competition
                  </span>
                )}
              </div>
              <h2 className="mt-3 text-base font-extrabold leading-snug">
                {t.grade} — {t.subjects}
              </h2>
              <p className="mt-1 text-xs font-semibold text-muted-foreground">
                {t.code} · {t.board}
              </p>
              <div className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                <p className="flex items-start gap-1.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    {t.area}, {t.city}
                    {t.distanceKm > 0 && ` · ${t.distanceKm} km away`}
                  </span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 shrink-0" />
                  {t.timings}
                </p>
                <p className="flex items-center gap-1.5">
                  <Users className="h-4 w-4 shrink-0" />
                  {t.applicants} applied · {t.gender} tutor preferred
                </p>
              </div>
              <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-t border-border pt-4">
                <div className="min-w-0">
                  <p className="font-display text-lg font-extrabold">{currency(t.budget)}</p>
                  <p className="text-[11px] font-semibold text-muted-foreground">per month</p>
                </div>
                <button
                  onClick={() => setSelected(t)}
                  className="press gradient-plum shadow-glow inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-3 text-sm font-bold text-primary-foreground"
                >
                  <Eye className="h-4 w-4" />
                  View details
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent side="bottom" className="max-h-[88vh] overflow-y-auto rounded-t-3xl p-0">
          {selected && <TuitionDetail t={selected} onApplied={() => setSelected(null)} />}
        </SheetContent>
      </Sheet>
    </AppShell>
  );
}

function TuitionDetail({ t, onApplied }: { t: Tuition; onApplied: () => void }) {
  return (
    <div>
      <div className="gradient-plum px-5 pb-6 pt-6 text-primary-foreground">
        <p className="text-xs font-bold uppercase tracking-[0.18em] opacity-80">{t.code}</p>
        <h2 className="mt-2 text-xl font-extrabold leading-snug">
          {t.grade} — {t.subjects}
        </h2>
        <p className="mt-1 text-sm opacity-85">{t.board}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-primary-foreground/15 px-3 py-1.5 text-xs font-bold backdrop-blur">
            {t.mode}
          </span>
          <span className="rounded-full bg-primary-foreground/15 px-3 py-1.5 text-xs font-bold backdrop-blur">
            {t.gender} tutor
          </span>
          <span className="rounded-full bg-primary-foreground/15 px-3 py-1.5 text-xs font-bold backdrop-blur">
            {t.status}
          </span>
        </div>
      </div>

      <dl className="divide-y divide-border px-5">
        <Row label="Monthly budget" value={currency(t.budget)} strong />
        <Row label="City" value={t.city} />
        <Row label="Location" value={`${t.area} — ${t.address}`} />
        <Row label="Timings" value={t.timings} />
        <Row label="Sessions per week" value={String(t.sessionsPerWeek)} />
        <Row label="Applicants so far" value={String(t.applicants)} />
        <Row label="Notes from coordinator" value={t.notes} />
        <Row
          label="Inquiry received"
          value={new Date(t.postedAt).toLocaleString("en-PK", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        />
      </dl>

      <div className="sticky bottom-0 mt-2 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 border-t border-border bg-card/95 px-5 py-4 backdrop-blur">
        <button className="press grid h-12 w-12 place-items-center rounded-full border border-border text-primary">
          <CalendarClock className="h-5 w-5" />
        </button>
        <button
          onClick={() => {
            toast.success("Application sent", {
              description: `${t.code} moved to Screening. We'll notify you on any update.`,
            });
            onApplied();
          }}
          className="press gradient-plum shadow-glow inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-bold text-primary-foreground"
        >
          Apply for this tuition
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="py-3.5">
      <dt className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd
        className={cn(
          "mt-1 text-sm leading-relaxed",
          strong ? "font-display text-lg font-extrabold" : "font-medium",
        )}
      >
        {value}
      </dd>
    </div>
  );
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-3">
      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">{children}</div>
    </div>
  );
}

function Chip({
  label,
  active,
  onClick,
  icon,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "press flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-bold",
        active
          ? "border-transparent bg-primary text-primary-foreground shadow-glow"
          : "border-border bg-card text-foreground/80 hover:bg-muted",
      )}
    >
      {icon}
      {label}
    </button>
  );
}

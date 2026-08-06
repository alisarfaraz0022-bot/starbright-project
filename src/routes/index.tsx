import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  CalendarDays,
  ChevronRight,
  GraduationCap,
  Layers,
  MapPin,
  ShieldCheck,
  Star,
  TrendingUp,
  Wallet,
} from "lucide-react";

import { AppShell } from "@/components/app-shell";
import {
  applications,
  currency,
  hired,
  notifications,
  profileChecklist,
  sessions,
  tuitions,
  tutor,
} from "@/lib/keep-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Keep Tutors — Tutor Dashboard" },
      {
        name: "description",
        content:
          "Your Keep Tutors home: new tuition matches, application pipeline, upcoming sessions, earnings and profile strength in one place.",
      },
      { property: "og:title", content: "Keep Tutors — Tutor Dashboard" },
      {
        property: "og:description",
        content:
          "Track tuition matches, applications, sessions and payouts from one tutor dashboard.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const done = profileChecklist.filter((c) => c.done).length;
  const strength = Math.round((done / profileChecklist.length) * 100);
  const openMatches = tuitions.filter((t) => t.status === "Approved").length;
  const activeApps = applications.filter(
    (a) => a.stage !== "Hired" && a.stage !== "Not Selected",
  ).length;
  const monthly = hired.reduce((sum, h) => sum + h.fee, 0);
  const today = sessions.filter((s) => s.day === "Today");
  const topMatch = tuitions[5];
  const unread = notifications.filter((n) => n.unread);

  return (
    <AppShell>
      <section className="rise mb-6">
        <p className="text-sm font-semibold text-muted-foreground">Assalam-o-alaikum 👋</p>
        <h1 className="mt-1 text-[2rem] font-extrabold leading-tight">
          {tutor.name.split(" ")[0]}, you have {openMatches} new matches
        </h1>
      </section>

      {/* Rating + strength hero tile */}
      <section className="rise gradient-plum shadow-lift relative mb-4 overflow-hidden rounded-3xl p-5 text-primary-foreground">
        <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-primary-foreground/10 blur-2xl" />
        <div className="relative grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.18em] opacity-80">
              Your rating
            </p>
            <div className="mt-2 flex items-end gap-2">
              <span className="font-display text-4xl font-extrabold leading-none">
                {tutor.rating}
              </span>
              <span className="pb-1 text-xs font-semibold opacity-80">
                / 5 · {tutor.reviewCount} reviews
              </span>
            </div>
            <div className="mt-2 flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className="h-4 w-4 text-accent"
                  fill={i <= Math.round(tutor.rating) ? "currentColor" : "none"}
                />
              ))}
            </div>
          </div>
          <div className="shrink-0 rounded-2xl bg-primary-foreground/12 px-3 py-2 text-center backdrop-blur">
            <p className="font-display text-xl font-extrabold leading-none">{strength}%</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-wider opacity-85">
              Profile
            </p>
          </div>
        </div>
        <div className="relative mt-4">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-primary-foreground/20">
            <div className="gradient-amber h-full rounded-full" style={{ width: `${strength}%` }} />
          </div>
          <Link
            to="/profile"
            className="press mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/15 px-3 py-1.5 text-xs font-bold backdrop-blur hover:bg-primary-foreground/25"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            Verify CNIC to unlock more tuitions
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* Stat bento */}
      <section className="rise mb-4 grid grid-cols-2 gap-3">
        <StatTile
          to="/opportunities"
          icon={<Layers className="h-4.5 w-4.5" />}
          value={String(openMatches)}
          label="Open matches"
          tone="primary"
        />
        <StatTile
          to="/pipeline"
          icon={<TrendingUp className="h-4.5 w-4.5" />}
          value={String(activeApps)}
          label="In pipeline"
          tone="info"
        />
        <StatTile
          to="/hired"
          icon={<GraduationCap className="h-4.5 w-4.5" />}
          value={String(hired.length)}
          label="Active students"
          tone="success"
        />
        <StatTile
          to="/earnings"
          icon={<Wallet className="h-4.5 w-4.5" />}
          value={currency(monthly).replace("PKR ", "")}
          label="PKR / month"
          tone="accent"
        />
      </section>

      {/* Today */}
      <section className="surface rise mb-4 p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-base font-bold">Today's sessions</h2>
          <Link to="/schedule" className="press text-xs font-bold text-primary">
            Full schedule
          </Link>
        </div>
        {today.length === 0 ? (
          <p className="text-sm text-muted-foreground">No sessions today. Enjoy the break.</p>
        ) : (
          <ul className="space-y-2">
            {today.map((s) => (
              <li
                key={s.id}
                className="flex items-center gap-3 rounded-2xl border border-border bg-secondary/50 p-3"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-card text-primary">
                  <CalendarDays className="h-4.5 w-4.5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">{s.student}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {s.subject} · {s.mode}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-bold">{s.time}</p>
                  <p
                    className={
                      s.status === "Completed"
                        ? "text-[11px] font-bold text-success"
                        : "text-[11px] font-bold text-primary"
                    }
                  >
                    {s.status}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Best match */}
      <section className="rise mb-4">
        <h2 className="mb-3 text-base font-bold">Best match for you</h2>
        <div className="surface overflow-hidden p-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-bold text-accent-foreground">
              98% fit
            </span>
            <span className="rounded-full bg-info-soft px-2.5 py-1 text-[11px] font-bold text-info">
              {topMatch.mode}
            </span>
          </div>
          <h3 className="mt-3 text-lg font-extrabold leading-snug">
            {topMatch.grade} — {topMatch.subjects}
          </h3>
          <p className="mt-1 text-xs font-semibold text-muted-foreground">{topMatch.code}</p>
          <p className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0" />
            <span className="truncate">
              {topMatch.area}, {topMatch.city} · {topMatch.distanceKm} km
            </span>
          </p>
          <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-4">
            <div>
              <p className="font-display text-xl font-extrabold">{currency(topMatch.budget)}</p>
              <p className="text-[11px] font-semibold text-muted-foreground">
                {topMatch.sessionsPerWeek} sessions / week
              </p>
            </div>
            <Link
              to="/opportunities"
              className="press gradient-plum shadow-glow inline-flex items-center gap-1.5 rounded-full px-5 py-3 text-sm font-bold text-primary-foreground"
            >
              View details
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Updates */}
      <section className="surface rise mb-2 p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-base font-bold">Latest updates</h2>
          <Link to="/notifications" className="press text-xs font-bold text-primary">
            See all
          </Link>
        </div>
        <ul className="divide-y divide-border">
          {unread.slice(0, 3).map((n) => (
            <li key={n.id} className="flex items-start gap-3 py-3">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
              <div className="min-w-0">
                <p className="text-sm font-bold">{n.title}</p>
                <p className="text-xs text-muted-foreground">{n.body}</p>
                <p className="mt-1 text-[11px] font-semibold text-muted-foreground/80">{n.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </AppShell>
  );
}

const tones = {
  primary: "bg-primary-soft text-primary",
  info: "bg-info-soft text-info",
  success: "bg-success-soft text-success",
  accent: "bg-accent-soft text-accent-foreground",
} as const;

function StatTile({
  to,
  icon,
  value,
  label,
  tone,
}: {
  to: string;
  icon: React.ReactNode;
  value: string;
  label: string;
  tone: keyof typeof tones;
}) {
  return (
    <Link to={to} className="press surface flex flex-col gap-3 p-4 hover:shadow-lift">
      <span className={`grid h-10 w-10 place-items-center rounded-xl ${tones[tone]}`}>{icon}</span>
      <div>
        <p className="font-display text-xl font-extrabold leading-none">{value}</p>
        <p className="mt-1 text-xs font-semibold text-muted-foreground">{label}</p>
      </div>
    </Link>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import {
  BadgeCheck,
  Check,
  ChevronRight,
  Clock,
  Percent,
  Star,
  Upload,
} from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/app-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { profileChecklist, reviews, tutor } from "@/lib/keep-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile & Settings — Keep Tutors" },
      {
        name: "description",
        content:
          "Strengthen your tutor profile: subjects, grades, verification documents, parent reviews and response-time stats that win more tuitions.",
      },
      { property: "og:title", content: "Profile & Settings — Keep Tutors" },
      {
        property: "og:description",
        content: "Build profile strength, verify documents and review parent feedback.",
      },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const done = profileChecklist.filter((c) => c.done).length;
  const strength = Math.round((done / profileChecklist.length) * 100);

  return (
    <AppShell title="Profile & Settings" subtitle="A stronger profile gets you shortlisted faster">
      <section className="surface rise mb-4 p-5">
        <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4">
          <span className="gradient-plum shadow-glow grid h-16 w-16 shrink-0 place-items-center rounded-3xl font-display text-2xl font-extrabold text-primary-foreground">
            {tutor.name.charAt(0)}
          </span>
          <div className="min-w-0">
            <h2 className="truncate text-lg font-extrabold">{tutor.name}</h2>
            <p className="truncate text-xs font-semibold text-muted-foreground">{tutor.email}</p>
            <div className="mt-1.5 flex items-center gap-1 text-xs font-bold">
              <Star className="h-3.5 w-3.5 text-accent" fill="currentColor" />
              {tutor.rating} · {tutor.reviewCount} reviews
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div className="mb-1.5 flex items-center justify-between text-xs font-bold">
            <span>Profile strength</span>
            <span className="text-primary">{strength}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div className="gradient-plum h-full rounded-full transition-all duration-700" style={{ width: `${strength}%` }} />
          </div>
        </div>

        <ul className="mt-4 space-y-2">
          {profileChecklist.map((c) => (
            <li
              key={c.label}
              className="flex items-center gap-3 rounded-2xl border border-border bg-secondary/40 px-3 py-2.5"
            >
              <span
                className={cn(
                  "grid h-6 w-6 shrink-0 place-items-center rounded-full",
                  c.done ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground",
                )}
              >
                {c.done ? <Check className="h-3.5 w-3.5" /> : <Upload className="h-3 w-3" />}
              </span>
              <span className="min-w-0 flex-1 truncate text-sm font-bold">{c.label}</span>
              {!c.done && (
                <button
                  onClick={() => toast("Upload sheet opening…")}
                  className="press shrink-0 rounded-full bg-primary-soft px-3 py-1.5 text-[11px] font-bold text-primary"
                >
                  Add
                </button>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="rise mb-4 grid grid-cols-3 gap-3">
        <Stat
          icon={<Clock className="h-4 w-4" />}
          value={`${tutor.responseMinutes}m`}
          label="Avg reply"
        />
        <Stat
          icon={<Percent className="h-4 w-4" />}
          value={`${tutor.acceptanceRate}%`}
          label="Accepted"
        />
        <Stat
          icon={<BadgeCheck className="h-4 w-4" />}
          value={`${tutor.experienceYears} yrs`}
          label="Experience"
        />
      </section>

      <section className="surface rise mb-4 p-5">
        <h2 className="mb-4 text-base font-bold">Teaching details</h2>
        <div className="space-y-4">
          <div>
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Full name
            </Label>
            <Input defaultValue={tutor.name} className="mt-1.5 h-11 rounded-xl bg-secondary/50" />
          </div>
          <div>
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Phone
            </Label>
            <Input defaultValue={tutor.phone} className="mt-1.5 h-11 rounded-xl bg-secondary/50" />
          </div>
          <div>
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              About you
            </Label>
            <Textarea
              defaultValue={tutor.bio}
              rows={4}
              className="mt-1.5 rounded-xl bg-secondary/50 text-sm"
            />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Subjects
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {tutor.subjects.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-primary-soft px-3 py-1.5 text-xs font-bold text-primary"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Grades
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {tutor.grades.map((g) => (
                <span
                  key={g}
                  className="rounded-full bg-accent-soft px-3 py-1.5 text-xs font-bold text-accent-foreground"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={() => toast.success("Profile saved")}
            className="press gradient-plum shadow-glow w-full rounded-full py-3.5 text-sm font-bold text-primary-foreground"
          >
            Save changes
          </button>
        </div>
      </section>

      <section className="surface rise mb-4 p-5">
        <h2 className="mb-3 text-base font-bold">Parent reviews</h2>
        <ul className="divide-y divide-border">
          {reviews.map((r) => (
            <li key={r.id} className="py-3.5">
              <div className="flex items-center justify-between gap-3">
                <p className="truncate text-sm font-bold">{r.parent}</p>
                <span className="flex shrink-0 gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 text-accent"
                      fill={i <= r.stars ? "currentColor" : "none"}
                    />
                  ))}
                </span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{r.text}</p>
              <p className="mt-1 text-[11px] font-semibold text-muted-foreground/80">{r.when}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="surface mb-2 divide-y divide-border">
        {["Change password", "Payout & bank details", "Language & region", "Sign out"].map((l) => (
          <button
            key={l}
            onClick={() => toast(l)}
            className="press flex w-full items-center justify-between gap-3 px-5 py-4 text-left text-sm font-bold"
          >
            {l}
            <ChevronRight className="h-4.5 w-4.5 shrink-0 text-muted-foreground" />
          </button>
        ))}
      </section>
    </AppShell>
  );
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="surface flex flex-col items-center gap-1.5 p-4 text-center">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-soft text-primary">
        {icon}
      </span>
      <p className="font-display text-sm font-extrabold leading-none">{value}</p>
      <p className="text-[10.5px] font-bold text-muted-foreground">{label}</p>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Banknote, Building2, Download, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

import { AppShell } from "@/components/app-shell";
import { currency, earningsTrend, hired, payouts } from "@/lib/keep-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/earnings")({
  head: () => ({
    meta: [
      { title: "Earnings & Payouts — Keep Tutors" },
      {
        name: "description",
        content:
          "Track monthly tuition income, payout status, bank details and download statements for your Keep Tutors work.",
      },
      { property: "og:title", content: "Earnings & Payouts — Keep Tutors" },
      {
        property: "og:description",
        content: "Monthly income, payout status and statements for your tuitions.",
      },
    ],
  }),
  component: EarningsPage,
});

const statusTone = {
  Paid: "bg-success-soft text-success",
  Processing: "bg-warning-soft text-warning",
  Scheduled: "bg-info-soft text-info",
} as const;

function EarningsPage() {
  const monthly = hired.reduce((s, h) => s + h.fee, 0);
  const lifetime = payouts.reduce((s, p) => s + p.amount, 0);
  const pending = payouts.filter((p) => p.status !== "Paid").reduce((s, p) => s + p.amount, 0);

  return (
    <AppShell title="Earnings & Payouts" subtitle="Where your tuition income stands">
      <section className="rise gradient-plum shadow-lift relative mb-4 overflow-hidden rounded-3xl p-5 text-primary-foreground">
        <div className="absolute -right-8 -top-10 h-36 w-36 rounded-full bg-primary-foreground/10 blur-2xl" />
        <p className="relative text-xs font-bold uppercase tracking-[0.18em] opacity-80">
          Expected this month
        </p>
        <p className="relative mt-2 font-display text-4xl font-extrabold leading-none">
          {currency(monthly)}
        </p>
        <div className="relative mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-primary-foreground/15 px-3 py-1.5 text-xs font-bold backdrop-blur">
            {hired.length} active students
          </span>
          <span className="rounded-full bg-primary-foreground/15 px-3 py-1.5 text-xs font-bold backdrop-blur">
            {currency(pending)} pending
          </span>
        </div>
      </section>

      <section className="surface rise mb-4 p-5">
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp className="h-4.5 w-4.5 text-primary" />
          <h2 className="text-base font-bold">Last 6 months</h2>
        </div>
        <div className="h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={earningsTrend} margin={{ left: 0, right: 0, top: 4, bottom: 0 }}>
              <defs>
                <linearGradient id="earn" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="var(--color-border)" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fontWeight: 700, fill: "var(--color-muted-foreground)" }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 14,
                  border: "1px solid var(--color-border)",
                  background: "var(--color-card)",
                  fontSize: 12,
                  fontWeight: 700,
                }}
                formatter={(v) => currency(Number(v))}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="var(--color-chart-1)"
                strokeWidth={2.5}
                fill="url(#earn)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-3 text-xs font-semibold text-muted-foreground">
          Lifetime paid out: <span className="text-foreground">{currency(lifetime)}</span>
        </p>
      </section>

      <section className="surface rise mb-4 p-5">
        <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
            <Building2 className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-extrabold">Meezan Bank •••• 4821</p>
            <p className="truncate text-xs font-semibold text-muted-foreground">
              Ali Raza · payouts on the 3rd
            </p>
          </div>
          <button
            onClick={() => toast("Bank details editor opening…")}
            className="press shrink-0 rounded-full border border-border px-3 py-2 text-xs font-bold text-primary"
          >
            Edit
          </button>
        </div>
      </section>

      <section className="rise pb-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-base font-bold">Payout history</h2>
          <button
            onClick={() => toast.success("Statement download started")}
            className="press flex items-center gap-1.5 text-xs font-bold text-primary"
          >
            <Download className="h-3.5 w-3.5" />
            Statement
          </button>
        </div>
        <ul className="space-y-2">
          {payouts.map((p) => (
            <li key={p.id} className="surface grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 p-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
                <Banknote className="h-4.5 w-4.5" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-extrabold">{p.month}</p>
                <p className="truncate text-xs font-semibold text-muted-foreground">
                  {p.paidOn ? `Paid ${p.paidOn}` : "Awaiting release"} · {p.method}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="font-display text-sm font-extrabold">{currency(p.amount)}</p>
                <span
                  className={cn(
                    "mt-1 inline-block rounded-full px-2 py-0.5 text-[10.5px] font-bold",
                    statusTone[p.status],
                  )}
                >
                  {p.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </AppShell>
  );
}

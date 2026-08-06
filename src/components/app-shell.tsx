import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  Briefcase,
  CalendarDays,
  FileText,
  GraduationCap,
  Home,
  Layers,
  Link2,
  ListChecks,
  Menu,
  Sparkles,
  UserRound,
  Wallet,
} from "lucide-react";
import { useState, type ReactNode } from "react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { notifications, tutor } from "@/lib/keep-data";
import { cn } from "@/lib/utils";

const drawerLinks = [
  { to: "/", label: "Home", icon: Home },
  { to: "/opportunities", label: "Tuition Opportunities", icon: Layers },
  { to: "/pipeline", label: "My Applications", icon: ListChecks },
  { to: "/hired", label: "My Hired Tuitions", icon: GraduationCap },
  { to: "/status", label: "All Tuitions Status", icon: Briefcase },
  { to: "/schedule", label: "Schedule & Attendance", icon: CalendarDays },
  { to: "/earnings", label: "Earnings & Payouts", icon: Wallet },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/links", label: "Important Links", icon: Link2 },
  { to: "/terms", label: "Terms & Conditions", icon: FileText },
  { to: "/profile", label: "Profile & Settings", icon: UserRound },
] as const;

const tabs = [
  { to: "/", label: "Home", icon: Home },
  { to: "/opportunities", label: "Discover", icon: Layers },
  { to: "/pipeline", label: "Pipeline", icon: ListChecks },
  { to: "/schedule", label: "Schedule", icon: CalendarDays },
  { to: "/profile", label: "Profile", icon: UserRound },
] as const;

function LogoMark() {
  return (
    <Link to="/" className="press flex items-center gap-2">
      <span className="gradient-plum shadow-glow grid h-9 w-9 place-items-center rounded-xl">
        <Sparkles className="h-4.5 w-4.5 text-primary-foreground" strokeWidth={2.4} />
      </span>
      <span className="leading-none">
        <span className="block font-display text-sm font-extrabold tracking-tight">
          KEEP TUTORS
        </span>
        <span className="block text-[10px] font-semibold tracking-[0.22em] text-muted-foreground">
          TUTOR APP
        </span>
      </span>
    </Link>
  );
}

export function AppShell({
  children,
  title,
  subtitle,
}: {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const unread = notifications.filter((n) => n.unread).length;

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto grid w-full max-w-2xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className="press grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border bg-card text-foreground hover:bg-muted"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[85vw] max-w-xs p-0">
              <div className="border-b border-border px-5 py-5">
                <LogoMark />
              </div>
              <nav className="flex flex-col gap-0.5 p-3">
                {drawerLinks.map(({ to, label, icon: Icon }) => {
                  const active = pathname === to;
                  return (
                    <Link
                      key={to}
                      to={to}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "press flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold",
                        active
                          ? "bg-primary-soft text-primary"
                          : "text-foreground/80 hover:bg-muted",
                      )}
                    >
                      <Icon className="h-4.5 w-4.5 shrink-0" />
                      <span className="truncate">{label}</span>
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>

          <div className="min-w-0 justify-self-start">
            <LogoMark />
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              to="/notifications"
              aria-label="Notifications"
              className="press relative grid h-10 w-10 place-items-center rounded-xl border border-border bg-card hover:bg-muted"
            >
              <Bell className="h-5 w-5" />
              {unread > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">
                  {unread}
                </span>
              )}
            </Link>
            <Link
              to="/profile"
              aria-label="Profile"
              className="press gradient-plum grid h-10 w-10 place-items-center rounded-full font-display text-sm font-bold text-primary-foreground"
            >
              {tutor.name.charAt(0)}
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-2xl px-4 pt-6">
        {title && (
          <div className="rise mb-5">
            <h1 className="text-[1.75rem] font-extrabold leading-tight">{title}</h1>
            {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
          </div>
        )}
        {children}
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-2xl items-stretch justify-between px-2 py-1.5">
          {tabs.map(({ to, label, icon: Icon }) => {
            const active = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className="press relative flex flex-1 flex-col items-center gap-1 rounded-xl py-2"
              >
                <span
                  className={cn(
                    "grid h-8 w-12 place-items-center rounded-lg transition-colors",
                    active ? "bg-primary-soft text-primary" : "text-muted-foreground",
                  )}
                >
                  <Icon className="h-5 w-5" strokeWidth={active ? 2.5 : 2} />
                </span>
                <span
                  className={cn(
                    "text-[10.5px] font-bold tracking-tight",
                    active ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

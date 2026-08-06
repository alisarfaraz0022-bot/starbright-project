import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, LifeBuoy } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { importantLinks } from "@/lib/keep-data";

export const Route = createFileRoute("/links")({
  head: () => ({
    meta: [
      { title: "Important Links — Keep Tutors" },
      {
        name: "description",
        content:
          "Tutor handbook, fee and commission policy, demo session guide and direct support channels for Keep Tutors tutors.",
      },
      { property: "og:title", content: "Important Links — Keep Tutors" },
      {
        property: "og:description",
        content: "Handbook, policies, demo guide and support channels for tutors.",
      },
    ],
  }),
  component: LinksPage,
});

function LinksPage() {
  return (
    <AppShell title="Important Links" subtitle="Policies, guides and support in one place">
      <ul className="space-y-2 pb-4">
        {importantLinks.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className="press surface grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-5 hover:shadow-lift"
            >
              <span className="min-w-0">
                <span className="block truncate text-sm font-extrabold">{l.label}</span>
                <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                  {l.desc}
                </span>
              </span>
              <ArrowUpRight className="h-5 w-5 shrink-0 text-primary" />
            </a>
          </li>
        ))}
      </ul>

      <section className="gradient-plum shadow-lift rounded-3xl p-5 text-primary-foreground">
        <LifeBuoy className="h-6 w-6" />
        <h2 className="mt-3 text-lg font-extrabold">Need a human?</h2>
        <p className="mt-1 text-sm opacity-85">
          Operations replies within 15 minutes, Monday to Saturday, 10 AM – 8 PM.
        </p>
        <a
          href="#"
          className="press mt-4 inline-flex rounded-full bg-primary-foreground/15 px-4 py-2.5 text-sm font-bold backdrop-blur hover:bg-primary-foreground/25"
        >
          Chat with support
        </a>
      </section>
    </AppShell>
  );
}

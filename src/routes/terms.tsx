import { createFileRoute } from "@tanstack/react-router";

import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Keep Tutors" },
      {
        name: "description",
        content:
          "The tutor agreement covering conduct, session commitments, fee structure, payouts, cancellations and data privacy on Keep Tutors.",
      },
      { property: "og:title", content: "Terms & Conditions — Keep Tutors" },
      {
        property: "og:description",
        content: "Conduct, fees, payouts, cancellations and privacy for Keep Tutors tutors.",
      },
    ],
  }),
  component: TermsPage,
});

const sections = [
  {
    title: "1. Tutor conduct",
    body: "Arrive on time, dress professionally, and keep all communication with families respectful and on the record. Direct fee negotiation outside Keep Tutors is not permitted while an assignment is active.",
  },
  {
    title: "2. Session commitment",
    body: "Once a tuition is confirmed you commit to the agreed weekly sessions for a minimum of one month. Reschedules require at least 12 hours notice through the app.",
  },
  {
    title: "3. Fees and commission",
    body: "Keep Tutors retains a service commission on the first month's fee. From the second month onward you receive the full agreed amount minus the standard platform fee shown on your earnings screen.",
  },
  {
    title: "4. Payouts",
    body: "Payouts are released on the 3rd of each month to the verified bank account on your profile. Sessions marked complete in the app are the sole basis for payout calculation.",
  },
  {
    title: "5. Cancellations",
    body: "Families may cancel with one week's notice. Repeated no-shows by a tutor may result in a temporary suspension from new matches.",
  },
  {
    title: "6. Data and privacy",
    body: "Student addresses and contact details are shared only for active assignments and must not be stored outside the app or shared with third parties.",
  },
];

function TermsPage() {
  return (
    <AppShell title="Terms & Conditions" subtitle="Last updated 1 August 2026">
      <div className="space-y-3 pb-4">
        {sections.map((s) => (
          <section key={s.title} className="surface p-5">
            <h2 className="text-sm font-extrabold">{s.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
          </section>
        ))}
      </div>
    </AppShell>
  );
}

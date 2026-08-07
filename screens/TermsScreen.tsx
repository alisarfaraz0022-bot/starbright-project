import { View, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { AppShell } from "../components/AppShell";
import { Surface } from "../lib/ui";

type Nav = NativeStackNavigationProp<any>;

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

export default function TermsScreen() {
  const navigation = useNavigation<Nav>();

  return (
    <AppShell title="Terms & Conditions" subtitle="Last updated 1 August 2026" navigation={navigation}>
      <View style={{ gap: 12, paddingBottom: 16 }}>
        {sections.map((s) => (
          <Surface key={s.title} style={{ padding: 20 }}>
            <Text style={{ fontSize: 14, fontWeight: "800", color: "#3a2a3f" }}>{s.title}</Text>
            <Text style={{ marginTop: 8, fontSize: 14, lineHeight: 22, color: "#9a8a9f" }}>{s.body}</Text>
          </Surface>
        ))}
      </View>
    </AppShell>
  );
}

import { View, Text, Pressable, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { AppShell } from "../components/AppShell";
import { GradientPlum, Surface, PressableScale } from "../lib/ui";
import { currency, earningsTrend, hired, payouts } from "../lib/keep-data";

type Nav = NativeStackNavigationProp<any>;

const statusTone: Record<string, { bg: string; text: string }> = {
  Paid: { bg: "#e8f6f0", text: "#2d9968" },
  Processing: { bg: "#fbf5e8", text: "#d99b2d" },
  Scheduled: { bg: "#e8f1fb", text: "#3a7fd9" },
};

export default function EarningsScreen() {
  const navigation = useNavigation<Nav>();
  const monthly = hired.reduce((s, h) => s + h.fee, 0);
  const lifetime = payouts.reduce((s, p) => s + p.amount, 0);
  const pending = payouts.filter((p) => p.status !== "Paid").reduce((s, p) => s + p.amount, 0);

  const maxAmount = Math.max(...earningsTrend.map((e) => e.amount));

  return (
    <AppShell title="Earnings & Payouts" subtitle="Where your tuition income stands" navigation={navigation}>
      <GradientPlum style={{ marginBottom: 16, padding: 20, borderRadius: 24, overflow: "hidden" }}>
        <Text style={{ fontSize: 12, fontWeight: "700", letterSpacing: 2, color: "rgba(253,252,253,0.8)", textTransform: "uppercase" }}>
          Expected this month
        </Text>
        <Text style={{ marginTop: 8, fontFamily: "Sora_700Bold", fontSize: 36, fontWeight: "800", color: "#fdfcfd" }}>
          {currency(monthly)}
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
          <View style={{ backgroundColor: "rgba(253,252,253,0.15)", borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 }}>
            <Text style={{ fontSize: 12, fontWeight: "700", color: "#fdfcfd" }}>{hired.length} active students</Text>
          </View>
          <View style={{ backgroundColor: "rgba(253,252,253,0.15)", borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 }}>
            <Text style={{ fontSize: 12, fontWeight: "700", color: "#fdfcfd" }}>{currency(pending)} pending</Text>
          </View>
        </View>
      </GradientPlum>

      <Surface style={{ marginBottom: 16, padding: 20 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <Ionicons name="trending-up" size={18} color="#5b1c46" />
          <Text style={{ fontSize: 16, fontWeight: "700", color: "#3a2a3f" }}>Last 6 months</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", height: 160, gap: 8 }}>
          {earningsTrend.map((e) => {
            const heightPct = (e.amount / maxAmount) * 100;
            return (
              <View key={e.month} style={{ flex: 1, alignItems: "center", gap: 8 }}>
                <View style={{ flex: 1, width: "100%", justifyContent: "flex-end" }}>
                  <View style={{ height: `${heightPct}%`, borderRadius: 8, overflow: "hidden" }}>
                    <GradientPlum style={{ height: "100%", borderRadius: 8 }} />
                  </View>
                </View>
                <Text style={{ fontSize: 11, fontWeight: "700", color: "#9a8a9f" }}>{e.month}</Text>
              </View>
            );
          })}
        </View>
        <Text style={{ marginTop: 12, fontSize: 12, fontWeight: "600", color: "#9a8a9f" }}>
          Lifetime paid out: <Text style={{ fontWeight: "700", color: "#3a2a3f" }}>{currency(lifetime)}</Text>
        </Text>
      </Surface>

      <Surface style={{ marginBottom: 16, padding: 20 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <View style={{ width: 44, height: 44, borderRadius: 16, backgroundColor: "#f3edf0", alignItems: "center", justifyContent: "center" }}>
            <Ionicons name="business" size={20} color="#5b1c46" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 14, fontWeight: "800", color: "#3a2a3f" }} numberOfLines={1}>Meezan Bank •••• 4821</Text>
            <Text style={{ fontSize: 12, fontWeight: "600", color: "#9a8a9f" }} numberOfLines={1}>Ali Raza · payouts on the 3rd</Text>
          </View>
          <PressableScale style={{ paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999, borderWidth: 1, borderColor: "#e8e2e8" }}>
            <Text style={{ fontSize: 12, fontWeight: "700", color: "#5b1c46" }}>Edit</Text>
          </PressableScale>
        </View>
      </Surface>

      <View style={{ paddingBottom: 16 }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: "700", color: "#3a2a3f" }}>Payout history</Text>
          <PressableScale style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <Ionicons name="download" size={14} color="#5b1c46" />
            <Text style={{ fontSize: 12, fontWeight: "700", color: "#5b1c46" }}>Statement</Text>
          </PressableScale>
        </View>
        <View style={{ gap: 8 }}>
          {payouts.map((p) => (
            <Surface key={p.id} style={{ padding: 16 }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: "rgba(245,241,245,0.8)", alignItems: "center", justifyContent: "center" }}>
                  <Ionicons name="cash" size={18} color="#5b1c46" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, fontWeight: "800", color: "#3a2a3f" }} numberOfLines={1}>{p.month}</Text>
                  <Text style={{ fontSize: 12, fontWeight: "600", color: "#9a8a9f" }} numberOfLines={1}>
                    {p.paidOn ? `Paid ${p.paidOn}` : "Awaiting release"} · {p.method}
                  </Text>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={{ fontFamily: "Sora_700Bold", fontSize: 14, fontWeight: "800", color: "#3a2a3f" }}>{currency(p.amount)}</Text>
                  <View style={{ marginTop: 4, backgroundColor: statusTone[p.status].bg, borderRadius: 999, paddingHorizontal: 8, paddingVertical: 2 }}>
                    <Text style={{ fontSize: 10.5, fontWeight: "700", color: statusTone[p.status].text }}>{p.status}</Text>
                  </View>
                </View>
              </View>
            </Surface>
          ))}
        </View>
      </View>
    </AppShell>
  );
}

import { View, Text, Pressable, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { AppShell } from "../components/AppShell";
import { GradientPlum, GradientAmber, Surface, PressableScale } from "../lib/ui";
import {
  applications,
  currency,
  hired,
  notifications,
  profileChecklist,
  sessions,
  tuitions,
  tutor,
} from "../lib/keep-data";

type Nav = NativeStackNavigationProp<any>;

export default function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const done = profileChecklist.filter((c) => c.done).length;
  const strength = Math.round((done / profileChecklist.length) * 100);
  const openMatches = tuitions.filter((t) => t.status === "Approved").length;
  const activeApps = applications.filter(
    (a) => a.stage !== "Hired" && a.stage !== "Not Selected",
  ).length;
  const monthly = hired.reduce((sum, h) => sum + h.fee, 0);
  const today = sessions.filter((s) => s.day === "Today");
  const topMatch = tuitions[5]!;
  const unread = notifications.filter((n) => n.unread);

  const tones: Record<string, { bg: string; text: string }> = {
    primary: { bg: "#f3edf0", text: "#5b1c46" },
    info: { bg: "#e8f1fb", text: "#3a7fd9" },
    success: { bg: "#e8f6f0", text: "#2d9968" },
    accent: { bg: "#fbf3e0", text: "#6b4a1a" },
  };

  function StatTile({
    to,
    icon,
    value,
    label,
    tone,
  }: {
    to: "Opportunities" | "Pipeline" | "Hired" | "Earnings";
    icon: keyof typeof Ionicons.glyphMap;
    value: string;
    label: string;
    tone: keyof typeof tones;
  }) {
    const t = tones[tone];
    return (
      <PressableScale onPress={() => navigation.navigate(to as any)} style={{ flex: 1 }}>
        <Surface style={{ padding: 16, gap: 12 }}>
          <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: t.bg, alignItems: "center", justifyContent: "center" }}>
            <Ionicons name={icon} size={18} color={t.text} />
          </View>
          <View>
            <Text style={{ fontSize: 20, fontWeight: "800", color: "#3a2a3f" }}>{value}</Text>
            <Text style={{ marginTop: 4, fontSize: 12, fontWeight: "600", color: "#9a8a9f" }}>{label}</Text>
          </View>
        </Surface>
      </PressableScale>
    );
  }

  return (
    <AppShell navigation={navigation}>
      <View style={{ marginBottom: 24 }}>
        <Text style={{ fontSize: 14, fontWeight: "600", color: "#9a8a9f" }}>Assalam-o-alaikum</Text>
        <Text style={{ marginTop: 4, fontSize: 32, fontWeight: "800", color: "#3a2a3f" }}>
          {tutor.name.split(" ")[0]}, you have {openMatches} new matches
        </Text>
      </View>

      <GradientPlum style={{ marginBottom: 16, padding: 20, borderRadius: 24, overflow: "hidden" }}>
        <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 12, fontWeight: "700", letterSpacing: 2, color: "rgba(253,252,253,0.8)", textTransform: "uppercase" }}>
              Your rating
            </Text>
            <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 8, marginTop: 8 }}>
              <Text style={{ fontSize: 40, fontWeight: "800", color: "#fdfcfd" }}>
                {tutor.rating}
              </Text>
              <Text style={{ paddingBottom: 4, fontSize: 12, fontWeight: "600", color: "rgba(253,252,253,0.8)" }}>
                / 5 · {tutor.reviewCount} reviews
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 2, marginTop: 8 }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <Ionicons key={i} name="star" size={16} color="#d9a441" />
              ))}
            </View>
          </View>
          <View style={{ backgroundColor: "rgba(253,252,253,0.12)", borderRadius: 16, paddingHorizontal: 12, paddingVertical: 8, alignItems: "center" }}>
            <Text style={{ fontSize: 20, fontWeight: "800", color: "#fdfcfd" }}>{strength}%</Text>
            <Text style={{ marginTop: 4, fontSize: 10, fontWeight: "700", letterSpacing: 1, color: "rgba(253,252,253,0.85)", textTransform: "uppercase" }}>
              Profile
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 16 }}>
          <View style={{ height: 6, borderRadius: 3, backgroundColor: "rgba(253,252,253,0.2)", overflow: "hidden" }}>
            <View style={{ height: 6, borderRadius: 3, width: `${strength}%` }}>
              <GradientAmber style={{ height: 6, borderRadius: 3 }} />
            </View>
          </View>
          <PressableScale
            onPress={() => navigation.navigate("Profile" as any)}
            style={{ marginTop: 12, flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "rgba(253,252,253,0.15)", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, alignSelf: "flex-start" }}
          >
            <Ionicons name="shield-checkmark" size={14} color="#fdfcfd" />
            <Text style={{ fontSize: 12, fontWeight: "700", color: "#fdfcfd" }}>Verify CNIC to unlock more tuitions</Text>
            <Ionicons name="arrow-up-outline" size={14} color="#fdfcfd" />
          </PressableScale>
        </View>
      </GradientPlum>

      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
        <View style={{ flexDirection: "row", gap: 12, width: "100%" }}>
          <StatTile to="Opportunities" icon="layers" value={String(openMatches)} label="Open matches" tone="primary" />
          <StatTile to="Pipeline" icon="trending-up" value={String(activeApps)} label="In pipeline" tone="info" />
        </View>
        <View style={{ flexDirection: "row", gap: 12, width: "100%" }}>
          <StatTile to="Hired" icon="school" value={String(hired.length)} label="Active students" tone="success" />
          <StatTile to="Earnings" icon="wallet" value={currency(monthly).replace("PKR ", "")} label="PKR / month" tone="accent" />
        </View>
      </View>

      <Surface style={{ marginBottom: 16, padding: 20 }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: "700", color: "#3a2a3f" }}>Today's sessions</Text>
          <PressableScale onPress={() => navigation.navigate("Schedule" as any)}>
            <Text style={{ fontSize: 12, fontWeight: "700", color: "#5b1c46" }}>Full schedule</Text>
          </PressableScale>
        </View>
        {today.length === 0 ? (
          <Text style={{ fontSize: 14, color: "#9a8a9f" }}>No sessions today. Enjoy the break.</Text>
        ) : (
          <View style={{ gap: 8 }}>
            {today.map((s) => (
              <View key={s.id} style={{ flexDirection: "row", alignItems: "center", gap: 12, borderWidth: 1, borderColor: "#e8e2e8", backgroundColor: "#f5f1f5", borderRadius: 16, padding: 12 }}>
                <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: "#ffffff", alignItems: "center", justifyContent: "center" }}>
                  <Ionicons name="calendar" size={18} color="#5b1c46" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, fontWeight: "700", color: "#3a2a3f" }} numberOfLines={1}>{s.student}</Text>
                  <Text style={{ fontSize: 12, color: "#9a8a9f" }} numberOfLines={1}>{s.subject} · {s.mode}</Text>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={{ fontSize: 14, fontWeight: "700", color: "#3a2a3f" }}>{s.time}</Text>
                  <Text style={{ fontSize: 11, fontWeight: "700", color: s.status === "Completed" ? "#2d9968" : "#5b1c46" }}>{s.status}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </Surface>

      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: "700", color: "#3a2a3f", marginBottom: 12 }}>Best match for you</Text>
        <Surface style={{ padding: 20 }}>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
            <View style={{ backgroundColor: "#fbf3e0", borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 }}>
              <Text style={{ fontSize: 11, fontWeight: "700", color: "#6b4a1a" }}>98% fit</Text>
            </View>
            <View style={{ backgroundColor: "#e8f1fb", borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 }}>
              <Text style={{ fontSize: 11, fontWeight: "700", color: "#3a7fd9" }}>{topMatch.mode}</Text>
            </View>
          </View>
          <Text style={{ marginTop: 12, fontSize: 18, fontWeight: "800", color: "#3a2a3f" }}>
            {topMatch.grade} — {topMatch.subjects}
          </Text>
          <Text style={{ marginTop: 4, fontSize: 12, fontWeight: "600", color: "#9a8a9f" }}>{topMatch.code}</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginTop: 12 }}>
            <Ionicons name="location" size={16} color="#9a8a9f" />
            <Text style={{ fontSize: 14, color: "#9a8a9f", flex: 1 }} numberOfLines={1}>
              {topMatch.area}, {topMatch.city} · {topMatch.distanceKm} km
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: "#e8e2e8" }}>
            <View>
              <Text style={{ fontSize: 20, fontWeight: "800", color: "#3a2a3f" }}>{currency(topMatch.budget)}</Text>
              <Text style={{ fontSize: 11, fontWeight: "600", color: "#9a8a9f" }}>{topMatch.sessionsPerWeek} sessions / week</Text>
            </View>
            <PressableScale onPress={() => navigation.navigate("Opportunities" as any)}>
              <GradientPlum style={{ paddingHorizontal: 20, paddingVertical: 12, borderRadius: 999, flexDirection: "row", alignItems: "center", gap: 6 }}>
                <Text style={{ fontSize: 14, fontWeight: "700", color: "#fdfcfd" }}>View details</Text>
                <Ionicons name="chevron-forward" size={16} color="#fdfcfd" />
              </GradientPlum>
            </PressableScale>
          </View>
        </Surface>
      </View>

      <Surface style={{ marginBottom: 8, padding: 20 }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: "700", color: "#3a2a3f" }}>Latest updates</Text>
          <PressableScale onPress={() => navigation.navigate("Notifications" as any)}>
            <Text style={{ fontSize: 12, fontWeight: "700", color: "#5b1c46" }}>See all</Text>
          </PressableScale>
        </View>
        <View>
          {unread.slice(0, 3).map((n, i) => (
            <View key={n.id} style={{ flexDirection: "row", gap: 12, paddingVertical: 12, ...(i < 2 ? { borderBottomWidth: 1, borderBottomColor: "#e8e2e8" } : {}) }}>
              <View style={{ marginTop: 6, width: 8, height: 8, borderRadius: 4, backgroundColor: "#d9a441" }} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, fontWeight: "700", color: "#3a2a3f" }}>{n.title}</Text>
                <Text style={{ fontSize: 12, color: "#9a8a9f" }}>{n.body}</Text>
                <Text style={{ marginTop: 4, fontSize: 11, fontWeight: "600", color: "rgba(154,138,159,0.8)" }}>{n.time}</Text>
              </View>
            </View>
          ))}
        </View>
      </Surface>
    </AppShell>
  );
}

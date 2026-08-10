import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { AppShell } from "../components/AppShell";
import { GradientPlum, Surface, PressableScale } from "../lib/ui";
import { currency, hired } from "../lib/keep-data";

type Nav = NativeStackNavigationProp<any>;

export default function HiredScreen() {
  const navigation = useNavigation<Nav>();

  function Metric({ label, value }: { label: string; value: string }) {
    return (
      <View style={{ flex: 1, borderWidth: 1, borderColor: "#e8e2e8", backgroundColor: "rgba(245,241,245,0.5)", borderRadius: 16, padding: 12, alignItems: "center" }}>
        <Text style={{ fontSize: 14, fontWeight: "800", color: "#3a2a3f" }}>{value}</Text>
        <Text style={{ marginTop: 4, fontSize: 10.5, fontWeight: "700", color: "#9a8a9f" }}>{label}</Text>
      </View>
    );
  }

  function Action({ icon, label, onPress }: { icon: keyof typeof Ionicons.glyphMap; label: string; onPress: () => void }) {
    return (
      <PressableScale
        onPress={onPress}
        style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, borderWidth: 1, borderColor: "#e8e2e8", backgroundColor: "#ffffff", borderRadius: 999, paddingVertical: 10 }}
      >
        <Ionicons name={icon} size={16} color="#3a2a3f" />
        <Text style={{ fontSize: 12, fontWeight: "700", color: "#3a2a3f" }}>{label}</Text>
      </PressableScale>
    );
  }

  return (
    <AppShell title="My Hired Tuitions" subtitle="Your confirmed students and their progress" navigation={navigation}>
      <View style={{ gap: 12, paddingBottom: 16 }}>
        {hired.map((h) => {
          const pct = Math.round((h.sessionsDone / h.sessionsPlanned) * 100);
          return (
            <Surface key={h.id} style={{ padding: 20 }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <GradientPlum style={{ width: 44, height: 44, borderRadius: 16, alignItems: "center", justifyContent: "center" }}>
                  <Text style={{ fontSize: 16, fontWeight: "800", color: "#fdfcfd" }}>
                    {h.student.charAt(0)}
                  </Text>
                </GradientPlum>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 16, fontWeight: "800", color: "#3a2a3f" }} numberOfLines={1}>{h.student}</Text>
                  <Text style={{ fontSize: 12, fontWeight: "600", color: "#9a8a9f" }} numberOfLines={1}>
                    {h.grade} · {h.subjects} · {h.city}
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: "row", gap: 8, marginTop: 16 }}>
                <Metric label="Monthly fee" value={currency(h.fee).replace("PKR ", "")} />
                <Metric label="Attendance" value={`${h.attendanceRate}%`} />
                <Metric label="Sessions" value={`${h.sessionsDone}/${h.sessionsPlanned}`} />
              </View>

              <View style={{ marginTop: 16 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
                  <Text style={{ fontSize: 11, fontWeight: "700", color: "#9a8a9f" }}>Term progress</Text>
                  <Text style={{ fontSize: 11, fontWeight: "700", color: "#9a8a9f" }}>{pct}%</Text>
                </View>
                <View style={{ height: 6, borderRadius: 3, backgroundColor: "#f5f1f5", overflow: "hidden" }}>
                  <View style={{ height: 6, borderRadius: 3, width: `${pct}%` }}>
                    <GradientPlum style={{ height: 6, borderRadius: 3 }} />
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginTop: 16, backgroundColor: "rgba(245,241,245,0.6)", borderRadius: 16, paddingHorizontal: 12, paddingVertical: 10 }}>
                <Ionicons name="calendar" size={16} color="#5b1c46" />
                <Text style={{ fontSize: 12, fontWeight: "700", color: "#5b1c46" }}>Next session: {h.nextSession}</Text>
              </View>

              <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
                <Action icon="checkmark-circle" label="Mark done" onPress={() => {}} />
                <Action icon="videocam" label="Join" onPress={() => {}} />
                <Action icon="chatbubble" label="Message" onPress={() => {}} />
              </View>
            </Surface>
          );
        })}
      </View>
    </AppShell>
  );
}

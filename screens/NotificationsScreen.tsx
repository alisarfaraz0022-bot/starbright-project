import { View, Text, Pressable, ScrollView, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";

import { AppShell } from "../components/AppShell";
import { Surface, PressableScale } from "../lib/ui";
import { notifications, type Notification } from "../lib/keep-data";

type Nav = NativeStackNavigationProp<any>;

const kindMeta: Record<Notification["kind"], { icon: keyof typeof Ionicons.glyphMap; tone: { bg: string; text: string } }> = {
  match: { icon: "layers", tone: { bg: "#f3edf0", text: "#5b1c46" } },
  stage: { icon: "trending-up", tone: { bg: "#e8f1fb", text: "#3a7fd9" } },
  payout: { icon: "wallet", tone: { bg: "#e8f6f0", text: "#2d9968" } },
  session: { icon: "calendar", tone: { bg: "#fbf3e0", text: "#6b4a1a" } },
  system: { icon: "notifications", tone: { bg: "#fbf5e8", text: "#d99b2d" } },
};

export default function NotificationsScreen() {
  const navigation = useNavigation<Nav>();
  const [read, setRead] = useState<string[]>(
    notifications.filter((n) => !n.unread).map((n) => n.id),
  );
  const [prefs, setPrefs] = useState({ matches: true, stages: true, payouts: true, digest: false });

  const prefRows: { key: keyof typeof prefs; label: string; desc: string }[] = [
    { key: "matches", label: "New tuition matches", desc: "Instant alert when an opening fits your profile" },
    { key: "stages", label: "Application updates", desc: "Shortlist, interview and demo changes" },
    { key: "payouts", label: "Payout alerts", desc: "When money is processed or released" },
    { key: "digest", label: "Weekly digest", desc: "One summary email every Sunday" },
  ];

  return (
    <AppShell title="Notifications" subtitle="Everything that moved since you last checked" navigation={navigation}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <Text style={{ fontSize: 12, fontWeight: "700", letterSpacing: 1, color: "#9a8a9f", textTransform: "uppercase" }}>
          {notifications.length - read.length} unread
        </Text>
        <PressableScale onPress={() => setRead(notifications.map((n) => n.id))}>
          <Text style={{ fontSize: 12, fontWeight: "700", color: "#5b1c46" }}>Mark all read</Text>
        </PressableScale>
      </View>

      <View style={{ gap: 8, marginBottom: 24 }}>
        {notifications.map((n) => {
          const isRead = read.includes(n.id);
          const meta = kindMeta[n.kind];
          return (
            <PressableScale
              key={n.id}
              onPress={() => setRead(isRead ? read.filter((i) => i !== n.id) : [...read, n.id])}
              style={{ borderWidth: 1, borderColor: isRead ? "#e8e2e8" : "rgba(91,28,70,0.25)", backgroundColor: "#ffffff", borderRadius: 20, padding: 16 }}
            >
              <View style={{ flexDirection: "row", gap: 12 }}>
                <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: meta.tone.bg, alignItems: "center", justifyContent: "center" }}>
                  <Ionicons name={meta.icon} size={18} color={meta.tone.text} />
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                    <Text style={{ flex: 1, fontSize: 14, fontWeight: "800", color: "#3a2a3f" }} numberOfLines={1}>{n.title}</Text>
                    {!isRead && <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#d9a441" }} />}
                  </View>
                  <Text style={{ marginTop: 2, fontSize: 12, lineHeight: 18, color: "#9a8a9f" }}>{n.body}</Text>
                  <Text style={{ marginTop: 6, fontSize: 11, fontWeight: "700", color: "rgba(154,138,159,0.8)" }}>{n.time}</Text>
                </View>
              </View>
            </PressableScale>
          );
        })}
      </View>

      <Surface style={{ padding: 20 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <Ionicons name="settings" size={18} color="#5b1c46" />
          <Text style={{ fontSize: 16, fontWeight: "700", color: "#3a2a3f" }}>Alert preferences</Text>
        </View>
        <View>
          {prefRows.map((row, i) => (
            <View
              key={row.key}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 16,
                paddingVertical: 14,
                ...(i < prefRows.length - 1 ? { borderBottomWidth: 1, borderBottomColor: "#e8e2e8" } : {}),
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, fontWeight: "700", color: "#3a2a3f" }}>{row.label}</Text>
                <Text style={{ fontSize: 12, color: "#9a8a9f" }}>{row.desc}</Text>
              </View>
              <Switch
                value={prefs[row.key]}
                onValueChange={(v) => setPrefs({ ...prefs, [row.key]: v })}
                trackColor={{ false: "#e8e2e8", true: "#5b1c46" }}
                thumbColor="#fdfcfd"
              />
            </View>
          ))}
        </View>
      </Surface>
    </AppShell>
  );
}

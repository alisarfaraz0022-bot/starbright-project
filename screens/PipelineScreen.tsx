import { View, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";

import { AppShell } from "../components/AppShell";
import { Surface, PressableScale } from "../lib/ui";
import { applications, currency, STAGES, type Stage } from "../lib/keep-data";

type Nav = NativeStackNavigationProp<any>;

const stageTone: Record<Stage, { bg: string; text: string }> = {
  Screening: { bg: "#e8f1fb", text: "#3a7fd9" },
  "Short Listed": { bg: "#fbf3e0", text: "#6b4a1a" },
  Interview: { bg: "#fbf5e8", text: "#d99b2d" },
  "Demo Session": { bg: "#f3edf0", text: "#5b1c46" },
  Hired: { bg: "#e8f6f0", text: "#2d9968" },
  "Not Selected": { bg: "#f5f1f5", text: "#9a8a9f" },
};

export default function PipelineScreen() {
  const navigation = useNavigation<Nav>();
  const [open, setOpen] = useState<Stage | null>("Interview");

  return (
    <AppShell title="My Applications" subtitle="Track your progress across every hiring stage" navigation={navigation}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, marginBottom: 20 }}>
        {STAGES.map(({ key }) => {
          const count = applications.filter((a) => a.stage === key).length;
          return (
            <Surface key={key} style={{ paddingHorizontal: 16, paddingVertical: 12, alignItems: "center", gap: 4 }}>
              <Text style={{ fontSize: 18, fontWeight: "800", color: "#3a2a3f" }}>{count}</Text>
              <Text style={{ fontSize: 10.5, fontWeight: "700", color: "#9a8a9f" }}>{key}</Text>
            </Surface>
          );
        })}
      </ScrollView>

      <View style={{ gap: 12, paddingBottom: 16 }}>
        {STAGES.map(({ key, hint }) => {
          const items = applications.filter((a) => a.stage === key);
          const expanded = open === key;
          const tone = stageTone[key];
          return (
            <Surface key={key} style={{ overflow: "hidden" }}>
              <PressableScale
                onPress={() => setOpen(expanded ? null : key)}
                style={{ flexDirection: "row", alignItems: "center", gap: 12, padding: 20 }}
              >
                <Ionicons
                  name="chevron-down"
                  size={20}
                  color="#9a8a9f"
                  style={{ transform: [{ rotate: expanded ? "180deg" : "0deg" }] }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 16, fontWeight: "800", color: "#3a2a3f" }}>{key}</Text>
                  <Text style={{ fontSize: 12, color: "#9a8a9f" }} numberOfLines={1}>{hint}</Text>
                </View>
                <View style={{ backgroundColor: tone.bg, borderRadius: 999, minWidth: 28, paddingHorizontal: 8, paddingVertical: 4, alignItems: "center" }}>
                  <Text style={{ fontSize: 12, fontWeight: "700", color: tone.text }}>{items.length}</Text>
                </View>
              </PressableScale>

              {expanded && (
                <View style={{ paddingHorizontal: 20, paddingBottom: 20, gap: 8 }}>
                  {items.length === 0 ? (
                    <View style={{ backgroundColor: "rgba(245,241,245,0.6)", borderRadius: 16, padding: 16 }}>
                      <Text style={{ fontSize: 12, fontWeight: "600", color: "#9a8a9f" }}>Nothing at this stage right now.</Text>
                    </View>
                  ) : (
                    items.map((a) => (
                      <View key={a.id} style={{ borderWidth: 1, borderColor: "#e8e2e8", backgroundColor: "rgba(245,241,245,0.5)", borderRadius: 16, padding: 16 }}>
                        <Text style={{ fontSize: 14, fontWeight: "800", color: "#3a2a3f" }}>{a.title}</Text>
                        <Text style={{ marginTop: 2, fontSize: 12, fontWeight: "600", color: "#9a8a9f" }}>{a.code}</Text>
                        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 16, marginTop: 8 }}>
                          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                            <Ionicons name="location" size={14} color="#9a8a9f" />
                            <Text style={{ fontSize: 12, color: "#9a8a9f" }}>{a.city}</Text>
                          </View>
                          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                            <Ionicons name="time" size={14} color="#9a8a9f" />
                            <Text style={{ fontSize: 12, color: "#9a8a9f" }}>
                              {new Date(a.updatedAt).toLocaleDateString("en-PK", { day: "numeric", month: "short" })}
                            </Text>
                          </View>
                          <Text style={{ fontSize: 12, fontWeight: "700", color: "#3a2a3f" }}>{currency(a.fee)}</Text>
                        </View>
                        {a.next && (
                          <View style={{ marginTop: 12, backgroundColor: "#ffffff", borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8 }}>
                            <Text style={{ fontSize: 12, fontWeight: "600", color: "#5b1c46" }}>Next: {a.next}</Text>
                          </View>
                        )}
                      </View>
                    ))
                  )}
                </View>
              )}
            </Surface>
          );
        })}
      </View>
    </AppShell>
  );
}

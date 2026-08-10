import { View, Text, TextInput, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";

import { AppShell } from "../components/AppShell";
import { Surface, PressableScale } from "../lib/ui";
import { currency, tuitions, type Tuition } from "../lib/keep-data";

type Nav = NativeStackNavigationProp<any>;

const tone: Record<Tuition["status"], { bg: string; text: string }> = {
  Approved: { bg: "#e8f6f0", text: "#2d9968" },
  "Under Review": { bg: "#fbf5e8", text: "#d99b2d" },
  "On Hold": { bg: "#f5f1f5", text: "#9a8a9f" },
  "Closed and Hired": { bg: "#f3edf0", text: "#5b1c46" },
};

const FILTERS = ["All", "Approved", "Under Review", "Closed and Hired"] as const;

export default function StatusScreen() {
  const navigation = useNavigation<Nav>();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tuitions
      .filter((t) => (filter === "All" ? true : t.status === filter))
      .filter((t) =>
        q ? [t.code, t.grade, t.subjects, t.city].join(" ").toLowerCase().includes(q) : true,
      );
  }, [query, filter]);

  return (
    <AppShell title="All Tuitions Status" subtitle="Every listing and where it currently stands" navigation={navigation}>
      <View style={{ position: "relative", marginBottom: 12 }}>
        <Ionicons name="search" size={18} color="#9a8a9f" style={{ position: "absolute", left: 16, top: 16, zIndex: 1 }} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search by code, grade or city"
          placeholderTextColor="#9a8a9f"
          style={{
            height: 48,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: "#e8e2e8",
            backgroundColor: "#ffffff",
            paddingLeft: 44,
            paddingRight: 16,
            fontSize: 14,
            fontWeight: "500",
            color: "#3a2a3f",
          }}
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, marginBottom: 20 }}>
        {FILTERS.map((f) => (
          <PressableScale
            key={f}
            onPress={() => setFilter(f)}
            style={{
              paddingHorizontal: 14,
              paddingVertical: 8,
              borderRadius: 999,
              borderWidth: 1,
              borderColor: filter === f ? "transparent" : "#e8e2e8",
              backgroundColor: filter === f ? "#5b1c46" : "#ffffff",
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: "700", color: filter === f ? "#fdfcfd" : "#3a2a3f" }}>{f}</Text>
          </PressableScale>
        ))}
      </ScrollView>

      <View style={{ gap: 12, paddingBottom: 16 }}>
        {list.map((t) => (
          <Surface key={t.id} style={{ padding: 20 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 12 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: "800", color: "#3a2a3f" }}>
                  {t.grade} — {t.subjects}
                </Text>
                <Text style={{ marginTop: 4, fontSize: 12, fontWeight: "600", color: "#9a8a9f" }}>{t.code}</Text>
              </View>
              <View style={{ backgroundColor: tone[t.status].bg, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 }}>
                <Text style={{ fontSize: 11, fontWeight: "700", color: tone[t.status].text }}>{t.status}</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 16, marginTop: 12 }}>
              <Text style={{ fontSize: 12, fontWeight: "600", color: "#9a8a9f" }}>{t.area}, {t.city}</Text>
              <Text style={{ fontSize: 12, fontWeight: "600", color: "#9a8a9f" }}>{t.mode}</Text>
              <Text style={{ fontSize: 12, fontWeight: "700", color: "#3a2a3f" }}>{currency(t.budget)}</Text>
            </View>
          </Surface>
        ))}
        {list.length === 0 && (
          <Surface style={{ padding: 32, alignItems: "center" }}>
            <Text style={{ fontSize: 14, fontWeight: "700", color: "#3a2a3f" }}>No listings found</Text>
          </Surface>
        )}
      </View>
    </AppShell>
  );
}

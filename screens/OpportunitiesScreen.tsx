import { View, Text, Pressable, ScrollView, Modal, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";

import { AppShell } from "../components/AppShell";
import { GradientPlum, Surface, PressableScale } from "../lib/ui";
import { CITIES, currency, tuitions, type GenderPref, type Tuition } from "../lib/keep-data";

type Nav = NativeStackNavigationProp<any>;
type SortKey = "newest" | "budget" | "nearest";

export default function OpportunitiesScreen() {
  const navigation = useNavigation<Nav>();
  const [query, setQuery] = useState("");
  const [city, setCity] = useState<string | null>(null);
  const [mode, setMode] = useState<string | null>(null);
  const [gender, setGender] = useState<GenderPref | null>(null);
  const [sort, setSort] = useState<SortKey>("newest");
  const [selected, setSelected] = useState<Tuition | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = tuitions
      .filter((t) => t.status === "Approved" || t.status === "Under Review")
      .filter((t) =>
        q
          ? [t.grade, t.subjects, t.code, t.city, t.area, t.board]
              .join(" ")
              .toLowerCase()
              .includes(q)
          : true,
      )
      .filter((t) => (city ? t.city === city : true))
      .filter((t) => (mode ? t.mode === mode : true))
      .filter((t) => (gender ? t.gender === gender : true));

    return [...list].sort((a, b) => {
      if (sort === "budget") return b.budget - a.budget;
      if (sort === "nearest") return a.distanceKm - b.distanceKm;
      return +new Date(b.postedAt) - +new Date(a.postedAt);
    });
  }, [query, city, mode, gender, sort]);

  const activeFilters = [city, mode, gender].filter(Boolean).length;

  function Chip({
    label,
    active: chipActive,
    onPress,
    icon,
  }: {
    label: string;
    active?: boolean;
    onPress?: () => void;
    icon?: keyof typeof Ionicons.glyphMap;
  }) {
    return (
      <PressableScale
        onPress={onPress}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 6,
          paddingHorizontal: 14,
          paddingVertical: 8,
          borderRadius: 999,
          borderWidth: 1,
          borderColor: chipActive ? "transparent" : "#e8e2e8",
          backgroundColor: chipActive ? "#5b1c46" : "#ffffff",
        }}
      >
        {icon && <Ionicons name={icon} size={14} color={chipActive ? "#fdfcfd" : "#3a2a3f"} />}
        <Text style={{ fontSize: 12, fontWeight: "700", color: chipActive ? "#fdfcfd" : "#3a2a3f" }}>
          {label}
        </Text>
      </PressableScale>
    );
  }

  function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
    return (
      <View style={{ marginBottom: 12 }}>
        <Text style={{ marginBottom: 8, fontSize: 12, fontWeight: "700", letterSpacing: 1, color: "#9a8a9f", textTransform: "uppercase" }}>
          {label}
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
          {children}
        </ScrollView>
      </View>
    );
  }

  return (
    <AppShell title="Tuition Opportunities" subtitle="Live openings matched to your subjects and city" navigation={navigation}>
      <View style={{ marginBottom: 16 }}>
        <View style={{ position: "relative" }}>
          <Ionicons name="search" size={18} color="#9a8a9f" style={{ position: "absolute", left: 16, top: 18, zIndex: 1 }} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search grade, subject or code"
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

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, marginTop: 12 }}>
          <Chip label="Newest" active={sort === "newest"} onPress={() => setSort("newest")} />
          <Chip label="Highest fee" active={sort === "budget"} onPress={() => setSort("budget")} icon="cash" />
          <Chip label="Nearest" active={sort === "nearest"} onPress={() => setSort("nearest")} icon="location" />
          {activeFilters > 0 && (
            <PressableScale
              onPress={() => { setCity(null); setMode(null); setGender(null); }}
              style={{ flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999, borderWidth: 1, borderColor: "#e8e2e8", backgroundColor: "#ffffff" }}
            >
              <Ionicons name="close" size={14} color="#c83232" />
              <Text style={{ fontSize: 12, fontWeight: "700", color: "#c83232" }}>Clear {activeFilters}</Text>
            </PressableScale>
          )}
        </ScrollView>
      </View>

      <FilterRow label="City">
        {CITIES.map((c) => (
          <Chip key={c} label={c} active={city === c} onPress={() => setCity(city === c ? null : c)} />
        ))}
      </FilterRow>

      <FilterRow label="Mode">
        {["Home Tuition", "Online Tuition"].map((m) => (
          <Chip key={m} label={m} active={mode === m} onPress={() => setMode(mode === m ? null : m)} />
        ))}
      </FilterRow>

      <FilterRow label="Gender preference">
        {(["Any", "Female", "Male"] as GenderPref[]).map((g) => (
          <Chip key={g} label={g} active={gender === g} onPress={() => setGender(gender === g ? null : g)} />
        ))}
      </FilterRow>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginTop: 20, marginBottom: 12 }}>
        <Ionicons name="options" size={14} color="#9a8a9f" />
        <Text style={{ fontSize: 12, fontWeight: "700", letterSpacing: 1, color: "#9a8a9f", textTransform: "uppercase" }}>
          {results.length} {results.length === 1 ? "opening" : "openings"}
        </Text>
      </View>

      {results.length === 0 ? (
        <Surface style={{ padding: 32, alignItems: "center" }}>
          <Text style={{ fontSize: 14, fontWeight: "700", color: "#3a2a3f" }}>No openings match these filters</Text>
          <Text style={{ marginTop: 4, fontSize: 12, color: "#9a8a9f" }}>Try widening the city or clearing the gender preference.</Text>
        </Surface>
      ) : (
        <View style={{ gap: 12, paddingBottom: 16 }}>
          {results.map((t) => (
            <Surface key={t.id} style={{ padding: 20 }}>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                <View style={{ backgroundColor: t.mode === "Home Tuition" ? "#e8f1fb" : "#e8f6f0", borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 }}>
                  <Text style={{ fontSize: 11, fontWeight: "700", color: t.mode === "Home Tuition" ? "#3a7fd9" : "#2d9968" }}>{t.mode}</Text>
                </View>
                {t.applicants < 5 && (
                  <View style={{ backgroundColor: "#fbf3e0", borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 }}>
                    <Text style={{ fontSize: 11, fontWeight: "700", color: "#6b4a1a" }}>Low competition</Text>
                  </View>
                )}
              </View>
              <Text style={{ marginTop: 12, fontSize: 16, fontWeight: "800", color: "#3a2a3f" }}>
                {t.grade} — {t.subjects}
              </Text>
              <Text style={{ marginTop: 4, fontSize: 12, fontWeight: "600", color: "#9a8a9f" }}>
                {t.code} · {t.board}
              </Text>
              <View style={{ marginTop: 12, gap: 6 }}>
                <View style={{ flexDirection: "row", gap: 6 }}>
                  <Ionicons name="location" size={16} color="#9a8a9f" />
                  <Text style={{ fontSize: 14, color: "#9a8a9f", flex: 1 }}>
                    {t.area}, {t.city}{t.distanceKm > 0 && ` · ${t.distanceKm} km away`}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", gap: 6 }}>
                  <Ionicons name="time" size={16} color="#9a8a9f" />
                  <Text style={{ fontSize: 14, color: "#9a8a9f" }}>{t.timings}</Text>
                </View>
                <View style={{ flexDirection: "row", gap: 6 }}>
                  <Ionicons name="people" size={16} color="#9a8a9f" />
                  <Text style={{ fontSize: 14, color: "#9a8a9f" }}>{t.applicants} applied · {t.gender} tutor preferred</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: "#e8e2e8" }}>
                <View>
                  <Text style={{ fontSize: 18, fontWeight: "800", color: "#3a2a3f" }}>{currency(t.budget)}</Text>
                  <Text style={{ fontSize: 11, fontWeight: "600", color: "#9a8a9f" }}>per month</Text>
                </View>
                <PressableScale onPress={() => setSelected(t)}>
                  <GradientPlum style={{ flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 16, paddingVertical: 12, borderRadius: 999 }}>
                    <Ionicons name="eye" size={16} color="#fdfcfd" />
                    <Text style={{ fontSize: 14, fontWeight: "700", color: "#fdfcfd" }}>View details</Text>
                  </GradientPlum>
                </PressableScale>
              </View>
            </Surface>
          ))}
        </View>
      )}

      <Modal visible={!!selected} animationType="slide" transparent onRequestClose={() => setSelected(null)}>
        <View style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.4)" }}>
          <Pressable style={{ flex: 1 }} onPress={() => setSelected(null)} />
          {selected && (
            <View style={{ maxHeight: "88%", backgroundColor: "#ffffff", borderTopLeftRadius: 24, borderTopRightRadius: 24, overflow: "hidden" }}>
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                <GradientPlum style={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 24 }}>
                  <Text style={{ fontSize: 12, fontWeight: "700", letterSpacing: 2, color: "rgba(253,252,253,0.8)", textTransform: "uppercase" }}>{selected.code}</Text>
                  <Text style={{ marginTop: 8, fontSize: 20, fontWeight: "800", color: "#fdfcfd" }}>
                    {selected.grade} — {selected.subjects}
                  </Text>
                  <Text style={{ marginTop: 4, fontSize: 14, color: "rgba(253,252,253,0.85)" }}>{selected.board}</Text>
                  <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
                    {[selected.mode, `${selected.gender} tutor`, selected.status].map((tag) => (
                      <View key={tag} style={{ backgroundColor: "rgba(253,252,253,0.15)", borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 }}>
                        <Text style={{ fontSize: 12, fontWeight: "700", color: "#fdfcfd" }}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                </GradientPlum>

                <View style={{ paddingHorizontal: 20 }}>
                  {[
                    { label: "Monthly budget", value: currency(selected.budget), strong: true },
                    { label: "City", value: selected.city },
                    { label: "Location", value: `${selected.area} — ${selected.address}` },
                    { label: "Timings", value: selected.timings },
                    { label: "Sessions per week", value: String(selected.sessionsPerWeek) },
                    { label: "Applicants so far", value: String(selected.applicants) },
                    { label: "Notes from coordinator", value: selected.notes },
                    { label: "Inquiry received", value: new Date(selected.postedAt).toLocaleString("en-PK", { dateStyle: "medium", timeStyle: "short" }) },
                  ].map((row, i, arr) => (
                    <View key={i} style={{ paddingVertical: 14, ...(i < arr.length - 1 ? { borderBottomWidth: 1, borderBottomColor: "#e8e2e8" } : {}) }}>
                      <Text style={{ fontSize: 12, fontWeight: "700", letterSpacing: 1, color: "#9a8a9f", textTransform: "uppercase" }}>{row.label}</Text>
                      <Text style={{ marginTop: 4, fontSize: row.strong ? 18 : 14, fontWeight: row.strong ? "800" : "500", color: "#3a2a3f" }}>
                        {row.value}
                      </Text>
                    </View>
                  ))}
                </View>
              </ScrollView>

              <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, flexDirection: "row", alignItems: "center", gap: 12, borderTopWidth: 1, borderTopColor: "#e8e2e8", backgroundColor: "rgba(255,255,255,0.95)", paddingHorizontal: 20, paddingVertical: 16 }}>
                <PressableScale style={{ width: 48, height: 48, borderRadius: 24, borderWidth: 1, borderColor: "#e8e2e8", alignItems: "center", justifyContent: "center" }}>
                  <Ionicons name="calendar" size={20} color="#5b1c46" />
                </PressableScale>
                <PressableScale onPress={() => setSelected(null)} style={{ flex: 1 }}>
                  <GradientPlum style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingHorizontal: 20, paddingVertical: 14, borderRadius: 999 }}>
                    <Text style={{ fontSize: 14, fontWeight: "700", color: "#fdfcfd" }}>Apply for this tuition</Text>
                    <Ionicons name="arrow-forward" size={16} color="#fdfcfd" />
                  </GradientPlum>
                </PressableScale>
              </View>
            </View>
          )}
        </View>
      </Modal>
    </AppShell>
  );
}

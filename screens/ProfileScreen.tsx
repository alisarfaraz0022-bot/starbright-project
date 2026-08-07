import { View, Text, Pressable, TextInput, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { AppShell } from "../components/AppShell";
import { GradientPlum, Surface, PressableScale } from "../lib/ui";
import { profileChecklist, reviews, tutor } from "../lib/keep-data";

type Nav = NativeStackNavigationProp<any>;

export default function ProfileScreen() {
  const navigation = useNavigation<Nav>();
  const done = profileChecklist.filter((c) => c.done).length;
  const strength = Math.round((done / profileChecklist.length) * 100);

  function Stat({ icon, value, label }: { icon: keyof typeof Ionicons.glyphMap; value: string; label: string }) {
    return (
      <Surface style={{ flex: 1, padding: 16, alignItems: "center", gap: 6 }}>
        <View style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: "#f3edf0", alignItems: "center", justifyContent: "center" }}>
          <Ionicons name={icon} size={16} color="#5b1c46" />
        </View>
        <Text style={{ fontFamily: "Sora_700Bold", fontSize: 14, fontWeight: "800", color: "#3a2a3f" }}>{value}</Text>
        <Text style={{ fontSize: 10.5, fontWeight: "700", color: "#9a8a9f" }}>{label}</Text>
      </Surface>
    );
  }

  return (
    <AppShell title="Profile & Settings" subtitle="A stronger profile gets you shortlisted faster" navigation={navigation}>
      <Surface style={{ marginBottom: 16, padding: 20 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
          <GradientPlum style={{ width: 64, height: 64, borderRadius: 24, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontFamily: "Sora_700Bold", fontSize: 24, fontWeight: "800", color: "#fdfcfd" }}>
              {tutor.name.charAt(0)}
            </Text>
          </GradientPlum>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, fontWeight: "800", color: "#3a2a3f" }} numberOfLines={1}>{tutor.name}</Text>
            <Text style={{ fontSize: 12, fontWeight: "600", color: "#9a8a9f" }} numberOfLines={1}>{tutor.email}</Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 6 }}>
              <Ionicons name="star" size={14} color="#d9a441" />
              <Text style={{ fontSize: 12, fontWeight: "700", color: "#3a2a3f" }}>{tutor.rating} · {tutor.reviewCount} reviews</Text>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
            <Text style={{ fontSize: 12, fontWeight: "700", color: "#3a2a3f" }}>Profile strength</Text>
            <Text style={{ fontSize: 12, fontWeight: "700", color: "#5b1c46" }}>{strength}%</Text>
          </View>
          <View style={{ height: 8, borderRadius: 4, backgroundColor: "#f5f1f5", overflow: "hidden" }}>
            <View style={{ height: 8, borderRadius: 4, width: `${strength}%` }}>
              <GradientPlum style={{ height: 8, borderRadius: 4 }} />
            </View>
          </View>
        </View>

        <View style={{ gap: 8, marginTop: 16 }}>
          {profileChecklist.map((c) => (
            <View key={c.label} style={{ flexDirection: "row", alignItems: "center", gap: 12, borderWidth: 1, borderColor: "#e8e2e8", backgroundColor: "rgba(245,241,245,0.4)", borderRadius: 16, paddingHorizontal: 12, paddingVertical: 10 }}>
              <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: c.done ? "#2d9968" : "#f5f1f5", alignItems: "center", justifyContent: "center" }}>
                <Ionicons name={c.done ? "checkmark" : "cloud-upload"} size={14} color={c.done ? "#fdfcfd" : "#9a8a9f"} />
              </View>
              <Text style={{ flex: 1, fontSize: 14, fontWeight: "700", color: "#3a2a3f" }} numberOfLines={1}>{c.label}</Text>
              {!c.done && (
                <PressableScale style={{ backgroundColor: "#f3edf0", borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 }}>
                  <Text style={{ fontSize: 11, fontWeight: "700", color: "#5b1c46" }}>Add</Text>
                </PressableScale>
              )}
            </View>
          ))}
        </View>
      </Surface>

      <View style={{ flexDirection: "row", gap: 12, marginBottom: 16 }}>
        <Stat icon="time" value={`${tutor.responseMinutes}m`} label="Avg reply" />
        <Stat icon="checkmark-done" value={`${tutor.acceptanceRate}%`} label="Accepted" />
        <Stat icon="shield-checkmark" value={`${tutor.experienceYears} yrs`} label="Experience" />
      </View>

      <Surface style={{ marginBottom: 16, padding: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: "700", color: "#3a2a3f", marginBottom: 16 }}>Teaching details</Text>
        <View style={{ gap: 16 }}>
          <View>
            <Text style={{ fontSize: 12, fontWeight: "700", letterSpacing: 1, color: "#9a8a9f", textTransform: "uppercase" }}>Full name</Text>
            <TextInput
              defaultValue={tutor.name}
              style={{ marginTop: 6, height: 44, borderRadius: 12, borderWidth: 1, borderColor: "#e8e2e8", backgroundColor: "rgba(245,241,245,0.5)", paddingHorizontal: 12, fontSize: 14, color: "#3a2a3f" }}
            />
          </View>
          <View>
            <Text style={{ fontSize: 12, fontWeight: "700", letterSpacing: 1, color: "#9a8a9f", textTransform: "uppercase" }}>Phone</Text>
            <TextInput
              defaultValue={tutor.phone}
              style={{ marginTop: 6, height: 44, borderRadius: 12, borderWidth: 1, borderColor: "#e8e2e8", backgroundColor: "rgba(245,241,245,0.5)", paddingHorizontal: 12, fontSize: 14, color: "#3a2a3f" }}
            />
          </View>
          <View>
            <Text style={{ fontSize: 12, fontWeight: "700", letterSpacing: 1, color: "#9a8a9f", textTransform: "uppercase" }}>About you</Text>
            <TextInput
              defaultValue={tutor.bio}
              multiline
              numberOfLines={4}
              style={{ marginTop: 6, borderRadius: 12, borderWidth: 1, borderColor: "#e8e2e8", backgroundColor: "rgba(245,241,245,0.5)", paddingHorizontal: 12, paddingVertical: 10, fontSize: 14, color: "#3a2a3f", minHeight: 88, textAlignVertical: "top" }}
            />
          </View>
          <View>
            <Text style={{ fontSize: 12, fontWeight: "700", letterSpacing: 1, color: "#9a8a9f", textTransform: "uppercase" }}>Subjects</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
              {tutor.subjects.map((s) => (
                <View key={s} style={{ backgroundColor: "#f3edf0", borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 }}>
                  <Text style={{ fontSize: 12, fontWeight: "700", color: "#5b1c46" }}>{s}</Text>
                </View>
              ))}
            </View>
          </View>
          <View>
            <Text style={{ fontSize: 12, fontWeight: "700", letterSpacing: 1, color: "#9a8a9f", textTransform: "uppercase" }}>Grades</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
              {tutor.grades.map((g) => (
                <View key={g} style={{ backgroundColor: "#fbf3e0", borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 }}>
                  <Text style={{ fontSize: 12, fontWeight: "700", color: "#6b4a1a" }}>{g}</Text>
                </View>
              ))}
            </View>
          </View>
          <PressableScale>
            <GradientPlum style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", borderRadius: 999, paddingVertical: 14 }}>
              <Text style={{ fontSize: 14, fontWeight: "700", color: "#fdfcfd" }}>Save changes</Text>
            </GradientPlum>
          </PressableScale>
        </View>
      </Surface>

      <Surface style={{ marginBottom: 16, padding: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: "700", color: "#3a2a3f", marginBottom: 12 }}>Parent reviews</Text>
        <View>
          {reviews.map((r, i) => (
            <View key={r.id} style={{ paddingVertical: 14, ...(i < reviews.length - 1 ? { borderBottomWidth: 1, borderBottomColor: "#e8e2e8" } : {}) }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 12 }}>
                <Text style={{ flex: 1, fontSize: 14, fontWeight: "700", color: "#3a2a3f" }} numberOfLines={1}>{r.parent}</Text>
                <View style={{ flexDirection: "row", gap: 2 }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons key={star} name="star" size={14} color={star <= r.stars ? "#d9a441" : "#e8e2e8"} />
                  ))}
                </View>
              </View>
              <Text style={{ marginTop: 4, fontSize: 12, lineHeight: 18, color: "#9a8a9f" }}>{r.text}</Text>
              <Text style={{ marginTop: 4, fontSize: 11, fontWeight: "600", color: "rgba(154,138,159,0.8)" }}>{r.when}</Text>
            </View>
          ))}
        </View>
      </Surface>

      <Surface style={{ overflow: "hidden" }}>
        {["Change password", "Payout & bank details", "Language & region", "Sign out"].map((l, i, arr) => (
          <PressableScale
            key={l}
            style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 16, ...(i < arr.length - 1 ? { borderBottomWidth: 1, borderBottomColor: "#e8e2e8" } : {}) }}
          >
            <Text style={{ fontSize: 14, fontWeight: "700", color: "#3a2a3f" }}>{l}</Text>
            <Ionicons name="chevron-forward" size={18} color="#9a8a9f" />
          </PressableScale>
        ))}
      </Surface>
    </AppShell>
  );
}

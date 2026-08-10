import { View, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";

import { AppShell } from "../components/AppShell";
import { GradientPlum, Surface, PressableScale } from "../lib/ui";
import { hired, sessions } from "../lib/keep-data";

type Nav = NativeStackNavigationProp<any>;

const DAYS = ["Today", "Tomorrow", "Friday", "Saturday"];

export default function ScheduleScreen() {
  const navigation = useNavigation<Nav>();
  const [day, setDay] = useState<string>("Today");
  const [done, setDone] = useState<string[]>(
    sessions.filter((s) => s.status === "Completed").map((s) => s.id),
  );
  const list = sessions.filter((s) => s.day === day);
  const weekTotal = sessions.length;
  const completed = done.length;

  function Stat({ value, label }: { value: string; label: string }) {
    return (
      <Surface style={{ flex: 1, padding: 16, alignItems: "center", gap: 4 }}>
        <Text style={{ fontFamily: "Sora_700Bold", fontSize: 20, fontWeight: "800", color: "#3a2a3f" }}>{value}</Text>
        <Text style={{ fontSize: 10.5, fontWeight: "700", color: "#9a8a9f" }}>{label}</Text>
      </Surface>
    );
  }

  return (
    <AppShell title="Schedule & Attendance" subtitle="Your week, session by session" navigation={navigation}>
      <View style={{ flexDirection: "row", gap: 12, marginBottom: 16 }}>
        <Stat value={String(weekTotal)} label="Sessions this week" />
        <Stat value={String(completed)} label="Completed" />
        <Stat value={String(hired.length)} label="Students" />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, marginBottom: 20 }}>
        {DAYS.map((d) => (
          <PressableScale
            key={d}
            onPress={() => setDay(d)}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 12,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: day === d ? "transparent" : "#e8e2e8",
              backgroundColor: day === d ? "#5b1c46" : "#ffffff",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: "700", color: day === d ? "#fdfcfd" : "#3a2a3f" }}>{d}</Text>
            <Text style={{ marginTop: 2, fontSize: 10, fontWeight: "600", color: day === d ? "rgba(253,252,253,0.7)" : "#9a8a9f" }}>
              {sessions.filter((s) => s.day === d).length} sessions
            </Text>
          </PressableScale>
        ))}
      </ScrollView>

      {list.length === 0 ? (
        <Surface style={{ padding: 32, alignItems: "center" }}>
          <Text style={{ fontSize: 14, fontWeight: "700", color: "#3a2a3f" }}>No sessions on {day.toLowerCase()}</Text>
        </Surface>
      ) : (
        <View style={{ gap: 12, paddingBottom: 16 }}>
          {list.map((s) => {
            const isDone = done.includes(s.id);
            return (
              <Surface key={s.id} style={{ padding: 20 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 12 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: "800", color: "#3a2a3f" }} numberOfLines={1}>{s.student}</Text>
                    <Text style={{ fontSize: 12, fontWeight: "600", color: "#9a8a9f" }} numberOfLines={1}>{s.subject}</Text>
                  </View>
                  <View style={{ backgroundColor: "#f3edf0", borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 }}>
                    <Text style={{ fontSize: 11, fontWeight: "700", color: "#5b1c46" }}>{s.time}</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 16, marginTop: 12 }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                    <Ionicons name={s.mode === "Online Tuition" ? "videocam" : "location"} size={14} color="#9a8a9f" />
                    <Text style={{ fontSize: 12, color: "#9a8a9f" }}>{s.mode}</Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                    <Ionicons name="time" size={14} color="#9a8a9f" />
                    <Text style={{ fontSize: 12, color: "#9a8a9f" }}>90 min</Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                    <Ionicons name="calendar" size={14} color="#9a8a9f" />
                    <Text style={{ fontSize: 12, color: "#9a8a9f" }}>{s.day}</Text>
                  </View>
                </View>
                <PressableScale
                  onPress={() => {
                    if (isDone) {
                      setDone(done.filter((id) => id !== s.id));
                    } else {
                      setDone([...done, s.id]);
                    }
                  }}
                  style={{ marginTop: 16 }}
                >
                  {isDone ? (
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: "#e8f6f0", borderRadius: 999, paddingVertical: 14 }}>
                      <Ionicons name="checkmark-circle" size={18} color="#2d9968" />
                      <Text style={{ fontSize: 14, fontWeight: "700", color: "#2d9968" }}>Attendance recorded</Text>
                    </View>
                  ) : (
                    <GradientPlum style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, borderRadius: 999, paddingVertical: 14 }}>
                      <Ionicons name="checkmark-circle" size={18} color="#fdfcfd" />
                      <Text style={{ fontSize: 14, fontWeight: "700", color: "#fdfcfd" }}>Mark attendance</Text>
                    </GradientPlum>
                  )}
                </PressableScale>
              </Surface>
            );
          })}
        </View>
      )}
    </AppShell>
  );
}

import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { AppShell } from "../components/AppShell";
import { GradientPlum, Surface, PressableScale } from "../lib/ui";
import { importantLinks } from "../lib/keep-data";

type Nav = NativeStackNavigationProp<any>;

export default function LinksScreen() {
  const navigation = useNavigation<Nav>();

  return (
    <AppShell title="Important Links" subtitle="Policies, guides and support in one place" navigation={navigation}>
      <View style={{ gap: 8, marginBottom: 16 }}>
        {importantLinks.map((l) => (
          <PressableScale key={l.label}>
            <Surface style={{ padding: 20 }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, fontWeight: "800", color: "#3a2a3f" }} numberOfLines={1}>{l.label}</Text>
                  <Text style={{ marginTop: 2, fontSize: 12, color: "#9a8a9f" }} numberOfLines={1}>{l.desc}</Text>
                </View>
                <Ionicons name="arrow-up" size={20} color="#5b1c46" style={{ transform: [{ rotate: "45deg" }] }} />
              </View>
            </Surface>
          </PressableScale>
        ))}
      </View>

      <GradientPlum style={{ padding: 20, borderRadius: 24 }}>
        <Ionicons name="help-circle" size={28} color="#fdfcfd" />
        <Text style={{ marginTop: 12, fontSize: 18, fontWeight: "800", color: "#fdfcfd" }}>Need a human?</Text>
        <Text style={{ marginTop: 4, fontSize: 14, color: "rgba(253,252,253,0.85)" }}>
          Operations replies within 15 minutes, Monday to Saturday, 10 AM – 8 PM.
        </Text>
        <PressableScale style={{ marginTop: 16, alignSelf: "flex-start", backgroundColor: "rgba(253,252,253,0.15)", borderRadius: 999, paddingHorizontal: 16, paddingVertical: 10 }}>
          <Text style={{ fontSize: 14, fontWeight: "700", color: "#fdfcfd" }}>Chat with support</Text>
        </PressableScale>
      </GradientPlum>
    </AppShell>
  );
}

import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import type { ReactNode } from "react";

import { notifications, tutor } from "../lib/keep-data";
import { GradientPlum, Surface, PressableScale } from "../lib/ui";

import HomeScreen from "../screens/HomeScreen";
import OpportunitiesScreen from "../screens/OpportunitiesScreen";
import PipelineScreen from "../screens/PipelineScreen";
import HiredScreen from "../screens/HiredScreen";
import StatusScreen from "../screens/StatusScreen";
import ScheduleScreen from "../screens/ScheduleScreen";
import EarningsScreen from "../screens/EarningsScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import LinksScreen from "../screens/LinksScreen";
import TermsScreen from "../screens/TermsScreen";
import ProfileScreen from "../screens/ProfileScreen";

export type AppRoutes = {
  Home: undefined;
  Opportunities: undefined;
  Pipeline: undefined;
  Hired: undefined;
  Status: undefined;
  Schedule: undefined;
  Earnings: undefined;
  Notifications: undefined;
  Links: undefined;
  Terms: undefined;
  Profile: undefined;
};

const Drawer = createDrawerNavigator();
const Tabs = createBottomTabNavigator<AppRoutes>();

const drawerConfig: { name: keyof AppRoutes; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { name: "Home", label: "Home", icon: "home" },
  { name: "Opportunities", label: "Tuition Opportunities", icon: "layers" },
  { name: "Pipeline", label: "My Applications", icon: "list" },
  { name: "Hired", label: "My Hired Tuitions", icon: "school" },
  { name: "Status", label: "All Tuitions Status", icon: "briefcase" },
  { name: "Schedule", label: "Schedule & Attendance", icon: "calendar" },
  { name: "Earnings", label: "Earnings & Payouts", icon: "wallet" },
  { name: "Notifications", label: "Notifications", icon: "notifications" },
  { name: "Links", label: "Important Links", icon: "link" },
  { name: "Terms", label: "Terms & Conditions", icon: "document-text" },
  { name: "Profile", label: "Profile & Settings", icon: "person" },
];

const tabConfig: { name: keyof AppRoutes; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { name: "Home", label: "Home", icon: "home" },
  { name: "Opportunities", label: "Discover", icon: "layers" },
  { name: "Pipeline", label: "Pipeline", icon: "list" },
  { name: "Schedule", label: "Schedule", icon: "calendar" },
  { name: "Profile", label: "Profile", icon: "person" },
];

const screenMap: Record<keyof AppRoutes, React.ComponentType<any>> = {
  Home: HomeScreen,
  Opportunities: OpportunitiesScreen,
  Pipeline: PipelineScreen,
  Hired: HiredScreen,
  Status: StatusScreen,
  Schedule: ScheduleScreen,
  Earnings: EarningsScreen,
  Notifications: NotificationsScreen,
  Links: LinksScreen,
  Terms: TermsScreen,
  Profile: ProfileScreen,
};

function LogoMark() {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
      <GradientPlum style={{ width: 36, height: 36, borderRadius: 12, alignItems: "center", justifyContent: "center" }}>
        <Ionicons name="sparkles" size={18} color="#fdfcfd" />
      </GradientPlum>
      <View>
        <Text style={{ fontSize: 14, fontWeight: "800", color: "#3a2a3f" }}>
          KEEP TUTORS
        </Text>
        <Text style={{ fontSize: 10, fontWeight: "600", letterSpacing: 2, color: "#9a8a9f" }}>
          TUTOR APP
        </Text>
      </View>
    </View>
  );
}

function DrawerContent({ navigation }: { navigation: any }) {
  const unread = notifications.filter((n) => n.unread).length;
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f9f8f9" }} contentContainerStyle={{ paddingTop: 60, paddingBottom: 40 }}>
      <View style={{ paddingHorizontal: 20, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: "#e8e2e8" }}>
        <LogoMark />
      </View>
      <View style={{ padding: 12, gap: 2 }}>
        {drawerConfig.map(({ name, label, icon }) => (
          <Pressable
            key={name}
            onPress={() => navigation.navigate(name)}
            style={({ pressed }) => ({
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              paddingHorizontal: 12,
              paddingVertical: 12,
              borderRadius: 12,
              backgroundColor: pressed ? "#f3edf0" : "transparent",
            })}
          >
            <Ionicons name={icon} size={20} color="#5b1c46" />
            <Text style={{ fontSize: 14, fontWeight: "600", color: "#3a2a3f" }}>{label}</Text>
            {name === "Notifications" && unread > 0 && (
              <View style={{ marginLeft: "auto", backgroundColor: "#d9a441", borderRadius: 10, minWidth: 20, paddingHorizontal: 6, paddingVertical: 2, alignItems: "center" }}>
                <Text style={{ fontSize: 10, fontWeight: "700", color: "#fff" }}>{unread}</Text>
              </View>
            )}
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

function TabBar({ state, navigation }: { state: any; navigation: any }) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flexDirection: "row",
        borderTopWidth: 1,
        borderTopColor: "#e8e2e8",
        backgroundColor: "rgba(249,248,249,0.95)",
        paddingBottom: insets.bottom,
        paddingHorizontal: 8,
        paddingVertical: 6,
      }}
    >
      {state.routes.map((route: any, index: number) => {
        const config = tabConfig.find((t) => t.name === route.name)!;
        const active = state.index === index;
        return (
          <Pressable
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={{ flex: 1, alignItems: "center", gap: 4, paddingVertical: 8 }}
          >
            <View
              style={{
                width: 48,
                height: 32,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: active ? "#f3edf0" : "transparent",
              }}
            >
              <Ionicons name={config.icon} size={20} color={active ? "#5b1c46" : "#9a8a9f"} />
            </View>
            <Text style={{ fontSize: 10.5, fontWeight: "700", color: active ? "#5b1c46" : "#9a8a9f" }}>
              {config.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function TabsNavigator() {
  return (
    <Tabs.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <TabBar {...props} />}
    >
      {tabConfig.map(({ name }) => (
        <Tabs.Screen key={name} name={name} component={screenMap[name]} />
      ))}
    </Tabs.Navigator>
  );
}

export function AppShell({
  children,
  title,
  subtitle,
  navigation,
}: {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  navigation: any;
}) {
  const insets = useSafeAreaInsets();
  const unread = notifications.filter((n) => n.unread).length;

  return (
    <View style={{ flex: 1, backgroundColor: "#f9f8f9" }}>
      <View
        style={{
          paddingTop: insets.top + 8,
          paddingBottom: 12,
          paddingHorizontal: 16,
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          borderBottomWidth: 1,
          borderBottomColor: "#e8e2e8",
          backgroundColor: "rgba(249,248,249,0.9)",
        }}
      >
        <Pressable
          onPress={() => navigation.openDrawer()}
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "#e8e2e8",
            backgroundColor: "#ffffff",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="menu" size={20} color="#3a2a3f" />
        </Pressable>

        <View style={{ flex: 1 }}>
          <LogoMark />
        </View>

        <Pressable
          onPress={() => navigation.navigate("Notifications")}
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "#e8e2e8",
            backgroundColor: "#ffffff",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="notifications" size={20} color="#3a2a3f" />
          {unread > 0 && (
            <View
              style={{
                position: "absolute",
                top: -2,
                right: -2,
                backgroundColor: "#d9a441",
                borderRadius: 10,
                minWidth: 20,
                paddingHorizontal: 4,
                paddingVertical: 2,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 10, fontWeight: "700", color: "#fff" }}>{unread}</Text>
            </View>
          )}
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("Profile")}
          style={{ overflow: "hidden" }}
        >
          <GradientPlum style={{ width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 14, fontWeight: "700", color: "#fdfcfd" }}>
              {tutor.name.charAt(0)}
            </Text>
          </GradientPlum>
        </Pressable>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 24, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {title && (
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 28, fontWeight: "800", color: "#3a2a3f" }}>
              {title}
            </Text>
            {subtitle && (
              <Text style={{ marginTop: 4, fontSize: 14, color: "#9a8a9f" }}>{subtitle}</Text>
            )}
          </View>
        )}
        {children}
      </ScrollView>
    </View>
  );
}

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerStyle: { width: "85%", maxWidth: 340 },
        }}
      >
        <Drawer.Screen name="Tabs" component={TabsNavigator} />
        {drawerConfig
          .filter((d) => !tabConfig.some((t) => t.name === d.name))
          .map(({ name }) => (
            <Drawer.Screen key={name} name={name} component={screenMap[name]} />
          ))}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

import { LinearGradient } from "expo-linear-gradient";
import { Pressable, View, type ViewStyle } from "react-native";
import type { ReactNode } from "react";

export function Surface({
  children,
  style,
}: {
  children: ReactNode;
  style?: ViewStyle;
}) {
  return (
    <View
      style={[
        {
          backgroundColor: "#ffffff",
          borderWidth: 1,
          borderColor: "#e8e2e8",
          borderRadius: 20,
          shadowColor: "#5b1c46",
          shadowOpacity: 0.05,
          shadowRadius: 24,
          shadowOffset: { width: 0, height: 8 },
          elevation: 2,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export function GradientPlum({
  children,
  style,
}: {
  children?: ReactNode;
  style?: ViewStyle;
}) {
  return (
    <LinearGradient
      colors={["#4a1450", "#6b2160", "#b8651e"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[{ borderRadius: 24 }, style]}
    >
      {children}
    </LinearGradient>
  );
}

export function GradientAmber({
  children,
  style,
}: {
  children?: ReactNode;
  style?: ViewStyle;
}) {
  return (
    <LinearGradient
      colors={["#e8c068", "#d99b2d"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[{ borderRadius: 8 }, style]}
    >
      {children}
    </LinearGradient>
  );
}

export function PressableScale({
  children,
  onPress,
  style,
}: {
  children: ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        { transform: [{ scale: pressed ? 0.97 : 1 }] },
        style,
      ]}
    >
      {children}
    </Pressable>
  );
}

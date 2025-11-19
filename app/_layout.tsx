// app/_layout.tsx
import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { colors } from "@/constants/theme";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

// Không cho splash tự ẩn
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Load font
  const [fontsLoaded] = useFonts({
    RobotoRegular: require("../assets/fonts/Roboto-Regular.ttf"),
    RobotoBold: require("../assets/fonts/Roboto-Bold.ttf"),
    RowdiesRegular: require("../assets/fonts/Rowdies-Regular.ttf"),
    RowdiesBold: require("../assets/fonts/Rowdies-Bold.ttf"),
  });

  // Khi font load xong → ẩn splash
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Chưa load xong → không render UI
  if (!fontsLoaded) return null;

  return (
    <>
      <StatusBar style="light" backgroundColor={colors.Neutral200} />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.Neutral200 },
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="index" options={{ title: "Smart Debt" }} />
      </Stack>
    </>
  );
}

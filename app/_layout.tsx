import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import * as Updates from "expo-updates";

export default function RootLayout() {
  const router = useRouter();
  
  // This effect will run when the app is loaded or reloaded
  useEffect(() => {
    // Reset to splash screen on app load/reload
    router.replace("/splash");
  }, []);
  
  return (
    <Stack initialRouteName="splash">
      <Stack.Screen name="splash" options={{ headerShown: false }} />
      <Stack.Screen name="welcome-animation" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}

import { Stack } from "expo-router";
import { ProviderMain } from "../src/components/ProviderMain";
import { Platform, UIManager } from "react-native";
import NavBar from "../src/components/NavBar";

export default function Layout() {
  if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
  return (
    <ProviderMain>
      <Stack
       screenOptions={{
            headerShown: true, 
          }}
      >
        <Stack.Screen name="index" options={{ title: 'Inicio' }} />
        <Stack.Screen name="shifts/index" options={{ title: 'Turnos' }} />
        <Stack.Screen name="clients/index" options={{ title: 'Clientes' }} />
      </Stack>
      <NavBar />
    </ProviderMain>
  );
}

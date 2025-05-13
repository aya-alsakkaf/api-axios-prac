import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#3498db",
        },
        headerTintColor: "white",
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Todo List",
          // headerShown: false,
        }}
      />
      <Stack.Screen
        name="screens"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}

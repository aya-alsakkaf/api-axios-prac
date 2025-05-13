import { Stack } from "expo-router";
import React from "react";

export default function ScreensLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="todoDetails"
        options={{
          headerTitle: "Todo Details",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#3498db" },
        }}
      />
      <Stack.Screen
        name="createTodo"
        options={{
          headerTitle: "Create New Todo",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#3498db" },
        }}
      />
    </Stack>
  );
}

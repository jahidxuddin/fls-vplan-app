import React from "react";
import { Tabs } from "expo-router";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { Image } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 75,
          backgroundColor: Colors[colorScheme?? "light"].background,
          borderColor: Colors[colorScheme?? "light"].background,
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Vertretungsplan",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../../assets/images/icon.png")}
              style={{
                width: 50,
                height: 50
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}

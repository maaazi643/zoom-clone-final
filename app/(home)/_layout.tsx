import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, Tabs } from "expo-router";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useAuth } from "@clerk/clerk-expo";
import { View } from "react-native";

export default function CallRoutesLayout() {
  const { isSignedIn } = useAuth();
  if (isSignedIn) {
    return <Redirect href={"/(auth)/sign-in"} />;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs
        screenOptions={({ route }) => ({
          header: () => null,
          tabBarActiveTintColor: "#5F5DEC",
          tabBarStyle: {
            display: route.name === "[id]" ? "none" : "flex",
          },
          tabBarLabelStyle: {
            zIndex: 100,
            paddingBottom: 5,
          },
        })}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "All Calls",
            tabBarIcon: ({ color }) => (
              <Ionicons name="call-outline" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="[id]"
          options={{
            title: "Start a New Call",
            unmountOnBlur: true,
            header: () => null,
            tabBarIcon: ({ color }) => {
              return (
                <View
                  style={{
                    position: "absolute",
                    justifyContent: "center",
                    alignItems: "center",
                    top: -10,
                    left: 20,
                    right: 20,
                    bottom: 0,
                    margin: "auto",
                    borderRadius: 50,
                    zIndex: 100,
                    backgroundColor: "white",
                    borderColor: "lightgray",
                    borderWidth: 0.2,
                    borderTopWidth: 1,
                    borderBottomWidth: 0,
                  }}
                >
                  <FontAwesome
                    name="plus-circle"
                    size={30}
                    color="black"
                    style={{ zIndex: 200 }}
                  />
                </View>
              );
            },
          }}
        />
        <Tabs.Screen
          name="JoinCall"
          options={{
            title: "Join call",
            headerTitle: "Enter the Room ID",
            tabBarIcon: ({ color }) => (
              <Ionicons name="enter-outline" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}

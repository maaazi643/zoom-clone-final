import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useStreamVideoClient } from "@stream-io/video-react-native-sdk";
import { useRouter } from "expo-router";
import { inverseFormatSlug } from "@/lib/slugs";
import Toast from "react-native-root-toast";

export default function JoinCall() {
  const [roomId, setRoomId] = useState("");
  const client = useStreamVideoClient();
  const router = useRouter();

  const handleJoinRoom = async () => {
    if (!roomId) return;

    const slug = inverseFormatSlug(roomId);

    const call = client?.call("default", slug);

    call
      ?.get()
      .then((callResponse) => {
        console.log(callResponse);
        router.push(`/(home)/${slug}`);
      })
      .catch((reason) => {
        console.log(reason.message);

        Toast.show(
          "Whoops!\nLooks like the room you're trying to join doesn't exist",
          {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
            shadow: true,
          }
        );
      });
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Text
        style={{
          padding: 20,
          fontWeight: "bold",
        }}
      >
        Enter the Room Name
      </Text>

      <TextInput
        placeholder="e.g. Black Purple Tiger"
        value={roomId}
        onChangeText={setRoomId}
        style={{
          padding: 20,
          width: "100%",
          backgroundColor: "white",
        }}
      />

      <TouchableOpacity
        onPress={handleJoinRoom}
        style={{
          padding: 20,
          backgroundColor: "#5F5DEC",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
          }}
        >
          Join Room
        </Text>
      </TouchableOpacity>
    </View>
  );
}

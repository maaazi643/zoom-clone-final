import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import {
  CallingState,
  StreamCall,
  useStreamVideoClient,
} from "@stream-io/video-react-native-sdk";
import { useLocalSearchParams } from "expo-router";

export default function CallScreen() {
  const [call, setCall] = useState<Call | null>(null);
  const client = useStreamVideoClient();
  const { id } = useLocalSearchParams();

  useEffect(() => {
    //cleanup functions
    let slug: string;

    if (id !== "(call)" && id) {
      // Joining an existing call
    } else {
      // creating a new call
      const _call = client?.call("default", "demo room");
      _call?.join({ create: true }).then(() => {
        //have a toast popup
      });
    }
  }, [id, client]);
  useEffect(() => {
    //cleanup functions

    if (call?.state.callingState !== CallingState.LEFT) {
      call?.leave();
    }
  }, [call]);
  return (
    <StreamCall call={call}>
      <Text>CallScreen</Text>
    </StreamCall>
  );
}

import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useCallback, useState } from "react";
import { Link, useRouter } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";
import { MaterialIcons } from "@expo/vector-icons";
import StyledButton from "@/components/StyledButton";
import SignInWithOAuth from "@/components/SignInWithOAuth";

export default function SignInPage() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        Alert.alert(
          "Whoops!😫, looks like you entered the wrong email or password. \n\nPlease try again!"
        );
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert(
        "Whoops!😫, looks like you entered the wrong email or password. \n\nPlease try again!"
      );
    }
  }, [isLoaded, emailAddress, password]);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{
        flex: 1,
        backgroundColor: "#5F5DEC",
        paddingHorizontal: 20,
        justifyContent: "center",
        gap: 10,
      }}
    >
      <MaterialIcons
        name="video-chat"
        size={160}
        color="white"
        style={{ alignSelf: "center", paddingBottom: 20 }}
      />
      <TextInput
        value={emailAddress}
        autoCapitalize="none"
        style={{
          padding: 20,
          width: "100%",
          backgroundColor: "white",
          borderRadius: 10,
        }}
        placeholder="Email..."
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
      />
      <TextInput
        value={password}
        style={{
          padding: 20,
          width: "100%",
          backgroundColor: "white",
          borderRadius: 10,
        }}
        placeholder="Password..."
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      {/* Divider */}
      <View
        style={{
          borderBottomColor: "white",
          borderBottomWidth: 1,
          marginVertical: 20,
        }}
      />
      <StyledButton title="Sign In" onPress={onSignInPress} />

      <Text style={{ textAlign: "center", color: "white" }}>OR</Text>

      {/* SignInWithAuth */}
      <SignInWithOAuth />
      {/* Divider */}
      <View
        style={{
          borderBottomColor: "white",
          borderBottomWidth: 1,
          marginVertical: 20,
        }}
      />
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
          }}
        >
          Don't have an account?
        </Text>
        <Link href="/(auth)/sign-up">
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              textDecorationLine: "underline",
              marginTop: 10,
            }}
          >
            Sign up
          </Text>
        </Link>
      </View>
    </KeyboardAvoidingView>
  );
}

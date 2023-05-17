import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

// import NavigationContainer, createNativeStackNavigator from react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// initialize a connection for Firestore
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import the screens
import Start from "./components/Start";
import Chat from "./components/Chat";

// Create the navigator
const Stack = createNativeStackNavigator();

export default function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyCOb89R6snYdKrPb9-wzVkiyVBG9G-b4M8",
    authDomain: "chat-application-c52cb.firebaseapp.com",
    projectId: "chat-application-c52cb",
    storageBucket: "chat-application-c52cb.appspot.com",
    messagingSenderId: "767738429343",
    appId: "1:767738429343:web:6abc57352e768f9f3e47aa",
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

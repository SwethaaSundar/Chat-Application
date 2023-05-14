import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Start = ({ navigation }) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");

  return (
    <ImageBackground
      source={require("../assets/BackgroundImage.png")}
      resizeMode="cover"
      style={styles.image}
    >
      {/* Dismiss the keyboard when the user taps outside of the input fields */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.text}>Chat App</Text>
          <View style={styles.subContainer}>
            <View style={styles.textSection}>
              <MaterialCommunityIcons
                name="account-cowboy-hat-outline"
                size={45}
                color="#c0c5ce"
              />
              <TextInput
                style={styles.textInput}
                value={name}
                onChangeText={setName}
                placeholder="Your name"
              />
            </View>
            <Text style={styles.colorSelector}>Choose your Background:</Text>
            <View style={styles.radioButtonContainer}>
              <TouchableOpacity
                style={[styles.radioButton, { backgroundColor: "#96ceb4" }]}
                onPress={() => setColor("#96ceb4")}
              ></TouchableOpacity>
              <TouchableOpacity
                style={[styles.radioButton, { backgroundColor: "#ffeead" }]}
                onPress={() => setColor("#ffeead")}
              ></TouchableOpacity>
              <TouchableOpacity
                style={[styles.radioButton, { backgroundColor: "#ff6f69" }]}
                onPress={() => setColor("#ff6f69")}
              ></TouchableOpacity>
              <TouchableOpacity
                style={[styles.radioButton, { backgroundColor: "#ffcc5c" }]}
                onPress={() => setColor("#ffcc5c")}
              ></TouchableOpacity>
              <TouchableOpacity
                style={[styles.radioButton, { backgroundColor: "#88d8b0" }]}
                onPress={() => setColor("#88d8b0")}
              ></TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate("Chat", {
                  name: name ? name : "User",
                  color: color ? color : "white",
                })
              }
            >
              <Text style={styles.boxText}>Start chatting</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  subContainer: {
    backgroundColor: "#fff",
    marginBottom: 15,
    height: "45%",
    width: "88%",
    alignItems: "center",
    paddingVertical: 20,
    marginTop: 270,
  },
  text: {
    color: "#fff",
    fontSize: 50,
    fontWeight: "600",
    marginTop: 60,
  },
  textInput: {
    height: 50,
    width: "75%",
    color: "#757083",
    opacity: 50,
    fontSize: 16,
    fontWeight: "300",
    paddingLeft: 10,
  },
  colorSelector: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 100,
    marginTop: 35,
    marginBottom: 20,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#5b5b5b",
    padding: 10,
    margin: 60,
    width: "88%",
  },
  radioButtonContainer: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 0,
  },
  radioButton: {
    flexDirection: "row",
    backgroundColor: "black",
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  boxText: {
    color: "#fff",
    fontWeight: "700",
  },
  textSection: {
    flexDirection: "row",
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 2,
  },
});

export default Start;

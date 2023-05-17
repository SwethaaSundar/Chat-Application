import { useEffect, useState } from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ route, navigation, db, isConnected }) => {
  const { userID, name, color } = route.params;
  // const { name, color } = route.params;
  const [messages, setMessages] = useState([]);

  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  useEffect(() => {
    let unsubMessages;
    if (isConnected === true) {
      // unregister current onSnapshot() listener to avoid registering multiple listeners when
      // useEffect code is re-executed.
      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      navigation.setOptions({ title: name });
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubMessages = onSnapshot(q, (documentsSnapshot) => {
        let newMessages = [];
        documentsSnapshot.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });

        cacheMessages(newMessages);
        setMessages(newMessages);
      });
    } else loadCachedMessages();
    // Clean up code
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected]);

  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  const loadCachedMessages = async () => {
    const cachedMessages = (await AsyncStorage.getItem("messages")) || [];
    setMessages(JSON.parse(cachedMessages));
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#03396c",
          },
          left: {
            backgroundColor: "#6497b1",
          },
        }}
      />
    );
  };
  return (
    <View style={[{ backgroundColor: color }, styles.container]}>
      <GiftedChat
        style={styles.textBox}
        messages={messages}
        renderBubble={renderBubble}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userID,
          name: name,
        }}
      />
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
  },
  textBox: {
    flex: 1,
  },
});

export default Chat;

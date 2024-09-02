import UserWrapper from "@/components/UserWrapper";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { HeaderBackButton } from "@react-navigation/elements";
import { useNavigation } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import {
  Bubble,
  BubbleProps,
  GiftedChat,
  IMessage,
} from "react-native-gifted-chat";

const CustomBubble = (props: BubbleProps<IMessage>) => {
  return (
    <Bubble
      {...props}
      textStyle={{
        right: {
          fontFamily: Fonts.regular,
        },
        left: {
          fontFamily: Fonts.regular,
        },
      }}
      wrapperStyle={{
        right: {
          backgroundColor: Colors.primary,
        },
      }}
    />
  );
};

const ChatScreen = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {navigation.canGoBack() && (
            <HeaderBackButton
              onPress={() => navigation.goBack()}
              labelVisible={false}
            />
          )}
          <UserWrapper />
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
        received: true,
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View></View>
      <GiftedChat
        renderBubble={CustomBubble}
        messages={messages}
        onSend={(messages: never[]) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "flex-end",
  },
  chatsContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
    paddingBottom: 30,
    paddingHorizontal: 30,
  },
  chatMessageContainer: {
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
    width: "70%",
  },
  sentMessageText: {
    color: "#fff",
  },
  receivedMessageText: {
    color: "#0D0D0D",
  },
  chatMessageText: {
    fontFamily: Fonts.regular,

    fontSize: 14,
  },
});

export default ChatScreen;

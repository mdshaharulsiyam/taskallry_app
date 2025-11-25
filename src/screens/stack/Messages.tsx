import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, ImageSourcePropType, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ChatHeader from "../../components/message/ChatHeader";
import Message from "../../components/message/Message";
import SendMessage from "../../components/message/SendMessage";
import { otherIcons } from "../../constant/images";
import SafeAreaProviderNoScroll from "../../providers/SafeAreaProviderNoScroll";
import type { MessageItem } from "../../redux/apis/messageApi";
import { useGetMessagesQuery } from "../../redux/apis/messageApi";
import Navigate from "../../utils/Navigate";
import ScreenSize from "../../utils/ScreenSize";
import { getSocket } from "../../utils/socket";

const Messages = () => {
  const {
    params: { id, name, image, email },
  } = useRoute() as {
    params: { id: string; name: string; image: string; email: string };
  };

  const { data, isLoading } = useGetMessagesQuery({
    conversationId: id,
  });

  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [socket, setSocket] = useState<any>(null);

  const navigate = Navigate();
  const { height } = ScreenSize();
  const { top, bottom } = useSafeAreaInsets();

  useEffect(() => {
    if (data?.data?.result) {
      setMessages(data.data.result);
    }
  }, [data]);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const s = await getSocket();
      if (!mounted) return;
      setSocket(s);
    })();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    const messageEvent = `message-${id}`;

    const handleMessage = (message: MessageItem) => {
      setMessages((prev) => [message, ...prev]);
    };

    const handleError = (err: any) => {
      console.log("socket-error", err);
    };

    socket.on(messageEvent, handleMessage);
    socket.on("socket-error", handleError);

    return () => {
      socket.off(messageEvent, handleMessage);
      socket.off("socket-error", handleError);
    };
  }, [socket, id]);

  const handleSendMessage = async (text: string) => {
    if (!socket) return;

    socket.emit("send-message", {
      text,
      imageUrl: [""],
      pdfUrl: [""],
      receiver: id,
    });
  };

  return (
    <SafeAreaProviderNoScroll>
      <View
        style={{
          flexDirection: "column",
          height: height,
        }}
      >
        <ChatHeader
          show={true}
          imageSource={otherIcons.ChatBlock as ImageSourcePropType}
          name={name}
          email={email}
          avatar={image}
        />
        {isLoading ? (
          <ActivityIndicator style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            style={{
              height: height,
              maxHeight: height - (top + bottom + 60 + 15 + 60 + 40 + 50),
            }}
            keyExtractor={(item) => item._id}
            inverted
            showsVerticalScrollIndicator={false}
            data={messages}
            renderItem={({ item }) => <Message item={item} />}
          />
        )}
        <SendMessage onSend={handleSendMessage} />
      </View>
    </SafeAreaProviderNoScroll>
  );
};
export default Messages;

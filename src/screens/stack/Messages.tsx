import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, ImageSourcePropType, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ChatHeader from "../../components/message/ChatHeader";
import Message from "../../components/message/Message";
import SendMessage from "../../components/message/SendMessage";
import { otherIcons } from "../../constant/images";
import SafeAreaProviderNoScroll from "../../providers/SafeAreaProviderNoScroll";
import { useGetMyProfileQuery } from "../../redux/apis";
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

  const [limit, setLimit] = useState(10);

  const { data, isLoading, isFetching } = useGetMessagesQuery({
    conversationId: id,
    limit,
  });

  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [socket, setSocket] = useState<any>(null);

  const { data: profileData } = useGetMyProfileQuery();

  const navigate = Navigate();
  const { height } = ScreenSize();
  const { top, bottom } = useSafeAreaInsets();

  useEffect(() => {
    if (data?.data?.result) {
      setMessages(data.data.result);
    }
  }, [data]);

  useEffect(() => {
    const myId = profileData?.data?._id;
    if (!myId) return;

    setMessages((prev) =>
      prev.map((m) => ({
        ...m,
        isMyMessage: m.msgByUserId?._id === myId,
      }))
    );
  }, [profileData]);

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

    const myId = profileData?.data?._id;

    const handleMessage = (message: MessageItem) => {
      console.log("message", message);
      if (myId == message?.msgByUserId?._id) {
        return
      }
      const isMyMessage = myId ? message?.msgByUserId?._id === myId : message.isMyMessage;
      const next: MessageItem = { ...message, isMyMessage };
      setMessages((prev) => [next, ...prev]);
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
  }, [socket, id, profileData]);

  const handleSendMessage = async ({
    text,
    imageUrls,
    pdfUrls,
  }: {
    text: string;
    imageUrls?: string[];
    pdfUrls?: string[];
  }) => {
    if (!socket) return;

    const myId = profileData?.data?._id;

    const optimistic: MessageItem = {
      _id: `${Date.now()}`,
      text,
      imageUrl: imageUrls || [],
      videoUrl: [],
      pdfUrl: pdfUrls || [],
      msgByUserId: {
        name: profileData?.data?.name || "",
        profile_image: profileData?.data?.profile_image || "",
        _id: myId || "",
      },
      msgByUserModel: "",
      seen: false,
      conversationId: id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userDetails: {
        _id: myId || "",
        name: profileData?.data?.name || "",
        profile_image: profileData?.data?.profile_image || "",
        email: profileData?.data?.email || "",
      },
      isMyMessage: true,
    };

    setMessages((prev) => [optimistic, ...prev]);

    socket.emit(
      "send-message",
      {
        text,
        imageUrl: imageUrls || [],
        pdfUrl: pdfUrls || [],
        receiver: id,
      }
    );
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
            onEndReachedThreshold={0.1}
            onEndReached={() => {
              if (!isFetching && (data?.data?.meta?.total || 0) > messages.length) {
                setLimit((prev) => prev + 10);
              }
            }}
            ListFooterComponent={
              isFetching && messages.length > 0 ? (
                <ActivityIndicator style={{ marginVertical: 8 }} />
              ) : null
            }
            renderItem={({ item }) => <Message item={item} />}
          />
        )}
        <SendMessage onSend={handleSendMessage} />
      </View>
    </SafeAreaProviderNoScroll>
  );
};
export default Messages;

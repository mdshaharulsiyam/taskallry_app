import { useRoute } from "@react-navigation/native";
import React from "react";
import { ActivityIndicator, FlatList, ImageSourcePropType, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ChatHeader from "../../components/message/ChatHeader";
import Message from "../../components/message/Message";
import SendMessage from "../../components/message/SendMessage";
import { otherIcons } from "../../constant/images";
import SafeAreaProviderNoScroll from "../../providers/SafeAreaProviderNoScroll";
import { useGetMessagesQuery } from "../../redux/apis/messageApi";
import Navigate from "../../utils/Navigate";
import ScreenSize from "../../utils/ScreenSize";
const Messages = () => {
  const {
    params: { id, name, image, email },
  } = useRoute() as {
    params: { id: string; name: string; image: string; email: string };
  };

  const { data, isLoading } = useGetMessagesQuery({
    conversationId: id,
  });

  const messages = data?.data?.result || [];

  const navigate = Navigate();
  const { height } = ScreenSize();
  const { top, bottom } = useSafeAreaInsets();

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
        <SendMessage />
      </View>
    </SafeAreaProviderNoScroll>
  );
};
export default Messages;

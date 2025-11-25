import React from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import ChatItems from "../../components/chat/ChatItems";
import SafeAreaProviderNoScroll from "../../providers/SafeAreaProviderNoScroll";
import { useGetChatListQuery } from "../../redux/apis/conversationApi";

const Chat = () => {
  const { data, isLoading } = useGetChatListQuery({
    page: 1,
    limit: 10,
  });
  return (
    <SafeAreaProviderNoScroll>
      {isLoading ? (
        <ActivityIndicator style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          keyExtractor={(item) => item?._id}
          contentContainerStyle={{
            paddingBottom: 150,
          }}
          showsVerticalScrollIndicator={false}
          data={data?.data?.data || []}
          renderItem={({ item }) => <ChatItems item={item} />}
        />
      )}
    </SafeAreaProviderNoScroll>
  );
};

export default Chat;

const styles = StyleSheet.create({});

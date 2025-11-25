import React from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import ChatItems from "../../components/chat/ChatItems";
import SafeAreaProviderNoScroll from "../../providers/SafeAreaProviderNoScroll";
import { useGetChatListQuery } from "../../redux/apis/conversationApi";

const Chat = () => {
  const { data, isLoading, isError } = useGetChatListQuery();

  const conversations = data?.data?.data || [];
  console.log(data)
  return (
    <SafeAreaProviderNoScroll>
      {isLoading ? (
        <ActivityIndicator style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          keyExtractor={(item, index) => item._id ?? index.toString()}
          contentContainerStyle={{
            paddingBottom: 150,
          }}
          showsVerticalScrollIndicator={false}
          data={conversations}
          renderItem={({ item }) => <ChatItems item={item} />}
          ListEmptyComponent={
            !isError
              ? null
              : undefined
          }
        />
      )}
    </SafeAreaProviderNoScroll>
  );
};

export default Chat;

const styles = StyleSheet.create({});

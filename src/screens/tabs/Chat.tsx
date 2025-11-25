import React, { useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import ChatItems from "../../components/chat/ChatItems";
import SafeAreaProviderNoScroll from "../../providers/SafeAreaProviderNoScroll";
import { useGetChatListQuery } from "../../redux/apis/conversationApi";

const Chat = () => {
  const [limit, setLimit] = useState(20);

  const { data, isLoading, isFetching } = useGetChatListQuery({
    page: 1,
    limit,
  });

  const list = data?.data?.data || [];
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
          data={list}
          onEndReachedThreshold={0.1}
          onEndReached={() => {
            const total = data?.data?.meta?.total || 0;
            if (!isFetching && total > list.length) {
              setLimit((prev) => prev + 20);
            }
          }}
          ListFooterComponent={
            isFetching && list.length > 0 ? (
              <ActivityIndicator style={{ marginVertical: 8 }} />
            ) : null
          }
          renderItem={({ item }) => <ChatItems item={item} />}
        />
      )}
    </SafeAreaProviderNoScroll>
  );
};

export default Chat;

const styles = StyleSheet.create({});

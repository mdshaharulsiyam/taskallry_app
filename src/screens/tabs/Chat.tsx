import React, { useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, StyleSheet, View } from "react-native";

import ChatItems from "../../components/chat/ChatItems";
import EmptyList from "../../components/shered/EmptyList";
import SafeAreaProviderNoScroll from "../../providers/SafeAreaProviderNoScroll";
import { useGetChatListQuery } from "../../redux/apis/conversationApi";

const Chat = () => {
  const [limit, setLimit] = useState(20);

  const { data, isLoading, isFetching, refetch } = useGetChatListQuery({
    page: 1,
    limit,
  });

  const list = data?.data?.data || [];
  const { height } = Dimensions.get("window");

  const content = isLoading ? (
    <ActivityIndicator style={{ marginTop: 20 }} />
  ) : list.length === 0 ? (
    <EmptyList
      title="No chat"
      description="When chat are available, you'll see them here."
      showImage={false}
      containerStyle={{
        minHeight: Math.max(500, height * 0.85),
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
      }}
      refetch={refetch}
      refetchLoading={isLoading || isFetching}
    />
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
  );

  return (
    <SafeAreaProviderNoScroll>
      <View style={{ flex: 1 }}>
        {content}
      </View>
    </SafeAreaProviderNoScroll>
  );
};

export default Chat;

const styles = StyleSheet.create({});

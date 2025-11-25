import React from "react";
import { Image, StyleSheet, TextStyle, View } from "react-native";
import { MessageItem } from "../../redux/apis/messageApi";
import TextPrimary from "../shered/TextPrimary";

const Message = ({ item }: { item: MessageItem }) => {
  const alignStyle: TextStyle = item.isMyMessage
    ? { alignSelf: "flex-end", backgroundColor: "#FFFFFF" }
    : { alignSelf: "flex-start", backgroundColor: "#E6F4F1" };

  const hasText = !!item.text && item.text.trim().length > 0;
  const hasImage = Array.isArray(item.imageUrl) && item.imageUrl.length > 0;

  return (
    <View
      style={{
        ...alignStyle,
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        maxWidth: "80%",
      }}
    >
      {hasImage && (
        <Image
          source={{ uri: item.imageUrl[0] }}
          style={{
            width: 180,
            height: 180,
            borderRadius: 8,
            marginBottom: hasText ? 6 : 0,
          }}
          resizeMode="cover"
        />
      )}
      {hasText && (
        <TextPrimary
          text={item.text}
          style={{
            fontSize: 14,
            color: "#111827",
          }}
        />
      )}
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({});

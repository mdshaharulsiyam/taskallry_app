import React from "react";
import { Image, Linking, StyleSheet, TextStyle, TouchableOpacity, View } from "react-native";
import { MessageItem } from "../../redux/apis/messageApi";
import TextPrimary from "../shered/TextPrimary";

const Message = ({ item }: { item: MessageItem }) => {
  const alignStyle: TextStyle = item.isMyMessage
    ? { alignSelf: "flex-end", backgroundColor: "#FFFFFF" }
    : { alignSelf: "flex-start", backgroundColor: "#E6F4F1" };

  const hasText = !!item.text && item.text.trim().length > 0;
  const hasImage = Array.isArray(item.imageUrl) && item.imageUrl.length > 0;
  const hasPdf = Array.isArray(item.pdfUrl) && item.pdfUrl.length > 0;

  const pdfUrl = hasPdf ? item.pdfUrl[0] : undefined;

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
      {hasPdf && pdfUrl && (
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(pdfUrl).catch(() => { });
          }}
          style={{
            marginTop: hasText || hasImage ? 6 : 0,
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 8,
            backgroundColor: "#E5E7EB",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 18,
              height: 18,
              borderRadius: 4,
              backgroundColor: "#EF4444",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 6,
            }}
          >
            <TextPrimary
              text="PDF"
              style={{
                fontSize: 10,
                color: "#FFFFFF",
              }}
            />
          </View>
          <TextPrimary
            text={"View attachment"}
            style={{
              fontSize: 13,
              color: "#111827",
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({});

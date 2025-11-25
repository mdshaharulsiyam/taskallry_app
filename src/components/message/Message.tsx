import React from "react";
import { StyleSheet, TextStyle } from "react-native";
import { MessageItem } from "../../redux/apis/messageApi";
import TextPrimary from "../shered/TextPrimary";

const Message = ({ item }: { item: MessageItem }) => {
  const alignStyle: TextStyle = item.isMyMessage
    ? { alignSelf: "flex-end", backgroundColor: "#FFFFFF" }
    : { alignSelf: "flex-start", backgroundColor: "#E6F4F1" };

  return (
    <TextPrimary
      text={item.text}
      style={{
        ...alignStyle,
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
        maxWidth: "80%",
      }}
    />
  );
};

export default Message;

const styles = StyleSheet.create({});

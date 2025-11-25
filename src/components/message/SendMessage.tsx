import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { otherIcons } from "../../constant/images";
import { SelectImage } from "../../utils/imagePick";
import FlexText from "../shered/FlexText";

const SendMessage = ({
  onSend,
}: {
  onSend: (text: string) => void | Promise<void>;
}) => {
  const [text, setText] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    const trimmed = text.trim();
    if (!trimmed || isSending) return;
    try {
      setIsSending(true);
      await onSend(trimmed);
      setText("");
    } finally {
      setIsSending(false);
    }
  };
  return (
    <FlexText
      style={{
        height: 60,
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity onPress={() => SelectImage()}>
        <Image
          source={otherIcons.Image as ImageSourcePropType}
          style={{
            tintColor: "#115E59",
          }}
        />
      </TouchableOpacity>
      <TextInput
        style={{
          borderWidth: 1,
          width: "70%",
          height: 40,
          borderRadius: 20,
          color: "#000000",
          paddingHorizontal: 12,
        }}
        placeholder="Type a message"
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleSend}
        returnKeyType="send"
      />
      <TouchableOpacity onPress={handleSend} disabled={isSending}>
        {isSending ? (
          <ActivityIndicator size="small" color="#115E59" />
        ) : (
          <Image
            source={otherIcons.Send as ImageSourcePropType}
            style={{
              tintColor: "#115E59",
            }}
          />
        )}
      </TouchableOpacity>
    </FlexText>
  );
};

export default SendMessage;

const styles = StyleSheet.create({});
